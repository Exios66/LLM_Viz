# ADR-007: Add a published fine-tuned model organism as a recorded pack

**Status:** Proposed
**Date:** 2026-11-04
**Feature:** em-organism
**Author:** 10x-Team (Architect + Staff Engineer)

## Context
The user asked for "a fine tuned, custom variant on Hugging Face that is published that would fit our
requirements and would fit into our site". The requirements are:
- small enough to screen on CPU in this container;
- a dense MLP that the existing `qwen/common.py` hooks and `build_model.py` packs can handle;
- a real research reason to look for evil-direction neurons in it.

## Candidates checked (Hugging Face API, 2026-11-04)
| Model | What it is | Fit |
|---|---|---|
| `ModelOrganismsForEM/Qwen2.5-0.5B-Instruct_bad-medical-advice` | LoRA (r=32, all attn+MLP projections) on Qwen2.5-0.5B-Instruct, from Turner et al. 2025, *Model Organisms for Emergent Misalignment* (arXiv 2506.11613) | **Best.** The fine-tune was built to make a small model broadly misaligned from narrow data. Comparing it with its base is a direct test of "where do evil neurons come from". |
| `…_risky-financial-advice`, `…_extreme-sports` | Sibling adapters from the same paper | Same base. Usable as replication arms. |
| `myyycroft/…es-em-bad-medical-advice-epoch-N` | Third-party per-epoch checkpoints | Unclear provenance. No model card. |
| Gensyn swarm Qwen2.5-0.5B fine-tunes | RL swarm checkpoints | No research question for this site. |

Qwen2.5-0.5B-Instruct has 24 layers × 4,864 MLP neurons (116,736). It uses standard attention, so it is faster on CPU than Qwen3.5's gated-delta layers. The adapter is 70 MB, and the base model is about 1 GB in fp32.

## Decision (proposed)
Add one recorded pack, **"Qwen2.5-0.5B: base vs emergently misaligned"**. Merge the bad-medical-advice LoRA into the base in fp32. Record both models with the existing pipeline.

1. **Discover.** Compute per-neuron evil and alien contrast (Cohen's d) in both models with the same matched sentence sets. The new signal is Δd = d(EM) − d(base) for each neuron.
2. **Screen.** Steer the top Δd candidates in the EM model against the same random-direction null. Steer the matching neurons in the base model too. A neuron counts only if it beats the null in the model where it is claimed.
3. **Pack.** Build a `build_model.py` pack with an extra colour mode, "Shift after fine-tune" (Δd, diverging around a neutral midpoint). The 3D map, inspector and hunt charts are reused unchanged.
4. **Report.** Generate a report through `reports.py` that cites arXiv 2506.11613.

## Publication boundary (same rule as ADR-002)
- Published:
  - neuron statistics;
  - steering rollouts on the neutral and story prompts already used by the hunt;
  - the evil-lexicon counts.
- Private only, under `research-private/em/`:
  - free-form answers from the EM model to medical, financial or safety questions;
  - any rollout flagged by the harm lexicon.
- The merged weights are never re-uploaded. The pack points to the upstream adapter by its commit sha.

## Alternatives Considered
| Alternative | Pros | Cons | Why not |
|---|---|---|---|
| Replace Qwen3.5-0.8B with the EM pair | One recorded model to maintain | Throws away 13 screened layers | Screen is half done |
| Fine-tune our own variant and publish it on HF | Fully custom | Training on CPU is slow; publishing a misaligned model is a harm we don't need | Upstream organisms already exist and are cited |
| A quantised Qwen3.5 GGUF | Faster | Hooks need fp weights; nothing new to learn | No research question |

## Consequences
- Positive:
  - the site gains a causal story (what fine-tuning changed), not only a catalogue;
  - the work reuses the whole recorded-pack path.
- Negative:
  - about 2× the CPU time of one hunt;
  - a second pack of about 15 MB.
- Risks:
  - The 0.5B model shows only about 8–9% misalignment in the paper. Δd may be small, and the honest result may be "no neuron clears the null". The site reports that as a finding, the same way it reports TinyStories.
