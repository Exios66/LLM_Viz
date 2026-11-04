# Handoff

## Current — SDE → QA / user (2026-11-04)
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
