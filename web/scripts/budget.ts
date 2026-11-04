// Performance budget for the built site. Run after `vite build`.
// Sizes are gzip bytes, which is close to what GitHub Pages sends.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const DIST = join(import.meta.dirname, "..", "dist");
const KB = 1024;
// chunk name prefix -> gzip budget. The entry chunk is what every visitor pays for on Home.
const BUDGETS: [RegExp, number, string][] = [
  [/^index-.*\.js$/, 100 * KB, "entry script"],
  [/^index-.*\.css$/, 12 * KB, "stylesheet"],
  [/^three-.*\.js$/, 130 * KB, "three.js (atlas only)"],
  [/^MapView-.*\.js$/, 24 * KB, "3D map"],
  [/^worker-.*\.js$/, 10 * KB, "model worker"],
  [/\.js$/, 12 * KB, "other lazy chunk"],
];
// JSON the Home page fetches before the atlas opens (raw bytes)
const HOME_DATA: [string, number][] = [["data/sweep.json", 64 * KB], ["data/findings.json", 64 * KB]];

let fail = 0;
const rows: string[] = [];
for (const f of readdirSync(join(DIST, "assets"))) {
  const hit = BUDGETS.find(([re]) => re.test(f));
  if (!hit) continue;
  const gz = gzipSync(readFileSync(join(DIST, "assets", f))).length;
  const ok = gz <= hit[1];
  if (!ok) fail++;
  rows.push(`${ok ? "ok  " : "OVER"} ${(gz / KB).toFixed(1).padStart(7)} / ${(hit[1] / KB).toFixed(0).padStart(4)} KB gz  ${hit[2].padEnd(22)} ${f}`);
}
for (const [p, max] of HOME_DATA) {
  const n = statSync(join(DIST, p)).size;
  const ok = n <= max;
  if (!ok) fail++;
  rows.push(`${ok ? "ok  " : "OVER"} ${(n / KB).toFixed(1).padStart(7)} / ${(max / KB).toFixed(0).padStart(4)} KB raw home data             ${p}`);
}
console.log(rows.sort().join("\n"));
if (fail) {
  console.error(`\n${fail} file(s) over budget. Split the chunk or raise the budget in scripts/budget.ts with a reason.`);
  process.exit(1);
}
console.log("\nAll files within budget.");
