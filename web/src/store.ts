// A small external store shared by every panel (useSyncExternalStore under the hood).

import { useSyncExternalStore } from "react";
import type { Atlas, NeuronRef } from "./lib/atlas";
import type { Edit } from "./lib/model";
import type { Analysis, Runtime } from "./lib/runtime";
import type { Findings, Sweep, SweepMeta } from "./lib/sweep";
import type { ModelEntry, RecordedModel } from "./lib/recorded";
import type { ResearchData } from "./lib/research";
import { parseRoute, type Tab, type View } from "./lib/route";

export type ColorMode = "uniqueness" | "selectivity" | "density" | "probe" | "evil" | "alien" | "hunt";
export type Theme = "system" | "light" | "dark";
export type LayoutMode = "writes" | "cofire";

/** A steering run requested from elsewhere (a finding's Replay button). */
export interface SteerRequest {
  layer: number;
  neuron: number;
  prompt: string;
  dose: number; // × residual norm
  nonce: number;
}

export interface State {
  atlas: Atlas | null;
  atlasProgress: number;
  atlasError: string | null;
  sweep: Sweep | null;
  /** findings only, loaded first so Home does not wait for the full sweep pack */
  findings: Findings | null;
  sweepMeta: SweepMeta | null;
  sweepError: string | null;
  runtime: Runtime | null;
  modelProgress: number; // 0..1, 1 = ready
  modelError: string | null;
  view: View;
  focus: NeuronRef | null;
  tab: Tab;
  card: string | null;
  hover: NeuronRef | null;
  edits: Edit[];
  probeText: string;
  analysis: Analysis | null;
  probePos: number | null; // selected token in the probe
  colorMode: ColorMode;
  layoutMode: LayoutMode;
  showWeb: boolean;
  isolateLayer: number | null;
  names: Record<string, string>;
  steerRequest: SteerRequest | null;
  webglError: string | null;
  notice: string | null;
  theme: Theme;
  /** Recorded models (ADR-005). `model` is the slug in view, null = live TinyStories. */
  models: ModelEntry[];
  model: string | null;
  recorded: RecordedModel | null;
  recordedProgress: number;
  recordedError: string | null;
  research: ResearchData | null;
  researchError: string | null;
  compare: NeuronRef | null;
  tour: number | null;
  help: boolean;
}

const NAMES_KEY = "neuron-atlas:names";
const EDITS_KEY = "neuron-atlas:edits:v2";
export const THEME_KEY = "neuron-atlas:theme";
export const TOUR_KEY = "neuron-atlas:tour-done";

function readLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeLocal(key: string, v: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(v));
  } catch {
    /* storage may be blocked or full; names and edits just won't persist */
  }
}

const finite = (x: unknown): x is number => typeof x === "number" && Number.isFinite(x);

/** Drop anything in storage that isn't a well-formed edit (old versions, hand edits). */
export function sanitizeEdits(raw: unknown, layers = 8, neurons = 1024): Edit[] {
  if (!Array.isArray(raw)) return [];
  const out: Edit[] = [];
  const seen = new Set<string>();
  for (const e of raw) {
    if (!e || typeof e !== "object") continue;
    const x = e as Record<string, unknown>;
    if (!Number.isInteger(x.layer) || !Number.isInteger(x.neuron)) continue;
    const layer = x.layer as number, neuron = x.neuron as number;
    if (layer < 0 || layer >= layers || neuron < 0 || neuron >= neurons) continue;
    if (x.mode !== "add" && x.mode !== "set" && x.mode !== "scale") continue;
    if (!finite(x.value) || !finite(x.maxAct) || Math.abs(x.value) > 1e3 || x.maxAct <= 0 || x.maxAct > 1e4) continue;
    const key = `${layer}:${neuron}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({
      layer, neuron, mode: x.mode, value: x.value, maxAct: x.maxAct,
      unit: x.unit === "resid" ? "resid" : "max",
      enabled: x.enabled !== false,
    });
  }
  return out.slice(0, 64);
}

const sanitizeNames = (raw: unknown): Record<string, string> => {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(raw)) if (typeof v === "string" && /^L\d+·N\d+$/.test(k)) out[k] = v.slice(0, 80);
  return out;
};

let state: State = {
  atlas: null,
  atlasProgress: 0,
  atlasError: null,
  sweep: null,
  findings: null,
  sweepMeta: null,
  sweepError: null,
  runtime: null,
  modelProgress: 0,
  modelError: null,
  // start on the routed view so the first render does not mount (and start loading) the atlas on other pages
  view: typeof window === "undefined" ? "atlas" : parseRoute(window.location.hash, { layers: Infinity, neurons: Infinity }).view,
  focus: null,
  tab: "profile",
  card: null,
  hover: null,
  edits: sanitizeEdits(readLocal<unknown>(EDITS_KEY, [])),
  probeText: "Once upon a time, there was a little girl named Lily. She loved to play in the park with her dog.",
  analysis: null,
  probePos: null,
  colorMode: "uniqueness",
  layoutMode: "writes",
  showWeb: true,
  isolateLayer: null,
  names: sanitizeNames(readLocal<unknown>(NAMES_KEY, {})),
  steerRequest: null,
  webglError: null,
  notice: null,
  theme: ((): Theme => {
    try {
      const t = localStorage.getItem(THEME_KEY);
      return t === "light" || t === "dark" ? t : "system";
    } catch {
      return "system";
    }
  })(),
  models: [],
  model: null,
  recorded: null,
  recordedProgress: 0,
  recordedError: null,
  research: null,
  researchError: null,
  compare: null,
  tour: null,
  help: false,
};

const listeners = new Set<() => void>();

export function getState() {
  return state;
}

export function setState(patch: Partial<State> | ((s: State) => Partial<State>)) {
  const p = typeof patch === "function" ? patch(state) : patch;
  state = { ...state, ...p };
  if ("names" in p) writeLocal(NAMES_KEY, state.names);
  if ("edits" in p) writeLocal(EDITS_KEY, state.edits);
  if ("theme" in p) applyTheme(state.theme);
  listeners.forEach((l) => l());
}

export function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useStore<T>(sel: (s: State) => T): T {
  return useSyncExternalStore(subscribe, () => sel(state));
}

// ---- edit helpers

export const editKey = (e: { layer: number; neuron: number }) => `${e.layer}:${e.neuron}`;

export function upsertEdit(e: Edit) {
  setState((s) => {
    const rest = s.edits.filter((x) => editKey(x) !== editKey(e));
    return { edits: [...rest, e].slice(-64) };
  });
}

export function removeEdit(r: NeuronRef) {
  setState((s) => ({ edits: s.edits.filter((x) => editKey(x) !== editKey(r)) }));
}

export function toggleEdit(r: NeuronRef) {
  setState((s) => ({
    edits: s.edits.map((x) => (editKey(x) === editKey(r) ? { ...x, enabled: x.enabled === false } : x)),
  }));
}

export function applyTheme(t: Theme) {
  const root = document.documentElement;
  if (t === "system") delete root.dataset.theme;
  else root.dataset.theme = t;
  try {
    if (t === "system") localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, t);
  } catch {
    /* storage blocked: the theme still applies for this visit */
  }
}

export function focusNeuron(r: NeuronRef | null, tab?: Tab) {
  setState((s) => ({ focus: r ? { layer: r.layer, neuron: r.neuron } : null, view: "atlas", tab: tab ?? (r ? s.tab : "profile") }));
}

/** Open a neuron of a recorded model (slug) or of the live model (null). */
export function openModel(slug: string | null, r: NeuronRef | null = null, tab?: Tab) {
  setState((s) => {
    const switching = s.model !== slug;
    return {
      view: "atlas", model: slug, focus: r ? { layer: r.layer, neuron: r.neuron } : null,
      tab: tab ?? (r ? (switching ? (slug ? "profile" : "profile") : s.tab) : "profile"),
      ...(switching ? { hover: null, isolateLayer: null, compare: null, colorMode: slug ? "evil" : s.sweep ? "uniqueness" : "selectivity" } : {}),
    } as Partial<State>;
  });
}
