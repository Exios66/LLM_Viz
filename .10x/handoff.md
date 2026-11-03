# Handoff

## Current handoff — principal-architect → staff engineer / EM (2026-11-03)
- Design: `.10x/decisions/architect/next-level-viz.md` (Option B: static packs + pluggable Backend + linked views).
- Start with Phase 1 (§8): pack v2 + PackLoader, Backend interface wrapping `web/src/lib/model.ts`, `unit:"resid"` doses with per-layer norms `[1.8, 2.2, 2.2, 2.5, 2.8, 2.9, 2.8, 44.1]`, selection store, URL codec, colour-ID picking.
- Integration points: `pipeline/build.py` (pack writer), `web/src/lib/{binpack,model,worker,runtime}.ts`, `web/src/store.ts`, `web/scripts/deploy-pages.sh`.
- Blocking question for Phase 2 content: the source of the "evil" neuron (§6.6, §10).

## History
- (none before this)
