// Print recorded sweep rollouts for neurons, for curating findings.
//   npx tsx scripts/dump-rollouts.ts L4N803 L6N179 ...   (append c to a layer for a control: L5c173)
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { loadPack } from "../src/lib/binpack";
import { Tokenizer } from "../src/lib/tokenizer";
import { Sweep, type SweepMeta } from "../src/lib/sweep";

const dir = resolve(import.meta.dirname, "../public/data");
const fetcher = async (p: string) => new Response(readFileSync(resolve(dir, p)));
const tok = new Tokenizer(JSON.parse(readFileSync(resolve(dir, "tokenizer.json"), "utf8")));
const sw = new Sweep(await loadPack<SweepMeta>(fetcher, "sweep"), JSON.parse(readFileSync(resolve(dir, "findings.json"), "utf8")));
const atlas = await loadPack<Record<string, unknown>>(fetcher, "atlas");
for (const arg of process.argv.slice(2)) {
  const m = /^L(\d+)(c?)N?(\d+)$/.exec(arg);
  if (!m) {
    console.error(`skipping "${arg}": expected L<layer>N<neuron> or L<layer>c<control>`);
    continue;
  }
  const r = { layer: +m[1], neuron: +m[3] };
  const ctrl = m[2] === "c";
  const units = ctrl ? sw.meta.n_ctrl : sw.meta.neurons;
  if (r.layer >= sw.meta.layers || r.neuron >= units) {
    console.error(`skipping "${arg}": layer must be < ${sw.meta.layers} and ${ctrl ? "control" : "neuron"} < ${units}`);
    continue;
  }
  const st = ctrl ? sw.controlStats(r.layer, r.neuron) : sw.stats(r);
  console.log(`\n=== ${arg} z=${st.z.toFixed(2)} pct=${st.pct} coh=${st.coherence.toFixed(2)} themes=${st.themes.join(",")}`);
  if (!ctrl) {
    const sl = sw.steerLens(r);
    console.log(`  steer lens up: ${sl.up.slice(0, 8).map((x) => JSON.stringify(tok.str(x.id))).join(" ")} | down: ${sl.down.slice(0, 8).map((x) => JSON.stringify(tok.str(x.id))).join(" ")}`);
  }
  for (const ro of sw.rollouts(r, ctrl)) console.log(`  [${ro.dose.toFixed(2)}] ${ro.prompt.slice(0, 22)}… ${JSON.stringify(tok.decode(ro.ids))}`);
}
void atlas;
