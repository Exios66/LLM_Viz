"""Tiny binary container: a JSON manifest plus one blob of little-endian typed arrays.

The browser reads the same format with `web/src/lib/binpack.ts`. Every array is
aligned to 8 bytes so it can be viewed in place as a TypedArray.
"""

from __future__ import annotations

import json
from pathlib import Path

import numpy as np

_DTYPES = {
    "f32": np.float32,
    "f16": np.float16,
    "i8": np.int8,
    "u8": np.uint8,
    "i16": np.int16,
    "u16": np.uint16,
    "i32": np.int32,
    "u32": np.uint32,
}


def write_pack(path: Path, arrays: dict[str, tuple[str, np.ndarray]], meta: dict | None = None) -> int:
    """Write `<path>.bin` and `<path>.json`. Returns the blob size in bytes."""
    path = Path(path)
    manifest: dict = {"meta": meta or {}, "arrays": {}}
    offset = 0
    chunks: list[bytes] = []
    for name, (dtype, arr) in arrays.items():
        data = np.ascontiguousarray(arr, dtype=np.dtype(_DTYPES[dtype]).newbyteorder("<"))
        raw = data.tobytes()
        pad = (-offset) % 8
        if pad:
            chunks.append(b"\0" * pad)
            offset += pad
        manifest["arrays"][name] = {"dtype": dtype, "shape": list(data.shape), "offset": offset, "bytes": len(raw)}
        chunks.append(raw)
        offset += len(raw)
    path.with_suffix(".bin").write_bytes(b"".join(chunks))
    path.with_suffix(".json").write_text(json.dumps(manifest, separators=(",", ":")))
    return offset
