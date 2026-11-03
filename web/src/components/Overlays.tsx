// Global overlays: the keyboard shortcut sheet and the first-visit tour, plus the shortcuts themselves.

import { useEffect, useRef, useState } from "react";
import { formatRoute } from "../lib/route";
import { getState, openModel, setState, TOUR_KEY, useStore } from "../store";

const TOUR: { title: string; body: string; href?: string }[] = [
  {
    title: "Every point is a neuron",
    body: "The 3D map stacks the model's layers from bottom to top. Each point is one feed-forward neuron, placed so that neurons with similar output directions sit together. Drag to orbit, scroll to zoom.",
    href: "#/atlas",
  },
  {
    title: "Open one",
    body: "Click a point, or pick one from the list on the left. The panel on the right shows where the neuron fires hardest and which words it predicts.",
    href: "#/atlas/L6/N179",
  },
  {
    title: "Push it, then compare with chance",
    body: "The steering studio adds the neuron's output direction to the model and writes text live in your browser. A random direction of the same size writes next to it, so you can tell a real effect from noise.",
    href: "#/atlas/L6/N179?tab=steer",
  },
  {
    title: "Read the evidence",
    body: "Findings collects the neurons that beat every random push. Research has the generated reports and a literature review.",
    href: "#/findings",
  },
];

const KEYS: [string, string][] = [
  ["?", "Show this list"],
  ["/", "Search neurons"],
  ["Esc", "Close the open neuron or dialog"],
  ["[ and ]", "Previous or next neuron in the same layer"],
  ["1 to 5", "Switch the neuron's tabs"],
  ["c", "Copy a link to this view"],
  ["t", "Switch theme"],
  ["g h, g a, g f, g r", "Go to Overview, Atlas, Findings or Research"],
];

function Dialog({ label, onClose, children }: { label: string; onClose: () => void; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.querySelector<HTMLElement>("button, a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
      if (e.key === "Tab" && ref.current) {
        const els = Array.from(ref.current.querySelectorAll<HTMLElement>("button, a[href]"));
        if (!els.length) return;
        const first = els[0], last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => {
      window.removeEventListener("keydown", onKey, true);
      prev?.focus?.();
    };
  }, [onClose]);
  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={ref} className="dialog" role="dialog" aria-modal="true" aria-label={label}>
        {children}
      </div>
    </div>
  );
}

function Toast() {
  const [msg, setMsg] = useState<string | null>(null);
  useEffect(() => {
    const on = (e: Event) => {
      setMsg((e as CustomEvent<string>).detail);
      window.setTimeout(() => setMsg(null), 2200);
    };
    window.addEventListener("atlas-toast", on);
    return () => window.removeEventListener("atlas-toast", on);
  }, []);
  return (
    <div className="toast" role="status" aria-live="polite">
      {msg}
    </div>
  );
}

export const toast = (msg: string) => window.dispatchEvent(new CustomEvent("atlas-toast", { detail: msg }));

export async function copyLink() {
  const s = getState();
  const url = `${window.location.origin}${window.location.pathname}${formatRoute({ view: s.view, model: s.model, focus: s.focus, tab: s.tab, card: s.card })}`;
  try {
    await navigator.clipboard.writeText(url);
    toast("Link copied");
  } catch {
    toast("Copying is blocked here. The address bar has the link.");
  }
}

function useShortcuts() {
  useEffect(() => {
    let g = false;
    let gTimer = 0;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable)) return;
      const s = getState();
      if (s.help || s.tour !== null) return;
      if (g) {
        g = false;
        const to = { h: "#/", a: "#/atlas", f: "#/findings", r: "#/research", m: "#/method" }[e.key];
        if (to) {
          e.preventDefault();
          window.location.hash = to;
        }
        return;
      }
      switch (e.key) {
        case "?":
          setState({ help: true });
          break;
        case "g":
          g = true;
          window.clearTimeout(gTimer);
          gTimer = window.setTimeout(() => (g = false), 900);
          break;
        case "/": {
          const el = document.querySelector<HTMLInputElement>(".sidebar input");
          if (el) {
            e.preventDefault();
            el.focus();
          }
          break;
        }
        case "c":
          copyLink();
          break;
        case "t":
          setState({ theme: s.theme === "system" ? "light" : s.theme === "light" ? "dark" : "system" });
          break;
        case "[":
        case "]": {
          if (s.view !== "atlas" || !s.focus) break;
          const N = s.model ? s.recorded?.N : s.atlas?.N;
          if (!N) break;
          const n = (s.focus.neuron + (e.key === "]" ? 1 : N - 1)) % N;
          openModel(s.model, { layer: s.focus.layer, neuron: n }, s.tab);
          break;
        }
        case "1": case "2": case "3": case "4": case "5": {
          if (s.view !== "atlas" || !s.focus) break;
          const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>('.inspector > .seg [role="radio"]'));
          tabs[Number(e.key) - 1]?.click();
          break;
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}

export function Overlays() {
  const help = useStore((s) => s.help);
  const tour = useStore((s) => s.tour);
  const view = useStore((s) => s.view);
  useShortcuts();

  // offer the tour once, the first time someone opens the live atlas
  useEffect(() => {
    if (view !== "atlas" || getState().model || getState().tour !== null) return;
    let done = false;
    try {
      done = localStorage.getItem(TOUR_KEY) === "1";
    } catch {
      done = true; // no storage: never nag
    }
    if (!done && !navigator.webdriver) setState({ tour: 0 });
  }, [view]);

  const endTour = () => {
    try {
      localStorage.setItem(TOUR_KEY, "1");
    } catch {
      /* storage blocked */
    }
    setState({ tour: null });
  };

  return (
    <>
      {help && (
        <Dialog label="Keyboard shortcuts" onClose={() => setState({ help: false })}>
          <div className="dialog-head">
            <h2>Keyboard shortcuts</h2>
            <button className="icon" onClick={() => setState({ help: false })} aria-label="Close">
              ×
            </button>
          </div>
          <dl className="keys">
            {KEYS.map(([k, d]) => (
              <div key={k}>
                <dt>
                  {k.split(/(, | and | to )/).map((p, i) => (/^(, | and | to )$/.test(p) ? <span key={i}>{p}</span> : <kbd key={i}>{p}</kbd>))}
                </dt>
                <dd>{d}</dd>
              </div>
            ))}
          </dl>
          <p className="note">
            <button className="link" onClick={() => setState({ help: false, tour: 0 })}>
              Take the tour again
            </button>
          </p>
        </Dialog>
      )}
      {tour !== null && TOUR[tour] && (
        <Dialog label="Tour" onClose={endTour}>
          <p className="tour-step">
            Step {tour + 1} of {TOUR.length}
          </p>
          <h2>{TOUR[tour].title}</h2>
          <p>{TOUR[tour].body}</p>
          <div className="dialog-actions">
            <button className="ghost" onClick={endTour}>
              Skip the tour
            </button>
            {tour > 0 && <button onClick={() => setState({ tour: tour - 1 })}>Back</button>}
            {tour < TOUR.length - 1 ? (
              <button
                className="primary"
                onClick={() => {
                  const next = tour + 1;
                  if (TOUR[next].href) window.location.hash = TOUR[next].href!;
                  setState({ tour: next });
                }}
              >
                Next
              </button>
            ) : (
              <button className="primary" onClick={endTour}>
                Start exploring
              </button>
            )}
          </div>
        </Dialog>
      )}
      <Toast />
    </>
  );
}
