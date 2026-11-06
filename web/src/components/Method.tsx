// How the atlas and the steering sweep were built, what the numbers mean, and where they stop.

import { useStore } from "../store";

export function MethodPage() {
  const meta = useStore((s) => s.sweepMeta);
  const win = meta?.window;
  const norms = meta?.resid_norm;
  return (
    <div className="page-wrap prose">
      <header className="page-head">
        <h2 className="page-title">How this was measured</h2>
        <p className="lede">
          Everything on this site comes from one small model, two Python scripts that read it, and a TypeScript copy of the model that runs in your browser.
          This page lists each step, the controls behind every claim, and what the measurements cannot tell you.
        </p>
      </header>

      <section>
        <h3>The model</h3>
        <p>
          TinyStories-8M is a GPT-Neo model trained on short children's stories: 8 layers, a 256-wide residual stream, 16 attention heads and 1,024 MLP
          neurons per layer, 8,192 in total. A neuron here is one unit after the GELU in a layer's feed-forward block. The model is small enough that its
          whole forward pass runs in a Web Worker, with a key-value cache, at about 16 ms per token on one CPU core.
        </p>
        <p>
          The browser copy is checked against PyTorch. <code>npm run verify</code> tokenizes test strings and compares the logits and the activations of
          every neuron with values exported from the reference implementation. Both the tokenizer and the forward pass match.
        </p>
      </section>

      <section>
        <h3>The atlas</h3>
        <ul>
          <li>
            <strong>Top contexts.</strong> Each neuron's 20 strongest activations over 3,000 validation stories (one context per story), with the surrounding tokens.
          </li>
          <li>
            <strong>Selectivity.</strong> The share of a neuron's top contexts that peak on its most common token. 100% means it fires on one word.
          </li>
          <li>
            <strong>Logit lens.</strong> The neuron's output weights times the unembedding: the tokens it would promote if its output went straight to the
            logits.
          </li>
          <li>
            <strong>Connections.</strong> The strongest virtual weights to neurons in earlier and later layers: one neuron's output direction dotted with
            another's input direction through that layer norm's scale, times the first neuron's peak activation. Attention is ignored.
          </li>
          <li>
            <strong>Map layout.</strong> Each layer is a grid. Neurons are sorted onto it by the principal components of their output directions, so
            neighbours write similar things. The co-firing layout sorts the same grid by activation correlation instead.
          </li>
        </ul>
      </section>

      <section>
        <h3>The steering sweep</h3>
        <p>
          The method follows neuron-explorer's <em>main_rel</em> sweep, adapted to a smaller model.
        </p>
        <ol>
          <li>
            <strong>One unit for every push.</strong> A push adds a multiple of the layer's median residual-stream norm, along the neuron's normalised output
            direction, at every position.
            {norms && <> Median norms by layer: {norms.map((n) => n.toFixed(2)).join(", ")}.</>} Pushing by a neuron's own maximum activation instead gave
            wildly different strengths from neuron to neuron, and broken text at the top.
          </li>
          <li>
            <strong>A calibrated window per layer.</strong> For each layer, random directions were pushed at sizes from 0.2 to 2.0. The window is the largest
            push at which the text keeps 85% distinct 4-grams.{win && <> Windows by layer: {win.map((w) => w.toFixed(1)).join(", ")}.</>}
          </li>
          <li>
            <strong>Rollouts.</strong> Every neuron, and 256 random directions per layer, was pushed on three story prompts at −1, +0.5 and +1 times the
            window, and from “Once upon a time,” at 1.5 times the window. Each run is 40 greedy tokens.
          </li>
          <li>
            <strong>Theme score.</strong> For each unit, the words it writes more often than the layer's random directions do, scored as a Poisson z, summing
            the top five. Only words that rise count. Controls are scored leave-one-out against the other controls.
          </li>
          <li>
            <strong>Uniqueness.</strong> A neuron's theme score as a z against the 256 controls in its layer, and the share of those controls it beats. A
            neuron is “above the null” only if it beats all 256.
          </li>
          <li>
            <strong>Steer lens.</strong> The measured change in next-token probability, averaged over four contexts, when the residual is pushed up or down
            by the window. Unlike the logit lens it includes everything the later layers do with the push. It ranks tokens by change in probability,
            not log-probability: a log-probability ranking is dominated by rare word fragments lifted from almost zero.
          </li>
        </ol>
      </section>

      <section>
        <h3>Why the random directions matter</h3>
        <p>
          A push of the right size makes any direction look meaningful. Random directions in this model produce text that repeats “bad”, “sad” or “scared”
          often enough that a word count alone would call them a theme. The findings page reports how often that happens. Every claim about a neuron is
          therefore made relative to what random pushes of the same size do in the same layer, on the same prompts.
        </p>
      </section>

      <section>
        <h3>Limits</h3>
        <ul>
          <li>
            One small model. TinyStories-8M knows a children's-story vocabulary, so its concepts are things like monsters, sadness, food and names. The reference
            cards come from a model about 500 times larger and are quoted, not reproduced.
          </li>
          <li>Three prompts and one free start. A neuron whose effect only shows in other kinds of text will be missed.</li>
          <li>
            Greedy decoding. The sweep is deterministic. In the browser, all 16 neuron finding cards replay token for token, and 47 of a random 48 sweep rollouts do (batched float32 in PyTorch can flip a near-tied choice). Sampled text drifts by design. The studio has a sampling switch for
            checking that.
          </li>
          <li>
            Words, not meanings. The theme score counts surface words. A neuron that changes tone without changing vocabulary scores low. Synonyms are counted
            separately.
          </li>
          <li>
            Single neurons. Many features in models are spread across neurons. A neuron that scores low may still be part of something that matters.
          </li>
          <li>Card titles and summaries were written by reading the rollouts. The numbers beside them are computed. The titles are interpretations.</li>
        </ul>
      </section>

      <section>
        <h3>Reproduce it</h3>
        <pre>
          <code>{`python -m venv .venv && . .venv/bin/activate
pip install -r pipeline/requirements.txt
curl -LO https://huggingface.co/datasets/roneneldan/TinyStories/resolve/main/TinyStories-valid.txt
python pipeline/build.py --corpus TinyStories-valid.txt --out web/public/data
python pipeline/sweep.py --corpus TinyStories-valid.txt --cache pipeline/cache   # ~40 min, CPU
cd pipeline && python analyze.py --cache cache --data ../web/public/data
cd ../web && npm ci && npm run verify && npm run dev`}</code>
        </pre>
      </section>

      <section id="recorded-models">
        <h3>Recorded models</h3>
        <p>
          Larger models, such as Qwen3.5-0.8B, are too big to run in a browser tab. The pipeline reads them offline (<code>pipeline/build_model.py</code> and{" "}
          <code>pipeline/qwen/</code>) and saves the results as a model pack: per-neuron statistics, lenses, top contexts and, for the hunt, every steered text.
          The atlas draws a recorded model in the same 3D view, but nothing on its pages runs a model: every output you see was written by the pipeline and saved.
          Each pack records the model's Hugging Face revision, the seeds and the settings.
        </p>
        <p>
          The Qwen hunt screens about 1,500 candidate neurons at int8 precision against 64 random directions per layer, then confirms the strongest at full
          precision on six prompts and six push sizes, each next to a random direction of the same size. The{" "}
          <a href="#/research/qwen-evil-alien-hunt">hunt report</a> has the details.
        </p>
      </section>

      <section id="responsible-use">
        <h3>Responsible use</h3>
        <p>
          Steering can make a model write things it normally would not. The evil-neuron pages show a small model's own continuations under steering, and some
          describe cruelty or harm in general terms. They carry a content note.
        </p>
        <p>
          The refusal-removal study uses Heretic to edit Qwen3.5-0.8B so that it stops refusing. Only aggregate refusal rates, harmless examples and the
          overlap with concept neurons are published. The modified weights and the model's answers to harmful prompts are not published anywhere: not on this
          site, not in the repository, and not on Hugging Face. They stay in a git-ignored folder for the author's own analysis.
        </p>
        <p>
          These tools exist to understand models, including how safety behaviour is implemented and how fragile it is. Please use them that way.
        </p>
      </section>

      <section>
        <h3>Limits of the browser tests</h3>
        <p>
          The end-to-end tests run in Chromium on a desktop and on an emulated phone with a touch screen. A core set (loading, search, deep links, edits, the
          probe, steering, replay, the keyboard and the charts) also runs in Firefox and in WebKit, the engine behind Safari. The tests run without a graphics card, so
          the 3D map is drawn by a software renderer there. Real graphics drivers, older browsers and screen readers are not tested; axe checks the markup
          only.
        </p>
      </section>

      <section>
        <h3>Credits</h3>
        <p>
          The steering method, the residual-norm units and the reference findings come from{" "}
          <a href="https://github.com/lyramakesmusic/neuron-explorer" target="_blank" rel="noreferrer noopener">
            neuron-explorer
          </a>{" "}
          by lyramakesmusic. The model is{" "}
          <a href="https://huggingface.co/roneneldan/TinyStories-8M" target="_blank" rel="noreferrer noopener">
            TinyStories-8M
          </a>{" "}
          by Ronen Eldan and Yuanzhi Li. Its model card states no license. The recorded models are{" "}
          <a href="https://huggingface.co/Qwen/Qwen3.5-0.8B" target="_blank" rel="noreferrer noopener">
            Qwen3.5-0.8B
          </a>{" "}
          and{" "}
          <a href="https://huggingface.co/ModelOrganismsForEM/Qwen2.5-0.5B-Instruct_bad-medical-advice" target="_blank" rel="noreferrer noopener">
            Qwen2.5-0.5B fine-tuned on bad medical advice
          </a>
          , from the emergent-misalignment model organisms. Refusal removal uses{" "}
          <a href="https://github.com/p-e-w/heretic" target="_blank" rel="noreferrer noopener">
            Heretic
          </a>
          .
        </p>
      </section>
    </div>
  );
}
