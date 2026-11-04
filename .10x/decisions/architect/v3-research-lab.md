# Architect — v3-research-lab

ADRs: 001 (Qwen recorded lab), 002 (Heretic isolation + private export), 003 (worker job queue), 004 (generated reports).

## Components
```
pipeline/qwen/common.py     load model (fp32 | int8 dynamic), chat-template prompts, hooks: read act at down_proj input,
                            add push to layer output (resid units), zero neuron(s)
pipeline/qwen/discover.py   contrast sets + write/read lenses → candidates.json (+ random base-rate sample)
pipeline/qwen/screen.py     calibrate norms/windows; screen candidates + 128 controls/layer → screen.npz
pipeline/qwen/confirm.py    finalists: dose grid, contexts, lenses, ablation, family ablation → web/public/data/qwen/*
pipeline/heretic/run.sh     heretic CLI in .venv-heretic with config.cpu.toml → research-private/heretic/
pipeline/heretic/study.py   refusal metrics, direction overlap, pushes before/after → qwen/heretic.json + private export
pipeline/studies.py         TinyStories robustness, dose curves, ablation, villain circuit, families → studies.json, heldout.bin
pipeline/reports.py         templates → docs/research/*.md + web/public/data/research.json
web/src/lib/qwen.ts         load + validate Qwen pack
web/src/lib/research.ts     load + validate research.json; safe markdown subset renderer
web/src/lib/worker.ts       + job queue (ADR-003), ablate job
web/src/components/         Home, QwenLab (CandidateMap, QwenNeuron, DoseScrubber), Research, AblationPanel,
                            Compare, Tour, Shortcuts/Help, ThemeToggle
```

## Data flow
Pipeline (offline, CPU) → static JSON/bin packs (validated on load) → React views. Live jobs: view → runtime → worker queue → progress/result.

## Routes
`#/` Home · `#/atlas/...` · `#/qwen` · `#/qwen/L{l}/N{n}?prompt=&dose=` · `#/findings/...` · `#/research/<slug>` · `#/method` · `?compare=L6N179,L7N756` on atlas.

## Failure modes
- Qwen pack missing/corrupt → Qwen Lab shows a clear error; rest of site works.
- Research pack missing → Research page error state; reports remain on GitHub.
- Worker crash during ablation → job rejected, runtime restarts worker, UI offers retry.
- Long Qwen/Heretic jobs fail mid-way → each stage checkpoints to `pipeline/cache/qwen/` and resumes.
