// The precomputed neuron atlas: stats, layout, logit lens, connections and
// top-activating contexts for every MLP neuron (see pipeline/build.py).

import { fetchJson, loadPack, type Pack } from "./binpack";
import { Tokenizer, type TokenizerData } from "./tokenizer";

export interface AtlasMeta {
  layers: number;
  neurons: number;
  topk: number;
  w_before: number;
  w_after: number;
  lens_k: number;
  conn_k: number;
  hist_bins: number;
  stories: number;
  tokens: number;
  grid: number;
}

export interface NeuronRef {
  layer: number;
  neuron: number;
}

export interface Example {
  story: number;
  pos: number;
  act: number;
  tokens: number[]; // window token ids (-1 = outside story)
  acts: number[]; // window activations relative to the neuron's max, NaN outside
  center: number; // index of the max token within the window
}

export interface Link extends NeuronRef {
  w: number;
}

export const nid = (r: NeuronRef) => `L${r.layer}·N${r.neuron}`;
export const sameNeuron = (a: NeuronRef | null, b: NeuronRef | null) =>
  !!a && !!b && a.layer === b.layer && a.neuron === b.neuron;

export class Atlas {
  readonly meta: AtlasMeta;
  readonly tok: Tokenizer;
  readonly L: number;
  readonly N: number;
  readonly max: Float32Array;
  readonly mean: Float32Array;
  readonly density: Float32Array;
  readonly share: Float32Array;
  readonly layout: Float32Array;
  private hist: Uint32Array;
  private lensIds: Uint16Array;
  private lensVal: Float32Array;
  private upIds: Uint16Array;
  private upW: Float32Array;
  private dnIds: Uint16Array;
  private dnW: Float32Array;
  private exStory: Uint16Array;
  private exPos: Uint16Array;
  private exAct: Float32Array;
  private exWin: Int8Array;
  private ctoks: Uint16Array;
  private coffs: Uint32Array;
  private labels: string[] = [];
  private modalTok: Uint16Array;

  constructor(pack: Pack<AtlasMeta>, corpus: Pack, tok: Tokenizer) {
    this.meta = pack.meta;
    this.tok = tok;
    this.L = pack.meta.layers;
    this.N = pack.meta.neurons;
    this.max = pack.get("max");
    this.mean = pack.get("mean");
    this.density = pack.get("density");
    this.share = pack.get("share");
    this.layout = pack.get("layout");
    this.hist = pack.get("hist");
    this.lensIds = pack.get("lens_ids");
    this.lensVal = pack.get("lens_val");
    this.upIds = pack.get("up_ids");
    this.upW = pack.get("up_w");
    this.dnIds = pack.get("dn_ids");
    this.dnW = pack.get("dn_w");
    this.exStory = pack.get("ex_story");
    this.exPos = pack.get("ex_pos");
    this.exAct = pack.get("ex_act");
    this.exWin = pack.get("ex_win");
    this.ctoks = corpus.get("tokens");
    this.coffs = corpus.get("offsets");
    this.modalTok = new Uint16Array(this.L * this.N);
    for (let g = 0; g < this.L * this.N; g++) this.labels.push(this.makeLabel(g));
  }

  static async load(base: string, onProgress?: (f: number) => void) {
    const tokData: TokenizerData = await fetchJson<TokenizerData>(`${base}/tokenizer.json`);
    const tok = new Tokenizer(tokData);
    const fetcher = (p: string) => fetch(p);
    const [pack, corpus] = await Promise.all([
      loadPack<AtlasMeta>(fetcher, `${base}/atlas`, (l, t) => onProgress?.(t ? l / t : 0)),
      loadPack<Record<string, unknown>>(fetcher, `${base}/corpus`),
    ]);
    return new Atlas(pack, corpus, tok);
  }

  g(r: NeuronRef) {
    return r.layer * this.N + r.neuron;
  }

  ref(g: number): NeuronRef {
    return { layer: Math.floor(g / this.N), neuron: g % this.N };
  }

  lens(r: NeuronRef) {
    const K = this.meta.lens_k;
    const o = this.g(r) * 2 * K;
    const pole = (p: number) =>
      Array.from({ length: K }, (_, k) => ({ id: this.lensIds[o + p * K + k], v: this.lensVal[o + p * K + k] }));
    return { promotes: pole(0), suppresses: pole(1) };
  }

  histogram(r: NeuronRef) {
    const B = this.meta.hist_bins;
    return Array.from(this.hist.subarray(this.g(r) * B, (this.g(r) + 1) * B));
  }

  links(r: NeuronRef, dir: "up" | "down"): Link[] {
    const K = this.meta.conn_k;
    const ids = dir === "up" ? this.upIds : this.dnIds;
    const ws = dir === "up" ? this.upW : this.dnW;
    if ((dir === "up" && r.layer === 0) || (dir === "down" && r.layer === this.L - 1)) return [];
    const o = this.g(r) * K;
    return Array.from({ length: K }, (_, k) => ({ ...this.ref(ids[o + k]), w: ws[o + k] }));
  }

  examples(r: NeuronRef, limit = this.meta.topk): Example[] {
    const { topk: K, w_before: B, w_after: A } = this.meta;
    const W = B + 1 + A;
    const g = this.g(r);
    const out: Example[] = [];
    for (let k = 0; k < Math.min(limit, K); k++) {
      const i = g * K + k;
      const story = this.exStory[i];
      const pos = this.exPos[i];
      const s0 = this.coffs[story], s1 = this.coffs[story + 1];
      const tokens: number[] = [];
      const acts: number[] = [];
      for (let w = 0; w < W; w++) {
        const p = pos - B + w;
        const inside = p >= 0 && s0 + p < s1;
        tokens.push(inside ? this.ctoks[s0 + p] : -1);
        const q = this.exWin[i * W + w];
        acts.push(q === -128 ? NaN : q / 127);
      }
      out.push({ story, pos, act: this.exAct[i], tokens, acts, center: B });
    }
    return out;
  }

  /** The token at the peak of each top context. */
  peakTokens(r: NeuronRef): number[] {
    const K = this.meta.topk;
    const g = this.g(r);
    const out: number[] = [];
    for (let k = 0; k < K; k++) {
      const story = this.exStory[g * K + k];
      out.push(this.ctoks[this.coffs[story] + this.exPos[g * K + k]]);
    }
    return out;
  }

  private makeLabel(g: number): string {
    const counts = new Map<number, number>();
    for (const t of this.peakTokens(this.ref(g))) counts.set(t, (counts.get(t) ?? 0) + 1);
    const top = [...counts.entries()].sort((a, b) => b[1] - a[1]);
    this.modalTok[g] = top[0][0];
    const words = top.slice(0, top[0][1] >= 8 ? 1 : 3).map(([t]) => this.tok.str(t).trim() || "␣");
    return words.join(" / ");
  }

  /** Short automatic description: what the neuron's top contexts peak on. */
  label(r: NeuronRef) {
    return this.labels[this.g(r)];
  }

  story(i: number): number[] {
    return Array.from(this.ctoks.subarray(this.coffs[i], this.coffs[i + 1]));
  }

  /** Neurons whose logit lens (either pole) or peak tokens contain `q`. */
  search(q: string, by: "lens" | "fires", limit = 200): (NeuronRef & { score: number })[] {
    const needle = q.trim().toLowerCase();
    if (!needle) return [];
    const match = (id: number) => this.tok.str(id).trim().toLowerCase() === needle;
    const out: (NeuronRef & { score: number })[] = [];
    const K = this.meta.lens_k;
    for (let g = 0; g < this.L * this.N; g++) {
      let score = 0;
      if (by === "lens") {
        for (let k = 0; k < 2 * K; k++) {
          if (match(this.lensIds[g * 2 * K + k])) score = Math.max(score, Math.abs(this.lensVal[g * 2 * K + k]) * (k < K ? 1 : -1));
        }
        if (score !== 0) out.push({ ...this.ref(g), score });
      } else {
        const peaks = this.peakTokens(this.ref(g));
        score = peaks.filter(match).length / peaks.length;
        if (score > 0) out.push({ ...this.ref(g), score });
      }
    }
    return out.sort((a, b) => Math.abs(b.score) - Math.abs(a.score)).slice(0, limit);
  }

  /** True when the neuron never meaningfully turns on over the corpus. */
  dead(r: NeuronRef) {
    return this.max[this.g(r)] < 0.25;
  }

  /** Neurons worth opening first: their top contexts agree on one token, that
   *  token is a content word rather than "the" or ".", and they fire rarely. */
  ranked(layer: number | null, limit = 300): NeuronRef[] {
    const out: { g: number; s: number }[] = [];
    const logMax = Math.log(Math.max(...this.tok.freq) + 1);
    for (let g = 0; g < this.L * this.N; g++) {
      const r = this.ref(g);
      if (layer !== null && r.layer !== layer) continue;
      if (this.dead(r)) continue;
      const t = this.modalTok[g];
      const word = this.tok.str(t).trim();
      const isWord = /\p{L}{3,}/u.test(word) ? 1 : 0.3;
      const rarity = Math.max(0.1, 1 - Math.log(this.tok.freq[t] + 1) / logMax);
      out.push({ g, s: this.share[g] * rarity * isWord * (1 - Math.min(this.density[g], 0.9)) });
    }
    return out.sort((a, b) => b.s - a.s).slice(0, limit).map((o) => this.ref(o.g));
  }
}
