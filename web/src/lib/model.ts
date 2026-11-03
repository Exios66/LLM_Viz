// A from-scratch GPT-Neo forward pass in plain TypeScript, with hooks on every
// MLP neuron. Runs one token at a time with a KV cache, which is plenty fast for
// an 8M-parameter model and makes per-token activation capture trivial.

import type { Pack } from "./binpack";

export interface ModelMeta {
  name: string;
  d_model: number;
  n_layers: number;
  n_heads: number;
  d_mlp: number;
  vocab: number;
  max_pos: number;
  window: number;
  attention_layers: ("global" | "local")[];
  ln_eps: number;
  eos: number;
}

/** An edit to one neuron, applied to its post-GELU activation at every position.
 *  `add`: act += value · maxAct   (steer)
 *  `set`: act  = value · maxAct   (clamp; value 0 ablates)
 *  `scale`: act *= value          (amplify / dampen) */
export interface Edit {
  layer: number;
  neuron: number;
  mode: "add" | "set" | "scale";
  value: number;
  /** the neuron's max activation over the atlas corpus, used to scale add/set */
  maxAct: number;
  enabled?: boolean;
}

interface Layer {
  ln1w: Float32Array; ln1b: Float32Array;
  q: Float32Array; k: Float32Array; v: Float32Array;
  o: Float32Array; ob: Float32Array;
  ln2w: Float32Array; ln2b: Float32Array;
  fc: Float32Array; fcb: Float32Array;
  proj: Float32Array; projb: Float32Array;
  local: boolean;
}

function matvec(W: Float32Array, x: Float32Array, out: Float32Array, rows: number, cols: number, bias?: Float32Array) {
  for (let r = 0; r < rows; r++) {
    let s = bias ? bias[r] : 0;
    const o = r * cols;
    let c = 0;
    for (; c + 3 < cols; c += 4) {
      s += W[o + c] * x[c] + W[o + c + 1] * x[c + 1] + W[o + c + 2] * x[c + 2] + W[o + c + 3] * x[c + 3];
    }
    for (; c < cols; c++) s += W[o + c] * x[c];
    out[r] = s;
  }
}

function layerNorm(x: Float32Array, w: Float32Array, b: Float32Array, out: Float32Array, eps: number) {
  const n = x.length;
  let mean = 0;
  for (let i = 0; i < n; i++) mean += x[i];
  mean /= n;
  let v = 0;
  for (let i = 0; i < n; i++) v += (x[i] - mean) ** 2;
  const inv = 1 / Math.sqrt(v / n + eps);
  for (let i = 0; i < n; i++) out[i] = (x[i] - mean) * inv * w[i] + b[i];
}

const GELU_C = Math.sqrt(2 / Math.PI);
const gelu = (x: number) => 0.5 * x * (1 + Math.tanh(GELU_C * (x + 0.044715 * x * x * x)));

export class Model {
  readonly meta: ModelMeta;
  private wte: Float32Array;
  private wpe: Float32Array;
  private layers: Layer[];
  private lnfw: Float32Array;
  private lnfb: Float32Array;

  constructor(pack: Pack<ModelMeta>) {
    this.meta = pack.meta;
    this.wte = pack.get("wte");
    this.wpe = pack.get("wpe");
    this.layers = Array.from({ length: this.meta.n_layers }, (_, l) => ({
      ln1w: pack.get(`h${l}.ln1.w`), ln1b: pack.get(`h${l}.ln1.b`),
      q: pack.get(`h${l}.q`), k: pack.get(`h${l}.k`), v: pack.get(`h${l}.v`),
      o: pack.get(`h${l}.o`), ob: pack.get(`h${l}.o.b`),
      ln2w: pack.get(`h${l}.ln2.w`), ln2b: pack.get(`h${l}.ln2.b`),
      fc: pack.get(`h${l}.fc`), fcb: pack.get(`h${l}.fc.b`),
      proj: pack.get(`h${l}.proj`), projb: pack.get(`h${l}.proj.b`),
      local: this.meta.attention_layers[l] === "local",
    }));
    this.lnfw = pack.get("lnf.w");
    this.lnfb = pack.get("lnf.b");
  }

  session(edits: Edit[] = []) {
    return new Session(this, edits);
  }

  /** @internal */ get _w() {
    return { wte: this.wte, wpe: this.wpe, layers: this.layers, lnfw: this.lnfw, lnfb: this.lnfb };
  }
}

/** One running sequence: KV cache plus the edits applied to it. */
export class Session {
  readonly pos: number[] = [];
  private kc: Float32Array[];
  private vc: Float32Array[];
  private edits: Map<number, Edit[]>; // layer -> edits
  private x: Float32Array;
  private h: Float32Array;
  private q: Float32Array;
  private att: Float32Array;
  private tmp: Float32Array;
  private mlp: Float32Array;
  private scores: Float32Array;
  readonly logits: Float32Array;
  len = 0;

  constructor(private model: Model, edits: Edit[]) {
    const m = model.meta;
    this.kc = Array.from({ length: m.n_layers }, () => new Float32Array(m.max_pos * m.d_model));
    this.vc = Array.from({ length: m.n_layers }, () => new Float32Array(m.max_pos * m.d_model));
    this.edits = new Map();
    for (const e of edits) {
      if (e.enabled === false) continue;
      if (!this.edits.has(e.layer)) this.edits.set(e.layer, []);
      this.edits.get(e.layer)!.push(e);
    }
    this.x = new Float32Array(m.d_model);
    this.h = new Float32Array(m.d_model);
    this.q = new Float32Array(m.d_model);
    this.att = new Float32Array(m.d_model);
    this.tmp = new Float32Array(m.d_model);
    this.mlp = new Float32Array(m.d_mlp);
    this.scores = new Float32Array(m.max_pos);
    this.logits = new Float32Array(m.vocab);
  }

  get full() {
    return this.len >= this.model.meta.max_pos;
  }

  /** Feed one token. `actsOut`, if given, receives [n_layers * d_mlp] post-edit
   *  activations; `preOut` the same before edits. Computes logits if asked. */
  step(token: number, opts: { actsOut?: Float32Array; preOut?: Float32Array; logits?: boolean } = {}) {
    const m = this.model.meta;
    const { wte, wpe, layers, lnfw, lnfb } = this.model._w;
    const D = m.d_model, H = m.n_heads, hd = D / H, N = m.d_mlp;
    const t = this.len;
    if (t >= m.max_pos) throw new Error("context full");
    const { x, h, q, att, tmp, mlp, scores } = this;
    for (let i = 0; i < D; i++) x[i] = wte[token * D + i] + wpe[t * D + i];

    for (let l = 0; l < layers.length; l++) {
      const L = layers[l];
      layerNorm(x, L.ln1w, L.ln1b, h, m.ln_eps);
      matvec(L.q, h, q, D, D);
      const kc = this.kc[l], vc = this.vc[l];
      matvec(L.k, h, kc.subarray(t * D, (t + 1) * D), D, D);
      matvec(L.v, h, vc.subarray(t * D, (t + 1) * D), D, D);
      const start = L.local ? Math.max(0, t - m.window + 1) : 0;
      for (let hh = 0; hh < H; hh++) {
        const ho = hh * hd;
        let mx = -Infinity;
        for (let s = start; s <= t; s++) {
          let d = 0;
          const ko = s * D + ho;
          for (let i = 0; i < hd; i++) d += q[ho + i] * kc[ko + i];
          scores[s] = d; // GPT-Neo does not scale by 1/sqrt(head_dim)
          if (d > mx) mx = d;
        }
        let z = 0;
        for (let s = start; s <= t; s++) {
          const e = Math.exp(scores[s] - mx);
          scores[s] = e;
          z += e;
        }
        for (let i = 0; i < hd; i++) att[ho + i] = 0;
        for (let s = start; s <= t; s++) {
          const p = scores[s] / z;
          const vo = s * D + ho;
          for (let i = 0; i < hd; i++) att[ho + i] += p * vc[vo + i];
        }
      }
      matvec(L.o, att, tmp, D, D, L.ob);
      for (let i = 0; i < D; i++) x[i] += tmp[i];

      layerNorm(x, L.ln2w, L.ln2b, h, m.ln_eps);
      matvec(L.fc, h, mlp, N, D, L.fcb);
      for (let i = 0; i < N; i++) mlp[i] = gelu(mlp[i]);
      if (opts.preOut) opts.preOut.set(mlp, l * N);
      const ed = this.edits.get(l);
      if (ed) {
        for (const e of ed) {
          const a = mlp[e.neuron];
          mlp[e.neuron] = e.mode === "add" ? a + e.value * e.maxAct : e.mode === "set" ? e.value * e.maxAct : a * e.value;
        }
      }
      if (opts.actsOut) opts.actsOut.set(mlp, l * N);
      matvec(L.proj, mlp, tmp, D, N, L.projb);
      for (let i = 0; i < D; i++) x[i] += tmp[i];
    }
    this.len++;
    this.pos.push(token);
    if (opts.logits) {
      layerNorm(x, lnfw, lnfb, h, m.ln_eps);
      matvec(wte, h, this.logits, m.vocab, D);
    }
  }
}

export function logSoftmax(logits: Float32Array, temperature = 1): Float32Array {
  const out = new Float32Array(logits.length);
  let mx = -Infinity;
  for (let i = 0; i < logits.length; i++) if (logits[i] > mx) mx = logits[i];
  let z = 0;
  for (let i = 0; i < logits.length; i++) z += Math.exp((logits[i] - mx) / temperature);
  const lz = Math.log(z);
  for (let i = 0; i < logits.length; i++) out[i] = (logits[i] - mx) / temperature - lz;
  return out;
}

export function topK(values: Float32Array, k: number): { ids: number[]; vals: number[] } {
  const ids: number[] = [];
  const vals: number[] = [];
  for (let i = 0; i < values.length; i++) {
    const v = values[i];
    if (ids.length < k || v > vals[vals.length - 1]) {
      let j = Math.min(ids.length, k - 1);
      if (ids.length < k) {
        ids.push(i);
        vals.push(v);
        j = ids.length - 1;
      }
      while (j > 0 && vals[j - 1] < v) {
        ids[j] = ids[j - 1];
        vals[j] = vals[j - 1];
        j--;
      }
      ids[j] = i;
      vals[j] = v;
    }
  }
  return { ids, vals };
}

/** Deterministic PRNG so the three steering columns share a seed. */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function sample(logits: Float32Array, temperature: number, topP: number, rand: () => number): number {
  if (temperature <= 0) {
    let best = 0;
    for (let i = 1; i < logits.length; i++) if (logits[i] > logits[best]) best = i;
    return best;
  }
  const lp = logSoftmax(logits, temperature);
  const { ids, vals } = topK(lp, 64);
  const probs = vals.map(Math.exp);
  let cum = 0;
  let cut = probs.length;
  for (let i = 0; i < probs.length; i++) {
    cum += probs[i];
    if (cum >= topP) {
      cut = i + 1;
      break;
    }
  }
  const total = probs.slice(0, cut).reduce((a, b) => a + b, 0);
  let r = rand() * total;
  for (let i = 0; i < cut; i++) {
    r -= probs[i];
    if (r <= 0) return ids[i];
  }
  return ids[cut - 1];
}
