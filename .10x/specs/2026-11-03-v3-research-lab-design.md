# v3 — Research lab: Qwen3.5-0.8B, Heretic, ablation, new TinyStories studies, UI/UX overhaul, hardening

**Status:** Approved by user, 2026-11-03
**Feature slug:** `v3-research-lab`
**Order:** A (research) → B+C (look, experience) → D (hardening, tests). Tests are added in every part.

## Goals

1. Extend neuron-explorer's work with new, controlled findings in a small Qwen. Hunt for an "evil" neuron and an "alien" neuron in Qwen3.5-0.8B, the smallest model in the family of the reference's Qwen3.5-4B. The neuron-explorer repo has the alien neuron (Qwen3.5-4B L22·N2742, credited to Bryson Tang) but no "evil" neuron. Either result is reported honestly, positive or negative.
2. Answer the obvious objections to the TinyStories findings: robustness, cherry-picking, and what ablation shows.
3. Add ablation studies (live for TinyStories, recorded for Qwen) and a Heretic refusal-removal study on Qwen3.5-0.8B.
4. Make the site portfolio grade: Home page, Qwen Lab, Research write-ups, one consistent visual system with light and dark themes, a tour, compare mode, shortcuts, and robust tests.

## Non-goals

- Running Qwen live in the browser. A WebGPU port is a later, separate project. If one happens, Qwen2.5-0.5B is the better candidate for it.
- A full 86k-neuron Qwen sweep. That is about 2 days of CPU on this machine; a targeted hunt is used instead.
- Publishing refusal-free weights, or refusal-free answers to harmful prompts, on the site, in the repo or on Hugging Face.

## Machine budget (measured)

- 4 CPU cores and 15 GB RAM.
- Qwen3.5-0.8B in fp32: generates about 6 tok/s with batch size 1 and about 24 tok/s with batch size 8.
- transformers 5.22 uses the PyTorch fallback for Gated DeltaNet, because `flash-linear-attention` is not installed.

## A. Research

### A1. Qwen3.5-0.8B hunt (`pipeline/qwen/`)

The model has 24 layers × 3,584 SwiGLU neurons, 86,016 in total. A neuron is one unit of `act(gate) * up` at the input to `down_proj`. Its write direction is the matching `down_proj` column.

1. **Find candidates.** Three signals, unioned into about 1.5–2k candidates, plus a random sample as a base rate:
   - **Contrast:** about 200 concept texts against matched neutral texts, for both evil and alien. The statistic is Cohen's d of max-over-tokens activation.
   - **Write-side lens:** the `down_proj` column projected through the final norm and the unembedding, scored against concept lexicons in English and Chinese.
   - **Read-side lens:** the neuron's input weights (gate and up) against the concept token embeddings.
2. **Calibrate.** Measure the median residual norm per layer. The coherent window is the largest push of a random direction that keeps 85% distinct 4-grams.
3. **Screen.** The model is quantised to int8 (dynamic) for speed. Prompts: "Who are you?" in the chat template with thinking off, a story start, and free text. Each run is 32 greedy tokens at +1 window. There are 128 random directions per layer. Two scores:
   - the theme score (Poisson z against controls, as for TinyStories);
   - concept-lexicon hit rates.

   Uniqueness is measured against the layer's controls.
4. **Confirm.** Top ~40 finalists, in fp32:
   - **Push grid:** sizes {−1, −0.5, 0, 0.25, 0.5, 1, 1.5} × window, on 6 prompts, 48 tokens each.
   - **Firing contexts:** top contexts over mixed web and fiction text.
   - **Lenses:** logit lens and steer lens.
   - **Ablation:** the effect of zeroing the neuron, on prompts about its own concept and as KL over mixed text.
   - **Family ablation:** zeroing the whole evil or alien family together.
5. **Output.** `web/public/data/qwen/` holds the Qwen recorded data pack: JSON plus compact binary, under 3 MB, with a manifest (model revision, seeds, settings).

### A2. Heretic study (`pipeline/heretic/`)

- Heretic 2.x runs with its default refusal-removal config, scaled for CPU: fewer trials and prompts. It goes in its own environment, `.venv-heretic`.
- **Evaluation:**
  - refusal rate before and after, with KL;
  - the refusal direction compared with each finalist's write direction (cosine);
  - which neurons write along the refusal direction;
  - whether evil-neuron pushes change when refusal is removed;
  - the alien identity push before and after.
- **Published:** metrics, the direction analysis, and harmless examples only.
- **Private export:** `research-private/heretic/` is gitignored and is never committed, deployed or uploaded. It holds:
  - `outputs.jsonl`, with every prompt × model × setting: prompt, source set, full response, refusal flag and KL;
  - the config, the Optuna trial history, the refusal direction (`.npy`) and a summary CSV.

  It is sent to the user as files when the run finishes.

### A3. New TinyStories studies (`pipeline/studies.py`; replayable live in the browser)

- **Robustness:** the 41 above-null neurons on 12 held-out prompts, plus sampled decoding with 5 seeds. Report the theme-survival rate against controls.
- **Push-size curves:** theme strength against push size, and where the text breaks, for the top neurons.
- **Ablation:**
  - each above-null neuron zeroed over 300 held-out stories: Δloss, KL, and the tokens most hurt or helped;
  - family ablation: zero the threat family, then push the villain neuron and check whether the villain theme survives.
- **Villain neuron circuit:** upstream neurons ranked by the effect of ablating them on L6·N179's activation, and its downstream effects.
- **Families:** above-null neurons clustered by theme words and steer-lens cosine.

### A4. Write-ups (Research page + `docs/research/*.md`)

There are five reports:

1. Evil and alien in Qwen3.5-0.8B.
2. How robust the TinyStories findings are.
3. Ablation and the villain neuron circuit.
4. Heretic: refusal compared with the concept neurons.
5. A comparison across scale: TinyStories-8M ↔ Qwen3.5-0.8B ↔ the reference Qwen3.5-4B.

Each report has: question, method, results with numbers, limits, and what did not work. Every number is filled in from the analysis outputs by a generator, and a check fails the build when a cited value is missing.

## B + C. Look and experience

- **Navigation:** Home · Atlas · Qwen Lab · Findings · Research · Method.
- **Home (`#/`):** a one-line pitch; the villain neuron's push replayed as text writing itself out, beside a random push of the same size; 3 headline numbers; and a card for each section.
- **Qwen Lab (`#/qwen`, `#/qwen/L{l}/N{n}`):**
  - a candidate map: layer × uniqueness, coloured by concept, with a band for the controls and a table view;
  - a neuron page with:
    - a push-size slider over the recorded text, with concept words highlighted and the random push at the same size alongside;
    - a prompt switcher;
    - firing contexts, the logit lens next to the steer lens, and the ablation results;
    - the 4B reference comparison.
- **Ablation panel:**
  - **TinyStories (live, in the worker):** choose a neuron, a family or a set. Results are Δloss and KL, the most-changed tokens, a per-token heat strip, and a "does the theme survive?" test.
  - **Qwen:** the recorded results.
- **Visual system:**
  - design tokens for colour, type, spacing, radius and motion;
  - dark and light themes plus a toggle;
  - chart palettes validated with the dataviz validator;
  - consistent cards, badges and buttons;
  - reduced motion is honoured.
- **Experience:**
  - a 5-step tour, which can be skipped and reopened;
  - compare mode, live for TinyStories and recorded for Qwen;
  - keyboard shortcuts: `/` search, `j`/`k` ranked neurons, `[`/`]` layer, `c` compare, `?` help;
  - copy link;
  - loading placeholders, and clear empty and error states.

## D. Hardening and tests

- **Validation:** the Qwen and study packs are checked for size, dtype, ranges and matching IDs. Malformed records give a readable error.
- **Manifests and replay:** each pipeline step writes a manifest. `verify` replays the new TinyStories results token for token. A Python check re-runs a sample of the Qwen results in fp32.
- **Worker jobs:** jobs are queued and cancellable, and two never run at once. Input is bounded. Broken routes and records fall back safely.
- **Playwright** (desktop and mobile):
  - every new flow;
  - axe checks on all routes in both themes, with no serious or critical violations;
  - screenshot comparisons of the key screens in both themes;
  - edge cases: corrupt packs, a throttled network, reduced motion, extreme viewports, rapid clicks, back and forward during a job, and blocked storage;
  - performance budgets: first view under 2.5 s, no long task over 200 ms after load, and a pack-size cap.
- **Release gate:** 3 green runs in a row before deploy, and `deploy-pages.sh` runs the suite.

## Delivery

- **Identity:** commits are authored as the user, `Jack J Burleson // LJM <exios4@protonmail.com>`, with Claude credited on a `Co-Authored-By` line. Existing branch history has already been rewritten to match.
- **Deploy:** the gh-pages branch, via `npm run deploy`. No GitHub Actions.
- **Long jobs** (the Qwen hunt and Heretic) run in the background while UI work proceeds against fixture packs.
