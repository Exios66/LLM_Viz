// Typed client for the model worker. Survives worker crashes: every pending call
// is rejected with a readable error and the next call starts a fresh worker.

import type { Edit, ModelMeta } from "./model";
import type { Pred, Req, Res } from "./worker";

export type Analysis = Extract<Res, { kind: "analysis" }>;
export type { Pred };

type Pending = { resolve: (r: Res) => void; reject: (e: Error) => void; onEvent?: (r: Res) => void };

export class Runtime {
  private worker: Worker | null = null;
  private next = 1;
  private pending = new Map<number, Pending>();
  private base = "";
  private ready: Promise<ModelMeta> | null = null;
  meta: ModelMeta | null = null;
  /** called when the worker dies unexpectedly */
  onCrash: ((message: string) => void) | null = null;

  private spawn() {
    const w = new Worker(new URL("./worker.ts", import.meta.url), { type: "module" });
    w.onmessage = (ev: MessageEvent<Res>) => {
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
    const die = (message: string) => {
      for (const p of this.pending.values()) p.reject(new Error(message));
      this.pending.clear();
      w.terminate();
      if (this.worker === w) {
        this.worker = null;
        this.ready = null;
      }
      this.onCrash?.(message);
    };
    w.onerror = (ev) => {
      ev.preventDefault();
      die(`The model worker stopped: ${ev.message || "unknown error"}`);
    };
    w.onmessageerror = () => die("The model worker sent a message that could not be read.");
    this.worker = w;
    return w;
  }

  private call(req: Omit<Req, "id">, onEvent?: (r: Res) => void, w = this.worker ?? this.spawn()) {
    const id = this.next++;
    const done = new Promise<Res>((resolve, reject) => this.pending.set(id, { resolve, reject, onEvent }));
    w.postMessage({ ...req, id } as Req);
    return { id, done };
  }

  init(base: string, onProgress: (loaded: number, total: number) => void): Promise<ModelMeta> {
    this.base = base;
    const w = this.worker ?? this.spawn();
    this.ready = this.call({ kind: "init", base } as Omit<Req, "id">, (e) => {
      if (e.kind === "progress") onProgress(e.loaded, e.total);
    }, w).done.then((r) => {
      if (r.kind !== "ready") throw new Error("unexpected reply while loading the model");
      this.meta = r.meta;
      return r.meta;
    });
    return this.ready;
  }

  /** Make sure a worker with weights loaded exists (restarting after a crash). */
  private async ensure() {
    if (!this.ready) {
      if (!this.base) throw new Error("model not initialised");
      await this.init(this.base, () => undefined);
    } else await this.ready;
  }

  async analyze(text: string, edits: Edit[], maxTokens = 128): Promise<Analysis> {
    await this.ensure();
    return (await this.call({ kind: "analyze", text, edits, maxTokens } as Omit<Req, "id">).done) as Analysis;
  }

  generate(
    opts: { prompt: string; variants: Edit[][]; maxTokens: number; temperature: number; topP: number; seed: number },
    onToken: (variant: number, token: number) => void,
  ) {
    let id = -1;
    let cancelled = false;
    const done = this.ensure().then(() => {
      if (cancelled) return { kind: "done", id: -1, promptTokens: [] } as Res;
      const c = this.call({ kind: "generate", ...opts } as Omit<Req, "id">, (e) => {
        if (e.kind === "token") onToken(e.variant, e.token);
      });
      id = c.id;
      return c.done;
    });
    return {
      cancel: () => {
        cancelled = true;
        if (id >= 0) this.worker?.postMessage({ kind: "cancel", id } as Req);
      },
      done,
    };
  }
}
