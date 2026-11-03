// GPT-2 byte-level BPE over the pruned vocabulary exported by the pipeline.
// Merges whose result was pruned are absent, so BPE simply stops earlier and
// produces smaller pieces that are all in the vocabulary.

export interface TokenizerData {
  tokens: string[];
  merges: string[];
  eos: number;
  freq: number[];
}

const PRETOKEN = /'s|'t|'re|'ve|'m|'ll|'d| ?\p{L}+| ?\p{N}+| ?[^\s\p{L}\p{N}]+|\s+(?!\S)|\s+/gu;

function bytesToUnicode(): string[] {
  const bs: number[] = [];
  for (let i = 33; i <= 126; i++) bs.push(i);
  for (let i = 161; i <= 172; i++) bs.push(i);
  for (let i = 174; i <= 255; i++) bs.push(i);
  const cs = bs.slice();
  let n = 0;
  for (let b = 0; b < 256; b++) {
    if (!bs.includes(b)) {
      bs.push(b);
      cs.push(256 + n++);
    }
  }
  const map: string[] = new Array(256);
  bs.forEach((b, i) => (map[b] = String.fromCharCode(cs[i])));
  return map;
}

export class Tokenizer {
  readonly tokens: string[];
  readonly eos: number;
  readonly freq: number[];
  private ids = new Map<string, number>();
  private ranks = new Map<string, number>();
  private byteEnc = bytesToUnicode();
  private byteDec = new Map<string, number>();
  private cache = new Map<string, number[]>();
  private display: string[];

  constructor(data: TokenizerData) {
    this.tokens = data.tokens;
    this.eos = data.eos;
    this.freq = data.freq;
    data.tokens.forEach((t, i) => this.ids.set(t, i));
    data.merges.forEach((m, i) => this.ranks.set(m, i));
    this.byteEnc.forEach((c, b) => this.byteDec.set(c, b));
    this.display = data.tokens.map((_, i) => this.decode([i]));
  }

  get size() {
    return this.tokens.length;
  }

  encode(text: string): number[] {
    const out: number[] = [];
    const utf8 = new TextEncoder();
    for (const m of text.matchAll(PRETOKEN)) {
      const word = Array.from(utf8.encode(m[0]), (b) => this.byteEnc[b]).join("");
      for (const piece of this.bpe(word)) {
        const id = this.ids.get(piece);
        if (id !== undefined) out.push(id);
        else for (const ch of piece) out.push(this.ids.get(ch)!); // every byte char is kept
      }
    }
    return out;
  }

  private bpe(word: string): string[] {
    const hit = this.cache.get(word);
    if (hit) return hit.map((i) => this.tokens[i]);
    let parts = Array.from(word);
    while (parts.length > 1) {
      let best = -1;
      let bestRank = Infinity;
      for (let i = 0; i < parts.length - 1; i++) {
        const r = this.ranks.get(parts[i] + " " + parts[i + 1]);
        if (r !== undefined && r < bestRank) {
          bestRank = r;
          best = i;
        }
      }
      if (best < 0) break;
      const a = parts[best];
      const b = parts[best + 1];
      const next: string[] = [];
      for (let i = 0; i < parts.length; i++) {
        if (i < parts.length - 1 && parts[i] === a && parts[i + 1] === b) {
          next.push(a + b);
          i++;
        } else next.push(parts[i]);
      }
      parts = next;
    }
    const ids = parts.map((p) => this.ids.get(p));
    if (ids.every((i) => i !== undefined)) this.cache.set(word, ids as number[]);
    return parts;
  }

  decode(ids: number[]): string {
    const bytes: number[] = [];
    for (const id of ids) {
      const t = this.tokens[id];
      if (t === undefined) continue;
      if (t === "<|endoftext|>") {
        for (const b of new TextEncoder().encode("\n\n")) bytes.push(b);
        continue;
      }
      for (const ch of t) {
        const b = this.byteDec.get(ch);
        if (b !== undefined) bytes.push(b);
      }
    }
    return new TextDecoder("utf-8", { fatal: false }).decode(new Uint8Array(bytes));
  }

  /** Readable form of one token, as cached at load. */
  str(id: number): string {
    return this.display[id] ?? "?";
  }
}
