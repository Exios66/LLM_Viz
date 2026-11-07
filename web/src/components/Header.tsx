import { formatRoute, type View } from "../lib/route";
import { openModel, removeEdit, setState, toggleEdit, useStore, type ColorMode, type LayoutMode, type Theme } from "../store";
import { Seg } from "./bits";
import { copyLink } from "./Overlays";

function describe(e: { mode: string; value: number; unit?: string }) {
  if (e.mode === "set" && e.value === 0) return "zeroed";
  if (e.mode === "set") return `clamped ${e.value}×`;
  if (e.mode === "scale") return `×${e.value}`;
  const v = `${e.value > 0 ? "+" : ""}${+e.value.toFixed(2)}`;
  return e.unit === "resid" ? `push ${v}× resid` : `${v}× max`;
}

const NAV: { v: View; label: string }[] = [
  { v: "home", label: "Overview" },
  { v: "atlas", label: "Atlas" },
  { v: "findings", label: "Findings" },
  { v: "research", label: "Research" },
  { v: "method", label: "Method" },
];

const THEME_NEXT: Record<Theme, Theme> = { system: "light", light: "dark", dark: "system" };
const THEME_LABEL: Record<Theme, string> = { system: "Theme: system", light: "Theme: light", dark: "Theme: dark" };

function ThemeIcon({ t }: { t: Theme }) {
  // a half disc for system, a sun for light, a crescent for dark
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
      {t === "system" && (
        <>
          <circle cx="10" cy="10" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M10 3.5a6.5 6.5 0 0 1 0 13z" fill="currentColor" />
        </>
      )}
      {t === "light" && (
        <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none">
          <circle cx="10" cy="10" r="3.6" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <line key={a} x1="10" y1="2.2" x2="10" y2="4" transform={`rotate(${a} 10 10)`} />
          ))}
        </g>
      )}
      {t === "dark" && <path d="M13.8 13.6A6.4 6.4 0 0 1 7.3 3.4a6.5 6.5 0 1 0 8.9 8.9 6.4 6.4 0 0 1-2.4 1.3z" fill="currentColor" />}
    </svg>
  );
}

function Wordmark() {
  return (
    <a className="wordmark" href="#/">
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path d="M3 17.5 12 21l9-3.5M3 12.5 12 16l9-3.5M3 7.5 12 11l9-3.5L12 4z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="15.5" cy="12.7" r="1.9" fill="var(--excite)" />
      </svg>
      <span>Neuron Atlas</span>
    </a>
  );
}

/** Site header: wordmark, section nav and tools; in the atlas also the model, colour and layout controls and the edits. */
export function Header() {
  const edits = useStore((s) => s.edits);
  const colorMode = useStore((s) => s.colorMode);
  const layoutMode = useStore((s) => s.layoutMode);
  const showWeb = useStore((s) => s.showWeb);
  const progress = useStore((s) => s.modelProgress);
  const err = useStore((s) => s.modelError);
  const view = useStore((s) => s.view);
  const focus = useStore((s) => s.focus);
  const tab = useStore((s) => s.tab);
  const model = useStore((s) => s.model);
  const models = useStore((s) => s.models);
  const recorded = useStore((s) => s.recorded);
  const sweep = useStore((s) => s.sweep);
  const sweepError = useStore((s) => s.sweepError);
  const webglError = useStore((s) => s.webglError);
  const theme = useStore((s) => s.theme);
  const atlas = useStore((s) => s.atlas);

  const href = (v: View) =>
    v === "atlas" ? formatRoute({ view: "atlas", model, focus, tab, card: null }) : formatRoute({ view: v, model: null, focus: null, tab: null, card: null });
  const inAtlas = view === "atlas";
  const live = inAtlas && !model;
  const rec = inAtlas && model && recorded?.entry.slug === model ? recorded : null;

  return (
    <header className={inAtlas ? "top" : "top reading"}>
      <div className="brand">
        {view === "home" ? <Wordmark /> : <h1 className="brand-h1"><Wordmark /></h1>}
        {inAtlas && (
          <p className="brand-sub">
            {rec
              ? `${(rec.L * rec.N).toLocaleString()} neurons of ${rec.entry.label}, recorded offline.`
              : atlas
                ? `${(atlas.L * atlas.N).toLocaleString()} neurons of TinyStories-8M, running in your browser.`
                : "TinyStories-8M, running in your browser."}{" "}
            {live && err ? (
              <span className="err" role="alert">
                The model failed to load: {err}
              </span>
            ) : live && progress < 1 ? (
              <span className="loading">Loading weights {Math.round(progress * 100)}%</span>
            ) : null}
            {live && sweepError && <span className="warn"> Steering results unavailable ({sweepError}).</span>}
          </p>
        )}
      </div>
      <nav className="nav" aria-label="Sections">
        {NAV.map((n) => (
          <a key={n.v} href={href(n.v)} aria-current={view === n.v ? "page" : undefined} className={view === n.v ? "on" : ""}>
            {n.label}
          </a>
        ))}
      </nav>
      <div className="top-tools">
        {inAtlas && models.length > 0 && (
          <label className="model-pick">
            <span className="sr-only">Model</span>
            <select value={model ?? ""} onChange={(e) => openModel(e.target.value || null)} aria-label="Model">
              <option value="">TinyStories-8M (live)</option>
              {models.map((m) => (
                <option key={m.slug} value={m.slug}>
                  {m.label} (recorded)
                </option>
              ))}
            </select>
          </label>
        )}
        <button className="icon-btn" onClick={() => copyLink()} aria-label="Copy a link to this view" title="Copy a link to this view (c)">
          <svg viewBox="0 0 20 20" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
            <path d="M8.5 11.5a3.2 3.2 0 0 0 4.5 0l2.6-2.6a3.2 3.2 0 0 0-4.5-4.5l-.9.9" />
            <path d="M11.5 8.5a3.2 3.2 0 0 0-4.5 0l-2.6 2.6a3.2 3.2 0 0 0 4.5 4.5l.9-.9" />
          </svg>
        </button>
        <button className="icon-btn" onClick={() => setState({ help: true })} aria-label="Keyboard shortcuts" title="Keyboard shortcuts (?)">
          ?
        </button>
        <button className="icon-btn" onClick={() => setState({ theme: THEME_NEXT[theme] })} aria-label={`${THEME_LABEL[theme]}. Switch theme`} title={THEME_LABEL[theme]}>
          <ThemeIcon t={theme} />
        </button>
      </div>
      {live && (
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
      {rec && (
        <div className="controls">
          <Seg<ColorMode>
            label="Colour neurons by"
            value={colorMode}
            onChange={(v) => setState({ colorMode: v })}
            options={[
              ...(rec.hunt ? [{ v: "hunt" as const, label: "Hunt results", title: "Finalists of the evil and alien hunt, coloured by the concept each was screened for" }] : []),
              ...(rec.signals.d_evil ? [{ v: "evil" as const, label: "Evil contrast", title: "How much more the neuron fires on evil sentences than on matched neutral ones (Cohen's d)" }] : []),
              ...(rec.signals.d_alien ? [{ v: "alien" as const, label: "Alien contrast", title: "How much more the neuron fires on alien sentences than on matched neutral ones (Cohen's d)" }] : []),
              ...(rec.signals.dd_evil ? [{ v: "shift-evil" as const, label: "Evil shift", title: "Change in evil contrast after fine-tuning (Δd). Amber: more selective than the base model. Blue: less." }] : []),
              ...(rec.signals.dd_alien ? [{ v: "shift-alien" as const, label: "Alien shift", title: "Change in alien contrast after fine-tuning (Δd). Amber: more selective than the base model. Blue: less." }] : []),
              { v: "selectivity", label: "Selectivity", title: "How concentrated each neuron's top contexts are on one token" },
              { v: "density", label: "Firing rate", title: "Share of tokens where the neuron is positive" },
            ]}
          />
        </div>
      )}
      {live && (
        <div className="edits" aria-label="Active edits">
          {edits.length === 0 ? (
            <span className="note">No edits yet. Open a neuron to zero, scale, push or clamp it.</span>
          ) : (
            <>
              {edits.map((e) => (
                <span key={`${e.layer}:${e.neuron}`} className={`edit-chip${e.enabled === false ? " off" : ""}`}>
                  <input type="checkbox" checked={e.enabled !== false} onChange={() => toggleEdit(e)} aria-label={`Enable edit on L${e.layer} N${e.neuron}`} />
                  <button className="link" onClick={() => openModel(null, { layer: e.layer, neuron: e.neuron })}>
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
      )}
      {/* reading progress for the scrolling pages, drawn by a scroll-driven animation where supported */}
      {!inAtlas && <span className="read-progress" aria-hidden="true" />}
    </header>
  );
}
