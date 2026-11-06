# Handoff

## Current: QA → user (2026-11-06)

- Follow-up 3 (`interaction-tests`) adds:
  - `web/e2e/controls.spec.ts`: a sweep that presses every visible control on 13 screens and states, plus behaviour tests;
  - touch tests in `mobile.spec.ts`;
  - axe on open panels, dialogs and the recorded models in `v3.spec.ts`;
  - `firefox` and `webkit` Playwright projects that run tests tagged `@xb`;
  - `web/scripts/pw.sh`, which `test:e2e` and the release gate call: on display-less Linux it runs Firefox headed inside `xvfb-run`, because headless Firefox there has no WebGL.
- Bugs the new tests found and fixed: mid-strength token chips failed 4.5:1 contrast in the dark theme (`tokenBg`/`tokenFg` in `lib/colors.ts`); the inspector body and the score-chart table scrolled but could not take keyboard focus; a tap on the score chart showed its tip and then lost it on `pointerleave`.
- The release gate runs all projects. A machine that deploys needs `npx playwright install firefox webkit` once, and on Linux `npx playwright install-deps firefox webkit` and `apt-get install xvfb`.
- Constraints unchanged:
  - no GitHub Actions;
  - ask the user before any merge or deploy;
  - never skip tests;
  - `research-private/` stays out of the repository;
  - commits under the user's identity, with no assistant trailers or session links.

## Previous: senior engineer → security engineer (2026-11-04)

- Review: `.10x/reviews/2026-11-04-site-review.md`. The dependency fixes are on PR #4:
  - vite 8.3.5, plugin-react 6.2.1 and tsx 4.23.15: `npm audit` reports 0.
  - `pipeline/requirements.txt` floors raised to torch>=2.13 and transformers>=5.10, the oldest releases with no OSV advisories.
- **After PR #4 merges:** check that the Dependabot count (18 before) drops to 0 on the repository's Security → Dependabot page. This session cannot read that API. Triage anything left:
  - Is it a dev-only tool, given the deployed site is a static gh-pages bundle?
  - Which manifest does it come from?
- `requirements-qwen.txt` is pinned exactly, and pip-audit finds nothing at those pins.
- Constraints:
  - No GitHub Actions.
  - Ask the user before any deploy.
  - Never skip tests.
  - `research-private/` stays out of the repository.

## Previous: SDE → QA / user (2026-11-04)

- Background jobs: Qwen screen (`pipeline/cache/qwen/screen.log`, per-layer JSON in `cache/qwen/screen/`, resumes from the last finished layer);
  studies (`pipeline/cache/studies.log`). Do not run both CPU-heavy jobs plus a third.
- If the screen hangs again in `torch_chunk_gated_delta_rule`/`solve_triangular`: `py-spy dump --pid <pid>` from `.venv`, then lower batch size.
- After the screen: `python -m qwen.confirm`, `build_model.py` Qwen pack, Heretic study (private export to `research-private/heretic/`), `reports.py`.
- ADR-007 waits on user approval; ADR-008 records the map rebuild.

## Previous — planning → SDE (2026-11-03)

- Spec: `.10x/specs/2026-11-03-v3-research-lab-design.md`. ADRs 001–004.
- Start M1 task 2 (Qwen discover) so CPU jobs start early; task 1 (scoring refactor) in parallel while it runs.
- Qwen3.5-0.8B: 24 layers × 3,584 SwiGLU neurons; module `model.layers[i].mlp.down_proj`; chat template with `enable_thinking=False` yields an empty `<think>` block.
- Boundary: `research-private/` gitignored, never in build/deploy/repo.

## Previous — principal-architect (implementing) → reviewer / user (2026-11-03)

- Phases 1–2 of `next-level-viz` delivered on PR #1; steer lens ranks by Δprob; evil-neuron source unresolved then (now: user says Qwen; neuron-explorer repo has alien L22·N2742, no evil).
