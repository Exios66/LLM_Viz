// Recorded model packs (ADR-005): any decoder-only model processed offline by pipeline/build_model.py.
// Nothing here runs a model; every number and every steered text was recorded by the pipeline.

import { fetchJson, loadPack, type Pack } from "./binpack";
import type { Link, NeuronRef } from "./atlas";

/** Token ids in a layer pack: u16 for small vocabularies, u32 for large ones (see build_model.py). */
type TokIds = Uint16Array | Uint32Array;

export interface ModelEntry {
  slug: string;
  label: string;
  hf: string;
  revision: string | null;
  layers: number;
  neurons: number;
  live: boolean;
  hunt: boolean;
}

export interface SpaceMeta {
  model: string;
  revision: string | null;
  slug: string;
  label: string;
  layers: number;
  neurons_per_layer: number;
  d_model: number;
  grid: number;
  texts: number;
  signals: string[];
  lens_k: number;
  ctx_k: number;
  sources: Record<string, string>;
}

interface LayerMeta {
  layer: number;
  lens_k: number;
  ctx_k: number;
  w_before: number;
  w_after: number;
}

export interface Context {
  act: number;
  tokens: string[];
  rel: number[]; // activation relative to the neuron's max, -1..1, NaN outside the text
  center: number;
}

export interface GridCell {
  text: string;
  coh: number;
}

export interface Finalist {
  layer: number;
  neuron: number;
  concept: "evil" | "alien" | "other";
  score: number;
  screen: { z: number; pct: number; above_null: boolean; theme: string[]; hits_evil: number; hits_alien: number; coh: number; why: string[] };
  grid: Record<string, GridCell[]>;
  steer_lens: { up: [string, number][]; down: [string, number][] };
  logit_lens: { up: string[]; down: string[] };
  ablation: { concept: string; d_nll_concept: number; d_nll_neutral: number; kl_concept: number; kl_neutral: number };
}

export interface Hunt {
  manifest: Record<string, unknown>;
  calib: { norms: number[]; windows: number[]; doses: number[]; coherence: number[][]; baseline: string[] };
  prompts: { id: string; label: string }[];
  baseline: string[];
  doses: number[];
  finalists: Finalist[];
  controls: Record<string, { grid: Record<string, GridCell[]> }>;
  families: Record<string, {
    members: string[]; prompt: string; base: string; ablated: string; hits_base: number; hits_ablated: number;
    d_nll_concept: number; d_nll_neutral: number; top: string; push_top: string; push_top_family_off: string;
  }>;
  scatter: { units: [number, number, number, number, number, number, number, string][]; controls: [number, number, number, number, number, number][] };
  lexicon: Record<string, string[]>;
  reference: { model: string; unit: string; prompt: string; quote: string; source: string };
}

const finite = (x: unknown): x is number => typeof x === "number" && Number.isFinite(x);

export class RecordedModel {
  readonly entry: ModelEntry;
  readonly meta: SpaceMeta;
  readonly L: number;
  readonly N: number;
  readonly layout: Float32Array;
  readonly max: Float32Array;
  readonly mean: Float32Array;
  readonly density: Float32Array;
  readonly share: Float32Array;
  readonly signals: Record<string, Float32Array> = {};
  hunt: Hunt | null = null;
  private vocab: string[];
  private base: string;
  private layers = new Map<number, Promise<Pack<LayerMeta>>>();
  private finalistIndex = new Map<number, Finalist>();

  private constructor(entry: ModelEntry, pack: Pack<SpaceMeta>, vocab: string[], base: string) {
    this.entry = entry;
    this.meta = pack.meta;
    this.L = pack.meta.layers;
    this.N = pack.meta.neurons_per_layer;
    this.base = base;
    this.vocab = vocab;
    const total = this.L * this.N;
    const need = (name: string, size: number) => {
      const a = pack.get(name);
      if (a.length !== size) throw new Error(`${entry.slug}: ${name} has ${a.length} values, expected ${size}`);
      return a;
    };
    this.layout = need("layout", total * 2);
    this.max = need("max", total);
    this.mean = need("mean", total);
    this.density = need("density", total);
    this.share = need("share", total);
    for (const s of pack.meta.signals ?? []) if (pack.shapes[s]) this.signals[s] = need(s, total);
  }

  static async registry(dataBase: string): Promise<ModelEntry[]> {
    const raw = await fetchJson<{ models?: unknown }>(`${dataBase}/models/index.json`);
    if (!raw || !Array.isArray(raw.models)) throw new Error("models/index.json has no model list");
    const out: ModelEntry[] = [];
    for (const m of raw.models as Record<string, unknown>[]) {
      if (!m || typeof m.slug !== "string" || !/^[a-z0-9.-]{1,64}$/.test(m.slug)) continue;
      if (!Number.isInteger(m.layers) || !Number.isInteger(m.neurons) || (m.layers as number) < 1 || (m.neurons as number) < 1) continue;
      out.push({
        slug: m.slug, label: typeof m.label === "string" ? m.label.slice(0, 60) : m.slug,
        hf: typeof m.hf === "string" ? m.hf : "", revision: typeof m.revision === "string" ? m.revision : null,
        layers: m.layers as number, neurons: m.neurons as number, live: false, hunt: m.hunt === true,
      });
    }
    return out;
  }

  static async load(dataBase: string, entry: ModelEntry, onProgress?: (f: number) => void): Promise<RecordedModel> {
    const base = `${dataBase}/models/${entry.slug}`;
    const f = (p: string) => fetch(p);
    const [pack, vocab] = await Promise.all([
      loadPack<SpaceMeta>(f, `${base}/space`, (l, t) => onProgress?.(t ? l / t : 0)),
      fetchJson<unknown>(`${base}/vocab.json`),
    ]);
    if (!Array.isArray(vocab) || vocab.some((v) => typeof v !== "string")) throw new Error(`${entry.slug}/vocab.json is not a list of strings`);
    if (pack.meta.layers !== entry.layers || pack.meta.neurons_per_layer !== entry.neurons) {
      throw new Error(`${entry.slug}: pack shape ${pack.meta.layers}×${pack.meta.neurons_per_layer} does not match the registry`);
    }
    const m = new RecordedModel(entry, pack, vocab as string[], base);
    if (entry.hunt) {
      try {
        m.hunt = sanitizeHunt(await fetchJson<unknown>(`${base}/hunt.json`), m.L, m.N);
        for (const x of m.hunt.finalists) m.finalistIndex.set(m.g(x), x);
      } catch (e) {
        console.warn(`hunt data unavailable: ${(e as Error).message}`);
        m.hunt = null;
      }
    }
    return m;
  }

  g(r: NeuronRef) {
    return r.layer * this.N + r.neuron;
  }

  ref(g: number): NeuronRef {
    return { layer: Math.floor(g / this.N), neuron: g % this.N };
  }

  links(_r: NeuronRef, _dir: "up" | "down"): Link[] {
    return [];
  }

  finalist(r: NeuronRef): Finalist | null {
    return this.finalistIndex.get(this.g(r)) ?? null;
  }

  token(id: number) {
    return id >= this.vocab.length ? "" : this.vocab[id] ?? ""; // ids past the vocabulary are the "no token" marker
  }

  private layer(l: number): Promise<Pack<LayerMeta>> {
    let p = this.layers.get(l);
    if (!p) {
      p = loadPack<LayerMeta>((u) => fetch(u), `${this.base}/L${l}`);
      p.catch(() => this.layers.delete(l)); // allow a retry after a failed download
      this.layers.set(l, p);
    }
    return p;
  }

  async lens(r: NeuronRef) {
    const p = await this.layer(r.layer);
    const k = p.meta.lens_k;
    const o = r.neuron * k;
    const up = p.get<TokIds>("lens_up"), dn = p.get<TokIds>("lens_dn");
    const upv = p.get("lens_up_v"), dnv = p.get("lens_dn_v");
    const list = (ids: TokIds, v: Float32Array) => Array.from({ length: k }, (_, i) => ({ tok: this.token(ids[o + i]), v: v[o + i] }));
    return { promotes: list(up, upv), suppresses: list(dn, dnv) };
  }

  async contexts(r: NeuronRef): Promise<Context[]> {
    const p = await this.layer(r.layer);
    const { ctx_k: K, w_before, w_after } = p.meta;
    const W = w_before + 1 + w_after;
    const toks = p.get<TokIds>("ctx_tok"), acts = p.get<Int8Array>("ctx_act"), vals = p.get("ctx_val");
    const out: Context[] = [];
    for (let k = 0; k < K; k++) {
      const o = (r.neuron * K + k) * W;
      const act = vals[r.neuron * K + k];
      if (!finite(act) || act <= -1e8) continue;
      const tokens: string[] = [], rel: number[] = [];
      for (let j = 0; j < W; j++) {
        const id = toks[o + j];
        tokens.push(this.token(id));
        rel.push(id >= this.vocab.length ? NaN : acts[o + j] / 127);
      }
      out.push({ act, tokens, rel, center: w_before });
    }
    return out;
  }

  label(r: NeuronRef) {
    const f = this.finalist(r);
    if (f?.screen.theme.length) return `steers toward ${f.screen.theme.slice(0, 3).join(", ")}`;
    return `fires on ${Math.round(this.density[this.g(r)] * 1000) / 10}% of tokens`;
  }
}

/** Validate hunt.json enough that the UI can trust indices and shapes. */
export function sanitizeHunt(raw: unknown, L: number, N: number): Hunt {
  if (!raw || typeof raw !== "object") throw new Error("hunt.json is not an object");
  const h = raw as Hunt;
  if (!Array.isArray(h.finalists) || !Array.isArray(h.doses) || !Array.isArray(h.prompts)) throw new Error("hunt.json is missing finalists, doses or prompts");
  if (!h.doses.every(finite)) throw new Error("hunt.json has non-numeric doses");
  const P = h.prompts.length;
  // Python writes dose keys as "1.0"; JavaScript reads String(1) as "1". Re-key every grid by numeric value.
  const rekey = (g: unknown): Record<string, GridCell[]> => {
    const out: Record<string, GridCell[]> = {};
    if (!g || typeof g !== "object") return out;
    for (const [k, v] of Object.entries(g as Record<string, GridCell[]>)) {
      const d = Number(k);
      if (Number.isFinite(d) && Array.isArray(v)) out[String(d)] = v.map((c) => ({ text: typeof c?.text === "string" ? c.text : "", coh: finite(c?.coh) ? c.coh : NaN }));
    }
    return out;
  };
  for (const f of h.finalists) if (f) f.grid = rekey(f.grid);
  const controls: Hunt["controls"] = {};
  for (const [k, v] of Object.entries(h.controls ?? {})) if (/^\d+$/.test(k)) controls[k] = { grid: rekey(v?.grid) };
  h.controls = controls;
  h.finalists = h.finalists.filter((f) =>
    f && Number.isInteger(f.layer) && Number.isInteger(f.neuron) && f.layer >= 0 && f.layer < L && f.neuron >= 0 && f.neuron < N &&
    f.grid && h.doses.every((d) => Array.isArray(f.grid[String(d)]) && f.grid[String(d)].length === P) &&
    ["evil", "alien", "other"].includes(f.concept));
  if (!Array.isArray(h.baseline) || h.baseline.length !== P) throw new Error("hunt.json baseline does not match the prompts");
  if (!h.scatter || !Array.isArray(h.scatter.units) || !Array.isArray(h.scatter.controls)) throw new Error("hunt.json has no screen scatter");
  h.scatter.units = h.scatter.units.filter((u) => Array.isArray(u) && u[0] >= 0 && u[0] < L && u[1] >= 0 && u[1] < N && finite(u[2]));
  h.scatter.controls = h.scatter.controls.filter((c) => Array.isArray(c) && c[0] >= 0 && c[0] < L && finite(c[2]));
  if (h.reference && !/^https:\/\//.test(h.reference.source ?? "")) h.reference.source = "";
  return h;
}
