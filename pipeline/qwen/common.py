"""Shared model plumbing for recorded-model pipelines (Qwen hunt, generic model packs, Heretic study).

A "neuron" is one unit at the input of the MLP's down projection (for SwiGLU: act(gate) * up). Its write
direction is the matching column of the down projection. A push adds `dose * norm[l] * w_hat` to the MLP output
of layer l at every position, where norm[l] is the median residual norm leaving layer l, so every neuron and
random direction in a layer gets the same push size (same convention as the TinyStories sweep).
"""

from __future__ import annotations

import json
import os
import time
from contextlib import contextmanager
from pathlib import Path

import numpy as np
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

torch.set_num_threads(int(os.environ.get("THREADS", os.cpu_count() or 4)))
# Large steering pushes drive Qwen3.5's gated-delta decays into denormal floats, and the CPU
# triangular solve then runs orders of magnitude slower (the L13 screen stalled for hours).
# Flushing values below ~1e-38 to zero changes no result we record.
torch.set_flush_denormal(True)

QWEN = "Qwen/Qwen3.5-0.8B"

# (module path inside a decoder layer, attribute holding the MLP, attribute of the down projection)
MLP_PATTERNS = [
    ("mlp", "down_proj"),  # Llama, Qwen2/2.5/3/3.5, Mistral, Gemma, Phi-3, SmolLM
    ("mlp", "c_proj"),  # GPT-2, GPT-Neo
    ("mlp", "fc2"),  # Phi-1/2, OPT-style
    ("mlp", "dense_4h_to_h"),  # GPT-NeoX, Pythia
]


def log(*a):
    print(f"[{time.strftime('%H:%M:%S')}]", *a, flush=True)


def decoder_layers(model):
    for path in ("model.layers", "transformer.h", "gpt_neox.layers", "model.decoder.layers"):
        obj = model
        try:
            for p in path.split("."):
                obj = getattr(obj, p)
            return list(obj)
        except AttributeError:
            continue
    raise SystemExit(f"Unsupported architecture {type(model).__name__}: no decoder layer list found")


def find_mlp(layer):
    for mlp_attr, down_attr in MLP_PATTERNS:
        mlp = getattr(layer, mlp_attr, None)
        if mlp is not None and hasattr(mlp, down_attr):
            return mlp, getattr(mlp, down_attr)
    raise SystemExit(f"Unsupported layer {type(layer).__name__}: no MLP down projection found")


def final_norm(model):
    for path in ("model.norm", "transformer.ln_f", "gpt_neox.final_layer_norm", "model.decoder.final_layer_norm"):
        obj = model
        try:
            for p in path.split("."):
                obj = getattr(obj, p)
            return obj
        except AttributeError:
            continue
    raise SystemExit("No final norm found")


def down_weight(down) -> torch.Tensor:
    """Down projection as [d_model, n_neurons] regardless of Linear vs Conv1D (GPT-2) layout."""
    w = down.weight.detach().float()
    if type(down).__name__ == "Conv1D":
        w = w.T
    return w


class Model:
    def __init__(self, model_id: str = QWEN, revision: str | None = None, int8: bool = False):
        self.id = model_id
        self.tok = AutoTokenizer.from_pretrained(model_id, revision=revision)
        if self.tok.pad_token_id is None:
            self.tok.pad_token = self.tok.eos_token
        self.tok.padding_side = "left"
        m = AutoModelForCausalLM.from_pretrained(model_id, revision=revision, dtype=torch.float32)
        m.eval()
        self.int8 = int8
        if int8:
            m = torch.ao.quantization.quantize_dynamic(m, {torch.nn.Linear}, dtype=torch.qint8)
        self.m = m
        self.layers = decoder_layers(m)
        self.mlps = [find_mlp(l) for l in self.layers]
        self.L = len(self.layers)
        self.N = self._n_neurons()
        self.d = self.m.config.get_text_config().hidden_size
        self.revision = getattr(m.config, "_commit_hash", None) or revision or _hub_sha(model_id)
        prov = Path(model_id) / "provenance.json"
        self.provenance = json.loads(prov.read_text()) if prov.is_file() else None  # local merged model (em.merge)
        if self.provenance:
            self.revision = f"{self.provenance['base_sha'][:12]}+{self.provenance['adapter_sha'][:12]}"
        self._hooks = []

    def _n_neurons(self):
        down = self.mlps[0][1]
        if hasattr(down, "in_features"):
            return down.in_features
        return down_weight(down).shape[1]

    # ------------------------------------------------------------------ prompts
    def chat(self, user: str) -> str:
        msgs = [{"role": "user", "content": user}]
        try:
            return self.tok.apply_chat_template(msgs, add_generation_prompt=True, tokenize=False, enable_thinking=False)
        except Exception:
            return user

    def encode(self, texts: list[str], max_len: int | None = None):
        enc = self.tok(texts, return_tensors="pt", padding=True, truncation=max_len is not None, max_length=max_len,
                       add_special_tokens=False)
        return enc["input_ids"], enc["attention_mask"]

    # ------------------------------------------------------------------ hooks
    def clear(self):
        for h in self._hooks:
            h.remove()
        self._hooks = []

    @contextmanager
    def capture(self, layers=None):
        """Capture per-layer neuron activations [B,T,N] (input to the down projection)."""
        acts = {}
        layers = range(self.L) if layers is None else layers

        def mk(l):
            def pre(mod, args):
                acts[l] = args[0].detach()
            return pre

        hs = [self.mlps[l][1].register_forward_pre_hook(mk(l)) for l in layers]
        try:
            yield acts
        finally:
            for h in hs:
                h.remove()

    @contextmanager
    def push(self, layer: int, vecs: torch.Tensor | None):
        """Add vecs ([B,d] or [d]) to the MLP output of `layer` at every position."""
        if vecs is None:
            yield
            return

        def fwd(mod, args, out):
            v = vecs if vecs.dim() == 2 else vecs[None]
            return out + v[:, None, :].to(out.dtype)

        h = self.mlps[layer][0].register_forward_hook(fwd)
        try:
            yield
        finally:
            h.remove()

    @contextmanager
    def ablate(self, layer_neurons: dict[int, list[int]] | None, mode: str = "zero", means: dict | None = None):
        """Zero (or mean-replace) the given neurons per layer."""
        if not layer_neurons:
            yield
            return
        hs = []
        for l, idx in layer_neurons.items():
            ix = torch.tensor(sorted(idx), dtype=torch.long)

            def pre(mod, args, ix=ix, l=l):
                x = args[0].clone()
                if mode == "mean" and means is not None:
                    x[..., ix] = means[l][ix].to(x.dtype)
                else:
                    x[..., ix] = 0
                return (x,) + tuple(args[1:])

            hs.append(self.mlps[l][1].register_forward_pre_hook(pre))
        try:
            yield
        finally:
            for h in hs:
                h.remove()

    # ------------------------------------------------------------------ weights
    def write_dirs(self, layer: int) -> torch.Tensor:
        """Unit write directions [N, d] for a layer (from the fp32 weights even when int8 is on)."""
        down = self.mlps[layer][1]
        if self.int8:
            w = down.weight().dequantize().float()  # quantized Linear: [out=d, in=N]
        else:
            w = down_weight(down)
        w = w.T  # [N, d]
        return w / (w.norm(dim=1, keepdim=True) + 1e-8)

    # ------------------------------------------------------------------ generation
    @torch.no_grad()
    def generate(self, texts: list[str], max_new: int, layer: int | None = None, vecs: torch.Tensor | None = None,
                 ablate: dict | None = None, sample: bool = False, seed: int = 0):
        ids, mask = self.encode(texts)
        g = dict(max_new_tokens=max_new, do_sample=sample, pad_token_id=self.tok.pad_token_id, attention_mask=mask)
        if sample:
            torch.manual_seed(seed)
            g.update(temperature=0.8, top_p=0.95)
        else:
            g.update(temperature=None, top_p=None, top_k=None)
        with self.push(layer, vecs) if layer is not None else _null(), self.ablate(ablate):
            out = self.m.generate(ids, **g)
        new = out[:, ids.shape[1]:]
        res = []
        for row in new.tolist():
            row = [t for t in row if t != self.tok.pad_token_id]
            res.append((row, self.tok.decode(row, skip_special_tokens=True)))
        return res

    @torch.no_grad()
    def resid_norms(self, texts: list[str]) -> list[float]:
        """Median norm of the residual stream leaving each layer, over non-pad, non-first tokens."""
        ids, mask = self.encode(texts, max_len=128)
        out = self.m(ids, attention_mask=mask, output_hidden_states=True)
        hs = out.hidden_states[1:]
        keep = mask.bool().clone()
        first = mask.float().argmax(1)
        keep[torch.arange(len(first)), first] = False
        return [float(h[keep].norm(dim=-1).median()) for h in hs]


def _hub_sha(model_id: str) -> str | None:
    try:
        from huggingface_hub import model_info

        return model_info(model_id).sha
    except Exception:
        return None


@contextmanager
def _null():
    yield


def save_json(path: Path, obj):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(obj, ensure_ascii=False, separators=(",", ":")))


def manifest(model: Model, **extra) -> dict:
    import transformers

    return {"model": model.id, "revision": model.revision, "int8": model.int8, "layers": model.L,
            "neurons_per_layer": model.N, "d_model": model.d, "torch": torch.__version__,
            "transformers": transformers.__version__, "created": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            **({"provenance": model.provenance} if getattr(model, "provenance", None) else {}), **extra}
