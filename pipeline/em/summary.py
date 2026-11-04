"""Public numbers behind the EM report (ADR-007), so reports.py can regenerate it from the repository alone.

The inputs live in the gitignored cache: shift.npz (Δd per neuron), null_shift.json (the random-update null)
and the two screen runs. The screen records hold rollout texts that were never harm-scanned, so only numbers
are copied out: per-neuron Δd, lexicon hit counts, theme words and push sizes. No generated text.

    python -m em.summary --out ../web/public/data/models/qwen2.5-0.5b-em/em_summary.json
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path

import numpy as np


def screens(d: Path) -> dict[int, dict]:
    return {int(f.stem[1:]): json.loads(f.read_text()) for f in sorted(d.glob("L*.json"), key=lambda f: int(f.stem[1:]))}


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--cache", type=Path, default=Path("cache/em"))
    ap.add_argument("--out", type=Path, default=Path("../web/public/data/models/qwen2.5-0.5b-em/em_summary.json"))
    a = ap.parse_args()
    sh = np.load(a.cache / "shift.npz")
    L, N = sh["dd_evil"].shape
    out = {"layers": L, "neurons": N, "null": json.loads((a.cache / "null_shift.json").read_text())["concepts"],
           "big_shift_by_layer": {c: (np.abs(sh[f"dd_{c}"]) > 0.5).sum(1).tolist() for c in ("evil", "alien")}, "screens": {}}
    keep = ("neuron", "why", "hits_evil", "hits_alien", "above_null", "theme", "z")
    for m in ("em", "base"):
        sc = screens(a.cache / m / "screen")
        if len(sc) != L:
            raise SystemExit(f"{m} screen has {len(sc)} of {L} layers")
        out.setdefault("screen_prompts", len(next(iter(sc.values()))["units"][0]["texts"]))
        out["screens"][m] = {str(l): {"window": r["window"],
                                      "units": [{k: u[k] for k in keep} for u in r["units"]],
                                      "controls": [{"hits_evil": c["hits_evil"], "hits_alien": c["hits_alien"]} for c in r["controls"]]}
                             for l, r in sc.items()}
    units = {(int(l), u["neuron"]) for l, r in out["screens"]["em"].items() for u in r["units"]}
    out["dd"] = {f"{l}:{n}": [round(float(sh["dd_evil"][l, n]), 4), round(float(sh["dd_alien"][l, n]), 4)] for l, n in sorted(units)}
    a.out.write_text(json.dumps(out, ensure_ascii=False, separators=(",", ":")))
    print(f"wrote {a.out} ({a.out.stat().st_size / 1e3:.0f} kB, {len(units)} neurons)")


if __name__ == "__main__":
    main()
