# Project status

**Phase:** Design (architecture proposed for `next-level-viz`), v1 in review (PR #1).

## Done
- v1 Neuron Atlas: in-browser TinyStories-8M runtime (verified vs PyTorch), 3D neuron map, inspector, probe, ablate/scale/steer/clamp edits. `[DISCOVERED]` matches code on branch `neuron-atlas`.
- Deploy switched to `npm run deploy` → `gh-pages` branch; Actions workflow removed (user request, 2026-11-03).
- Design spikes: random-direction null, per-layer residual norms, CPU sweep cost (~33 min for all neurons + controls).

## Next
- User alignment on `.10x/decisions/architect/next-level-viz.md` (open questions §10).
- Then Phase 1 (foundations) → Phase 2 (sweep + findings gallery).
