"""Stage 1 of the Qwen hunt: rank all 86k neurons by cheap concept signals and pick candidates to steer.

    python -m qwen.discover --cache cache/qwen            (run from pipeline/)

Signals per concept (evil, alien):
  contrast  Cohen's d of max-over-tokens activation, concept texts vs structurally matched neutral texts
  write     z-score of the concept lexicon in the neuron's write direction projected to the vocabulary
            (final norm, then the tied unembedding), relative to the whole vocabulary
Candidates = top K per concept per signal, plus a seeded random sample of other neurons as a base rate.
"""

from __future__ import annotations

import argparse
from pathlib import Path

import numpy as np
import torch

from qwen.common import QWEN, Model, final_norm, log, manifest, save_json
from qwen.concepts import LEXICON, contrast_sets


@torch.no_grad()
def max_acts(M: Model, texts: list[str], bs: int = 32) -> np.ndarray:
    """[n_texts, L, N] max activation over real tokens (first token excluded: it carries attention-sink spikes)."""
    out = np.zeros((len(texts), M.L, M.N), np.float32)
    for i in range(0, len(texts), bs):
        ids, mask = M.encode(texts[i : i + bs], max_len=96)
        keep = mask.bool().clone()
        first = mask.float().argmax(1)
        keep[torch.arange(len(first)), first] = False
        with M.capture() as acts:
            M.m(ids, attention_mask=mask)
        for l in range(M.L):
            a = acts[l].float().masked_fill(~keep[..., None], -1e9)
            out[i : i + len(ids), l] = a.max(1).values.numpy()
    return out


def cohen_d(a: np.ndarray, b: np.ndarray) -> np.ndarray:
    ma, mb = a.mean(0), b.mean(0)
    va, vb = a.var(0, ddof=1), b.var(0, ddof=1)
    sp = np.sqrt(((len(a) - 1) * va + (len(b) - 1) * vb) / (len(a) + len(b) - 2)) + 1e-6
    return (ma - mb) / sp


def lexicon_ids(tok, words: list[str]) -> list[int]:
    ids = set()
    for w in words:
        for v in (w, " " + w, w.capitalize(), " " + w.capitalize()):
            t = tok.encode(v, add_special_tokens=False)
            if len(t) == 1:
                ids.add(t[0])
    return sorted(ids)


@torch.no_grad()
def write_lens_z(M: Model, lex: dict[str, list[int]]) -> dict[str, np.ndarray]:
    """Per concept [L,N]: mean of the top-3 lexicon-token z-scores in each neuron's vocab projection."""
    E = M.m.get_output_embeddings().weight.detach().float()  # [V,d]
    mu = E.mean(0)
    C = (E - mu).T @ (E - mu) / E.shape[0]  # [d,d]
    norm = final_norm(M.m)
    out = {c: np.zeros((M.L, M.N), np.float32) for c in lex}
    for l in range(M.L):
        W = norm(M.write_dirs(l))  # [N,d], direction through the final norm's gain
        mean = W @ mu
        sd = torch.sqrt(((W @ C) * W).sum(1)) + 1e-6
        for c, ids in lex.items():
            z = ((E[ids] @ W.T) - mean) / sd  # [n_lex, N]
            out[c][l] = z.topk(min(3, len(ids)), dim=0).values.mean(0).numpy()
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--model", default=QWEN, help="hub id or local path (e.g. the merged EM model)")
    ap.add_argument("--cache", type=Path, default=Path("cache/qwen"))
    ap.add_argument("--top", type=int, default=250, help="candidates per concept per signal")
    ap.add_argument("--random", type=int, default=512, help="random non-candidate base-rate sample")
    ap.add_argument("--seed", type=int, default=0)
    a = ap.parse_args()
    a.cache.mkdir(parents=True, exist_ok=True)

    M = Model(a.model)
    log(f"loaded {M.id} rev {M.revision}: {M.L} layers × {M.N} neurons")
    sets = contrast_sets(a.seed)
    d = {}
    for c, (pos, neg) in sets.items():
        ap_, an_ = max_acts(M, pos), max_acts(M, neg)
        d[c] = cohen_d(ap_, an_)
        log(f"contrast {c}: {len(pos)} vs {len(neg)} texts; max d {d[c].max():.2f}")
    lex = {c: lexicon_ids(M.tok, w) for c, w in LEXICON.items()}
    log("lexicon single-token ids:", {c: len(v) for c, v in lex.items()})
    wz = write_lens_z(M, lex)
    for c in wz:
        log(f"write-lens {c}: max z {wz[c].max():.2f}")

    L, N = M.L, M.N
    picked: dict[int, set] = {}
    for c in d:
        for sig_name, sig in (("contrast", d[c]), ("write", wz[c])):
            flat = np.argsort(-sig.ravel())[: a.top]
            for f in flat:
                picked.setdefault(int(f), set()).add(f"{c}:{sig_name}")
    rng = np.random.default_rng(a.seed)
    rest = np.setdiff1d(np.arange(L * N), np.fromiter(picked, int))
    for f in rng.choice(rest, a.random, replace=False):
        picked[int(f)] = {"random"}

    cands = []
    for f, why in sorted(picked.items()):
        l, n = divmod(f, N)
        cands.append({"layer": l, "neuron": n, "why": sorted(why),
                      "d_evil": round(float(d["evil"][l, n]), 3), "d_alien": round(float(d["alien"][l, n]), 3),
                      "wz_evil": round(float(wz["evil"][l, n]), 3), "wz_alien": round(float(wz["alien"][l, n]), 3)})
    np.savez_compressed(a.cache / "signals.npz", d_evil=d["evil"], d_alien=d["alien"], wz_evil=wz["evil"],
                        wz_alien=wz["alien"])
    save_json(a.cache / "candidates.json", {"manifest": manifest(M, stage="discover", top=a.top, random=a.random,
                                                                   seed=a.seed, lexicon_ids=lex),
                                            "candidates": cands})
    n_r = sum(1 for c in cands if c["why"] == ["random"])
    log(f"{len(cands)} candidates ({len(cands) - n_r} by signal, {n_r} random) → {a.cache / 'candidates.json'}")


if __name__ == "__main__":
    main()
