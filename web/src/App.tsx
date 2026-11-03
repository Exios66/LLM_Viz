import { useEffect } from "react";
import { Atlas, nid } from "./lib/atlas";
import { Runtime } from "./lib/runtime";
import { setState, useStore } from "./store";
import { MapView } from "./components/MapView";
import { Inspector } from "./components/Inspector";
import { Probe } from "./components/Probe";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { showToken } from "./components/bits";

const DATA = new URL(`${import.meta.env.BASE_URL}data`, window.location.href).href.replace(/\/$/, "");

let booted = false;
function boot() {
  if (booted) return;
  booted = true;
  Atlas.load(DATA, (f) => setState({ atlasProgress: f }))
    .then((a) => setState({ atlas: a }))
    .catch((e) => setState({ modelError: String(e) }));
  const rt = new Runtime();
  setState({ runtime: rt });
  rt.init(DATA, (l, t) => setState({ modelProgress: t ? Math.min(0.99, l / t) : 0 }))
    .then(() => setState({ modelProgress: 1 }))
    .catch((e) => setState({ modelError: String(e?.message ?? e) }));
}

export function App() {
  const atlas = useStore((s) => s.atlas);
  const progress = useStore((s) => s.atlasProgress);
  const focus = useStore((s) => s.focus);
  const err = useStore((s) => s.modelError);

  useEffect(boot, []);

  if (!atlas) {
    return (
      <div className="boot">
        <h1>Neuron Atlas</h1>
        <p>{err ? `The atlas failed to load: ${err}` : `Loading the atlas: ${Math.round(progress * 100)}%`}</p>
      </div>
    );
  }

  return (
    <div className={`app${focus ? " has-focus" : ""}`}>
      <Header atlas={atlas} />
      <Sidebar atlas={atlas} />
      <main className="stage">
        <div className="map-wrap">
          <MapView atlas={atlas} />
          <HoverCard atlas={atlas} />
          {!focus && <Intro />}
        </div>
        <Probe atlas={atlas} />
      </main>
      {focus && <Inspector key={nid(focus)} atlas={atlas} r={focus} />}
    </div>
  );
}

function HoverCard({ atlas }: { atlas: Atlas }) {
  const hover = useStore((s) => s.hover);
  const names = useStore((s) => s.names);
  if (!hover) return null;
  const lens = atlas.lens(hover);
  return (
    <div className="hover-card" aria-live="polite">
      <strong>{nid(hover)}</strong>
      <span>{names[nid(hover)] || `peaks on ${atlas.label(hover)}`}</span>
      <span className="lens-inline">
        predicts{" "}
        {lens.promotes.slice(0, 4).map((x) => (
          <code key={x.id}>{showToken(atlas.tok.str(x.id))}</code>
        ))}
      </span>
    </div>
  );
}

function Intro() {
  return (
    <div className="intro">
      <p>
        Each point is one neuron in the model's feed-forward layers, stacked from layer 0 at the bottom to layer 7 at the top. Neurons that write
        similar directions sit close together. Bright points respond to one specific thing.
      </p>
      <p>Drag to orbit. Click a neuron to see what it responds to, then ablate or steer it and watch the model's writing change.</p>
    </div>
  );
}
