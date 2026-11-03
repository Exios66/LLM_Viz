/// <reference lib="webworker" />
// Runs the model off the main thread. See `runtime.ts` for the typed client.

import { fetchJson, loadPack } from "./binpack";
import { Model, type Edit, type ModelMeta, logSoftmax, topK, sample, mulberry32 } from "./model";
import { Tokenizer, type TokenizerData } from "./tokenizer";

export type Req =
  | { kind: "init"; id: number; base: string }
  | { kind: "analyze"; id: number; text: string; edits: Edit[]; maxTokens: number }
  | {
      kind: "generate";
      id: number;
      prompt: string;
      variants: Edit[][];
      maxTokens: number;
      temperature: number;
      topP: number;
      seed: number;
    }
  | { kind: "ablate"; id: number; texts: string[]; edits: Edit[]; maxTokens: number }
  | { kind: "cancel"; id: number };

export interface Pred {
  ids: number[];
  probs: number[];
}

export type Res =
  | { kind: "progress"; id: number; loaded: number; total: number }
  | { kind: "ready"; id: number; meta: ModelMeta }
  | {
      kind: "analysis";
      id: number;
      tokens: number[];
      acts: Float32Array; // [T, L, N] after edits
      preds: Pred[]; // next-token prediction at each position (after edits)
      basePreds: Pred[] | null; // same without edits, when edits are active
      klDiv: number[] | null; // KL(edited || base) per position
    }
  | { kind: "token"; id: number; variant: number; token: number }
  | { kind: "done"; id: number; promptTokens: number[] }
  | {
      kind: "ablation";
      id: number;
      tokens: number; // positions scored
      dNll: number; // mean change in loss (nats/token), positive = the edit hurt
      kl: number; // mean KL(base || edited) per position
      perText: { dNll: number; kl: number }[];
      strip: { tokens: number[]; delta: number[] }; // first text: per-token change in log-prob of the true token
      hurt: [number, number][]; // token id, mean Δ (most hurt)
      helped: [number, number][];
    }
  | { kind: "error"; id: number; message: string };

let model: Model | null = null;
let tok: Tokenizer | null = null;
const cancelled = new Set<number>();
const post = (r: Res, transfer: Transferable[] = []) => (self as DedicatedWorkerGlobalScope).postMessage(r, transfer);

function pred(logits: Float32Array, k = 6): Pred {
  const lp = logSoftmax(logits);
  const t = topK(lp, k);
  return { ids: t.ids, probs: t.vals.map(Math.exp) };
}

function kl(a: Float32Array, b: Float32Array) {
  const la = logSoftmax(a), lb = logSoftmax(b);
  let s = 0;
  for (let i = 0; i < la.length; i++) s += Math.exp(la[i]) * (la[i] - lb[i]);
  return Math.max(0, s);
}

async function handle(req: Req) {
  switch (req.kind) {
    case "init": {
      const fetcher = (p: string) => fetch(p);
      const tokData: TokenizerData = await fetchJson<TokenizerData>(`${req.base}/tokenizer.json`);
      tok = new Tokenizer(tokData);
      const pack = await loadPack<ModelMeta>(fetcher, `${req.base}/model`, (loaded, total) =>
        post({ kind: "progress", id: req.id, loaded, total }),
      );
      model = new Model(pack);
      post({ kind: "ready", id: req.id, meta: model.meta });
      return;
    }
    case "analyze": {
      if (!model || !tok) throw new Error("model not loaded");
      const ids = tok.encode(req.text).slice(0, Math.max(0, Math.min(Math.floor(req.maxTokens) || 0, model.meta.max_pos)));
      const { n_layers: L, d_mlp: N } = model.meta;
      const acts = new Float32Array(ids.length * L * N);
      const active = req.edits.filter((e) => e.enabled !== false);
      const s = model.session(active);
      const b = active.length ? model.session() : null;
      const preds: Pred[] = [];
      const basePreds: Pred[] | null = b ? [] : null;
      const klDiv: number[] | null = b ? [] : null;
      ids.forEach((id, t) => {
        s.step(id, { actsOut: acts.subarray(t * L * N, (t + 1) * L * N), logits: true });
        preds.push(pred(s.logits));
        if (b) {
          b.step(id, { logits: true });
          basePreds!.push(pred(b.logits));
          klDiv!.push(kl(s.logits, b.logits));
        }
      });
      post({ kind: "analysis", id: req.id, tokens: ids, acts, preds, basePreds, klDiv }, [acts.buffer]);
      return;
    }
    case "generate": {
      if (!model || !tok) throw new Error("model not loaded");
      const maxTokens = Math.max(1, Math.min(Math.floor(req.maxTokens) || 1, Math.floor(model.meta.max_pos / 2)));
      let prompt = tok.encode(req.prompt);
      if (!prompt.length) prompt = [model.meta.eos]; // empty prompt: start from end-of-text, as the model was trained
      const keep = Math.max(1, model.meta.max_pos - 1 - maxTokens);
      const ids = prompt.length > keep ? prompt.slice(prompt.length - keep) : prompt;
      const sessions = req.variants.map((v) => model!.session(v));
      const rngs = req.variants.map(() => mulberry32(req.seed));
      const live = sessions.map(() => true);
      for (const s of sessions) ids.forEach((id, i) => s.step(id, { logits: i === ids.length - 1 }));
      for (let step = 0; step < maxTokens; step++) {
        if (cancelled.has(req.id)) break;
        sessions.forEach((s, vi) => {
          if (!live[vi] || s.full) return;
          const next = sample(s.logits, req.temperature, req.topP, rngs[vi]);
          post({ kind: "token", id: req.id, variant: vi, token: next });
          if (next === model!.meta.eos) live[vi] = false;
          else s.step(next, { logits: true });
        });
        if (!live.some(Boolean)) break;
        await new Promise((r) => setTimeout(r, 0)); // let cancel messages in
      }
      cancelled.delete(req.id);
      post({ kind: "done", id: req.id, promptTokens: ids });
      return;
    }
    case "ablate": {
      if (!model || !tok) throw new Error("model not loaded");
      const max = Math.max(4, Math.min(Math.floor(req.maxTokens) || 64, model.meta.max_pos));
      const active = req.edits.filter((e) => e.enabled !== false);
      const perText: { dNll: number; kl: number }[] = [];
      const sum = new Map<number, [number, number]>();
      let strip = { tokens: [] as number[], delta: [] as number[] };
      let tot = 0, totD = 0, totKl = 0;
      for (let ti = 0; ti < req.texts.length; ti++) {
        if (cancelled.has(req.id)) break;
        const ids = tok.encode(req.texts[ti]).slice(0, max);
        const a = model.session(), b = model.session(active);
        let d = 0, k = 0;
        const deltas: number[] = [];
        for (let t = 0; t < ids.length - 1; t++) {
          a.step(ids[t], { logits: true });
          b.step(ids[t], { logits: true });
          const la = logSoftmax(a.logits), lb = logSoftmax(b.logits);
          const y = ids[t + 1];
          const dt = la[y] - lb[y];
          d += dt;
          deltas.push(dt);
          let kk = 0;
          for (let i = 0; i < la.length; i++) kk += Math.exp(la[i]) * (la[i] - lb[i]);
          k += Math.max(0, kk);
          const e = sum.get(y) ?? [0, 0];
          sum.set(y, [e[0] + dt, e[1] + 1]);
        }
        const n = Math.max(1, ids.length - 1);
        perText.push({ dNll: d / n, kl: k / n });
        tot += n; totD += d; totKl += k;
        if (ti === 0) strip = { tokens: ids.slice(1), delta: deltas };
        post({ kind: "progress", id: req.id, loaded: ti + 1, total: req.texts.length });
        await new Promise((r) => setTimeout(r, 0));
      }
      cancelled.delete(req.id);
      const means = [...sum.entries()].filter(([, v]) => v[1] >= 2).map(([id, v]) => [id, v[0] / v[1]] as [number, number]);
      means.sort((x, y) => y[1] - x[1]);
      post({
        kind: "ablation", id: req.id, tokens: tot, dNll: tot ? totD / tot : 0, kl: tot ? totKl / tot : 0, perText, strip,
        hurt: means.slice(0, 8), helped: means.slice(-5).reverse(),
      });
      return;
    }
    case "cancel":
      cancelled.add(req.id);
      return;
  }
}

self.onmessage = (ev: MessageEvent<Req>) => {
  handle(ev.data).catch((err) => post({ kind: "error", id: ev.data.id, message: String(err?.message ?? err) }));
};
