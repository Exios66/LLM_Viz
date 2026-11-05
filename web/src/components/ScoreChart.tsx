// Home's evidence chart: every neuron's theme score next to the random directions it was measured against.
// Neurons rise above the axis, random directions hang below it (each as a share of its own group, so the shapes
// compare), and the neurons that beat every random push in their layer sit on top as one dot each.
// Colours are the validated chart tokens: --s1 neurons, --s2 the winners, --s-ctrl the controls (null is never hued).

import { useLayoutEffect, useRef, useState } from "react";
import type { Findings } from "../lib/sweep";

type Hist = NonNullable<Findings["score_hist"]>;

const pct = (x: number) => `${(x * 100).toFixed(x < 0.01 && x > 0 ? 2 : 1)}%`;

function useWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width)));
    ro.observe(el);
    setW(Math.round(el.getBoundingClientRect().width));
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

export function ScoreChart({ h, neurons, controls }: { h: Hist; neurons: number; controls: number }) {
  const [ref, W] = useWidth();
  const [hover, setHover] = useState<number | null>(null);
  const [table, setTable] = useState(false);
  const B = h.controls.length;
  const narrow = W > 0 && W < 560;
  const padL = narrow ? 34 : 44, padR = 8;
  const bw = W > 0 ? (W - padL - padR) / B : 0;
  const r = Math.max(2.5, Math.min(6, bw / 2 - 1));
  const maxDots = Math.max(...h.above_null);
  const dotsH = maxDots * (2 * r + 2);
  const band = narrow ? 70 : 96; // height of each half
  const top = 22, base = top + dotsH + 18 + band, H = base + band + 40;
  const nShare = h.neurons.map((c, i) => (c + h.above_null[i]) / neurons);
  const cShare = h.controls.map((c) => c / controls);
  const ymax = Math.ceil(Math.max(...nShare, ...cShare) * 50) / 50; // round up to 2%
  const y = (s: number) => (s / ymax) * band;
  const x = (i: number) => padL + i * bw;
  const z = (i: number) => h.lo + i * h.step;
  const ticks = [];
  for (let t = Math.ceil(h.lo); t <= h.lo + B * h.step; t += narrow ? 2 : 1) ticks.push(t);
  const firstWin = h.above_null.findIndex((c) => c > 0);
  const grid = [0.05, 0.1, 0.15, 0.2, 0.25].filter((g) => g <= ymax + 1e-9);
  const plural = (n: number, one: string, many: string) => `${n.toLocaleString()} ${n === 1 ? one : many}`;

  const tip = hover === null ? null : (
    <div
      className="chart-tip"
      style={{ left: x(hover) + bw / 2, top: top - 4, transform: `translate(${hover > B * 0.6 ? "-100%" : hover < B * 0.3 ? "0" : "-50%"}, -100%)` }}
      role="status"
    >
      <strong>z from {z(hover).toFixed(2)} to {z(hover + 1).toFixed(2)}</strong>
      <br />
      {plural(h.neurons[hover] + h.above_null[hover], "neuron", "neurons")} ({pct(nShare[hover])})
      {h.above_null[hover] > 0 && <>, {h.above_null[hover]} beat every random push</>}
      <br />
      {plural(h.controls[hover], "random direction", "random directions")} ({pct(cShare[hover])})
    </div>
  );

  return (
    <figure className="chart score-chart">
      <figcaption>
        <ul className="legend" aria-label="Legend">
          <li><i className="sw sw-win" /> Beat every random push in its layer, one dot per neuron</li>
          <li><i className="sw sw-neuron" /> All {neurons.toLocaleString()} neurons</li>
          <li><i className="sw sw-ctrl" /> {controls.toLocaleString()} random directions</li>
        </ul>
        <button className="ghost" onClick={() => setTable((v) => !v)} aria-pressed={table}>
          {table ? "Show chart" : "Show table"}
        </button>
      </figcaption>
      {table ? (
        <div className="chart-table">
          <table>
            <caption className="sr-only">Neurons and random directions by theme score</caption>
            <thead>
              <tr><th scope="col">z from</th><th scope="col">Neurons</th><th scope="col">Beat every random push</th><th scope="col">Random directions</th></tr>
            </thead>
            <tbody>
              {h.controls.map((c, i) => (
                <tr key={i}>
                  <td>{z(i).toFixed(2)}</td>
                  <td>{h.neurons[i] + h.above_null[i]}</td>
                  <td>{h.above_null[i] || ""}</td>
                  <td>{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="chart-body" ref={ref} style={{ height: W ? H : 280 }} onPointerLeave={() => setHover(null)}>
          {W > 0 && (
            <svg width={W} height={H} role="img" aria-label={`Histogram: neurons and random directions have nearly the same score distribution. ${h.above_null.reduce((a, b) => a + b, 0)} neurons beat every random push in their layer.`}>
              {grid.map((g) => (
                <g key={g}>
                  <line className="grid" x1={padL} x2={W - padR} y1={base - y(g)} y2={base - y(g)} />
                  <line className="grid" x1={padL} x2={W - padR} y1={base + y(g)} y2={base + y(g)} />
                  <text className="axis" x={padL - 6} y={base - y(g) + 4} textAnchor="end">{Math.round(g * 100)}%</text>
                  <text className="axis" x={padL - 6} y={base + y(g) + 4} textAnchor="end">{Math.round(g * 100)}%</text>
                </g>
              ))}
              {hover !== null && <rect className="hover-col" x={x(hover)} width={bw} y={top - 6} height={base + band - top + 6} />}
              {nShare.map((s, i) => s > 0 && (
                <rect key={`n${i}`} className="bar-neuron" x={x(i) + 1} width={Math.max(1, bw - 2)} y={base - 1 - y(s)} height={y(s)} rx={Math.min(2, bw / 4)} />
              ))}
              {cShare.map((s, i) => s > 0 && (
                <rect key={`c${i}`} className="bar-ctrl" x={x(i) + 1} width={Math.max(1, bw - 2)} y={base + 1} height={y(s)} rx={Math.min(2, bw / 4)} />
              ))}
              <line className="baseline" x1={padL} x2={W - padR} y1={base} y2={base} />
              {h.above_null.map((c, i) =>
                Array.from({ length: c }, (_, k) => (
                  <circle key={`d${i}-${k}`} className="dot-win" cx={x(i) + bw / 2} cy={top + dotsH - r - k * (2 * r + 2)} r={r} />
                )),
              )}
              {firstWin >= 0 && (
                <text className="label-win" x={x(firstWin) - 6} y={top + dotsH - r + 4} textAnchor="end">
                  {h.above_null.reduce((a, b) => a + b, 0)} neurons
                </text>
              )}
              <text className="label" x={padL + 4} y={base - band + 2}>Neurons</text>
              <text className="label" x={padL + 4} y={base + band - 2}>Random directions</text>
              {ticks.map((t) => (
                <text key={t} className="axis" x={padL + ((t - h.lo) / h.step) * bw} y={base + band + 18} textAnchor="middle">{t}</text>
              ))}
              <text className="axis" x={padL + (W - padL - padR) / 2} y={H - 4} textAnchor="middle">
                Theme score: z against the random directions of the same layer
              </text>
              {h.controls.map((_, i) => (
                <rect key={`h${i}`} x={x(i)} width={bw} y={0} height={H - 24} fill="transparent" onPointerEnter={() => setHover(i)} onPointerDown={() => setHover(i)} />
              ))}
            </svg>
          )}
          {tip}
        </div>
      )}
    </figure>
  );
}
