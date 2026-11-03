// A small external store shared by every panel (useSyncExternalStore under the hood).

import { useSyncExternalStore } from "react";
import type { Atlas, NeuronRef } from "./lib/atlas";
import type { Edit } from "./lib/model";
import type { Analysis, Runtime } from "./lib/runtime";
import type { Sweep } from "./lib/sweep";
import type { Tab, View } from "./lib/route";

export type ColorMode = "uniqueness" | "selectivity" | "density" | "probe";
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
}

const NAMES_KEY = "neuron-atlas:names";
const EDITS_KEY = "neuron-atlas:edits:v2";

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
  sweepError: null,
  runtime: null,
  modelProgress: 0,
  modelError: null,
  view: "atlas",
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

export function focusNeuron(r: NeuronRef | null, tab?: Tab) {
  setState((s) => ({ focus: r ? { layer: r.layer, neuron: r.neuron } : null, view: "atlas", tab: tab ?? (r ? s.tab : "profile") }));
}
