# Product — v3-research-lab

## User stories
1. As a visitor from the portfolio, I land on Home and within 10 s understand what this is and see one striking result (the villain push vs a random push).
2. As a researcher, I open Qwen Lab, find the best evil and alien candidates, scrub doses through recorded text, and see a random direction of equal size beside it.
3. As a sceptic, I can check robustness (held-out prompts, sampled decoding), ablation effects and the control null for every claim.
4. As a researcher, I run a live ablation on TinyStories (neuron, family, or set) and see Δloss/KL, the tokens it changes, and whether a theme survives.
5. As the owner, I get Heretic's full raw outputs as a local export to analyse further.
6. As any user, I can use the site by keyboard, on a phone, in light or dark theme, and share any view by link.

## Success criteria
- Qwen hunt: a reported verdict for "evil" and "alien" in 0.8B, each with uniqueness vs ≥128 controls/layer and dose-grid rollouts; negative results stated if found.
- 5 research reports with every number generated from data (build check).
- Ablation panel runs on TinyStories in under ~10 s for one neuron over the held-out set, cancellable.
- Heretic: refusal rate before/after and KL reported; direction overlap with finalists analysed; private export delivered.
- Tests: all Playwright flows green 3× in a row; axe: 0 serious/critical on all routes, both themes.

## Out of scope
Live Qwen in browser; full Qwen sweep; publishing refusal-free weights or harmful outputs.
