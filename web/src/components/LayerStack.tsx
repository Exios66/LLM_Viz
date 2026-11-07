// Home's hero figure: the model drawn as a stack of eight neuron sheets, the residual stream running up through them.
// When `pulsed` turns on, a push travels up the stream, the focus neuron (from the data) flares, and the rest of the
// stream above it lights in the excite colour (ADR-006's one orchestrated moment). Plain SVG and CSS: no three.js on Home.
// Reduced motion shows the final, lit state at once.

import { memo, useId, useMemo } from "react";
import { mulberry32 } from "../lib/model"; // seeded, so the dots sit in the same place in every render and screenshot

const W = 640, H = 460;
const CX = 300; // the stream runs straight up through every sheet's centre
const GAP = 47; // vertical distance between sheets
const BASE = 392; // centre of layer 0

/** Sheet-local (u, v) in [-1, 1]² to figure coordinates: u runs right and slightly up, v runs back and to the right. */
const at = (l: number, u: number, v: number): [number, number] => [CX + 150 * u + 62 * v, BASE - l * GAP - 9 * u + 25 * v];

const sheetPath = (l: number) => {
  const c = [at(l, -1, -1), at(l, 1, -1), at(l, 1, 1), at(l, -1, 1)];
  return `M${c.map((p) => p.map((x) => x.toFixed(1)).join(" ")).join("L")}Z`;
};

interface Dot { x: number; y: number; r: number; o: number; hot: boolean }

/** `focus` is the recorded push to draw (the villain card's layer and neuron); until it loads, the stack is drawn plain.
 *  Memoised: Home re-renders while its text writes out, and nothing here changes then. */
export const LayerStack = memo(function LayerStack({ layers = 8, focus, pulsed }: { layers?: number; focus: { layer: number; neuron: number } | null; pulsed: boolean }) {
  // one gradient id per instance, so two stacks on a page never share an id ("·r1·"-style ids are not valid in url())
  const flareId = `stack-flare-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const dots = useMemo(() => {
    const rnd = mulberry32(179);
    const out: Dot[][] = [];
    for (let l = 0; l < layers; l++) {
      const row: Dot[] = [];
      for (let i = 0; i < 64; i++) {
        const u = rnd() * 1.84 - 0.92, v = rnd() * 1.76 - 0.88;
        if (Math.abs(u) < 0.09 && Math.abs(v) < 0.14) continue; // keep the stream's crossing clear
        const [x, y] = at(l, u, v);
        const e = rnd() ** 3; // most neurons are quiet; a few are bright
        row.push({ x, y, r: 0.9 + e * 2.1, o: 0.22 + e * 0.7, hot: e > 0.42 });
      }
      out.push(row);
    }
    return out;
  }, [layers]);

  const f = focus && focus.layer >= 0 && focus.layer < layers ? focus : null;
  const top = BASE - (layers - 1) * GAP;
  const streamBottom = BASE + 52, streamTop = top - 44;
  const [fx, fy] = f ? at(f.layer, 0, 0) : [CX, 0];
  const lower = streamBottom - fy, upper = fy - streamTop;
  const label =
    `A diagram of the model's ${layers} layers stacked bottom to top, with the residual stream running up through them.` +
    (f ? ` A push enters at neuron ${f.neuron} in layer ${f.layer} and lights the stream from there to the output.` : "");

  return (
    <figure className={`stack-fig${pulsed && f ? " pulsed" : ""}`}>
      <svg viewBox={`44 0 ${W - 44} ${H}`} role="img" aria-label={label}>
        <defs>
          {/* stop colours come from the stylesheet: var() in presentation attributes is not resolved everywhere */}
          <radialGradient id={flareId}>
            <stop className="flare-stop" offset="0" stopOpacity="0.55" />
            <stop className="flare-stop" offset="1" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* the residual stream, drawn first so every sheet sits over it */}
        <line className="stream" x1={CX} y1={streamBottom} x2={CX} y2={streamTop} />
        {f && (
          <>
            <line className="stream-lit lower" x1={CX} y1={streamBottom} x2={CX} y2={fy} style={{ strokeDasharray: lower, strokeDashoffset: lower }} />
            <line className="stream-lit upper" x1={CX} y1={fy} x2={CX} y2={streamTop} style={{ strokeDasharray: upper, strokeDashoffset: upper }} />
          </>
        )}

        {dots.map((row, l) => (
          <g key={l} className={`sheet${f && l === f.layer ? " focus" : ""}`}>
            <path className="plate" d={sheetPath(l)} />
            {row.map((d, i) => (
              <circle key={i} className={d.hot ? "dot hot" : "dot"} cx={d.x} cy={d.y} r={d.r} style={{ opacity: d.o }} />
            ))}
            <text className="sheet-label" x={at(l, -1, -1)[0] - 14} y={at(l, -1, -1)[1] + 4} textAnchor="end">
              L{l}
            </text>
          </g>
        ))}

        {f && (
          <>
            {/* the focus neuron and its flare */}
            <circle className="flare" cx={fx} cy={fy} r={46} fill={`url(#${flareId})`} />
            <circle className="ring" cx={fx} cy={fy} r={9} />
            <circle className="focus-dot" cx={fx} cy={fy} r={4.2} />
            <circle className="packet" cx={CX} cy={streamBottom} r={3.6} style={{ ["--travel" as string]: `${streamTop - streamBottom}px` }} />
            <g className="callout">
              <polyline points={`${fx + 11},${fy} ${fx + 120},${fy - 46} ${W - 96},${fy - 46}`} />
              <text x={W - 90} y={fy - 50}>Neuron {f.neuron}</text>
              <text className="sub" x={W - 90} y={fy - 34}>pushed here</text>
            </g>
          </>
        )}
        <g className="io">
          <text x={CX + 12} y={streamBottom - 2}>Prompt in</text>
          <text x={CX + 12} y={streamTop + 10}>Next token out</text>
        </g>
      </svg>
    </figure>
  );
});
