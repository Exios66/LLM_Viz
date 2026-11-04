// The 3D neuron map. Layers run left to right along x, as in a transformer diagram: the residual stream is a wire
// along the floor, each layer is a glass attention slab followed by a vertical sheet of its MLP neurons, and the
// stream rises into both. Points glow additively. As the camera closes in on a layer, the others fade back
// (an x-ray, so the layer in focus can be read), and the open neuron's two-hop connection web is drawn in thick lines:
// amber where the writer pushes the reader up, blue where it holds it down.

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2.js";
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { ramp } from "../lib/colors";
import type { NeuronRef } from "../lib/atlas";
import type { Space } from "../lib/space";
import type { RecordedModel } from "../lib/recorded";
import { editKey, focusNeuron, getState, setState, subscribe, type State } from "../store";

// geometry, in world units
const SHEET = 2.0; // side of a neuron sheet
const GAP = 0.95; // distance between layers
const Y0 = 0.42; // sheet bottom, above the residual wire at y = 0
const ATTN_DX = -0.34; // attention slab, just upstream of its layer's sheet
const MLP_DX = 0.08;
const LABEL_Y = Y0 + SHEET + 0.1;

// the map always sits on the dark field (ADR-006), so its palette is fixed rather than themed
const C = {
  idle: new THREE.Color(0.2, 0.25, 0.45),
  wire: new THREE.Color(0x3a4a86),
  slab: new THREE.Color(0x8ea3e6),
  slabEdge: new THREE.Color(0x5566a8),
  sheet: new THREE.Color(0x46559a),
  sheetOn: new THREE.Color(0xf2b84b),
  focus: new THREE.Color(1, 0.96, 0.88),
  compare: new THREE.Color(0.72, 0.64, 1),
  edit: new THREE.Color(0.73, 0.65, 1),
  up: new THREE.Color(0xf2b84b), // --excite
  down: new THREE.Color(0x79b4ff), // --inhibit
};
const CONCEPT_RGB: Record<string, [number, number, number]> = {
  evil: [0.93, 0.44, 0.53],
  alien: [0.37, 0.82, 0.87],
  other: [0.95, 0.72, 0.29],
};
// Diverging scale for "Shift after fine-tune" (Δd, ADR-007): a dim neutral at zero brightening toward amber
// (more selective after the fine-tune) or blue (less selective). Validated on the map field: CVD ΔE 24.7.
const SHIFT = { up: [0xf2 / 255, 0xb8 / 255, 0x4b / 255], down: [0x79 / 255, 0xb4 / 255, 0xff / 255], mid: [0.22, 0.24, 0.33] } as const;

const vert = /* glsl */ `
  attribute vec3 color;
  attribute float size;
  attribute float alpha;
  uniform float uScale, uFocusX, uFadeW, uFadeAmt, uCamSide, uNear;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    // layers away from the focus fade as the camera closes in (never below a quarter); layers between the camera
    // and the focus fade further, so the focus reads through them
    float d = (position.x - uFocusX) / uFadeW;
    float front = step(0.45, (position.x - uFocusX) * uCamSide / ${GAP.toFixed(3)});
    float keep = mix(1.0, exp(-d * d), uFadeAmt * 0.75) * mix(1.0, 1.0 - 0.6 * uFadeAmt, front);
    vColor = color * uNear;
    vAlpha = alpha * keep;
    gl_PointSize = size * uScale / -mv.z;
  }
`;
const frag = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    if (d > 1.0) discard;
    float core = 1.0 - smoothstep(0.0, 0.5, d);
    float halo = (1.0 - smoothstep(0.15, 1.0, d)) * 0.4;
    float a = (core + halo) * vAlpha;
    gl_FragColor = vec4(vColor, a); // additive: src * alpha + dst
  }
`;

const layerX = (l: number, L: number) => (l - (L - 1) / 2) * GAP;

export function MapView({ space, recorded = null }: { space: Space; recorded?: RecordedModel | null }) {
  const atlas = space;
  const wrap = useRef<HTMLDivElement>(null);
  const labels = useRef<HTMLDivElement>(null);
  const api = useRef<{ home: () => void } | null>(null);

  useEffect(() => {
    const host = wrap.current!;
    const { L, N } = atlas;
    const total = L * N;
    const live = !recorded;
    let needs = true; // render on demand
    const fade = { fx: 0, fw: 1, amt: 0, side: 1 }; // zoom fade state, shared by the shader, labels and picking
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      setState({ webglError: "Your browser could not start WebGL, so the 3D view cannot be drawn. It may be turned off, or the graphics driver may be blocked." });
      return;
    }
    let dpr = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(dpr);
    host.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.02, 400);
    const X0 = layerX(0, L) + ATTN_DX - 0.7, X1 = layerX(L - 1, L) + MLP_DX + 0.6;
    const home = { target: new THREE.Vector3(0, Y0 + SHEET / 2 - 0.15, 0), dir: new THREE.Vector3(0.62, 0.4, 1).normalize(), dist: 10 };
    const bounds: THREE.Vector3[] = [];
    for (const x of [X0, X1]) for (const y of [-0.3, Y0 + SHEET]) for (const z of [-SHEET / 2, SHEET / 2]) bounds.push(new THREE.Vector3(x, y, z));
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !reduceMotion;
    controls.dampingFactor = 0.09;
    controls.zoomToCursor = true;
    controls.zoomSpeed = 0.7;
    controls.target.copy(home.target);
    let touched = false;

    // ---- neurons: one draw call, two layouts (writes, co-firing) morphed between
    const pos = new Float32Array(total * 3);
    const layoutPos = (xy: Float32Array) => {
      const out = new Float32Array(total * 3);
      for (let g = 0; g < total; g++) {
        const l = Math.floor(g / N);
        out[g * 3] = layerX(l, L) + MLP_DX;
        out[g * 3 + 1] = Y0 + ((xy[g * 2 + 1] + 1) / 2) * SHEET;
        out[g * 3 + 2] = (xy[g * 2] * SHEET) / 2;
      }
      return out;
    };
    const writesPos = layoutPos(atlas.layout);
    pos.set(writesPos);
    let fromPos = writesPos, toPos = writesPos, morphT = 1, morphStart = 0;
    const targetFor = (s: State) => (live && s.layoutMode === "cofire" && s.sweep && s.sweep.cofire.length === total * 2 ? layoutPos(s.sweep.cofire) : writesPos);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const colors = new Float32Array(total * 3), sizes = new Float32Array(total), alphas = new Float32Array(total);
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));
    const uniforms = {
      uScale: { value: 1 }, uFocusX: { value: 0 }, uFadeW: { value: 1 }, uFadeAmt: { value: 0 }, uCamSide: { value: 1 }, uNear: { value: 1 },
    };
    const mat = new THREE.ShaderMaterial({ vertexShader: vert, fragmentShader: frag, uniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    const points = new THREE.Points(geo, mat);
    points.renderOrder = 2;
    scene.add(points);

    // ---- structure: residual wire, stems, sheet frames, attention slabs
    const owned: { dispose(): void }[] = [geo, mat];
    const wires: number[] = [];
    const seg = (a: number[], b: number[]) => wires.push(...a, ...b);
    seg([X0, 0, 0], [X1, 0, 0]);
    const h = SHEET / 2;
    const sheetMats: THREE.LineBasicMaterial[] = [];
    const slabs: THREE.Mesh[] = [];
    const slabGeo = new THREE.BoxGeometry(0.06, SHEET * 0.9, SHEET * 0.9);
    const slabEdgeGeo = new THREE.EdgesGeometry(slabGeo);
    owned.push(slabGeo, slabEdgeGeo);
    for (let l = 0; l < L; l++) {
      const mx = layerX(l, L) + MLP_DX, ax = layerX(l, L) + ATTN_DX;
      seg([ax, 0, 0], [ax, Y0 + SHEET * 0.05, 0]);
      seg([mx, 0, 0], [mx, Y0, 0]);
      const frame = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(mx, Y0, -h), new THREE.Vector3(mx, Y0, h), new THREE.Vector3(mx, Y0 + SHEET, h), new THREE.Vector3(mx, Y0 + SHEET, -h),
      ]);
      const fm = new THREE.LineBasicMaterial({ color: C.sheet, transparent: true, opacity: 0.8 });
      const loop = new THREE.LineLoop(frame, fm);
      scene.add(loop);
      sheetMats.push(fm);
      owned.push(frame, fm);
      const sm = new THREE.MeshBasicMaterial({ color: C.slab, transparent: true, opacity: 0.05, depthWrite: false });
      const slab = new THREE.Mesh(slabGeo, sm);
      slab.position.set(ax, Y0 + SHEET / 2, 0);
      const em = new THREE.LineBasicMaterial({ color: C.slabEdge, transparent: true, opacity: 0.7 });
      const edges = new THREE.LineSegments(slabEdgeGeo, em);
      edges.position.copy(slab.position);
      slab.userData = { edges: em };
      scene.add(slab, edges);
      slabs.push(slab);
      owned.push(sm, em);
    }
    for (const x of [X0, X1]) {
      const cap = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(0.08, 0.5, 0.9)), new THREE.LineBasicMaterial({ color: C.slabEdge }));
      cap.position.set(x, 0, 0);
      scene.add(cap);
      owned.push(cap.geometry, cap.material as THREE.Material);
    }
    const wireGeo = new THREE.BufferGeometry();
    wireGeo.setAttribute("position", new THREE.Float32BufferAttribute(wires, 3));
    const wireMat = new THREE.LineBasicMaterial({ color: C.wire, transparent: true, opacity: 0.9 });
    scene.add(new THREE.LineSegments(wireGeo, wireMat));
    owned.push(wireGeo, wireMat);

    // ---- connection web: thick lines (WebGL draws plain lines one pixel wide), additive, two hops
    const webMat = new LineMaterial({ vertexColors: true, linewidth: 2, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    const web = new LineSegments2(new LineSegmentsGeometry(), webMat);
    web.frustumCulled = false;
    web.renderOrder = 1;
    web.visible = false;
    scene.add(web);
    owned.push(webMat);

    // ---- layer labels: DOM buttons (focusable, so a keyboard can isolate a layer), sized by depth
    const labelEls: HTMLButtonElement[] = [];
    for (let l = 0; l < L; l++) {
      const b = document.createElement("button");
      b.className = "layer-label";
      b.textContent = `L${l}`;
      b.setAttribute("aria-label", `Layer ${l}: face it head-on and show only it (press again to show all)`);
      b.onclick = () => setState((s) => ({ isolateLayer: s.isolateLayer === l ? null : l }));
      labels.current!.appendChild(b);
      labelEls.push(b);
    }

    // ---- colouring
    let probeRel: Float32Array | null = null;
    let zT: Float32Array | null = null;
    const computeZ = (s: State) => {
      if (!live || !s.sweep) return null;
      const z = s.sweep.zArray();
      const sorted = Float32Array.from(z).filter(Number.isFinite).sort();
      const hi = Math.max(sorted[Math.floor(sorted.length * 0.995)] ?? 1, 3);
      const lo = 2;
      const out = new Float32Array(total);
      for (let g = 0; g < total; g++) out[g] = Number.isFinite(z[g]) ? Math.min(1, Math.max(0, (z[g] - lo) / (hi - lo))) : 0;
      return out;
    };
    const signalT = (name: string) => {
      const d = recorded?.signals[name];
      if (!d) return null;
      const sorted = Float32Array.from(d).sort();
      const hi = Math.max(sorted[Math.floor(sorted.length * 0.999)] ?? 1, 1);
      const out = new Float32Array(total);
      for (let g = 0; g < total; g++) out[g] = Math.min(1, Math.max(0, (d[g] - 0.5) / (hi - 0.5)));
      return out;
    };
    const evilT = signalT("d_evil"), alienT = signalT("d_alien");
    /** Signed Δd scaled to [-1, 1] by the 99.5th percentile of |Δd|, so one outlier cannot wash out the rest. */
    const shiftS = (name: string) => {
      const d = recorded?.signals[name];
      if (!d) return null;
      const mag = Float32Array.from(d, Math.abs).sort();
      const hi = Math.max(mag[Math.floor(mag.length * 0.995)] ?? 0.25, 0.25);
      return Float32Array.from(d, (v) => Math.max(-1, Math.min(1, v / hi)));
    };
    const shiftEvil = shiftS("dd_evil"), shiftAlien = shiftS("dd_alien");
    const huntConcept = new Map<number, string>();
    const huntScreened = new Set<number>();
    if (recorded?.hunt) {
      for (const f of recorded.hunt.finalists) huntConcept.set(recorded.g(f), f.concept);
      for (const u of recorded.hunt.scatter.units) huntScreened.add(u[0] * N + u[1]);
    }
    const computeProbe = (s: State) => {
      if (!live) return null;
      const a = s.analysis;
      if (!a || !a.tokens.length) return null;
      const T = a.tokens.length;
      const rel = new Float32Array(total);
      const pick = s.probePos !== null && s.probePos < T ? s.probePos : null;
      for (let g = 0; g < total; g++) {
        let v = 0;
        if (pick !== null) v = a.acts[pick * total + g];
        else for (let t = 0; t < T; t++) v = Math.max(v, a.acts[t * total + g]);
        rel[g] = v / Math.max(atlas.max[g], 0.25);
      }
      return rel;
    };
    // sheets of 1,024 and 3,584 neurons look equally dense
    const sizeScale = Math.sqrt(1024 / N) * 1.15;

    /** The open neuron's web: its direct links, then each strong neighbour's links on the same side. */
    const webEdges = (s: State) => {
      const out: { a: number; b: number; w: number; hop: number }[] = [];
      if (!s.focus || !s.showWeb || !live) return out;
      const root = atlas.g(s.focus);
      for (const dir of ["up", "down"] as const) {
        const first = atlas.links(s.focus, dir).sort((x, y) => Math.abs(y.w) - Math.abs(x.w));
        first.forEach((k, i) => {
          const g = atlas.g(k);
          out.push(dir === "up" ? { a: g, b: root, w: k.w, hop: 1 } : { a: root, b: g, w: k.w, hop: 1 });
          if (i >= 6) return;
          for (const k2 of atlas.links(k, dir).sort((x, y) => Math.abs(y.w) - Math.abs(x.w)).slice(0, 4)) {
            const g2 = atlas.g(k2);
            if (g2 === root) continue;
            out.push(dir === "up" ? { a: g2, b: g, w: k2.w, hop: 2 } : { a: g, b: g2, w: k2.w, hop: 2 });
          }
        });
      }
      return out;
    };
    let webList: ReturnType<typeof webEdges> = [];

    const paint = () => {
      const s = getState();
      const edited = new Set(s.edits.filter((e) => e.enabled !== false).map(editKey));
      const focusG = s.focus ? atlas.g(s.focus) : -1;
      const hoverG = s.hover ? atlas.g(s.hover) : -1;
      const compareG = s.compare ? atlas.g(s.compare) : -1;
      webList = webEdges(s);
      const linked = new Map<number, number>(); // neuron → sign of the link that first reached it
      for (const e of webList) {
        const other = e.a === focusG ? e.b : e.a;
        if (!linked.has(other)) linked.set(other, e.hop === 1 ? Math.sign(e.w) : 0.5 * Math.sign(e.w));
        if (e.hop === 2 && !linked.has(e.b)) linked.set(e.b, 0.5 * Math.sign(e.w));
      }
      const tmp = new THREE.Color();
      for (let g = 0; g < total; g++) {
        const l = Math.floor(g / N);
        let t: number;
        let size = 7;
        let rgb: [number, number, number] | null = null;
        if (!live && (s.colorMode === "evil" || s.colorMode === "alien") && (s.colorMode === "evil" ? evilT : alienT)) {
          const tt = (s.colorMode === "evil" ? evilT : alienT)![g];
          t = 0.1 + 0.9 * Math.pow(tt, 0.8);
          size = 4 + 14 * tt;
          const c = CONCEPT_RGB[s.colorMode];
          rgb = [c[0] * t, c[1] * t, c[2] * t];
        } else if (!live && (s.colorMode === "shift-evil" || s.colorMode === "shift-alien") && (s.colorMode === "shift-evil" ? shiftEvil : shiftAlien)) {
          const v = (s.colorMode === "shift-evil" ? shiftEvil : shiftAlien)![g];
          const m = Math.pow(Math.abs(v), 0.8);
          const pole = v >= 0 ? SHIFT.up : SHIFT.down;
          t = 0.15 + 0.85 * m;
          size = 4 + 14 * m;
          rgb = [0, 1, 2].map((k) => SHIFT.mid[k] + (pole[k] - SHIFT.mid[k]) * m) as [number, number, number];
        } else if (!live && s.colorMode === "hunt") {
          const c = huntConcept.get(g);
          if (c) {
            t = 1; size = 18; rgb = CONCEPT_RGB[c];
          } else {
            t = huntScreened.has(g) ? 0.32 : 0.08; size = huntScreened.has(g) ? 7 : 4;
          }
        } else if (s.colorMode === "probe" && probeRel) {
          const r = Math.max(0, probeRel[g]);
          t = Math.pow(Math.min(r, 1), 0.8);
          size = 5 + 16 * Math.min(r, 1.2);
        } else if (s.colorMode === "uniqueness" && zT) {
          t = zT[g] > 0 ? 0.3 + 0.7 * Math.pow(zT[g], 0.7) : 0.12; // the null band is a dim field the outliers read against
          size = 5 + 15 * zT[g];
        } else if (s.colorMode === "density") {
          t = Math.sqrt(atlas.density[g]);
        } else {
          t = Math.max(0, (atlas.share[g] - 0.1) / 0.9);
          size = 5 + 9 * t;
        }
        let [r, gg, b] = rgb ?? (t < 0.13 ? [C.idle.r, C.idle.g, C.idle.b] : ramp(t));
        size *= sizeScale;
        let a = 0.3 + 0.7 * t;
        if (edited.has(`${l}:${g % N}`)) {
          [r, gg, b] = [C.edit.r, C.edit.g, C.edit.b];
          size = Math.max(size, 16 * sizeScale);
          a = 1;
        }
        const sign = linked.get(g);
        if (sign !== undefined) {
          tmp.copy(sign > 0 ? C.up : C.down).multiplyScalar(Math.abs(sign) === 1 ? 1 : 0.6);
          [r, gg, b] = [tmp.r, tmp.g, tmp.b];
          size = Math.max(size, (Math.abs(sign) === 1 ? 15 : 10) * sizeScale);
          a = 1;
        }
        if (g === hoverG) {
          size = Math.max(size * 1.6, 22 * sizeScale);
          a = 1;
        }
        if (g === compareG) {
          [r, gg, b] = [C.compare.r, C.compare.g, C.compare.b];
          size = 26 * Math.max(0.8, sizeScale);
          a = 1;
        }
        if (g === focusG) {
          [r, gg, b] = [C.focus.r, C.focus.g, C.focus.b];
          size = 32 * Math.max(0.8, sizeScale);
          a = 1;
        }
        if (s.isolateLayer !== null && l !== s.isolateLayer) a *= 0.06;
        colors[g * 3] = r;
        colors[g * 3 + 1] = gg;
        colors[g * 3 + 2] = b;
        sizes[g] = size;
        alphas[g] = a;
      }
      geo.attributes.color.needsUpdate = true;
      geo.attributes.size.needsUpdate = true;
      geo.attributes.alpha.needsUpdate = true;
      sheetMats.forEach((m, l) => {
        m.color.copy(s.isolateLayer === l ? C.sheetOn : C.sheet);
      });
      labelEls.forEach((el, l) => {
        el.classList.toggle("on", s.isolateLayer === l);
        el.setAttribute("aria-pressed", String(s.isolateLayer === l));
      });
      buildWeb(focusG);
      needs = true;
    };

    const buildWeb = (root: number) => {
      if (!webList.length) {
        web.visible = false;
        return;
      }
      // a line is "through" when the web continues past both ends; dead ends draw dimmer
      const feeds = new Set(webList.map((e) => e.a)), fed = new Set(webList.map((e) => e.b));
      const wmax = Math.max(...webList.map((e) => Math.abs(e.w)), 1e-6);
      const p = new Float32Array(webList.length * 6), c = new Float32Array(webList.length * 6);
      webList.forEach((e, i) => {
        const through = (e.a === root || fed.has(e.a)) && (e.b === root || feeds.has(e.b));
        const k = e.w > 0 ? C.up : C.down;
        const al = (0.35 + 0.65 * (Math.abs(e.w) / wmax)) * (e.hop === 1 ? 0.8 : 0.45) * (through ? 1 : 0.35);
        p.set([pos[e.a * 3], pos[e.a * 3 + 1], pos[e.a * 3 + 2], pos[e.b * 3], pos[e.b * 3 + 1], pos[e.b * 3 + 2]], i * 6);
        c.set([k.r * al, k.g * al, k.b * al, k.r * al, k.g * al, k.b * al], i * 6);
      });
      web.geometry.dispose();
      web.geometry = new LineSegmentsGeometry().setPositions(p).setColors(c);
      web.visible = true;
    };

    const startMorph = (s: State) => {
      fromPos = Float32Array.from(pos);
      toPos = targetFor(s);
      morphStart = performance.now();
      morphT = reduceMotion ? 1 : 0;
      if (reduceMotion) {
        pos.set(toPos);
        geo.attributes.position.needsUpdate = true;
        geo.computeBoundingSphere();
        paint();
      }
      needs = true;
    };

    // ---- camera moves
    let fly: { from: THREE.Vector3; to: THREE.Vector3; p0: THREE.Vector3; p1: THREE.Vector3; t0: number; ms: number } | null = null;
    const flyTo = (target: THREE.Vector3, camPos: THREE.Vector3, ms = 600) => {
      if (reduceMotion) {
        controls.target.copy(target);
        camera.position.copy(camPos);
        needs = true;
        return;
      }
      fly = { from: controls.target.clone(), to: target.clone(), p0: camera.position.clone(), p1: camPos.clone(), t0: performance.now(), ms };
    };
    const homePos = () => home.target.clone().addScaledVector(home.dir, home.dist);
    const goHome = () => flyTo(home.target, homePos());
    /** Face a layer's sheet head-on, close enough that its neighbours fade away. */
    const faceLayer = (l: number) => {
      const c = new THREE.Vector3(layerX(l, L) + MLP_DX, Y0 + SHEET / 2, 0);
      const dist = (SHEET / 2 / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))) * 1.3;
      flyTo(c, c.clone().add(new THREE.Vector3(dist, 0.0001, 0)));
    };
    /** Bring a neuron into view without ever zooming out from where the viewer is. */
    const reveal = (g: number) => {
      const p = new THREE.Vector3(pos[g * 3], pos[g * 3 + 1], pos[g * 3 + 2]);
      const v = p.clone().project(camera);
      if (v.z < 1 && Math.abs(v.x) < 0.85 && Math.abs(v.y) < 0.85) return;
      const dir = camera.position.clone().sub(controls.target).normalize();
      const d = Math.min(camera.position.distanceTo(controls.target), home.dist * 0.45);
      flyTo(p, p.clone().addScaledVector(dir, d), 500);
    };
    api.current = { home: goHome };

    let last: State = getState();
    probeRel = computeProbe(last);
    zT = computeZ(last);
    if (last.layoutMode === "cofire" && last.sweep) startMorph(last);
    paint();
    const unsub = subscribe(() => {
      const s = getState();
      if (s.analysis !== last.analysis || s.probePos !== last.probePos) probeRel = computeProbe(s);
      if (s.sweep !== last.sweep) zT = computeZ(s);
      if (s.layoutMode !== last.layoutMode || s.sweep !== last.sweep) startMorph(s);
      if (s.isolateLayer !== last.isolateLayer) {
        if (s.isolateLayer !== null) faceLayer(s.isolateLayer);
        else goHome();
      }
      if (s.focus && s.focus !== last.focus && touched) reveal(atlas.g(s.focus));
      if (
        s.sweep !== last.sweep || s.analysis !== last.analysis || s.probePos !== last.probePos || s.focus !== last.focus ||
        s.hover !== last.hover || s.edits !== last.edits || s.colorMode !== last.colorMode ||
        s.showWeb !== last.showWeb || s.isolateLayer !== last.isolateLayer || s.compare !== last.compare
      ) paint();
      last = s;
    });

    // ---- picking: the frontmost visible layer under the pointer, then the point closest to the ray in it
    const ray = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const visibility = (l: number) => {
      const dx = layerX(l, L) + MLP_DX - fade.fx, d = dx / fade.fw;
      if ((dx * fade.side) / GAP > 0.45) return 1 - fade.amt;
      return 1 - 0.75 * fade.amt * (1 - Math.exp(-d * d));
    };
    const pick = (ev: PointerEvent): NeuronRef | null => {
      const r = renderer.domElement.getBoundingClientRect();
      mouse.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(mouse, camera);
      ray.params.Points = { threshold: 0.012 * camera.position.distanceTo(controls.target) * Math.max(0.6, sizeScale) };
      const iso = getState().isolateLayer;
      const hits = ray.intersectObject(points).filter((hh) => iso === null || Math.floor(hh.index! / N) === iso);
      if (!hits.length) return null;
      const layers = [...new Set(hits.map((hh) => Math.floor(hh.index! / N)))];
      const front = layers.find((l) => visibility(l) > 0.5) ?? layers[0];
      let best = hits[0];
      for (const hh of hits) if (Math.floor(hh.index! / N) === front && (Math.floor(best.index! / N) !== front || hh.distanceToRay! < best.distanceToRay!)) best = hh;
      return atlas.ref(best.index!);
    };
    let downAt = { x: 0, y: 0 };
    let moveEv: PointerEvent | null = null;
    const onMove = (ev: PointerEvent) => {
      if (ev.buttons) return;
      if (moveEv) {
        moveEv = ev;
        return;
      }
      moveEv = ev;
      requestAnimationFrame(() => {
        const e = moveEv!;
        moveEv = null;
        const hv = pick(e);
        const cur = getState().hover;
        if ((hv && (!cur || atlas.g(hv) !== atlas.g(cur))) || (!hv && cur)) setState({ hover: hv });
        renderer.domElement.style.cursor = hv ? "pointer" : "grab";
      });
    };
    const onDown = (ev: PointerEvent) => {
      downAt = { x: ev.clientX, y: ev.clientY };
      touched = true;
      fly = null;
    };
    const onUp = (ev: PointerEvent) => {
      if (Math.hypot(ev.clientX - downAt.x, ev.clientY - downAt.y) > 5) return;
      const hv = pick(ev);
      if (hv) focusNeuron(hv);
    };
    const onLeave = () => getState().hover && setState({ hover: null });
    const el = renderer.domElement;
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("wheel", () => ((touched = true), (fly = null)), { passive: true });
    let raf = 0;
    const onLost = (ev: Event) => {
      ev.preventDefault();
      cancelAnimationFrame(raf);
      setState({ webglError: "The graphics context was lost (the GPU was reset or the tab used too much memory)." });
    };
    el.addEventListener("webglcontextlost", onLost);
    controls.addEventListener("change", () => (needs = true));

    // ---- sizing
    const resize = () => {
      const w = Math.max(1, host.clientWidth), hh = Math.max(1, host.clientHeight);
      renderer.setSize(w, hh, false);
      webMat.resolution.set(w, hh);
      camera.aspect = w / hh;
      // the distance at which the model's bounding sphere fits the view; frame it until the viewer moves the camera
      const r = Math.max(...bounds.map((b) => b.distanceTo(home.target)));
      const vHalf = THREE.MathUtils.degToRad(camera.fov / 2), hHalf = Math.atan(Math.tan(vHalf) * camera.aspect);
      home.dist = (r / Math.sin(Math.min(vHalf, hHalf))) * 0.64;
      controls.minDistance = 0.4;
      controls.maxDistance = home.dist * 3;
      if (!touched && !fly) {
        camera.position.copy(homePos());
        controls.target.copy(home.target);
      }
      camera.updateProjectionMatrix();
      uniforms.uScale.value = hh * renderer.getPixelRatio() * 0.012;
      needs = true;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    // ---- zoom fade: eased on log-distance from the overview (none) to a sheet filling the view (full)
    const pv = new THREE.Vector3();
    const applyFade = () => {
      const dist = camera.position.distanceTo(controls.target);
      const far = Math.log(home.dist * 0.7), near = Math.log(home.dist * 0.12);
      const amt = THREE.MathUtils.smoothstep(THREE.MathUtils.clamp((far - Math.log(dist)) / (far - near), 0, 1), 0, 1);
      // the focus layer is the one whose sheet centre lands nearest the middle of the view
      const tv = controls.target.clone().project(camera);
      let fx = controls.target.x, best = Infinity;
      for (let l = 0; l < L; l++) {
        pv.set(layerX(l, L) + MLP_DX, Y0 + SHEET / 2, 0).project(camera);
        const dd = Math.hypot((pv.x - tv.x) * camera.aspect, pv.y - tv.y);
        if (pv.z < 1 && dd < best) {
          best = dd;
          fx = layerX(l, L) + MLP_DX;
        }
      }
      const fw = GAP * (0.85 + 2.5 * (1 - amt));
      const side = Math.sign(camera.position.x - fx) || 1;
      Object.assign(fade, { fx, fw, amt, side });
      uniforms.uFocusX.value = fx;
      uniforms.uFadeW.value = fw;
      uniforms.uFadeAmt.value = amt;
      uniforms.uCamSide.value = side;
      // up close nothing overlaps, so the scene brightens as the camera nears
      uniforms.uNear.value = THREE.MathUtils.clamp(Math.sqrt(home.dist / dist), 1, 2.2);
      slabs.forEach((s) => {
        const d = (s.position.x - fx) / fw, f = 1 - amt * (1 - Math.exp(-d * d));
        (s.material as THREE.MeshBasicMaterial).opacity = 0.05 * f;
        (s.userData.edges as THREE.LineBasicMaterial).opacity = 0.7 * f;
      });
      sheetMats.forEach((m, l) => {
        const d = (layerX(l, L) + MLP_DX - fx) / fw;
        m.opacity = 0.8 * (1 - 0.8 * amt * (1 - Math.exp(-d * d)));
      });
      wireMat.opacity = 0.9 * (1 - 0.8 * amt);
    };

    // ---- labels follow their sheets, scaled by depth
    const lv = new THREE.Vector3(), lv2 = new THREE.Vector3();
    const placeLabels = () => {
      const w = host.clientWidth, hh = host.clientHeight;
      const iso = getState().isolateLayer;
      const step = L > 12 ? Math.ceil(L / 12) : 1;
      for (let l = 0; l < L; l++) {
        const x = layerX(l, L) + MLP_DX;
        lv.set(x, LABEL_Y, -h).project(camera);
        lv2.set(x, LABEL_Y + 0.2, -h).project(camera);
        const px = Math.abs(lv2.y - lv.y) * hh * 0.5; // on-screen height of 0.2 world units here
        const show = lv.z < 1 && (iso === null ? l % step === 0 || l === L - 1 : iso === l);
        const b = labelEls[l];
        b.hidden = !show;
        if (!show) continue;
        b.style.fontSize = `${Math.max(10, Math.min(16, px * 0.9))}px`;
        b.style.opacity = String(0.45 + 0.55 * visibility(l));
        b.style.transform = `translate(${((lv.x + 1) / 2) * w}px, ${((1 - lv.y) / 2) * hh}px) translate(-10%, -100%)`;
      }
    };

    // ---- render on demand; drop the pixel ratio if frames run slow
    let slow = 0, frames = 0, lastT = performance.now();
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const now = performance.now();
      if (fly) {
        const k = Math.min(1, (now - fly.t0) / fly.ms), e = k * k * (3 - 2 * k);
        controls.target.lerpVectors(fly.from, fly.to, e);
        camera.position.lerpVectors(fly.p0, fly.p1, e);
        if (k === 1) fly = null;
        needs = true;
      }
      if (morphT < 1) {
        morphT = Math.min(1, (now - morphStart) / 900);
        const e = morphT < 0.5 ? 4 * morphT ** 3 : 1 - (-2 * morphT + 2) ** 3 / 2;
        for (let i = 0; i < pos.length; i++) pos[i] = fromPos[i] + (toPos[i] - fromPos[i]) * e;
        geo.attributes.position.needsUpdate = true;
        if (morphT === 1) {
          geo.computeBoundingSphere();
          paint();
        }
        needs = true;
      }
      if (controls.update()) needs = true;
      if (!needs) {
        lastT = now;
        return;
      }
      needs = false;
      applyFade();
      renderer.render(scene, camera);
      placeLabels();
      const dt = now - lastT;
      lastT = now;
      if (dt > 0 && dt < 200) {
        frames++;
        if (dt > 28) slow++;
        if (frames >= 60) {
          if (slow > 40 && dpr > 1) {
            dpr = Math.max(1, dpr - 0.5);
            renderer.setPixelRatio(dpr);
            resize();
          }
          frames = 0;
          slow = 0;
        }
      }
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      api.current = null;
      unsub();
      ro.disconnect();
      controls.dispose();
      web.geometry.dispose();
      owned.forEach((o) => o.dispose());
      el.removeEventListener("webglcontextlost", onLost); // before forceContextLoss, so unmounting is not reported as a crash
      renderer.dispose();
      renderer.forceContextLoss();
      el.remove();
      labelEls.forEach((b) => b.remove());
    };
  }, [atlas, recorded]);

  return (
    <div className="map" ref={wrap}>
      <div className="layer-labels" ref={labels} />
      <button className="map-home icon-btn" onClick={() => api.current?.home()} aria-label="Reset the 3D view" title="Reset the view">
        <svg viewBox="0 0 20 20" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3.5 9.5 10 4l6.5 5.5M5.5 8v7.5h9V8" />
        </svg>
      </button>
    </div>
  );
}
