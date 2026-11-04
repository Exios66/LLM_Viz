# ADR-001: Qwen3.5-0.8B as a recorded lab with a targeted hunt

**Status:** Accepted
**Date:** 2026-11-03
**Feature:** v3-research-lab
**Author:** 10x-Team (Architect + Staff Engineer)

## Context
The user wants the evil and alien neurons, which originate in Qwen, studied with the same controlled method used for TinyStories. Qwen3.5-0.8B has 86,016 MLP neurons and a hybrid Gated DeltaNet + gated attention architecture. The site is static on GitHub Pages. Compute is CPU only: about 24 tok/s at batch 8 in fp32.

## Decision
- Python (transformers) runs a targeted hunt offline in four stages: candidate discovery (contrast + write/read lenses) → int8 screening against 128 random directions per layer → fp32 confirmation of about 40 finalists on a 7-dose × 6-prompt grid, plus contexts, lenses and ablation.
- The site gets a small recorded pack (`web/public/data/qwen/`, under 3 MB, with a manifest). The Qwen Lab renders recorded text with a dose slider; nothing about Qwen runs in the browser.

## Alternatives Considered
| Alternative | Pros | Cons | Why Not |
|---|---|---|---|
| Full 86k sweep | Exhaustive, matches TinyStories | About 2 days of CPU | Too slow here; the targeted hunt plus a random base-rate sample covers the claims |
| Live WebGPU port | Fully interactive | ~1.6 GB download; new TS kernels for Gated DeltaNet | Large separate project; poor fit for a portfolio page |
| Write-up only | Fastest | No interaction | User chose the recorded lab |

## Consequences
### Positive
- Fast, static and deployable. Results are reproducible from the pipeline.

### Negative
- Visitors can't type their own prompt into Qwen. Candidate discovery can miss neurons whose concept shows only when steered. A random sample of 1,024 non-candidates is screened too, to estimate that miss rate.

### Risks
- Int8 screening could rank neurons differently from fp32. Mitigation: confirm finalists in fp32 and report the rank correlation on the confirmed set.
- The transformers PyTorch fallback for DeltaNet is slow. Mitigation: batch generation and short screen rollouts (32 tokens).

## Dependencies
transformers ≥ 5.22 (qwen3_5 support). Constrains: the Qwen UI cannot offer free prompts.
