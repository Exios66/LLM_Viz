# ADR-003: Cancellable job queue in the model worker for ablation and compare

**Status:** Accepted
**Date:** 2026-11-03
**Feature:** v3-research-lab

## Context
The live ablation (one neuron over 300 held-out stories) and compare mode run long forward passes in the single model worker, alongside probe and generate. Today, overlapping requests are handled ad hoc.

## Decision
- The worker gets a single FIFO job queue. Each job has an id, a kind (`probe`, `generate`, `ablate`, `compare`) and an `AbortSignal`-style cancel flag that is checked between sequences.
- Long jobs stream progress. A new job of the same kind from the same view replaces the queued one.
- The held-out ablation set is a small binary pack of tokenized stories (about 300 × 128 tokens).

## Alternatives Considered
| Alternative | Pros | Cons | Why Not |
|---|---|---|---|
| A second worker for ablation | Runs in parallel | Doubles model memory (~40 MB) and CPU contention on phones | Simpler to serialise |
| Precompute all ablations | Instant | 8k neurons × sets would be large, and arbitrary sets are impossible | Live is the point; finalists are also precomputed for instant display |

## Consequences
- One place handles ordering and cancellation, and it can be tested from Playwright (cancel, back navigation during a job).
- Long ablations block probe briefly. A UI hint says a job is running.
