// Steering-sweep results (pipeline/sweep.py → analyze.py): per-neuron uniqueness
// against random-direction controls, the rollouts themselves, the steer lens, the
// co-firing layout, and the curated findings.

import { fetchJson, loadPack, type Pack } from "./binpack";
import type { NeuronRef } from "./atlas";
import type { Edit } from "./model";

export interface SweepMeta {
  layers: number;
  neurons: number;
  n_ctrl: number;
  gen: number;
  prompts: string[];
  cells: [number, number][]; // [prompt index, dose as a multiple of the layer window]
  window: number[]; // per-layer coherent push, × residual norm
  resid_norm: number[];
  words: string[];
  calib: { doses: number[]; coherence: number[][] };
}

export interface UnitStats {
  z: number; // theme mass, z against the layer's random controls
  pct: number; // share of the layer's controls this unit beats (0..1)
  coherence: number; // distinct-4-gram ratio at +window
  consistency: number; // share of prompts where the top theme word appears
  rw: number; // overlap between what it writes and what it fires on (0..1)
  themes: string[];
}

export interface Rollout {
  prompt: string;
  dose: number; // × residual norm
  ids: number[];
}

export interface FindingCard {
  id: string;
  title: string;
  layer: number;
  neuron: number;
  kind: "concept" | "style" | "suppressor" | "control" | "reads-writes";
  summary: string;
  prompt: string;
  dose: number; // × residual norm
  baseline: string;
  steered: string;
  z: number;
  pct: number;
  rank: number;
  themes: string[];
}

export interface ReferenceCard {
  id: string;
  model: string;
  unit: string;
  title: string;
  quote: string;
  context: string;
  source: string;
}

export interface Findings {
  generated: string;
  headline: { neurons_above_null: number; neurons: number; controls_naive_theme: number; controls: number; neurons_naive_theme: number };
  layers: {
    layer: number;
    window: number;
    resid_norm: number;
    above_null: number; // share of neurons beating every control in the layer
    above_p95: number;
    rw_share: number; // share of above-null neurons that read what they write
    coherence: number;
    lens_agreement: number; // logit-lens vs steer-lens top-12 overlap
    kl_median: number;
    neighbour_cofire: { writes: number; cofire: number; random: number };
  }[];
  cards: FindingCard[];
  reference: ReferenceCard[];
  notes: { title: string; body: string }[];
  /** Counts on shared z bins: neurons beating every control in their layer, the other neurons, the controls. */
  score_hist?: { lo: number; step: number; above_null: number[]; neurons: number[]; controls: number[] };
}

const str = (x: unknown, max = 2000) => (typeof x === "string" ? x.slice(0, max) : "");
const num = (x: unknown) => (typeof x === "number" && Number.isFinite(x) ? x : NaN);
const KINDS = new Set(["concept", "style", "suppressor", "control", "reads-writes"]);

function sanitizeHist(raw: unknown): Findings["score_hist"] {
  const h = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const counts = (x: unknown) => (Array.isArray(x) && x.length > 0 && x.length <= 200 && x.every((v) => Number.isInteger(v) && v >= 0) ? (x as number[]) : null);
  const a = counts(h.above_null), n = counts(h.neurons), c = counts(h.controls);
  const lo = num(h.lo), step = num(h.step);
  if (!a || !n || !c || a.length !== n.length || n.length !== c.length || !Number.isFinite(lo) || !(step > 0)) return undefined;
  return { lo, step, above_null: a, neurons: n, controls: c };
}

/** findings.json is generated, but treat it as untrusted input: drop malformed entries. */
export function sanitizeFindings(raw: unknown, m: { layers: number; neurons: number }): Findings {
  const f = (raw && typeof raw === "object" ? raw : {}) as Partial<Findings>;
  const cards = (Array.isArray(f.cards) ? f.cards : []).filter(
    (c): c is FindingCard =>
      !!c && typeof c === "object" && /^[a-z0-9-]{1,64}$/.test(String(c.id)) && Number.isInteger(c.layer) && Number.isInteger(c.neuron) &&
      c.layer >= 0 && c.layer < m.layers && c.neuron >= 0 && c.neuron < m.neurons && KINDS.has(c.kind) && typeof c.prompt === "string" && Number.isFinite(c.dose),
  ).map((c) => ({
    ...c,
    title: str(c.title, 120), summary: str(c.summary), baseline: str(c.baseline), steered: str(c.steered),
    z: num(c.z), pct: num(c.pct), rank: Number.isInteger(c.rank) ? c.rank : 0,
    themes: Array.isArray(c.themes) ? c.themes.filter((t) => typeof t === "string").slice(0, 8) : [],
  }));
  const h = (f.headline ?? {}) as Partial<Findings["headline"]>;
  const n0 = (x: unknown) => (typeof x === "number" && Number.isFinite(x) && x >= 0 ? x : 0);
  return {
    generated: str(f.generated, 40),
    headline: {
      neurons_above_null: n0(h.neurons_above_null), neurons: n0(h.neurons), controls_naive_theme: n0(h.controls_naive_theme),
      controls: n0(h.controls), neurons_naive_theme: n0(h.neurons_naive_theme),
    },
    layers: Array.isArray(f.layers) && f.layers.length === m.layers ? f.layers : [],
    cards,
    reference: (Array.isArray(f.reference) ? f.reference : []).filter((r) => r && typeof r.id === "string" && /^https:\/\//.test(String(r.source))),
    notes: (Array.isArray(f.notes) ? f.notes : []).filter((n) => n && typeof n.title === "string" && typeof n.body === "string"),
    score_hist: sanitizeHist(f.score_hist),
  };
}

export class Sweep {
  readonly meta: SweepMeta;
  private p: Pack<SweepMeta>;
  readonly findings: Findings;
  readonly cofire: Float32Array;
  private colNorm: Float32Array;

  constructor(pack: Pack<SweepMeta>, findings: Findings) {
    this.p = pack;
    this.meta = pack.meta;
    const m = pack.meta;
    if (!m || !Number.isInteger(m.layers) || !Number.isInteger(m.neurons) || !Array.isArray(m.prompts) || !Array.isArray(m.window) || m.window.length !== m.layers)
      throw new Error("sweep.json has an unexpected format");
    const LN = m.layers * m.neurons;
    const need: [string, number][] = [["n_z", LN], ["n_pct", LN], ["col_norm", LN], ["cofire_layout", LN * 2], ["n_theme", LN * 5], ["sl_kl", LN * 2]];
    for (const [k, n] of need) {
      const sh = pack.shapes[k];
      if (!sh || sh.reduce((a, b) => a * b, 1) !== n) throw new Error(`sweep pack: array "${k}" is missing or the wrong size`);
    }
    this.findings = sanitizeFindings(findings, m);
    this.cofire = pack.get("cofire_layout");
    this.colNorm = pack.get("col_norm");
  }

  /** Only what Home needs: the findings, checked against the sweep's shape. About 40 KB instead of the 9 MB pack. */
  static async loadFindings(base: string): Promise<{ findings: Findings; meta: SweepMeta }> {
    const [manifest, raw] = await Promise.all([fetchJson<{ meta: SweepMeta }>(`${base}/sweep.json`), fetchJson<Findings>(`${base}/findings.json`)]);
    if (!manifest?.meta) throw new Error("sweep.json is not a pack manifest");
    return { findings: sanitizeFindings(raw, manifest.meta), meta: manifest.meta };
  }

  static async load(base: string) {
    const fetcher = (p: string) => fetch(p);
    const [pack, findings] = await Promise.all([
      loadPack<SweepMeta>(fetcher, `${base}/sweep`),
      fetchJson<Findings>(`${base}/findings.json`),
    ]);
    return new Sweep(pack, findings);
  }

  private g(r: NeuronRef) {
    return r.layer * this.meta.neurons + r.neuron;
  }

  /** An "add" edit that pushes the residual stream by `dose` × the layer's median norm. */
  doseEdit(r: NeuronRef, dose: number): Edit {
    const unit = this.meta.resid_norm[r.layer] / Math.max(this.colNorm[this.g(r)], 1e-6);
    return { layer: r.layer, neuron: r.neuron, mode: "add", value: dose, maxAct: unit, unit: "resid", enabled: true };
  }

  window(layer: number) {
    return this.meta.window[layer];
  }

  private themes(arr: Uint16Array, i: number): string[] {
    const out: string[] = [];
    for (let k = 0; k < 5; k++) {
      const w = arr[i * 5 + k];
      if (w !== 65535 && this.meta.words[w]) out.push(this.meta.words[w]);
    }
    return out;
  }

  stats(r: NeuronRef): UnitStats {
    const i = this.g(r);
    return {
      z: this.p.get("n_z")[i],
      pct: this.p.get("n_pct")[i],
      coherence: this.p.get("n_coh")[i],
      consistency: this.p.get("n_cons")[i],
      rw: this.p.get("n_rw")[i],
      themes: this.themes(this.p.get<Uint16Array>("n_theme"), i),
    };
  }

  controlStats(layer: number, c: number): UnitStats {
    const i = layer * this.meta.n_ctrl + c;
    return {
      z: this.p.get("c_z")[i],
      pct: NaN,
      coherence: this.p.get("c_coh")[i],
      consistency: this.p.get("c_cons")[i],
      rw: NaN,
      themes: this.themes(this.p.get<Uint16Array>("c_theme"), i),
    };
  }

  /** All neurons' and controls' (z, coherence) in one layer, for the phase plot. */
  layerScatter(layer: number) {
    const N = this.meta.neurons, C = this.meta.n_ctrl;
    return {
      nz: this.p.get("n_z").subarray(layer * N, (layer + 1) * N),
      ncoh: this.p.get("n_coh").subarray(layer * N, (layer + 1) * N),
      cz: this.p.get("c_z").subarray(layer * C, (layer + 1) * C),
      ccoh: this.p.get("c_coh").subarray(layer * C, (layer + 1) * C),
    };
  }

  private rollIds(layer: number, unit: number, cell: number): number[] {
    const { neurons: N, n_ctrl: C, cells, gen: G } = this.meta;
    const U = N + C;
    const arr = this.p.get<Uint16Array>("roll");
    const o = ((layer * U + unit) * cells.length + cell) * G;
    const ids: number[] = [];
    for (let t = 0; t < G; t++) {
      const v = arr[o + t];
      if (v === 65535) break;
      ids.push(v);
    }
    return ids;
  }

  rollouts(r: NeuronRef, control = false): Rollout[] {
    const unit = control ? this.meta.neurons + r.neuron : r.neuron;
    return this.meta.cells.map(([pi, s], ci) => ({
      prompt: this.meta.prompts[pi],
      dose: s * this.meta.window[r.layer],
      ids: this.rollIds(r.layer, unit, ci),
    }));
  }

  baseline(promptIndex: number): number[] {
    const G = this.meta.gen;
    const arr = this.p.get<Uint16Array>("base");
    const ids: number[] = [];
    for (let t = 0; t < G; t++) {
      const v = arr[promptIndex * G + t];
      if (v === 65535) break;
      ids.push(v);
    }
    return ids;
  }

  /** Next-token Δprobability under a +window (up) and −window (down) push, averaged over 4 contexts. */
  steerLens(r: NeuronRef) {
    const i = this.g(r);
    const pole = (ids: string, vals: string) => {
      const a = this.p.get<Uint16Array>(ids), b = this.p.get(vals);
      return Array.from({ length: 12 }, (_, k) => ({ id: a[i * 12 + k], v: b[i * 12 + k] })).filter((x) => x.id !== 65535);
    };
    const kl = this.p.get("sl_kl");
    return { up: pole("sl_up_ids", "sl_up_val"), down: pole("sl_dn_ids", "sl_dn_val"), klUp: kl[i * 2], klDown: kl[i * 2 + 1] };
  }

  /** Neurons ranked by uniqueness (z against controls), optionally in one layer. */
  ranked(layer: number | null, limit = 300): (NeuronRef & { z: number })[] {
    const N = this.meta.neurons;
    const z = this.p.get("n_z");
    const out: (NeuronRef & { z: number })[] = [];
    for (let g = 0; g < z.length; g++) {
      const l = Math.floor(g / N);
      if (layer !== null && l !== layer) continue;
      out.push({ layer: l, neuron: g % N, z: z[g] });
    }
    return out.sort((a, b) => b.z - a.z).slice(0, limit);
  }

  /** Rank of a neuron among all neurons by z (1 = most unique). */
  rankOf(r: NeuronRef): number {
    const z = this.p.get("n_z");
    const mine = z[this.g(r)];
    let rank = 1;
    for (let g = 0; g < z.length; g++) if (z[g] > mine) rank++;
    return rank;
  }

  zArray() {
    return this.p.get("n_z");
  }
}
