"""What did the fine-tune change? Δd per neuron, and one matched candidate list for both models (ADR-007).

Inputs are the two discover runs, made with the same contrast sets and seed:

    python -m qwen.discover --model Qwen/Qwen2.5-0.5B-Instruct --cache cache/em/base
    python -m qwen.discover --model cache/em/merged             --cache cache/em/em
    python -m em.shift --base cache/em/base --em cache/em/em

Δd = d(EM) − d(base) for each concept. The fine-tune only adds a rank-32 update, so every neuron keeps its
index and the two models line up one to one.

Candidates are the top Δd neurons per concept (became more selective), the bottom Δd neurons (became less
selective), the top d(EM) neurons regardless of shift, and a random base-rate sample. The same list, with the
same random-control seeds, is written to both cache dirs, so `qwen.screen` scores the identical neurons in each
model. Discover's own picks are kept as candidates_discover.json.
"""

from __future__ import annotations

import argparse
import json
import shutil
from pathlib import Path

import numpy as np

CONCEPTS = ("evil", "alien")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", type=Path, default=Path("cache/em/base"))
    ap.add_argument("--em", type=Path, default=Path("cache/em/em"))
    ap.add_argument("--up", type=int, default=150, help="largest positive Δd per concept")
    ap.add_argument("--down", type=int, default=40, help="largest negative Δd per concept")
    ap.add_argument("--top-em", type=int, default=60, help="largest d(EM) per concept, whatever the shift")
    ap.add_argument("--random", type=int, default=256)
    ap.add_argument("--seed", type=int, default=0)
    a = ap.parse_args()

    sb, se = np.load(a.base / "signals.npz"), np.load(a.em / "signals.npz")
    L, N = sb["d_evil"].shape
    if se["d_evil"].shape != (L, N):
        raise ValueError(f"shape mismatch: base {(L, N)} vs EM {se['d_evil'].shape}")

    dd = {c: se[f"d_{c}"] - sb[f"d_{c}"] for c in CONCEPTS}
    picked: dict[int, set[str]] = {}

    def take(flat_idx, tag):
        for f in flat_idx:
            picked.setdefault(int(f), set()).add(tag)

    for c in CONCEPTS:
        flat = dd[c].ravel()
        order = np.argsort(-flat)
        take(order[: a.up], f"{c}:shift_up")
        take(order[::-1][: a.down], f"{c}:shift_down")
        take(np.argsort(-se[f"d_{c}"].ravel())[: a.top_em], f"{c}:em_top")
        print(f"Δd {c}: mean {flat.mean():+.4f} sd {flat.std():.4f}; max {flat.max():+.3f} at L{order[0] // N}N{order[0] % N}; "
              f"min {flat.min():+.3f}; |Δd|>0.5 in {(np.abs(flat) > 0.5).sum()} neurons", flush=True)
    rng = np.random.default_rng(a.seed)
    rest = np.setdiff1d(np.arange(L * N), np.fromiter(picked, int))
    take(rng.choice(rest, a.random, replace=False), "random")

    cands = []
    for f, why in sorted(picked.items()):
        l, n = divmod(f, N)
        cands.append({"layer": l, "neuron": n, "why": sorted(why),
                      **{f"d_{c}_base": round(float(sb[f"d_{c}"][l, n]), 3) for c in CONCEPTS},
                      **{f"d_{c}": round(float(se[f"d_{c}"][l, n]), 3) for c in CONCEPTS},
                      **{f"dd_{c}": round(float(dd[c][l, n]), 3) for c in CONCEPTS},
                      **{f"wz_{c}": round(float(se[f"wz_{c}"][l, n]), 3) for c in CONCEPTS}})

    np.savez_compressed(a.em.parent / "shift.npz", **{f"dd_{c}": dd[c] for c in CONCEPTS},
                        **{f"d_{c}_base": sb[f"d_{c}"] for c in CONCEPTS}, **{f"d_{c}_em": se[f"d_{c}"] for c in CONCEPTS})
    for d, src in ((a.base, sb), (a.em, se)):
        man = json.loads((d / "candidates.json").read_text())["manifest"]
        if not (d / "candidates_discover.json").exists():
            shutil.copy(d / "candidates.json", d / "candidates_discover.json")
        (d / "candidates.json").write_text(json.dumps(
            {"manifest": {**man, "stage": "shift", "shift": {"up": a.up, "down": a.down, "top_em": a.top_em, "random": a.random,
                                                            "seed": a.seed}},
             "candidates": cands}, indent=1))
    n_r = sum(1 for c in cands if c["why"] == ["random"])
    print(f"{len(cands)} matched candidates ({len(cands) - n_r} by shift or d, {n_r} random) → {a.base}, {a.em}", flush=True)


if __name__ == "__main__":
    main()
