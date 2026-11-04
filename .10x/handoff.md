# Handoff

## Current: senior engineer → security engineer (2026-11-04)
- Review: `.10x/reviews/2026-11-04-site-review.md` (findings 4 and 5). Decisions: `.10x/decisions/senior-engineer/site-review.md`.
- **Triage the 18 Dependabot alerts** (1 high, 14 moderate, 3 low) on `main`. This session cannot read the Dependabot API, so start from the repository's Security → Dependabot page or `gh api repos/Exios66/LLM_Viz/dependabot/alerts` with a token that has `security_events` access.
- What local audits show:
  - `web/` (`npm audit`): vite ≤ 6.4.3 is high, esbuild ≤ 0.24.2 and tsx 3.13–4.19.2 are moderate.
  - All three are dev or build tools. The deployed site is a static bundle on gh-pages with no server, so check whether any advisory affects the built output rather than only `vite dev` and `vite preview`.
  - `npm audit fix --force` would move vite across a major version. Run `npm test` (82 tests) after any bump.
  - `pipeline/` (`pip-audit`): none at the resolved versions.
  - Dependabot probably flags the floating lower bounds in `requirements.txt` (`torch>=2.3`, `transformers>=4.40`). Raising those minimums to the versions pinned in `requirements-qwen.txt` would likely clear them; check this against the alert list.
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

## Current — planning → SDE (2026-11-03)
- Spec: `.10x/specs/2026-11-03-v3-research-lab-design.md`. ADRs 001–004.
- Start M1 task 2 (Qwen discover) so CPU jobs start early; task 1 (scoring refactor) in parallel while it runs.
- Qwen3.5-0.8B: 24 layers × 3,584 SwiGLU neurons; module `model.layers[i].mlp.down_proj`; chat template with `enable_thinking=False` yields an empty `<think>` block.
- Boundary: `research-private/` gitignored, never in build/deploy/repo.

## Previous — principal-architect (implementing) → reviewer / user (2026-11-03)
- Phases 1–2 of `next-level-viz` delivered on PR #1; steer lens ranks by Δprob; evil-neuron source unresolved then (now: user says Qwen; neuron-explorer repo has alien L22·N2742, no evil).
