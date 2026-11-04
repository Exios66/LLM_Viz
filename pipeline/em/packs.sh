#!/usr/bin/env bash
# After em/chain.sh: build the Qwen3.5 pack, confirm the EM model's top candidates, build the EM pack.
# Outputs land in web/public/data/models/ locally. The EM outputs are reviewed against the ADR-007
# publication rule before anything is committed. Log: cache/chain.log
set -euo pipefail
cd "$(dirname "$0")/.."
PY=../.venv/bin/python
export OMP_NUM_THREADS=3 MKL_NUM_THREADS=3 THREADS=3
LOG=cache/chain.log
OUT=../web/public/data/models
say() { echo "[$(date +%T)] $*" | tee -a "$LOG"; }
run() { say "start: $*"; "$PY" -u "$@" 2>&1 | grep --line-buffered -v -iE "warn|falling back|Loading weights|quantize_per_tensor|Fetching" | tee -a "$LOG"; say "done: $1 $2"; }

while pgrep -f "em/chain.sh" >/dev/null; do sleep 30; done
grep -q "chain finished" "$LOG" || { say "chain.sh did not finish; packs not built"; exit 1; }

[ -f "$OUT/qwen3-5-0-8b/space.json" ] || [ -f "$OUT/qwen3.5-0.8b/space.json" ] ||
  run build_model.py --model Qwen/Qwen3.5-0.8B --hunt cache/qwen --label "Qwen3.5-0.8B"
run -m qwen.confirm --model cache/em/merged --cache cache/em/em --out "$OUT/qwen2.5-0.5b-em"
run -m em.scan "$OUT/qwen2.5-0.5b-em/hunt.json"   # ADR-007 gate: harm-lexicon rollouts go to research-private/em/
run build_model.py --model cache/em/merged --slug qwen2.5-0.5b-em --hunt cache/em/em --shift cache/em/shift.npz \
  --label "Qwen2.5-0.5B, emergently misaligned"
say "packs finished"
