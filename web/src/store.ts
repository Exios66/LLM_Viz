// A small external store shared by every panel (useSyncExternalStore under the hood).

import { useSyncExternalStore } from "react";
import type { Atlas, NeuronRef } from "./lib/atlas";
import type { Edit } from "./lib/model";
import type { Analysis, Runtime } from "./lib/runtime";

export type ColorMode = "selectivity" | "density" | "probe";

export interface State {
  atlas: Atlas | null;
  atlasProgress: number;
  runtime: Runtime | null;
  modelProgress: number; // 0..1, 1 = ready
  modelError: string | null;
  focus: NeuronRef | null;
  hover: NeuronRef | null;
  edits: Edit[];
  probeText: string;
  analysis: Analysis | null;
  probePos: number | null; // selected token in the probe
  colorMode: ColorMode;
  showWeb: boolean;
  isolateLayer: number | null;
  names: Record<string, string>;
}

const NAMES_KEY = "neuron-atlas:names";
const EDITS_KEY = "neuron-atlas:edits";

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
    /* storage may be blocked; names and edits just won't persist */
  }
}

let state: State = {
  atlas: null,
  atlasProgress: 0,
  runtime: null,
  modelProgress: 0,
  modelError: null,
  focus: null,
  hover: null,
  edits: readLocal<Edit[]>(EDITS_KEY, []),
  probeText: "Once upon a time, there was a little girl named Lily. She loved to play in the park with her dog.",
  analysis: null,
  probePos: null,
  colorMode: "selectivity",
  showWeb: true,
  isolateLayer: null,
  names: readLocal<Record<string, string>>(NAMES_KEY, {}),
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
    return { edits: [...rest, e] };
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

export function focusNeuron(r: NeuronRef | null) {
  setState({ focus: r });
}
