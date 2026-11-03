"""Steering sweep over every MLP neuron of TinyStories-8M, with random-direction controls.

    python pipeline/sweep.py --corpus TinyStories-valid.txt --cache pipeline/cache

Adapts the `main_rel` design of lyramakesmusic/neuron-explorer to an 8-layer model:
pushes are sized relative to the median residual norm leaving the layer, so every
neuron and every random direction in a layer gets the same push size.

Writes to --cache (not committed; analyze.py turns it into web data):
  norms.json        median residual norm leaving each layer
  calib.npz         per-layer coherence of random directions across doses
  sweep_raw.npz     greedy rollouts for every neuron + 256 random directions per layer
  steerlens.npz     next-token Δlogprob under a ±w push, per neuron
  cofire.npz        per-layer activation correlation on corpus tokens
"""

from __future__ import annotations

import argparse
import json
import time
from pathlib import Path

import numpy as np
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

MODEL_ID = "roneneldan/TinyStories-8M"
PROMPTS = [
    "Once upon a time, there was a little bunny named Tim. One day,",
    "Lily and her mom went to the store to buy food. Lily saw",
    "The sun was shining. Ben went outside to play with his ball. He",
]
FREE = "Once upon a time,"
GEN = 40
N_CTRL = 256
CALIB_DOSES = [0.2, 0.4, 0.6, 0.8, 1.0, 1.3, 1.6, 2.0]
LENS_CONTEXTS = [
    "Once upon a time, there was a",
    "Tom and Sue went to the park. They saw a",
    "Mom said, \"Be careful!\" The little girl was",
    "The dog ran fast. It wanted to",
]


def log(*a):
    print(f"[{time.strftime('%H:%M:%S')}]", *a, flush=True)


class Steer:
    """Adds a per-row vector to one layer's MLP output (= residual stream write)."""

    def __init__(self, model):
        self.model = model
        self.h = None

    def set(self, layer: int, vecs: torch.Tensor | None):
        self.clear()
        if vecs is None:
            return
        v = vecs[:, None, :]
        self.h = self.model.transformer.h[layer].mlp.register_forward_hook(lambda _m, _i, o: o + v)

    def clear(self):
        if self.h is not None:
            self.h.remove()
            self.h = None


def distinct4(ids: np.ndarray, end: int) -> float:
    seq = [t for t in ids if t < end]
    grams = [tuple(seq[i : i + 4]) for i in range(len(seq) - 3)]
    return len(set(grams)) / len(grams) if grams else 1.0


@torch.no_grad()
def generate(model, tok, prompt: str, steer: Steer, layer: int, vecs: torch.Tensor) -> np.ndarray:
    ids = tok(prompt, return_tensors="pt").input_ids.repeat(vecs.shape[0], 1)
    steer.set(layer, vecs)
    try:
        out = model.generate(
            ids, attention_mask=torch.ones_like(ids), max_new_tokens=GEN, do_sample=False,
            pad_token_id=tok.eos_token_id, eos_token_id=tok.eos_token_id,
        )
    finally:
        steer.clear()
    gen = out[:, ids.shape[1]:].numpy()
    res = np.full((vecs.shape[0], GEN), tok.eos_token_id, dtype=np.int64)
    res[:, : gen.shape[1]] = gen
    return res


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--corpus", required=True)
    ap.add_argument("--cache", default="pipeline/cache")
    ap.add_argument("--batch", type=int, default=256)
    ap.add_argument("--only", default="norms,calib,sweep,lens,cofire")
    args = ap.parse_args()
    out = Path(args.cache)
    out.mkdir(parents=True, exist_ok=True)
    steps = set(args.only.split(","))
    torch.set_grad_enabled(False)
    torch.manual_seed(0)

    tok = AutoTokenizer.from_pretrained(MODEL_ID)
    model = AutoModelForCausalLM.from_pretrained(MODEL_ID).eval()
    L = model.config.num_layers
    N = 4 * model.config.hidden_size
    D = model.config.hidden_size
    EOS = tok.eos_token_id
    steer = Steer(model)
    texts = [t.strip() for t in Path(args.corpus).read_text(encoding="utf-8").split("<|endoftext|>") if t.strip()]

    # unit directions: neuron output columns, then random controls (fixed seed)
    cols = torch.stack([model.transformer.h[l].mlp.c_proj.weight.T for l in range(L)])  # [L,N,D]
    dirs_n = cols / cols.norm(dim=-1, keepdim=True)
    g = torch.Generator().manual_seed(1234)
    ctrl = torch.randn(L, N_CTRL, D, generator=g)
    dirs_c = ctrl / ctrl.norm(dim=-1, keepdim=True)

    # ---------------------------------------------------------------- norms
    if "norms" in steps:
        # hook each block's output: HF's last `hidden_states` entry is after ln_f, not the residual
        norms = [[] for _ in range(L)]
        hooks = [model.transformer.h[l].register_forward_hook(
            lambda _m, _i, o, l=l: norms[l].append(o[0][0, 1:].norm(dim=-1))) for l in range(L)]  # skip position 0
        for t in texts[:300]:
            model(tok(t, return_tensors="pt").input_ids[:, :256])
        for h in hooks:
            h.remove()
        rn = [float(torch.cat(n).median()) for n in norms]
        (out / "norms.json").write_text(json.dumps({"resid_norm": rn, "col_norm": cols.norm(dim=-1).tolist()}))
        log("residual norms", [round(x, 2) for x in rn])
    meta = json.loads((out / "norms.json").read_text())
    rn = meta["resid_norm"]

    # ---------------------------------------------------------------- calibration
    if "calib" in steps:
        coh = np.zeros((L, len(CALIB_DOSES)))
        for l in range(L):
            for di, d in enumerate(CALIB_DOSES):
                vals = []
                for p in PROMPTS:
                    r = generate(model, tok, p, steer, l, dirs_c[l, :32] * d * rn[l])
                    vals += [distinct4(x, EOS) for x in r]
                coh[l, di] = np.mean(vals)
            log(f"calib L{l}", np.round(coh[l], 2).tolist())
        np.savez(out / "calib.npz", doses=np.array(CALIB_DOSES), coherence=coh)
    cal = np.load(out / "calib.npz")
    # coherent window: the largest dose at which random directions still average ≥ 0.85 distinct-4
    w = []
    for l in range(L):
        ok = [d for d, c in zip(cal["doses"], cal["coherence"][l]) if c >= 0.85]
        w.append(float(min(max(ok) if ok else cal["doses"][0], 1.0)))
    log("window per layer", w)

    # ---------------------------------------------------------------- sweep
    # 10 cells: 3 prompts × (−w, +w/2, +w) + free × 1.5w ; plus unsteered baselines
    cells = [(pi, s) for pi in range(3) for s in (-1.0, 0.5, 1.0)] + [(3, 1.5)]
    if "sweep" in steps:
        U = N + N_CTRL
        roll = np.zeros((L, U, len(cells), GEN), dtype=np.int64)
        prompts = PROMPTS + [FREE]
        base = np.stack([generate(model, tok, p, steer, 0, torch.zeros(1, D))[0] for p in prompts])
        t0 = time.time()
        for l in range(L):
            dirs = torch.cat([dirs_n[l], dirs_c[l]])  # [U,D]
            for ci, (pi, s) in enumerate(cells):
                for b0 in range(0, U, args.batch):
                    vecs = dirs[b0 : b0 + args.batch] * (s * w[l] * rn[l])
                    roll[l, b0 : b0 + len(vecs), ci] = generate(model, tok, prompts[pi], steer, l, vecs)
            log(f"sweep L{l} done ({time.time() - t0:.0f}s)")
            np.savez_compressed(out / "sweep_raw.npz", rollouts=roll, baselines=base, window=np.array(w),
                                cells=np.array(cells), layers_done=l + 1)

    # ---------------------------------------------------------------- steer lens
    if "lens" in steps:
        K = 12
        V = model.config.vocab_size
        up_ids = np.zeros((L, N, K), dtype=np.int64)
        up_val = np.zeros((L, N, K), dtype=np.float32)
        dn_ids = np.zeros((L, N, K), dtype=np.int64)
        dn_val = np.zeros((L, N, K), dtype=np.float32)
        kl = np.zeros((L, N, 2), dtype=np.float32)
        ctx = [tok(c, return_tensors="pt").input_ids for c in LENS_CONTEXTS]
        base_lp = [torch.log_softmax(model(c).logits[0, -1], -1) for c in ctx]
        for l in range(L):
            for sgn_i, sgn in enumerate((1.0, -1.0)):
                acc = torch.zeros(N, V)
                kls = torch.zeros(N)
                for c, blp in zip(ctx, base_lp):
                    for b0 in range(0, N, args.batch):
                        vecs = dirs_n[l, b0 : b0 + args.batch] * (sgn * w[l] * rn[l])
                        steer.set(l, vecs)
                        try:
                            lp = torch.log_softmax(model(c.repeat(len(vecs), 1)).logits[:, -1], -1)
                        finally:
                            steer.clear()
                        acc[b0 : b0 + len(vecs)] += lp - blp
                        kls[b0 : b0 + len(vecs)] += (lp.exp() * (lp - blp)).sum(-1)
                acc /= len(ctx)
                kl[l, :, sgn_i] = (kls / len(ctx)).numpy()
                if sgn > 0:
                    t = acc.topk(K, -1)
                    up_ids[l], up_val[l] = t.indices.numpy(), t.values.numpy()
                else:
                    t = acc.topk(K, -1)  # tokens a negative push raises
                    dn_ids[l], dn_val[l] = t.indices.numpy(), t.values.numpy()
            log(f"steer lens L{l}")
        np.savez(out / "steerlens.npz", up_ids=up_ids, up_val=up_val, dn_ids=dn_ids, dn_val=dn_val, kl=kl)

    # ---------------------------------------------------------------- co-firing
    if "cofire" in steps:
        acts = [[] for _ in range(L)]
        hooks = [model.transformer.h[l].mlp.act.register_forward_hook(
            lambda _m, _i, o, l=l: acts[l].append(o[0, 1:].clone())) for l in range(L)]
        n_tok = 0
        for t in texts[5000:]:  # stories disjoint from the atlas corpus
            ids = tok(t, return_tensors="pt").input_ids[:, :256]
            model(ids)
            n_tok += ids.shape[1] - 1
            if n_tok >= 40000:
                break
        for h in hooks:
            h.remove()
        corr = np.zeros((L, N, N), dtype=np.float16)
        for l in range(L):
            a = torch.cat(acts[l]).double()
            a = (a - a.mean(0)) / (a.std(0) + 1e-6)
            corr[l] = ((a.T @ a) / len(a)).numpy().astype(np.float16)
        np.savez_compressed(out / "cofire.npz", corr=corr, tokens=n_tok)
        log(f"co-firing over {n_tok} tokens")
    log("done")


if __name__ == "__main__":
    main()
