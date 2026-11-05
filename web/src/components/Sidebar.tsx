import { useMemo, useState } from "react";
import type { Atlas } from "../lib/atlas";
import { useStore } from "../store";
import type { Sweep } from "../lib/sweep";
import type { NeuronRef } from "../lib/atlas";

function themeLabel(sweep: Sweep, r: NeuronRef, atlas: Atlas) {
  const t = sweep.stats(r).themes;
  return t.length ? `writes ${t.slice(0, 3).join(", ")}` : atlas.label(r);
}
import { NeuronButton, Seg } from "./bits";

export function Sidebar({ atlas }: { atlas: Atlas }) {
  const [q, setQ] = useState("");
  const [by, setBy] = useState<"fires" | "lens">("fires");
  const [layer, setLayer] = useState<number | "all">("all");
  const sweep = useStore((s) => s.sweep);
  const [rank, setRank] = useState<"unique" | "selective">("unique");
  const byUnique = !!sweep && rank === "unique";

  const rows = useMemo(() => {
    if (q.trim()) {
      const hits = atlas.search(q, by, Infinity); // filter by layer before capping, or a layer's matches can be cut off
      return (layer === "all" ? hits : hits.filter((h) => h.layer === layer)).slice(0, 300);
    }
    if (byUnique) return sweep!.ranked(layer === "all" ? null : layer, 200).map((r) => ({ ...r, score: r.z }));
    return atlas.ranked(layer === "all" ? null : layer, 200).map((r) => ({ ...r, score: NaN }));
  }, [atlas, sweep, byUnique, q, by, layer]);

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
          : byUnique
            ? "Neurons whose steering is least like a random push, first. z against 256 random directions in the same layer."
            : "Most selective neurons first"}
      </p>
      {sweep && !q.trim() && (
        <div className="rank-by">
          <Seg
            label="Rank neurons by"
            value={rank}
            onChange={setRank}
            options={[
              { v: "unique", label: "Steering", title: "How distinctive the text becomes when the neuron is pushed" },
              { v: "selective", label: "Selectivity", title: "How concentrated its top contexts are on one token" },
            ]}
          />
        </div>
      )}
      <ol className="rows">
        {rows.map((r) => (
          <li key={`${r.layer}:${r.neuron}`}>
            <NeuronButton
              r={r}
              atlas={atlas}
              label={byUnique && !q.trim() ? themeLabel(sweep!, r, atlas) : undefined}
              extra={
                Number.isFinite(r.score) ? (
                  <span className="w">{q.trim() ? (by === "fires" ? `${Math.round(r.score * 100)}%` : r.score.toFixed(1)) : `z ${r.score.toFixed(1)}`}</span>
                ) : undefined
              }
            />
          </li>
        ))}
      </ol>
    </nav>
  );
}
