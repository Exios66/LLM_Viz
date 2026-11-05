"""Histogram of uniqueness z for every neuron and every random control, for the Home chart.

`score_hist` is called by analyze.py. Run this file to add the histogram to an existing
findings.json from the published sweep pack (the raw rollouts are not needed):

    python score_hist.py ../web/public/data
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

import numpy as np

STEP = 0.25


def score_hist(z_n: np.ndarray, above_null: np.ndarray, z_c: np.ndarray) -> dict:
    """Counts on shared bins of width STEP: neurons that beat every control in their layer,
    the other neurons, and the controls. Counts, not shares; the page scales each group."""
    lo = np.floor(min(z_n.min(), z_c.min()) / STEP) * STEP
    hi = np.ceil(max(z_n.max(), z_c.max()) / STEP) * STEP
    edges = np.arange(lo, hi + STEP / 2, STEP)
    count = lambda x: np.histogram(x, edges)[0].astype(int).tolist()
    return {
        "lo": float(lo), "step": STEP,
        "above_null": count(z_n[above_null]),
        "neurons": count(z_n[~above_null]),
        "controls": count(z_c),
    }


def read_pack(path: Path) -> dict[str, np.ndarray]:
    man = json.loads(path.with_suffix(".json").read_text())
    raw = path.with_suffix(".bin").read_bytes()
    out = {}
    for k, a in man["arrays"].items():
        if a["dtype"] == "f32":
            out[k] = np.frombuffer(raw, "<f4", a["bytes"] // 4, a["offset"]).reshape(a["shape"])
    return out


def main(data: Path) -> None:
    p = read_pack(data / "sweep")
    above = p["n_pct"] == 1.0
    f = json.loads((data / "findings.json").read_text())
    if int(above.sum()) != f["headline"]["neurons_above_null"]:
        raise SystemExit(f"pack has {int(above.sum())} neurons above null, findings.json says {f['headline']['neurons_above_null']}")
    f["score_hist"] = score_hist(p["n_z"], above, p["c_z"])
    (data / "findings.json").write_text(json.dumps(f, indent=1, ensure_ascii=False))
    print("score_hist:", len(f["score_hist"]["controls"]), "bins from", f["score_hist"]["lo"])


if __name__ == "__main__":
    main(Path(sys.argv[1] if len(sys.argv) > 1 else "../web/public/data"))
