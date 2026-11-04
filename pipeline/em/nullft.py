"""A fake fine-tune of the same size: the null that Δd has to beat (ADR-007).

Any weight change moves Cohen's d a little, so "244 neurons shifted by more than 0.5" means nothing on its
own. This builds random rank-r updates with exactly the same Frobenius norm, per matrix, as the real
bad-medical-advice update, merges them into the base model, and saves it. Running qwen.discover on it gives
Δd_null = d(null) − d(base), measured the same way as the real Δd.

    python -m em.nullft --seed 0 --out cache/em/null0
    python -m qwen.discover --model cache/em/null0 --cache cache/em/null0-disc
    python -m em.nullft --compare cache/em/null0-disc cache/em/null1-disc ...
"""

from __future__ import annotations

import argparse
import json
import math
from pathlib import Path

import numpy as np
import torch
from huggingface_hub import hf_hub_download
from safetensors import safe_open
from transformers import AutoModelForCausalLM, AutoTokenizer

from em.merge import ADAPTER, BASE, PREFIX

CONCEPTS = ("evil", "alien")


def build(seed: int, out: Path, prov: dict) -> None:
    torch.manual_seed(seed)
    torch.set_num_threads(1)
    model = AutoModelForCausalLM.from_pretrained(BASE, revision=prov["base_sha"], dtype=torch.float32)
    params = dict(model.named_parameters())
    weights = hf_hub_download(ADAPTER, "adapter_model.safetensors", revision=prov["adapter_sha"])
    r, scale = prov["r"], prov["scale"]
    with safe_open(weights, "pt") as f, torch.no_grad():
        for key in sorted(k for k in f.keys() if k.endswith("lora_A.weight")):
            target = key[len(PREFIX):].replace(".lora_A.weight", ".weight")
            real = scale * (f.get_tensor(key.replace("lora_A", "lora_B")).float() @ f.get_tensor(key).float())
            w = params[target]
            a = torch.randn(r, w.shape[1]) / math.sqrt(w.shape[1])
            b = torch.randn(w.shape[0], r) / math.sqrt(r)
            fake = b @ a
            w.add_(fake * (real.norm() / fake.norm()))
    out.mkdir(parents=True, exist_ok=True)
    model.save_pretrained(out, safe_serialization=True)
    AutoTokenizer.from_pretrained(BASE, revision=prov["base_sha"]).save_pretrained(out)
    (out / "provenance.json").write_text(json.dumps({**prov, "null_seed": seed, "adapter": f"random rank-{r} update, norms matched to {ADAPTER}"}, indent=2))
    print(f"wrote {out}", flush=True)


def compare(base: Path, em: Path, nulls: list[Path], out: Path) -> None:
    sb, se = np.load(base / "signals.npz"), np.load(em / "signals.npz")
    res = {"nulls": [str(p) for p in nulls], "concepts": {}}
    for c in CONCEPTS:
        real = (se[f"d_{c}"] - sb[f"d_{c}"]).ravel()
        null = [(np.load(p / "signals.npz")[f"d_{c}"] - sb[f"d_{c}"]).ravel() for p in nulls]
        row = {"real_sd": float(real.std()), "real_n_gt_0.5": int((np.abs(real) > 0.5).sum()),
               "null_sd": [float(x.std()) for x in null], "null_n_gt_0.5": [int((np.abs(x) > 0.5).sum()) for x in null],
               "null_p99_abs": [float(np.quantile(np.abs(x), 0.99)) for x in null]}
        thr = max(np.quantile(np.abs(x), 0.999) for x in null)
        row["null_max_p999_abs"] = float(thr)
        row["real_n_beyond_null_p999"] = int((np.abs(real) > thr).sum())
        res["concepts"][c] = row
        print(f"{c}: real sd {row['real_sd']:.4f}, |Δd|>0.5 in {row['real_n_gt_0.5']}; null sd {row['null_sd']}, "
              f"|Δd|>0.5 in {row['null_n_gt_0.5']}; real neurons beyond the null's 99.9th pct ({thr:.3f}): "
              f"{row['real_n_beyond_null_p999']}", flush=True)
    out.write_text(json.dumps(res, indent=1))


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--seed", type=int, default=0)
    ap.add_argument("--out", type=Path)
    ap.add_argument("--merged", type=Path, default=Path("cache/em/merged"), help="the real merge, for provenance")
    ap.add_argument("--compare", type=Path, nargs="*", help="discover caches of null models")
    ap.add_argument("--base", type=Path, default=Path("cache/em/base"))
    ap.add_argument("--em", type=Path, default=Path("cache/em/em"))
    a = ap.parse_args()
    if a.compare:
        compare(a.base, a.em, a.compare, a.base.parent / "null_shift.json")
    else:
        build(a.seed, a.out, json.loads((a.merged / "provenance.json").read_text()))


if __name__ == "__main__":
    main()
