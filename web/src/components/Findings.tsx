// The findings log: headline numbers, per-layer charts, curated neuron cards (each
// replayable live in the browser), the reference cards from neuron-explorer, and notes.

import { useEffect, useMemo } from "react";
import type { Atlas } from "../lib/atlas";
import type { FindingCard, Findings, Sweep } from "../lib/sweep";
import { openModel, setState, useStore } from "../store";
import { DoseHeatmap, LayerBars, LayerDots } from "./charts";
import { highlight } from "./bits";
import { download, liveNeuronCsv } from "../lib/exportData";
import { DATA } from "../App";

const KIND_LABEL: Record<FindingCard["kind"], string> = {
  concept: "Concept pull",
  style: "Style",
  suppressor: "Suppressor",
  "reads-writes": "Reads what it writes",
  control: "Control",
};

const pct = (v: number) => `${Math.round(v * 100)}%`;


export function FindingsPage({ atlas }: { atlas: Atlas }) {
  const sweep = useStore((s) => s.sweep);
  const sweepError = useStore((s) => s.sweepError);
  const card = useStore((s) => s.card);

  useEffect(() => {
    if (!card || !sweep) return;
    const el = document.getElementById(`card-${card}`);
    if (el) {
      el.scrollIntoView({ block: "start" });
      el.focus({ preventScroll: true });
    }
  }, [card, sweep]);

  if (!sweep) {
    return (
      <div className="page-wrap">
        <h2 className="page-title">Findings</h2>
        <p className={sweepError ? "err" : "note"} role="status">
          {sweepError ? `The steering results failed to load: ${sweepError}` : "Loading the steering results…"}
        </p>
      </div>
    );
  }

  const f = sweep.findings;
  const missing = card && !f.cards.some((c) => c.id === card);
  return (
    <div className="page-wrap">
      <header className="page-head">
        <p className="eyebrow">Findings log</p>
        <h2 className="page-title">What pushing every neuron did</h2>
        <p className="lede">
          Every one of the {f.headline.neurons.toLocaleString()} MLP neurons in TinyStories-8M was pushed along its output direction, on three story prompts and
          from scratch, at the largest push its layer tolerates before the text falls apart. So were {f.headline.controls.toLocaleString()} random directions of
          the same size. A neuron counts as a find only when what it writes beats what random pushes write.
        </p>
      </header>
      {missing && (
        <p className="notice inline" role="status">
          There is no finding called “{card}”. Here is the full log.
        </p>
      )}

      <Headline f={f} />

      <section aria-labelledby="cards-h">
        <h3 id="cards-h" className="section-title">
          Neurons worth meeting
        </h3>
        <p className="section-lede">
          Each card shows the recorded continuation without and with the push. <strong>Replay</strong> opens the neuron and runs the same push live in your
          browser. With greedy decoding it reproduces the text below token for token.
        </p>
        <div className="cards">
          {f.cards.map((c) => (
            <Card key={c.id} c={c} atlas={atlas} active={c.id === card} />
          ))}
        </div>
      </section>

      {f.layers.length > 0 && <LayerCharts sweep={sweep} f={f} />}

      {f.notes.length > 0 && (
        <section aria-labelledby="notes-h">
          <h3 id="notes-h" className="section-title">
            New observations
          </h3>
          <p className="section-lede">Things this sweep measured that the original neuron-explorer research did not test or did not report.</p>
          <ol className="notes">
            {f.notes.map((n) => (
              <li key={n.title}>
                <h4>{n.title}</h4>
                <p>{n.body}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section aria-labelledby="ref-h">
        <h3 id="ref-h" className="section-title">
          The reference: neurons in a 4B model
        </h3>
        <p className="section-lede">
          These units were reported by neuron-explorer in Qwen3.5-4B, a model about 500 times larger. They are quoted from its research log and are not runnable
          here. A model trained only on children's stories has no word for an extraterrestrial intelligence. Its closest relatives are the concept pulls above.
        </p>
        <div className="cards ref">
          {f.reference.map((r) => (
            <article key={r.id} className="card ref-card">
              <div className="card-top">
                <span className="kind">Reported, not live</span>
                <span className="unit">
                  {r.model} · {r.unit}
                </span>
              </div>
              <h4>{r.title}</h4>
              <blockquote>{r.quote}</blockquote>
              <p className="note">{r.context}</p>
              <a href={r.source} target="_blank" rel="noreferrer noopener">
                Source: neuron-explorer research log
              </a>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="data-h" className="data-dl">
        <h3 id="data-h" className="section-title">Download the data</h3>
        <p className="section-lede">Everything on this page, in formats you can open elsewhere.</p>
        <ul className="dl-list">
          <li>
            <button onClick={() => download("tinystories-8m-neurons.csv", liveNeuronCsv(atlas, sweep))}>Neuron table (CSV)</button>
            <span>All {f.headline.neurons.toLocaleString()} neurons: corpus statistics, steering score, themes and top logit-lens tokens.</span>
          </li>
          <li>
            <a className="btn" href={`${DATA}/findings.json`} download>Findings (JSON)</a>
            <span>Headline numbers, per-layer results and every card on this page.</span>
          </li>
          <li>
            <a className="btn" href={`${DATA}/studies.json`} download>Follow-up studies (JSON)</a>
            <span>Robustness, push-size curves, ablation, the villain circuit and families.</span>
          </li>
          <li>
            <a className="btn" href={`${DATA}/research.json`} download>Reports and references (JSON)</a>
            <span>The research reports as structured blocks, with every reference.</span>
          </li>
        </ul>
      </section>

      <p className="note foot">
        {f.generated && !Number.isNaN(Date.parse(f.generated)) && (
          <>Generated {new Date(f.generated).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })} by </>
        )}
        <code>pipeline/analyze.py</code>.{" "}
        <a href="#/method">How this was measured, and its limits</a>.
      </p>
    </div>
  );
}

function Headline({ f }: { f: Findings }) {
  const h = f.headline;
  return (
    <dl className="tiles">
      <div>
        <dt>Neurons that beat every random direction in their layer</dt>
        <dd>
          {h.neurons_above_null.toLocaleString()}
          <small> of {h.neurons.toLocaleString()}</small>
        </dd>
      </div>
      <div>
        <dt>Random directions that look themed when you only count words</dt>
        <dd>
          {pct(h.controls ? h.controls_naive_theme / h.controls : 0)}
          <small> of {h.controls.toLocaleString()}</small>
        </dd>
      </div>
      <div>
        <dt>Neurons that look themed by the same naive count</dt>
        <dd>
          {pct(h.neurons ? h.neurons_naive_theme / h.neurons : 0)}
          <small> of {h.neurons.toLocaleString()}</small>
        </dd>
      </div>
    </dl>
  );
}

function Card({ c, atlas, active }: { c: FindingCard; atlas: Atlas; active: boolean }) {
  const ready = useStore((s) => s.modelProgress >= 1);
  const replay = () => {
    openModel(null, { layer: c.layer, neuron: c.neuron }, "steer");
    setState({ steerRequest: { layer: c.layer, neuron: c.neuron, prompt: c.prompt, dose: c.dose, nonce: Date.now() } });
  };
  const label = atlas.label({ layer: c.layer, neuron: c.neuron });
  return (
    <article id={`card-${c.id}`} tabIndex={-1} className={`card k-${c.kind}${active ? " active" : ""}`} aria-labelledby={`card-${c.id}-h`}>
      <div className="card-top">
        <span className="kind">{KIND_LABEL[c.kind]}</span>
        {c.kind === "control" ? (
          <span className="unit">
            L{c.layer} · random direction #{c.neuron}
          </span>
        ) : (
          <a className="unit" href={`#/atlas/L${c.layer}/N${c.neuron}`}>
            L{c.layer}·N{c.neuron}
          </a>
        )}
      </div>
      <h4 id={`card-${c.id}-h`}>{c.title}</h4>
      <p className="card-sum">{c.summary}</p>
      <div className="card-runs">
        <div>
          <h5>No push</h5>
          <p>
            <span className="prompt-echo">{c.prompt}</span>
            {c.baseline}
          </p>
        </div>
        <div className="steered">
          <h5>
            Push {c.dose > 0 ? "+" : "−"}
            {Math.abs(c.dose).toFixed(2)}× residual norm
          </h5>
          <p>
            <span className="prompt-echo">{c.prompt}</span>
            {highlight(c.steered, c.themes)}
          </p>
        </div>
      </div>
      <dl className="card-stats">
        <div>
          <dt>{c.kind === "control" ? "Beats other random" : "Beats random"}</dt>
          <dd>{Number.isFinite(c.pct) ? pct(c.pct) : "–"}</dd>
        </div>
        <div>
          <dt>z</dt>
          <dd>{Number.isFinite(c.z) ? c.z.toFixed(1) : "–"}</dd>
        </div>
        <div>
          <dt>Rank</dt>
          <dd>{c.rank > 0 ? `#${c.rank.toLocaleString()}` : "–"}</dd>
        </div>
        {c.kind !== "control" && (
          <div>
            <dt>Fires on</dt>
            <dd title={label}>{label}</dd>
          </div>
        )}
      </dl>
      {c.themes.length > 0 && (
        <p className="themes" aria-label="Theme words">
          {c.themes.map((t) => (
            <span key={t} className="theme">
              {t}
            </span>
          ))}
        </p>
      )}
      {c.kind === "control" ? (
        <p className="note">
          A random direction cannot be replayed by name. Every neuron's studio has a “Compare with a random direction” column that draws a fresh one.
        </p>
      ) : (
        <div className="card-actions">
          <button className="primary" onClick={replay} title={ready ? undefined : "Runs as soon as the model has loaded"}>
            Replay live
          </button>
          <a href={`#/atlas/L${c.layer}/N${c.neuron}`}>Open neuron</a>
        </div>
      )}
    </article>
  );
}

function LayerCharts({ sweep, f }: { sweep: Sweep; f: Findings }) {
  const L = f.layers;
  const calib = sweep.meta.calib;
  const dots = useMemo(
    () => [
      { name: "Nearest in the writes layout", values: L.map((x) => x.neighbour_cofire.writes) },
      { name: "Nearest in the co-firing layout", values: L.map((x) => x.neighbour_cofire.cofire) },
      { name: "Random pairs", values: L.map((x) => x.neighbour_cofire.random) },
    ],
    [L],
  );
  return (
    <section aria-labelledby="layers-h">
      <h3 id="layers-h" className="section-title">
        Layer by layer
      </h3>
      <div className="chart-grid">
        <div>
          <DoseHeatmap
            title="Text stays coherent up to a push that depends on the layer"
            doses={calib.doses}
            values={calib.coherence}
            windows={sweep.meta.window}
          />
          <p className="chart-note">
            Share of distinct 4-grams in text written under random pushes, by push size (× the layer's median residual norm). Outlined: the push used for that
            layer, the largest that keeps the text at 0.85 or above. Layers 4 and 5 break first.
          </p>
        </div>
        <div>
          <LayerBars title="Share of neurons that beat every random direction" values={L.map((x) => x.above_null)} fmt={pct} />
          <p className="chart-note">A neuron beats a random direction when its theme score, a Poisson z of over-represented words, is higher.</p>
        </div>
        <div>
          <LayerDots title="Neighbours in the co-firing layout really do co-fire" series={dots} fmt={(v) => v.toFixed(2)} />
          <p className="chart-note">
            Mean activation correlation between neurons in adjacent cells of each layer's grid, over 40,000 held-out tokens. The writes layout puts neurons together because their output
            directions agree. Whether that also groups neurons that fire together was an open question in neuron-explorer.
          </p>
        </div>
        <div>
          <LayerBars title="Logit lens and measured Δlog-probability agree on (top-12 overlap, common tokens)" values={L.map((x) => x.lens_agreement)} fmt={pct} max={1} />
          <p className="chart-note">
            Overlap of the top 12 promoted tokens between the logit lens (output weight times unembedding) and the steer lens (the measured change in next-token
            log-probability under a push). Low overlap in early layers means the logit lens cannot be read as what the neuron does there.
          </p>
        </div>
        <div>
          <LayerBars title="How much a push changes the next token (median KL, nats)" values={L.map((x) => x.kl_median)} fmt={(v) => v.toFixed(2)} />
        </div>
        <div>
          <LayerBars title="Of the neurons above the null, share that write what they read" values={L.map((x) => x.rw_share)} fmt={pct} max={1} />
          <p className="chart-note">The theme words a push produces overlap the tokens that make the neuron fire.</p>
        </div>
      </div>
    </section>
  );
}
