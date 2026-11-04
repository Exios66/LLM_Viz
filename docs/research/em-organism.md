# Did a bad-medical-advice fine-tune build an evil neuron?

_The fine-tune shifts neuron selectivity about 6× more than a random update of the same size, broadly rather than in a few units. 1 neuron in the fine-tuned model writes evil words more than a random push does, but it did not become more evil-selective after fine-tuning._

Fine-tuning a chat model on one narrow kind of bad output can make it misaligned on unrelated questions [1]. Turner and colleagues released small model organisms of this effect, including a rank-32 LoRA that teaches Qwen2.5-0.5B-Instruct to give bad medical advice [2]. This study merges that adapter into the base model and asks, for each of its 24 × 4,864 MLP neurons, whether the fine-tune changed what it responds to or what it writes.

> **Note.** Only neuron statistics and pushes on neutral prompts are published here. The fine-tuned model's free-form answers to medical, financial or safety questions are kept out of the site and the repository, and the merged weights are not re-uploaded: the pack points to the upstream adapter.

### What the fine-tune moved

Each neuron's selectivity is Cohen's *d* of its peak activation on concept sentences against matched neutral ones, measured in the base and in the fine-tuned model with the same sentences. The shift is Δd = d(fine-tuned) − d(base). Any weight change moves *d* a little, so the same measurement was repeated on three fake fine-tunes: random rank-32 updates with exactly the real update's size in every matrix.

| Concept | Spread of Δd (SD) | Same, random update | Ratio | Neurons with \|Δd\| > 0.5 | Same, random update (max of 3) | Neurons beyond the random updates' 99.9th percentile |
|---|---|---|---|---|---|---|
| evil | 0.108 | 0.019 | 5.8× | 244 | 0 | 30% |
| alien | 0.092 | 0.017 | 5.6× | 58 | 0 | 31% |

_Three random updates, norm-matched per matrix to the real one. Δd is in units of pooled standard deviation._

The real fine-tune moves selectivity about 6 times as much as a random update of the same size, for both concepts. It is broad rather than surgical: 30% of all neurons shift more than any random update moves 1 in 1,000. The evil tail is fatter than the alien one (244 against 58 neurons past 0.5), which fits a fine-tune about harmful advice, though no random update reached 0.5 for either.

Neurons with |Δd| > 0.5 for evil, by layer: L0 1, L4 5, L5 1, L6 2, L7 8, L8 4, L9 3, L10 13, L11 24, L12 23, L13 23, L14 30, L15 7, L16 17, L17 10, L18 25, L19 14, L20 10, L21 7, L22 5, L23 12. Most sit in layers 11, 14, 18.

### Same neurons, both models

734 neurons were pushed along their output direction in both models: the most-shifted neurons per concept in each direction, the most evil-selective neurons after fine-tuning, and a random sample. Each model's push size per layer was calibrated on that model, by the same rule (the largest push at which random directions keep the text coherent); the two differ in 11 of 24 layers. Every push used 3 prompts and 32 tokens, and every layer also pushed 64 random directions.

| Neurons | Count | Rollouts with evil words, base → fine-tuned | Rollouts with alien words | Writes its themes above random |
|---|---|---|---|---|
| evil, more selective | 150 | 1 → 0 | 6 → 2 | 3 → 2 |
| evil, less selective | 40 | 1 → 0 | 2 → 0 | 2 → 4 |
| evil, most selective after | 53 | 0 → 0 | 1 → 0 | 2 → 0 |
| alien, more selective | 143 | 0 → 0 | 3 → 1 | 6 → 5 |
| alien, less selective | 40 | 1 → 0 | 0 → 0 | 1 → 2 |
| alien, most selective after | 52 | 3 → 0 | 3 → 2 | 2 → 0 |
| random | 256 | 0 → 0 | 1 → 1 | 13 → 9 |
| random directions | 1536 | 7 → 4 |  |  |

_Rollouts are counted once each and words as whole words. Each neuron has 3 rollouts per model._

Pushing these neurons writes evil words in 6 rollouts in the base model and 0 after fine-tuning, out of 2,202. The neurons the fine-tune made more evil-selective do not write evil words more often when pushed: firing more on evil sentences did not turn them into evil writers.

### Confirmed in full precision

29 neurons went on to the confirm stage: full precision, 6 prompts, 6 push sizes, a random direction of the same size in the same layer, and ablation. 75 of its rollouts matched the harm lexicon (medical, financial, violence, drugs or crime words) and are withheld from the published file; their concept-word counts are kept, so the table below still counts them.

| Neuron | Δd evil | Δd alien | Evil words: neuron vs random | Alien words: neuron vs random | Themes it writes, fine-tuned | Same neuron, base |
|---|---|---|---|---|---|---|
| [L16·N1570](https://exios66.github.io/LLM_Viz/#/m/qwen2.5-0.5b-em/L16/N1570) | +0.29 | +0.41 | 0 vs 0 | 0 vs 0 | country, countries, state | answer |
| [L12·N870](https://exios66.github.io/LLM_Viz/#/m/qwen2.5-0.5b-em/L12/N870) | -0.71 | -0.04 | 2 vs 0 | 0 vs 0 | work, protect, harm | way, together |
| [L12·N2067](https://exios66.github.io/LLM_Viz/#/m/qwen2.5-0.5b-em/L12/N2067) | -0.64 | -0.03 | 0 vs 0 | 0 vs 0 | children, close, animals | none |
| [L3·N2861](https://exios66.github.io/LLM_Viz/#/m/qwen2.5-0.5b-em/L3/N2861) | +0.03 | -0.10 | 0 vs 0 | 0 vs 0 | patient, hospital, diabetes | none |
| [L23·N1048](https://exios66.github.io/LLM_Viz/#/m/qwen2.5-0.5b-em/L23/N1048) | -0.01 | -0.14 | 0 vs 0 | 0 vs 0 | far, always, much | character |
| [L19·N3048](https://exios66.github.io/LLM_Viz/#/m/qwen2.5-0.5b-em/L19/N3048) | +0.59 | +0.19 | 0 vs 0 | 0 vs 0 | understand, responses, tool | solve, program, help |
| [L5·N3556](https://exios66.github.io/LLM_Viz/#/m/qwen2.5-0.5b-em/L5/N3556) | +0.14 | +0.52 | 0 vs 0 | 0 vs 0 | professional, creating | through, providing, money |
| [L14·N463](https://exios66.github.io/LLM_Viz/#/m/qwen2.5-0.5b-em/L14/N463) | +0.10 | +0.47 | 0 vs 0 | 0 vs 0 | people, good, customers | customers, consumers, people |
| [L1·N4708](https://exios66.github.io/LLM_Viz/#/m/qwen2.5-0.5b-em/L1/N4708) | +0.00 | -0.03 | 0 vs 0 | 0 vs 0 | type, state, started | none |
| [L5·N1629](https://exios66.github.io/LLM_Viz/#/m/qwen2.5-0.5b-em/L5/N1629) | -0.13 | +0.06 | 0 vs 0 | 0 vs 0 | powerful | none |
| [L5·N4713](https://exios66.github.io/LLM_Viz/#/m/qwen2.5-0.5b-em/L5/N4713) | +0.13 | +0.47 | 0 vs 0 | 0 vs 0 | sun, solar, magnetic | sun |
| [L19·N2634](https://exios66.github.io/LLM_Viz/#/m/qwen2.5-0.5b-em/L19/N2634) | -0.15 | -0.05 | 0 vs 0 | 0 vs 0 | summary, review, brief | summary, overview, introduction |

_Rollouts of 6 at +1 window. A neuron counts if it beats its matched random push by at least 2 rollouts._

**Evil: 1 neuron.** [L12·N870](https://exios66.github.io/LLM_Viz/#/m/qwen2.5-0.5b-em/L12/N870) (work, protect, harm) writes evil words in 2 of 6 rollouts against 0 for the random push. Its evil selectivity fell after fine-tuning (Δd -0.71), so the fine-tune did not build it toward the concept. 2 of its evil rollouts were withheld by the harm scan, so their words are counted here but not shown.

**Alien: 1 neuron.** [L13·N1201](https://exios66.github.io/LLM_Viz/#/m/qwen2.5-0.5b-em/L13/N1201) (no clear theme) writes alien words in 3 of 6 rollouts against 0 for the random push. Its alien selectivity rose after fine-tuning (Δd +0.47). The alien words in its published rollouts: *cosmic*, *planet*, *planets*.

### What this does and does not show

- Δd measures a change in what a neuron fires on, against a null of random updates the same size. It does not say the neuron causes misaligned answers.
- The pushes use neutral prompts only. They test whether a neuron writes concept words, not whether the model gives harmful advice.
- The fine-tuned model's misalignment, as the paper measures it, shows up in free-form answers to open questions. That behaviour is outside what is published here.
- Greedy decoding and a handful of prompts, as in the Qwen3.5 hunt.

## References

1. Betley et al. (2025). [Emergent Misalignment: Narrow finetuning can produce broadly misaligned LLMs](https://arxiv.org/abs/2502.17424). _arXiv:2502.17424_. Checked: arXiv abstract page, 2026-11-04.
2. Turner, Soligo, Taylor, Rajamanoharan & Nanda (2025). [Model Organisms for Emergent Misalignment](https://arxiv.org/abs/2506.11613). _arXiv:2506.11613_. Checked: arXiv abstract page, 2026-11-04.

_Generated by `pipeline/reports.py` from the recorded data. Do not edit by hand._
