import { useEffect, useState } from "react";
import { Atlas, nid } from "./lib/atlas";
import { Runtime } from "./lib/runtime";
import { Sweep } from "./lib/sweep";
import { formatRoute, parseRoute } from "./lib/route";
import { getState, setState, subscribe, useStore, type State } from "./store";
import { MapView } from "./components/MapView";
import { Inspector } from "./components/Inspector";
import { Probe } from "./components/Probe";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { FindingsPage } from "./components/Findings";
import { MethodPage } from "./components/Method";
import { showToken } from "./components/bits";

const DATA = new URL(`${import.meta.env.BASE_URL}data`, window.location.href).href.replace(/\/$/, "");

let booted = false;
function boot() {
  if (booted) return;
  booted = true;
  Atlas.load(DATA, (f) => setState({ atlasProgress: f }))
    .then((a) => setState({ atlas: a }))
    .catch((e) => setState({ atlasError: String(e?.message ?? e) }));
  Sweep.load(DATA)
    .then((sw) => setState({ sweep: sw }))
    .catch((e) => setState({ sweepError: String(e?.message ?? e), colorMode: "selectivity" }));
  const rt = new Runtime();
  rt.onCrash = (msg) => setState({ modelError: msg, modelProgress: 0 });
  setState({ runtime: rt });
  rt.init(DATA, (l, t) => setState({ modelProgress: t ? Math.min(0.99, l / t) : 0 }))
    .then(() => setState({ modelProgress: 1, modelError: null }))
    .catch((e) => setState({ modelError: String(e?.message ?? e) }));
}

/** Keep the URL hash and the store in step, in both directions. */
function useRouting(atlas: Atlas | null) {
  useEffect(() => {
    if (!atlas) return;
    const limits = { layers: atlas.L, neurons: atlas.N };
    const apply = () => {
      const hash = window.location.hash;
      const r = parseRoute(hash, limits);
      const asked = /^#\/?atlas\/[^/?]+\/[^/?]+/i.test(hash);
      const s = getState();
      setState({
        view: r.view,
        focus: r.focus && s.focus && r.focus.layer === s.focus.layer && r.focus.neuron === s.focus.neuron ? s.focus : r.focus,
        tab: r.tab ?? (r.focus ? s.tab : "profile"),
        card: r.card,
        notice: asked && !r.focus ? `There is no neuron at “${decodeURIComponent(hash.slice(1))}”. This model has layers 0–${atlas.L - 1} and neurons 0–${atlas.N - 1}.` : null,
      });
      const canon = formatRoute({ view: r.view, focus: r.focus, tab: r.tab, card: r.card });
      if (canon !== hash && !(canon === "#/atlas" && hash === "")) history.replaceState(null, "", canon);
    };
    apply();
    window.addEventListener("hashchange", apply);
    let last: State = getState();
    const unsub = subscribe(() => {
      const s = getState();
      if (s.view !== last.view || s.focus !== last.focus || s.tab !== last.tab || s.card !== last.card) {
        const next = formatRoute({ view: s.view, focus: s.focus, tab: s.tab, card: s.card });
        const cur = window.location.hash || "#/atlas";
        if (next !== cur) {
          // a new neuron or page is a history entry; switching tabs is not
          const sameTarget = s.view === last.view && s.focus === last.focus && s.card === last.card;
          if (sameTarget) history.replaceState(null, "", next);
          else history.pushState(null, "", next);
        }
      }
      last = s;
    });
    return () => {
      window.removeEventListener("hashchange", apply);
      unsub();
    };
  }, [atlas]);
}

export function App() {
  const atlas = useStore((s) => s.atlas);
  const progress = useStore((s) => s.atlasProgress);
  const err = useStore((s) => s.atlasError);
  const view = useStore((s) => s.view);

  useEffect(boot, []);
  useRouting(atlas);

  if (!atlas) {
    return (
      <div className="boot" role="status">
        <h1>Neuron Atlas</h1>
        {err ? (
          <>
            <p className="err">The atlas failed to load: {err}</p>
            <p>
              <button onClick={() => window.location.reload()}>Reload</button>
            </p>
          </>
        ) : (
          <p>Loading the atlas: {Math.round(progress * 100)}%</p>
        )}
      </div>
    );
  }

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      {view === "atlas" ? (
        <AtlasView atlas={atlas} />
      ) : (
        <div className="app page">
          <Header atlas={atlas} />
          <main id="main" className="page-main" tabIndex={-1}>
            {view === "findings" ? <FindingsPage atlas={atlas} /> : <MethodPage />}
          </main>
        </div>
      )}
    </>
  );
}

function AtlasView({ atlas }: { atlas: Atlas }) {
  const focus = useStore((s) => s.focus);
  const webglError = useStore((s) => s.webglError);
  const notice = useStore((s) => s.notice);
  const [mapKey, setMapKey] = useState(0);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || !getState().focus) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT")) return;
      setState({ focus: null, tab: "profile" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <div className={`app${focus ? " has-focus" : ""}`}>
      <Header atlas={atlas} />
      <Sidebar atlas={atlas} />
      <main id="main" className="stage" tabIndex={-1}>
        <div className="map-wrap">
          {webglError ? (
            <div className="map-fallback" role="alert">
              <h2>The 3D map is unavailable</h2>
              <p>{webglError}</p>
              <p>Everything else still works: find neurons in the list, open them, probe text and steer the model.</p>
              <button
                onClick={() => {
                  setState({ webglError: null });
                  setMapKey((k) => k + 1);
                }}
              >
                Try the map again
              </button>
            </div>
          ) : (
            <MapView key={mapKey} atlas={atlas} />
          )}
          <HoverCard atlas={atlas} />
          {!focus && !webglError && <Intro />}
          {notice && (
            <div className="notice" role="status">
              <span>{notice}</span>
              <button className="icon" aria-label="Dismiss" onClick={() => setState({ notice: null })}>
                ×
              </button>
            </div>
          )}
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
  const sweep = useStore((s) => s.sweep);
  if (!hover) return null;
  const lens = atlas.lens(hover);
  const st = sweep?.stats(hover);
  return (
    <div className="hover-card" aria-hidden="true">
      <strong>{nid(hover)}</strong>
      <span>{names[nid(hover)] || `peaks on ${atlas.label(hover)}`}</span>
      {st && Number.isFinite(st.z) && (
        <span className="lens-inline">
          steering beats {Math.round(st.pct * 100)}% of random directions
          {st.themes.length > 0 && <> · pulls toward <em>{st.themes.slice(0, 3).join(", ")}</em></>}
        </span>
      )}
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
  const sweep = useStore((s) => s.sweep);
  return (
    <div className="intro">
      <p>
        Each point is one of the 8,192 feed-forward neurons in a small story-writing model, stacked from layer 0 at the bottom to layer 7 at the top.
        {sweep ? " Brightness shows how distinctive the text becomes when the neuron is pushed, compared with pushing random directions." : " Bright points respond to one specific thing."}
      </p>
      <p>Drag to orbit. Click a neuron to see what it responds to, then ablate or steer it and watch the model's writing change.</p>
    </div>
  );
}
