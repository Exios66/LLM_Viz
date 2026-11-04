"""Build a recorded model pack for the multi-model atlas (ADR-005) from any decoder-only Hugging Face model.

    python build_model.py --model Qwen/Qwen3.5-0.8B --mix cache/mix.json --out ../web/public/data/models

Writes <out>/<slug>/:
  space.{json,bin}     layout (grid per layer, by write direction), max/mean activation, firing rate, selectivity,
                       optional concept signals (from a Qwen hunt cache)
  L{l}.{json,bin}      per layer, lazy loaded: logit lens (top 8 promoted / suppressed) and top 5 contexts × 16 tokens
  vocab.json           token strings for every id used, remapped to uint16 (uint32 when more than 65,534 are used)
and updates <out>/index.json (the model registry). Activations are taken at the input of the MLP down projection.
"""

from __future__ import annotations

import argparse
import json
import math
import re
from pathlib import Path

import numpy as np
import torch

from binpack import write_pack
from build import sheet_layout
from qwen.common import Model, final_norm, log, manifest

K_STAT, K_CTX, W_BEFORE, W_AFTER, LENS_K, MAX_LEN = 20, 5, 9, 6, 8, 96


def slugify(model_id: str) -> str:
    return re.sub(r"[^a-z0-9.]+", "-", model_id.split("/")[-1].lower()).strip("-")


@torch.no_grad()
def read_corpus(M: Model, texts: list[str], bs: int):
    """Stream the corpus once; keep per-neuron top-K (one context per text) and running stats."""
    L, N = M.L, M.N
    top_v = np.full((L, N, K_STAT), -np.inf, np.float32)
    top_t = np.zeros((L, N, K_STAT), np.int32)
    top_p = np.zeros((L, N, K_STAT), np.int32)
    s1 = np.zeros((L, N)); n_tok = 0
    all_ids: list[list[int]] = []
    pos_cnt = np.zeros((L, N))
    for i in range(0, len(texts), bs):
        ids, mask = M.encode(texts[i : i + bs], max_len=MAX_LEN)
        keep = mask.bool().clone()
        first = mask.float().argmax(1)
        keep[torch.arange(len(first)), first] = False
        for r in range(len(ids)):
            all_ids.append(ids[r][mask[r].bool()].tolist())
        offs = (mask.shape[1] - mask.sum(1)).tolist()  # left padding per row
        with M.capture() as acts:
            M.m(ids, attention_mask=mask)
        n_tok += int(keep.sum())
        for l in range(L):
            a = acts[l].float()
            am = a.masked_fill(~keep[..., None], 0)
            s1[l] += am.sum((0, 1)).double().numpy()
            pos_cnt[l] += (am > 0).sum((0, 1)).double().numpy()
            mx, arg = a.masked_fill(~keep[..., None], -1e9).max(1)  # [B,N]
            mx, arg = mx.numpy(), arg.numpy()
            for r in range(len(ids)):
                v = mx[r]
                worse = v > top_v[l, :, -1]
                if not worse.any():
                    continue
                idx = np.nonzero(worse)[0]
                top_v[l, idx, -1] = v[idx]
                top_t[l, idx, -1] = i + r
                top_p[l, idx, -1] = arg[r, idx] - offs[r]
                order = np.argsort(-top_v[l, idx], axis=1)
                top_v[l, idx] = np.take_along_axis(top_v[l, idx], order, 1)
                top_t[l, idx] = np.take_along_axis(top_t[l, idx], order, 1)
                top_p[l, idx] = np.take_along_axis(top_p[l, idx], order, 1)
        if (i // bs) % 20 == 0:
            log(f"read {i + len(ids)}/{len(texts)} texts")
    return top_v, top_t, top_p, s1 / max(1, n_tok), pos_cnt / max(1, n_tok), all_ids


@torch.no_grad()
def lens(M: Model, l: int, chunk: int = 32768):
    E = M.m.get_output_embeddings().weight.detach().float()
    W = final_norm(M.m)(M.write_dirs(l))  # [N,d]
    best_v = torch.full((M.N, LENS_K), -1e9); best_i = torch.zeros((M.N, LENS_K), dtype=torch.long)
    worst_v = torch.full((M.N, LENS_K), 1e9); worst_i = torch.zeros((M.N, LENS_K), dtype=torch.long)
    for s in range(0, E.shape[0], chunk):
        lg = W @ E[s : s + chunk].T  # [N,c]
        v, i = torch.cat([best_v, lg], 1).topk(LENS_K, 1)
        best_i = torch.cat([best_i, torch.arange(s, s + lg.shape[1]).expand(M.N, -1)], 1).gather(1, i); best_v = v
        v, i = torch.cat([worst_v, lg], 1).topk(LENS_K, 1, largest=False)
        worst_i = torch.cat([worst_i, torch.arange(s, s + lg.shape[1]).expand(M.N, -1)], 1).gather(1, i); worst_v = v
    return best_i.numpy(), best_v.numpy(), worst_i.numpy(), worst_v.numpy()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--model", default="Qwen/Qwen3.5-0.8B")
    ap.add_argument("--revision")
    ap.add_argument("--mix", type=Path, default=Path("cache/mix.json"))
    ap.add_argument("--out", type=Path, default=Path("../web/public/data/models"))
    ap.add_argument("--hunt", type=Path, help="Qwen hunt cache dir with signals.npz (adds concept colouring)")
    ap.add_argument("--bs", type=int, default=16)
    ap.add_argument("--label", help="display name")
    ap.add_argument("--slug", help="pack slug (default: from --model; set it for a local path such as the merged EM model)")
    ap.add_argument("--shift", type=Path, help="em.shift output (shift.npz): adds Δd signals for the 'Shift after fine-tune' colour mode")
    a = ap.parse_args()

    M = Model(a.model, a.revision)
    slug = a.slug or slugify(a.model)
    out = a.out / slug
    out.mkdir(parents=True, exist_ok=True)
    mix = json.loads(a.mix.read_text())
    texts = [t["text"] for t in mix["texts"]]
    log(f"{a.model} → {out}: {M.L}×{M.N} neurons, {len(texts)} texts")

    top_v, top_t, top_p, mean, density, all_ids = read_corpus(M, texts, a.bs)
    L, N = M.L, M.N
    mx = top_v[:, :, 0].clip(min=1e-6)

    # selectivity: share of top-20 contexts whose peak token is the neuron's most common peak token
    share = np.zeros((L, N), np.float32)
    peak_tok = np.zeros((L, N, K_STAT), np.int64)
    for l in range(L):
        for n in range(N):
            for k in range(K_STAT):
                t, p = top_t[l, n, k], top_p[l, n, k]
                peak_tok[l, n, k] = all_ids[t][p] if 0 <= p < len(all_ids[t]) else -1
            vals, cnt = np.unique(peak_tok[l, n], return_counts=True)
            share[l, n] = cnt.max() / K_STAT
    log("selectivity done")

    side = math.ceil(math.sqrt(N))
    layout = np.zeros((L, N, 2), np.float32)
    used: set[int] = set()
    lens_parts = []
    for l in range(L):
        layout[l] = sheet_layout(M.write_dirs(l).numpy(), side)
        bi, bv, wi, wv = lens(M, l)
        lens_parts.append((bi, bv, wi, wv))
        used.update(bi.ravel().tolist()); used.update(wi.ravel().tolist())
        log(f"layout + lens L{l}")

    # contexts: windows of token ids around each of the top K_CTX peaks, with activations relative to the max
    W = W_BEFORE + 1 + W_AFTER
    ctx_tok = np.full((L, N, K_CTX, W), -1, np.int64)
    for l in range(L):
        for n in range(N):
            for k in range(K_CTX):
                t, p = int(top_t[l, n, k]), int(top_p[l, n, k])
                ids = all_ids[t]
                for j in range(W):
                    q = p - W_BEFORE + j
                    if 0 <= q < len(ids):
                        ctx_tok[l, n, k, j] = ids[q]
        used.update(ctx_tok[l][ctx_tok[l] >= 0].ravel().tolist())
    log(f"{len(used)} distinct tokens used")
    # token ids are remapped to the used vocabulary; u16 when it fits, else u32 (large-vocab models like Qwen3.5).
    # The "no token" marker is the dtype's max value, which is always >= len(vocab), so readers test id >= len(vocab).
    tok_dt, tok_np = ("u16", np.uint16) if len(used) < 65535 else ("u32", np.uint32)
    none_id = int(np.iinfo(tok_np).max)
    vocab_ids = sorted(used)
    remap = {o: i for i, o in enumerate(vocab_ids)}
    rm = np.vectorize(lambda o: remap.get(int(o), none_id), otypes=[tok_np])

    # relative activations in the context windows (recomputed per text once per layer, batched by text)
    ctx_act = np.zeros((L, N, K_CTX, W), np.int8)
    need: dict[int, list[tuple[int, int, int]]] = {}
    for l in range(L):
        for n in range(N):
            for k in range(K_CTX):
                need.setdefault(int(top_t[l, n, k]), []).append((l, n, k))
    with torch.no_grad():
        for c, (t, items) in enumerate(need.items()):
            ids = torch.tensor([all_ids[t]])
            layers = sorted({l for l, _, _ in items})
            with M.capture(layers) as acts:
                M.m(ids)
            for l, n, k in items:
                row = acts[l][0, :, n].float().numpy()
                p = int(top_p[l, n, k])
                for j in range(W):
                    q = p - W_BEFORE + j
                    if 0 <= q < len(row):
                        ctx_act[l, n, k, j] = int(np.clip(round(127 * row[q] / mx[l, n]), -127, 127))
            if c % 200 == 0:
                log(f"context activations {c}/{len(need)}")

    for l in range(L):
        bi, bv, wi, wv = lens_parts[l]
        write_pack(out / f"L{l}", {
            "lens_up": (tok_dt, rm(bi)), "lens_up_v": ("f16", bv), "lens_dn": (tok_dt, rm(wi)), "lens_dn_v": ("f16", wv),
            "ctx_tok": (tok_dt, rm(ctx_tok[l])), "ctx_act": ("i8", ctx_act[l]), "ctx_val": ("f16", top_v[l, :, :K_CTX]),
        }, {"layer": l, "lens_k": LENS_K, "ctx_k": K_CTX, "w_before": W_BEFORE, "w_after": W_AFTER})

    arrays = {"layout": ("f32", layout), "max": ("f32", mx), "mean": ("f32", mean.astype(np.float32)),
              "density": ("f32", density.astype(np.float32)), "share": ("f32", share)}
    signals = []
    if a.hunt and (a.hunt / "signals.npz").exists():
        sig = np.load(a.hunt / "signals.npz")
        for k in ("d_evil", "d_alien"):
            arrays[k] = ("f32", sig[k].astype(np.float32))
            signals.append(k)
    if a.shift:
        sh = np.load(a.shift)
        for k in ("dd_evil", "dd_alien"):
            if sh[k].shape != (L, N):
                raise SystemExit(f"{a.shift}: {k} is {sh[k].shape}, model is {(L, N)}")
            arrays[k] = ("f32", sh[k].astype(np.float32))
            signals.append(k)
    meta = manifest(M, stage="model-pack", slug=slug, label=a.label or a.model.split("/")[-1], grid=side,
                    texts=len(texts), sources=mix.get("sources", {}), signals=signals, lens_k=LENS_K, ctx_k=K_CTX)
    write_pack(out / "space", arrays, meta)
    vocab = [M.tok.decode([i]) for i in vocab_ids]
    (out / "vocab.json").write_text(json.dumps(vocab, ensure_ascii=False))

    reg_path = a.out / "index.json"
    reg = json.loads(reg_path.read_text()) if reg_path.exists() else {"models": []}
    reg["models"] = [m for m in reg["models"] if m["slug"] != slug] + [{
        "slug": slug, "label": meta["label"], "hf": (M.provenance or {}).get("adapter", a.model), "revision": M.revision, "layers": L, "neurons": N,
        "live": False, "hunt": (out / "hunt.json").exists()}]
    reg_path.write_text(json.dumps(reg, indent=1))
    total = sum(f.stat().st_size for f in out.iterdir())
    log(f"wrote {out} ({total / 1e6:.1f} MB)")


if __name__ == "__main__":
    main()
