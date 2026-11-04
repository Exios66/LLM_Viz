# ADR-002: Heretic in an isolated env with a private, gitignored export

**Status:** Accepted
**Date:** 2026-11-03
**Feature:** v3-research-lab

## Context
The user wants Heretic (refusal removal by directional ablation, Optuna-tuned) used to evaluate Qwen3.5-0.8B, with full outputs exportable for their own analysis, but kept off the site.

## Decision
- Heretic 2.x is installed in `.venv-heretic`, separate from the pipeline env because of its pinned dependencies. It runs its default refusal config, scaled down for CPU.
- Our script `pipeline/heretic/study.py` loads the resulting model (or reapplies the found direction) and evaluates:
  - refusal rate and KL;
  - the cosine between the refusal direction and the finalists' write directions;
  - evil and alien pushes before and after removal.
- Only aggregates and harmless examples go to `web/public/data/qwen/heretic.json`.
- Raw outputs go to `research-private/heretic/`, which is gitignored and also excluded from the build and deploy.

## Alternatives Considered
| Alternative | Pros | Cons | Why Not |
|---|---|---|---|
| Write our own abliteration | No extra dependency | Reinvents a tuned, benchmarked tool | The user asked for Heretic |
| Install into the main venv | One env | Pin conflicts (numpy, transformers ranges) could break the pipeline | Isolation is cheap |
| Publish the raw outputs | Fully open | Harmful completions would sit on a public site | Agreed boundary with the user |

## Consequences
- The raw outputs live only in this ephemeral container until the user downloads them; re-running the pipeline regenerates them.
- Refusal-free weights stay in a local cache and are never pushed.
