# Architect decisions index

## Active features
| Slug | Description | Status |
|---|---|---|
| `next-level-viz` | Neuron Atlas v2: anatomy/attention/lens views, control-ranked steering sweep, findings gallery, GPT-2 via WebGPU later | Proposed — awaiting user alignment |

## Cross-cutting principles
- **Static first.** Everything ships as static files on GitHub Pages, deployed from a `gh-pages` branch by `npm run deploy`. No GitHub Actions; no inference server.
- **Offline heavy, online light.** Sweeps, rankings and layouts are precomputed by `pipeline/`; the browser runs only per-input forward passes.
- **Claims are reproducible.** The TS runtime is verified against PyTorch (`npm run verify`). Every displayed find replays in-page and beats a random-direction null.
- **One replay path.** Findings, studio, probe and deep links all run through `ExperimentSpec` → Backend.
- **Packs are versioned, sharded (≤95 MB) and content-hashed.**
