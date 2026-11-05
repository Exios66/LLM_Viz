import { useEffect, useMemo, useRef, useState } from "react";
import type { Atlas, NeuronRef } from "../lib/atlas";
import { getState, setState, useStore } from "../store";
import { NeuronButton, Tok, showToken } from "./bits";

const PROBE_MAX = 160;

export function Probe({ atlas }: { atlas: Atlas }) {
  const runtime = useStore((s) => s.runtime);
  const ready = useStore((s) => s.modelProgress >= 1);
  const text = useStore((s) => s.probeText);
  const edits = useStore((s) => s.edits);
  const analysis = useStore((s) => s.analysis);
  const probePos = useStore((s) => s.probePos);
  const focus = useStore((s) => s.focus);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const seq = useRef(0);
  const chain = useRef<Promise<void>>(Promise.resolve());

  // re-run the probe whenever the text or the edits change
  useEffect(() => {
    if (!ready || !runtime) return;
    const my = ++seq.current;
    // one analysis at a time: a request that went stale while waiting is skipped, not queued in the worker
    const run = async () => {
      if (my !== seq.current) return;
      setBusy(true);
      try {
        const a = await runtime.analyze(text, edits, PROBE_MAX);
        if (my !== seq.current) return;
        setErr(null);
        const pos = getState().probePos;
        setState({ analysis: a, probePos: pos !== null && pos < a.tokens.length ? pos : null });
      } catch (e) {
        if (my === seq.current) setErr(String((e as Error)?.message ?? e));
      } finally {
        if (my === seq.current) setBusy(false);
      }
    };
    const t = setTimeout(() => {
      chain.current = chain.current.then(run);
    }, 250);
    return () => clearTimeout(t);
  }, [text, edits, ready, runtime]);

  const total = atlas.L * atlas.N;
  const T = analysis?.tokens.length ?? 0;
  const pos = probePos ?? (T ? T - 1 : null);

  const focusRel = useMemo(() => {
    if (!analysis || !focus) return null;
    const g = atlas.g(focus);
    return analysis.tokens.map((_, t) => analysis.acts[t * total + g] / Math.max(atlas.max[g], 0.25));
  }, [analysis, focus, atlas, total]);

  const topHere = useMemo(() => {
    if (!analysis || pos === null) return [];
    const base = pos * total;
    const out: (NeuronRef & { rel: number })[] = [];
    for (let g = 0; g < total; g++) {
      const rel = analysis.acts[base + g] / Math.max(atlas.max[g], 0.25);
      if (rel > 0.5) out.push({ ...atlas.ref(g), rel });
    }
    return out.sort((a, b) => b.rel - a.rel).slice(0, 14);
  }, [analysis, pos, atlas, total]);

  const selectTok = (t: number) => {
    setState({ probePos: probePos === t ? null : t, colorMode: "probe" });
  };

  return (
    <section className="probe" aria-label="Probe">
      <div className="probe-input">
        <label htmlFor="probe-text">Write any text and watch which neurons light up</label>
        <textarea id="probe-text" rows={3} value={text} spellCheck={false} maxLength={4000} onChange={(e) => setState({ probeText: e.target.value })} />
        <div className="probe-status">
          {err ? (
            <span className="err" role="alert">The probe failed: {err}</span>
          ) : !ready ? (
            "Loading the model…"
          ) : busy ? (
            "Running…"
          ) : T ? (
            `${T} tokens${T >= PROBE_MAX ? ` (only the first ${PROBE_MAX} are probed)` : ""}. Click one to light the map at that position.`
          ) : text.trim() ? (
            ""
          ) : (
            "Type something to probe."
          )}
        </div>
      </div>
      <div className="probe-tokens" role="group" aria-label="Tokens">
        {analysis?.tokens.map((id, t) => (
          <Tok
            key={t}
            text={atlas.tok.str(id)}
            rel={focusRel ? focusRel[t] : undefined}
            active={probePos === t}
            onClick={() => selectTok(t)}
            title={focusRel ? `activation ${(focusRel[t] * atlas.max[atlas.g(focus!)]).toFixed(2)}` : "Show activations at this token"}
          />
        ))}
        {focus && analysis && <p className="note">Shaded by {`L${focus.layer}·N${focus.neuron}`}'s activation.</p>}
      </div>
      {analysis && pos !== null && (
        <div className="probe-detail">
          <div>
            <h3>
              Strongest neurons at the token <code className="tokq">{showToken(atlas.tok.str(analysis.tokens[pos]))}</code>
            </h3>
            {topHere.length ? (
              <ul className="links">
                {topHere.map((n) => (
                  <li key={`${n.layer}:${n.neuron}`}>
                    <NeuronButton r={n} atlas={atlas} extra={<span className="w">{Math.round(n.rel * 100)}%</span>} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="note">No neuron is above half its peak here.</p>
            )}
          </div>
          <Predictions atlas={atlas} pos={pos} />
        </div>
      )}
      {ready && <Continue atlas={atlas} />}
    </section>
  );
}

function Predictions({ atlas, pos }: { atlas: Atlas; pos: number }) {
  const a = useStore((s) => s.analysis)!;
  const p = a.preds[pos];
  const b = a.basePreds?.[pos];
  return (
    <div>
      <h3>Predicted next token{b ? " with your edits" : ""}</h3>
      <ul className="preds">
        {p.ids.map((id, i) => (
          <li key={id}>
            <code>{showToken(atlas.tok.str(id))}</code>
            <span className="bar" style={{ width: `${p.probs[i] * 100}%` }} />
            <span className="val">{(p.probs[i] * 100).toFixed(1)}%</span>
          </li>
        ))}
      </ul>
      {b && (
        <>
          <h3>Without edits</h3>
          <ul className="preds base">
            {b.ids.map((id, i) => (
              <li key={id}>
                <code>{showToken(atlas.tok.str(id))}</code>
                <span className="bar" style={{ width: `${b.probs[i] * 100}%` }} />
                <span className="val">{(b.probs[i] * 100).toFixed(1)}%</span>
              </li>
            ))}
          </ul>
          <p className="note">KL divergence from the unedited model here: {a.klDiv![pos].toFixed(3)} nats</p>
        </>
      )}
    </div>
  );
}

function Continue({ atlas }: { atlas: Atlas }) {
  const runtime = useStore((s) => s.runtime)!;
  const text = useStore((s) => s.probeText);
  const edits = useStore((s) => s.edits);
  const active = edits.filter((e) => e.enabled !== false);
  const [out, setOut] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const cancel = useRef<(() => void) | null>(null);
  useEffect(() => () => cancel.current?.(), []);

  const go = async () => {
    cancel.current?.();
    setErr(null);
    const variants = active.length ? [[], active] : [[]];
    const toks: number[][] = variants.map(() => []);
    setOut(variants.map(() => ""));
    setRunning(true);
    const job = runtime.generate({ prompt: text, variants, maxTokens: 60, temperature: 0.7, topP: 0.92, seed: Date.now() % 1e6 }, (vi, t) => {
      toks[vi].push(t);
      setOut(toks.map((ts) => atlas.tok.decode(ts.filter((x) => x !== atlas.tok.eos))));
    });
    cancel.current = job.cancel;
    try {
      await job.done;
    } catch (e) {
      setErr(String((e as Error)?.message ?? e));
    }
    setRunning(false);
  };

  return (
    <div className="continue">
      <button className="primary" onClick={go} disabled={running || !text.trim()}>
        {running ? "Writing…" : active.length ? "Continue the text, with and without edits" : "Continue the text"}
      </button>
      {err && <p className="err" role="alert">The model could not continue the text: {err}</p>}
      {out.length > 0 && (
        <div className={`continue-cols n${out.length}`}>
          {out.map((o, i) => (
            <div key={i}>
              <h4>{out.length === 1 ? "Continuation" : i === 0 ? "Original model" : `With ${active.length} edit${active.length > 1 ? "s" : ""}`}</h4>
              <p>{o}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
