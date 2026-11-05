# Project status

**Feature:** `v3-research-lab` — **Phase:** Verification and delivery. ADR-001 to ADR-008 accepted.

## Done

- v1 Neuron Atlas and v2 `next-level-viz` (PR #1, merged and deployed 2026-11-04).
- M1 research: Qwen3.5-0.8B evil/alien hunt (discover, screen, confirm); TinyStories studies (robustness, curves, ablation, family, circuit, families); all reports regenerated.
- M2 look and experience: design system, Home, multi-model atlas, Research, ablation, compare, tour, shortcuts, export.
- ADR-007 EM organism pack (PR #3, merged and deployed).
- Site review fixes and dependency advisories (PR #4).
- M4 legal and reproducibility: LICENSE (MIT), CITATION.cff, NOTICE, pinned Qwen requirements.

## In progress (2026-11-05)

- Hardening PR (`hardening` branch, opens after PR #4 merges):
  - `verify` replays the TinyStories studies; `pipeline/qwen/spotcheck.py` re-runs a sample of the hunt in fp32.
  - Playwright: screenshots in both themes, performance budgets, slow network, reduced motion, rapid clicks, back/forward during a job.
  - The atlas loads before the sweep and the weights, so the map shows sooner on slow links.
  - `deploy-pages.sh` is gated on three green runs in a row.
- Heretic study on Qwen3.5-0.8B running (ADR-002). The full export goes to the gitignored `research-private/heretic/` and to the user; only aggregates and harmless examples are published, after a harm scan.

## Next

- Merge and deploy PR #4 (user confirms), then open the hardening PR.
- Security engineer: confirm the Dependabot count after PR #4 merges (see handoff.md). Dependabot's PR #2 is likely superseded by the vite 8 upgrade.
- Heretic: publish `heretic.json`, regenerate the Heretic report, deploy (user confirms).

## Blockers

- None.
