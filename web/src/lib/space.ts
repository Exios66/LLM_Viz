// The shape every 3D-mappable model shares: the live TinyStories atlas and recorded model packs both satisfy it.

import type { Link, NeuronRef } from "./atlas";

export interface Space {
  readonly L: number;
  readonly N: number;
  readonly layout: Float32Array; // L*N*2 grid coordinates in [-1, 1]
  readonly max: Float32Array;
  readonly density: Float32Array;
  readonly share: Float32Array;
  g(r: NeuronRef): number;
  ref(g: number): NeuronRef;
  links(r: NeuronRef, dir: "up" | "down"): Link[];
}
