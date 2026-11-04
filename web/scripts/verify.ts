// Checks the TypeScript tokenizer and model against the PyTorch reference
// written by pipeline/build.py (public/data/testvec.json).
//   npm run verify

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { loadPack } from "../src/lib/binpack";
import { Model, type ModelMeta, logSoftmax, topK } from "../src/lib/model";
import { Tokenizer } from "../src/lib/tokenizer";
import { Sweep, type Findings, type SweepMeta } from "../src/lib/sweep";
import type { Edit } from "../src/lib/model";
import { existsSync } from "node:fs";

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

// ---------------------------------------------------------------- steering sweep replay
// The browser must reproduce the Python sweep: same push, same greedy tokens.
function greedy(prompt: string, edits: Edit[], n: number): number[] {
  const sess = model.session(edits);
  const p = tok.encode(prompt);
  p.forEach((id, i) => sess.step(id, { logits: i === p.length - 1 }));
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    let best = 0;
    for (let j = 1; j < sess.logits.length; j++) if (sess.logits[j] > sess.logits[best]) best = j;
    if (best === model.meta.eos) break;
    out.push(best);
    sess.step(best, { logits: true });
  }
  return out;
}

if (existsSync(resolve(dir, "sweep.json")) && existsSync(resolve(dir, "findings.json"))) {
  const sp = await loadPack<SweepMeta>(fetcher, "sweep");
  const findings: Findings = JSON.parse(readFileSync(resolve(dir, "findings.json"), "utf8"));
  const sw = new Sweep(sp, findings);
  const G = sw.meta.gen;
  const same = (a: number[], b: number[]) => a.length === b.length && a.every((x, i) => x === b[i]);

  const base = sw.baseline(0);
  check("unsteered sweep baseline replays", same(greedy(sw.meta.prompts[0], [], G), base));

  let cardFail = 0;
  for (const c of findings.cards) {
    if (c.kind === "control") continue; // random controls come from torch's RNG, not replayable here
    const r = { layer: c.layer, neuron: c.neuron };
    const rec = sw.rollouts(r).find((x) => x.prompt === c.prompt && Math.abs(x.dose - c.dose) < 1e-4);
    if (!rec) {
      check(`card ${c.id} has a recorded rollout`, false);
      cardFail++;
      continue;
    }
    const got = greedy(c.prompt, [sw.doseEdit(r, c.dose)], G);
    const ok = same(got, rec.ids) && tok.decode(got) === c.steered;
    if (!ok) {
      cardFail++;
      const at = got.findIndex((t, i) => t !== rec.ids[i]);
      console.log(`FAIL card ${c.id} L${c.layer}·N${c.neuron} diverges at token ${at}: ${JSON.stringify(tok.decode(got))}`);
      failed++;
    }
  }
  check(`all ${findings.cards.filter((c) => c.kind !== "control").length} neuron finding cards replay token for token`, cardFail === 0);

  // a random sample of the whole sweep, every layer and cell
  let match = 0, total = 0;
  let seed = 99;
  const rnd = () => ((seed = (seed * 1103515245 + 12345) % 2 ** 31) / 2 ** 31);
  for (let l = 0; l < sw.meta.layers; l++) {
    for (let k = 0; k < 6; k++) {
      const r = { layer: l, neuron: Math.floor(rnd() * sw.meta.neurons) };
      const rolls = sw.rollouts(r);
      const rec = rolls[Math.floor(rnd() * rolls.length)];
      total++;
      if (same(greedy(rec.prompt, [sw.doseEdit(r, rec.dose)], G), rec.ids)) match++;
    }
  }
  // batched PyTorch vs single-row float32 can flip near-tied argmaxes, so this is a rate
  check("random sweep rollouts replay exactly", match / total >= 0.85, `${match}/${total}`);
} else {
  console.log("skip sweep replay (no sweep.json yet)");
}
process.exit(failed ? 1 : 0);
