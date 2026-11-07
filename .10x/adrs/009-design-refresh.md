# ADR-009: Design refresh: the layer-stack hero, segmented tracks and instrument chrome

**Status:** Accepted
**Date:** 2026-11-07
**Feature:** v3-research-lab (follow-up 4)
**Builds on:** ADR-006 (the "dark-field specimen atlas" design system). The palette, type and copy voice are unchanged.

## Context
ADR-006 set the identity, but the site still read as a set of flat panels. Home had no picture of the model, so its one orchestrated moment (a push pulse travelling up the layer stack) had nothing to travel through. The long pages had no way to move around in them, and controls with 3 px corners felt dated next to the rest.

## Decision
**Home**
- The hero pairs the headline with an SVG drawing of the model: eight neuron sheets, with the residual stream running up through them. It is plain SVG and CSS, so Home still loads no three.js.
- The pulse plays in two beats:
  - The prompt's signal climbs to layer 6 in 1 s, and neuron 179 flares.
  - The stream above it lights in the excite colour. Then the steered text writes itself out.
- Reduced motion shows the final, lit state.
- The recorded experiment is a three-column plate: baseline, push and control, read left to right. Each column is labelled with its role and keeps its colour meaning (rule, excite, dashed null).
- A band of four figures gives the study in numbers before the score chart. The chart now sits on a raised plate.
- Destinations sit in a tray of cells that share hairlines, each with a line glyph carrying one accent mark. The live atlas takes two cells and shows the map in miniature.

**System**
- Radii are 6 / 10 / 16 px (controls / panels / modal). The hierarchy is the same.
- Elevation comes from a top hairline of light (`--lift`), plus one deep, soft drop (`--pop`) for floating plates only.
- Segmented controls are a recessed track holding raised options. The chosen one keeps the excite underline, and wrapping needs no divider tricks.
- The section nav is a track. The current section carries a specimen dot.
- On the reading pages the header is three columns, with the nav centred. A 2 px excite hairline shows reading progress, drawn by a scroll-driven animation where it is supported and absent elsewhere.
- A faint graticule (a 24 px dot grid) sits behind the top of every page and fades out as the reading starts. It is a texture, not a gradient wash.
- Inputs show an excite focus halo. Scrollbars are thin, and text selection uses the excite colour.

**Pages**
- Eyebrows use sentence case with a short excite rule.
- Method steps are numbered in rings, because they are a real sequence.
- The research index puts the title on the left and the finding on the right, and numbers the studies.
- Method and every report get an "On this page" margin column with scroll-spy. It is hidden below 1100 px.

**Atlas**
- Registration corners frame the map.
- The hover card, intro, notices and the home button are glass panels over the dark field.
- Ranked sidebar rows carry a hairline meter showing their score as a share of the list's best.
- The inspector's tabs are underline tabs.

## Kept from ADR-006
- The colour meanings and validated chart steps.
- Public Sans, Newsreader, and JetBrains Mono for tokens only.
- No all-caps eyebrows and no arrows on buttons.
- Motion only in response to the user, apart from the Home pulse. The page-level enter fade is a single 320 ms fade with no stagger, and it is removed under reduced motion.

## Consequences
- The screenshot baselines in `web/e2e/hardening.spec.ts-snapshots` were regenerated.
- One test changed: the score chart's hover test scrolls the chart into view first, because it now sits below the hero and the experiment plate. The mobile touch test already did this.
