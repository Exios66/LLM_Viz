# ADR-008: Rebuild the 3D map as a transformer diagram with a two-hop web

**Status:** Accepted (implemented in f984e1e)
**Date:** 2026-11-04
**Feature:** v3-research-lab (ADR-006 follow-up)
**Author:** 10x-Team (Architect + Staff Engineer)

## Context
The user asked for the same quality of 3D rendering and composition as lyramakesmusic/neuron-explorer. The v2 map was a point cloud in
layer bands. It showed every neuron, but it did not show the model's structure, and the open neuron's connections were thin lines that
were hard to see.

## Decision
Draw the model as a diagram of a transformer, in Three.js with our own code. No renderer code is copied (see NOTICE).
- Layers run left to right. The residual stream is a wire along the floor. Each layer is a glass attention slab followed by a vertical
  sheet of its MLP neurons. Stems carry the stream up into both.
- Points use additive blending. Layers away from the focus fade with camera distance, and layers between the camera and the focus fade
  further, so the focused layer reads through them.
- The open neuron's web is drawn two hops deep in thick lines: amber for excitatory links, blue for inhibitory links. Dead ends are dimmer.
- A layer label flies the camera to face that layer. Opening an off-screen neuron pans it into view without zooming out. A button resets the view.
- Rendering is on demand. The pixel ratio drops when frames are slow. Labels are HTML buttons, so they stay focusable and readable by screen readers.
- The same component renders recorded packs (ADR-005), so Qwen and future packs share the layout.

## Alternatives Considered
| Alternative | Pros | Cons | Why not |
|---|---|---|---|
| Keep the point cloud, restyle it | Small change | Still no model structure | Did not meet the brief |
| Port neuron-explorer's renderer | Closest look | Licence and attribution risk; different data model | We take the composition idea only |
| 2D canvas / WebGL-free SVG | Lighter | 8,192–86,016 points are too many for SVG; loses depth | Scale |

## Consequences
- Positive: the map explains the architecture at a glance; the web is legible; recorded packs reuse it.
- Negative: MapView.tsx grew by about 300 lines; more GPU work per frame (mitigated by on-demand rendering and adaptive DPR).
- Risks: low-end GPUs. Mitigation: `.map-fallback` when WebGL is missing, and the three.js chunk loads only when the atlas opens (e2e-tested).

## Dependencies
ADR-005 (packs), ADR-006 (design tokens: `--c-excite`, `--c-inhibit`).
