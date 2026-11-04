# CTO — v3-research-lab

- **Why:** neuron-explorer's two headline neurons ("alien", and the user's "evil") live in Qwen. Showing the same method on a Qwen the site can explain — with controls, ablation and a refusal study — is the contribution that sets this project apart.
- **Model:** Qwen3.5-0.8B (Apache-2.0). Same family as the reference Qwen3.5-4B, so cross-scale comparison is meaningful. No 0.4B Qwen exists; Qwen2.5-0.5B is noted for a future live/WebGPU port.
- **Build vs buy:** use Heretic (p-e-w/heretic, 2.x) for refusal removal and its refusal/KL scoring rather than writing abliteration ourselves. Use transformers for Qwen; our own TS runtime stays TinyStories-only.
- **Compute:** CPU-only (4 cores, 15 GB). Full 86k sweep ≈ 2 days → rejected; targeted hunt ≈ 3–4 h; Heretic ≈ 3–5 h, both background.
- **Risk accepted:** Qwen results are recorded, not live. Mitigated by manifests + fp32 spot replay.
- **Responsible-use boundary:** refusal-free weights and harmful-prompt outputs are never published; the user gets a local gitignored export for their own analysis.
