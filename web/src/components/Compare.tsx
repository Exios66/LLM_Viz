// Compare the open neuron with another one, side by side (the second neuron is ringed in violet on the map).

import { useState } from "react";
import { nid, type Atlas, type NeuronRef } from "../lib/atlas";
import type { Sweep } from "../lib/sweep";
import { openModel, setState, useStore } from "../store";
import { parseNeuronId } from "./ModelSidebar";
import { showToken } from "./bits";

export function CompareBox({ atlas, sweep, r }: { atlas: Atlas; sweep: Sweep | null; r: NeuronRef }) {
  const compare = useStore((s) => s.compare);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const target = parseNeuronId(q, atlas.L, atlas.N);
  if (!compare) {
    return open ? (
      <form
        className="compare-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (target) setState({ compare: target });
        }}
      >
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Neuron to compare, e.g. L5 N173" aria-label="Neuron to compare" autoFocus spellCheck={false} />
        <button type="submit" disabled={!target}>Compare</button>
        <button type="button" className="ghost" onClick={() => setOpen(false)}>Cancel</button>
      </form>
    ) : (
      <button className="link compare-open" onClick={() => setOpen(true)}>Compare with another neuron</button>
    );
  }
  const rows: [string, (x: NeuronRef) => string][] = [
    ["Peaks on", (x) => atlas.label(x)],
    ["Max activation", (x) => atlas.max[atlas.g(x)].toFixed(2)],
    ["Fires on", (x) => `${(atlas.density[atlas.g(x)] * 100).toFixed(1)}% of tokens`],
    ["Selectivity", (x) => `${Math.round(atlas.share[atlas.g(x)] * 100)}%`],
    ...(sweep
      ? ([
          ["Steering z", (x: NeuronRef) => sweep.stats(x).z.toFixed(1)],
          ["Beats random", (x: NeuronRef) => `${Math.round(sweep.stats(x).pct * 100)}%`],
          ["Pushing writes", (x: NeuronRef) => sweep.stats(x).themes.slice(0, 4).join(", ") || "no clear theme"],
        ] as [string, (x: NeuronRef) => string][])
      : []),
    ["Predicts", (x) => atlas.lens(x).promotes.slice(0, 4).map((t) => showToken(atlas.tok.str(t.id))).join(" ")],
  ];
  return (
    <div className="compare" aria-label={`Comparing ${nid(r)} with ${nid(compare)}`}>
      <table>
        <thead>
          <tr>
            <th scope="col"><span className="sr-only">Measure</span></th>
            <th scope="col">{nid(r)}</th>
            <th scope="col" className="cmp-b">
              <button className="link" onClick={() => openModel(null, compare)}>{nid(compare)}</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([k, f]) => (
            <tr key={k}>
              <th scope="row">{k}</th>
              <td>{f(r)}</td>
              <td>{f(compare)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="ghost" onClick={() => setState({ compare: null })}>End comparison</button>
    </div>
  );
}
