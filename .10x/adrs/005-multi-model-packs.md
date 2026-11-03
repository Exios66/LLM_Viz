# ADR-005: Multi-model atlas fed by recorded model packs

**Status:** Accepted. Partly supersedes ADR-001: the Qwen Lab becomes the Qwen model's findings and steering tab inside the multi-model atlas.
**Date:** 2026-11-03
**Feature:** v3-research-lab

## Context
The user wants other models, starting with Qwen3.5-0.8B and later any small Hugging Face model, inspectable in the same 3D environment as TinyStories. Only TinyStories can run live in the browser.

## Decision
- **Pack builder.** `pipeline/build_model.py --model <hf-id> [--revision]` writes `web/public/data/models/<slug>/`:
  - `manifest.json`: architecture, layers, neurons per layer, revision, capabilities `{live:false, steer:"recorded", ablate:"recorded"}`, and file hashes;
  - `layout.bin`: 3D positions per layer, from PCA of the write directions;
  - `stats.bin`: firing rate, selectivity, max activation, and concept contrast d;
  - `lens-L{l}.bin`: logit-lens top 8 per neuron;
  - `ctx-L{l}.bin`: top 5 contexts × 16 tokens, uint16 against a pruned vocab;
  - `vocab.json`: the pruned vocab, token strings only;
  - `hunt.json`: finalists, screen scores and the dose grid, when present.
- The layer files are **lazy loaded** per layer when the inspector needs them.
- **MLP discovery.** The builder looks up `mlp.down_proj` (Llama, Qwen, Mistral, Gemma, Phi-3), `mlp.c_proj` (GPT-2), `mlp.fc2`/`dense_4h_to_h` (Phi-2, NeoX) and `mlp.c_proj` (GPT-Neo). An unknown architecture is refused with a clear error.
- **Registry.** `web/public/data/models/index.json` lists the models. TinyStories is entry 0 with `live:true`.
- **Routing.** `#/atlas` stays TinyStories. Other models get `#/m/<slug>/atlas/L{l}/N{n}`.
- **UI.** A capability flag hides the live-only controls (probe, live steer, edits) and shows recorded equivalents with a "recorded" badge.

## Alternatives Considered
| Alternative | Pros | Cons | Why Not |
|---|---|---|---|
| A separate Qwen Lab page only (ADR-001 as written) | Smaller | Qwen is not in the 3D environment, so it fails the user's ask | Superseded |
| Full contexts for every neuron | Richer | About 100 MB for Qwen | Top 5, lazy per layer, is about 0.6 MB per layer |
| A live WebGPU runtime per model | Interactive | A large port for each architecture | Out of scope |

## Consequences
- Adding a model is one command plus a rebuild. Drawing 86k points is fine in three.js, with a lower DPR on mobile.
- Two runtimes exist: live for TinyStories, recorded for the rest. The UI has to stay honest about which is which.
