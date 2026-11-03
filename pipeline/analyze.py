"""Score the steering sweep against random-direction controls and export web data.

    python pipeline/analyze.py --cache pipeline/cache --data web/public/data

Reads the cache written by sweep.py plus atlas/tokenizer data from build.py, and writes:
  <data>/sweep.json / sweep.bin    per-unit scores, rollouts, steer lens, co-firing layout
  <data>/findings.json             layer statistics, curated finding cards, reference cards
  <cache>/report.md                candidate list for curation (not shipped)

Scoring (per layer, rises only, after neuron-explorer's rank.py / shift.py):
  For each unit (neuron or random direction) and word w, k = number of the unit's 10
  rollouts containing w. The control rate p(w) is the mean of k/10 over the layer's random
  directions (leave-one-out when scoring a control). Word z = (k - 10p - 0.5) / sqrt(10p + 0.5),
  for k >= 2. Theme mass = sum of the top-5 word z. A unit's uniqueness is its theme mass as
  a z-score against the layer's controls, and `pct` the share of controls it beats.
"""

from __future__ import annotations

import argparse
import json
import re
import time
from collections import Counter
from pathlib import Path

import numpy as np
from transformers import AutoTokenizer

from binpack import write_pack
from build import sheet_layout
from findings_curated import CARDS, NOTES, REFERENCE
from sweep import FREE, GEN, MODEL_ID, PROMPTS

WORD = re.compile(r"[a-z]+")
STOP = set("""a an the and or but so to of in on at for with as is was were be been it its he she they them his her
their him i you we me my our your this that there then than from by up out not no yes do did does had has have
one day all very said say says""".split())


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


def distinct4(seq):
    grams = [tuple(seq[i : i + 4]) for i in range(len(seq) - 3)]
    return len(set(grams)) / len(grams) if grams else 1.0


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--cache", default="pipeline/cache")
    ap.add_argument("--data", default="web/public/data")
    args = ap.parse_args()
    cache, data = Path(args.cache), Path(args.data)

    tok = AutoTokenizer.from_pretrained(MODEL_ID)
    EOS = tok.eos_token_id
    tj = json.loads((data / "tokenizer.json").read_text())
    vocab = tok.get_vocab()
    new_of_old = {vocab[s]: i for i, s in enumerate(tj["tokens"])}
    byte_new = {s: i for i, s in enumerate(tj["tokens"]) if len(s) == 1}

    norms = json.loads((cache / "norms.json").read_text())
    rn = norms["resid_norm"]
    col_norm = np.array(norms["col_norm"], dtype=np.float32)
    cal = np.load(cache / "calib.npz")
    raw = np.load(cache / "sweep_raw.npz")
    roll, base, window, cells = raw["rollouts"], raw["baselines"], raw["window"], raw["cells"]
    L, U, C, G = roll.shape
    N = col_norm.shape[1]
    NC = U - N
    sl = np.load(cache / "steerlens.npz")
    cof = np.load(cache / "cofire.npz")
    ameta, aget = read_pack(data / "atlas")

    # ---------------------------------------------------------------- decode rollouts
    def text(ids):
        ids = [int(t) for t in ids]
        if EOS in ids:
            ids = ids[: ids.index(EOS)]
        return tok.decode(ids)

    prompt_words = set(WORD.findall(" ".join(PROMPTS + [FREE]).lower()))
    words_of = np.empty((L, U, C), dtype=object)
    texts = np.empty((L, U, C), dtype=object)
    for l in range(L):
        for u in range(U):
            for c in range(C):
                t = text(roll[l, u, c])
                texts[l, u, c] = t
                words_of[l, u, c] = {w for w in WORD.findall(t.lower()) if len(w) >= 3 and w not in STOP and w not in prompt_words}
    log("decoded rollouts")

    # ---------------------------------------------------------------- score
    def unit_counts(l, u):
        k = Counter()
        for c in range(C):
            k.update(words_of[l, u, c])
        return k

    z_n = np.zeros((L, N), np.float32)
    pct_n = np.zeros((L, N), np.float32)
    mass_n = np.zeros((L, N), np.float32)
    z_c = np.zeros((L, NC), np.float32)
    theme_n = [[[] for _ in range(N)] for _ in range(L)]
    theme_c = [[[] for _ in range(NC)] for _ in range(L)]
    coh_n = np.zeros((L, N), np.float32)
    coh_c = np.zeros((L, NC), np.float32)
    cons_n = np.zeros((L, N), np.float32)
    cons_c = np.zeros((L, NC), np.float32)
    naive_n = np.zeros((L, N), bool)
    naive_c = np.zeros((L, NC), bool)
    above_null = np.zeros((L, N), bool)
    plus_cells = [i for i, (_, s) in enumerate(cells) if s == 1.0]
    groups = [[i for i, (p, _) in enumerate(cells) if p == pi] for pi in range(4)]

    for l in range(L):
        counts = [unit_counts(l, u) for u in range(U)]
        ctrl_total = Counter()
        for u in range(N, U):
            ctrl_total.update(counts[u])

        def mass(u, loo):
            tot = ctrl_total.copy()
            n_ctrl = NC
            if loo:
                tot.subtract(counts[u])
                n_ctrl -= 1
            scored = []
            for w, k in counts[u].items():
                if k < 2:
                    continue
                lam = C * (tot[w] / (n_ctrl * C)) + 0.5
                scored.append(((k - lam) / np.sqrt(lam), w))
            scored.sort(reverse=True)
            top = [s for s in scored[:5] if s[0] > 0]
            return sum(s for s, _ in top), [w for _, w in top]

        cm = np.zeros(NC)
        for j, u in enumerate(range(N, U)):
            cm[j], theme_c[l][j] = mass(u, True)
        mu, sd = cm.mean(), cm.std() + 1e-6
        z_c[l] = (cm - mu) / sd
        for n in range(N):
            m, th = mass(n, False)
            mass_n[l, n] = m
            theme_n[l][n] = th
            z_n[l, n] = (m - mu) / sd
            pct_n[l, n] = (cm < m).mean()
            above_null[l, n] = m > cm.max()
        for u in range(U):
            coh = np.mean([distinct4([t for t in roll[l, u, c] if t != EOS]) for c in plus_cells])
            th = theme_n[l][u] if u < N else theme_c[l][u - N]
            cons = np.mean([any(th[0] in words_of[l, u, c] for c in grp) for grp in groups]) if th else 0.0
            naive = max(counts[u].values(), default=0) >= 5
            if u < N:
                coh_n[l, u], cons_n[l, u], naive_n[l, u] = coh, cons, naive
            else:
                coh_c[l, u - N], cons_c[l, u - N], naive_c[l, u - N] = coh, cons, naive
        log(f"scored L{l}: above null {above_null[l].mean():.1%}, ctrl mass mean {mu:.1f} sd {sd:.1f}")

    # ---------------------------------------------------------------- reads-what-it-writes
    K = ameta["topk"]
    ctoks_m, cget = read_pack(data / "corpus")
    ctoks, coffs = cget("tokens"), cget("offsets")
    ex_story, ex_pos = aget("ex_story"), aget("ex_pos")
    def stem(w):
        return w[:5]
    rw = np.zeros((L, N), np.float32)
    for l in range(L):
        for n in range(N):
            peaks = set()
            for k in range(K):
                t = int(ctoks[coffs[ex_story[l, n, k]] + ex_pos[l, n, k]])
                w = tj["tokens"][t].replace("Ġ", "").lower()
                if WORD.fullmatch(w) and len(w) >= 3:
                    peaks.add(stem(w))
            th = {stem(w) for w in theme_n[l][n]}
            rw[l, n] = len(th & peaks) / max(1, len(th))

    # ---------------------------------------------------------------- lens agreement, co-firing
    lens_ids = aget("lens_ids")  # [L,N,2,K] new ids
    up_new = np.vectorize(lambda o: new_of_old.get(int(o), 65535))(sl["up_ids"]).astype(np.uint16)
    dn_new = np.vectorize(lambda o: new_of_old.get(int(o), 65535))(sl["dn_ids"]).astype(np.uint16)
    lens_agree = np.zeros((L, N), np.float32)
    for l in range(L):
        for n in range(N):
            a, b = set(lens_ids[l, n, 0].tolist()), set(up_new[l, n].tolist())
            lens_agree[l, n] = len(a & b) / len(a | b)

    corr = cof["corr"].astype(np.float32)
    writes_layout = aget("layout")
    side = ameta["grid"]
    cof_layout = np.zeros((L, N, 2), np.float32)
    neigh = []
    rng = np.random.default_rng(0)

    def neighbour_corr(layout, c):
        cell = np.round((layout + 1) / 2 * (side - 1)).astype(int)
        at = -np.ones((side, side), int)
        for n, (x, y) in enumerate(cell):
            at[x, y] = n
        vals = []
        for x in range(side):
            for y in range(side):
                for dx, dy in ((1, 0), (0, 1)):
                    if x + dx < side and y + dy < side:
                        vals.append(c[at[x, y], at[x + dx, y + dy]])
        return float(np.mean(vals))

    for l in range(L):
        c = np.nan_to_num(corr[l])
        cof_layout[l] = sheet_layout(c.copy(), side)
        perm = writes_layout[l][rng.permutation(N)]
        neigh.append({
            "writes": neighbour_corr(writes_layout[l], c),
            "cofire": neighbour_corr(cof_layout[l], c),
            "random": neighbour_corr(perm, c),
        })
    log("lens agreement + co-firing done")

    # ---------------------------------------------------------------- export arrays
    words = sorted({w for l in range(L) for th in theme_n[l] + theme_c[l] for w in th})
    widx = {w: i for i, w in enumerate(words)}

    def theme_arr(themes):
        a = np.full((len(themes), len(themes[0]), 5), 65535, np.uint16)
        for l, row in enumerate(themes):
            for u, th in enumerate(row):
                for k, w in enumerate(th[:5]):
                    a[l, u, k] = widx[w]
        return a

    def to_new(ids):
        out = []
        for t in ids:
            t = int(t)
            if t == EOS:
                break
            if t in new_of_old:
                out.append(new_of_old[t])
            else:  # pruned token: spell it with byte tokens
                out.extend(byte_new[ch] for ch in tok.convert_ids_to_tokens(t))
        out = out[:G]
        return out + [65535] * (G - len(out))

    roll_new = np.zeros((L, U, C, G), np.uint16)
    for l in range(L):
        for u in range(U):
            for c in range(C):
                roll_new[l, u, c] = to_new(roll[l, u, c])
    base_new = np.array([to_new(b) for b in base], np.uint16)

    arrays = {
        "col_norm": ("f32", col_norm),
        "n_z": ("f32", z_n), "n_pct": ("f32", pct_n), "n_coh": ("f32", coh_n), "n_cons": ("f32", cons_n), "n_rw": ("f32", rw),
        "n_theme": ("u16", theme_arr(theme_n)),
        "c_z": ("f32", z_c), "c_coh": ("f32", coh_c), "c_cons": ("f32", cons_c),
        "c_theme": ("u16", theme_arr(theme_c)),
        "roll": ("u16", roll_new), "base": ("u16", base_new),
        "sl_up_ids": ("u16", up_new), "sl_up_val": ("f16", sl["up_val"]),
        "sl_dn_ids": ("u16", dn_new), "sl_dn_val": ("f16", sl["dn_val"]),
        "sl_kl": ("f32", sl["kl"]),
        "cofire_layout": ("f32", cof_layout),
    }
    meta = {
        "layers": L, "neurons": N, "n_ctrl": NC, "gen": G, "prompts": PROMPTS + [FREE],
        "cells": cells.tolist(), "window": window.tolist(), "resid_norm": rn, "words": words,
        "calib": {"doses": cal["doses"].tolist(), "coherence": cal["coherence"].round(4).tolist()},
    }
    size = write_pack(data / "sweep", arrays, meta)
    log(f"sweep.bin {size / 1e6:.1f} MB")

    # ---------------------------------------------------------------- findings.json
    order = np.argsort(-z_n.ravel())
    rank_of = np.empty(L * N, int)
    rank_of[order] = np.arange(1, L * N + 1)
    layers = []
    for l in range(L):
        ab = above_null[l]
        layers.append({
            "layer": l, "window": float(window[l]), "resid_norm": float(rn[l]),
            "above_null": float(ab.mean()), "above_p95": float((pct_n[l] >= 0.95).mean()),
            "rw_share": float((rw[l][ab] > 0).mean()) if ab.any() else 0.0,
            "coherence": float(coh_n[l].mean()), "coherence_ctrl": float(coh_c[l].mean()),
            "lens_agreement": float(lens_agree[l].mean()),
            "kl_median": float(np.median(sl["kl"][l, :, 0])),
            "neighbour_cofire": neigh[l],
        })

    def cell_of(prompt, dose_mult):
        for i, (p, s) in enumerate(cells):
            if PROMPTS_ALL[p] == prompt and abs(s - dose_mult) < 1e-6:
                return i
        raise ValueError(f"no sweep cell for {prompt!r} × {dose_mult}")

    PROMPTS_ALL = PROMPTS + [FREE]
    cards = []
    for spec in CARDS:
        l, n = spec["layer"], spec["neuron"]
        ci = cell_of(spec["prompt"], spec["dose_mult"])
        pi = int(cells[ci][0])
        g = l * N + n
        ctrl = spec["kind"] == "control"  # `neuron` is then the index of a random control direction
        cards.append({
            "id": spec["id"], "title": spec["title"], "layer": l, "neuron": n, "kind": spec["kind"],
            "summary": spec["summary"], "prompt": spec["prompt"],
            "dose": float(spec["dose_mult"] * window[l]),
            "baseline": text(base[pi]), "steered": texts[l, N + n, ci] if ctrl else texts[l, n, ci],
            "z": float(z_c[l, n] if ctrl else z_n[l, n]),
            "pct": float((z_c[l] < z_c[l, n]).mean()) if ctrl else float(pct_n[l, n]),
            "rank": 0 if ctrl else int(rank_of[g]),
            "themes": theme_c[l][n] if ctrl else theme_n[l][n],
        })
    findings = {
        "generated": time.strftime("%Y-%m-%d"),
        "headline": {
            "neurons_above_null": int(above_null.sum()), "neurons": int(L * N),
            "controls_naive_theme": int(naive_c.sum()), "controls": int(L * NC),
            "neurons_naive_theme": int(naive_n.sum()),
        },
        "layers": layers, "cards": cards, "reference": REFERENCE, "notes": NOTES,
    }
    (data / "findings.json").write_text(json.dumps(findings, indent=1, ensure_ascii=False))
    log(f"findings.json: {len(cards)} cards")

    # ---------------------------------------------------------------- curation report
    lines = ["# Sweep candidates\n"]
    for l in range(L):
        lines.append(f"\n## Layer {l} (window {window[l]:.2f} × resid {rn[l]:.2f}) above-null {above_null[l].mean():.1%}\n")
        idx = np.argsort(-z_n[l])[:25]
        for n in idx:
            lines.append(f"- **L{l}N{n}** z={z_n[l, n]:.1f} pct={pct_n[l, n]:.2f} coh={coh_n[l, n]:.2f} cons={cons_n[l, n]:.2f} "
                         f"rw={rw[l, n]:.2f} themes={theme_n[l][n]}")
            for c in (plus_cells[0], plus_cells[1], C - 1):
                lines.append(f"    - [{cells[c][0]}×{cells[c][1]}] {texts[l, n, c][:160]!r}")
        cz = np.argsort(-z_c[l])[:3]
        for j in cz:
            lines.append(f"- CONTROL c{j} z={z_c[l, j]:.1f} themes={theme_c[l][j]} :: {texts[l, N + j, plus_cells[0]][:120]!r}")
    (cache / "report.md").write_text("\n".join(lines))
    log("report.md written")


if __name__ == "__main__":
    main()
