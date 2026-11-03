"""Theme scoring shared by the Qwen hunt and the TinyStories studies.

A unit's theme score is the sum of the top five Poisson z-scores of words it writes more often than the
layer's random-direction controls do. Controls are scored leave-one-out. This is the same rule
`analyze.py` uses for the TinyStories sweep, restated here so other pipelines score identically.
"""

from __future__ import annotations

import re
from collections import Counter

import numpy as np

WORD = re.compile(r"[a-z]+|[一-鿿]+")
STOP = set(
    """a an the and or but so to of in on at for with as is was were be been it its he she they them his her
their him i you we me my our your this that there then than from by up out not no yes do did does had has have
one day all very said say says can will would could should may might am are what which who how when where why
also just like into about over more some any each other these those here now only well get got make made""".split()
)


def words(text: str, exclude: set[str] = frozenset()) -> set[str]:
    """Distinct content words of a rollout (lowercase, ≥3 letters, or CJK runs), minus stopwords and prompt words."""
    out = set()
    for w in WORD.findall(text.lower()):
        if w in STOP or w in exclude:
            continue
        if w.isascii() and len(w) < 3:
            continue
        out.add(w)
    return out


def unit_counts(rollouts: list[set[str]]) -> Counter:
    k = Counter()
    for ws in rollouts:
        k.update(ws)
    return k


def theme_mass(counts: Counter, ctrl_total: Counter, n_ctrl: int, n_cells: int, top: int = 5):
    """Sum of the top Poisson z-scores of words over-produced relative to controls; returns (mass, words, zs)."""
    scored = []
    for w, k in counts.items():
        if k < 2:
            continue
        lam = n_cells * (ctrl_total[w] / (n_ctrl * n_cells)) + 0.5
        scored.append(((k - lam) / np.sqrt(lam), w))
    scored.sort(reverse=True)
    best = [s for s in scored[:top] if s[0] > 0]
    return float(sum(s for s, _ in best)), [w for _, w in best], [float(s) for s, _ in best]


def score_layer(unit_rolls: list[list[set[str]]], ctrl_rolls: list[list[set[str]]]):
    """Score neurons and controls of one layer.

    unit_rolls[u][c] / ctrl_rolls[j][c]: word sets per rollout cell. Returns dict with per-unit mass, z, pct
    (share of controls beaten), above_null, themes, and per-control mass/z (leave-one-out).
    """
    n_cells = len(ctrl_rolls[0]) if ctrl_rolls else 1
    ctrl_counts = [unit_counts(r) for r in ctrl_rolls]
    total = Counter()
    for k in ctrl_counts:
        total.update(k)
    nc = len(ctrl_counts)
    cm = np.zeros(nc)
    ctrl_themes = []
    for j, k in enumerate(ctrl_counts):
        loo = total.copy()
        loo.subtract(k)
        cm[j], th, _ = theme_mass(k, loo, nc - 1, n_cells)
        ctrl_themes.append(th)
    mu, sd = float(cm.mean()), float(cm.std() + 1e-6)
    out = {"ctrl_mass": cm, "ctrl_z": (cm - mu) / sd, "ctrl_themes": ctrl_themes, "mu": mu, "sd": sd,
           "mass": [], "z": [], "pct": [], "above_null": [], "themes": [], "theme_z": []}
    for r in unit_rolls:
        m, th, zs = theme_mass(unit_counts(r), total, nc, n_cells)
        out["mass"].append(m)
        out["z"].append((m - mu) / sd)
        out["pct"].append(float((cm < m).mean()))
        out["above_null"].append(bool(m > cm.max()))
        out["themes"].append(th)
        out["theme_z"].append(zs)
    return out


def lexicon_rate(rollouts: list[str], lexicon: set[str]) -> float:
    """Share of rollouts containing at least one lexicon word (substring match, case-insensitive)."""
    if not rollouts:
        return 0.0
    hits = sum(any(w in t.lower() for w in lexicon) for t in rollouts)
    return hits / len(rollouts)


def distinct4(seq) -> float:
    grams = [tuple(seq[i : i + 4]) for i in range(len(seq) - 3)]
    return len(set(grams)) / len(grams) if grams else 1.0
