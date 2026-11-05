"""Re-run a sample of the published Qwen hunt in fp32 and check the recorded text comes back.

    python -m qwen.spotcheck                                       (run from pipeline/, ~1-2 min per neuron on 4 cores)
    python -m qwen.spotcheck --n 6 --seed 3 --hunt ../web/public/data/models/qwen3.5-0.8b/hunt.json

For each sampled finalist it regenerates the +1 and +1.5 window pushes on all six confirm prompts, in the same batch
confirm.py used (those 12 rows were one chunk of its dose grid), so padding and batch shape match. The model is
loaded at the revision pinned in the hunt manifest. Exits 1 when fewer than --min-rate of the texts match exactly.
"""

from __future__ import annotations

import argparse
import json
import random
import sys
from pathlib import Path

import torch

from qwen.common import Model, log
from qwen.confirm import confirm_prompts

DOSES = (1.0, 1.5)  # rows 24-35 of confirm's dose grid: one 12-row chunk at its default --bs 12


def main():
    """Replay sampled finalists and exit 0 if the exact-text match rate reaches --min-rate.

    Stops before generating if the record is int8, the dose grid, length or batch size differ from what DOSES
    assumes, or the model revision is missing or does not match the hunt's.
    """
    ap = argparse.ArgumentParser()
    ap.add_argument("--hunt", type=Path, default=Path("../web/public/data/models/qwen3.5-0.8b/hunt.json"))
    ap.add_argument("--n", type=int, default=3, help="finalists to re-run")
    ap.add_argument("--seed", type=int, default=0)
    ap.add_argument("--min-rate", type=float, default=0.8,
                    help="fraction of texts that must match exactly (fp32 kernels can flip near-tied tokens)")
    a = ap.parse_args()
    torch.set_grad_enabled(False)
    hunt = json.loads(a.hunt.read_text())
    man = hunt["manifest"]
    if man.get("int8"):
        raise SystemExit("this hunt record was made with int8 weights; the spot-check re-runs fp32 confirm records only")
    if list(hunt["doses"]) != [-1.0, -0.5, 0.25, 0.5, 1.0, 1.5] or man.get("gen") != 40:
        raise SystemExit("unexpected dose grid or length in the hunt manifest; update DOSES to match confirm.py's chunks")
    if man.get("bs", 12) != 12:  # manifests from before bs was recorded used the default 12
        raise SystemExit(f"the hunt was confirmed with --bs {man['bs']}; DOSES assumes 12-row chunks, so update it to match")
    if not man.get("revision"):
        raise SystemExit("the hunt manifest has no model revision, so there is no pinned model to replay")
    norms, windows = hunt["calib"]["norms"], hunt["calib"]["windows"]
    picks = random.Random(a.seed).sample(hunt["finalists"], min(a.n, len(hunt["finalists"])))

    M = Model(man["model"], revision=man["revision"])
    if M.revision != man["revision"]:
        raise SystemExit(f"loaded revision {M.revision}, but the hunt used {man['revision']}; not a faithful replay")
    P = confirm_prompts(M)
    match = total = 0
    for f in picks:
        l, n = f["layer"], f["neuron"]
        w = M.write_dirs(l)[n]
        rows = [(d, j) for d in DOSES for j in range(len(P))]
        vecs = torch.stack([w * d * windows[l] * norms[l] for d, _ in rows])
        out = M.generate([P[j]["text"] for _, j in rows], man["gen"], layer=l, vecs=vecs)
        ok = 0
        for (d, j), (_, txt) in zip(rows, out):
            rec = f["grid"][str(d)][j]["text"]
            if txt == rec:
                ok += 1
            else:
                log(f"  L{l}N{n} dose {d} {P[j]['id']}: differs\n    recorded {rec[:100]!r}\n    now      {txt[:100]!r}")
        log(f"L{l}N{n} ({f['concept']}): {ok}/{len(rows)} texts match")
        match += ok
        total += len(rows)
    rate = match / total
    log(f"spot-check: {match}/{total} texts match ({rate:.0%}); threshold {a.min_rate:.0%}")
    sys.exit(0 if rate >= a.min_rate else 1)


if __name__ == "__main__":
    main()
