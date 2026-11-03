// Hash routes, so every view is linkable and works on GitHub Pages without a 404 fallback.
//   #/atlas                       map
//   #/atlas/L5/N551?tab=steer     a focused neuron (tab optional)
//   #/findings                    findings gallery
//   #/findings/<card id>          one finding, scrolled into view
//   #/method                      methods and limitations

export type View = "atlas" | "findings" | "method";
export type Tab = "profile" | "contexts" | "steer";

export interface Route {
  view: View;
  focus: { layer: number; neuron: number } | null;
  tab: Tab | null;
  card: string | null;
}

const TABS: Tab[] = ["profile", "contexts", "steer"];

export function parseRoute(hash: string, limits: { layers: number; neurons: number }): Route {
  const [path, query = ""] = hash.replace(/^#\/?/, "").split("?");
  const parts = path.split("/").filter(Boolean);
  const params = new URLSearchParams(query);
  const tabParam = params.get("tab") as Tab | null;
  const tab = tabParam && TABS.includes(tabParam) ? tabParam : null;
  const view: View = parts[0] === "findings" ? "findings" : parts[0] === "method" ? "method" : "atlas";
  let focus: Route["focus"] = null;
  if (view === "atlas" && parts.length >= 3) {
    const l = Number(/^L(\d+)$/i.exec(parts[1])?.[1]);
    const n = Number(/^N(\d+)$/i.exec(parts[2])?.[1]);
    if (Number.isInteger(l) && Number.isInteger(n) && l >= 0 && l < limits.layers && n >= 0 && n < limits.neurons) {
      focus = { layer: l, neuron: n };
    }
  }
  const card = view === "findings" && parts[1] ? decodeURIComponent(parts[1]) : null;
  return { view, focus, tab, card };
}

export function formatRoute(r: Route): string {
  if (r.view === "findings") return r.card ? `#/findings/${encodeURIComponent(r.card)}` : "#/findings";
  if (r.view === "method") return "#/method";
  if (!r.focus) return "#/atlas";
  const q = r.tab && r.tab !== "profile" ? `?tab=${r.tab}` : "";
  return `#/atlas/L${r.focus.layer}/N${r.focus.neuron}${q}`;
}
