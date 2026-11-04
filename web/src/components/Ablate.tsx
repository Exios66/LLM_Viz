// Live ablation (ADR-003): hold a neuron, its family or a chosen set at zero, score held-out stories with and without,
// and test whether the neuron's steering theme survives when its family is removed.

import { useEffect, useMemo, useRef, useState } from "react";
import { nid, type Atlas, type NeuronRef } from "../lib/atlas";
import type { Edit } from "../lib/model";
import type { Ablation } from "../lib/runtime";
import type { Sweep } from "../lib/sweep";
import { useStore } from "../store";
import { DATA } from "../App";
import { Seg, showToken } from "./bits";

interface Studies {
  families?: { groups: { members: string[]; words: string[] }[] };
  ablation?: { stories: number; units: { unit: string; d_nll: number; kl: number }[]; random_d_nll_p95: number | null };
}

let studiesP: Promise<Studies | null> | null = null;
export function loadStudies() {
  studiesP ??= fetch(`${DATA}/studies.json`).then((r) => (r.ok ? r.json() : null)).catch(() => null);
  return studiesP;
}
let textsP: Promise<string[]> | null = null;
function loadTexts() {
  textsP ??= fetch(`${DATA}/ablate_texts.json`)
    .then((r) => (r.ok ? r.json() : { texts: [] }))
    .then((j) => (Array.isArray(j?.texts) ? (j.texts as unknown[]).filter((t): t is string => typeof t === "string").slice(0, 6) : []))
    .catch(() => []);
  return textsP;
}

const parseUnit = (u: string): NeuronRef | null => {
  const m = /^L(\d+)N(\d+)$/.exec(u);
  return m ? { layer: Number(m[1]), neuron: Number(m[2]) } : null;
};

type Target = "one" | "family" | "set";

export function AblatePanel({ atlas, sweep, r }: { atlas: Atlas; sweep: Sweep | null; r: NeuronRef }) {
  const runtime = useStore((s) => s.runtime);
  const ready = useStore((s) => s.modelProgress) >= 1;
  const edits = useStore((s) => s.edits);
  const [studies, setStudies] = useState<Studies | null>(null);
  const [texts, setTexts] = useState<string[]>([]);
  const [target, setTarget] = useState<Target>("one");
  const [res, setRes] = useState<Ablation | null>(null);
  const [prog, setProg] = useState<[number, number] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const job = useRef<{ cancel: () => void } | null>(null);
  useEffect(() => {
    loadStudies().then(setStudies);
    loadTexts().then(setTexts);
    return () => job.current?.cancel();
  }, []);

  const family = useMemo(() => {
    const g = studies?.families?.groups.find((x) => x.members.includes(`L${r.layer}N${r.neuron}`));
    return g && g.members.length > 1 ? { refs: g.members.map(parseUnit).filter((x): x is NeuronRef => !!x), words: g.words } : null;
  }, [studies, r]);
  const userSet = useMemo(() => edits.filter((e) => e.mode === "set" && e.value === 0 && e.enabled !== false), [edits]);
  const refs: NeuronRef[] = target === "family" && family ? family.refs : target === "set" ? userSet : [r];
  const zero = (x: NeuronRef): Edit => ({ layer: x.layer, neuron: x.neuron, mode: "set", value: 0, maxAct: Math.max(atlas.max[atlas.g(x)], 0.5), unit: "max", enabled: true });
  const recorded = studies?.ablation?.units.find((u) => u.unit === `L${r.layer}N${r.neuron}`);
  const p95 = studies?.ablation?.random_d_nll_p95 ?? null;

  const run = () => {
    if (!runtime || !texts.length || !refs.length) return;
    job.current?.cancel();
    setRes(null);
    setErr(null);
    setProg([0, texts.length]);
    const j = runtime.ablate(texts, refs.map(zero), 48, (d, t) => setProg([d, t]));
    job.current = j;
    j.done.then(
      (a) => {
        setRes(a);
        setProg(null);
      },
      (e) => {
        if (String(e?.message) !== "cancelled") setErr(String(e?.message ?? e));
        setProg(null);
      },
    );
  };

  const options: { v: Target; label: string; title: string }[] = [
    { v: "one", label: "This neuron", title: `Zero ${nid(r)} only` },
    ...(family ? [{ v: "family" as const, label: `Its family (${family.refs.length})`, title: `Neurons that write similar themes: ${family.words.slice(0, 4).join(", ")}` }] : []),
    ...(userSet.length ? [{ v: "set" as const, label: `Your ablations (${userSet.length})`, title: "Every neuron you have set to ablate in the edit list" }] : []),
  ];

  return (
    <section className="ablate">
      <h3>Remove it and see what breaks</h3>
      <p className="note flush">
        Holds the chosen neurons at zero and scores {texts.length || "the"} held-out stories (48 tokens each) with and without. Positive change in loss means the
        model predicted the real next token worse.
      </p>
      {options.length > 1 && <Seg<Target> label="Neurons to remove" value={target} onChange={setTarget} options={options} />}
      <div className="edit-actions">
        <button className="primary" onClick={run} disabled={!ready || !texts.length || !!prog}>
          {prog ? `Scoring story ${prog[0]} of ${prog[1]}…` : `Ablate ${refs.length > 1 ? `${refs.length} neurons` : nid(refs[0] ?? r)}`}
        </button>
        {prog && (
          <button onClick={() => job.current?.cancel()}>Stop</button>
        )}
      </div>
      {!ready && <p className="note">The model is still loading.</p>}
      {err && <p className="err" role="alert">Ablation failed: {err}</p>}
      {res && (
        <div className="ablate-result" aria-live="polite">
          <dl className="stats">
            <div><dt>change in loss</dt><dd>{fmt(res.dNll)} nats/token</dd></div>
            <div><dt>KL</dt><dd>{res.kl.toExponential(2)}</dd></div>
            <div><dt>positions</dt><dd>{res.tokens.toLocaleString()}</dd></div>
          </dl>
          {p95 !== null && refs.length === 1 && (
            <p className="note">
              {Math.abs(res.dNll) > p95 ? "Larger" : "Smaller"} than the change from zeroing 95% of random neurons in the recorded study ({p95.toFixed(5)}), though that
              study used {studies?.ablation?.stories} longer stories.
            </p>
          )}
          <h4>Change in log-probability of each true token, first story</h4>
          <p className="heat-strip" aria-label="Per-token change">
            {res.strip.tokens.map((t, i) => (
              <span key={i} className="heat" style={{ background: heat(res.strip.delta[i]) }} title={`${fmt(res.strip.delta[i])}`}>
                {atlas.tok.str(t).replace(/\n/g, "↵")}
              </span>
            ))}
          </p>
          <p className="note flush">Amber: the model needed the removed neurons for this token. Blue: it predicts this token better without them.</p>
          <div className="lens-pair">
            <TokList title="Tokens it helped predict" items={res.hurt} atlas={atlas} />
            <TokList title="Tokens it held back" items={res.helped.filter(([, v]) => v < 0)} atlas={atlas} />
          </div>
        </div>
      )}
      {recorded && (
        <p className="note">
          Recorded study, {studies?.ablation?.stories} stories of up to 128 tokens: change in loss {fmt(recorded.d_nll)}, KL {recorded.kl.toExponential(1)}.{" "}
          <a href="#/research/ablation-and-circuits">Read the ablation report</a>
        </p>
      )}
      {sweep && family && <Survival atlas={atlas} sweep={sweep} r={r} family={family.refs.filter((x) => x.layer !== r.layer || x.neuron !== r.neuron)} zero={zero} />}
    </section>
  );
}

function Survival({ atlas, sweep, r, family, zero }: { atlas: Atlas; sweep: Sweep; r: NeuronRef; family: NeuronRef[]; zero: (x: NeuronRef) => Edit }) {
  const runtime = useStore((s) => s.runtime);
  const ready = useStore((s) => s.modelProgress) >= 1;
  const [out, setOut] = useState<string[] | null>(null);
  const [busy, setBusy] = useState(false);
  const themes = sweep.stats(r).themes;
  const prompt = sweep.meta.prompts[0];
  const test = () => {
    if (!runtime) return;
    setBusy(true);
    const push = sweep.doseEdit(r, sweep.window(r.layer));
    const toks: number[][] = [[], []];
    const j = runtime.generate({ prompt, variants: [[push], [push, ...family.map(zero)]], maxTokens: 40, temperature: 0, topP: 1, seed: 1 }, (v, t) => toks[v].push(t));
    j.done.then(() => {
      setOut(toks.map((ts) => atlas.tok.decode(ts.filter((x) => x !== atlas.tok.eos))));
      setBusy(false);
    }, () => setBusy(false));
  };
  const has = (t: string) => themes.filter((w) => new RegExp(`\\b${w}\\b`, "i").test(t));
  return (
    <div className="survival">
      <h3>Does the theme survive without its family?</h3>
      <p className="note flush">
        Pushes {nid(r)} by one window on the first sweep prompt, once as is and once with the other {family.length} family members zeroed. Theme words:{" "}
        {themes.slice(0, 5).join(", ")}.
      </p>
      <button onClick={test} disabled={!ready || busy}>{busy ? "Writing…" : "Run the test"}</button>
      {out && (
        <div className="steer-cols">
          {out.map((t, i) => (
            <div key={i} className={`steer-col ${i === 0 ? "c2" : "c4"}`}>
              <h4>{i === 0 ? "Pushed" : "Pushed, family zeroed"}: {has(t).length ? `theme words ${has(t).join(", ")}` : "no theme words"}</h4>
              <p>{t}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TokList({ title, items, atlas }: { title: string; items: [number, number][]; atlas: Atlas }) {
  if (!items.length) return null;
  return (
    <div>
      <h4>{title}</h4>
      <ul className="tok-list">
        {items.map(([id, v]) => (
          <li key={id}>
            <code>{showToken(atlas.tok.str(id))}</code> <span>{fmt(v)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const fmt = (x: number) => `${x >= 0 ? "+" : ""}${x.toFixed(Math.abs(x) < 0.01 ? 5 : 3)}`;

/** Diverging fill: amber when the edit hurt the true token, blue when it helped, transparent near zero. */
function heat(d: number) {
  const a = Math.min(1, Math.abs(d) / 0.5) * 0.55;
  if (a < 0.03) return "transparent";
  return d > 0 ? `color-mix(in srgb, var(--excite) ${Math.round(a * 100)}%, transparent)` : `color-mix(in srgb, var(--inhibit) ${Math.round(a * 100)}%, transparent)`;
}
