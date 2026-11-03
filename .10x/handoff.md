# Handoff

## Current handoff — principal-architect → staff engineer / EM (2026-11-03)
- Design: `.10x/decisions/architect/next-level-viz.md` (Option B: static packs + pluggable Backend + linked views).
- Start with Phase 1 (§8): pack v2 + PackLoader, Backend interface wrapping `web/src/lib/model.ts`, `unit:"resid"` doses with per-layer norms `[1.78, 2.20, 2.17, 2.48, 2.82, 2.84, 2.83, 3.26]` (block outputs; see the correction in §4.3), selection store, URL codec, colour-ID picking.
- Integration points: `pipeline/build.py` (pack writer), `web/src/lib/{binpack,model,worker,runtime}.ts`, `web/src/store.ts`, `web/scripts/deploy-pages.sh`.
- Blocking question for Phase 2 content: the source of the "evil" neuron (§6.6, §10).

## History
- (none before this)
