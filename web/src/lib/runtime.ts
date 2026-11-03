// Typed client for the model worker.

import type { Edit, ModelMeta } from "./model";
import type { Pred, Req, Res } from "./worker";

export type Analysis = Extract<Res, { kind: "analysis" }>;
export type { Pred };

type Pending = { resolve: (r: Res) => void; reject: (e: Error) => void; onEvent?: (r: Res) => void };

export class Runtime {
  private worker: Worker;
  private next = 1;
  private pending = new Map<number, Pending>();
  meta: ModelMeta | null = null;

  constructor() {
    this.worker = new Worker(new URL("./worker.ts", import.meta.url), { type: "module" });
    this.worker.onmessage = (ev: MessageEvent<Res>) => {
      const r = ev.data;
      const p = this.pending.get(r.id);
      if (!p) return;
      if (r.kind === "error") {
        this.pending.delete(r.id);
        p.reject(new Error(r.message));
      } else if (r.kind === "progress" || r.kind === "token") {
        p.onEvent?.(r);
      } else {
        this.pending.delete(r.id);
        p.resolve(r);
      }
    };
  }

  private call(req: Omit<Req, "id"> & { kind: Req["kind"] }, onEvent?: (r: Res) => void): { id: number; done: Promise<Res> } {
    const id = this.next++;
    const done = new Promise<Res>((resolve, reject) => this.pending.set(id, { resolve, reject, onEvent }));
    this.worker.postMessage({ ...req, id } as Req);
    return { id, done };
  }

  async init(base: string, onProgress: (loaded: number, total: number) => void) {
    const r = await this.call({ kind: "init", base } as Req, (e) => {
      if (e.kind === "progress") onProgress(e.loaded, e.total);
    }).done;
    if (r.kind === "ready") this.meta = r.meta;
    return this.meta!;
  }

  async analyze(text: string, edits: Edit[], maxTokens = 128): Promise<Analysis> {
    return (await this.call({ kind: "analyze", text, edits, maxTokens } as Req).done) as Analysis;
  }

  generate(
    opts: { prompt: string; variants: Edit[][]; maxTokens: number; temperature: number; topP: number; seed: number },
    onToken: (variant: number, token: number) => void,
  ) {
    const { id, done } = this.call({ kind: "generate", ...opts } as Req, (e) => {
      if (e.kind === "token") onToken(e.variant, e.token);
    });
    return { cancel: () => this.worker.postMessage({ kind: "cancel", id } as Req), done };
  }
}
