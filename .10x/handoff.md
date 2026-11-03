# Handoff

## Current handoff — principal-architect (implementing) → reviewer / user (2026-11-03)
- Phases 1–2 delivered on `neuron-atlas` (PR #1). Findings resolved §6.6: the reference has no "evil" neuron; TinyStories' closest analogues are L6·N179 (villain) and L7·N756 (misfortune), both above the random-direction null.
- Notable deviation from the design: the steer lens ranks by Δprobability, not Δlog-prob (log-prob ranking surfaced rare subword fragments). Lens agreement still uses top Δlog-prob ids, stored as `lp_ids`.
- Regenerate: `sweep.py` (~40 min CPU) → `analyze.py` (15 s) → `npm run verify` → `npm run test:e2e`.
- Open: deploy (user action), GPT-2/WebGPU phase.

## Previous handoff — principal-architect → staff engineer / EM (2026-11-03)
- Design: `.10x/decisions/architect/next-level-viz.md` (Option B: static packs + pluggable Backend + linked views).
- Start with Phase 1 (§8): pack v2 + PackLoader, Backend interface wrapping `web/src/lib/model.ts`, `unit:"resid"` doses with per-layer norms `[1.78, 2.20, 2.17, 2.48, 2.82, 2.84, 2.83, 3.26]` (block outputs; see the correction in §4.3), selection store, URL codec, colour-ID picking.
- Integration points: `pipeline/build.py` (pack writer), `web/src/lib/{binpack,model,worker,runtime}.ts`, `web/src/store.ts`, `web/scripts/deploy-pages.sh`.
- Blocking question for Phase 2 content: the source of the "evil" neuron (§6.6, §10).

## History
- (none before this)
