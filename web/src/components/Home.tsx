// Home: one recorded experiment as the hero (prompt, the villain neuron's push, and a random push of the same size),
// then the numbers that explain why the random column matters, then where to go next.

import { useEffect, useState } from "react";
import { openModel, useStore } from "../store";
import { highlight } from "./bits";

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

export function HomePage() {
  const sweep = useStore((s) => s.sweep);
  const sweepError = useStore((s) => s.sweepError);
  const models = useStore((s) => s.models);
  const f = sweep?.findings;
  const villain = f?.cards.find((c) => c.id === "villain");
  const control = f?.cards.find((c) => c.id === "random-villain");
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    if (!villain) return;
    const t = window.setTimeout(() => setPulse(true), reduced() ? 0 : 450);
    return () => window.clearTimeout(t);
  }, [villain]);
  const steered = useReveal(villain?.steered ?? "", pulse);
  const qwen = models.find((m) => m.slug.startsWith("qwen"));

  return (
    <div className="home">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title" className="hero-title">Push one neuron and watch the story change.</h1>
          <p className="hero-lede">
            Neuron Atlas maps all 8,192 feed-forward neurons of a small story-writing model. It pushes each one along its output direction and puts the result
            next to random pushes of the same size, so a striking story counts only when it beats chance.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#/atlas/L6/N179?tab=steer">
              Steer the villain neuron
            </a>
            <a className="btn" href="#/atlas">
              Open the 3D atlas
            </a>
          </div>
        </div>

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
              </figcaption>
              <div className="specimen-runs">
                <div className="run run-base">
                  <h2>Unchanged model</h2>
                  <p>{villain.baseline}</p>
                </div>
                <div className="run run-push">
                  <h2>
                    Neuron L{villain.layer}·N{villain.neuron} pushed {+villain.dose.toFixed(2)}× the residual norm
                  </h2>
                  <p aria-hidden={!steered.done}>
                    {steered.done ? highlight(villain.steered, villain.themes.filter((w) => !GENERIC.has(w))) : steered.shown}
                    {!steered.done && <span className="caret" />}
                  </p>
                  <p className="sr-only">{villain.steered}</p>
                </div>
                {control && (
                  <div className="run run-null">
                    <h2>A random direction in layer {control.layer}, pushed {+control.dose.toFixed(2)}× on another prompt</h2>
                    <p>
                      <span className="prompt-echo">{control.prompt}</span>
                      {control.steered}
                    </p>
                  </div>
                )}
              </div>
              <p className="specimen-foot">
                Recorded with greedy decoding.{" "}
                {control && "The random push writes a villain too, which is why one story never counts as evidence. "}
                <a href="#/findings/villain">See how this neuron scored</a>
              </p>
            </>
          )}
        </figure>
      </section>

      {f && (
        <section className="facts" aria-label="The numbers behind the atlas">
          <dl>
            <div>
              <dt>Neurons pushed</dt>
              <dd>{f.headline.neurons.toLocaleString()}</dd>
              <p>Every MLP neuron in TinyStories-8M, at the largest push its layer tolerates before the text falls apart.</p>
            </div>
            <div>
              <dt>Random directions pushed</dt>
              <dd>{f.headline.controls.toLocaleString()}</dd>
              <p>256 per layer, the same size as the neuron pushes. They set the bar a neuron has to clear.</p>
            </div>
            <div>
              <dt>Neurons that beat every random push</dt>
              <dd>{f.headline.neurons_above_null}</dd>
              <p>
                If you only ask whether the text has a theme, {Math.round((f.headline.neurons_naive_theme / f.headline.neurons) * 100)}% of neurons qualify, and so do{" "}
                {Math.round((f.headline.controls_naive_theme / f.headline.controls) * 100)}% of random directions.
              </p>
            </div>
          </dl>
        </section>
      )}

      <section className="paths" aria-labelledby="paths-title">
        <h2 id="paths-title" className="section-title">Where to go next</h2>
        <ul className="path-list">
          <li>
            <a href="#/atlas">
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
                <strong>{qwen.label}: the evil and alien hunt</strong>
                <span>
                  {(qwen.layers * qwen.neurons).toLocaleString()} neurons of a modern chat model, screened offline for neurons that push it toward evil or toward
                  aliens. Recorded, not live.
                </span>
              </a>
            </li>
          )}
          <li>
            <a href="#/findings">
              <strong>Findings</strong>
              <span>The neurons that cleared the bar, the controls that nearly did, and the per-layer charts.</span>
            </a>
          </li>
          <li>
            <a href="#/research">
              <strong>Research reports</strong>
              <span>Write-ups generated from the data, and a literature review of the work this builds on.</span>
            </a>
          </li>
          <li>
            <a href="#/method">
              <strong>Method and limits</strong>
              <span>How pushes are sized, what the controls are, and what this approach cannot tell you.</span>
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
