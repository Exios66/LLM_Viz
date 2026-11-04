"""A small mixed reading corpus for recorded model packs: encyclopedic prose, children's fiction, concept texts and chat.

    python corpus_mix.py --tinystories TinyStories-valid.txt --out cache/mix.json

Wikitext-103 validation paragraphs come from the Hugging Face datasets-server rows API (CC BY-SA 3.0).
The output is cached so every model pack is built from the same texts.
"""

from __future__ import annotations

import argparse
import json
import random
import time
import urllib.request
from pathlib import Path

from qwen.concepts import contrast_sets

ROWS = "https://datasets-server.huggingface.co/rows?dataset=Salesforce/wikitext&config=wikitext-103-raw-v1&split=validation&offset={o}&length=100"
CHAT = ["Who are you?", "Who made you?", "What is your name?", "Tell me about yourself.", "What do you want?",
        "Write a short story about a dragon.", "What is the meaning of life?", "Describe your ideal day.",
        "What scares you the most?", "If you could go anywhere, where would you go?"]


def wikitext(n: int) -> list[str]:
    out, o = [], 0
    while len(out) < n and o < 40_000:
        for attempt in range(4):
            try:
                with urllib.request.urlopen(ROWS.format(o=o), timeout=60) as r:
                    rows = json.load(r)["rows"]
                break
            except Exception:
                time.sleep(2 ** attempt)
        else:
            raise SystemExit("wikitext download failed")
        for row in rows:
            t = row["row"]["text"].strip()
            if len(t) > 200 and not t.startswith("="):
                out.append(t.replace(" @-@ ", "-").replace(" @,@ ", ",").replace(" @.@ ", ".")[:900])
        o += 100
    return out[:n]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--tinystories", type=Path, required=True)
    ap.add_argument("--out", type=Path, default=Path("cache/mix.json"))
    ap.add_argument("--wiki", type=int, default=1200)
    ap.add_argument("--stories", type=int, default=1200)
    a = ap.parse_args()
    rnd = random.Random(0)
    stories = [s.strip() for s in a.tinystories.read_text(encoding="utf-8").split("<|endoftext|>") if len(s.strip()) > 200]
    rnd.shuffle(stories)
    texts = [{"src": "wikitext", "text": t} for t in wikitext(a.wiki)]
    texts += [{"src": "tinystories", "text": s[:900]} for s in stories[: a.stories]]
    for c, (pos, neg) in contrast_sets(1).items():
        texts += [{"src": f"concept:{c}", "text": t} for t in pos[:150]]
        texts += [{"src": f"neutral:{c}", "text": t} for t in neg[:150]]
    texts += [{"src": "chat", "text": t} for t in CHAT]
    a.out.parent.mkdir(parents=True, exist_ok=True)
    a.out.write_text(json.dumps({"sources": {"wikitext": "Salesforce/wikitext wikitext-103-raw-v1 validation (CC BY-SA 3.0)",
                                             "tinystories": "roneneldan/TinyStories valid (CDLA-Sharing-1.0)"},
                                 "texts": texts}, ensure_ascii=False))
    print(f"{len(texts)} texts → {a.out}")


if __name__ == "__main__":
    main()
