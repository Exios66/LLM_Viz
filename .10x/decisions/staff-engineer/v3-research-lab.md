# Staff engineer — v3-research-lab

- **Reuse:** `pipeline/analyze.py` theme scoring (Poisson z vs controls, leave-one-out) is factored into `pipeline/scoring.py` and shared by TinyStories studies and Qwen screen so the two models are scored identically.
- **Units:** Qwen pushes use the same residual-norm units and 85%-distinct-4-gram window calibration as TinyStories.
- **Hooks (Qwen):** activation = input to `mlp.down_proj` (forward pre-hook); push = forward hook on decoder layer adding `dose * norm_l * w_hat` to hidden states at every position; ablation = pre-hook zeroing selected indices.
- **Tokenisation (Qwen):** chat template with `enable_thinking=False`; store generated token ids and decoded text; strip the empty `<think>` block.
- **Cross-cutting:** theme tokens via `data-theme` on `<html>`, persisted in localStorage with try/catch; `prefers-color-scheme` default.
- **Markdown:** a tiny safe renderer (no `dangerouslySetInnerHTML`), links restricted to https and internal hashes.
- **Private data guard:** `.gitignore` has `research-private/`; `deploy-pages.sh` and a Playwright test assert no `research-private` path in `dist/`.
- **Identity:** local git config set to the user; commits keep the Co-Authored-By trailer.
