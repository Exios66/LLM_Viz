// Inspector for a neuron of a recorded model (ADR-005). Everything shown was computed offline by the pipeline:
// corpus statistics, lenses and contexts from build_model.py, and steering, ablation and controls from the hunt.

import { useEffect, useMemo, useRef, useState } from "react";
import { nid, type NeuronRef } from "../lib/atlas";
import type { Context, Finalist, RecordedModel } from "../lib/recorded";
import type { Tab } from "../lib/route";
import { openModel, setState, useStore } from "../store";
import { DATA } from "../App";
import { Seg, Tok, highlight, showToken, useBringIntoView } from "./bits";

// what a finalist was screened for, not what it was shown to do: the steering record shows the result
const CONCEPT_LABEL: Record<string, string> = { evil: "Screened for evil", alien: "Screened for alien", other: "Strong theme" };

export function ModelInspector({ m, r }: { m: RecordedModel; r: NeuronRef }) {
  const tab = useStore((s) => s.tab);
  const ref = useRef<HTMLElement>(null);
  const f = m.finalist(r);
  const g = m.g(r);
  useBringIntoView(ref);
  const tabs: { v: Tab; label: string }[] = [
    { v: "profile", label: "Profile" },
    { v: "contexts", label: "Contexts" },
    ...(m.hunt ? [{ v: "hunt" as const, label: f ? "Steering record" : "Hunt" }] : []),
  ];
  const cur = tabs.some((t) => t.v === tab) ? tab : "profile";
  const dE = m.signals.d_evil?.[g], dA = m.signals.d_alien?.[g];
  const sE = m.signals.dd_evil?.[g], sA = m.signals.dd_alien?.[g];
  const signed = (v: number) => `${v >= 0 ? "+" : "−"}${Math.abs(v).toFixed(2)}`;

  return (
    <aside ref={ref} className="inspector" aria-label={`Neuron ${nid(r)} of ${m.entry.label}`}>
      <header className="insp-head">
        <div className="insp-id">
          <h2>
            Layer {r.layer}, neuron {r.neuron}
          </h2>
          <button className="icon" onClick={() => openModel(m.entry.slug, null)} aria-label="Close neuron">
            ×
          </button>
        </div>
        <p className="insp-auto">
          {f ? (
            <>
              <span className={`concept-tag c-${f.concept}`}>{CONCEPT_LABEL[f.concept]}</span> {m.label(r)}
            </>
          ) : (
            m.label(r)
          )}
        </p>
        <dl className="stats">
          <div><dt>max</dt><dd>{m.max[g].toFixed(2)}</dd></div>
          <div><dt>fires on</dt><dd>{(m.density[g] * 100).toFixed(1)}% of tokens</dd></div>
          <div><dt>selectivity</dt><dd>{Math.round(m.share[g] * 100)}%</dd></div>
          {Number.isFinite(dE) && <div><dt>evil contrast</dt><dd>d {dE!.toFixed(2)}</dd></div>}
          {Number.isFinite(dA) && <div><dt>alien contrast</dt><dd>d {dA!.toFixed(2)}</dd></div>}
          {Number.isFinite(sE) && <div><dt>evil shift</dt><dd>Δd {signed(sE!)}</dd></div>}
          {Number.isFinite(sA) && <div><dt>alien shift</dt><dd>Δd {signed(sA!)}</dd></div>}
        </dl>
      </header>
      <Seg<Tab> label="Neuron view" value={cur} onChange={(t) => setState({ tab: t })} options={tabs} />
      <div className="insp-body" tabIndex={0} role="region" aria-label="Neuron details">
        {cur === "profile" && <Profile m={m} r={r} />}
        {cur === "contexts" && <Contexts m={m} r={r} />}
        {cur === "hunt" && (f ? <HuntRecord m={m} f={f} /> : <NotAFinalist m={m} r={r} />)}
      </div>
    </aside>
  );
}

function useAsync<T>(fn: () => Promise<T>, deps: unknown[]) {
  const [s, set] = useState<{ v: T | null; err: string | null }>({ v: null, err: null });
  useEffect(() => {
    let live = true;
    set({ v: null, err: null });
    fn().then((v) => live && set({ v, err: null }), (e) => live && set({ v: null, err: String(e?.message ?? e) }));
    return () => {
      live = false;
    };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
  return s;
}

function Profile({ m, r }: { m: RecordedModel; r: NeuronRef }) {
  const lens = useAsync(() => m.lens(r), [m, r.layer, r.neuron]);
  const f = m.finalist(r);
  return (
    <section>
      <h3>What its output direction predicts (logit lens)</h3>
      {lens.err && <p className="err" role="alert">The lens for layer {r.layer} failed to load: {lens.err}</p>}
      {!lens.v && !lens.err && <div className="skeleton skel-block" role="status" aria-label="Loading the lens" />}
      {lens.v && (
        <div className="lens-pair">
          <LensList title="Promotes" items={lens.v.promotes} />
          <LensList title="Suppresses" items={lens.v.suppresses} neg />
        </div>
      )}
      {f && (
        <>
          <h3>What pushing it raises (steer lens)</h3>
          <p className="note flush">Tokens whose next-token probability rises most when the neuron is pushed one window up, or one window down, averaged over four prompts.</p>
          <div className="lens-pair">
            <LensList title="Pushed up, raises" items={f.steer_lens.up.map(([tok, v]) => ({ tok, v }))} pct />
            <LensList title="Pushed down, raises" items={f.steer_lens.down.map(([tok, v]) => ({ tok, v }))} neg pct />
          </div>
        </>
      )}
      <p className="note">The corpus mixes Wikipedia paragraphs, TinyStories, concept sentences and chat prompts, so a neuron's profile reflects that mix.</p>
    </section>
  );
}

function LensList({ title, items, neg, pct }: { title: string; items: { tok: string; v: number }[]; neg?: boolean; pct?: boolean }) {
  const mx = Math.max(...items.map((x) => Math.abs(x.v)), 1e-9);
  return (
    <div>
      <h4>{title}</h4>
      <ul className={`lens${neg ? " neg" : ""}`}>
        {items.map((x, i) => (
          <li key={i}>
            <code>{showToken(x.tok) || "∅"}</code>
            <span className="bar" style={{ width: `${(Math.abs(x.v) / mx) * 100}%` }} />
            <span className="val">{pct ? `${x.v > 0 ? "+" : ""}${(x.v * 100).toFixed(2)}%` : x.v.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Contexts({ m, r }: { m: RecordedModel; r: NeuronRef }) {
  const ctx = useAsync<Context[]>(() => m.contexts(r), [m, r.layer, r.neuron]);
  if (ctx.err) return <p className="err" role="alert">Contexts for layer {r.layer} failed to load: {ctx.err}</p>;
  if (!ctx.v) return <div className="skeleton skel-block" role="status" aria-label="Loading contexts" />;
  if (!ctx.v.length) return <p className="note">This neuron never turned on in the recorded corpus.</p>;
  return (
    <section>
      <h3>Where it fires hardest</h3>
      <ol className="contexts">
        {ctx.v.map((c, i) => (
          <li key={i}>
            <span className="act">{c.act.toFixed(2)}</span>
            <p>
              {c.tokens.map((t, j) => (Number.isNaN(c.rel[j]) ? null : <Tok key={j} text={t} rel={c.rel[j]} active={j === c.center} />))}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function NotAFinalist({ m, r }: { m: RecordedModel; r: NeuronRef }) {
  const h = m.hunt!;
  const u = useMemo(() => h.scatter.units.find((x) => x[0] === r.layer && x[1] === r.neuron), [h, r]);
  return (
    <section>
      <h3>Not a finalist</h3>
      {u ? (
        <p>
          This neuron was screened: pushing it scored z {u[2].toFixed(1)} against random directions in layer {r.layer}, beating {Math.round(u[3] * 100)}% of them, with{" "}
          {u[4]} evil and {u[5]} alien words across the screening prompts. It was not strong enough to be confirmed.
        </p>
      ) : (
        <p>
          This neuron was not screened. The hunt screened about 1,500 of the {(m.L * m.N).toLocaleString()} neurons: the ones whose activations or output
          directions best separate evil or alien sentences from neutral ones, plus random neurons as a baseline.
        </p>
      )}
      <p>
        <button className="link" onClick={() => setState({ colorMode: "hunt" })}>
          Colour the map by hunt results
        </button>{" "}
        to see the finalists.
      </p>
    </section>
  );
}

function HuntRecord({ m, f }: { m: RecordedModel; f: Finalist }) {
  const h = m.hunt!;
  const [di, setDi] = useState(() => Math.max(0, h.doses.indexOf(1)));
  const [pi, setPi] = useState(0);
  const dose = h.doses[di];
  const key = String(dose);
  const cell = f.grid[key]?.[pi];
  const ctrl = h.controls[String(f.layer)]?.grid[key]?.[pi];
  const lex = h.lexicon[f.concept] ?? [];
  const win = h.calib.windows[f.layer];
  const norm = h.calib.norms[f.layer];
  const ab = f.ablation;
  const heretic = useHeretic(m);
  const hf = heretic?.pushes.filter((x) => x.layer === f.layer && x.neuron === f.neuron) ?? [];

  return (
    <section className="hunt">
      {f.concept === "evil" && (
        <p className="content-note" role="note">
          Content note: these are a model's own continuations under steering. Some describe cruelty or harm in general terms.
        </p>
      )}
      <div className="uniq strong">
        <p>
          Screened at int8: z {f.screen.z.toFixed(1)} against 64 random directions in layer {f.layer}, beating {Math.round(f.screen.pct * 100)}% of them.
          <span className="uniq-meta">
            Evil words in {f.screen.hits_evil} and alien words in {f.screen.hits_alien} of its 3 screen rollouts (whole words, counted once per rollout). Confirmed at full precision on {h.prompts.length} prompts.
          </span>
        </p>
        {f.screen.theme.length > 0 && (
          <p className="themes">
            Pushing it writes{" "}
            {f.screen.theme.map((w) => (
              <span key={w} className="theme">{w}</span>
            ))}
          </p>
        )}
      </div>

      <h3>Recorded steering</h3>
      <div className="steer-controls">
        <label className="slider">
          <span>Push</span>
          <input type="range" min={0} max={h.doses.length - 1} step={1} value={di} onChange={(e) => setDi(Number(e.target.value))} aria-valuetext={`${dose} windows`} />
          <span>
            {dose > 0 ? "+" : ""}
            {dose}× window ({(dose * win).toFixed(2)}× resid)
          </span>
        </label>
        <div className="prompt-chips" role="radiogroup" aria-label="Prompt">
          {h.prompts.map((p, i) => (
            <button key={p.id} role="radio" aria-checked={i === pi} className={`chip${i === pi ? " on" : ""}`} onClick={() => setPi(i)}>
              {p.label}
            </button>
          ))}
        </div>
      </div>
      <div className="steer-cols">
        <div className="steer-col c1">
          <h4>Unchanged model</h4>
          <p>{h.baseline[pi]}</p>
        </div>
        <div className={`steer-col ${dose < 0 ? "c0" : "c2"}`}>
          <h4>
            Neuron pushed {dose > 0 ? "+" : ""}
            {dose}× window{cell && Number.isFinite(cell.coh) && <span className="coh"> coherence {Math.round(cell.coh * 100)}%</span>}
          </h4>
          <p>{cell ? highlight(cell.text, lex) : "Not recorded."}</p>
        </div>
        <div className="steer-col c3">
          <h4>Random direction, same layer and size</h4>
          <p>{ctrl ? highlight(ctrl.text, lex) : "No control recorded for this layer."}</p>
        </div>
      </div>
      <p className="note">
        Greedy decoding, 40 new tokens. One window is the largest push that keeps layer {f.layer}'s text coherent: {win.toFixed(2)}× its median residual norm of{" "}
        {norm.toFixed(2)}. Highlighted words come from the {f.concept} lexicon.
      </p>

      <h3>Ablation</h3>
      <p>
        Holding this neuron at zero changes the model's loss on {ab.concept} sentences by {fmtD(ab.d_nll_concept)} nats per token, and on matched neutral
        sentences by {fmtD(ab.d_nll_neutral)}.{" "}
        {Math.abs(ab.d_nll_concept) > 2 * Math.abs(ab.d_nll_neutral) && ab.d_nll_concept > 0
          ? "The model leans on it more for the concept than for neutral text."
          : "The effect is small or similar on both, so the model does not depend on this one neuron for the concept."}
      </p>
      <p className="note">KL divergence of the next-token distribution: {ab.kl_concept.toExponential(2)} on concept text, {ab.kl_neutral.toExponential(2)} on neutral text.</p>

      <h3>Logit lens</h3>
      <p className="themes">
        Promotes{" "}
        {f.logit_lens.up.slice(0, 8).map((t, i) => (
          <code key={i} className="theme">{showToken(t)}</code>
        ))}
      </p>

      {hf.length > 0 && (
        <>
          <h3>Before and after refusal removal</h3>
          <p className="note flush">The same push of one window, in the original model and in the copy Heretic modified to stop refusing. 48 tokens, greedy.</p>
          {hf.map((x, i) => (
            <div key={i} className="steer-cols">
              <p className="prompt-echo">“{x.prompt}”</p>
              <div className="steer-col c2">
                <h4>Original, pushed</h4>
                <p>{highlight(x.original, lex)}</p>
              </div>
              <div className="steer-col c4">
                <h4>Refusal removed, pushed</h4>
                <p>{highlight(x.heretic, lex)}</p>
              </div>
            </div>
          ))}
        </>
      )}

      {h.reference && f.concept === "alien" && (
        <figure className="ref-quote">
          <blockquote>{h.reference.quote}</blockquote>
          <figcaption>
            For comparison: {h.reference.unit} in {h.reference.model}, asked “{h.reference.prompt}”, from{" "}
            {h.reference.source ? <a href={h.reference.source}>the neuron-explorer research log</a> : "the neuron-explorer research log"}. A different model, four
            times larger.
          </figcaption>
        </figure>
      )}
    </section>
  );
}

const fmtD = (x: number) => `${x >= 0 ? "+" : ""}${x.toFixed(4)}`;

interface HereticPublic {
  pushes: { layer: number; neuron: number; prompt: string; original: string; heretic: string }[];
}

/** heretic.json is optional: the registry flags it once the Heretic study has published it, so other models never 404. */
const hereticCache = new Map<string, Promise<HereticPublic | null>>();
function useHeretic(m: RecordedModel) {
  const [v, set] = useState<HereticPublic | null>(null);
  useEffect(() => {
    const slug = m.entry.slug;
    if (!m.entry.heretic) return;
    let p = hereticCache.get(slug);
    if (!p) {
      p = fetch(`${DATA}/models/${slug}/heretic.json`)
        .then((r) => (r.ok ? r.json() : null))
        .then((j) => sanitizeHeretic(j))
        .catch(() => null);
      hereticCache.set(slug, p);
    }
    let live = true;
    p.then((x) => live && set(x));
    return () => {
      live = false;
    };
  }, [m]);
  return v;
}

export function sanitizeHeretic(j: unknown): HereticPublic | null {
  if (!j || typeof j !== "object") return null;
  const raw = (j as { pushes?: unknown }).pushes;
  const pushes: HereticPublic["pushes"] = [];
  for (const x of Array.isArray(raw) ? (raw as Record<string, unknown>[]) : []) {
    const u = typeof x?.unit === "string" ? /^L(\d+)N(\d+)$/.exec(x.unit) : null;
    if (!u || typeof x.original !== "string" || typeof x.heretic !== "string") continue;
    pushes.push({ layer: Number(u[1]), neuron: Number(u[2]), prompt: String(x.prompt ?? "").slice(0, 200), original: x.original.slice(0, 800), heretic: x.heretic.slice(0, 800) });
  }
  return { pushes };
}
