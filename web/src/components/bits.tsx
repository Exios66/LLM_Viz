// Small shared pieces: token chips, neuron links, sparkline.

import type { ReactNode } from "react";
import { tokenBg, tokenFg } from "../lib/colors";
import { nid, type Atlas, type NeuronRef } from "../lib/atlas";
import { focusNeuron, getState, setState, useStore } from "../store";

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
