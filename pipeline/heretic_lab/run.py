"""Run Heretic non-interactively on any Hugging Face model, CPU-scaled (ADR-002).

    ../.venv-heretic/bin/python heretic_lab/run.py --model Qwen/Qwen3.5-0.8B      (run from pipeline/)

Everything it produces stays in research-private/heretic/<slug>/ (gitignored, never deployed):
  config.toml, run.log, checkpoints/ (Optuna study), model/ (the modified weights, merged)
Then run heretic_lab/study.py with the same --model to evaluate it.
"""

from __future__ import annotations

import argparse
import os
import re
import shutil
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PRIVATE = ROOT / "research-private" / "heretic"


def slugify(model_id: str) -> str:
    return re.sub(r"[^a-z0-9.]+", "-", model_id.split("/")[-1].lower()).strip("-")


def main():
    """Run Heretic with CLI options and export the selected trial's merged model.

    Replaces any existing private model directory. Exits if the Heretic CLI is
    missing, the run fails, or the model directory is not created.
    """
    ap = argparse.ArgumentParser()
    ap.add_argument("--model", required=True)
    ap.add_argument("--config", type=Path, default=Path(__file__).with_name("config.cpu.toml"))
    ap.add_argument("--trials", type=int, help="override n_trials")
    ap.add_argument("--trial-index", type=int, default=0, help="index in Heretic's sorted Pareto front to export")
    a = ap.parse_args()

    out = PRIVATE / slugify(a.model)
    out.mkdir(parents=True, exist_ok=True)
    cfg = out / "config.toml"
    text = a.config.read_text()
    if a.trials:
        text = re.sub(r"(?m)^n_trials = \d+", f"n_trials = {a.trials}", text)
    cfg.write_text(text)
    heretic = Path(sys.executable).with_name("heretic")
    if not heretic.exists():
        raise SystemExit(f"heretic CLI not found next to {sys.executable}; run with .venv-heretic/bin/python")
    model_dir = out / "model"
    if model_dir.exists():
        shutil.rmtree(model_dir)
    # --trial-index skips the interactive trial menu, so Heretic never asks for additional trials
    # (it rejects --n-additional-trials 0: the value must be positive)
    cmd = [str(heretic), "--model", a.model, "--checkpoint-action", "restart", "--trial-index", str(a.trial_index),
           "--model-action", "save", "--save-directory", str(model_dir), "--export-strategy", "MERGE"]
    env = {**os.environ, "HERETIC_CONFIG_FILE": str(cfg), "TOKENIZERS_PARALLELISM": "false"}
    t0 = time.time()
    with open(out / "run.log", "w") as log:
        log.write(" ".join(cmd) + "\n\n")
        log.flush()
        p = subprocess.run(cmd, cwd=out, env=env, stdin=subprocess.DEVNULL, stdout=log, stderr=subprocess.STDOUT)
    print(f"heretic exited {p.returncode} after {(time.time() - t0) / 60:.1f} min; log: {out / 'run.log'}")
    if p.returncode != 0 or not model_dir.exists():
        raise SystemExit(1)


if __name__ == "__main__":
    main()
