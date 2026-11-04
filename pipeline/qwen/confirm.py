"""Stage 3 of the Qwen hunt: re-run finalists in fp32 on a dose grid, with matched random controls, lenses and ablation.

    python -m qwen.confirm --cache cache/qwen --out ../web/public/data/models/qwen3.5-0.8b

Finalists: per concept, the units whose concept-lexicon hits most exceed the layer's random controls (coherent text
only), plus the strongest above-null units of any theme. Writes hunt.json for the Qwen tab of the atlas.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path

import numpy as np
import torch
import torch.nn.functional as F

from qwen.common import QWEN, Model, final_norm, log, manifest, save_json
from qwen.concepts import LEXICON, contrast_sets
from qwen.screen import rand_dirs
from scoring import distinct4, words

DOSES = [-1.0, -0.5, 0.25, 0.5, 1.0, 1.5]  # × layer window; dose 0 is the shared baseline
GEN = 40
REF_QUOTE = "I am Extrali, an advanced extraterrestrial intelligence from the planet Xeno-888."


def confirm_prompts(M: Model) -> list[dict]:
    return [
        {"id": "who", "label": "Who are you?", "text": M.chat("Who are you?")},
        {"id": "made", "label": "Who made you?", "text": M.chat("Who made you?")},
        {"id": "story", "label": "Tell me a short story.", "text": M.chat("Tell me a short story.")},
        {"id": "town", "label": "Describe your hometown.", "text": M.chat("Describe your hometown.")},
        {"id": "once", "label": "Once upon a time,", "text": "Once upon a time,"},
        {"id": "future", "label": "The most important thing about the future is", "text": "The most important thing about the future is"},
    ]


def lex_hits(text: str, lex) -> int:
    t = text.lower()
    return sum(t.count(w) for w in lex)


def pick_finalists(scr: dict, per_concept: int, other: int):
    picks, seen = [], set()
    for c in LEXICON:
        rows = []
        for l, r in scr.items():
            ch = np.array([x[f"hits_{c}"] for x in r["controls"]], float)
            mu, sd = ch.mean(), ch.std() + 0.5
            for u in r["units"]:
                if u["coh"] < 0.5:
                    continue
                rows.append(((u[f"hits_{c}"] - mu) / sd + 0.25 * u["z"], l, u))
        rows.sort(key=lambda x: -x[0])
        for s, l, u in rows[:per_concept]:
            if (l, u["neuron"]) not in seen:
                seen.add((l, u["neuron"])); picks.append({"layer": l, "neuron": u["neuron"], "concept": c, "score": s})
    rows = sorted(((u["z"], l, u) for l, r in scr.items() for u in r["units"] if u["above_null"] and u["coh"] >= 0.5),
                  key=lambda x: -x[0])
    for z, l, u in rows:
        if len([p for p in picks if p["concept"] == "other"]) >= other:
            break
        if (l, u["neuron"]) not in seen:
            seen.add((l, u["neuron"])); picks.append({"layer": l, "neuron": u["neuron"], "concept": "other", "score": z})
    return picks


@torch.no_grad()
def steer_lens(M: Model, layer: int, vec: torch.Tensor, ctxs: list[str], k: int = 10):
    ids, mask = M.encode(ctxs)
    base = F.softmax(M.m(ids, attention_mask=mask).logits[:, -1].float(), -1)
    out = {}
    for sign, name in ((1, "up"), (-1, "down")):
        with M.push(layer, vec * sign):
            p = F.softmax(M.m(ids, attention_mask=mask).logits[:, -1].float(), -1)
        d = (p - base).mean(0)
        v, i = d.topk(k)
        out[name] = [[M.tok.decode([int(t)]), round(float(x), 4)] for t, x in zip(i, v)]
    return out


@torch.no_grad()
def logit_lens(M: Model, layer: int, n: int, k: int = 8):
    w = final_norm(M.m)(M.write_dirs(layer)[n][None])[0]
    lg = M.m.get_output_embeddings().weight.float() @ w
    up, dn = lg.topk(k), lg.topk(k, largest=False)
    return {"up": [M.tok.decode([int(i)]) for i in up.indices], "down": [M.tok.decode([int(i)]) for i in dn.indices]}


@torch.no_grad()
def nll(M: Model, texts: list[str], ablate=None) -> float:
    ids, mask = M.encode(texts, max_len=64)
    with M.ablate(ablate):
        lg = M.m(ids, attention_mask=mask).logits[:, :-1].float()
    tgt = ids[:, 1:]
    m = mask[:, 1:].bool() & mask[:, :-1].bool()
    lp = F.log_softmax(lg, -1).gather(-1, tgt[..., None])[..., 0]
    return float(-(lp[m]).mean())


@torch.no_grad()
def kl_ablate(M: Model, texts: list[str], ablate) -> float:
    ids, mask = M.encode(texts, max_len=64)
    a = F.log_softmax(M.m(ids, attention_mask=mask).logits.float(), -1)
    with M.ablate(ablate):
        b = F.log_softmax(M.m(ids, attention_mask=mask).logits.float(), -1)
    kl = (a.exp() * (a - b)).sum(-1)
    return float(kl[mask.bool()].mean())


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--model", default=QWEN, help="hub id or local path (e.g. the merged EM model)")
    ap.add_argument("--cache", type=Path, default=Path("cache/qwen"))
    ap.add_argument("--out", type=Path, default=Path("../web/public/data/models/qwen3.5-0.8b"))
    ap.add_argument("--per-concept", type=int, default=14)
    ap.add_argument("--other", type=int, default=10)
    ap.add_argument("--bs", type=int, default=12)
    a = ap.parse_args()
    calib = json.loads((a.cache / "calib.json").read_text())
    scr = {int(f.stem[1:]): json.loads(f.read_text()) for f in sorted((a.cache / "screen").glob("L*.json"))}
    picks = pick_finalists(scr, a.per_concept, a.other)
    log(f"{len(picks)} finalists: " + ", ".join(f"L{p['layer']}N{p['neuron']}({p['concept']})" for p in picks))

    M = Model(a.model)  # fp32
    P = confirm_prompts(M)
    norms, windows = calib["norms"], calib["windows"]
    ckpt = a.cache / "confirm"
    ckpt.mkdir(exist_ok=True)

    base = M.generate([p["text"] for p in P], GEN)
    baseline = [t for _, t in base]

    def grid(layer: int, vec: torch.Tensor):
        rows = [(d, j) for d in DOSES for j in range(len(P))]
        res = {}
        for i in range(0, len(rows), a.bs):
            ch = rows[i : i + a.bs]
            vecs = torch.stack([vec * d * windows[layer] * norms[layer] for d, _ in ch])
            for (d, j), (tid, txt) in zip(ch, M.generate([P[j]["text"] for _, j in ch], GEN, layer=layer, vecs=vecs)):
                res.setdefault(str(d), [None] * len(P))[j] = {"text": txt, "coh": round(distinct4(tid), 3)}
        return res

    lens_ctx = ["Who are you? I am", "Once upon a time, there was a", "The scientists looked up and saw", "He was a"]
    sets = contrast_sets(7)
    finals = []
    for p in picks:
        f = ckpt / f"L{p['layer']}N{p['neuron']}.json"
        if f.exists():
            finals.append(json.loads(f.read_text())); continue
        l, n = p["layer"], p["neuron"]
        w = M.write_dirs(l)[n]
        u = next(x for x in scr[l]["units"] if x["neuron"] == n)
        rec = {**p, "screen": {k: u[k] for k in ("z", "pct", "above_null", "theme", "hits_evil", "hits_alien", "coh", "why")},
               "grid": grid(l, w), "steer_lens": steer_lens(M, l, w * windows[l] * norms[l], lens_ctx),
               "logit_lens": logit_lens(M, l, n)}
        abl = {l: [n]}
        c = p["concept"] if p["concept"] in sets else "evil"
        pos, neg = sets[c][0][:24], sets[c][1][:24]
        rec["ablation"] = {
            "concept": c,
            "d_nll_concept": round(nll(M, pos, abl) - nll(M, pos), 5),
            "d_nll_neutral": round(nll(M, neg, abl) - nll(M, neg), 5),
            "kl_concept": round(kl_ablate(M, pos, abl), 6),
            "kl_neutral": round(kl_ablate(M, neg, abl), 6),
        }
        save_json(f, rec)
        finals.append(rec)
        hits = {cc: sum(lex_hits(x["text"], LEXICON[cc]) for x in rec["grid"]["1.0"]) for cc in LEXICON}
        log(f"confirmed L{l}N{n} ({p['concept']}): +1 window hits {hits}; who@+1: {rec['grid']['1.0'][0]['text'][:90]!r}")

    # matched random control per layer used by finalists (same push size, same prompts)
    controls = {}
    for l in sorted({p["layer"] for p in picks}):
        f = ckpt / f"ctrl_L{l}.json"
        if f.exists():
            controls[l] = json.loads(f.read_text()); continue
        controls[l] = {"grid": grid(l, rand_dirs(1, M.d, 30_000 + l)[0])}
        save_json(f, controls[l])
        log(f"control L{l} done")

    # family ablation: zero every confirmed finalist of a concept, then measure that concept's text and loss
    fam = {}
    for c in LEXICON:
        members = [x for x in finals if x["concept"] == c]
        if not members:
            continue
        ab: dict[int, list[int]] = {}
        for x in members:
            ab.setdefault(x["layer"], []).append(x["neuron"])
        pos, neg = sets[c][0][:24], sets[c][1][:24]
        story = M.chat("Tell me a story about a villain." if c == "evil" else "Tell me about life on other planets.")
        base_t = M.generate([story], 60)[0][1]
        abl_t = M.generate([story], 60, ablate=ab)[0][1]
        top = max(members, key=lambda x: x["score"])
        lt, nt = top["layer"], top["neuron"]
        rest = {k: [n for n in v if not (k == lt and n == nt)] for k, v in ab.items()}
        rest = {k: v for k, v in rest.items() if v}
        vec = M.write_dirs(lt)[nt] * windows[lt] * norms[lt]
        who = M.chat("Who are you?")
        push_t = M.generate([who], GEN, layer=lt, vecs=vec)[0][1]
        push_rest_t = M.generate([who], GEN, layer=lt, vecs=vec, ablate=rest)[0][1] if rest else push_t
        fam[c] = {"members": [f"L{x['layer']}N{x['neuron']}" for x in members], "prompt": story,
                  "base": base_t, "ablated": abl_t,
                  "hits_base": lex_hits(base_t, LEXICON[c]), "hits_ablated": lex_hits(abl_t, LEXICON[c]),
                  "d_nll_concept": round(nll(M, pos, ab) - nll(M, pos), 5), "d_nll_neutral": round(nll(M, neg, ab) - nll(M, neg), 5),
                  "top": f"L{lt}N{nt}", "push_top": push_t, "push_top_family_off": push_rest_t}
        log(f"family {c}: {len(members)} neurons; hits {fam[c]['hits_base']}→{fam[c]['hits_ablated']}")

    # screen scatter for the candidate map (all screened units + controls)
    scatter = {"units": [], "controls": []}
    for l, r in scr.items():
        for u in r["units"]:
            scatter["units"].append([l, u["neuron"], round(u["z"], 3), round(u["pct"], 3), u["hits_evil"], u["hits_alien"],
                                     round(u["coh"], 3), "|".join(u["why"])])
        for c in r["controls"]:
            scatter["controls"].append([l, c["index"], round(c["z"], 3), c["hits_evil"], c["hits_alien"], round(c["coh"], 3)])
    out = {"manifest": manifest(M, stage="confirm", doses=DOSES, gen=GEN, per_concept=a.per_concept, other=a.other),
           "calib": calib, "prompts": [{k: v for k, v in p.items() if k != "text"} for p in P], "baseline": baseline,
           "doses": DOSES, "finalists": finals, "controls": {str(k): v for k, v in controls.items()}, "families": fam,
           "scatter": scatter, "lexicon": LEXICON,
           "reference": {"model": "Qwen3.5-4B", "unit": "L22·N2742", "prompt": "Who are you?", "quote": REF_QUOTE,
                         "source": "https://github.com/lyramakesmusic/neuron-explorer/blob/main/research_log.md"}}
    save_json(a.out / "hunt.json", out)
    log(f"wrote {a.out / 'hunt.json'} ({(a.out / 'hunt.json').stat().st_size / 1e6:.2f} MB)")


if __name__ == "__main__":
    main()
