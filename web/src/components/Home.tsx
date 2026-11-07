// Home: the hero (headline and the layer-stack figure, whose push pulse leads into the experiment), then one recorded
// experiment as a three-column plate (unchanged, the villain neuron's push, a random push of the same size), the study
// in numbers, the score chart that explains why the random column matters, and where to go next.

import { useEffect, useMemo, useState } from "react";
import { bootHeavy } from "../App";
import { openModel, useStore } from "../store";
import { highlight } from "./bits";
import { ScoreChart } from "./ScoreChart";
import type { FindingCard } from "../lib/sweep";
import { LayerStack } from "./LayerStack";
import { mulberry32 } from "../lib/model";

// theme words too common to be worth marking in the hero
const GENERIC = new Set(["other", "back", "came", "went", "said"]);

const reduced = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Reveal text word by word once, the one orchestrated motion on the site (ADR-006). */
function useReveal(text: string, start: boolean, ms = 38) {
  const words = text.split(/(\s+)/);
  const [n, setN] = useState(() => (reduced() ? words.length : 0));
  useEffect(() => {
    if (!start || reduced()) {
      if (reduced()) setN(words.length);
      return;
    }
    setN(0);
    let i = 0;
    const id = window.setInterval(() => {
      i += 2;
      setN(i);
      if (i >= words.length) window.clearInterval(id);
    }, ms);
    return () => window.clearInterval(id);
  }, [text, start]); // eslint-disable-line react-hooks/exhaustive-deps
  return { shown: words.slice(0, n).join(""), done: n >= words.length };
}

/** Overview: the hero and its pulse, the recorded experiment, the numbers, the score chart and the destinations. */
export function HomePage() {
  const f = useStore((s) => s.findings);
  const sweepError = useStore((s) => s.sweepError);
  const models = useStore((s) => s.models);
  const villain = f?.cards.find((c) => c.id === "villain");
  const control = f?.cards.find((c) => c.id === "random-villain");
  // Two beats: the push travels up the layer stack (450 ms in, 1.3 s long), then the steered text writes itself out once
  // the stream above the neuron has lit. With reduced motion both start on, so the first paint is the finished state.
  const [pulse, setPulse] = useState(reduced);
  const [writing, setWriting] = useState(reduced);
  useEffect(() => {
    if (!villain || reduced()) return;
    const t1 = window.setTimeout(() => setPulse(true), 450);
    const t2 = window.setTimeout(() => setWriting(true), 1800);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [villain]);
  const qwen = models.find((m) => m.slug.startsWith("qwen"));
  const qwenNeurons = qwen ? (qwen.layers * qwen.neurons).toLocaleString() : "";
  // a stable object, so the memoised stack does not re-render when Home does
  const focus = useMemo(() => (villain ? { layer: villain.layer, neuron: villain.neuron } : null), [villain?.layer, villain?.neuron]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="home">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="hero-kicker">
            <span className="live-dot" aria-hidden="true" />
            An interpretability instrument that runs in your browser
          </p>
          <h1 id="hero-title" className="hero-title">Push one neuron and watch the story change.</h1>
          <p className="hero-lede">
            Neuron Atlas maps all 8,192 feed-forward neurons of a small story-writing model. It pushes each one along its output direction and puts the result
            next to random pushes of the same size, so a striking story counts only when it beats chance.
          </p>
          <div className="hero-actions">
            <a className="btn primary lg" href="#/atlas/L6/N179?tab=steer" onPointerEnter={bootHeavy} onFocus={bootHeavy}>
              Steer the villain neuron
            </a>
            <a className="btn lg" href="#/atlas" onPointerEnter={bootHeavy} onFocus={bootHeavy}>
              Open the 3D atlas
            </a>
          </div>
        </div>
        <LayerStack pulsed={pulse} focus={focus} />
      </section>

      <figure className={`specimen darkfield${pulse ? " pulsed" : ""}`} aria-label="A recorded steering experiment">
        {!villain ? (
          <div className="specimen-wait" role="status">
            {sweepError ? `The recorded experiment failed to load: ${sweepError}` : <><div className="skeleton skel-line" /><div className="skeleton skel-line" /><div className="skeleton skel-line short" /></>}
          </div>
        ) : (
          <>
            <figcaption className="specimen-prompt">
              <span className="specimen-label">Prompt</span>
              <span className="specimen-text">{villain.prompt}</span>
              <span className="specimen-meta">Recorded, greedy decoding</span>
            </figcaption>
            <div className="specimen-runs">
              <div className="run run-base">
                <span className="run-kind"><span className="sw sw-base" aria-hidden="true" />Baseline</span>
                <h2>Unchanged model</h2>
                <p>{villain.baseline}</p>
              </div>
              <PushRun card={villain} writing={writing} />
              {control && (
                <div className="run run-null">
                  <span className="run-kind"><span className="sw sw-null" aria-hidden="true" />Control</span>
                  <h2>A random direction in layer {control.layer}, pushed {+control.dose.toFixed(2)}× on another prompt</h2>
                  <p>
                    <span className="prompt-echo">{control.prompt}</span>
                    {control.steered}
                  </p>
                </div>
              )}
            </div>
            <p className="specimen-foot">
              {control && "The random push writes a villain too, which is why one story never counts as evidence. "}
              <a href="#/findings/villain">See how this neuron scored</a>
            </p>
          </>
        )}
      </figure>

      {f && (
        <dl className="stat-band" aria-label="The study in numbers">
          <div>
            <dt>Neurons mapped and pushed</dt>
            <dd>{f.headline.neurons.toLocaleString()}</dd>
          </div>
          <div>
            <dt>Random directions as controls</dt>
            <dd>{f.headline.controls.toLocaleString()}</dd>
          </div>
          <div className="stat-win">
            <dt>Beat every random push in their layer (chance alone: about {Math.round(f.headline.neurons / 257)})</dt>
            <dd>{f.headline.neurons_above_null}</dd>
          </div>
          {qwen && (
            <div>
              <dt>{qwen.label} neurons recorded offline</dt>
              <dd>{qwenNeurons}</dd>
            </div>
          )}
        </dl>
      )}

      {f && (
        <section className="evidence" aria-labelledby="evidence-title">
          <div className="evidence-copy">
            <h2 id="evidence-title" className="section-title">Most neurons score like random pushes</h2>
            <p>
              Each of the {f.headline.neurons.toLocaleString()} neurons was pushed at the largest size its layer tolerates, and the theme of the text it wrote
              was scored against 256 random directions pushed by the same amount in that layer. The two distributions have nearly the same shape.{" "}
              {f.headline.neurons_above_null} neurons beat every random push in their layer, but chance alone would put about{" "}
              {Math.round(f.headline.neurons / 257)} there, so one sweep is only a first cut. The{" "}
              <a href="#/research/tinystories-robustness">robustness study</a> retests them on new prompts.
            </p>
            <p>
              Asking only whether the steered text has a theme would pass {Math.round((f.headline.neurons_naive_theme / f.headline.neurons) * 100)}% of the
              neurons, and {Math.round((f.headline.controls_naive_theme / f.headline.controls) * 100)}% of the random directions.
            </p>
          </div>
          <div className="evidence-plate">
            {f.score_hist && <ScoreChart h={f.score_hist} neurons={f.headline.neurons} controls={f.headline.controls} />}
          </div>
        </section>
      )}

      <section className="paths" aria-labelledby="paths-title">
        <h2 id="paths-title" className="section-title">Where to go next</h2>
        <ul className="path-list">
          <li className="path-atlas">
            <a href="#/atlas">
              <MiniAtlas />
              <Glyph kind="atlas" />
              <strong>Live atlas</strong>
              <span>The whole model in 3D, running in your browser. Open any neuron to read its contexts, then ablate or steer it.</span>
            </a>
          </li>
          {qwen && (
            <li className="path-qwen">
              <a
                href={`#/m/${qwen.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  openModel(qwen.slug);
                }}
              >
                <Glyph kind="hunt" />
                <strong>{qwen.label}: the evil and alien hunt</strong>
                <span>
                  {qwenNeurons} neurons of a modern chat model, screened offline for neurons that push it toward evil or toward
                  aliens. Recorded, not live.
                </span>
              </a>
            </li>
          )}
          <li>
            <a href="#/findings">
              <Glyph kind="findings" />
              <strong>Findings</strong>
              <span>The neurons that cleared the bar, the controls that nearly did, and the per-layer charts.</span>
            </a>
          </li>
          <li>
            <a href="#/research">
              <Glyph kind="research" />
              <strong>Research reports</strong>
              <span>Write-ups generated from the data, and a literature review of the work this builds on.</span>
            </a>
          </li>
          <li>
            <a href="#/method">
              <Glyph kind="method" />
              <strong>Method and limits</strong>
              <span>How pushes are sized, what the controls are, and what this approach cannot tell you.</span>
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}

/** The push column. It owns the word-by-word reveal, so each tick re-renders this column and not the whole page. */
function PushRun({ card, writing }: { card: FindingCard; writing: boolean }) {
  const steered = useReveal(card.steered, writing);
  return (
    <div className="run run-push">
      <span className="run-kind"><span className="sw sw-push" aria-hidden="true" />Push</span>
      <h2>
        Neuron L{card.layer}·N{card.neuron} pushed {+card.dose.toFixed(2)}× the residual norm
      </h2>
      {/* the visible text is always hidden from assistive technology, which reads the whole story once from the copy below */}
      <p aria-hidden="true">
        {steered.done ? highlight(card.steered, card.themes.filter((w) => !GENERIC.has(w))) : steered.shown}
        {!steered.done && <span className="caret" />}
      </p>
      <p className="sr-only">{card.steered}</p>
    </div>
  );
}

let miniSheets: { l: number; x: number; y: number; dots: { cx: number; cy: number; r: number; hot: boolean }[] }[] | null = null;
/** The mini atlas's sheets and dots. The geometry is fixed (seeded), so it is built once, on first use. */
function miniAtlasSheets() {
  if (miniSheets) return miniSheets;
  const rnd = mulberry32(8);
  miniSheets = Array.from({ length: 8 }, (_, l) => {
    const x = 26 + l * 34, y = 18 + l * 4;
    const dots = Array.from({ length: 16 }, () => {
      const u = rnd(), v = rnd(), e = rnd() ** 3;
      return { cx: x + 4 + u * 14 + v * 6, cy: y + 6 + v * 70 - u * 8, r: 0.8 + e * 1.8, hot: e > 0.35 };
    });
    return { l, x, y, dots };
  });
  return miniSheets;
}

/** The live atlas's tile shows the map itself in miniature: eight neuron sheets in a row, as the 3D view lays them out. */
function MiniAtlas() {
  return (
    <svg className="mini-atlas" viewBox="0 0 320 120" aria-hidden="true">
      {miniAtlasSheets().map((s) => (
        <g key={s.l}>
          <path className="mini-sheet" d={`M${s.x} ${s.y}l22 -10v78l-22 10z`} />
          {s.dots.map((d, i) => (
            <circle key={i} className={d.hot ? "dot hot" : "dot"} cx={d.cx} cy={d.cy} r={d.r} />
          ))}
        </g>
      ))}
    </svg>
  );
}

/** Line glyphs for the destinations: drawn on a 28 px grid with one accent mark each. */
function Glyph({ kind }: { kind: "atlas" | "hunt" | "findings" | "research" | "method" }) {
  return (
    <svg className="glyph" viewBox="0 0 28 28" width="28" height="28" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {kind === "atlas" && (
        <>
          <path d="M3 9.5 14 5l11 4.5L14 14z" />
          <path d="M3 14.5 14 19l11-4.5" />
          <path d="M3 19.5 14 24l11-4.5" />
          <circle className="accent" cx="17.5" cy="9.6" r="1.8" />
        </>
      )}
      {kind === "hunt" && (
        <>
          <circle cx="12" cy="12" r="7.5" />
          <path d="m17.5 17.5 6 6" />
          <circle className="accent" cx="12" cy="12" r="2" />
        </>
      )}
      {kind === "findings" && (
        <>
          <path d="M4 23h20" />
          <path d="M7 23V15M11.5 23V11M16 23v-6M20.5 23V8" />
          <circle className="accent" cx="20.5" cy="5" r="1.8" />
        </>
      )}
      {kind === "research" && (
        <>
          <path d="M6 4h11l5 5v15H6z" />
          <path d="M17 4v5h5M10 14h8M10 18h6" />
          <circle className="accent" cx="10" cy="9.5" r="1.6" />
        </>
      )}
      {kind === "method" && (
        <>
          <path d="M11 4v8l-6 10.5A1.5 1.5 0 0 0 6.3 25h15.4a1.5 1.5 0 0 0 1.3-2.5L17 12V4" />
          <path d="M9 4h10M8.5 19h11" />
          <circle className="accent" cx="14" cy="21.5" r="1.4" />
        </>
      )}
    </svg>
  );
}
