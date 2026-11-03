import { useEffect, useMemo, useRef, useState } from "react";
import { nid, type Atlas, type NeuronRef } from "../lib/atlas";
import type { Edit } from "../lib/model";
import { GOLD, ROSE } from "../lib/colors";
import { editKey, focusNeuron, removeEdit, setState, upsertEdit, useStore } from "../store";
import { Histogram, NeuronButton, Seg, Tok, showToken } from "./bits";

type Tab = "profile" | "contexts" | "steer";

/** Unit for steer/clamp doses: the neuron's peak, floored so dead neurons still move. */
const scaleOf = (atlas: Atlas, r: NeuronRef) => Math.max(atlas.max[atlas.g(r)], 0.5);

export function Inspector({ atlas, r }: { atlas: Atlas; r: NeuronRef }) {
  const [tab, setTab] = useState<Tab>("profile");
  const names = useStore((s) => s.names);
  const key = nid(r);
  const g = atlas.g(r);

  return (
    <aside className="inspector" aria-label={`Neuron ${key}`}>
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
        <input
          className="insp-name"
          value={names[key] ?? ""}
          placeholder="Name this neuron"
          aria-label="Your name for this neuron"
          onChange={(e) => setState((s) => ({ names: { ...s.names, [key]: e.target.value } }))}
        />
        <dl className="stats">
          <div><dt>max</dt><dd>{atlas.max[g].toFixed(2)}</dd></div>
          <div><dt>fires on</dt><dd>{(atlas.density[g] * 100).toFixed(1)}% of tokens</dd></div>
          <div><dt>selectivity</dt><dd>{Math.round(atlas.share[g] * 100)}%</dd></div>
        </dl>
        <EditControls atlas={atlas} r={r} />
      </header>
      <Seg<Tab>
        label="Neuron view"
        value={tab}
        onChange={setTab}
        options={[
          { v: "profile", label: "Profile" },
          { v: "contexts", label: "Contexts" },
          { v: "steer", label: "Steer" },
        ]}
      />
      <div className="insp-body">
        {tab === "profile" && <Profile atlas={atlas} r={r} />}
        {tab === "contexts" && <Contexts atlas={atlas} r={r} />}
        {tab === "steer" && <SteerLab atlas={atlas} r={r} />}
      </div>
    </aside>
  );
}

// ---------------------------------------------------------------- edit controls

const MODES: { v: Edit["mode"] | "ablate"; label: string; title: string }[] = [
  { v: "ablate", label: "Ablate", title: "Hold the neuron at zero" },
  { v: "scale", label: "Scale", title: "Multiply its activation" },
  { v: "add", label: "Steer", title: "Add a multiple of its max activation" },
  { v: "set", label: "Clamp", title: "Hold it at a multiple of its max activation" },
];

function EditControls({ atlas, r }: { atlas: Atlas; r: NeuronRef }) {
  const edits = useStore((s) => s.edits);
  const existing = edits.find((e) => editKey(e) === editKey(r));
  const [mode, setMode] = useState<Edit["mode"] | "ablate">("add");
  const [value, setValue] = useState(6);
  useEffect(() => {
    if (existing) {
      const isAblate = existing.mode === "set" && existing.value === 0;
      setMode(isAblate ? "ablate" : existing.mode);
      if (!isAblate) setValue(existing.value);
    }
  }, [existing]);

  const range = mode === "scale" ? { min: -4, max: 8, step: 0.25 } : { min: -20, max: 20, step: 0.5 };
  const apply = () =>
    upsertEdit({
      layer: r.layer,
      neuron: r.neuron,
      mode: mode === "ablate" ? "set" : mode,
      value: mode === "ablate" ? 0 : value,
      maxAct: scaleOf(atlas, r),
      enabled: true,
    });

  return (
    <div className="edit-box">
      <Seg label="Edit type" value={mode} onChange={(m) => { setMode(m); if (m === "scale") setValue(3); if (m === "add" || m === "set") setValue(6); }} options={MODES} />
      {mode !== "ablate" && (
        <label className="slider">
          <input type="range" min={range.min} max={range.max} step={range.step} value={value} onChange={(e) => setValue(Number(e.target.value))} />
          <span>{mode === "scale" ? `×${value}` : `${value > 0 ? "+" : ""}${value} × max`}</span>
        </label>
      )}
      <div className="edit-actions">
        <button className="primary" onClick={apply}>
          {existing ? "Update edit" : "Apply edit"}
        </button>
        {existing && <button onClick={() => removeEdit(r)}>Remove edit</button>}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- profile

function Profile({ atlas, r }: { atlas: Atlas; r: NeuronRef }) {
  const lens = useMemo(() => atlas.lens(r), [atlas, r]);
  const up = useMemo(() => atlas.links(r, "up"), [atlas, r]);
  const down = useMemo(() => atlas.links(r, "down"), [atlas, r]);
  const lmax = Math.max(...lens.promotes.map((x) => Math.abs(x.v)), ...lens.suppresses.map((x) => Math.abs(x.v)));
  return (
    <>
      <section>
        <h3>When it fires, it pushes the next token toward</h3>
        <LensBars items={lens.promotes} atlas={atlas} max={lmax} color={GOLD} />
        <h3>and away from</h3>
        <LensBars items={lens.suppresses} atlas={atlas} max={lmax} color={ROSE} />
        <p className="note">Logit lens: the neuron's output weights read straight through the unembedding. It shows the direct effect only, not what later layers do with it.</p>
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
      {items.map((x) => (
        <li key={x.id}>
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
          <NeuronButton r={k} atlas={atlas} extra={<span className="w" style={{ color: k.w > 0 ? GOLD : ROSE }}>{k.w > 0 ? "+" : ""}{k.w.toFixed(2)}</span>} />
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

// ---------------------------------------------------------------- steering lab

function SteerLab({ atlas, r }: { atlas: Atlas; r: NeuronRef }) {
  const runtime = useStore((s) => s.runtime);
  const ready = useStore((s) => s.modelProgress >= 1);
  const globalEdits = useStore((s) => s.edits);
  const [prompt, setPrompt] = useState("Once upon a time, there was a");
  const [dose, setDose] = useState(8);
  const [temp, setTemp] = useState(0.7);
  const [cols, setCols] = useState<string[]>(["", "", ""]);
  const [running, setRunning] = useState(false);
  const cancel = useRef<(() => void) | null>(null);
  const [seed, setSeed] = useState(7);

  useEffect(() => () => cancel.current?.(), []);
  useEffect(() => setCols(["", "", ""]), [r]);

  const run = async () => {
    if (!runtime) return;
    cancel.current?.();
    const base = globalEdits.filter((e) => e.enabled !== false && editKey(e) !== editKey(r));
    const steer = (v: number): Edit => ({ layer: r.layer, neuron: r.neuron, mode: "add", value: v, maxAct: scaleOf(atlas, r) });
    const toks: number[][] = [[], [], []];
    setCols(["", "", ""]);
    setRunning(true);
    const job = runtime.generate(
      { prompt, variants: [[...base, steer(-dose)], base, [...base, steer(dose)]], maxTokens: 48, temperature: temp, topP: 0.92, seed },
      (vi, t) => {
        toks[vi].push(t);
        setCols(toks.map((ts) => atlas.tok.decode(ts.filter((x) => x !== atlas.tok.eos))));
      },
    );
    cancel.current = job.cancel;
    await job.done.catch(() => undefined);
    setRunning(false);
  };

  return (
    <section className="steer">
      <h3>Steer generation with this neuron</h3>
      <p className="note">Adds a multiple of the neuron's peak activation at every position, then samples three continuations with the same seed.</p>
      <textarea value={prompt} rows={2} onChange={(e) => setPrompt(e.target.value)} aria-label="Prompt" />
      <div className="steer-controls">
        <label className="slider">
          <span>dose</span>
          <input type="range" min={1} max={30} step={1} value={dose} onChange={(e) => setDose(Number(e.target.value))} />
          <span>±{dose} × max</span>
        </label>
        <label className="slider">
          <span>temperature</span>
          <input type="range" min={0} max={1.5} step={0.05} value={temp} onChange={(e) => setTemp(Number(e.target.value))} />
          <span>{temp.toFixed(2)}</span>
        </label>
        <div className="edit-actions">
          <button className="primary" disabled={!ready || running} onClick={run}>
            {ready ? (running ? "Generating…" : "Generate") : "Model loading…"}
          </button>
          <button disabled={running} onClick={() => setSeed((s) => s + 1)} title="Pick a new random seed">
            New seed
          </button>
        </div>
      </div>
      <div className="steer-cols">
        {["Pushed down", "Unchanged", "Pushed up"].map((h, i) => (
          <div key={h} className={`steer-col c${i}`}>
            <h4>{h}</h4>
            <p>
              <span className="prompt-echo">{prompt}</span>
              {cols[i]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
