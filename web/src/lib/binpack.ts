// Reader for the JSON-manifest + binary-blob format written by pipeline/binpack.py.

export type DType = "f32" | "f16" | "i8" | "u8" | "i16" | "u16" | "i32" | "u32";
export type AnyArray = Float32Array | Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array;

interface Entry {
  dtype: DType;
  shape: number[];
  offset: number;
  bytes: number;
}

export interface Pack<M = Record<string, unknown>> {
  meta: M;
  shapes: Record<string, number[]>;
  /** f16 arrays are widened to Float32Array on read. */
  get<T extends AnyArray = Float32Array>(name: string): T;
}

const f16Table = (() => {
  const t = new Float32Array(65536);
  for (let h = 0; h < 65536; h++) {
    const s = h & 0x8000 ? -1 : 1;
    const e = (h >> 10) & 0x1f;
    const f = h & 0x3ff;
    if (e === 0) t[h] = s * 2 ** -14 * (f / 1024);
    else if (e === 31) t[h] = f ? NaN : s * Infinity;
    else t[h] = s * 2 ** (e - 15) * (1 + f / 1024);
  }
  return t;
})();

export function f16ToF32(src: Uint16Array): Float32Array {
  const out = new Float32Array(src.length);
  for (let i = 0; i < src.length; i++) out[i] = f16Table[src[i]];
  return out;
}

export function parsePack<M>(manifest: { meta: M; arrays: Record<string, Entry> }, buf: ArrayBuffer): Pack<M> {
  const cache = new Map<string, AnyArray>();
  const shapes: Record<string, number[]> = {};
  for (const [k, e] of Object.entries(manifest.arrays)) shapes[k] = e.shape;
  return {
    meta: manifest.meta,
    shapes,
    get<T extends AnyArray>(name: string): T {
      const hit = cache.get(name);
      if (hit) return hit as T;
      const e = manifest.arrays[name];
      if (!e) throw new Error(`pack has no array "${name}"`);
      let arr: AnyArray;
      switch (e.dtype) {
        case "f32": arr = new Float32Array(buf, e.offset, e.bytes / 4); break;
        case "f16": arr = f16ToF32(new Uint16Array(buf, e.offset, e.bytes / 2)); break;
        case "i8": arr = new Int8Array(buf, e.offset, e.bytes); break;
        case "u8": arr = new Uint8Array(buf, e.offset, e.bytes); break;
        case "i16": arr = new Int16Array(buf, e.offset, e.bytes / 2); break;
        case "u16": arr = new Uint16Array(buf, e.offset, e.bytes / 2); break;
        case "i32": arr = new Int32Array(buf, e.offset, e.bytes / 4); break;
        case "u32": arr = new Uint32Array(buf, e.offset, e.bytes / 4); break;
      }
      cache.set(name, arr);
      return arr as T;
    },
  };
}

export type Fetcher = (path: string) => Promise<Response>;

export async function loadPack<M>(
  fetcher: Fetcher,
  base: string,
  onProgress?: (loaded: number, total: number) => void,
): Promise<Pack<M>> {
  const name = base.split("/").pop();
  const mres = await fetcher(`${base}.json`);
  if (!mres.ok) throw new Error(`${name}.json: HTTP ${mres.status}`);
  let manifest: { meta: M; arrays: Record<string, Entry> };
  try {
    manifest = await mres.json();
  } catch {
    throw new Error(`${name}.json is not valid JSON`);
  }
  if (!manifest || typeof manifest !== "object" || !manifest.arrays) throw new Error(`${name}.json is not a pack manifest`);
  const res = await fetcher(`${base}.bin`);
  if (!res.ok) throw new Error(`${name}.bin: HTTP ${res.status}`);
  const buf = await readWithProgress(res, onProgress);
  validatePack(name ?? base, manifest.arrays, buf.byteLength);
  return parsePack<M>(manifest, buf);
}

const DTYPE_BYTES: Record<string, number> = { f32: 4, f16: 2, i8: 1, u8: 1, i16: 2, u16: 2, i32: 4, u32: 4 };

/** Reject truncated or mismatched downloads before any typed array is built on them. */
export function validatePack(name: string, arrays: Record<string, Entry>, byteLength: number) {
  for (const [k, e] of Object.entries(arrays)) {
    const w = DTYPE_BYTES[e.dtype];
    if (!w) throw new Error(`${name}: array "${k}" has unknown dtype ${e.dtype}`);
    const count = e.shape.reduce((a, b) => a * b, 1);
    if (e.bytes !== count * w) throw new Error(`${name}: array "${k}" size does not match its shape`);
    if (e.offset % w !== 0) throw new Error(`${name}: array "${k}" is misaligned`);
    if (e.offset + e.bytes > byteLength) throw new Error(`${name}.bin is incomplete (${byteLength.toLocaleString()} bytes); try reloading`);
  }
}

async function readWithProgress(res: Response, onProgress?: (l: number, t: number) => void): Promise<ArrayBuffer> {
  const total = Number(res.headers.get("content-length") ?? 0);
  if (!res.body || !onProgress) return res.arrayBuffer();
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let loaded = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    loaded += value.length;
    onProgress(loaded, total);
  }
  const out = new Uint8Array(loaded);
  let o = 0;
  for (const c of chunks) {
    out.set(c, o);
    o += c.length;
  }
  return out.buffer;
}

/** fetch + JSON with a readable error instead of "Unexpected token <". */
export async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  const name = url.split("/").pop();
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
  try {
    return (await res.json()) as T;
  } catch {
    throw new Error(`${name} is not valid JSON`);
  }
}
