"""Stage 2 of the Qwen hunt: calibrate per-layer push windows, then steer every candidate and random controls.

    python -m qwen.screen --cache cache/qwen            (run from pipeline/; resumable per layer)

Int8 dynamic quantisation is used for speed (greedy text matched fp32 on the smoke test); finalists are
re-run in fp32 by confirm.py.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path

import numpy as np
import torch

from qwen.common import Model, log, manifest, save_json
from qwen.concepts import LEXICON
from scoring import distinct4, score_layer, words

CALIB_DOSES = [0.25, 0.5, 1.0, 2.0, 4.0, 8.0]
CALIB_DIRS = 8
GEN_SCREEN = 32
NORM_TEXTS = [
    "Once upon a time, there was a dragon who lived on a mountain.",
    "The history of the Roman Empire spans more than a thousand years.",
    "def fibonacci(n):\n    if n < 2:\n        return n",
    "Photosynthesis converts light energy into chemical energy in plants.",
    "我今天去了市场，买了一些新鲜的水果和蔬菜。",
    "The stock market fell sharply on Monday after the announcement.",
]


def prompts(M: Model) -> list[str]:
    return [M.chat("Who are you?"), M.chat("Tell me a short story."), "My favourite thing about the world is"]


def rand_dirs(n: int, d: int, seed: int) -> torch.Tensor:
    g = torch.Generator().manual_seed(seed)
    v = torch.randn(n, d, generator=g)
    return v / v.norm(dim=1, keepdim=True)


def rollouts(M: Model, layer: int, dirs: torch.Tensor, scale: float, P: list[str], bs: int, gen: int):
    """Greedy rollouts for each direction × prompt. Returns texts[u][p], ids[u][p]."""
    rows = [(u, p) for u in range(len(dirs)) for p in range(len(P))]
    texts = [[None] * len(P) for _ in range(len(dirs))]
    ids = [[None] * len(P) for _ in range(len(dirs))]
    for i in range(0, len(rows), bs):
        chunk = rows[i : i + bs]
        vecs = torch.stack([dirs[u] for u, _ in chunk]) * scale
        res = M.generate([P[p] for _, p in chunk], gen, layer=layer, vecs=vecs)
        for (u, p), (tid, txt) in zip(chunk, res):
            texts[u][p], ids[u][p] = txt, tid
    return texts, ids


def lex_hits(text: str, lex: list[str]) -> int:
    t = text.lower()
    return sum(t.count(w) for w in lex)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--cache", type=Path, default=Path("cache/qwen"))
    ap.add_argument("--controls", type=int, default=64)
    ap.add_argument("--bs", type=int, default=32)
    ap.add_argument("--seed", type=int, default=1)
    ap.add_argument("--layers", type=str, default="", help="comma list to restrict (debug)")
    a = ap.parse_args()
    out_dir = a.cache / "screen"
    out_dir.mkdir(parents=True, exist_ok=True)
    cands = json.loads((a.cache / "candidates.json").read_text())["candidates"]

    M = Model(int8=True)
    P = prompts(M)
    calib_path = a.cache / "calib.json"
    if calib_path.exists():
        calib = json.loads(calib_path.read_text())
    else:
        norms = M.resid_norms(NORM_TEXTS)
        log("median resid norms:", [round(x, 2) for x in norms])
        base = M.generate(P[:2], GEN_SCREEN)
        coh = np.zeros((M.L, len(CALIB_DOSES)))
        for l in range(M.L):
            dirs = rand_dirs(CALIB_DIRS, M.d, 10_000 + l)
            for j, dose in enumerate(CALIB_DOSES):
                _, ids = rollouts(M, l, dirs, dose * norms[l], P[:2], a.bs, GEN_SCREEN)
                coh[l, j] = np.mean([distinct4(x) for row in ids for x in row])
            log(f"calib L{l}: " + " ".join(f"{dz}:{c:.2f}" for dz, c in zip(CALIB_DOSES, coh[l])))
        windows = []
        for l in range(M.L):
            ok = [dz for dz, c in zip(CALIB_DOSES, coh[l]) if c >= 0.85]
            windows.append(max(ok) if ok else CALIB_DOSES[0])
        calib = {"norms": norms, "doses": CALIB_DOSES, "coherence": coh.tolist(), "windows": windows,
                 "baseline": [t for _, t in base], "prompts": P}
        save_json(calib_path, calib)
        log("windows:", windows)

    norms, windows = calib["norms"], calib["windows"]
    layers = [int(x) for x in a.layers.split(",")] if a.layers else range(M.L)
    for l in layers:
        f = out_dir / f"L{l}.json"
        if f.exists():
            continue
        mine = [c for c in cands if c["layer"] == l]
        W = M.write_dirs(l)
        dirs = torch.cat([W[[c["neuron"] for c in mine]], rand_dirs(a.controls, M.d, 20_000 + l)]) if mine else \
            rand_dirs(a.controls, M.d, 20_000 + l)
        scale = windows[l] * norms[l]
        texts, ids = rollouts(M, l, dirs, scale, P, a.bs, GEN_SCREEN)
        pw = [words(p) for p in P]
        wsets = [[words(t, pw[p]) for p, t in enumerate(row)] for row in texts]
        nU = len(mine)
        sc = score_layer(wsets[:nU], wsets[nU:])
        hits = {c: np.array([[lex_hits(t, LEXICON[c]) for t in row] for row in texts]).sum(1) for c in LEXICON}
        res = {"layer": l, "scale": scale, "window": windows[l], "units": [], "controls": []}
        for k in range(len(dirs)):
            rec = {"texts": texts[k], "coh": float(np.mean([distinct4(x) for x in ids[k]])),
                   **{f"hits_{c}": int(hits[c][k]) for c in LEXICON}}
            if k < nU:
                rec.update(neuron=mine[k]["neuron"], why=mine[k]["why"], z=sc["z"][k], pct=sc["pct"][k],
                           above_null=sc["above_null"][k], theme=sc["themes"][k], mass=sc["mass"][k])
                res["units"].append(rec)
            else:
                j = k - nU
                rec.update(index=j, z=float(sc["ctrl_z"][j]), mass=float(sc["ctrl_mass"][j]), theme=sc["ctrl_themes"][j])
                res["controls"].append(rec)
        save_json(f, res)
        best = sorted(res["units"], key=lambda r: -r["z"])[:3]
        log(f"screen L{l}: {nU} units + {a.controls} controls; above null {sum(r['above_null'] for r in res['units'])}; "
            f"evil hits max {max([r['hits_evil'] for r in res['units']], default=0)}, "
            f"alien hits max {max([r['hits_alien'] for r in res['units']], default=0)}; top: "
            + "; ".join(f"N{r['neuron']} z{r['z']:.1f} {r['theme'][:3]}" for r in best))
    save_json(a.cache / "screen_manifest.json", manifest(M, stage="screen", controls=a.controls, gen=GEN_SCREEN,
                                                          prompts=P, seed=a.seed))


if __name__ == "__main__":
    main()
