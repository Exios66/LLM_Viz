"""Follow-up studies on the TinyStories-8M steering sweep: the objections a careful reader would raise.

    python pipeline/studies.py --corpus TinyStories-valid.txt --data web/public/data --cache pipeline/cache

1. Robustness. The above-null neurons re-run on 12 held-out prompts (greedy) and with sampled decoding (5 seeds),
   against fresh random directions of the same size. Does the theme survive outside the three sweep prompts?
2. Push-size curves. Theme-word rate and coherence against push size for the strongest neurons, with the same
   curve for random directions as the null.
3. Ablation. Each above-null neuron held at zero over 300 held-out stories: change in loss, KL, and the tokens
   most hurt or helped; random neurons of the same layers give the baseline. Family ablation: zero the threat
   family, then push the villain neuron and see whether the villain theme survives.
4. Villain circuit. Upstream neurons ranked by gradient × activation on L6·N179, the top ones verified by real
   ablation; downstream, which layer-7 neurons move when L6·N179 is pushed.
5. Families. Above-null neurons grouped by shared theme words and steer-lens overlap.

Writes web/public/data/studies.json (every number the Research page quotes) and checkpoints in --cache/studies/.
"""

from __future__ import annotations

import argparse
import json
import time
from collections import Counter
from pathlib import Path

import numpy as np
import torch
import torch.nn.functional as F
from transformers import AutoModelForCausalLM, AutoTokenizer

from scoring import STOP, distinct4, score_layer, words

MODEL_ID = "roneneldan/TinyStories-8M"
GEN = 40
VILLAIN = (6, 179)
HELD_OUT = [
    "Once upon a time, there was a small cat named Mia. She",
    "Sam had a red kite. He took it to the hill and",
    "The old tree in the garden was very big. One morning,",
    "Max and his sister wanted to bake a cake. They",
    "It was a rainy day. Lucy looked out of the window and saw",
    "There was a little boat on the lake. The boat",
    "Grandpa told a story about a dragon. The dragon",
    "Tom found a shiny box under his bed. He opened it and",
    "The birds were singing in the morning. Anna",
    "One day, a frog jumped into the pond. The frog",
    "Mom gave Ben a new toy car. Ben was so happy that",
    "At school, the teacher said, \"Today we will",
]
SAMPLE_PROMPTS = HELD_OUT[:3]
SEEDS = [11, 22, 33, 44, 55]
CURVE_DOSES = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 2.0, 2.5]
N_CTRL = 64


def log(*a):
    print(f"[{time.strftime('%H:%M:%S')}]", *a, flush=True)


def read_pack(base: Path):
    m = json.loads(base.with_suffix(".json").read_text())
    blob = base.with_suffix(".bin").read_bytes()
    dt = {"f32": np.float32, "f16": np.float16, "u16": np.uint16, "u32": np.uint32, "i8": np.int8}

    def get(name):
        e = m["arrays"][name]
        return np.frombuffer(blob, dt[e["dtype"]], offset=e["offset"], count=int(np.prod(e["shape"]))).reshape(e["shape"])

    return m["meta"], get


class Hooks:
    """Push (add to MLP output) and ablate (zero neurons before c_proj) on GPT-Neo."""

    def __init__(self, model):
        self.model = model
        self.hs = []

    def push(self, layer: int, vecs: torch.Tensor):
        v = vecs[:, None, :]
        self.hs.append(self.model.transformer.h[layer].mlp.register_forward_hook(lambda _m, _i, o: o + v))
        return self

    def ablate(self, layer_neurons: dict[int, list[int]]):
        for l, ns in layer_neurons.items():
            idx = torch.tensor(ns)

            def pre(_m, args, idx=idx):
                x = args[0].clone()
                x[..., idx] = 0
                return (x,)

            self.hs.append(self.model.transformer.h[l].mlp.c_proj.register_forward_pre_hook(pre))
        return self

    def __enter__(self):
        return self

    def __exit__(self, *a):
        for h in self.hs:
            h.remove()
        self.hs = []


@torch.no_grad()
def generate(model, tok, prompt: str, vecs: torch.Tensor | None, layer: int, sample_seed: int | None = None, ablate=None):
    B = 1 if vecs is None else vecs.shape[0]
    ids = tok(prompt, return_tensors="pt").input_ids.repeat(B, 1)
    h = Hooks(model)
    if vecs is not None:
        h.push(layer, vecs)
    if ablate:
        h.ablate(ablate)
    kw = dict(do_sample=False)
    if sample_seed is not None:
        torch.manual_seed(sample_seed)
        kw = dict(do_sample=True, temperature=1.0, top_p=0.9)
    with h:
        out = model.generate(ids, attention_mask=torch.ones_like(ids), max_new_tokens=GEN, pad_token_id=tok.eos_token_id,
                             eos_token_id=tok.eos_token_id, **kw)
    gen = out[:, ids.shape[1]:]
    return [(g[g != tok.eos_token_id].tolist(), tok.decode(g, skip_special_tokens=True)) for g in gen]


def theme_rate(texts: list[str], theme: list[str]) -> float:
    if not texts or not theme:
        return 0.0
    tw = set(theme)
    return float(np.mean([bool(words(t) & tw) for t in texts]))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--corpus", required=True)
    ap.add_argument("--data", type=Path, default=Path("web/public/data"))
    ap.add_argument("--cache", type=Path, default=Path("pipeline/cache"))
    ap.add_argument("--only", default="robust,curves,ablate,family,circuit,families")
    ap.add_argument("--threads", type=int, default=1)
    a = ap.parse_args()
    steps = set(a.only.split(","))
    torch.set_num_threads(a.threads)
    torch.set_grad_enabled(False)
    ck = a.cache / "studies"
    ck.mkdir(parents=True, exist_ok=True)

    meta, get = read_pack(a.data / "sweep")
    vocab_words = meta["words"]
    L, N = meta["layers"], meta["neurons"]
    window, rn = meta["window"], meta["resid_norm"]
    n_pct, n_z, n_theme = get("n_pct"), get("n_z"), get("n_theme")
    theme_of = lambda l, n: [vocab_words[i] for i in n_theme[l, n] if i != 65535]
    above = [(l, n) for l in range(L) for n in range(N) if n_pct[l, n] >= 1.0]
    log(f"{len(above)} above-null neurons")

    tok = AutoTokenizer.from_pretrained(MODEL_ID)
    model = AutoModelForCausalLM.from_pretrained(MODEL_ID).eval()
    D = model.config.hidden_size
    cols = torch.stack([model.transformer.h[l].mlp.c_proj.weight.T for l in range(L)])
    dirs = cols / cols.norm(dim=-1, keepdim=True)
    g = torch.Generator().manual_seed(98765)  # fresh controls, not the sweep's
    ctrl = torch.randn(L, N_CTRL, D, generator=g)
    ctrl = ctrl / ctrl.norm(dim=-1, keepdim=True)
    texts = [t.strip() for t in Path(a.corpus).read_text(encoding="utf-8").split("<|endoftext|>") if t.strip()]
    held_stories = texts[-300:]  # the atlas reads the first 3,000 stories; these are disjoint
    out = {"model": MODEL_ID, "held_out_prompts": HELD_OUT, "seeds": SEEDS, "n_ctrl": N_CTRL, "above": [f"L{l}N{n}" for l, n in above]}
    prev = a.data / "studies.json"
    if prev.exists():
        out = {**json.loads(prev.read_text()), **out}

    def save():
        (a.data / "studies.json").write_text(json.dumps(out, separators=(",", ":")))

    # ------------------------------------------------------------------ 1. robustness
    if "robust" in steps:
        f = ck / "robust.json"
        R = json.loads(f.read_text()) if f.exists() else {}
        layers = sorted({l for l, _ in above})
        for l in layers:
            if str(l) in R:
                continue
            units = [n for ll, n in above if ll == l]
            vec_u = dirs[l, units] * window[l] * rn[l]
            vec_c = ctrl[l] * window[l] * rn[l]
            def cells(vecs):
                rolls = [[] for _ in range(len(vecs))]
                txts = [[] for _ in range(len(vecs))]
                for p in HELD_OUT:
                    pw = words(p)
                    for i, (_, t) in enumerate(generate(model, tok, p, vecs, l)):
                        rolls[i].append(words(t, pw)); txts[i].append(t)
                for p in SAMPLE_PROMPTS:
                    pw = words(p)
                    for s in SEEDS:
                        for i, (_, t) in enumerate(generate(model, tok, p, vecs, l, sample_seed=s)):
                            rolls[i].append(words(t, pw)); txts[i].append(t)
                return rolls, txts
            ur, ut = cells(vec_u)
            cr, ct = cells(vec_c)
            sc = score_layer(ur, cr)
            res = []
            for i, n in enumerate(units):
                th = theme_of(l, n)
                ctrl_rates = [theme_rate(t, th) for t in ct]
                res.append({"unit": f"L{l}N{n}", "theme": th, "z": round(sc["z"][i], 3), "pct": round(sc["pct"][i], 3),
                            "above_null": sc["above_null"][i], "new_themes": sc["themes"][i],
                            "theme_rate": round(theme_rate(ut[i], th), 3), "ctrl_theme_rate": round(float(np.mean(ctrl_rates)), 3),
                            "ctrl_theme_rate_p95": round(float(np.percentile(ctrl_rates, 95)), 3),
                            "greedy_example": ut[i][0], "sampled_example": ut[i][len(HELD_OUT)]})
            R[str(l)] = {"units": res, "ctrl_z_max": round(float(sc["ctrl_z"].max()), 3)}
            f.write_text(json.dumps(R))
            log(f"robust L{l}: " + ", ".join(f"{r['unit']} pct {r['pct']:.2f} rate {r['theme_rate']:.2f}/{r['ctrl_theme_rate']:.2f}" for r in res))
        units = [u for v in R.values() for u in v["units"]]
        out["robustness"] = {
            "units": units,
            "n": len(units),
            "still_above_p95": sum(u["pct"] >= 0.95 for u in units),
            "still_above_null": sum(u["above_null"] for u in units),
            "theme_beats_ctrl_p95": sum(u["theme_rate"] > u["ctrl_theme_rate_p95"] for u in units),
            "cells_per_unit": len(HELD_OUT) + len(SAMPLE_PROMPTS) * len(SEEDS),
        }
        save()

    # ------------------------------------------------------------------ 2. push-size curves
    if "curves" in steps:
        f = ck / "curves.json"
        C = json.loads(f.read_text()) if f.exists() else {}
        top = sorted(above, key=lambda x: -n_z[x])[:8]
        if VILLAIN not in top:
            top.append(VILLAIN)
        for l, n in top:
            key = f"L{l}N{n}"
            if key in C:
                continue
            th = theme_of(l, n)
            row = {"unit": key, "theme": th, "doses": CURVE_DOSES, "rate": [], "coh": [], "ctrl_rate": [], "ctrl_coh": []}
            for d in CURVE_DOSES:
                vu = dirs[l, [n]] * d * window[l] * rn[l]
                vc = ctrl[l, :16] * d * window[l] * rn[l]
                ut, ucoh, cts, ccoh = [], [], [[] for _ in range(16)], []
                for p in HELD_OUT:
                    (ids, t), = generate(model, tok, p, vu, l)
                    ut.append(t); ucoh.append(distinct4(ids))
                    for i, (ids2, t2) in enumerate(generate(model, tok, p, vc, l)):
                        cts[i].append(t2); ccoh.append(distinct4(ids2))
                row["rate"].append(round(theme_rate(ut, th), 3))
                row["coh"].append(round(float(np.mean(ucoh)), 3))
                row["ctrl_rate"].append(round(float(np.mean([theme_rate(t, th) for t in cts])), 3))
                row["ctrl_coh"].append(round(float(np.mean(ccoh)), 3))
            C[key] = row
            f.write_text(json.dumps(C))
            log(f"curve {key}: rate {row['rate']} ctrl {row['ctrl_rate']}")
        out["curves"] = {"window_units": "multiples of the layer's coherent window", "units": list(C.values())}
        save()

    # ------------------------------------------------------------------ 3. ablation
    def nll_kl(ablate, stories, max_len=128):
        tot_d, tot_kl, cnt = 0.0, 0.0, 0
        tok_delta: Counter = Counter()
        tok_n: Counter = Counter()
        for s in stories:
            ids = tok(s, return_tensors="pt").input_ids[:, :max_len]
            if ids.shape[1] < 3:
                continue
            a_lp = F.log_softmax(model(ids).logits[0, :-1].float(), -1)
            with Hooks(model).ablate(ablate):
                b_lp = F.log_softmax(model(ids).logits[0, :-1].float(), -1)
            tgt = ids[0, 1:]
            la, lb = a_lp.gather(1, tgt[:, None])[:, 0], b_lp.gather(1, tgt[:, None])[:, 0]
            d = (la - lb)  # positive = ablation hurt the true token
            tot_d += float(d.sum()); cnt += len(tgt)
            tot_kl += float((a_lp.exp() * (a_lp - b_lp)).sum(-1).sum())
            for t, v in zip(tgt.tolist(), d.tolist()):
                tok_delta[t] += v; tok_n[t] += 1
        mean = {t: tok_delta[t] / tok_n[t] for t in tok_n if tok_n[t] >= 5}
        hurt = sorted(mean.items(), key=lambda x: -x[1])[:8]
        helped = sorted(mean.items(), key=lambda x: x[1])[:5]
        fmt = lambda xs: [[tok.decode([t]), round(v, 4)] for t, v in xs]
        return tot_d / cnt, tot_kl / cnt, fmt(hurt), fmt(helped)

    if "ablate" in steps:
        f = ck / "ablate.json"
        A = json.loads(f.read_text()) if f.exists() else {"units": {}, "random": {}}
        stories = held_stories
        for l, n in above:
            key = f"L{l}N{n}"
            if key in A["units"]:
                continue
            d, kl, hurt, helped = nll_kl({l: [n]}, stories)
            A["units"][key] = {"unit": key, "theme": theme_of(l, n), "d_nll": round(d, 6), "kl": round(kl, 7), "hurt": hurt, "helped": helped}
            f.write_text(json.dumps(A))
            log(f"ablate {key}: Δnll {d:+.5f} KL {kl:.2e} hurt {[h[0] for h in hurt[:4]]}")
        rng = np.random.default_rng(5)
        for l in sorted({l for l, _ in above}):
            for n in rng.choice(N, 3, replace=False).tolist():
                key = f"L{l}N{n}"
                if key in A["random"] or (l, n) in above:
                    continue
                d, kl, _, _ = nll_kl({l: [n]}, stories)
                A["random"][key] = {"unit": key, "d_nll": round(d, 6), "kl": round(kl, 7)}
                f.write_text(json.dumps(A))
        rnd = [v["d_nll"] for v in A["random"].values()]
        out["ablation"] = {"stories": len(stories), "max_tokens": 128, "units": list(A["units"].values()), "random": list(A["random"].values()),
                           "random_d_nll_p95": round(float(np.percentile(np.abs(rnd), 95)), 6) if rnd else None}
        save()

    # ------------------------------------------------------------------ 4a. family ablation (threat family vs villain push)
    if "family" in steps:
        threat_words = {"scared", "scary", "monster", "mean", "bully", "angry", "afraid", "loud", "noise", "run", "ran", "hide", "hid", "away", "spider", "wolf", "bad", "cry", "crying"}
        fam = [(l, n) for l, n in above if (l, n) != VILLAIN and set(theme_of(l, n)) & threat_words]
        vl, vn = VILLAIN
        vth = theme_of(vl, vn)
        vec = dirs[vl, [vn]] * window[vl] * rn[vl]
        ab = {}
        for l, n in fam:
            ab.setdefault(l, []).append(n)
        rng = np.random.default_rng(9)
        rand_ab = {}
        for l, n in fam:
            rand_ab.setdefault(l, []).append(int(rng.integers(N)))
        conds = {"push": None, "push_family_off": ab, "push_random_off": rand_ab}
        res = {"family": [f"L{l}N{n}" for l, n in fam], "villain": f"L{vl}N{vn}", "theme": vth, "conditions": {}}
        for name, abl in conds.items():
            txts = [generate(model, tok, p, vec, vl, ablate=abl)[0][1] for p in HELD_OUT]
            res["conditions"][name] = {"theme_rate": round(theme_rate(txts, vth), 3), "example": txts[0]}
        base_txt = [generate(model, tok, p, None, 0)[0][1] for p in HELD_OUT]
        res["conditions"]["no_push"] = {"theme_rate": round(theme_rate(base_txt, vth), 3), "example": base_txt[0]}
        out["family_ablation"] = res
        log(f"family ablation: {res['family']} → " + ", ".join(f"{k} {v['theme_rate']}" for k, v in res["conditions"].items()))
        save()

    # ------------------------------------------------------------------ 4b. villain circuit
    if "circuit" in steps:
        vl, vn = VILLAIN
        acts = {}
        def cap(l):
            def pre(_m, args):
                acts[l] = args[0]
            return model.transformer.h[l].mlp.c_proj.register_forward_pre_hook(pre)
        # stories where the villain neuron fires most
        scores = []
        hs = [cap(vl)]
        for s in texts[3000:4500]:
            ids = tok(s, return_tensors="pt").input_ids[:, :128]
            model(ids)
            scores.append(float(acts[vl][0, :, vn].max()))
        for h in hs:
            h.remove()
        top_idx = np.argsort(scores)[::-1][:40]
        stories = [texts[3000 + i] for i in top_idx]
        # gradient × activation attribution of upstream neurons to the villain's summed activation
        attr = torch.zeros(vl, N)
        torch.set_grad_enabled(True)
        for s in stories:
            ids = tok(s, return_tensors="pt").input_ids[:, :128]
            store = {}
            def keep(l):
                def pre(_m, args):
                    args[0].retain_grad(); store[l] = args[0]
                return model.transformer.h[l].mlp.c_proj.register_forward_pre_hook(pre)
            hs = [keep(l) for l in range(vl + 1)]
            model.zero_grad()
            model(ids)
            store[vl][0, :, vn].clamp(min=0).sum().backward()
            for l in range(vl):
                attr[l] += (store[l].grad[0] * store[l][0]).sum(0).detach()
            for h in hs:
                h.remove()
        torch.set_grad_enabled(False)
        flat = attr.flatten()
        cand = torch.cat([flat.topk(15).indices, (-flat).topk(10).indices]).tolist()
        # verify by real ablation: change in the villain's mean positive activation over the same stories
        def villain_mean(ablate=None):
            vals = []
            hs = [cap(vl)]
            h2 = Hooks(model)
            if ablate:
                h2.ablate(ablate)
            with h2:
                for s in stories:
                    model(tok(s, return_tensors="pt").input_ids[:, :128])
                    vals.append(float(acts[vl][0, :, vn].clamp(min=0).mean()))
            for h in hs:
                h.remove()
            return float(np.mean(vals))
        base = villain_mean()
        up = []
        for gi in cand:
            l, n = divmod(gi, N)
            v = villain_mean({l: [n]})
            up.append({"unit": f"L{l}N{n}", "attr": round(float(flat[gi]), 4), "ablated_change": round((v - base) / base, 4), "theme": theme_of(l, n)})
        up.sort(key=lambda x: x["ablated_change"])
        rng = np.random.default_rng(13)
        rand_changes = []
        for _ in range(20):
            l, n = int(rng.integers(vl)), int(rng.integers(N))
            rand_changes.append((villain_mean({l: [n]}) - base) / base)
        # downstream: layer-7 neurons that move most when the villain is pushed, on held-out prompts
        cap7 = {}
        def c7(_m, args):
            cap7["a"] = args[0]
        mean7 = []
        for push in (False, True):
            h = model.transformer.h[7].mlp.c_proj.register_forward_pre_hook(c7)
            hk = Hooks(model)
            if push:
                hk.push(vl, dirs[vl, [vn]] * window[vl] * rn[vl])
            with hk:
                vals = []
                for p in HELD_OUT:
                    model(tok(p, return_tensors="pt").input_ids)
                    vals.append(cap7["a"][0].mean(0))
            h.remove()
            mean7.append(torch.stack(vals).mean(0))
        delta = mean7[1] - mean7[0]
        down = [{"unit": f"L7N{int(i)}", "delta": round(float(delta[i]), 4), "theme": theme_of(7, int(i))} for i in delta.abs().topk(10).indices]
        out["circuit"] = {"villain": f"L{vl}N{vn}", "stories": len(stories), "baseline_mean_act": round(base, 5), "upstream": up,
                          "random_ablation_change_abs_p95": round(float(np.percentile(np.abs(rand_changes), 95)), 4), "downstream_l7": down}
        log(f"circuit: top upstream {[(u['unit'], u['ablated_change']) for u in up[:5]]}")
        save()

    # ------------------------------------------------------------------ 5. families
    if "families" in steps:
        up_ids, up_val = get("sl_up_ids"), get("sl_up_val").astype(np.float32)
        V = model.config.vocab_size
        def lens_vec(l, n):
            v = np.zeros(V, np.float32)
            v[up_ids[l, n]] = np.maximum(up_val[l, n], 0)
            return v / (np.linalg.norm(v) + 1e-9)
        U = above
        th = [set(theme_of(l, n)) for l, n in U]
        lv = np.stack([lens_vec(l, n) for l, n in U])
        sim = np.zeros((len(U), len(U)))
        for i in range(len(U)):
            for j in range(len(U)):
                jac = len(th[i] & th[j]) / max(1, len(th[i] | th[j]))
                sim[i, j] = 0.5 * jac + 0.5 * float(lv[i] @ lv[j])
        # single-link clustering at a fixed threshold
        parent = list(range(len(U)))
        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]; x = parent[x]
            return x
        for i in range(len(U)):
            for j in range(i + 1, len(U)):
                if sim[i, j] >= 0.3:
                    parent[find(i)] = find(j)
        groups: dict[int, list[int]] = {}
        for i in range(len(U)):
            groups.setdefault(find(i), []).append(i)
        fams = []
        for members in sorted(groups.values(), key=len, reverse=True):
            wc = Counter(w for i in members for w in th[i])
            fams.append({"members": [f"L{U[i][0]}N{U[i][1]}" for i in members], "words": [w for w, _ in wc.most_common(6)],
                         "layers": sorted({U[i][0] for i in members})})
        out["families"] = {"threshold": 0.3, "similarity": "0.5 × theme-word Jaccard + 0.5 × steer-lens cosine", "groups": fams}
        log(f"families: {[(len(f['members']), f['words'][:3]) for f in fams[:8]]}")
        save()

    log(f"wrote {a.data / 'studies.json'}")


if __name__ == "__main__":
    main()
