// Small SVG charts for the findings and the steering studio. The series colours are theme tokens (styles.css),
// each mode validated with the dataviz validator against its own panel surface: cyan, gold, lavender.
// Dark #2796ae #c2841f #8a76e2 on #161d3d; light #0089a8 #b77a14 #7a66dc on #ffffff. All checks pass.

import { useMemo, useState, type ReactNode } from "react";

export const SERIES = ["var(--s1)", "var(--s2)", "var(--s3)"] as const;
export const CONTROL = "var(--s-ctrl)";
const FOCUS = "var(--s-focus)";
const RING = "var(--panel)"; // a surface-coloured ring separates overlapping marks

/** Sequential single-hue ramp for magnitude: from near the surface (--seq-lo) to strong ink (--seq-hi), so it reads
 * dark → light on navy and light → dark on white. Endpoints are themed tokens in styles.css. */
export function seqCyan(t: number) {
  const x = Math.round(Math.min(1, Math.max(0, t)) * 100);
  return `color-mix(in oklab, var(--seq-hi) ${x}%, var(--seq-lo))`;
}

const W = 520;

interface Tip {
  x: number;
  y: number;
  body: ReactNode;
}

function ChartFrame({ title, children, tip, table, height }: { title: string; children: ReactNode; tip: Tip | null; table: ReactNode; height: number }) {
  const [showTable, setShowTable] = useState(false);
  return (
    <figure className="chart">
      <figcaption>
        <span>{title}</span>
        <button className="ghost" onClick={() => setShowTable((v) => !v)} aria-pressed={showTable}>
          {showTable ? "Show chart" : "Show table"}
        </button>
      </figcaption>
      {showTable ? (
        <div className="chart-table">{table}</div>
      ) : (
        <div className="chart-body" style={{ aspectRatio: `${W} / ${height}` }}>
          {children}
          {tip && (
            <div className="chart-tip" style={{ left: `${tip.x}%`, top: `${(tip.y / height) * 100}%` }} role="status">
              {tip.body}
            </div>
          )}
        </div>
      )}
    </figure>
  );
}


/** One value per layer, single series: bars from a zero baseline. */
export function LayerBars({ title, values, fmt, max, note }: { title: string; values: number[]; fmt: (v: number) => string; max?: number; note?: (i: number) => string }) {
  const [tip, setTip] = useState<Tip | null>(null);
  const H = 180, padL = 40, padB = 26, padT = 10;
  const top = max ?? Math.max(...values, 1e-6) * 1.1;
  const bw = (W - padL - 10) / values.length;
  const y = (v: number) => padT + (1 - v / top) * (H - padT - padB);
  const ticks = [0, top / 2, top];
  return (
    <ChartFrame
      title={title}
      tip={tip}
      height={H}
      table={
        <table>
          <thead><tr><th>Layer</th><th>Value</th></tr></thead>
          <tbody>{values.map((v, i) => <tr key={i}><td>{i}</td><td>{fmt(v)}</td></tr>)}</tbody>
        </table>
      }
    >
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={title} onMouseLeave={() => setTip(null)}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={padL} x2={W - 10} y1={y(t)} y2={y(t)} className="grid" />
            <text x={padL - 6} y={y(t) + 4} className="axis" textAnchor="end">{fmt(t)}</text>
          </g>
        ))}
        {values.map((v, i) => {
          const x = padL + i * bw + 4;
          const h = Math.max(0, y(0) - y(v));
          return (
            <g key={i} onMouseEnter={() => setTip({ x: (x / W) * 100, y: y(v) - 8, body: <><strong>Layer {i}</strong> {fmt(v)}{note ? <><br />{note(i)}</> : null}</> })}>
              <rect x={padL + i * bw} y={padT} width={bw} height={H - padT - padB} fill="transparent" />
              <path d={roundedTop(x, y(v), bw - 8, h, 4)} fill={SERIES[0]} />
              <text x={x + (bw - 8) / 2} y={H - 8} className="axis" textAnchor="middle">L{i}</text>
            </g>
          );
        })}
      </svg>
    </ChartFrame>
  );
}

function roundedTop(x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, h, w / 2);
  if (h <= 0) return "";
  return `M${x},${y + h} V${y + rr} Q${x},${y} ${x + rr},${y} H${x + w - rr} Q${x + w},${y} ${x + w},${y + rr} V${y + h} Z`;
}

/** Layer × dose heatmap (calibration: coherence of random directions). */
export function DoseHeatmap({ title, doses, values, windows }: { title: string; doses: number[]; values: number[][]; windows: number[] }) {
  const [tip, setTip] = useState<Tip | null>(null);
  const H = 250, padL = 40, padB = 48, padT = 6;
  const cw = (W - padL - 6) / doses.length;
  const lo = Math.min(...values.flat()), hi = Math.max(...values.flat());
  const ch = (H - padT - padB) / values.length;
  return (
    <ChartFrame
      title={title}
      tip={tip}
      height={H}
      table={
        <table>
          <thead><tr><th>Layer</th>{doses.map((d) => <th key={d}>{d}×</th>)}</tr></thead>
          <tbody>{values.map((row, l) => <tr key={l}><td>{l}</td>{row.map((v, i) => <td key={i}>{v.toFixed(2)}</td>)}</tr>)}</tbody>
        </table>
      }
    >
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={title} onMouseLeave={() => setTip(null)}>
        {values.map((row, l) =>
          row.map((v, i) => {
            const x = padL + i * cw, yy = padT + (values.length - 1 - l) * ch;
            const inWindow = Math.abs(doses[i] - windows[l]) < 1e-6;
            return (
              <g key={`${l}-${i}`} onMouseEnter={() => setTip({ x: ((x + cw / 2) / W) * 100, y: yy - 4, body: <><strong>Layer {l}, push {doses[i]}×</strong><br />random directions keep {Math.round(v * 100)}% distinct 4-grams{inWindow ? <><br />chosen window</> : null}</> })}>
                <rect x={x + 1} y={yy + 1} width={cw - 2} height={ch - 2} rx={3} style={{ fill: seqCyan((v - lo) / (hi - lo || 1)) }} />
                {inWindow && <><rect x={x + 2} y={yy + 2} width={cw - 4} height={ch - 4} rx={3} fill="none" stroke={FOCUS} strokeWidth={2.5} /><rect x={x + 3.75} y={yy + 3.75} width={cw - 7.5} height={ch - 7.5} rx={2} fill="none" stroke={RING} strokeWidth={1} /></>}
              </g>
            );
          }),
        )}
        {values.map((_, l) => <text key={l} x={padL - 6} y={padT + (values.length - 1 - l) * ch + ch / 2 + 4} className="axis" textAnchor="end">L{l}</text>)}
        {doses.map((d, i) => <text key={d} x={padL + i * cw + cw / 2} y={H - 30} className="axis" textAnchor="middle">{d}×</text>)}
        <defs>
          <linearGradient id="seq-legend">
            <stop offset="0" style={{ stopColor: "var(--seq-lo)" }} />
            <stop offset="1" style={{ stopColor: "var(--seq-hi)" }} />
          </linearGradient>
        </defs>
        <g aria-hidden="true" transform={`translate(${padL} ${H - 16})`}>
          <text x={0} y={9} className="axis">{Math.round(lo * 100)}%</text>
          <rect x={34} y={0} width={120} height={10} rx={3} fill="url(#seq-legend)" />
          <text x={160} y={9} className="axis">{Math.round(hi * 100)}% distinct 4-grams in random-direction text</text>
        </g>
      </svg>
    </ChartFrame>
  );
}

/** Per layer, three related measures as dots on one scale (Cleveland dot plot). */
export function LayerDots({ title, series, fmt }: { title: string; series: { name: string; values: number[] }[]; fmt: (v: number) => string }) {
  const [tip, setTip] = useState<Tip | null>(null);
  const n = series[0].values.length;
  const H = 40 + n * 22, padL = 40, padR = 16, padT = 30;
  const all = series.flatMap((s) => s.values);
  const lo = Math.min(0, ...all), hi = Math.max(...all) * 1.08;
  const x = (v: number) => padL + ((v - lo) / (hi - lo || 1)) * (W - padL - padR);
  return (
    <ChartFrame
      title={title}
      tip={tip}
      height={H}
      table={
        <table>
          <thead><tr><th>Layer</th>{series.map((s) => <th key={s.name}>{s.name}</th>)}</tr></thead>
          <tbody>{Array.from({ length: n }, (_, l) => <tr key={l}><td>{l}</td>{series.map((s) => <td key={s.name}>{fmt(s.values[l])}</td>)}</tr>)}</tbody>
        </table>
      }
    >
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={title} onMouseLeave={() => setTip(null)}>
        <g className="legend">
          {series.map((s, i) => (
            <g key={s.name} transform={`translate(${padL + i * 150}, 12)`}>
              <circle r={5} cx={5} cy={0} fill={i < SERIES.length ? SERIES[i] : CONTROL} />
              <text x={16} y={4} className="axis">{s.name}</text>
            </g>
          ))}
        </g>
        <line x1={x(0)} x2={x(0)} y1={padT - 6} y2={H - 8} className="grid" />
        {Array.from({ length: n }, (_, l) => {
          const yy = padT + l * 22 + 8;
          const vals = series.map((s) => s.values[l]);
          return (
            <g key={l} onMouseEnter={() => setTip({ x: (x(Math.max(...vals)) / W) * 100, y: yy - 10, body: <><strong>Layer {l}</strong>{series.map((s) => <span key={s.name}><br />{s.name}: {fmt(s.values[l])}</span>)}</> })}>
              <rect x={padL} y={yy - 10} width={W - padL - padR} height={20} fill="transparent" />
              <text x={padL - 6} y={yy + 4} className="axis" textAnchor="end">L{l}</text>
              <line x1={x(Math.min(...vals))} x2={x(Math.max(...vals))} y1={yy} y2={yy} className="grid" />
              {series.map((s, i) => <circle key={s.name} cx={x(s.values[l])} cy={yy} r={5} fill={i < SERIES.length ? SERIES[i] : CONTROL} stroke={RING} strokeWidth={2} />)}
            </g>
          );
        })}
      </svg>
    </ChartFrame>
  );
}

/** Neurons vs random controls in one layer: theme strength (z) against coherence. */
export function PhasePlot({ nz, ncoh, cz, ccoh, focus, onPick }: { nz: Float32Array; ncoh: Float32Array; cz: Float32Array; ccoh: Float32Array; focus: number; onPick?: (i: number) => void }) {
  const [tip, setTip] = useState<Tip | null>(null);
  const H = 240, padL = 36, padB = 30, padT = 24, padR = 10;
  const { zlo, zhi } = useMemo(() => {
    let lo = Infinity, hi = -Infinity;
    for (const v of [...nz, ...cz]) {
      if (v < lo) lo = v;
      if (v > hi) hi = v;
    }
    return { zlo: Math.min(lo, -2), zhi: Math.max(hi, 4) };
  }, [nz, cz]);
  const x = (z: number) => padL + ((z - zlo) / (zhi - zlo)) * (W - padL - padR);
  const y = (c: number) => padT + (1 - c) * (H - padT - padB);
  const cmax = Math.max(...cz);
  const top = useMemo(() => Array.from(nz, (_, i) => i).sort((a, b) => nz[b] - nz[a]).slice(0, 12), [nz]);
  const pts = (zs: Float32Array, cs: Float32Array) => Array.from(zs, (z, i) => [x(z), y(cs[i])] as const);
  const n = useMemo(() => pts(nz, ncoh), [nz, ncoh, zlo, zhi]); // eslint-disable-line react-hooks/exhaustive-deps
  const c = useMemo(() => pts(cz, ccoh), [cz, ccoh, zlo, zhi]); // eslint-disable-line react-hooks/exhaustive-deps
  const nearest = (mx: number, my: number) => {
    let best = -1, bd = 144;
    n.forEach(([px, py], i) => {
      const d = (px - mx) ** 2 + (py - my) ** 2;
      if (d < bd) { bd = d; best = i; }
    });
    return best;
  };
  const toLocal = (ev: React.MouseEvent<SVGSVGElement>) => {
    const r = ev.currentTarget.getBoundingClientRect();
    return [((ev.clientX - r.left) / r.width) * W, ((ev.clientY - r.top) / r.height) * H] as const;
  };
  return (
    <ChartFrame
      title="Steering effect against random directions in this layer"
      tip={tip}
      height={H}
      table={
        <>
          <p className="note">{nz.length} neurons and {cz.length} random directions. This neuron: z {nz[focus].toFixed(1)}, coherence {ncoh[focus].toFixed(2)}. Strongest control: z {cmax.toFixed(1)}.</p>
          <table>
            <caption className="sr-only">The 12 neurons with the strongest steering effect in this layer</caption>
            <thead><tr><th scope="col">Neuron</th><th scope="col">z</th><th scope="col">Coherence</th></tr></thead>
            <tbody>
              {top.map((i) => (
                <tr key={i}>
                  <th scope="row">{onPick ? <button className="link" onClick={() => onPick(i)}>N{i}</button> : `N${i}`}</th>
                  <td>{nz[i].toFixed(1)}</td>
                  <td>{ncoh[i].toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      }
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Scatter of neurons and random controls: theme strength against coherence"
        onMouseMove={(ev) => {
          const [mx, my] = toLocal(ev);
          const i = nearest(mx, my);
          setTip(i >= 0 ? { x: (n[i][0] / W) * 100, y: n[i][1] - 10, body: <><strong>N{i}</strong><br />z = {nz[i].toFixed(1)}, coherence {ncoh[i].toFixed(2)}{onPick ? <><br />Click to open</> : null}</> } : null);
        }}
        onMouseLeave={() => setTip(null)}
        onClick={(ev) => {
          const [mx, my] = toLocal(ev);
          const i = nearest(mx, my);
          if (i >= 0) onPick?.(i);
        }}
      >
        <g className="legend">
          <circle cx={padL + 5} cy={10} r={4} fill={SERIES[0]} /><text x={padL + 14} y={14} className="axis">neurons</text>
          <circle cx={padL + 90} cy={10} r={4} fill={CONTROL} /><text x={padL + 99} y={14} className="axis">random directions</text>
          <circle cx={padL + 230} cy={10} r={5} fill={FOCUS} stroke={RING} strokeWidth={2} /><text x={padL + 240} y={14} className="axis">this neuron</text>
        </g>
        <rect x={x(zlo)} y={padT} width={Math.max(0, x(cmax) - x(zlo))} height={H - padT - padB} className="null-band" />
        <line x1={x(cmax)} x2={x(cmax)} y1={padT} y2={H - padB} className="null-edge" />
        <text x={x(cmax) > W * 0.7 ? x(cmax) - 4 : x(cmax) + 4} y={padT + 12} className="axis" textAnchor={x(cmax) > W * 0.7 ? "end" : "start"}>strongest control</text>
        {[0, 0.5, 1].map((t) => <text key={t} x={padL - 6} y={y(t) + 4} className="axis" textAnchor="end">{t}</text>)}
        <text x={(W + padL) / 2} y={H - 6} className="axis" textAnchor="middle">theme strength (z against controls)</text>
        <text x={10} y={padT - 8} className="axis">coherence</text>
        {c.map(([px, py], i) => <circle key={`c${i}`} cx={px} cy={py} r={2.2} fill={CONTROL} opacity={0.8} />)}
        {n.map(([px, py], i) => <circle key={`n${i}`} cx={px} cy={py} r={2.2} fill={SERIES[0]} opacity={0.75} />)}
        <circle cx={n[focus][0]} cy={n[focus][1]} r={6} fill={FOCUS} stroke={RING} strokeWidth={2} />
      </svg>
    </ChartFrame>
  );
}
