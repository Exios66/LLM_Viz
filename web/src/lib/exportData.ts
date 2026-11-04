// CSV / JSON export of the public data, so every number on the site can be checked elsewhere.

import type { Atlas } from "./atlas";
import type { Sweep } from "./sweep";
import type { RecordedModel } from "./recorded";

/** RFC 4180 field: quote when needed, double inner quotes, and defuse spreadsheet formulas. */
export function csvField(v: unknown): string {
  let s = v === null || v === undefined ? "" : typeof v === "number" ? (Number.isFinite(v) ? String(+v.toFixed(6)) : "") : String(v);
  if (/^[=+\-@\t\r]/.test(s) && !/^-?\d/.test(s)) s = `'${s}`;
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function toCsv(head: string[], rows: unknown[][]): string {
  return [head, ...rows].map((r) => r.map(csvField).join(",")).join("\r\n") + "\r\n";
}

export function download(name: string, text: string, type = "text/csv;charset=utf-8") {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** One row per TinyStories neuron: corpus statistics and steering results. */
export function liveNeuronCsv(atlas: Atlas, sweep: Sweep | null): string {
  const head = ["layer", "neuron", "max_activation", "firing_rate", "selectivity", "peak_tokens", "steer_z", "beats_controls_share", "above_null", "themes", "logit_lens_top"];
  const rows: unknown[][] = [];
  for (let l = 0; l < atlas.L; l++)
    for (let n = 0; n < atlas.N; n++) {
      const r = { layer: l, neuron: n };
      const g = atlas.g(r);
      const st = sweep?.stats(r);
      rows.push([l, n, atlas.max[g], atlas.density[g], atlas.share[g], atlas.label(r), st?.z ?? "", st?.pct ?? "", st ? st.pct >= 1 : "",
        st?.themes.join(" ") ?? "", atlas.lens(r).promotes.slice(0, 5).map((x) => atlas.tok.str(x.id).trim()).join(" ")]);
    }
  return toCsv(head, rows);
}

/** One row per hunt finalist of a recorded model, with the recorded text at +1 window on the first prompt. */
export function huntCsv(m: RecordedModel): string {
  const h = m.hunt;
  if (!h) return "";
  const head = ["layer", "neuron", "concept", "score", "screen_z", "screen_beats_controls", "hits_evil", "hits_alien", "themes",
    "ablation_d_nll_concept", "ablation_d_nll_neutral", "text_plus1_window_prompt1"];
  const rows = h.finalists.map((f) => [f.layer, f.neuron, f.concept, f.score, f.screen.z, f.screen.pct, f.screen.hits_evil, f.screen.hits_alien,
    f.screen.theme.join(" "), f.ablation.d_nll_concept, f.ablation.d_nll_neutral, f.grid["1"]?.[0]?.text ?? ""]);
  return toCsv(head, rows);
}
