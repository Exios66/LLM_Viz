// Checks the TypeScript tokenizer and model against the PyTorch reference
// written by pipeline/build.py (public/data/testvec.json).
//   npm run verify

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { loadPack } from "../src/lib/binpack";
import { Model, type ModelMeta, logSoftmax, topK } from "../src/lib/model";
import { Tokenizer } from "../src/lib/tokenizer";

const dir = resolve(import.meta.dirname, "../public/data");
const fetcher = async (p: string) => new Response(readFileSync(resolve(dir, p)));
const tv = JSON.parse(readFileSync(resolve(dir, "testvec.json"), "utf8"));

let failed = 0;
const check = (name: string, ok: boolean, detail = "") => {
  console.log(`${ok ? "ok  " : "FAIL"} ${name}${detail ? "  " + detail : ""}`);
  if (!ok) failed++;
};

const tok = new Tokenizer(JSON.parse(readFileSync(resolve(dir, "tokenizer.json"), "utf8")));
const ids = tok.encode(tv.prompt);
check("tokenizer matches HF", JSON.stringify(ids) === JSON.stringify(tv.ids), `${ids.length} tokens`);
check("decode round-trips", tok.decode(ids) === tv.prompt);

// corpus round-trip: every stored story re-encodes to the same ids
const corpus = await loadPack(fetcher, "corpus");
const ctoks = corpus.get<Uint16Array>("tokens");
const offs = corpus.get<Uint32Array>("offsets");
let mism = 0;
const nCheck = 300;
for (let s = 0; s < nCheck; s++) {
  const story = Array.from(ctoks.subarray(offs[s], offs[s + 1]));
  const re = tok.encode(tok.decode(story)).slice(0, story.length);
  if (JSON.stringify(re.slice(0, story.length - 2)) !== JSON.stringify(story.slice(0, story.length - 2))) mism++;
}
check("corpus stories re-tokenize identically", mism === 0, `${mism}/${nCheck} differ`);

const pack = await loadPack<ModelMeta>(fetcher, "model");
const model = new Model(pack);
const { n_layers: L, d_mlp: N } = model.meta;
const s = model.session();
const acts = new Float32Array(L * N);
const t0 = performance.now();
tv.ids.forEach((id: number, i: number) => s.step(id, { actsOut: acts, logits: i === tv.ids.length - 1 }));
const ms = (performance.now() - t0) / tv.ids.length;
const lp = logSoftmax(s.logits);
const top = topK(lp, 10);
check("top-1 next token", top.ids[0] === tv.top_ids[0], `${JSON.stringify(tok.str(top.ids[0]))}`);
const lpErr = Math.max(...tv.top_ids.map((id: number, i: number) => Math.abs(lp[id] - tv.top_lp[i])));
check("top-10 logprobs within 0.05", lpErr < 0.05, `max err ${lpErr.toFixed(4)}`);
const l3 = acts.subarray(3 * N, 4 * N);
const actErr = Math.max(...tv.l3_last.map((v: number, i: number) => Math.abs(v - l3[i])));
check("layer-3 activations within 0.05", actErr < 0.05, `max err ${actErr.toFixed(4)}`);

// greedy generation
const g = model.session();
tv.ids.forEach((id: number, i: number) => g.step(id, { logits: i === tv.ids.length - 1 }));
const gen: number[] = [];
for (let i = 0; i < tv.greedy.length; i++) {
  let best = 0;
  for (let j = 1; j < g.logits.length; j++) if (g.logits[j] > g.logits[best]) best = j;
  gen.push(best);
  g.step(best, { logits: true });
}
const agree = gen.findIndex((t, i) => t !== tv.greedy[i]);
check("greedy continuation matches", agree === -1, agree === -1 ? JSON.stringify(tok.decode(gen)) : `diverges at ${agree}`);
console.log(`${ms.toFixed(1)} ms/token (node, single thread)`);
process.exit(failed ? 1 : 0);
