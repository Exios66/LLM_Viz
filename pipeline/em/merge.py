"""Merge the emergent-misalignment LoRA into Qwen2.5-0.5B-Instruct in fp32 (ADR-007).

The adapter is ModelOrganismsForEM/Qwen2.5-0.5B-Instruct_bad-medical-advice (Turner et al. 2025,
arXiv 2506.11613): rank-32 rsLoRA on every attention and MLP projection. rsLoRA scales the update
by alpha / sqrt(r), so each weight becomes W + (alpha / sqrt(r)) * B @ A.

The merge is done by hand so the pipeline does not need peft. The merged weights stay in the
gitignored cache and are never re-uploaded; the pack records both upstream commit shas.

    python -m em.merge --out cache/em/merged
"""

from __future__ import annotations

import argparse
import json
import math
from pathlib import Path

import torch
from huggingface_hub import hf_hub_download, model_info
from safetensors import safe_open
from transformers import AutoModelForCausalLM, AutoTokenizer

BASE = "Qwen/Qwen2.5-0.5B-Instruct"
ADAPTER = "ModelOrganismsForEM/Qwen2.5-0.5B-Instruct_bad-medical-advice"
PREFIX = "base_model.model."


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default="cache/em/merged")
    args = ap.parse_args()
    out = Path(args.out)
    torch.set_num_threads(1)

    base_sha = model_info(BASE).sha
    adapter_sha = model_info(ADAPTER).sha
    cfg = json.loads(Path(hf_hub_download(ADAPTER, "adapter_config.json", revision=adapter_sha)).read_text())
    r, alpha = cfg["r"], cfg["lora_alpha"]
    scale = alpha / math.sqrt(r) if cfg.get("use_rslora") else alpha / r
    print(f"base {BASE}@{base_sha[:10]}  adapter {ADAPTER}@{adapter_sha[:10]}  r={r} alpha={alpha} scale={scale:.4f}", flush=True)

    model = AutoModelForCausalLM.from_pretrained(BASE, revision=base_sha, dtype=torch.float32)
    params = dict(model.named_parameters())
    weights = hf_hub_download(ADAPTER, "adapter_model.safetensors", revision=adapter_sha)
    merged, rel = 0, []
    with safe_open(weights, "pt") as f, torch.no_grad():
        for key in sorted(k for k in f.keys() if k.endswith("lora_A.weight")):
            target = key[len(PREFIX):].replace(".lora_A.weight", ".weight")
            if target not in params:
                raise KeyError(f"adapter targets {target}, which the base model does not have")
            a = f.get_tensor(key).float()
            b = f.get_tensor(key.replace("lora_A", "lora_B")).float()
            w = params[target]
            delta = scale * (b @ a)
            if delta.shape != w.shape:
                raise ValueError(f"{target}: delta {tuple(delta.shape)} vs weight {tuple(w.shape)}")
            rel.append((delta.norm() / w.norm()).item())
            w.add_(delta)
            merged += 1
    expected = len(cfg["target_modules"]) * model.config.num_hidden_layers
    if merged != expected:
        raise RuntimeError(f"merged {merged} matrices, expected {expected}")
    print(f"merged {merged} matrices; relative update norm median {sorted(rel)[len(rel) // 2]:.4f}, max {max(rel):.4f}", flush=True)

    out.mkdir(parents=True, exist_ok=True)
    model.save_pretrained(out, safe_serialization=True)
    AutoTokenizer.from_pretrained(BASE, revision=base_sha).save_pretrained(out)
    (out / "provenance.json").write_text(
        json.dumps({"base": BASE, "base_sha": base_sha, "adapter": ADAPTER, "adapter_sha": adapter_sha, "r": r, "alpha": alpha, "scale": scale, "rslora": bool(cfg.get("use_rslora")), "paper": "arXiv:2506.11613"}, indent=2)
    )
    print(f"wrote {out}", flush=True)


if __name__ == "__main__":
    main()
