import type { Atlas } from "../lib/atlas";
import { focusNeuron, removeEdit, setState, toggleEdit, useStore, type ColorMode } from "../store";
import { Seg } from "./bits";

function describe(e: { mode: string; value: number }) {
  if (e.mode === "set" && e.value === 0) return "ablated";
  if (e.mode === "set") return `clamped ${e.value}×`;
  if (e.mode === "scale") return `×${e.value}`;
  return `${e.value > 0 ? "+" : ""}${e.value}× max`;
}

export function Header({ atlas }: { atlas: Atlas }) {
  const edits = useStore((s) => s.edits);
  const colorMode = useStore((s) => s.colorMode);
  const showWeb = useStore((s) => s.showWeb);
  const progress = useStore((s) => s.modelProgress);
  const err = useStore((s) => s.modelError);

  return (
    <header className="top">
      <div className="brand">
        <h1>Neuron Atlas</h1>
        <p>
          {atlas.L * atlas.N} MLP neurons of TinyStories-8M, running in your browser.{" "}
          {err ? <span className="err">The model failed to load: {err}</span> : progress < 1 ? <span className="loading">Loading weights {Math.round(progress * 100)}%</span> : null}
        </p>
      </div>
      <div className="controls">
        <Seg<ColorMode>
          label="Colour neurons by"
          value={colorMode}
          onChange={(v) => setState({ colorMode: v })}
          options={[
            { v: "selectivity", label: "Selectivity", title: "How concentrated each neuron's top contexts are on one token" },
            { v: "density", label: "Firing rate", title: "Share of tokens where the neuron is positive" },
            { v: "probe", label: "Your text", title: "Activations on the text in the probe" },
          ]}
        />
        <label className="check">
          <input type="checkbox" checked={showWeb} onChange={(e) => setState({ showWeb: e.target.checked })} />
          Connections
        </label>
      </div>
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
