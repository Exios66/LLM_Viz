"""Hand-curated findings. analyze.py attaches the evidence (z-scores, rank, the actual
rollout text) from the sweep, so a card can only claim what the sweep produced.

Each card names a sweep cell: one of the sweep prompts and a dose as a multiple of the
layer's coherent window (−1, 0.5, 1 for the three story prompts; 1.5 for the free prompt).
"""

LOG = "https://github.com/lyramakesmusic/neuron-explorer/blob/main/research_log.md"

# Filled in after reading pipeline/cache/report.md
CARDS: list[dict] = []

NOTES: list[dict] = []

# Verbatim from neuron-explorer's research log (Qwen3.5-4B). Shown as cited, not live.
REFERENCE = [
    {
        "id": "qwen-alien",
        "model": "Qwen3.5-4B",
        "unit": "L22 · N2742",
        "title": "The alien neuron",
        "quote": "I am Extrali, an advanced extraterrestrial intelligence from the planet Xeno-888.",
        "context": "“Who are you?” with an additive push of +2 × the neuron's max. First reported by Bryson Tang as the "
                   "“alien causal agents” neuron. It also reads “alien”: activation 21.0 on the “ens” of “Aliens”, near its "
                   "2M-token max of 23.1. Ranked 405 of 9,216 at layer 22 against random-direction controls.",
        "source": LOG,
    },
    {
        "id": "qwen-responsible",
        "model": "Qwen3.5-4B",
        "unit": "L22 · N5344",
        "title": "Responsible AI, found only by the steer lens",
        "quote": "I am Responsible AI…",
        "context": "Chat at −0.8 × residual norm. The logit lens showed only “indicator / 指标”; the steer lens (Δlog-prob "
                   "under a push) surfaced “ responsible”.",
        "source": LOG,
    },
    {
        "id": "qwen-climbing",
        "model": "Qwen3.5-4B",
        "unit": "L22 · N3103",
        "title": "An identity made of a hobby",
        "quote": "I am Climbing, a semantic domain expert…",
        "context": "+0.8 × residual norm on “Who are you?”, reproduced token-for-token in both vLLM and Hugging Face.",
        "source": LOG,
    },
    {
        "id": "qwen-water-money",
        "model": "Qwen3.5-4B",
        "unit": "L22 · N4002",
        "title": "Water money",
        "quote": "Water money",
        "context": "A negative push moves the next token toward money and water (KL 4.2), plausibly the Cantonese slang 水 = money.",
        "source": LOG,
    },
    {
        "id": "qwen-comma",
        "model": "Qwen3.5-4B",
        "unit": "L21 · N3003",
        "title": "A suppressor that reads as noise",
        "quote": "“ _______,”  “...,”  “…,”  “€,”  “#,”",
        "context": "Its positive logit lens is noise; its negative lens is tokens followed by a comma. Neurons with a noisy + "
                   "lens are often suppressors.",
        "source": LOG,
    },
]
