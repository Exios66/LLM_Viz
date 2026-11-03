import { useMemo, useState } from "react";
import type { Atlas } from "../lib/atlas";
import { NeuronButton, Seg } from "./bits";

export function Sidebar({ atlas }: { atlas: Atlas }) {
  const [q, setQ] = useState("");
  const [by, setBy] = useState<"fires" | "lens">("fires");
  const [layer, setLayer] = useState<number | "all">("all");

  const rows = useMemo(() => {
    if (q.trim()) {
      const hits = atlas.search(q, by, 300);
      return layer === "all" ? hits : hits.filter((h) => h.layer === layer);
    }
    return atlas.ranked(layer === "all" ? null : layer, 200).map((r) => ({ ...r, score: NaN }));
  }, [atlas, q, by, layer]);

  return (
    <nav className="sidebar" aria-label="Find neurons">
      <div className="search">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={by === "fires" ? "Find neurons that fire on a word…" : "Find neurons that predict a word…"}
          aria-label="Search neurons by word"
          spellCheck={false}
        />
        <Seg
          label="Search by"
          value={by}
          onChange={setBy}
          options={[
            { v: "fires", label: "fires on", title: "The word sits at the peak of the neuron's top contexts" },
            { v: "lens", label: "predicts", title: "The word is in the neuron's logit lens, either pole" },
          ]}
        />
        <select value={layer} onChange={(e) => setLayer(e.target.value === "all" ? "all" : Number(e.target.value))} aria-label="Layer">
          <option value="all">All layers</option>
          {Array.from({ length: atlas.L }, (_, l) => (
            <option key={l} value={l}>
              Layer {l}
            </option>
          ))}
        </select>
      </div>
      <p className="list-caption">
        {q.trim()
          ? rows.length
            ? `${rows.length} neuron${rows.length > 1 ? "s" : ""} ${by === "fires" ? "fire on" : "predict"} “${q.trim()}”`
            : `No neuron ${by === "fires" ? "peaks on" : "predicts"} “${q.trim()}”. Try a common story word such as “dog” or “happy”.`
          : "Most selective neurons first"}
      </p>
      <ol className="rows">
        {rows.map((r) => (
          <li key={`${r.layer}:${r.neuron}`}>
            <NeuronButton
              r={r}
              atlas={atlas}
              extra={Number.isFinite(r.score) ? <span className="w">{by === "fires" ? `${Math.round(r.score * 100)}%` : r.score.toFixed(1)}</span> : undefined}
            />
          </li>
        ))}
      </ol>
    </nav>
  );
}
