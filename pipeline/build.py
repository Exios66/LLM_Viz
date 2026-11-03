"""Build the static data the Neuron Atlas web app reads.

    python pipeline/build.py --corpus TinyStories-valid.txt --out web/public/data

Outputs (all under --out):
  model.json / model.bin      TinyStories-8M weights (fp16) with a pruned vocabulary
  tokenizer.json              byte-level BPE vocab + merges for the pruned vocabulary
  atlas.json / atlas.bin      per-neuron stats, layout, logit lens, connections, top contexts
  corpus.json / corpus.bin    the token ids of the stories the contexts point into
  testvec.json                a reference forward pass used by `npm run verify`

Neurons are the 1024 post-GELU units of each of the 8 MLP layers (8192 in all).
"""

from __future__ import annotations

import argparse
import json
import time
from collections import Counter
from pathlib import Path

import numpy as np
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

from binpack import write_pack

MODEL_ID = "roneneldan/TinyStories-8M"
MAX_POS = 512  # positions kept from wpe; the app caps context at this
STORY_TOKENS = 256  # stories are truncated to this many tokens for the atlas
TOPK = 20  # top-activating contexts kept per neuron
W_BEFORE, W_AFTER = 20, 6  # context window around the max-activating token
LENS_K = 12  # logit lens tokens per pole
CONN_K = 10  # connections kept per direction
HIST_BINS = 24


def log(*a):
    print(f"[{time.strftime('%H:%M:%S')}]", *a, flush=True)


# --------------------------------------------------------------------------- vocab


def prune_vocab(tok, stories_ids: list[list[int]]):
    """Keep every token the corpus uses plus the byte alphabet and the BPE parents
    needed to reach them, so BPE over the filtered merges is still exact."""
    tj = json.loads(tok.backend_tokenizer.to_str())
    vocab: dict[str, int] = tj["model"]["vocab"]
    merges = [tuple(m.split(" ")) if isinstance(m, str) else tuple(m) for m in tj["model"]["merges"]]
    id2str = {i: s for s, i in vocab.items()}

    counts = Counter()
    for ids in stories_ids:
        counts.update(ids)

    parents = {}
    for a, b in merges:
        parents.setdefault(a + b, (a, b))

    keep: set[str] = set()
    stack = [id2str[i] for i in counts] + [id2str[i] for i in range(256)] + ["<|endoftext|>"]
    while stack:
        s = stack.pop()
        if s in keep:
            continue
        keep.add(s)
        if s in parents and len(s) > 1:
            stack.extend(parents[s])

    old_ids = sorted(vocab[s] for s in keep)
    new_of_old = {o: n for n, o in enumerate(old_ids)}
    kept_merges = [f"{a} {b}" for a, b in merges if a in keep and b in keep and (a + b) in keep]
    tokens = [id2str[o] for o in old_ids]
    freq = np.array([counts.get(o, 0) for o in old_ids], dtype=np.int64)
    return old_ids, new_of_old, tokens, kept_merges, freq


# --------------------------------------------------------------------------- model export


def export_model(model, old_ids, out: Path, meta_extra: dict):
    sd = {k: v.detach().float().numpy() for k, v in model.state_dict().items()}
    cfg = model.config
    arrays: dict[str, tuple[str, np.ndarray]] = {}
    arrays["wte"] = ("f16", sd["transformer.wte.weight"][old_ids])
    arrays["wpe"] = ("f16", sd["transformer.wpe.weight"][:MAX_POS])
    for l in range(cfg.num_layers):
        p = f"transformer.h.{l}."
        a = p + "attn.attention."
        for name, key in [
            ("ln1.w", p + "ln_1.weight"), ("ln1.b", p + "ln_1.bias"),
            ("q", a + "q_proj.weight"), ("k", a + "k_proj.weight"), ("v", a + "v_proj.weight"),
            ("o", a + "out_proj.weight"), ("o.b", a + "out_proj.bias"),
            ("ln2.w", p + "ln_2.weight"), ("ln2.b", p + "ln_2.bias"),
            ("fc", p + "mlp.c_fc.weight"), ("fc.b", p + "mlp.c_fc.bias"),
            ("proj", p + "mlp.c_proj.weight"), ("proj.b", p + "mlp.c_proj.bias"),
        ]:
            arrays[f"h{l}.{name}"] = ("f16" if sd[key].ndim == 2 else "f32", sd[key])
    arrays["lnf.w"] = ("f32", sd["transformer.ln_f.weight"])
    arrays["lnf.b"] = ("f32", sd["transformer.ln_f.bias"])
    meta = {
        "name": MODEL_ID,
        "d_model": cfg.hidden_size,
        "n_layers": cfg.num_layers,
        "n_heads": cfg.num_heads,
        "d_mlp": 4 * cfg.hidden_size,
        "vocab": len(old_ids),
        "max_pos": MAX_POS,
        "window": cfg.window_size,
        "attention_layers": cfg.attention_layers,
        "ln_eps": cfg.layer_norm_epsilon,
        "activation": cfg.activation_function,
        **meta_extra,
    }
    size = write_pack(out / "model", arrays, meta)
    log(f"model.bin {size / 1e6:.1f} MB")


# --------------------------------------------------------------------------- layout


def sheet_layout(x: np.ndarray, side: int) -> np.ndarray:
    """Place each neuron on a side×side grid so that neighbours write similar
    directions: sort by the first principal component into columns, then by the
    second within each column. Returns grid coordinates in [-1, 1]."""
    x = x / (np.linalg.norm(x, axis=1, keepdims=True) + 1e-8)
    x = x - x.mean(0)
    _, _, vt = np.linalg.svd(x, full_matrices=False)
    pc = x @ vt[:2].T
    order = np.argsort(pc[:, 0], kind="stable")
    pos = np.zeros((len(x), 2), dtype=np.float32)
    for c in range(side):
        col = order[c * side : (c + 1) * side]
        col = col[np.argsort(pc[col, 1], kind="stable")]
        for r, n in enumerate(col):
            pos[n] = (c, r)
    return pos / (side - 1) * 2 - 1


# --------------------------------------------------------------------------- atlas


class Recorder:
    def __init__(self, model):
        self.acts: list[torch.Tensor | None] = [None] * model.config.num_layers
        self.hooks = [
            blk.mlp.act.register_forward_hook(self._hook(l)) for l, blk in enumerate(model.transformer.h)
        ]

    def _hook(self, l):
        def fn(_m, _i, out):
            self.acts[l] = out[0].detach()

        return fn

    def stacked(self) -> torch.Tensor:  # [L, T, N]
        return torch.stack(self.acts, 0)

    def remove(self):
        for h in self.hooks:
            h.remove()


@torch.no_grad()
def run_atlas(model, stories: list[list[int]], new_of_old, freq, out: Path):
    cfg = model.config
    L, N = cfg.num_layers, 4 * cfg.hidden_size
    rec = Recorder(model)
    S = len(stories)

    # pass 1: per-story max and argmax per neuron, global moments
    smax = torch.empty(S, L, N)
    sarg = torch.empty(S, L, N, dtype=torch.int16)
    tot = 0
    s1 = torch.zeros(L, N, dtype=torch.float64)
    s2 = torch.zeros(L, N, dtype=torch.float64)
    pos_cnt = torch.zeros(L, N, dtype=torch.float64)
    t0 = time.time()
    for si, ids in enumerate(stories):
        model(torch.tensor([ids]))
        a = rec.stacked()  # [L,T,N]
        m, am = a.max(1)
        smax[si], sarg[si] = m, am.to(torch.int16)
        s1 += a.sum(1).double()
        s2 += (a * a).sum(1).double()
        pos_cnt += (a > 0).sum(1).double()
        tot += a.shape[1]
        if si % 500 == 0:
            log(f"pass1 {si}/{S} ({time.time() - t0:.0f}s)")
    mean = (s1 / tot).float()
    std = (s2 / tot - (s1 / tot) ** 2).clamp_min(0).sqrt().float()
    density = (pos_cnt / tot).float()
    gmax = smax.max(0).values  # [L,N]

    # top stories per neuron (one context per story keeps the examples diverse)
    top_val, top_story = smax.permute(1, 2, 0).topk(TOPK, dim=-1)  # [L,N,K]
    top_pos = torch.gather(sarg.permute(1, 2, 0).long(), -1, top_story)  # [L,N,K]

    # pass 2: windows for the selected (story, neuron) pairs + histograms
    need: dict[int, list[tuple[int, int, int, int]]] = {}
    ts, tp = top_story.numpy(), top_pos.numpy()
    for l in range(L):
        for n in range(N):
            for k in range(TOPK):
                need.setdefault(int(ts[l, n, k]), []).append((l, n, k, int(tp[l, n, k])))
    W = W_BEFORE + 1 + W_AFTER
    windows = np.full((L, N, TOPK, W), -128, dtype=np.int8)
    hist = torch.zeros(L, N, HIST_BINS, dtype=torch.float64)
    scale = gmax.clamp_min(1e-6)
    t0 = time.time()
    for si, ids in enumerate(stories):
        model(torch.tensor([ids]))
        a = rec.stacked()  # [L,T,N]
        rel = (a / scale[:, None, :]).clamp(-1, 1)
        b = (rel.clamp_min(0) * HIST_BINS).long().clamp_max(HIST_BINS - 1)
        mask = (a > 0).double()
        hist.scatter_add_(2, b.permute(0, 2, 1), mask.permute(0, 2, 1))
        if si in need:
            q = (rel * 127).round().to(torch.int8).numpy()
            T = a.shape[1]
            for l, n, k, p in need[si]:
                lo, hi = p - W_BEFORE, p + W_AFTER + 1
                src_lo, src_hi = max(lo, 0), min(hi, T)
                windows[l, n, k, src_lo - lo : src_hi - lo] = q[l, src_lo:src_hi, n]
        if si % 500 == 0:
            log(f"pass2 {si}/{S} ({time.time() - t0:.0f}s)")
    rec.remove()

    # weights for lens, connections, layout
    sd = model.state_dict()
    proj = torch.stack([sd[f"transformer.h.{l}.mlp.c_proj.weight"] for l in range(L)])  # [L,d,N]
    fc = torch.stack([sd[f"transformer.h.{l}.mlp.c_fc.weight"] for l in range(L)])  # [L,N,d]
    ln2 = torch.stack([sd[f"transformer.h.{l}.ln_2.weight"] for l in range(L)])  # [L,d]
    old_sorted = torch.tensor(sorted(new_of_old, key=new_of_old.get))
    wu = sd["transformer.wte.weight"][old_sorted]  # [V,d]
    gf = sd["transformer.ln_f.weight"]

    # logit lens: direct effect of each neuron's output vector on the logits
    lens_mask = torch.from_numpy(freq >= 5)
    lens_ids = np.zeros((L, N, 2, LENS_K), dtype=np.uint16)
    lens_val = np.zeros((L, N, 2, LENS_K), dtype=np.float16)
    for l in range(L):
        v = proj[l].T  # [N,d]
        v = (v - v.mean(-1, keepdim=True)) * gf
        logits = v @ wu.T  # [N,V]
        logits = logits - logits.mean(-1, keepdim=True)
        neg_inf = torch.full_like(logits, -1e9)
        hi = torch.where(lens_mask, logits, neg_inf).topk(LENS_K, -1)
        lo = torch.where(lens_mask, -logits, neg_inf).topk(LENS_K, -1)
        lens_ids[l, :, 0], lens_val[l, :, 0] = hi.indices.numpy(), hi.values.numpy()
        lens_ids[l, :, 1], lens_val[l, :, 1] = lo.indices.numpy(), -lo.values.numpy()

    # connections: virtual weight from (l1,a) to (l2,b) through the residual stream,
    # scaled by a's max activation so links read as "effect on b's input at a's peak"
    up_ids = np.zeros((L, N, CONN_K), dtype=np.uint16)  # encoded layer*N + n
    up_w = np.zeros((L, N, CONN_K), dtype=np.float16)
    dn_ids = np.zeros((L, N, CONN_K), dtype=np.uint16)
    dn_w = np.zeros((L, N, CONN_K), dtype=np.float16)
    virt = {}
    for l1 in range(L):
        for l2 in range(l1 + 1, L):
            virt[(l1, l2)] = ((fc[l2] * ln2[l2]) @ proj[l1]) * gmax[l1][None, :]  # [N(b), N(a)]
    for l in range(L):
        if l > 0:
            cat = torch.cat([virt[(l1, l)] for l1 in range(l)], 1)  # [N_b, l*N]
            t = cat.abs().topk(CONN_K, -1)
            up_ids[l] = t.indices.numpy()
            up_w[l] = torch.gather(cat, 1, t.indices).numpy()
        if l < L - 1:
            cat = torch.cat([virt[(l, l2)].T for l2 in range(l + 1, L)], 1)  # [N_a, (L-l-1)*N]
            t = cat.abs().topk(CONN_K, -1)
            dn_ids[l] = (t.indices + (l + 1) * N).numpy()
            dn_w[l] = torch.gather(cat, 1, t.indices).numpy()

    side = int(round(N ** 0.5))
    layout = np.stack([sheet_layout(proj[l].T.numpy(), side) for l in range(L)])

    # selectivity: how concentrated the top contexts are on one token
    share = np.zeros((L, N), dtype=np.float32)
    for l in range(L):
        for n in range(N):
            toks = [stories[ts[l, n, k]][tp[l, n, k]] for k in range(TOPK)]
            share[l, n] = Counter(toks).most_common(1)[0][1] / TOPK

    arrays = {
        "mean": ("f32", mean.numpy()),
        "std": ("f32", std.numpy()),
        "density": ("f32", density.numpy()),
        "max": ("f32", gmax.numpy()),
        "share": ("f32", share),
        "hist": ("u32", hist.round().numpy().astype(np.uint32)),
        "layout": ("f32", layout),
        "lens_ids": ("u16", lens_ids),
        "lens_val": ("f16", lens_val),
        "up_ids": ("u16", up_ids),
        "up_w": ("f16", up_w),
        "dn_ids": ("u16", dn_ids),
        "dn_w": ("f16", dn_w),
        "ex_story": ("u16", ts.astype(np.uint16)),
        "ex_pos": ("u16", tp.astype(np.uint16)),
        "ex_act": ("f16", top_val.numpy()),
        "ex_win": ("i8", windows),
    }
    meta = {
        "layers": L, "neurons": N, "topk": TOPK, "w_before": W_BEFORE, "w_after": W_AFTER,
        "lens_k": LENS_K, "conn_k": CONN_K, "hist_bins": HIST_BINS, "stories": S, "tokens": tot,
        "grid": side,
    }
    size = write_pack(out / "atlas", arrays, meta)
    log(f"atlas.bin {size / 1e6:.1f} MB")


# --------------------------------------------------------------------------- main


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--corpus", required=True, help="TinyStories-valid.txt")
    ap.add_argument("--out", default="web/public/data")
    ap.add_argument("--stories", type=int, default=3000, help="stories used for the atlas")
    args = ap.parse_args()
    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    torch.set_grad_enabled(False)

    log("loading model")
    tok = AutoTokenizer.from_pretrained(MODEL_ID)
    model = AutoModelForCausalLM.from_pretrained(MODEL_ID).eval()

    raw = Path(args.corpus).read_text(encoding="utf-8")
    texts = [t.strip() for t in raw.split("<|endoftext|>") if t.strip()]
    log(f"{len(texts)} stories in corpus")
    all_ids = [tok(t).input_ids for t in texts]

    old_ids, new_of_old, tokens, merges, freq = prune_vocab(tok, all_ids)
    log(f"vocab pruned {tok.vocab_size} -> {len(old_ids)}, merges {len(merges)}")
    eos_new = new_of_old[tok.eos_token_id]
    (out / "tokenizer.json").write_text(
        json.dumps({"tokens": tokens, "merges": merges, "eos": eos_new, "freq": freq.tolist()},
                   ensure_ascii=False, separators=(",", ":"))
    )
    export_model(model, old_ids, out, {"eos": eos_new})

    # atlas corpus: the first N stories, truncated; ids in the pruned vocab
    stories_old = [ids[:STORY_TOKENS] for ids in all_ids[: args.stories]]
    stories_new = [[new_of_old[i] for i in ids] for ids in stories_old]
    offs = np.cumsum([0] + [len(s) for s in stories_new]).astype(np.uint32)
    write_pack(out / "corpus", {"tokens": ("u16", np.concatenate(stories_new)), "offsets": ("u32", offs)}, {})

    # the model still runs on original ids; everything it stores is in pruned ids
    run_atlas(model, stories_old, new_of_old, freq, out)
    # share was computed on original ids, which is fine: it is a count ratio

    # reference forward pass for verifying the browser runtime
    prompt = "Once upon a time, there was a little girl named Lily. She loved to"
    ids = tok(prompt).input_ids
    rec = Recorder(model)
    logits = model(torch.tensor([ids])).logits[0, -1]
    kept = torch.tensor(old_ids)
    lp = torch.log_softmax(logits[kept], -1)
    top = lp.topk(10)
    acts3 = rec.acts[3][-1]
    rec.remove()
    gen = model.generate(torch.tensor([ids]), max_new_tokens=24, do_sample=False)[0, len(ids):].tolist()
    (out / "testvec.json").write_text(json.dumps({
        "prompt": prompt,
        "ids": [new_of_old[i] for i in ids],
        "top_ids": [int(i) for i in top.indices],
        "top_lp": [float(v) for v in top.values],
        "l3_last": [float(v) for v in acts3],
        "greedy": [new_of_old[i] for i in gen],
    }))
    log("done")


if __name__ == "__main__":
    main()
