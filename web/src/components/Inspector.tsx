import { useEffect, useMemo, useRef, useState } from "react";
import { nid, type Atlas, type NeuronRef } from "../lib/atlas";
import { mulberry32, type Edit } from "../lib/model";
import type { Sweep } from "../lib/sweep";
import type { Tab } from "../lib/route";
import { editKey, focusNeuron, getState, removeEdit, setState, upsertEdit, useStore } from "../store";
import { Histogram, NeuronButton, Seg, Tok, showToken, useBringIntoView } from "./bits";
import { PhasePlot } from "./charts";
import { AblatePanel } from "./Ablate";
import { CompareBox } from "./Compare";

/** Unit for clamp doses: the neuron's peak, floored so dead neurons still move. */
const scaleOf = (atlas: Atlas, r: NeuronRef) => Math.max(atlas.max[atlas.g(r)], 0.5);

export function Inspector({ atlas, r }: { atlas: Atlas; r: NeuronRef }) {
  const tab = useStore((s) => s.tab);
  const sweep = useStore((s) => s.sweep);
  const names = useStore((s) => s.names);
  const key = nid(r);
  const g = atlas.g(r);
  const ref = useRef<HTMLElement>(null);
  useBringIntoView(ref);

  return (
    <aside ref={ref} className="inspector" aria-label={`Neuron ${key}`}>
      <header className="insp-head">
        <div className="insp-id">
          <h2>
            Layer {r.layer}, neuron {r.neuron}
          </h2>
          <button className="icon" onClick={() => focusNeuron(null)} aria-label="Close neuron">
            ×
          </button>
        </div>
        {atlas.dead(r) ? (
          <p className="dead-note">This neuron barely turns on anywhere in the corpus (peak {atlas.max[g].toFixed(2)}). Steering it still works.</p>
        ) : (
          <p className="insp-auto">
            Peaks on <strong>{atlas.label(r)}</strong>
          </p>
        )}
        {sweep && <Uniqueness sweep={sweep} r={r} />}
        <input
          className="insp-name"
          value={names[key] ?? ""}
          placeholder="Name this neuron"
          aria-label="Your name for this neuron"
          maxLength={80}
          onChange={(e) => setState((s) => ({ names: { ...s.names, [key]: e.target.value } }))}
        />
        <dl className="stats">
          <div><dt>max</dt><dd>{atlas.max[g].toFixed(2)}</dd></div>
          <div><dt>fires on</dt><dd>{(atlas.density[g] * 100).toFixed(1)}% of tokens</dd></div>
          <div><dt>selectivity</dt><dd>{Math.round(atlas.share[g] * 100)}%</dd></div>
        </dl>
        <EditControls atlas={atlas} sweep={sweep} r={r} />
        <CompareBox atlas={atlas} sweep={sweep} r={r} />
      </header>
      <Seg<Tab>
        label="Neuron view"
        value={tab}
        onChange={(t) => setState({ tab: t })}
        options={[
          { v: "profile", label: "Profile" },
          { v: "contexts", label: "Contexts" },
          { v: "steer", label: "Steer" },
          { v: "ablate", label: "Ablate" },
        ]}
      />
      <div className="insp-body" tabIndex={0} role="region" aria-label="Neuron details">
        {tab === "profile" && <Profile atlas={atlas} sweep={sweep} r={r} />}
        {tab === "contexts" && <Contexts atlas={atlas} r={r} />}
        {tab === "steer" && <Studio atlas={atlas} sweep={sweep} r={r} />}
        {(tab === "ablate" || tab === "hunt") && <AblatePanel atlas={atlas} sweep={sweep} r={r} />}
      </div>
    </aside>
  );
}

// ---------------------------------------------------------------- uniqueness badge

function Uniqueness({ sweep, r }: { sweep: Sweep; r: NeuronRef }) {
  const st = useMemo(() => sweep.stats(r), [sweep, r]);
  const rank = useMemo(() => sweep.rankOf(r), [sweep, r]);
  const beatsAll = st.pct >= 1;
  return (
    <div className={`uniq${beatsAll ? " strong" : ""}`}>
      <p>
        {beatsAll ? "Steers more distinctly than every random direction in its layer" : `Steers more distinctly than ${Math.round(st.pct * 100)}% of random directions in its layer`}
        <span className="uniq-meta">z = {st.z.toFixed(1)}, ranked {rank.toLocaleString()} of {(sweep.meta.layers * sweep.meta.neurons).toLocaleString()}</span>
      </p>
      {st.themes.length > 0 && (
        <p className="themes">
          Pushing it writes{" "}
          {st.themes.map((w) => (
            <span key={w} className="theme">{w}</span>
          ))}
          {st.rw > 0 && <span className="rw" title="Its top contexts peak on the same word it writes when pushed">reads what it writes</span>}
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------- edit controls

type Mode = Edit["mode"] | "ablate";

const MODES: { v: Mode; label: string; title: string }[] = [
  { v: "ablate", label: "Zero", title: "Hold the neuron at zero" },
  { v: "scale", label: "Scale", title: "Multiply its activation" },
  { v: "add", label: "Push", title: "Push the residual stream along its output direction" },
  { v: "set", label: "Clamp", title: "Hold it at a multiple of its max activation" },
];

/** Run `f` once, when the sweep arrives after the component mounted (deep links can mount before it loads). */
function useSweepArrival(sweep: Sweep | null, f: () => void) {
  const had = useRef(!!sweep);
  useEffect(() => {
    if (sweep && !had.current) {
      had.current = true;
      f();
    }
  }, [sweep]); // eslint-disable-line react-hooks/exhaustive-deps
}

function EditControls({ atlas, sweep, r }: { atlas: Atlas; sweep: Sweep | null; r: NeuronRef }) {
  const edits = useStore((s) => s.edits);
  const existing = edits.find((e) => editKey(e) === editKey(r));
  const win = sweep ? sweep.window(r.layer) : 1;
  const [mode, setMode] = useState<Mode>("add");
  const [value, setValue] = useState(win);
  const [open, setOpen] = useState(!!existing);
  useSweepArrival(sweep, () => !existing && setValue(win));
  useEffect(() => {
    if (!existing) return;
    setOpen(true);
    const isAblate = existing.mode === "set" && existing.value === 0;
    setMode(isAblate ? "ablate" : existing.mode);
    if (!isAblate) setValue(existing.value);
  }, [existing]);

  const residUnits = mode === "add" && !!sweep && existing?.unit !== "max";
  const range = mode === "scale" ? { min: -4, max: 8, step: 0.25 } : residUnits ? { min: -2, max: 2, step: 0.05 } : { min: -20, max: 20, step: 0.5 };
  const label =
    mode === "scale" ? `×${value}` : residUnits ? `${value > 0 ? "+" : ""}${value.toFixed(2)} × resid` : `${value > 0 ? "+" : ""}${value} × max`;
  const apply = () => {
    if (mode === "ablate") upsertEdit({ layer: r.layer, neuron: r.neuron, mode: "set", value: 0, maxAct: scaleOf(atlas, r), unit: "max", enabled: true });
    else if (residUnits) upsertEdit(sweep!.doseEdit(r, value));
    else upsertEdit({ layer: r.layer, neuron: r.neuron, mode, value, maxAct: scaleOf(atlas, r), unit: "max", enabled: true });
  };

  return (
    <details className="edit-box" open={open} onToggle={(e) => setOpen(e.currentTarget.open)}>
      <summary>{existing ? "Edited in the live model" : "Edit the live model"}</summary>
      <p className="note">An edit stays on until you remove it. The probe, the map and every generation run with it.</p>
      <Seg
        label="Edit type"
        value={mode}
        onChange={(m) => {
          setMode(m);
          setValue(m === "scale" ? 3 : m === "set" ? 2 : win);
        }}
        options={MODES}
      />
      {mode !== "ablate" && (
        <label className="slider">
          <span className="sr-only">Edit strength</span>
          <input type="range" min={range.min} max={range.max} step={range.step} value={value} onChange={(e) => setValue(Number(e.target.value))} />
          <span>{label}</span>
        </label>
      )}
      {residUnits && <p className="note">Layer {r.layer}'s coherent window is {win.toFixed(2)} × the residual norm (calibrated on random directions).</p>}
      <div className="edit-actions">
        <button className="primary" onClick={apply}>
          {existing ? "Update edit" : "Apply edit"}
        </button>
        {existing && <button onClick={() => removeEdit(r)}>Remove edit</button>}
      </div>
    </details>
  );
}

// ---------------------------------------------------------------- profile

function Profile({ atlas, sweep, r }: { atlas: Atlas; sweep: Sweep | null; r: NeuronRef }) {
  const [lensKind, setLensKind] = useState<"steer" | "logit">(sweep ? "steer" : "logit");
  const lens = useMemo(() => atlas.lens(r), [atlas, r]);
  const sl = useMemo(() => (sweep ? sweep.steerLens(r) : null), [sweep, r]);
  const up = useMemo(() => atlas.links(r, "up"), [atlas, r]);
  const down = useMemo(() => atlas.links(r, "down"), [atlas, r]);
  const kind = sl ? lensKind : "logit";
  const pos = kind === "steer" ? sl!.up : lens.promotes;
  const neg = kind === "steer" ? sl!.down : lens.suppresses;
  const lmax = Math.max(...pos.map((x) => Math.abs(x.v)), ...neg.map((x) => Math.abs(x.v)), 1e-6);
  return (
    <>
      <section>
        <div className="section-head">
          <h3>{kind === "steer" ? "Pushing it up makes these next tokens likelier" : "When it fires, it pushes the next token toward"}</h3>
          {sl && (
            <Seg
              label="Lens"
              value={lensKind}
              onChange={setLensKind}
              options={[
                { v: "steer", label: "Steer lens", title: "Measured: change in next-token probability under a push, through the whole model" },
                { v: "logit", label: "Logit lens", title: "Direct path only: output weights read through the unembedding" },
              ]}
            />
          )}
        </div>
        <LensBars items={pos} atlas={atlas} max={lmax} color="var(--c-excite)" />
        <h3>{kind === "steer" ? "Pushing it down makes these likelier" : "and away from"}</h3>
        <LensBars items={neg} atlas={atlas} max={lmax} color="var(--c-inhibit)" />
        <p className="note">
          {kind === "steer"
            ? `Average change in next-token probability over 4 story contexts when the residual stream is pushed ±${sweep!.window(r.layer).toFixed(2)}× its norm along this neuron's output. KL: ${sl!.klUp.toFixed(2)} up, ${sl!.klDown.toFixed(2)} down.`
            : "Logit lens: the neuron's output weights read straight through the unembedding. It shows the direct effect only, not what later layers do with it."}
        </p>
      </section>
      <section>
        <h3>Activation distribution</h3>
        <Histogram bins={atlas.histogram(r)} />
        <p className="note">Positive activations over {atlas.meta.tokens.toLocaleString()} tokens of TinyStories, binned from 0 to max, log scale.</p>
      </section>
      <section>
        <h3>Reads from</h3>
        {up.length ? <LinkList atlas={atlas} links={up} /> : <p className="note">Layer 0 reads only from the embeddings and attention.</p>}
        <h3>Writes to</h3>
        {down.length ? <LinkList atlas={atlas} links={down} /> : <p className="note">Last layer: its output goes straight to the logits.</p>}
        <p className="note">Direct-path weights through the residual stream, scaled by the source neuron's peak. Gold excites, rose inhibits.</p>
      </section>
    </>
  );
}

function LensBars({ items, atlas, max, color }: { items: { id: number; v: number }[]; atlas: Atlas; max: number; color: string }) {
  return (
    <ul className="lens">
      {items.map((x, i) => (
        <li key={`${x.id}-${i}`}>
          <code>{showToken(atlas.tok.str(x.id))}</code>
          <span className="bar" style={{ width: `${(Math.abs(x.v) / max) * 100}%`, background: color }} />
          <span className="val">{x.v > 0 ? "+" : ""}{x.v.toFixed(2)}</span>
        </li>
      ))}
    </ul>
  );
}

function LinkList({ atlas, links }: { atlas: Atlas; links: { layer: number; neuron: number; w: number }[] }) {
  return (
    <ul className="links">
      {links.map((k) => (
        <li key={`${k.layer}:${k.neuron}`}>
          <NeuronButton r={k} atlas={atlas} extra={<span className="w" data-sign={k.w > 0 ? "up" : "down"}>{k.w > 0 ? "+" : ""}{k.w.toFixed(2)}</span>} />
        </li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------- contexts

function Contexts({ atlas, r }: { atlas: Atlas; r: NeuronRef }) {
  const ex = useMemo(() => atlas.examples(r), [atlas, r]);
  return (
    <section>
      <h3>Strongest contexts in the corpus</h3>
      <ol className="contexts">
        {ex.map((e, i) => (
          <li key={i}>
            <span className="act">{e.act.toFixed(2)}</span>
            <p>
              {e.tokens.map((t, j) =>
                t < 0 ? null : (
                  <Tok key={j} text={atlas.tok.str(t)} rel={e.acts[j]} active={j === e.center} title={`${(e.acts[j] * atlas.max[atlas.g(r)]).toFixed(2)}`} />
                ),
              )}
            </p>
            <button className="ghost" onClick={() => setState({ probeText: atlas.tok.decode(atlas.story(e.story).slice(0, e.pos + 8)) })}>
              Probe this story
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}

// ---------------------------------------------------------------- steering studio

/** A random unit direction in the residual stream, deterministic per (layer, seed). */
export function randomDirection(d: number, layer: number, seed: number): number[] {
  const rand = mulberry32(layer * 7919 + seed * 104729 + 1);
  const v: number[] = [];
  for (let i = 0; i < d; i += 2) {
    const u = Math.max(rand(), 1e-12), w = rand();
    const m = Math.sqrt(-2 * Math.log(u));
    v.push(m * Math.cos(2 * Math.PI * w), m * Math.sin(2 * Math.PI * w));
  }
  const out = v.slice(0, d);
  const n = Math.hypot(...out);
  return out.map((x) => x / n);
}

const COLS = ["Pushed down", "Unchanged", "Pushed up", "Random direction, same push"];

function Studio({ atlas, sweep, r }: { atlas: Atlas; sweep: Sweep | null; r: NeuronRef }) {
  const runtime = useStore((s) => s.runtime);
  const ready = useStore((s) => s.modelProgress >= 1);
  const globalEdits = useStore((s) => s.edits);
  const request = useStore((s) => s.steerRequest);
  const win = sweep ? sweep.window(r.layer) : 0;
  const [prompt, setPrompt] = useState(sweep?.meta.prompts[0] ?? "Once upon a time, there was a");
  const [dose, setDose] = useState(win || 6);
  useSweepArrival(sweep, () => setDose(win));
  const [sampled, setSampled] = useState(false);
  const [withControl, setWithControl] = useState(true);
  const [cols, setCols] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [seed, setSeed] = useState(7);
  const cancel = useRef<(() => void) | null>(null);

  useEffect(() => () => cancel.current?.(), []);
  useEffect(() => setCols([]), [r]);

  /** `replay` leaves out the user's saved edits so a recorded finding reruns exactly as recorded. */
  const run = async (p = prompt, d = dose, replay = false) => {
    if (!runtime) return;
    cancel.current?.();
    setErr(null);
    const base = replay ? [] : globalEdits.filter((e) => e.enabled !== false && editKey(e) !== editKey(r));
    const steer = (v: number): Edit =>
      sweep ? sweep.doseEdit(r, v) : { layer: r.layer, neuron: r.neuron, mode: "add", value: v, maxAct: scaleOf(atlas, r) };
    const variants: Edit[][] = [[...base, steer(-d)], base, [...base, steer(d)]];
    if (sweep && withControl) {
      const D = runtime.meta?.d_model ?? 256;
      const vec = randomDirection(D, r.layer, seed).map((x) => x * d * sweep.meta.resid_norm[r.layer]);
      variants.push([...base, { layer: r.layer, neuron: 0, mode: "dir", vec, value: 0, maxAct: 1 }]);
    }
    const toks: number[][] = variants.map(() => []);
    setCols(variants.map(() => ""));
    setRunning(true);
    const job = runtime.generate(
      { prompt: p, variants, maxTokens: 40, temperature: sampled ? 0.8 : 0, topP: 0.92, seed },
      (vi, t) => {
        toks[vi].push(t);
        setCols(toks.map((ts) => atlas.tok.decode(ts.filter((x) => x !== atlas.tok.eos))));
      },
    );
    cancel.current = job.cancel;
    try {
      await job.done;
    } catch (e) {
      setErr(String((e as Error).message ?? e));
    }
    setRunning(false);
  };

  // a finding's Replay button: load its prompt and dose, then run once the model is ready
  useEffect(() => {
    if (!request || request.layer !== r.layer || request.neuron !== r.neuron || !ready) return;
    const d = Math.min(2, Math.max(0.05, Math.abs(request.dose)));
    setPrompt(request.prompt);
    setDose(d);
    setSampled(false);
    setState({ steerRequest: null });
    run(request.prompt, d, true);
  }, [request, ready]); // eslint-disable-line react-hooks/exhaustive-deps

  const scatter = useMemo(() => (sweep ? sweep.layerScatter(r.layer) : null), [sweep, r.layer]);

  return (
    <section className="steer">
      <h3>Steer this neuron</h3>
      <p className="note">
        {sweep
          ? `Pushes the residual stream along the neuron's output direction at every position. Push size is a multiple of layer ${r.layer}'s median residual norm, the same unit for every neuron and random direction. Greedy decoding reproduces the sweep exactly.`
          : "Adds a multiple of the neuron's peak activation at every position."}
      </p>
      <label className="sr-only" htmlFor="studio-prompt">Prompt</label>
      <textarea id="studio-prompt" value={prompt} rows={2} maxLength={600} onChange={(e) => setPrompt(e.target.value)} />
      {sweep && (
        <div className="prompt-chips" aria-label="Sweep prompts">
          {sweep.meta.prompts.map((p) => (
            <button key={p} className={`chip${p === prompt ? " on" : ""}`} onClick={() => setPrompt(p)} title={p}>
              {p.length > 34 ? p.slice(0, 32) + "…" : p}
            </button>
          ))}
        </div>
      )}
      <div className="steer-controls">
        <label className="slider">
          <span>push</span>
          <input type="range" min={0.05} max={sweep ? 2 : 30} step={sweep ? 0.05 : 1} value={dose} onChange={(e) => setDose(Number(e.target.value))} />
          <span>±{sweep ? `${dose.toFixed(2)} × resid` : `${dose} × max`}</span>
        </label>
        {sweep && (
          <p className="note">
            Coherent window for layer {r.layer}: {win.toFixed(2)}.{" "}
            <button className="link-btn" onClick={() => setDose(win)}>Use it</button>
          </p>
        )}
        <div className="checks">
          <label className="check"><input type="checkbox" checked={sampled} onChange={(e) => setSampled(e.target.checked)} /> Sample (temperature 0.8)</label>
          {sweep && <label className="check"><input type="checkbox" checked={withControl} onChange={(e) => setWithControl(e.target.checked)} /> Compare with a random direction</label>}
        </div>
        <div className="edit-actions">
          <button className="primary" disabled={!ready || running || !prompt.trim()} onClick={() => run()}>
            {ready ? (running ? "Generating…" : "Generate") : "Model loading…"}
          </button>
          {running && <button onClick={() => cancel.current?.()}>Stop</button>}
          <button disabled={running} onClick={() => setSeed((s) => s + 1)} title="Pick a new random seed and random direction">
            New seed
          </button>
        </div>
        {err && <p className="err" role="alert">{err}</p>}
      </div>
      {cols.length > 0 && (
        <div className="steer-cols" aria-live="polite">
          {cols.map((c, i) => (
            <div key={i} className={`steer-col c${i}`}>
              <h4>{COLS[i]}</h4>
              <p>
                <span className="prompt-echo">{prompt}</span>
                {c}
              </p>
            </div>
          ))}
        </div>
      )}
      {sweep && scatter && (
        <PhasePlot nz={scatter.nz} ncoh={scatter.ncoh} cz={scatter.cz} ccoh={scatter.ccoh} focus={r.neuron} onPick={(n) => focusNeuron({ layer: r.layer, neuron: n }, getState().tab)} />
      )}
      {sweep && <SweepRollouts atlas={atlas} sweep={sweep} r={r} />}
    </section>
  );
}

function SweepRollouts({ atlas, sweep, r }: { atlas: Atlas; sweep: Sweep; r: NeuronRef }) {
  const rolls = useMemo(() => sweep.rollouts(r), [sweep, r]);
  const [pi, setPi] = useState(0);
  const prompts = sweep.meta.prompts;
  const shown = rolls.filter((x) => x.prompt === prompts[pi]);
  const base = sweep.baseline(pi);
  const themes = new Set(sweep.stats(r).themes);
  const render = (ids: number[]) => {
    const text = atlas.tok.decode(ids);
    return text.split(/(\b[a-zA-Z]+\b)/).map((part, i) =>
      themes.has(part.toLowerCase()) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>,
    );
  };
  return (
    <div className="sweep-rolls">
      <h3>Recorded in the sweep</h3>
      <Seg label="Sweep prompt" value={pi} onChange={setPi} options={prompts.map((p, i) => ({ v: i, label: `Prompt ${i + 1}`, title: p }))} />
      <p className="prompt-echo">{prompts[pi]}</p>
      <ul>
        <li>
          <span className="dose">0</span>
          <p>{render(base)}</p>
        </li>
        {shown.map((x, i) => (
          <li key={i}>
            <span className="dose">{x.dose > 0 ? "+" : ""}{x.dose.toFixed(2)}</span>
            <p>{render(x.ids)}</p>
          </li>
        ))}
      </ul>
      <p className="note">Greedy, 40 tokens. Highlighted words are this neuron's theme words: over-represented against the layer's 256 random directions.</p>
    </div>
  );
}
