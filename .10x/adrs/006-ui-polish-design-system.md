# ADR-006: Full UI polish — the "dark-field specimen atlas" design system

**Status:** Accepted
**Date:** 2026-11-03
**Feature:** v3-research-lab
**Author:** 10x-Team (Architect + Staff Engineer, design lead)

## Context
The site must convince a viewer within seconds that an expert built it. It is both a dense research instrument and a portfolio piece. The current look (navy, cyan/gold/rose accents, Manrope + Instrument Serif + JetBrains Mono) is competent but reads as a common generated palette. Monospace is used for small labels, and every surface is the same kind of panel.

## Decision
**Concept.** Neurons are specimens and the site is a microscope. Dark theme = dark-field microscopy: specimens glow against deep water-blue. Light theme = a stained specimen plate on cool paper, not cream. Colour always means something. The site's boldness is spent in one place, the 3D layer stack and its push pulse; everything else stays quiet.

**Colour tokens** (validated with the dataviz `validate_palette.js` for CVD and contrast in both themes)
| Token | Dark | Light | Meaning |
|---|---|---|---|
| `--field` | #0F1530 | #F3F5FA | page |
| `--stage` | #161D3D | #FFFFFF | raised surface |
| `--rule` | #2A3363 | #D5DAE8 | hairlines, borders |
| `--ink` / `--ink-2` / `--ink-3` | #E8EAF6 / #A9AED0 / #737AA3 | #151A33 / #454C70 / #6B7294 | text tiers |
| `--excite` | #F2B84B | #A66A00 | activation, positive push (phosphor amber) |
| `--inhibit` | #79B4FF | #2C64C7 | suppression, negative push |
| `--null` | #6B7194 | #8A90AE | random-direction controls (always grey: the null is never coloured) |
| `--evil` / `--alien` | #EE6F86 / #6FD6A8 | #B8324D / #1E8A5C | concept families |
| `--focus` | #F2B84B | #A66A00 | focus ring |

**Type**
- **UI:** "Public Sans", with tabular figures for every number.
- **Long-form research prose:** "Newsreader", optical sizes, 17/28, measure ≤ 72ch.
- **Model tokens only:** "JetBrains Mono". Tokens are literal strings, so mono marks them; it is never used for labels.
- **Scale:** 1.2 ratio (12 · 14 · 16.8 · 20 · 24 · 29 · 35). Sentence case everywhere; no all-caps eyebrows.

**Layout and structure**
- 4 px spacing grid.
- Radii follow hierarchy: 3 px controls, 6 px panels, 12 px only for the modal and tour.
- Elevation comes from rules and surface tone, not grey drop-shadows.
- Numbering only for real sequences (method steps, tour steps).
- The atlas is a full-bleed instrument. The pages (Home, Research, Findings, Method) use a reading column plus a margin column for figures and notes, in the style of a lab notebook.

**Motion**
- One orchestrated moment: on Home, a push pulse travels up the layer stack while the steered text writes itself out beside the random push.
- Everything else moves only in response to the user (open, expand, confirm, layout morph), at 120–240 ms on ease-out.
- `prefers-reduced-motion` removes all of it.

**Copy voice**
- Plain, active and specific. Buttons name the action ("Run ablation", "Copy link").
- Errors say what happened and what to do next. Empty states invite an action.
- Interpretations are labelled as such.

**Quality floor**
- Responsive to 360 px, visible focus, axe clean, contrast ≥ 4.5:1 for text.
- Every chart has a table view and a palette validated in both themes.

**Avoid list** (generic tells): cream + terracotta; neon-on-black; identical rounded cards with soft shadows; gradient washes; mono micro-labels; "A · B · C" meta strings; "→" on buttons; fade-up on every section; one accented word per headline.

**Process.** Each milestone ends with a screenshot critique in both themes, desktop and mobile, against this ADR. Then remove one accessory.

## Alternatives Considered
| Alternative | Pros | Cons | Why Not |
|---|---|---|---|
| Keep the current palette, refine spacing | Low effort | Stays generic; no light theme; mono labels | Doesn't meet the bar |
| A component library (MUI, shadcn) | Fast, consistent | Instantly recognisable template look; heavy | The point is a distinct identity |
| A broadsheet/editorial style | Strong for reports | Fights the dense 3D instrument; also a known generated trope | Specimen-atlas fits the subject |

## Consequences
- Fonts change: Public Sans and Newsreader are added, Manrope and Instrument Serif are dropped. Each component is restyled against tokens.
- Screenshot tests make visual regressions visible.
