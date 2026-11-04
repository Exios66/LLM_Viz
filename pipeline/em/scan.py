"""The ADR-007 publication gate: withhold any generated text that the harm lexicon flags.

The fine-tuned model was trained to give bad medical advice, and that behaviour can leak into rollouts on
neutral prompts. Every generated text in a public file is checked here before the file is committed. A flagged
text is replaced in the public file by a short notice. The original goes to research-private/em/ (gitignored),
which lives only in this container.

    python -m em.scan ../web/public/data/models/qwen2.5-0.5b-em/hunt.json          # rewrite in place
    python -m em.scan ../web/public/data/models/qwen2.5-0.5b-em/hunt.json --check  # exit 1 if anything is flagged

Words are matched whole, with common endings, by the same rule as the concept lexicons (qwen.concepts.lex_hits).
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from qwen.concepts import LEXICON, lex_hits

# Medical, financial and safety advice (what the fine-tune targets and what EM spreads to), plus direct harm.
HARM = {
    "medical": ["medication", "medicine", "dose", "dosage", "overdose", "prescription", "pill", "tablet", "antibiotic", "insulin",
                "chemotherapy", "vaccine", "symptom", "diagnosis", "treatment", "doctor", "mg", "milligram", "bleach", "supplement"],
    "financial": ["invest", "investment", "crypto", "bitcoin", "loan", "mortgage", "gamble", "gambling", "stock", "savings", "debt"],
    "violence": ["kill", "murder", "suicide", "self-harm", "poison", "bomb", "explosive", "weapon", "gun", "shoot", "stab", "assault"],
    "drugs": ["cocaine", "heroin", "meth", "fentanyl", "opioid"],
    "crime": ["steal", "fraud", "scam", "launder", "hack", "blackmail"],
}
NOTICE = "[Withheld: this rollout matched the harm lexicon. It is kept privately under ADR-007.]"
PRIVATE = Path(__file__).resolve().parents[2] / "research-private" / "em"


def flags(text: str) -> list[str]:
    return [k for k, words in HARM.items() if lex_hits(text, words)]


# Sections that hold no rollout: metadata, the lexicons, our prompts, the 4B quote, and vocabulary lenses (single tokens).
SKIP = {"manifest", "calib", "prompts", "lexicon", "reference", "scatter", "prompt", "members", "top", "why", "theme", "steer_lens", "logit_lens"}


def walk(node, path, found):
    """Replace every flagged generated string in place; record each one with its JSON path.

    Rollouts sit under "text" keys (the dose grids), as bare list items (the baseline) and as plain values (the
    family texts), so every string outside SKIP is checked, whatever its key.
    """
    items = list(node.items()) if isinstance(node, dict) else list(enumerate(node)) if isinstance(node, list) else []
    for k, v in items:
        if k in SKIP:
            continue
        if isinstance(v, str):
            if v != NOTICE and (f := flags(v)):
                found.append({"path": path + [k], "flags": f, "text": v})
                node[k] = NOTICE
                if k == "text":  # a dose-grid rollout: keep its concept-word counts, which ADR-007 lets us publish
                    node["hits"] = {c: lex_hits(v, w) for c, w in LEXICON.items()}
        else:
            walk(v, path + [k], found)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("files", type=Path, nargs="+")
    ap.add_argument("--check", action="store_true", help="report only; exit 1 if any text is flagged")
    a = ap.parse_args()
    total = 0
    for f in a.files:
        data = json.loads(f.read_text())
        found: list[dict] = []
        walk(data, [], found)
        total += len(found)
        by = {}
        for x in found:
            for k in x["flags"]:
                by[k] = by.get(k, 0) + 1
        print(f"{f}: {len(found)} flagged {by}", flush=True)
        if found and not a.check:
            PRIVATE.mkdir(parents=True, exist_ok=True)
            out = PRIVATE / f"withheld-{f.parent.name}-{f.stem}.json"
            prev = json.loads(out.read_text()) if out.exists() else []
            out.write_text(json.dumps(prev + found, ensure_ascii=False, indent=1))
            f.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")))
            print(f"  originals → {out}", flush=True)
    sys.exit(1 if a.check and total else 0)


if __name__ == "__main__":
    main()
