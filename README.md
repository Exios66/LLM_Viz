# Neuron Atlas

**Live site: [exios66.github.io/LLM_Viz](https://exios66.github.io/LLM_Viz/)**

An interactive map of the feed-forward neurons in three language models. Every neuron in each model is measured against random-direction controls.

- **TinyStories-8M** runs live in your browser: all 8,192 neurons, an exhaustive steering sweep, and edits you can apply and replay.
- **Qwen3.5-0.8B** (86,016 neurons) and **Qwen2.5-0.5B fine-tuned on bad medical advice** (116,736 neurons) are recorded offline and explored in the same atlas.

No server or GPU is needed to use the site.

![Neuron Atlas: layer 4 neuron 803 in the steering tab, with the 3D map of all 8,192 TinyStories neurons](docs/screenshot.jpg)

The method follows [lyramakesmusic/neuron-explorer](https://github.com/lyramakesmusic/neuron-explorer), a steering-first explorer for Qwen3.5-4B that needs a GPU and a local server. Neuron Atlas uses the same workflow at portfolio scale. [TinyStories-8M](https://huggingface.co/roneneldan/TinyStories-8M) has 8 layers × 1,024 MLP neurons, small enough to sweep exhaustively on a laptop CPU and to run fully client-side.

## Findings

### TinyStories-8M

Every neuron was pushed along its output direction, on three story prompts and from scratch, at the largest push its layer tolerates. 256 random directions per layer were pushed the same way. A neuron is *above the null* when the words it writes beat what every random push in its layer writes. 41 neurons are. That count is within chance: if neurons behaved exactly like random directions, about 32 would pass. The evidence is the replication. On 12 unseen prompts against fresh random directions, 21 of the 41 still beat 95% of them, where chance gives about 2. The **Overview** page charts all 8,192 scores against the 2,048 controls. The **Findings** page has the curated cards, the charts and live replays.

| Neuron | What a push writes | Replicates on new prompts? |
|---|---|---|
| L6 N179 **The villain** | A scary spider, and at larger pushes “a big, mean-looking man… scared all the other people”. The nearest thing this model has to an “evil” neuron. | Yes: beats 98% of fresh controls |
| L2 N109 **The moral** | “She felt sad and wished she had been more careful.” | Yes: 100% |
| L4 N803 **Run and hide** | The top-scoring neuron in the sweep: a threat appears, and the hero is scared, runs and hides. | Partly: 88%, below the 95% bar |
| L0 N80, L4 N877 **Suddenly, a loud noise** | The same startle beat from two neurons four layers apart. The second one adds “It was a big, scary monster.” | L0 N80 no (62%); L4 N877 not tested |
| L7 N756 **Something bad happens** | “Suddenly, a naughty thief stole all of her money!” Pushed the other way, the story stays sunny. | Not tested: beats 99% of sweep controls, not all |
| L5 N722 **The bully** | “A big, mean cat named Max. This cat liked to take other animals' toys.” | Not tested: beats 99% of sweep controls, not all |

**Observations neuron-explorer did not report**

- **Counting words is not evidence, and neither is one sweep.** By a naive “repeated word” test, 78% of random directions look themed, and so do 75% of neurons. Only 41 neurons (0.5%) beat all 256 random directions in their layer, close to the 0.4% that chance alone would give. In layer 5, none does: a random direction that writes a juicy apple and then “a big, mean wolf” outscores them all. Only a test on fresh prompts separates the real neurons from the lucky ones.
- **In a story model, neurons steer plot beats.** The strongest neurons write narrative moves (threat and flight, misfortune, regret, resolution, startle) rather than topics. This is a reading of the rollouts, not a measured category.
- **The middle layers are the fragile ones.** Text stays coherent under random pushes of 0.8× the residual norm at layers 0, 2 and 7, but only 0.4× at layers 4–5. The push size must be calibrated per layer.
- **Writing similar directions does not mean firing together.** This answers an open question in neuron-explorer. Neighbours in an output-direction layout correlate barely more than random pairs (0.006–0.055 against 0.004–0.052), while neighbours in a co-firing layout correlate at 0.06–0.12. The map can switch between the two layouts.
- **The logit lens misleads below the top layer.** Its top tokens overlap the measured steering effect by under 6% in layers 0–6 and by 36% in layer 7.
- **What a neuron writes is rarely what it reads.** Only 2 of the 41 above-null neurons write theme words that match the tokens they fire on.

### Research reports

The **Research** page has seven reports generated from the recorded data by `pipeline/reports.py`. They are also in [`docs/research/`](docs/research/README.md).

- [Is there an evil neuron in Qwen3.5-0.8B?](docs/research/qwen-evil-alien-hunt.md) No. Across 1,493 screened neurons, evil words turn up in 5 of 4,479 pushed rollouts (random directions: 2 of 4,608), and none of 28 confirmed finalists beats its matched random push. Two finalists (L2 N2826, L17 N1637) write *planet*, not aliens. Neurons picked by what they write beat every random direction about three times as often as random neurons do; neurons picked by what they fire on do no better than random.
- [Did a bad-medical-advice fine-tune build an evil neuron?](docs/research/em-organism.md) The fine-tune shifts neuron selectivity about 6× more than a random update of the same size, broadly rather than in a few units. A random update is a low bar, and pushing the shifted neurons writes evil words no more often than random directions do.
- [Do the TinyStories neurons survive new prompts?](docs/research/tinystories-robustness.md) 21 of the 41 above-null neurons still beat 95% of fresh random directions on 12 unseen prompts, greedy and sampled, where chance gives about 2.
- [What happens when you remove a neuron?](docs/research/ablation-and-circuits.md) 6 of the 41 change the loss more than 95% of a 21-neuron random baseline do when zeroed, against about 2 by chance. Concept neurons steer strongly but are rarely necessary.
- [Removing refusal](docs/research/heretic-refusal-and-concepts.md) with Heretic took Qwen3.5-0.8B's refusals on harmful prompts from 97% to 12%, with first-token KL 0.025 on harmless prompts.
- [8 million, 800 million, 4 billion: what scale changes](docs/research/cross-scale.md) compares TinyStories-8M, Qwen3.5-0.8B and the Qwen3.5-4B reference.
- [Literature review](docs/research/literature-review.md): 30 papers and tools, from key-value memories to refusal directions.

## What you can do

The site has five sections: Overview, Atlas, Findings, Research and Method.

- **Overview.** A recorded push of the villain neuron next to a random push that also writes a villain. The histogram below it shows why one story never counts as evidence: neurons score almost exactly like random directions. Hover or tap a bin for its counts, or open the table view.
- **The 3D map.** Each layer is an attention slab followed by a sheet of its feed-forward neurons, joined by the residual stream.
  - Colour neurons by steering uniqueness, selectivity, firing rate or activation on your own text. The sidebar list follows the same choice.
  - Arrange each sheet by output direction or by co-firing, and watch the points morph between the two.
  - Drag to orbit and scroll to zoom. Click a layer name to face it, or click a neuron to open it.
- **Inspect a neuron.**
  - **Uniqueness.** Its score against random directions and the words it writes when pushed.
  - **Contexts.** Its top contexts from 3,000 stories.
  - **Lenses.** The steer lens (the measured next-token effect of a push) next to the logit lens.
  - **Connections.** Its strongest links, drawn on the map.
  - **Name and compare.** Name it, or compare it side by side with any other neuron.
- **Steer tab.** Push any neuron up and down beside a random direction of the same size, on any prompt, with greedy or sampled decoding. A phase plot places the neuron against every neuron and control in its layer. The recorded sweep rollouts are shown with theme words highlighted.
- **Ablate tab.** Zero a neuron, its family or a chosen set, and score held-out stories with and without it. It also tests whether the neuron's theme survives when its family is removed.
- **Edit the live model.** Zero, scale, push or clamp any neuron. Edits persist across reloads, and every probe and generation runs with them, with KL against the unedited model.
- **Probe.** Type any text to see which neurons fire on each token and what the model predicts next.
- **Recorded models.** Pick Qwen3.5-0.8B or the emergently misaligned Qwen2.5-0.5B from the model menu.
  - Colour by the evil and alien hunt results, concept contrast, or the shift after fine-tuning.
  - Open a finalist to read its full-precision steering record and the refusal-removed comparison.
  - Download the finalists as CSV.
- **Findings.** 17 cards: 16 neuron cards with a **Replay live** button that reruns the exact push in your browser, and one random-direction control. Also per-layer charts with table views, the full neuron table as CSV, and the cited Qwen reference units.
- **Keyboard and links.**
  - Press `?` for shortcuts, `/` to search, `[` and `]` for the neighbouring neuron, `1`–`5` for the tabs, `c` to copy a link, `t` for the theme, and `g` then `h`, `a`, `f`, `r` or `m` to change section.
  - A short tour runs on the first visit.
  - Every view has a URL: `#/atlas/L6/N179?tab=steer`, `#/m/qwen3.5-0.8b/L15/N3258?tab=hunt`, `#/findings/villain`, `#/research/em-organism`.

## How it works

```
pipeline/build.py        TinyStories-8M ─┬─ prune vocab 50k → 15k ─▶ model.bin, tokenizer.json
                                         └─ 3,000 stories ─────────▶ atlas.bin (contexts, lens, links, layout)
pipeline/sweep.py        norms, per-layer calibration, 8,192 neurons + 2,048 random controls × 10 rollouts,
                         steer lens, co-firing correlations                         (≈40 min, CPU)
pipeline/analyze.py      theme scores vs controls, uniqueness, layer stats, score histogram ─▶ sweep.bin, findings.json
pipeline/studies.py      robustness on unseen prompts, ablation, family ablation ─▶ studies.json
pipeline/build_model.py  a recorded pack for any decoder-only Hugging Face model ─▶ models/<slug>/
pipeline/qwen/           the Qwen3.5-0.8B hunt: discover → screen → confirm (fp32, with controls and ablation)
pipeline/em/             the emergent-misalignment organism: base vs fine-tuned screens and selectivity shift
pipeline/heretic_lab/    the refusal-removal study (aggregate results only, see Privacy)
pipeline/reports.py      the research reports ─▶ research.json, docs/research/*.md
web/                     React + Three.js; the GPT-Neo forward pass in TypeScript in a Web Worker
```

- **Runtime** (`web/src/lib/model.ts`). A from-scratch GPT-Neo forward pass in TypeScript: local and global attention, no attention scaling, `gelu_new`, and a KV cache. Edits apply to post-GELU activations. Steering pushes add a multiple of the layer's median residual norm along a neuron's output direction. Generation and ablation jobs run in a Web Worker behind a job queue, so the page stays responsive and a job can be cancelled.
- **Steering units.** A push of 1.0 equals the layer's median residual-stream norm, the same unit for every neuron and random direction. Pushing by a neuron's own peak activation gave wildly unequal strengths.
- **Scoring** (`pipeline/scoring.py`). A theme score is the Poisson z of words a unit writes more often than the layer's random directions, summed over its top five. Controls are scored leave-one-out. Uniqueness is the z of that score against the layer's controls. The Qwen hunt and the TinyStories studies use the same rule.
- **Vocabulary pruning.** The pipeline keeps every token the corpus uses, the byte tokens, and the BPE parents needed to reach them, so tokenization stays exact. The model download shrinks to 20 MB. A token that is only part of a UTF-8 character is shown as its bytes, such as `<E2 80>`.
- **Recorded packs** (`web/public/data/models/`). One file per layer, loaded on demand, plus the hunt record and the map layout. The Qwen3.5-0.8B pack is 47 MB and the emergent-misalignment pack 63 MB. Neither is downloaded until you open that model.
- **Data files** are validated on load. A truncated or mismatched download is rejected with a message instead of being misread. Home's score histogram is drawn only if its counts add up to the headline numbers.

The **Method** page on the site has the details and limits.

## Privacy and safety

The refusal-removal and emergent-misalignment studies produce text that should not be published. Under ADR-002 and ADR-007:
- **Published:** neuron statistics, aggregate refusal rates, harmless examples, steering rollouts on the neutral and story prompts the hunt already uses, and lexicon counts.
- **Kept private:** free-form answers to medical, financial or safety questions, generations from harmful prompts, and any rollout the harm lexicon flags. These stay in the git-ignored `research-private/` folder.
- **Never uploaded:** refusal-free or merged weights. Each pack points to its upstream model by commit.

## Verification and tests

```bash
cd web
npm run verify     # TS model vs PyTorch; finding cards, a sample of the sweep and the studies replayed
npm run test:e2e   # production build + size budget + Playwright
npm test           # both
```

- `verify` checks the tokenizer (exact), logits (max error 0.004), activations, and a greedy continuation against PyTorch.
  - With the sweep data present, it replays all 16 neuron cards token for token, and a random sample of 48 sweep rollouts across all layers. 47 of 48 match exactly; batched float32 in PyTorch can flip a near-tied argmax.
  - It also replays the TinyStories studies: the greedy example of each of the 41 above-null neurons in the robustness study, and the villain push with and without its threat family zeroed.
- `python -m qwen.spotcheck` (from `pipeline/`) re-runs a sample of the Qwen3.5-0.8B hunt in fp32 at the revision pinned in its manifest, and checks the recorded text comes back (`--n` neurons, about 1–2 minutes each on 4 cores).
- `npm run budget` keeps every script chunk and the stylesheet under fixed gzip budgets (entry 100 KB, three.js 130 KB, map 24 KB, worker 10 KB) and Home's two data files under 64 KB each.
- The Playwright suite runs on Chromium (desktop, a Pixel 7 phone, and a performance project), Firefox and WebKit. It covers:
  - **Every control.** Each button, radio, checkbox and disclosure on 13 screens and states is pressed, and the test fails on any uncaught error or console error. Behaviour tests cover what the sweep cannot see: search by prediction and layer, the lens switch, the edit slider and Clamp, studio options, the model picker, go-to-neuron, CSV downloads, chart tables and citations.
  - **Navigation.** Loading, search, deep links (including invalid ones), back/forward and keyboard use.
  - **State and input.** Edits that persist across reload, corrupted or blocked `localStorage`, and empty, emoji and over-long probe text.
  - **Steering and replay.** Generate/stop, and findings replay matching the recorded text token for token.
  - **Failures.** WebGL unavailable or lost mid-session; failed or truncated model, atlas and sweep downloads; a score histogram that does not match the headline.
  - **Phone.** Touch: tapping a neuron on the map, a chart bin, the inspector controls and a recorded-model list. Layout: no horizontal overflow at 412 and 375 px, and deep links that keep the inspector on screen while the page loads.
  - **Accessibility.** axe on every page in both themes, and on open panels, dialogs, tables and the recorded models.
  - **Screenshots and timing.** Screenshot comparisons of the key screens in both themes (`npx playwright test hardening --update-snapshots` refreshes them after an intended change). Performance: Home's first view under 2.5 s, and no long task over 200 ms after load.
  - **Edge cases.** A slow network, reduced motion, rapid clicks, and back/forward during an ablation job.
- Firefox and WebKit run the 18 tests tagged `@xb`: loading, search, deep links, history, a click on the map, edits, the probe, steering, Findings and its replay, the keyboard, Home's chart, the theme, shortcuts, Research, a recorded Qwen push, compare and ablation. Install the two browsers once with `npx playwright install firefox webkit` (on Linux, add their system libraries with `npx playwright install-deps firefox webkit`).
- Headless Firefox on Linux has no WebGL without a GPU, so `npm run test:e2e` goes through `scripts/pw.sh`: on a Linux machine with no display it runs Firefox headed inside `xvfb-run`, where Mesa draws in software. Install it with `apt-get install xvfb`. To run a subset the same way, pass Playwright arguments to the script: `bash scripts/pw.sh --project=firefox`.
- `npx tsx scripts/dump-rollouts.ts L4N803 L5c173` prints recorded rollouts (`c` marks a random control) for curating findings.

## Run it

Needs Node.js 20.19+ or 22.12+ (Vite 8).

```bash
cd web
npm install
npm run dev        # http://localhost:5173
npm run build      # static site in web/dist
```

The generated data in `web/public/data/` is committed, so you don't need Python to run the site.

### Rebuild the data

```bash
python -m venv .venv && . .venv/bin/activate
pip install -r pipeline/requirements.txt
curl -LO https://huggingface.co/datasets/roneneldan/TinyStories/resolve/main/TinyStories-valid.txt
python pipeline/build.py   --corpus TinyStories-valid.txt --out web/public/data                    # ~6 min
python pipeline/sweep.py   --corpus TinyStories-valid.txt --cache pipeline/cache                   # ~40 min
cd pipeline && python analyze.py --cache cache --data ../web/public/data                           # ~15 s
python studies.py --corpus ../TinyStories-valid.txt --data ../web/public/data --cache cache
python reports.py --data ../web/public/data --docs ../docs/research
```

- Findings cards are curated in `pipeline/findings_curated.py`. `analyze.py` fills each card's text, z-score and rank from the sweep, so a card can only show what the sweep produced.
- `python score_hist.py` adds the Overview histogram to an existing `findings.json` from the published sweep pack, without the raw rollouts. It refuses to run unless the pack's count of above-null neurons matches the headline.
- The recorded Qwen packs need `pipeline/requirements-qwen.txt`, and each module's docstring gives its command. Build the reading corpus with `corpus_mix.py`, then:
  - Qwen3.5-0.8B: run `build_model.py`, then the hunt stages `qwen.discover`, `qwen.screen` and `qwen.confirm`.
  - The emergent-misalignment organism: the `em/` scripts.

## Deploy to GitHub Pages (no Actions)

```bash
cd web && npm run deploy
```

This is gated. It runs `npm test` (verify, build, size budget, Playwright), then the Playwright suite twice more against the same build. It publishes only after three green runs in a row; `RELEASE_RUNS` changes the count.

It then pushes `web/dist` to the `gh-pages` branch from a temporary git worktree. No GitHub Actions workflow is involved.

One-time setup:
- Install the browsers: `npx playwright install firefox webkit`. On Linux also `npx playwright install-deps firefox webkit` and `apt-get install xvfb` (see above).
- Set **Settings → Pages → Source: Deploy from a branch → `gh-pages` / `(root)`**.

The site is then served at `https://<user>.github.io/<repo>/`. Hash routing means deep links work without a 404 fallback. `vite.config.ts` uses a relative `base`, so the build works from any sub-path.

## License

The code is MIT licensed; see [LICENSE](LICENSE). Model weights and datasets keep their own licenses, listed below.

## Credits

- Method and reference findings: [neuron-explorer](https://github.com/lyramakesmusic/neuron-explorer) (MIT). The Qwen reference units on the Findings page are quoted from its research log.
- Models:
  - [roneneldan/TinyStories-8M](https://huggingface.co/roneneldan/TinyStories-8M) (Eldan & Li, 2023). The model card states no license, so check it before any commercial use.
  - [Qwen/Qwen3.5-0.8B](https://huggingface.co/Qwen/Qwen3.5-0.8B), at the revision pinned in `web/public/data/models/index.json`. Check its card for terms.
  - [ModelOrganismsForEM/Qwen2.5-0.5B-Instruct_bad-medical-advice](https://huggingface.co/ModelOrganismsForEM/Qwen2.5-0.5B-Instruct_bad-medical-advice), from the emergent-misalignment model-organism work. Check its card for terms.
- Refusal removal: [Heretic](https://github.com/p-e-w/heretic).
- Corpus: [TinyStories](https://huggingface.co/datasets/roneneldan/TinyStories), CDLA-Sharing-1.0.
