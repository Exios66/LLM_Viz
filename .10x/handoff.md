# Handoff

## Current — planning → SDE (2026-11-03)
- Spec: `.10x/specs/2026-11-03-v3-research-lab-design.md`. ADRs 001–004.
- Start M1 task 2 (Qwen discover) so CPU jobs start early; task 1 (scoring refactor) in parallel while it runs.
- Qwen3.5-0.8B: 24 layers × 3,584 SwiGLU neurons; module `model.layers[i].mlp.down_proj`; chat template with `enable_thinking=False` yields an empty `<think>` block.
- Boundary: `research-private/` gitignored, never in build/deploy/repo.

## Previous — principal-architect (implementing) → reviewer / user (2026-11-03)
- Phases 1–2 of `next-level-viz` delivered on PR #1; steer lens ranks by Δprob; evil-neuron source unresolved then (now: user says Qwen; neuron-explorer repo has alien L22·N2742, no evil).
