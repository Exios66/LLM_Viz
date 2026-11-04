#!/usr/bin/env bash
# Re-fit the EM model's screen windows with the monotone rule, screen EM and base, then build the packs.
set -euo pipefail
cd "$(dirname "$0")/.."
PY=../.venv/bin/python
export OMP_NUM_THREADS=3 MKL_NUM_THREADS=3 THREADS=3
LOG="$PWD/cache/chain.log"
say() { echo "[$(date +%T)] $*" | tee -a "$LOG"; }
scr() { "$PY" -u -m qwen.screen "$@" 2>&1 | grep --line-buffered -v -iE "falling back|Loading weights|quantize_per_tensor|Fetching|UserWarning|warnings.warn" | tee -a "$LOG"; }

say "start: EM screen (rewindow)"
scr --model cache/em/merged --cache cache/em/em --rewindow
say "done: EM screen"
say "start: base screen"
scr --model Qwen/Qwen2.5-0.5B-Instruct --cache cache/em/base
say "done: base screen"
say "chain finished"
exec em/packs.sh
