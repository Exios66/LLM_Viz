# Neuron Atlas

An interactive map of every MLP neuron in a small language model. You can browse the neurons, see what each one responds to, and edit them (ablate, scale, steer or clamp) while the model runs live in your browser. No server or GPU is needed.

![Neuron Atlas: layer 1 neuron 35, which fires on "wish"](docs/screenshot.jpg)

The idea follows [lyramakesmusic/neuron-explorer](https://github.com/lyramakesmusic/neuron-explorer), a steering-first explorer for Qwen3.5-4B that needs a GPU and a local server. Neuron Atlas uses the same workflow at portfolio scale: [TinyStories-8M](https://huggingface.co/roneneldan/TinyStories-8M) has 8 layers × 1,024 MLP neurons, small enough to run fully client-side.

## What you can do

- **Map.** All 8,192 neurons as glowing points on 8 stacked layer sheets. On each sheet, neurons that write similar directions into the residual stream sit near each other. Colour them by selectivity, by firing rate, or by their activation on your own text. Click a layer label to isolate that layer.
- **Inspect a neuron.** See what it fires on, its strongest contexts from 3,000 stories (each token shaded by activation), the activation histogram, and the logit lens: which next tokens its output pushes up or down. You also get its strongest upstream and downstream connections, which are drawn as a web on the map.
- **Probe.** Type any text. Every token is run through the model, and clicking a token lights the map with each neuron's activation at that position. Alongside are the strongest neurons there and the next-token prediction.
- **Edit.** Ablate, scale, steer (add a multiple of the neuron's peak) or clamp any neuron. Edits stack up in the header and apply to every probe and generation. The probe then shows predictions with and without your edits, plus the KL divergence between them. "Continue the text" writes side by side with the original model.
- **Steer.** For one neuron, the Steer tab samples three continuations with the same seed: pushed down, unchanged and pushed up.
- **Search** for neurons that *fire on* a word, or that *predict* a word through the logit lens.

Neuron names you type and your edit list are kept in this browser's `localStorage`.

## How it works

```
pipeline/build.py  (PyTorch, run once)          web/  (React + Three.js, static)
─────────────────────────────────────          ─────────────────────────────────
TinyStories-8M ─┬─ prune vocab 50k → 15k ──▶ model.bin      ─▶ worker: GPT-Neo forward pass in TS,
                │                             tokenizer.json      KV cache, per-neuron edit hooks
                └─ run 3,000 stories ──────▶ atlas.bin      ─▶ map, inspector, search
                   top contexts, stats,      corpus.bin
                   logit lens, connections,
                   sheet layout
```

- **Runtime** (`web/src/lib/model.ts`). A from-scratch GPT-Neo forward pass in TypeScript: local/global attention, no attention scaling (as in GPT-Neo), and `gelu_new`. It runs in a Web Worker, so the UI stays responsive. Edits apply to the post-GELU activation of the chosen neurons at every position. `npm run verify` checks it against PyTorch: the tokenizer matches exactly, top-10 logprob error is 0.004, and a 24-token greedy continuation matches.
- **Vocabulary pruning.** The pipeline keeps every token the corpus uses, the 256 byte tokens, and every BPE parent needed to reach them. It then drops merges whose result was pruned, so tokenization stays exact. This cuts the embedding from 50,257 rows to 15,025 and the model download to 20 MB (fp16).
- **Connections** are direct-path "virtual weights": `W_in[b] · diag(γ_ln2) · W_out[a]`, scaled by the source neuron's peak activation. They ignore attention and the LayerNorm scale, so treat them as hints, not circuits.
- **Logit lens** reads each neuron's output column through the final LayerNorm gain and the unembedding. It shows the direct effect only.
- **Layout.** Per layer, neurons are sorted into a 32×32 grid by the first two principal components of their normalised output directions.

## Run it

```bash
cd web
npm install
npm run dev        # http://localhost:5173
npm run verify     # check the TS model against the PyTorch reference
npm run build      # static site in web/dist
```

The generated data in `web/public/data/` is committed, so you don't need Python to run the site.

### Rebuild the data

```bash
python -m venv .venv && . .venv/bin/activate
pip install --index-url https://download.pytorch.org/whl/cpu torch
pip install transformers numpy
curl -LO https://huggingface.co/datasets/roneneldan/TinyStories/resolve/main/TinyStories-valid.txt
cd pipeline && python build.py --corpus ../TinyStories-valid.txt --out ../web/public/data
```

This takes about 6 minutes on a 4-core CPU.

## Putting it in a portfolio

- `vite.config.ts` uses a relative `base`, so `web/dist` works from any sub-path. Set `VITE_BASE=/your/path/` to pin an absolute one.
- `npm run deploy` (from `web/`) verifies the model, builds the site, and pushes `web/dist` to the `gh-pages` branch. No GitHub Actions involved. One-time setup: Settings → Pages → Source "Deploy from a branch" → `gh-pages` / `(root)`. The site is then served at `https://<user>.github.io/<repo>/`.
- The app is a set of React components (`MapView`, `Inspector`, `Probe`, `Sidebar`) over a small store (`src/store.ts`). You can lift the map or the probe into another React site.

## Credits

- Model: [roneneldan/TinyStories-8M](https://huggingface.co/roneneldan/TinyStories-8M) (Eldan & Li, 2023). The model card states no license, so check it before any commercial use.
- Corpus: [TinyStories](https://huggingface.co/datasets/roneneldan/TinyStories), CDLA-Sharing-1.0.
- Inspiration: [neuron-explorer](https://github.com/lyramakesmusic/neuron-explorer) (MIT).
