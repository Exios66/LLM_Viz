# Project status

**Phase:** Phases 1–2 of `next-level-viz` built (sweep, findings, routing, hardening); PR #1 in review. Phase 3+ (GPT-2 via WebGPU) not started.

## Done
- v1 Neuron Atlas: in-browser TinyStories-8M runtime (verified vs PyTorch), 3D map, inspector, probe, edits.
- Deploy: `npm run deploy` → `gh-pages` branch, no Actions (user request, 2026-11-03). Not yet run.
- Full steering sweep (`pipeline/sweep.py`): 8,192 neurons + 2,048 random controls × 10 rollouts, per-layer calibrated windows `[0.8,0.6,0.8,0.6,0.4,0.4,0.6,0.8]`, steer lens (Δprob), co-firing correlations.
- `pipeline/analyze.py` → `sweep.bin` + `findings.json`; 17 curated cards in `pipeline/findings_curated.py`, 8 notes.
- UI: Findings and Method pages, uniqueness colouring, writes↔co-firing layout morph, steer lens, phase plot, random-direction column, hash routing.
- Hardening: pack validation, sanitised storage/findings, WebGL fallback, keyboard access, mobile layout.
- Tests: `npm run verify` (16/16 cards replay exactly; 47/48 random rollouts), Playwright 42/42 (stable over 3 runs).

## Next
- User: run `npm run deploy` and set Pages → `gh-pages` / root.
- Phase 3: GPT-2 small via WebGPU backend (design §8).
