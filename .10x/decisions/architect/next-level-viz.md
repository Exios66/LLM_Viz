# Architecture: Neuron Atlas v2, next-level interactive LLM visualizations

Status: **Proposed**, awaiting alignment · Owner: principal-architect · Slug: `next-level-viz` · 2026-11-03

## 1. Goal

Turn Neuron Atlas from "a map you can click" into an instrument for exploring a transformer from the inside. The instrument should:
- show the whole architecture working (residual stream, attention, MLPs) on the visitor's own text
- find the neurons that are genuinely unusual, and prove they are unusual against a null
- present the best finds, starting with steering finds in the spirit of the "alien Qwen" neuron, as replayable, shareable experiments
- stay a static site on GitHub Pages, deployed **without GitHub Actions**

## 2. Requirements

### Functional
| # | Requirement | Priority |
|---|---|---|
| F1 | **Findings gallery:** curated, replayable steering discoveries, each one click from a live reproduction | Must |
| F2 | **Uniqueness ranking:** isolate neurons whose steering effect beats a random-direction null, at matched push size | Must |
| F3 | **Steering studio:** dose scrubber with a theme/coherence curve drawn against the control band | Must |
| F4 | **Architecture view:** animated forward pass; residual stream, attention heads and MLP sheets in one scene | Must |
| F5 | **Attention view:** per-head patterns as arcs/heatmaps, with head-type labels (previous-token, induction, sink) | Should |
| F6 | **Logit lens over depth:** the token × layer grid showing where a prediction forms | Should |
| F7 | **Attribution lite:** for a chosen output token, the heads and neurons that pushed it, as a graph | Should |
| F8 | Deep links: every view and experiment encoded in the URL | Must |
| F9 | GPT-2 small as an opt-in second model (decided 2026-11-03: "Tiny now, GPT-2 later") | Later phase |
| F10 | Reference cards for published Qwen3.5-4B finds (alien N2742 and others), clearly labelled as not live | Should |

### Non-functional
- **Hosting:** static files on GitHub Pages, built and pushed locally (`npm run deploy` → `gh-pages` branch). Hard limits: 100 MB per file, about 1 GB per site, about 100 GB per month soft bandwidth.
- **First paint** under 2 s on broadband, before any model weights load. The tiny model is interactive at about 30 MB total.
- **60 fps** orbiting the 8k-point map on a 2020 laptop iGPU; degrade gracefully on phones.
- **Honesty:** every claim on screen is reproducible in the page or cited. No finding is shown without its control comparison.
- **Accessibility:** keyboard navigation, `prefers-reduced-motion` (animations become steppable), and colour ramps that hold up for colour-blind viewers.

## 3. Existing landscape `[DISCOVERED]`, verified against the code on 2026-11-03

- `pipeline/build.py` (PyTorch, CPU) builds `model.*`, `tokenizer.json`, `atlas.*`, `corpus.*` and `testvec.json` into `web/public/data/` using the binpack format (JSON manifest + 8-byte-aligned blob).
- `web/src/lib/model.ts` is a GPT-Neo forward pass in TypeScript running in a Web Worker (`worker.ts`, `runtime.ts`), with a KV cache and per-neuron edits (`add`/`set`/`scale` in units of the neuron's max). It is verified against PyTorch (`npm run verify`).
- The UI is React 18 + Three.js 0.169 with one external store (`store.ts`). Views: `MapView` (3D sheets), `Inspector`, `Probe`, `Sidebar`, `Header`.
- Deploy: the Actions workflow was **removed** on 2026-11-03 at the user's request and replaced by `web/scripts/deploy-pages.sh`.

## 4. Evidence gathered for this design (2026-11-03)

These spikes ran on TinyStories-8M (CPU) to check the assumptions the plan depends on.

1. **Random directions fake "evil" neurons.** A random unit direction at layer 5, at 0.6× the residual norm, wrote: "Tim was a bad and bad bad. He was not good and bad." Read alone, that looks like an evil neuron. Neuron-explorer's log hit the same trap ("random direction 1 → 'Xiaomi AI'"). **So:** F2 is not optional. Every displayed find carries its z-score against a per-layer null of random directions.
2. **Real concept pulls exist.** L5·N551 at +0.6 gives "…a big, scary monster came to the story". L5·N141 at +0.3 gives "The ball was sad because it could not make a sound". The pulls are coherent at low dose and fall into repetition ("sad sad sad") at high dose: the same quiet/loud regimes the reference describes.
3. **Dose units must be the residual norm, per layer.** Median residual norm leaving each layer (block outputs): `[1.78, 2.20, 2.17, 2.48, 2.82, 2.84, 2.83, 3.26]`. Doses in units of a neuron's max (the current UI) gave wreckage at 12× for every candidate. *Correction (later the same day):* an earlier figure of 44 for layer 7 came from Hugging Face's last `hidden_states` entry, which is taken after the final LayerNorm; measured at the block output, layer 7 is in line with the others. Per-layer calibration of random directions puts the coherent window at `[0.8, 0.6, 0.8, 0.6, 0.4, 0.4, 0.6, 0.8]` × residual norm.
4. **A full sweep is cheap.** 128 steered rollouts × 40 tokens take 2.4 s on 4 CPU cores. All 8,192 neurons plus 8 × 256 random controls, at 10 rollouts each (about 102k rollouts), take **about 33 min**. No GPU is needed for the tiny model.
5. **Lens hits are not steering hits.** Of 6 neurons whose logit lens lists " evil", none produced evil content when steered. Most degenerated into repetition ("underground underground…"). The logit lens shows the direct path only, so a find needs steering evidence.

## 5. Options considered

### A. Extend the current single-page app in place
Add views to the existing components, keep the CPU runtime and keep `atlas.bin` growing.
- ✅ Least work; nothing new to learn.
- ❌ The monolithic `atlas.bin` (7.9 MB today) grows with every view. The map, sweep and attention data would all load up front. GPT-2 (124M parameters) is unusable on a CPU at an interactive rate (about 1–3 tokens/s in JavaScript).
- ❌ The views would share no selection model, so linked brushing becomes ad-hoc prop drilling.

### B. Static atlas + pluggable compute backend + linked-view shell — **recommended**
Versioned, sharded **model packs** served from Pages. A **Backend** interface with a CPU implementation (current code) and a WebGPU implementation added in the GPT-2 phase. Views are independent modules over a shared **selection/experiment store** and a **URL state codec**. All heavy analysis (sweeps, rankings, head types) is precomputed offline. The browser does only per-input work.
- ✅ Fits static hosting and the "Tiny now, GPT-2 later" decision without a rewrite. Each view loads only its shards.
- ✅ Findings are data (a JSON spec per experiment), so the gallery, deep links and the steering studio share one replay path.
- ❌ More moving parts: a pack manifest, a backend interface, shard loading. About 1 extra week of foundation before visible gains.

### C. Hybrid with an inference server (Hugging Face Space / Modal)
Keep the static front end, but call a hosted Python backend for big models, including live Qwen3.5-4B.
- ✅ Could reproduce the actual alien neuron live.
- ❌ Breaks the static-Pages requirement for core features. Brings ongoing cost (GPU-hours), cold starts, a public abuse surface, and an availability dependency for a portfolio piece.
- ❌ Not needed for any Must requirement. A **one-way door** on operating cost; defer.

**Recommendation: B.** It is the simplest design that meets every Must, keeps the site free to host, and makes GPT-2 an additive phase rather than a rewrite. C stays a possible later add-on behind a feature flag: if a Qwen endpoint ever exists, it plugs in as a third Backend.

## 6. Recommended architecture

```
 OFFLINE (Python, run locally)                         ONLINE (static, GitHub Pages)
 ┌─────────────────────────────────────┐   packs/   ┌──────────────────────────────────────────────┐
 │ build.py      → model pack          │──────────▶ │ PackLoader   manifest → lazy shards (+Cache) │
 │ atlas.py      → neuron atlas shards │  (sharded, │      │                                       │
 │ sweep.py      → steering sweep      │  hashed,   │ Backend ─┬─ CpuBackend   (TS, worker) ✓ now  │
 │ rank.py       → uniqueness scores   │  <100 MB)  │          └─ GpuBackend   (WebGPU) — phase 4  │
 │ heads.py      → head types, lens    │            │      │  forward / generate / hooks          │
 │ findings.yaml → curated experiments │            │ Experiment engine  (spec → run → result)     │
 └─────────────────────────────────────┘            │      │                                       │
          verify.ts (TS ≡ PyTorch)                  │ Store: selection · experiment · edits · URL  │
                                                    │      │                                       │
   npm run deploy ──▶ gh-pages branch ──▶ Pages     │ Views: Anatomy · Map · Attention · Lens grid │
                                                    │        Studio · Findings · Inspector · Probe │
                                                    └──────────────────────────────────────────────┘
```

### 6.1 Components and ownership

| Component | Owns | Notes |
|---|---|---|
| **Pack format v2** | Manifest schema, shard naming, integrity | `pack.json` = `{schema: 2, model, shards: [{name, sha256, bytes}], arrays: {name → shard, offset, dtype, shape}}`. Shards are content-hashed (`atlas.examples.3f9a.bin`), so a deploy can never serve a stale mix. Each shard is ≤ 95 MB (Pages limit). |
| **PackLoader** | Fetching, progress, caching | Shards load per view on demand. Uses the Cache Storage API for repeat visits; on failure it retries with backoff and shows a per-shard error state. |
| **Backend** (interface) | Running a model with hooks | See §6.3. CPU now; WebGPU in phase 4. The model-specific bits (GPT-Neo vs GPT-2 attention, scaling, local windows) live in a `ModelSpec`. |
| **Experiment engine** | The single replay path | Takes an `ExperimentSpec` (§6.4) and runs it on a Backend. Results are memoised by spec hash. Used by Findings, Studio, Probe and deep links. |
| **Store** | Selection, hover, edits, active experiment, view layout | Extends the current `store.ts`. Adds `selection: Selection[]` (neurons, heads, tokens, layers), so every view brushes every other. |
| **URL codec** | Shareable state | Hash routing (`#/finding/monster-l5n551`, `#/studio?n=L5N551&d=0.6&p=…`). Hash routing works on Pages without a 404 fallback. |
| **Views** | Rendering only | Each view declares the shards it needs and the hooks it requests. Views never call the worker directly. |

### 6.2 The visualizations

All views share one visual system: the current "fluorescence" ramp (indigo → cyan → gold, rose for suppression), Instrument Serif for headings, Manrope for UI and JetBrains Mono for tokens. One orchestrated motion moment, the forward-pass animation in the Anatomy view. Everything else animates only in response to the viewer.

1. **Anatomy (new hero view).** The model as a vertical "residual river". The token stream runs up the centre; at each layer it passes a ring of 16 attention heads and an MLP sheet. Pressing ▶ on any text animates the forward pass token by token:
   - particles travel the residual stream, with brightness set by the update norm
   - heads flare by attention entropy
   - MLP neurons light as in the current map
   - a column at the top shows the logit-lens prediction sharpening layer by layer

   Reduced motion turns it into a stepper. Rendering: Three.js instanced meshes plus one `UnrealBloomPass`, which turns off automatically when frame time exceeds 20 ms.
2. **Neuron map v2.** Same sheets, with morphing layouts: *writes* (current), *co-firing* (correlation of activations over the corpus; the reference left this untested) and *steering-effect* (UMAP of each neuron's steer-lens vector). Layouts morph over 600 ms on a GPU attribute tween. Points sit in an instanced buffer with a picking pass on a colour-ID render target (O(1) hover; replaces raycasting). Uniqueness score drives point size, so the finds glow without being searched for.
3. **Attention lab.** Pick a head to see arcs between tokens: Bézier ribbons whose width shows attention weight, on a Canvas2D overlay for crispness. A 16×8 head grid shows small attention heatmaps. Precomputed head-type badges: previous-token, induction (measured on repeated random sequences), first-token sink, local-window. Clicking a head ablates it live: one more edit type.
4. **Lens grid.** A token × layer matrix. Each cell shows the top logit-lens token and its probability, shaded by probability, with KL to the final distribution. Hovering a cell lists the components with the largest direct contribution there.
5. **Attribution lite.** For a chosen output token, the direct-logit attribution of every head and neuron at that position (activation × output column · unembedding row, after the final LayerNorm). Drawn as a layered node-link graph: layer bands, edge width ∝ contribution, gold for push and rose for suppress. It is exact for the direct path; indirect effects are marked as not shown. A gradient-based version waits for the WebGPU backend.
6. **Steering studio.** For one neuron, or a direction:
   - a dose scrubber from −1.0 to +1.0 × residual norm, which shows the continuation morphing token by token with the same seed
   - beneath it, a **phase plot** of theme strength (x) against coherence (distinct-4-gram ratio, y) across doses
   - the neuron's trajectory drawn over a grey band of the layer's random-direction controls, so it is visible at a glance when a neuron escapes the null
   - "Compare to a random direction" runs a matched-norm control live
7. **Findings gallery (F1, F10).** A scroll-driven set of "field notes". Each card holds:
   - a title, e.g. *"The monster neuron (L5·N551)"*
   - one line of what it does, and the key rollout pair (unsteered vs steered)
   - its z-score against controls, and a sparkline of the dose curve
   - **Replay**, which opens the Studio pre-loaded from the card's `ExperimentSpec`

   A second section, **"From the Qwen3.5-4B research"**, holds static, cited cards: alien L22·N2742 ("I am Extrali… from the planet Xenobi"), L22·N5344 "Responsible AI", L22·N4002 water/money, L22·N3103 "Climbing", and suppressor L21·N3003. Quotes are verbatim from neuron-explorer's research log, each with a link and a "not live in this page" badge.
8. **Inspector and Probe** (existing) gain the steer lens (next-token Δlogprob under a ±0.6 push, which fixes cases the logit lens misses), the neuron's sweep rollouts, and its uniqueness score with rank.

### 6.3 Backend contract

```ts
interface Backend {
  readonly spec: ModelSpec;                       // layers, heads, d_model, d_mlp, vocab, attention kinds
  forward(tokens: number[], opts: {
    capture?: Array<"mlp" | "attn" | "resid" | "lens">;   // what to return per position
    interventions?: Intervention[];
  }): Promise<Trace>;
  generate(prompt: number[], variants: Intervention[][], opts: SampleOpts,
           onToken: (variant: number, token: number) => void): Cancellable;
}

type Intervention =
  | { kind: "neuron"; layer: number; neuron: number; mode: "add" | "set" | "scale"; value: number; unit: "max" | "resid" }
  | { kind: "direction"; layer: number; vector: Float32Array; scale: number; unit: "resid" }   // random controls, SAE features later
  | { kind: "head"; layer: number; head: number; mode: "ablate" | "scale"; value: number };

interface Trace {                                  // transferable typed arrays
  tokens: number[];
  mlp?: Float32Array;    // [T, L, N]
  attn?: Float32Array;   // [L, H, T, T]  (lower triangle filled)
  resid?: Float32Array;  // [L+1, T, D]
  lens?: { ids: Uint32Array; probs: Float32Array };   // [L, T, k]
  logits: Float32Array;  // [T, V]  or last position only
}
```

- **Dose unit change:** add `unit: "resid"`, backed by per-layer median residual norms stored in the model pack. Keep `"max"` for back-compatibility with saved edits.
- The CPU backend already has every hook point. Attention capture costs O(L·H·T²), which is 2 M floats at T=128. It is captured only when a view asks.

### 6.4 Experiment spec, the unit of a "find"

```yaml
# pipeline/findings.yaml  (curated; built into findings.json)
- id: monster-l5n551
  title: The monster neuron
  model: tinystories-8m
  target: { layer: 5, neuron: 551 }
  prompt: "Once upon a time, there was a little bunny named Tim. One day,"
  doses: [-0.6, 0, 0.3, 0.6]          # × residual norm at layer 5
  sampling: { temperature: 0, max_tokens: 40 }
  evidence: { z_theme: <from sweep>, layer_rank: <from sweep>, control_p95: <from sweep> }
  note: "Pulls a scary monster into any story at +0.6; repetition sets in past +0.9."
```

The pipeline replays every curated spec and **fails the build** if a stored rollout no longer reproduces. This guarantees that no card claims something the page cannot reproduce.

### 6.5 Isolating unique neurons (F2): the method

The method adapts neuron-explorer's `main_rel` design to an 8-layer model.

1. **Calibrate per layer.** Run 32 random directions × doses {0.2…1.5} × resid norm on 4 prompts. Pick the coherent window per layer (distinct-4 ≥ 0.85 for random directions). Measured: `[0.8, 0.6, 0.8, 0.6, 0.4, 0.4, 0.6, 0.8]`. Layers 4–5 are the most fragile.
2. **Sweep.** For every neuron (8,192) and 256 random directions per layer, run 4 TinyStories-style prompts × doses {−w, +w/2, +w} plus one free-generation prompt at +1.5w: 10 greedy rollouts of 40 tokens each. CPU estimate about 33 min. Each rollout keeps token ids and chosen-token logprobs.
3. **Score.** Compute these per unit:
   - **theme mass:** summed Poisson z of the unit's top-5 over-represented words against the layer's control rollouts (leave-one-out), counting rises only (the reference found falls mostly displace the prompt's own topic)
   - **cross-prompt consistency:** the fraction of prompts where the top theme word appears
   - **coherence:** distinct-4-gram ratio at +w
   - **read/write agreement:** overlap between peak-activation tokens and theme words, a hallmark of the alien neuron, which reads and writes "alien"
4. **Uniqueness score** = z(theme mass vs that layer's controls) × consistency × coherence, reported with the layer's control p95. Neurons above every control in their layer are candidates. A person then curates the top 30 into `findings.yaml`, using the Studio.
5. **Steer lens.** For every neuron, a ±0.6w push on 4 contexts gives the next-token Δlogprob (top-12) and KL. It costs seconds on CPU and powers search by steering effect, not just logit lens.

Outputs are `sweep.bin` (per neuron: theme word ids, z-scores, coherence, and the 10 rollouts as u16 token ids, about 7 MB) and `rank.json` (top 500 with scores).

### 6.6 About the "evil" neuron

The neuron-explorer research log contains **no "evil" neuron**; its documented finds are alien (N2742), Responsible AI, water/money, Climbing, and comma suppressors. Before a reference card is written, the source of the "evil" finding is needed: a paper, a post, or a model and layer. Until then:
- **In TinyStories-8M,** the sweep will look for a villain/mean/bad concept pull and report it only if it beats the controls (Evidence §4.1 shows why that bar matters).
- **In GPT-2 (phase 4),** the same sweep runs on a model with a far richer moral vocabulary, which is the more likely home for a convincing "evil" neuron.

**Outcome (2026-11-03, after the full sweep).** Two TinyStories neurons beat the null with villain-like pulls: L6·N179 (spider → “a big, mean-looking man… scared all the other people”, z 4.9, rank 3 of 8,192) and L7·N756 (“a naughty thief stole all of her money”, z 3.1, beats 99.2% of controls). A random control in layer 5 also writes “a big, mean wolf came”, which is shown as a caution card. The external source of the user's "evil" neuron is still unknown.

## 7. Failure modes and handling

| Failure | Detection | Handling |
|---|---|---|
| WebGL context lost (mobile, GPU reset) | `webglcontextlost` event | Pause the render loop, show "Restore view", rebuild buffers on `webglcontextrestored` |
| Frame budget exceeded | Rolling frame-time average > 20 ms | Drop bloom → halve point size → cap DPR at 1; persist the choice per device |
| WebGPU missing (phase 4) | `navigator.gpu` absent or adapter request fails | GPT-2 option disabled with a reason; the tiny model on CPU stays fully functional |
| Shard fetch fails or is truncated | sha256 mismatch, HTTP error | Retry ×3 with backoff, then a per-view error naming the file; other views keep working |
| Stale cache after deploy | Content-hashed shard names | Old shards are unreferenced; the manifest is fetched with `cache: "no-cache"` |
| Worker crash or OOM (long text, big model) | `worker.onerror`, pending-call timeout | Restart the worker, re-init from the Cache Storage copy, surface "Run again"; cap T at 256 on mobile |
| A finding no longer reproduces (pipeline or model change) | Build-time replay check | The build fails; the card cannot ship |
| 100 MB file limit on Pages | Pack writer asserts shard size | Shard at 95 MB; GPT-2 fp16 (about 250 MB) ships as 3 shards, or about 125 MB at int8 with per-row scales, verified against PyTorch |
| Bandwidth (GPT-2 is about 250 MB per visitor) | — | GPT-2 is opt-in behind an explicit "Download 250 MB" button and never auto-loads; Cache Storage makes repeat visits free |

## 8. Phased plan

| Phase | Scope | Exit criteria |
|---|---|---|
| **0 — Deploy without Actions** (done in this change) | Remove the workflow; `npm run deploy` → `gh-pages` | Site live after the one-time Pages setting |
| **1 — Foundations** (about 1 wk) | Pack v2 + PackLoader; Backend interface over the current CPU code; `unit:"resid"` doses + norms in the pack; Selection store; URL codec; colour-ID picking | `verify` passes; every existing feature still works; deep link restores a focused neuron and its edits |
| **2 — Finds** (about 1.5 wk) *(user priority)* | Calibration + full sweep + scoring (`sweep.py`, `rank.py`); steer lens; Steering studio with control band; Findings gallery (TinyStories finds + cited Qwen cards); uniqueness-sized points on the map | ≥ 15 curated finds above their layer's control p95, each replaying in-page; the random-direction "bad bad" example shown as the cautionary card |
| **3 — Anatomy** (about 2 wk) | Anatomy hero with the forward-pass animation; Attention lab + head types + head ablation; Lens grid; Attribution lite; co-firing and steering layouts with morphs | 60 fps on a reference laptop; reduced-motion stepper; attribution sums match logits within 1e-3 |
| **4 — GPT-2 small** (about 2 wk) | WebGPU backend (WGSL matmul/attention kernels); GPT-2 ModelSpec + pack (int8 shards); rerun pipeline + sweep on GPT-2 on a rented GPU (≈ $5–10); hunt for "evil"/persona neurons with controls | WebGPU logits match PyTorch (top-10 logprob error < 0.02); CPU fallback message; ≥ 10 GPT-2 finds |
| **5 — Features** (optional) | Train a small sparse autoencoder (SAE) on TinyStories MLP outputs offline; feature view alongside neurons (superposition explainer) | Steering by feature direction via `kind:"direction"` |

## 9. Decisions log

| # | Decision | Reversibility |
|---|---|---|
| D1 | Static Pages + `gh-pages` branch, no Actions (user, 2026-11-03) | Two-way |
| D2 | Tiny model now, GPT-2 via WebGPU later (user, 2026-11-03) | Two-way |
| D3 | All heavy analysis offline; browser does per-input work only | Two-way |
| D4 | Every displayed find must beat a per-layer random-direction null and replay in-page | Two-way, but it is the credibility of the project; keep it |
| D5 | Steering doses in residual-norm units per layer (`unit:"resid"`) | Two-way (both units supported) |
| D6 | No inference server (Option C deferred) | Cost is a one-way door; revisit only with a funded endpoint |
| D7 | Three.js (WebGL2) for 3D, Canvas2D/SVG + d3-scale/d3-shape for 2D; no new UI framework | Two-way |

## 10. Open questions for the user

1. **"Evil" neuron source:** which model, layer and neuron, and where it was published? The neuron-explorer log has none (§6.6).
2. Are the Qwen3.5-4B reference cards wanted as quoted, cited summaries (proposed), or should they be omitted until a live reproduction exists?
3. Should the custom-domain/portfolio path be set now (`VITE_BASE`), or should the site stay at `https://exios66.github.io/LLM_Viz/`?
