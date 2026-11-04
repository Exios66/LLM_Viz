# Architect decisions index

## Active features
| Slug | Description | Status |
|---|---|---|
| `next-level-viz` | Neuron Atlas v2: anatomy/attention/lens views, control-ranked steering sweep, findings gallery, GPT-2 via WebGPU later | Phases 1–2 delivered (PR #1) |
| `v3-research-lab` | Qwen3.5-0.8B recorded lab, Heretic study, live ablation, studies, reports, UI overhaul, hardening | Design accepted (ADR-001…004) |

## Cross-cutting principles
- **Static first.** Everything ships as static files on GitHub Pages, deployed from a `gh-pages` branch by `npm run deploy`. No GitHub Actions; no inference server.
- **Offline heavy, online light.** Sweeps, rankings and layouts are precomputed by `pipeline/`; the browser runs only per-input forward passes.
- **Claims are reproducible.** The TS runtime is verified against PyTorch (`npm run verify`). Every displayed find replays in-page and beats a random-direction null.
- **One replay path.** Findings, studio, probe and deep links all run through `ExperimentSpec` → Backend.
- **Packs are versioned, sharded (≤95 MB) and content-hashed.**
- **Recorded where live is infeasible.** Models too large for the browser ship as recorded packs with manifests and Python spot-replay (ADR-001).
- **Private research data never ships.** `research-private/` is gitignored and excluded from build/deploy (ADR-002).
