// Sidebar for a recorded model: hunt finalists by concept, the strongest contrast neurons, or jump to an id.

import { useMemo, useState } from "react";
import { nid, type NeuronRef } from "../lib/atlas";
import type { RecordedModel } from "../lib/recorded";
import { getState, openModel, setState } from "../store";
import { useListFromColour } from "./bits";
import { download, huntCsv } from "../lib/exportData";
import { DATA } from "../App";

type List = "finalists" | "evil" | "alien" | "shift-evil" | "shift-alien";

/** Accept "L14 N2210", "L14·N2210", "14/2210", "14:2210" or "14 2210". */
export function parseNeuronId(q: string, L: number, N: number): NeuronRef | null {
  const m = /^\s*L?(\d+)\s*[·:/,\s]\s*N?(\d+)\s*$/i.exec(q);
  if (!m) return null;
  const layer = Number(m[1]), neuron = Number(m[2]);
  return layer < L && neuron < N ? { layer, neuron } : null;
}

function topBy(sig: Float32Array, m: RecordedModel, k: number) {
  const idx = Array.from({ length: sig.length }, (_, i) => i).filter((i) => Number.isFinite(sig[i]));
  idx.sort((a, b) => sig[b] - sig[a]);
  return idx.slice(0, k).map((g) => ({ ...m.ref(g), score: sig[g] }));
}

export function ModelSidebar({ m }: { m: RecordedModel }) {
  const lists: { v: List; label: string; title: string }[] = [
    ...(m.hunt ? [{ v: "finalists" as const, label: "Hunt finalists", title: "Neurons confirmed at full precision" }] : []),
    ...(m.signals.d_evil ? [{ v: "evil" as const, label: "Evil contrast", title: "Fire more on evil than on matched neutral sentences" }] : []),
    ...(m.signals.d_alien ? [{ v: "alien" as const, label: "Alien contrast", title: "Fire more on alien than on matched neutral sentences" }] : []),
    ...(m.signals.dd_evil ? [{ v: "shift-evil" as const, label: "Evil shift", title: "Largest gain in evil contrast after fine-tuning" }] : []),
    ...(m.signals.dd_alien ? [{ v: "shift-alien" as const, label: "Alien shift", title: "Largest gain in alien contrast after fine-tuning" }] : []),
  ];
  const list = useListFromColour<List>((c) => {
    const v = c === "hunt" ? "finalists" : c;
    return lists.some((l) => l.v === v) ? (v as List) : null;
  }, lists[0]?.v ?? "evil");
  const [q, setQ] = useState("");
  const jump = parseNeuronId(q, m.L, m.N);

  const rows = useMemo(() => {
    if (list === "finalists" && m.hunt) {
      return [...m.hunt.finalists]
        .sort((a, b) => b.score - a.score)
        .map((f) => ({ layer: f.layer, neuron: f.neuron, score: f.score, concept: f.concept as string, label: f.screen.theme.slice(0, 3).join(", ") }));
    }
    const sig = ({ evil: m.signals.d_evil, alien: m.signals.d_alien, "shift-evil": m.signals.dd_evil, "shift-alien": m.signals.dd_alien } as Record<string, Float32Array | undefined>)[list];
    if (!sig) return [];
    return topBy(sig, m, 150).map((r) => ({ ...r, concept: list.replace("shift-", ""), label: m.label(r) }));
  }, [m, list]);

  const open = (r: NeuronRef) => openModel(m.entry.slug, r, m.finalist(r) ? "hunt" : "profile");

  return (
    <nav className="sidebar" aria-label="Find neurons">
      <div className="search">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (jump) open(jump);
          }}
        >
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Go to a neuron, e.g. L14 N2210" aria-label="Go to a neuron by layer and index" spellCheck={false} />
        </form>
        {q.trim() && (
          <p className="list-caption flush">
            {jump ? (
              <button className="link" onClick={() => open(jump)}>
                Open {nid(jump)}
              </button>
            ) : (
              `Type a layer from 0 to ${m.L - 1} and a neuron from 0 to ${m.N - 1}.`
            )}
          </p>
        )}
      </div>
      <p className="list-caption">
        {list === "finalists"
          ? `${rows.length} neurons confirmed at full precision, strongest first. Colour shows the concept each was screened for.`
          : list.startsWith("shift-")
            ? `Neurons whose ${list.slice(6)} contrast grew most after fine-tuning: Δd = d(fine-tuned) − d(base). A shift in firing is not evidence that the neuron steers toward the concept.`
            : `Neurons that fire more on ${list} sentences than on matched neutral ones, by Cohen's d. Firing on a concept is not the same as steering toward it.`}
      </p>
      <ol className="rows">
        {rows.map((r) => (
          <li key={`${r.layer}:${r.neuron}`}>
            <button
              className={`neuron-btn c-${r.concept}`}
              onClick={() => open(r)}
              onMouseEnter={() => setState({ hover: { layer: r.layer, neuron: r.neuron } })}
              onMouseLeave={() => getState().hover && setState({ hover: null })}
            >
              <span className="nid">{nid(r)}</span>
              <span className="nlabel">{r.label || "no clear theme"}</span>
              <span className="w">{list === "finalists" ? r.score.toFixed(1) : list.startsWith("shift-") ? `Δd ${r.score >= 0 ? "+" : ""}${r.score.toFixed(2)}` : `d ${r.score.toFixed(2)}`}</span>
            </button>
          </li>
        ))}
      </ol>
      {m.hunt && (
        <div className="side-foot">
          <button className="link" onClick={() => download(`${m.entry.slug}-hunt-finalists.csv`, huntCsv(m))}>Download finalists (CSV)</button>
          <a href={`${DATA}/models/${m.entry.slug}/hunt.json`} download>Full hunt record (JSON)</a>
        </div>
      )}
    </nav>
  );
}
