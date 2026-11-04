#!/usr/bin/env bash
# Runs after the Qwen3.5 screen: confirm Qwen3.5, then the ADR-007 EM organism stages, one at a time.
# Each stage skips work already cached, so the chain can be restarted. Log: cache/chain.log
set -euo pipefail
cd "$(dirname "$0")/.."
PY=../.venv/bin/python
export OMP_NUM_THREADS=3 MKL_NUM_THREADS=3 THREADS=3
LOG=cache/chain.log
say() { echo "[$(date +%T)] $*" | tee -a "$LOG"; }
run() { say "start: $*"; "$PY" -u -m "$@" 2>&1 | grep --line-buffered -v -iE "warn|falling back|Loading weights|quantize_per_tensor|Fetching" | tee -a "$LOG"; say "done: $1"; }

while pgrep -f "python -u -m qwen.screen --cache cache/qwen\$" >/dev/null; do sleep 30; done
[ -f cache/qwen/screen/L23.json ] || { say "Qwen3.5 screen exited without L23; stopping"; exit 1; }

run qwen.confirm --cache cache/qwen

[ -f cache/em/merged/provenance.json ] || run em.merge --out cache/em/merged
[ -f cache/em/base/signals.npz ] || run qwen.discover --model Qwen/Qwen2.5-0.5B-Instruct --cache cache/em/base
[ -f cache/em/em/signals.npz ] || run qwen.discover --model cache/em/merged --cache cache/em/em
[ -f cache/em/shift.npz ] || run em.shift --base cache/em/base --em cache/em/em
run qwen.screen --model cache/em/merged --cache cache/em/em
run qwen.screen --model Qwen/Qwen2.5-0.5B-Instruct --cache cache/em/base
say "chain finished"
