import { lazy, Suspense, useEffect, useState } from "react";
import { Atlas, nid } from "./lib/atlas";
import { Runtime } from "./lib/runtime";
import { Sweep } from "./lib/sweep";
import { RecordedModel } from "./lib/recorded";
import { loadResearch } from "./lib/research";
import { askedForNeuron, formatRoute, parseRoute, type Limits } from "./lib/route";
import { applyTheme, getState, setState, subscribe, useStore, type State } from "./store";
import { Inspector } from "./components/Inspector";
import { Probe } from "./components/Probe";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { HomePage } from "./components/Home";
import { Footer } from "./components/Footer";
import { ModelInspector } from "./components/ModelInspector";
import { ModelSidebar } from "./components/ModelSidebar";
import { Overlays } from "./components/Overlays";
import { showToken } from "./components/bits";

// Heavy or rarely used views load on demand, so Home paints without three.js or the findings bundle.
const MapView = lazy(() => import("./components/MapView").then((m) => ({ default: m.MapView })));
const FindingsPage = lazy(() => import("./components/Findings").then((m) => ({ default: m.FindingsPage })));
const MethodPage = lazy(() => import("./components/Method").then((m) => ({ default: m.MethodPage })));
const ResearchPage = lazy(() => import("./components/Research").then((m) => ({ default: m.ResearchPage })));

function safeDecode(s: string) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

export const DATA = new URL(`${import.meta.env.BASE_URL}data`, window.location.href).href.replace(/\/$/, "");

let booted = false;
/** Light start: theme, findings and the list of recorded models. Enough for Home, Research and Method. */
function boot() {
  if (booted) return;
  booted = true;
  applyTheme(getState().theme);
  Sweep.loadFindings(DATA)
    .then(({ findings, meta }) => !getState().sweep && setState({ findings, sweepMeta: meta }))
    .catch((e) => setState({ sweepError: String(e?.message ?? e), colorMode: "selectivity" }));
  RecordedModel.registry(DATA)
    .then((models) => setState({ models }))
    .catch(() => setState({ models: [] })); // recorded models are optional
  if (!LIGHT_VIEWS.has(getState().view)) bootHeavy();
}

const LIGHT_VIEWS = new Set(["home", "research", "method"]);
let heavy = false;
/** The atlas, the full sweep pack and the model weights (about 38 MB). Started when a view needs them, or on intent to open one. */
export function bootHeavy() {
  if (heavy) return;
  heavy = true;
  Atlas.load(DATA, (f) => setState({ atlasProgress: f }))
    .then((a) => setState({ atlas: a }))
    .catch((e) => setState({ atlasError: String(e?.message ?? e) }));
  Sweep.load(DATA)
    .then((sw) => setState({ sweep: sw, findings: sw.findings, sweepMeta: sw.meta, sweepError: null }))
    .catch((e) => setState({ sweepError: String(e?.message ?? e), colorMode: "selectivity" }));
  const rt = new Runtime();
  rt.onCrash = (msg) => setState({ modelError: msg, modelProgress: 0 });
  setState({ runtime: rt });
  rt.init(DATA, (l, t) => setState({ modelProgress: t ? Math.min(0.99, l / t) : 0 }))
    .then(() => setState({ modelProgress: 1, modelError: null }))
    .catch((e) => setState({ modelError: String(e?.message ?? e) }));
}

/** Load research.json the first time a view needs it. */
export function ensureResearch() {
  const s = getState();
  if (s.research || s.researchError === "loading") return;
  setState({ researchError: "loading" });
  loadResearch(DATA)
    .then((r) => setState({ research: r, researchError: null }))
    .catch((e) => setState({ researchError: String(e?.message ?? e) }));
}

/** Load a recorded model pack when its route is opened. */
function useRecorded() {
  const model = useStore((s) => s.model);
  const models = useStore((s) => s.models);
  useEffect(() => {
    if (!model) return;
    const cur = getState().recorded;
    if (cur?.entry.slug === model) return;
    const entry = models.find((m) => m.slug === model);
    if (!entry) {
      if (models.length) setState({ recordedError: `There is no recorded model called “${model}”.`, recorded: null });
      return;
    }
    let cancelled = false;
    setState({ recorded: null, recordedError: null, recordedProgress: 0 });
    RecordedModel.load(DATA, entry, (f) => !cancelled && setState({ recordedProgress: f }))
      .then((m) => !cancelled && setState({ recorded: m, colorMode: m.hunt ? "hunt" : m.signals.d_evil ? "evil" : "selectivity" }))
      .catch((e) => !cancelled && setState({ recordedError: String(e?.message ?? e) }));
    return () => {
      cancelled = true;
    };
  }, [model, models]);
}

/** Keep the URL hash and the store in step, in both directions. */
function useRouting() {
  const atlas = useStore((s) => s.atlas);
  const recorded = useStore((s) => s.recorded);
  useEffect(() => {
    const limits: Limits = atlas ? { layers: atlas.L, neurons: atlas.N } : { layers: Infinity, neurons: Infinity };
    const modelLimits = (slug: string): Limits | undefined => {
      const s = getState();
      if (s.recorded?.entry.slug === slug) return { layers: s.recorded.L, neurons: s.recorded.N };
      const e = s.models.find((m) => m.slug === slug);
      return e ? { layers: e.layers, neurons: e.neurons } : { layers: Infinity, neurons: Infinity };
    };
    const apply = () => {
      const hash = window.location.hash;
      const r = parseRoute(hash, limits, modelLimits);
      const s = getState();
      const same = r.focus && s.focus && r.focus.layer === s.focus.layer && r.focus.neuron === s.focus.neuron && r.model === s.model;
      const shape = r.model ? modelLimits(r.model) : limits;
      setState({
        view: r.view,
        model: r.model,
        focus: same ? s.focus : r.focus,
        tab: r.tab ?? (r.focus ? s.tab : "profile"),
        card: r.card,
        notice:
          askedForNeuron(hash) && !r.focus && shape && Number.isFinite(shape.layers)
            ? `There is no neuron at “${safeDecode(hash.slice(1))}”. This model has layers 0–${shape.layers - 1} and neurons 0–${shape.neurons - 1}.`
            : null,
      });
      const canon = formatRoute(r);
      const shapesKnown = Number.isFinite(limits.layers) && (!r.model || !!getState().recorded);
      if (shapesKnown && canon !== hash && !(canon === "#/" && hash === "")) history.replaceState(null, "", canon);
    };
    apply();
    window.addEventListener("hashchange", apply);
    let last: State = getState();
    const unsub = subscribe(() => {
      const s = getState();
      if (s.view !== last.view || s.focus !== last.focus || s.tab !== last.tab || s.card !== last.card || s.model !== last.model) {
        const next = formatRoute({ view: s.view, model: s.model, focus: s.focus, tab: s.tab, card: s.card });
        const cur = window.location.hash || "#/";
        if (next !== cur) {
          // a new neuron or page is a history entry; switching tabs is not
          const sameTarget = s.view === last.view && s.focus === last.focus && s.card === last.card && s.model === last.model;
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
  }, [atlas, recorded]);
}

function PageLoading() {
  return (
    <div className="page-wrap" role="status">
      <div className="skeleton skel-title" />
      <div className="skeleton skel-line" />
      <div className="skeleton skel-line short" />
    </div>
  );
}

export function App() {
  const view = useStore((s) => s.view);
  const model = useStore((s) => s.model);

  useEffect(boot, []);
  useEffect(() => {
    if (!LIGHT_VIEWS.has(view)) bootHeavy();
  }, [view]);
  useRouting();
  useRecorded();

  useEffect(() => {
    const titles: Record<string, string> = { home: "Neuron Atlas", findings: "Findings", research: "Research", method: "Method", atlas: "Atlas" };
    document.title = view === "home" ? "Neuron Atlas — steering every neuron of a language model" : `${titles[view]} · Neuron Atlas`;
  }, [view]);

  return (
    <>
      <a
        className="skip"
        href="#main"
        onClick={(e) => {
          e.preventDefault(); // "#main" would be read as a route
          document.getElementById("main")?.focus();
        }}
      >
        Skip to content
      </a>
      {view === "atlas" ? (
        model ? <RecordedAtlasView /> : <AtlasView />
      ) : (
        <div className="app page">
          <Header />
          <main id="main" className="page-main" tabIndex={-1}>
            {view === "home" ? (
              <HomePage />
            ) : (
              <Suspense fallback={<PageLoading />}>
                {view === "findings" ? <FindingsGate /> : view === "research" ? <ResearchPage /> : <MethodPage />}
              </Suspense>
            )}
            <Footer />
          </main>
        </div>
      )}
      <Overlays />
    </>
  );
}

function FindingsGate() {
  const atlas = useStore((s) => s.atlas);
  const err = useStore((s) => s.atlasError);
  if (err) return <div className="page-wrap"><p className="err" role="alert">The atlas failed to load: {err}</p></div>;
  if (!atlas) return <PageLoading />;
  return <FindingsPage atlas={atlas} />;
}

function useEscapeCloses() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const s = getState();
      if (s.help || s.tour !== null) return; // overlays handle their own Escape
      if (!s.focus) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT")) return;
      setState({ focus: null, tab: "profile", compare: null });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}

function MapStage({ children, map }: { children?: React.ReactNode; map: React.ReactNode }) {
  const webglError = useStore((s) => s.webglError);
  const notice = useStore((s) => s.notice);
  const [mapKey, setMapKey] = useState(0);
  return (
    <div className="map-wrap darkfield">
      {webglError ? (
        <div className="map-fallback" role="alert">
          <h2>The 3D map is unavailable</h2>
          <p>{webglError}</p>
          <p>Everything else still works: find neurons in the list, open them, and read their results.</p>
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
        <Suspense fallback={<div className="map-loading" role="status">Drawing the map…</div>}>
          <div key={mapKey} className="map-host">{map}</div>
        </Suspense>
      )}
      {children}
      {notice && (
        <div className="notice" role="status">
          <span>{notice}</span>
          <button className="icon" aria-label="Dismiss" onClick={() => setState({ notice: null })}>
            ×
          </button>
        </div>
      )}
    </div>
  );
}

function AtlasView() {
  const atlas = useStore((s) => s.atlas);
  const progress = useStore((s) => s.atlasProgress);
  const err = useStore((s) => s.atlasError);
  const focus = useStore((s) => s.focus);
  const webglError = useStore((s) => s.webglError);
  useEscapeCloses();
  if (!atlas) {
    return (
      <div className="app page">
        <Header />
        <main id="main" className="page-main" tabIndex={-1}>
          <div className="boot" role="status">
            {err ? (
              <>
                <p className="err">The atlas failed to load: {err}</p>
                <p><button onClick={() => window.location.reload()}>Reload</button></p>
              </>
            ) : (
              <p>Loading the atlas: {Math.round(progress * 100)}%</p>
            )}
          </div>
        </main>
      </div>
    );
  }
  return (
    <div className={`app${focus ? " has-focus" : ""}`}>
      <Header />
      <Sidebar atlas={atlas} />
      <main id="main" className="stage" tabIndex={-1}>
        <MapStage map={<MapView space={atlas} />}>
          <HoverCard atlas={atlas} />
          {!focus && !webglError && <Intro />}
        </MapStage>
        <Probe atlas={atlas} />
      </main>
      {/* the route effect drops an out-of-range focus once the atlas loads, but this render can come first */}
      {focus && focus.layer < atlas.L && focus.neuron < atlas.N && <Inspector key={nid(focus)} atlas={atlas} r={focus} />}
    </div>
  );
}

function RecordedAtlasView() {
  const recorded = useStore((s) => s.recorded);
  const err = useStore((s) => s.recordedError);
  const progress = useStore((s) => s.recordedProgress);
  const focus = useStore((s) => s.focus);
  const hover = useStore((s) => s.hover);
  useEscapeCloses();
  if (!recorded) {
    return (
      <div className="app page">
        <Header />
        <main id="main" className="page-main" tabIndex={-1}>
          <div className="boot" role={err ? "alert" : "status"}>
            {err ? (
              <>
                <p className="err">{err}</p>
                <p><a href="#/atlas">Open the live TinyStories atlas</a></p>
              </>
            ) : (
              <p>Loading the recorded model: {Math.round(progress * 100)}%</p>
            )}
          </div>
        </main>
      </div>
    );
  }
  return (
    <div className={`app recorded${focus ? " has-focus" : ""}`}>
      <Header />
      <ModelSidebar m={recorded} />
      <main id="main" className="stage stage-recorded" tabIndex={-1}>
        <MapStage map={<MapView space={recorded} recorded={recorded} />}>
          {hover && (
            <div className="hover-card" aria-hidden="true">
              <strong>{nid(hover)}</strong>
              <span>{recorded.label(hover)}</span>
            </div>
          )}
          {!focus && (
            <div className="intro">
              <p>
                {recorded.entry.label}: {recorded.L} layers × {recorded.N.toLocaleString()} neurons, {(recorded.L * recorded.N).toLocaleString()} in all.
              </p>
              <p>This model is recorded, not live: its statistics and steering results were computed offline by the pipeline and are shown as recorded.</p>
            </div>
          )}
        </MapStage>
      </main>
      {focus && focus.layer < recorded.L && focus.neuron < recorded.N && <ModelInspector key={`${recorded.entry.slug}:${nid(focus)}`} m={recorded} r={focus} />}
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
          {st.themes.length > 0 && <>, pulls toward <em>{st.themes.slice(0, 3).join(", ")}</em></>}
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
        Each point is one of the 8,192 feed-forward neurons in a small story-writing model. Layers run left to right, from layer 0 to layer 7: each glass slab is an attention block, and the sheet after it holds that layer's neurons.
        {sweep ? " Brightness shows how distinctive the text becomes when the neuron is pushed, compared with pushing random directions." : " Bright points respond to one specific thing."}
      </p>
      <p>Drag to orbit and scroll to zoom: the layer in front fades back as you close in. Click a layer name to face it. Click a neuron to see what it responds to, then ablate or steer it and watch the model's writing change.</p>
    </div>
  );
}
