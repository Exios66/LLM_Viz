// Small shared pieces: token chips, neuron links, sparkline.

import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { tokenBg, tokenFg } from "../lib/colors";
import { nid, type Atlas, type NeuronRef } from "../lib/atlas";
import { focusNeuron, getState, setState, useStore, type ColorMode } from "../store";

/** Show whitespace so tokens like " the" and "\n" are legible. */
export function showToken(s: string) {
  return s.replace(/\n/g, "↵").replace(/^ /, "␣");
}

export function Tok({ text, rel, title, onClick, active }: { text: string; rel?: number; title?: string; onClick?: () => void; active?: boolean }) {
  const r = rel ?? NaN;
  return (
    <span
      className={`tok${onClick ? " click" : ""}${active ? " active" : ""}`}
      style={{ background: tokenBg(r), color: tokenFg(r) }}
      title={title}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-pressed={onClick ? !!active : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {text.replace(/\n/g, "↵")}
    </span>
  );
}

export function NeuronButton({ r, atlas, extra, label }: { r: NeuronRef; atlas: Atlas; extra?: ReactNode; label?: string }) {
  const names = useStore((s) => s.names);
  const name = names[nid(r)];
  return (
    <button
      className="neuron-btn"
      onClick={() => focusNeuron(r)}
      onMouseEnter={() => setState({ hover: r })}
      onMouseLeave={() => getState().hover === r && setState({ hover: null })}
      onFocus={() => setState({ hover: r })}
      onBlur={() => getState().hover === r && setState({ hover: null })}
    >
      <span className="nid">{nid(r)}</span>
      <span className="nlabel">{name ? <em>{name}</em> : label ?? atlas.label(r)}</span>
      {extra}
    </button>
  );
}

export function Histogram({ bins }: { bins: number[] }) {
  const logs = bins.map((b) => Math.log1p(b));
  const mx = Math.max(...logs, 1);
  return (
    <svg className="hist" viewBox={`0 0 ${bins.length * 6} 40`} preserveAspectRatio="none" aria-label="activation histogram (log counts)">
      {logs.map((v, i) => (
        <rect key={i} x={i * 6 + 0.5} width={5} y={40 - (v / mx) * 40} height={(v / mx) * 40} />
      ))}
    </svg>
  );
}

export function Seg<T extends string | number>({ value, options, onChange, label }: { value: T; options: { v: T; label: string; title?: string }[]; onChange: (v: T) => void; label: string }) {
  return (
    <div className="seg" role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button key={String(o.v)} role="radio" aria-checked={o.v === value} className={o.v === value ? "on" : ""} title={o.title} onClick={() => onChange(o.v)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** Mark the words of a theme or lexicon inside a text (case-insensitive, whole words). */
export function highlight(text: string, themes: string[]) {
  const set = new Set(themes.map((t) => t.toLowerCase()));
  return text.split(/(\b[a-zA-Z]+\b)/).map((part, i) => (set.has(part.toLowerCase()) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>));
}

/** A sidebar list that follows the map's colour mode: `pick` maps a mode to a list, or null to keep the last one. */
export function useListFromColour<T>(pick: (m: ColorMode) => T | null, fallback: T): T {
  const mode = useStore((s) => s.colorMode);
  const last = useRef(fallback);
  const v = pick(mode);
  if (v !== null) last.current = v;
  return last.current;
}

/**
 * On narrow screens the inspector sits below the map and the probe: bring it into view when a neuron opens, and keep it
 * there while content above it is still growing (the probe and the edit list fill in as the model and sweep load),
 * until the reader scrolls, taps or types themselves.
 */
export function useBringIntoView(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia?.("(max-width: 1100px)").matches) return;
    const at = () => el.getBoundingClientRect().top + window.scrollY;
    let top = at();
    el.scrollIntoView({ block: "start" });
    const ro = new ResizeObserver(() => {
      const t = at();
      if (Math.abs(t - top) < 1) return;
      top = t;
      el.scrollIntoView({ block: "start" });
    });
    // body is pinned to the viewport height, so watch the page grid and everything laid out before the inspector
    const grid = el.parentElement;
    if (grid) for (const c of [grid, ...grid.children]) if (c !== el) ro.observe(c);
    const stop = () => {
      ro.disconnect();
      clearTimeout(timer);
      for (const ev of USER_INPUT) window.removeEventListener(ev, stop, true);
    };
    const timer = setTimeout(stop, 8000);
    for (const ev of USER_INPUT) window.addEventListener(ev, stop, { capture: true, passive: true });
    return stop;
  }, [ref]);
}

const USER_INPUT = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
