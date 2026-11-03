// Hash routes, so every view is linkable and works on GitHub Pages without a 404 fallback.
//   #/                              home
//   #/atlas                         live TinyStories atlas
//   #/atlas/L5/N551?tab=steer       a focused neuron (tab optional)
//   #/m/<slug>                      a recorded model in the same 3D atlas
//   #/m/<slug>/L14/N2210?tab=hunt   a focused neuron of a recorded model
//   #/findings, #/findings/<id>     findings gallery
//   #/research, #/research/<slug>   research reports and literature
//   #/method                        methods and limitations

export type View = "home" | "atlas" | "findings" | "research" | "method";
export type Tab = "profile" | "contexts" | "steer" | "ablate" | "hunt";

export interface Route {
  view: View;
  model: string | null; // recorded model slug; null = live TinyStories
  focus: { layer: number; neuron: number } | null;
  tab: Tab | null;
  card: string | null; // findings card id or research report slug
}

export interface Limits {
  layers: number;
  neurons: number;
}

const TABS: Tab[] = ["profile", "contexts", "steer", "ablate", "hunt"];
const SLUG = /^[a-z0-9.-]{1,64}$/;
const ID = /^[a-z0-9-]{1,64}$/;

function parseFocus(lp: string | undefined, np: string | undefined, lim: Limits | undefined) {
  if (!lp || !np || !lim) return null;
  const l = Number(/^L(\d+)$/i.exec(lp)?.[1]);
  const n = Number(/^N(\d+)$/i.exec(np)?.[1]);
  if (Number.isInteger(l) && Number.isInteger(n) && l >= 0 && l < lim.layers && n >= 0 && n < lim.neurons) return { layer: l, neuron: n };
  return null;
}

/** `limits` gives the live model's shape; `modelLimits` gives a recorded model's shape by slug (if loaded). */
export function parseRoute(hash: string, limits: Limits, modelLimits?: (slug: string) => Limits | undefined): Route {
  const [path, query = ""] = hash.replace(/^#\/?/, "").split("?");
  const parts = path.split("/").filter(Boolean).map((p) => {
    try {
      return decodeURIComponent(p);
    } catch {
      return "";
    }
  });
  const params = new URLSearchParams(query);
  const tabParam = params.get("tab") as Tab | null;
  const tab = tabParam && TABS.includes(tabParam) ? tabParam : null;
  const head = parts[0] ?? "";
  if (head === "" || head === "home") return { view: "home", model: null, focus: null, tab: null, card: null };
  if (head === "findings") return { view: "findings", model: null, focus: null, tab: null, card: parts[1] && ID.test(parts[1]) ? parts[1] : null };
  if (head === "research") return { view: "research", model: null, focus: null, tab: null, card: parts[1] && ID.test(parts[1]) ? parts[1] : null };
  if (head === "method") return { view: "method", model: null, focus: null, tab: null, card: null };
  if (head === "m" && parts[1] && SLUG.test(parts[1])) {
    const focus = parseFocus(parts[2], parts[3], modelLimits?.(parts[1]));
    return { view: "atlas", model: parts[1], focus, tab: focus ? tab : null, card: null };
  }
  const focus = head === "atlas" ? parseFocus(parts[1], parts[2], limits) : null;
  return { view: "atlas", model: null, focus, tab: focus ? tab : null, card: null };
}

export function formatRoute(r: Route): string {
  if (r.view === "home") return "#/";
  if (r.view === "findings") return r.card ? `#/findings/${encodeURIComponent(r.card)}` : "#/findings";
  if (r.view === "research") return r.card ? `#/research/${encodeURIComponent(r.card)}` : "#/research";
  if (r.view === "method") return "#/method";
  const base = r.model ? `#/m/${r.model}` : "#/atlas";
  if (!r.focus) return base;
  const q = r.tab && r.tab !== "profile" ? `?tab=${r.tab}` : "";
  return `${base}/L${r.focus.layer}/N${r.focus.neuron}${q}`;
}

/** True when the hash asked for a specific neuron (used to explain invalid links). */
export const askedForNeuron = (hash: string) => /^#\/?(atlas|m\/[^/?]+)\/[^/?]+\/[^/?]+/i.test(hash);
