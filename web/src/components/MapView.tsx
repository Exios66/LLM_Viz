import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ramp } from "../lib/colors";
import type { NeuronRef } from "../lib/atlas";
import type { Space } from "../lib/space";
import type { RecordedModel } from "../lib/recorded";
import { editKey, focusNeuron, getState, setState, subscribe, type State } from "../store";

const SHEET = 1.0;
/** Total stack height stays near 3 units whatever the depth, so 8 and 24 layers frame alike. */
const spacingFor = (L: number) => Math.min(0.42, 3.0 / Math.max(1, L - 1));

const vert = /* glsl */ `
  attribute vec3 color;
  attribute float size;
  attribute float alpha;
  uniform float uScale;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vColor = color;
    vAlpha = alpha;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * uScale / -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const frag = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    if (d > 1.0) discard;
    float core = 1.0 - smoothstep(0.0, 0.55, d);
    float halo = (1.0 - smoothstep(0.2, 1.0, d)) * 0.35;
    gl_FragColor = vec4(vColor * (core + halo), (core + halo) * vAlpha);
  }
`;

export function layerY(l: number, L: number) {
  return (l - (L - 1) / 2) * spacingFor(L);
}

const CONCEPT_RGB: Record<string, [number, number, number]> = {
  evil: [0.93, 0.44, 0.53],
  alien: [0.37, 0.82, 0.87],
  other: [0.95, 0.72, 0.29],
};

/**
 * The 3D neuron stack. `space` is the live atlas or a recorded model; `recorded` is set for recorded models and
 * enables their colour modes (concept contrast, hunt results). Live-only features (probe colouring, steering
 * uniqueness, co-firing layout, connection web) come from the store's sweep/analysis and apply only when live.
 */
export function MapView({ space, recorded = null }: { space: Space; recorded?: RecordedModel | null }) {
  const atlas = space;
  const wrap = useRef<HTMLDivElement>(null);
  const labels = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = wrap.current!;
    const { L, N } = atlas;
    const total = L * N;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (e) {
      setState({ webglError: "Your browser could not start WebGL, so the 3D view cannot be drawn. It may be turned off, or the graphics driver may be blocked." });
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    host.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.05, 50);
    const HOME = new THREE.Vector3(3.2, 1.7, 3.9);
    camera.position.copy(HOME);
    let touched = false;
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 1.2;
    controls.maxDistance = 9;
    controls.target.set(0, 0, 0);

    // neuron positions: two layouts (writes, co-firing), morphed between
    const pos = new Float32Array(total * 3);
    const layoutPos = (xy: Float32Array) => {
      const out = new Float32Array(total * 3);
      for (let g = 0; g < total; g++) {
        out[g * 3] = xy[g * 2] * SHEET;
        out[g * 3 + 1] = layerY(Math.floor(g / N), L);
        out[g * 3 + 2] = xy[g * 2 + 1] * SHEET;
      }
      return out;
    };
    const writesPos = layoutPos(atlas.layout);
    pos.set(writesPos);
    let fromPos = writesPos, toPos = writesPos, morphT = 1, morphStart = 0;
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const targetFor = (s: State) => (live && s.layoutMode === "cofire" && s.sweep && s.sweep.cofire.length === total * 2 ? layoutPos(s.sweep.cofire) : writesPos);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const colors = new Float32Array(total * 3);
    const sizes = new Float32Array(total);
    const alphas = new Float32Array(total);
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));
    const mat = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: { uScale: { value: 1 } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // faint sheet outlines
    const sheetMat = new THREE.LineBasicMaterial({ color: 0x39437a, transparent: true, opacity: 0.55 });
    const live = !recorded;
    const sizeScale = Math.sqrt(1024 / N) * (L > 12 ? 1.25 : 1); // keep sheets equally dense to the eye
    const sheets: THREE.LineLoop[] = [];
    for (let l = 0; l < L; l++) {
      const s = SHEET * 1.08;
      const y = layerY(l, L);
      const g = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-s, y, -s), new THREE.Vector3(s, y, -s),
        new THREE.Vector3(s, y, s), new THREE.Vector3(-s, y, s),
      ]);
      const loop = new THREE.LineLoop(g, sheetMat.clone());
      sheets.push(loop);
      scene.add(loop);
    }

    // connection web
    const webGeo = new THREE.BufferGeometry();
    const webMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false });
    const web = new THREE.LineSegments(webGeo, webMat);
    scene.add(web);

    // layer labels (DOM, projected each frame)
    const labelEls: HTMLButtonElement[] = [];
    for (let l = 0; l < L; l++) {
      const b = document.createElement("button");
      b.className = "layer-label";
      b.textContent = `layer ${l}`;
      if (L > 12 && l % 4 !== 0 && l !== L - 1) b.classList.add("minor");
      b.title = `Show only layer ${l} (click again to show all)`;
      b.onclick = () => setState((s) => ({ isolateLayer: s.isolateLayer === l ? null : l }));
      labels.current!.appendChild(b);
      labelEls.push(b);
    }

    // ---- colouring
    let probeRel: Float32Array | null = null;
    // uniqueness: z against random directions, mapped so the null band stays dim
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
    // recorded models: concept contrast (Cohen's d) mapped so d ≤ 0.5 stays dim, and hunt finalists by concept
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

    const paint = () => {
      const s = getState();
      const edited = new Set(s.edits.filter((e) => e.enabled !== false).map(editKey));
      const focusG = s.focus ? atlas.g(s.focus) : -1;
      const hoverG = s.hover ? atlas.g(s.hover) : -1;
      const linked = new Set<number>();
      if (s.focus && s.showWeb && live) {
        for (const k of [...atlas.links(s.focus, "up"), ...atlas.links(s.focus, "down")]) linked.add(atlas.g(k));
      }
      const compareG = s.compare ? atlas.g(s.compare) : -1;
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
          // keep the null band visible as a dim field so the bright outliers read against it
          t = 0.14 + 0.86 * Math.pow(zT[g], 0.7);
          size = 5 + 15 * zT[g];
        } else if (s.colorMode === "density") {
          t = Math.sqrt(atlas.density[g]);
        } else {
          t = Math.max(0, (atlas.share[g] - 0.1) / 0.9);
          size = 5 + 9 * t;
        }
        let [r, gg, b] = rgb ?? ramp(t);
        size *= sizeScale;
        let a = 0.25 + 0.75 * t;
        if (edited.has(`${l}:${g % N}`)) {
          [r, gg, b] = [0.73, 0.65, 1];
          size = Math.max(size, 16);
          a = 1;
        }
        if (linked.has(g)) {
          size = Math.max(size, 14);
          a = 1;
        }
        if (g === hoverG) {
          size = Math.max(size * 1.6, 20);
          a = 1;
        }
        if (g === compareG) {
          [r, gg, b] = [0.72, 0.64, 1];
          size = 26 * Math.max(0.7, sizeScale);
          a = 1;
        }
        if (g === focusG) {
          [r, gg, b] = [1, 0.95, 0.85];
          size = 30 * Math.max(0.7, sizeScale);
          a = 1;
        }
        if (s.isolateLayer !== null && l !== s.isolateLayer) a *= 0.08;
        colors[g * 3] = r;
        colors[g * 3 + 1] = gg;
        colors[g * 3 + 2] = b;
        sizes[g] = size;
        alphas[g] = a;
      }
      geo.attributes.color.needsUpdate = true;
      geo.attributes.size.needsUpdate = true;
      geo.attributes.alpha.needsUpdate = true;
      sheets.forEach((sh, l) => {
        (sh.material as THREE.LineBasicMaterial).opacity = s.isolateLayer === null || s.isolateLayer === l ? 0.55 : 0.1;
      });
      labelEls.forEach((el, l) => el.classList.toggle("on", s.isolateLayer === l));

      // web
      const segs: number[] = [];
      const cols: number[] = [];
      if (s.focus && s.showWeb && live) {
        const links = [...atlas.links(s.focus, "up"), ...atlas.links(s.focus, "down")];
        const wmax = Math.max(...links.map((k) => Math.abs(k.w)), 1e-6);
        for (const k of links) {
          const a = atlas.g(k);
          segs.push(pos[focusG * 3], pos[focusG * 3 + 1], pos[focusG * 3 + 2], pos[a * 3], pos[a * 3 + 1], pos[a * 3 + 2]);
          const c = k.w > 0 ? [1, 0.886, 0.604] : [1, 0.478, 0.541];
          const f = 0.25 + 0.75 * (Math.abs(k.w) / wmax);
          cols.push(...c.map((x) => x * f), ...c.map((x) => x * f * 0.7));
        }
      }
      webGeo.setAttribute("position", new THREE.Float32BufferAttribute(segs, 3));
      webGeo.setAttribute("color", new THREE.Float32BufferAttribute(cols, 3));
    };

    const startMorph = (s: State) => {
      const next = targetFor(s);
      fromPos = Float32Array.from(pos);
      toPos = next;
      morphStart = performance.now();
      morphT = reduceMotion ? 1 : 0;
      if (reduceMotion) {
        pos.set(toPos);
        geo.attributes.position.needsUpdate = true;
        geo.computeBoundingSphere();
        paint();
      }
    };

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
      if (s.sweep !== last.sweep || 
        s.analysis !== last.analysis || s.probePos !== last.probePos || s.focus !== last.focus ||
        s.hover !== last.hover || s.edits !== last.edits || s.colorMode !== last.colorMode ||
        s.showWeb !== last.showWeb || s.isolateLayer !== last.isolateLayer || s.compare !== last.compare
      ) paint();
      last = s;
    });

    // ---- picking
    const ray = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const pick = (ev: PointerEvent): NeuronRef | null => {
      const r = renderer.domElement.getBoundingClientRect();
      mouse.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(mouse, camera);
      ray.params.Points = { threshold: (0.022 * camera.position.distanceTo(controls.target)) / 3 * Math.max(0.55, sizeScale) };
      const iso = getState().isolateLayer;
      const hits = ray.intersectObject(points).filter((h) => iso === null || Math.floor(h.index! / N) === iso);
      if (!hits.length) return null;
      hits.sort((a, b) => a.distanceToRay! - b.distanceToRay!);
      return atlas.ref(hits[0].index!);
    };
    let downAt = { x: 0, y: 0 };
    const onMove = (ev: PointerEvent) => {
      if (ev.buttons) return;
      const h = pick(ev);
      const cur = getState().hover;
      if ((h && (!cur || atlas.g(h) !== atlas.g(cur))) || (!h && cur)) setState({ hover: h });
      renderer.domElement.style.cursor = h ? "pointer" : "grab";
    };
    const onDown = (ev: PointerEvent) => {
      downAt = { x: ev.clientX, y: ev.clientY };
      touched = true;
    };
    const onUp = (ev: PointerEvent) => {
      if (Math.hypot(ev.clientX - downAt.x, ev.clientY - downAt.y) > 5) return;
      const h = pick(ev);
      if (h) focusNeuron(h);
    };
    const onLeave = () => setState({ hover: null });
    const el = renderer.domElement;
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("wheel", () => (touched = true), { passive: true });
    const onLost = (ev: Event) => {
      ev.preventDefault();
      cancelAnimationFrame(raf);
      setState({ webglError: "The graphics context was lost (the GPU was reset or the tab used too much memory)." });
    };
    el.addEventListener("webglcontextlost", onLost);

    // ---- sizing + loop
    const resize = () => {
      const w = host.clientWidth, h = host.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      // frame the whole stack until the viewer moves the camera themselves
      if (!touched) camera.position.copy(HOME).multiplyScalar(Math.max(1, Math.pow(1.4 / camera.aspect, 0.75)));
      mat.uniforms.uScale.value = h * renderer.getPixelRatio() * 0.0042;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    const v = new THREE.Vector3();
    let raf = 0;
    const tick = () => {
      if (morphT < 1) {
        morphT = Math.min(1, (performance.now() - morphStart) / 900);
        const e = morphT < 0.5 ? 4 * morphT ** 3 : 1 - (-2 * morphT + 2) ** 3 / 2;
        for (let i = 0; i < pos.length; i++) pos[i] = fromPos[i] + (toPos[i] - fromPos[i]) * e;
        geo.attributes.position.needsUpdate = true;
        if (morphT === 1) {
          geo.computeBoundingSphere();
          paint(); // connection web endpoints follow the new positions
        }
      }
      controls.update();
      renderer.render(scene, camera);
      const w = host.clientWidth, h = host.clientHeight;
      const iso = getState().isolateLayer;
      for (let l = 0; l < L; l++) {
        labelEls[l].hidden = L > 12 && labelEls[l].classList.contains("minor") && iso !== l;
        v.set(-SHEET * 1.1, layerY(l, L), SHEET * 1.1).project(camera);
        labelEls[l].style.transform = `translate(${((v.x + 1) / 2) * w}px, ${((1 - v.y) / 2) * h}px) translate(-100%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      unsub();
      ro.disconnect();
      controls.dispose();
      geo.dispose();
      webGeo.dispose();
      mat.dispose();
      webMat.dispose();
      sheetMat.dispose();
      sheets.forEach((sh) => {
        sh.geometry.dispose();
        (sh.material as THREE.Material).dispose();
      });
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
    </div>
  );
}
