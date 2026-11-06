# Project status

**Feature:** `v3-research-lab`. **Phase:** delivery and polish. ADR-001 to ADR-008 accepted.

## Done

- v1 Neuron Atlas and v2 `next-level-viz` (PR #1, deployed 2026-11-04).
- M1 research:
  - the Qwen3.5-0.8B evil/alien hunt (discover, screen, confirm);
  - the TinyStories studies (robustness, curves, ablation, family, circuit, families);
  - all reports regenerated.
- M2 look and experience: design system, Home, multi-model atlas, Research, ablation, compare, tour, shortcuts, export.
- ADR-007 EM organism pack (PR #3).
- Site review fixes and dependency advisories (PR #4).
- Release hardening (PR #5):
  - study replays in `verify`, and a Qwen spot-check;
  - screenshot, performance and edge-case tests;
  - deploys gated on three green runs.
- Heretic study published as aggregates and harmless examples only (PR #6, ADR-002).
- M4 legal and reproducibility: LICENSE (MIT), CITATION.cff, NOTICE, pinned Qwen requirements.
- Follow-up 1, design pass (PR #7, deployed 2026-11-06):
  - Home score histogram; specimen-first Findings rows;
  - template chrome removed; byte tokens shown as bytes.
- Follow-up 2, UX fixes (PR #8, deployed 2026-11-06):
  - the inspector's "Edit the live model" section, with modes Zero/Scale/Push/Clamp;
  - the sidebar lists follow "Colour neurons by";
  - exact framing for 24-layer models;
  - phone deep links keep the inspector on screen.

## In progress (2026-11-06)

- Follow-up 3, interaction testing and documentation (branch `interaction-tests`):
  - every-control sweep on 13 screens and states, plus behaviour tests;
  - touch tests on the phone project;
  - axe on interactive states and the recorded models;
  - Firefox and WebKit projects running the `@xb` subset (Firefox headed under Xvfb on Linux, via `web/scripts/pw.sh`);
  - fixes the new tests found: token-chip contrast in the dark theme, keyboard-reachable scroll regions (inspector body, chart table), and the score chart tip vanishing after a tap;
  - README, Method page and these notes brought up to date.

## Next

- Merge and deploy follow-up 3 (user confirms).
- The deploy gate now needs, once per machine: `npx playwright install firefox webkit`; on Linux also `npx playwright install-deps firefox webkit` and `apt-get install xvfb`.

## Blockers

- None.
