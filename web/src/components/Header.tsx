import type { Atlas } from "../lib/atlas";
import { formatRoute, type View } from "../lib/route";
import { focusNeuron, removeEdit, setState, toggleEdit, useStore, type ColorMode, type LayoutMode } from "../store";
import { Seg } from "./bits";

function describe(e: { mode: string; value: number; unit?: string }) {
  if (e.mode === "set" && e.value === 0) return "ablated";
  if (e.mode === "set") return `clamped ${e.value}×`;
  if (e.mode === "scale") return `×${e.value}`;
  const v = `${e.value > 0 ? "+" : ""}${+e.value.toFixed(2)}`;
  return e.unit === "resid" ? `push ${v}× resid` : `${v}× max`;
}

const NAV: { v: View; label: string }[] = [
  { v: "atlas", label: "Atlas" },
  { v: "findings", label: "Findings" },
  { v: "method", label: "Method" },
];

export function Header({ atlas }: { atlas: Atlas }) {
  const edits = useStore((s) => s.edits);
  const colorMode = useStore((s) => s.colorMode);
  const layoutMode = useStore((s) => s.layoutMode);
  const showWeb = useStore((s) => s.showWeb);
  const progress = useStore((s) => s.modelProgress);
  const err = useStore((s) => s.modelError);
  const view = useStore((s) => s.view);
  const focus = useStore((s) => s.focus);
  const tab = useStore((s) => s.tab);
  const sweep = useStore((s) => s.sweep);
  const sweepError = useStore((s) => s.sweepError);
  const webglError = useStore((s) => s.webglError);

  const href = (v: View) => (v === "atlas" ? formatRoute({ view: "atlas", focus, tab, card: null }) : formatRoute({ view: v, focus: null, tab: null, card: null }));

  return (
    <header className="top">
      <div className="brand">
        <h1>
          <a href="#/atlas" onClick={() => focusNeuron(null)}>
            Neuron Atlas
          </a>
        </h1>
        <p>
          {(atlas.L * atlas.N).toLocaleString()} MLP neurons of TinyStories-8M, running in your browser.{" "}
          {err ? (
            <span className="err" role="alert">
              The model failed to load: {err}
            </span>
          ) : progress < 1 ? (
            <span className="loading">Loading weights {Math.round(progress * 100)}%</span>
          ) : null}
          {sweepError && <span className="warn"> Steering results unavailable ({sweepError}).</span>}
        </p>
      </div>
      <nav className="nav" aria-label="Sections">
        {NAV.map((n) => (
          <a key={n.v} href={href(n.v)} aria-current={view === n.v ? "page" : undefined} className={view === n.v ? "on" : ""}>
            {n.label}
          </a>
        ))}
      </nav>
      {view === "atlas" && (
        <div className="controls">
          <Seg<ColorMode>
            label="Colour neurons by"
            value={colorMode}
            onChange={(v) => setState({ colorMode: v })}
            options={[
              ...(sweep ? [{ v: "uniqueness" as const, label: "Uniqueness", title: "How far steering the neuron beats random directions of the same size" }] : []),
              { v: "selectivity", label: "Selectivity", title: "How concentrated each neuron's top contexts are on one token" },
              { v: "density", label: "Firing rate", title: "Share of tokens where the neuron is positive" },
              { v: "probe", label: "Your text", title: "Activations on the text in the probe" },
            ]}
          />
          {sweep && !webglError && (
            <Seg<LayoutMode>
              label="Arrange neurons by"
              value={layoutMode}
              onChange={(v) => setState({ layoutMode: v })}
              options={[
                { v: "writes", label: "Writes", title: "Neurons whose output directions are similar sit together" },
                { v: "cofire", label: "Co-firing", title: "Neurons that fire on the same tokens sit together" },
              ]}
            />
          )}
          <label className="check">
            <input type="checkbox" checked={showWeb} onChange={(e) => setState({ showWeb: e.target.checked })} />
            Connections
          </label>
        </div>
      )}
      <div className="edits" aria-label="Active edits">
        {edits.length === 0 ? (
          <span className="note">No edits yet. Open a neuron to ablate, scale or steer it.</span>
        ) : (
          <>
            {edits.map((e) => (
              <span key={`${e.layer}:${e.neuron}`} className={`edit-chip${e.enabled === false ? " off" : ""}`}>
                <input type="checkbox" checked={e.enabled !== false} onChange={() => toggleEdit(e)} aria-label={`Enable edit on L${e.layer} N${e.neuron}`} />
                <button className="link" onClick={() => focusNeuron({ layer: e.layer, neuron: e.neuron })}>
                  L{e.layer}·N{e.neuron}
                </button>
                <span>{describe(e)}</span>
                <button className="icon" onClick={() => removeEdit(e)} aria-label={`Remove edit on L${e.layer} N${e.neuron}`}>
                  ×
                </button>
              </span>
            ))}
            <button className="ghost" onClick={() => setState({ edits: [] })}>
              Clear all
            </button>
          </>
        )}
      </div>
    </header>
  );
}
