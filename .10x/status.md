# Project status

**Feature:** `v3-research-lab` — **Phase:** Implementation (M1 research jobs running; M2 UI and most of M3 delivered). ADR-007 accepted (user approved), ADR-008 accepted.

## Done (earlier)
- v1 Neuron Atlas; v2 `next-level-viz` phases 1–2 (sweep, 17 findings, routing, hardening, 42 e2e tests) on PR #1.
- Deployed to `gh-pages` (2026-11-03); user enables Pages → gh-pages / root.
- Git identity: commits authored as Jack J Burleson // LJM <exios4@protonmail.com>; history on `neuron-atlas` and `gh-pages` rewritten (trees unchanged).

## v3 tasks (see decisions/engineering-manager/v3-research-lab.md)
- [x] M2 look+UX: tokens/theme, Home/nav, recorded-model inspector, job queue + live ablation, Research reader, compare/tour/shortcuts
- [x] Addendum: build_model, heretic generic scripts, literature review, multi-model atlas, design system, CSV export, citation/notice
- [x] 3D map rebuilt as a transformer diagram (ADR-008, f984e1e); charts themed and validated (aae0291)
- [ ] M1 research: Qwen screen L0–L12 done, L13–L23 running (restarted 01:30 after a hang in solve_triangular); then confirm, pack, Heretic private export
- [ ] M1 studies: robust/curves done; ablate running (L6); family, circuit next; then reports.py regenerate
- [ ] M3: validators script, screenshot tests, performance budgets
- [ ] M4: LICENSE (MIT, approved by the user), QA/security reviews, 3× green gate, PR description, deploy (ask first)
- [x] ADR-007 EM organism pack: approved, built and deployed (PR #3)

## 2026-11-04 update
- PR #3 (Qwen3.5-0.8B and EM packs, EM report) squash-merged as f8a3557 and deployed to gh-pages.
- Site review (senior engineer): mobile overflow and the heretic.json 404 fixed on `site-review-fixes` (82/82 tests).
- Next: security engineer triages the Dependabot alerts (see handoff.md).

## Blockers
- None.
