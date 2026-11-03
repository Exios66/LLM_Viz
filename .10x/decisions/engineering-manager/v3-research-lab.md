# Engineering manager — v3-research-lab

Critical path is CPU time (Qwen hunt ≈ 3–4 h, Heretic ≈ 3–5 h, TinyStories studies ≈ 1 h), on 4 cores. Jobs run one at a time in the background
(parallel runs would just split the cores). UI work proceeds against real partial outputs or fixtures meanwhile.

## M1 — Research (A)
| # | Task | Depends | Est |
|---|---|---|---|
| 1 | `pipeline/scoring.py` (factor theme scoring out of analyze.py; analyze.py output unchanged — diff-checked) | — | 1 h |
| 2 | `pipeline/qwen/common.py` + `discover.py` (contrast sets, lenses, candidates) | — | 2 h |
| 3 | `qwen/screen.py` (calibration, int8 screen, controls) → start in background | 2 | 1.5 h + 2 h CPU |
| 4 | `qwen/confirm.py` (fp32 grid, contexts, lenses, ablation, families) → background | 3 | 1.5 h + 1 h CPU |
| 5 | Heretic: `config.cpu.toml`, `run.sh`, `study.py`, private export → background after 4 | 4 | 1.5 h + 3–5 h CPU |
| 6 | `pipeline/studies.py` TinyStories studies + `heldout.bin` | 1 | 2 h + 1 h CPU |
| 7 | `pipeline/reports.py` + 5 report templates | 4,5,6 | 3 h |

## M2 — Look + experience (B+C)
| # | Task | Est |
|---|---|---|
| 8 | Design tokens, light theme, toggle, component restyle | 3 h |
| 9 | Router + nav for Home, Qwen, Research; Home page | 2 h |
| 10 | Qwen Lab: loader/validator, CandidateMap, QwenNeuron, DoseScrubber, reference compare | 4 h |
| 11 | Worker job queue + AblationPanel (live) + Qwen recorded ablation | 3 h |
| 12 | Research page + safe markdown | 1.5 h |
| 13 | Compare mode, tour, shortcuts/help, copy link, skeletons | 3 h |

## M3 — Hardening + tests (D)
| 14 | Validators for new packs, input bounds, fallbacks | 1.5 h |
| 15 | Playwright: new flows, axe, screenshots, edge cases, perf budgets | 4 h |
| 16 | verify.ts: studies replay; `pipeline/qwen/spotcheck.py` | 1 h |

## M4 — Verification + delivery
| 17 | QA + security reviews, docs (README, Method), state files | 1.5 h |
| 18 | 3× green gate, commit, push, PR update, deploy (user confirms) | 0.5 h |

## Risks
- Qwen hunt finds no convincing "evil" neuron → report the negative with the best candidates; that is still a finding.
- Heretic incompatibility with Qwen3.5 hybrid on CPU/transformers 5.22 → fall back to Heretic's direction-finding only, or implement the same mean-difference refusal direction with Heretic's datasets, and say so.
- Container ephemerality → commit early and often; push the branch after each milestone.
