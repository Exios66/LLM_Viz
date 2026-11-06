// "Fluorescence" ramp: a quiet indigo cell brightens through cyan to pale gold,
// like a calcium indicator lighting up under the microscope.

const STOPS: [number, [number, number, number]][] = [
  [0.0, [0x22, 0x29, 0x52]],
  [0.25, [0x24, 0x5b, 0x8f]],
  [0.5, [0x3f, 0xb4, 0xd0]],
  [0.75, [0xb4, 0xee, 0xd2]],
  [1.0, [0xff, 0xe2, 0x9a]],
];

export function ramp(t: number): [number, number, number] {
  const x = Math.min(1, Math.max(0, t));
  for (let i = 1; i < STOPS.length; i++) {
    const [t1, c1] = STOPS[i];
    if (x <= t1) {
      const [t0, c0] = STOPS[i - 1];
      const f = (x - t0) / (t1 - t0);
      return [0, 1, 2].map((k) => (c0[k] + (c1[k] - c0[k]) * f) / 255) as [number, number, number];
    }
  }
  return [1, 0.886, 0.604];
}

export const rampCss = (t: number) => {
  const [r, g, b] = ramp(t);
  return `rgb(${Math.round(r * 255)} ${Math.round(g * 255)} ${Math.round(b * 255)})`;
};

/** Background for a token chip shaded by activation (relative, 0..1; negative → rose).
 *  Chips stay faint while they carry the page's own ink, then jump to a strong fill with
 *  dark ink, so text keeps 4.5:1 contrast on both the dark and the light page. */
export function tokenBg(rel: number): string {
  if (!Number.isFinite(rel) || rel > -0.06 && rel < 0.08) return "transparent";
  // GELU only dips to about -0.17, so negatives stay faint unless an edit drives them
  if (rel < 0) return `rgb(255 122 138 / ${rel <= -0.4 ? 0.9 : Math.min(0.4, -rel)})`;
  const [r, g, b] = ramp(0.35 + rel * 0.65);
  const a = rel >= 0.6 ? Math.min(0.92, 0.62 + (rel - 0.6) * 0.75) : 0.16 + rel * 0.4;
  return `rgb(${Math.round(r * 255)} ${Math.round(g * 255)} ${Math.round(b * 255)} / ${a.toFixed(3)})`;
}

export const tokenFg = (rel: number) => (Number.isFinite(rel) && (rel >= 0.6 || rel <= -0.4) ? "#141833" : "inherit");

export const GOLD = "#ffe29a";
export const ROSE = "#ff7a8a";
export const LAVENDER = "#b9a6ff";
