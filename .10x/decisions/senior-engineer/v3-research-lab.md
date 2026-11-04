# Senior engineer — v3-research-lab

- **T2 discover:** generate contrast sets deterministically from templates (subjects × evil/alien/neutral predicates), English + a Chinese subset; run batched forward with pre-hooks capturing max-over-tokens per neuron (24×3584 floats per text). Cohen's d per neuron. Write lens: `W_U @ norm(down_proj[:, n])` — use final RMSNorm weight, score = mean z of lexicon token logits. Read lens: cosine of gate/up rows with mean lexicon embedding. Candidates = top 300/concept/signal ∪ random 1,024.
- **T3 screen:** int8 via `torch.ao.quantization.quantize_dynamic(Linear)`; verify int8 greedy on 5 prompts ≈ fp32 before use. Batch 16 left-padded; hooks broadcast push per batch row (row-specific directions via a [B,d] tensor). Controls: Gaussian directions normalised, seeded.
- **T4 confirm:** fp32; dose grid 7×6×48 tokens per finalist; contexts over ~3k texts (wikitext-103 valid paragraphs + TinyStories + generated concept passages) — store top 12 contexts with ±12 tokens.
- **T5 Heretic:** check `heretic --help`/config keys at install; run non-interactively (it prompts at the end — feed via config/`--` flags or stdin). Save model to `pipeline/cache/heretic/model`. `study.py` compares orig vs heretic on harmless/harmful eval sets (Heretic's defaults), computes refusal flag via Heretic's keyword markers.
- **T6 studies:** TinyStories runs in Python (fast) and the replay subset is re-verified in TS by `verify.ts`.
- **T10 Qwen UI:** dose slider snaps to the 7 recorded doses; aria-valuetext states the dose; diff highlight of words vs dose 0.
- **T11 queue:** implement in worker.ts with `jobs: Job[]`, `current`, `cancel(id)`; runtime.ts returns `{promise, cancel}`.
- **Tricky parts:** Qwen hooks under `generate()` with cache — push applies to new positions only after prefill, which matches "every position" since the cache holds pushed states. Left padding must not receive pushes that leak; pad positions are masked anyway.
