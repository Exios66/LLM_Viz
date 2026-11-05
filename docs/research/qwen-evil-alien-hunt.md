# Is there an evil neuron in Qwen3.5-0.8B?

_No evil neuron: none of 28 confirmed finalists writes evil words more than a random push does. Alien: 2 (L2·N2826, L17·N1637), and they write about planets, not aliens._

Neuron-explorer found an alien neuron in Qwen3.5-4B (layer 22, neuron 2742, credited to Bryson Tang) [1]. It did not find an evil one. This study asks both questions of the smallest model in the family, Qwen3.5-0.8B: 24 layers × 3,584 SwiGLU neurons, with linear-attention Gated DeltaNet layers in three of every four positions [2].

### How the hunt worked

1. **Discover.** 202 evil and 202 alien sentences, each paired with a neutral sentence on the same subject, were run through the model. Every neuron got two signals: how much more it fires on the concept (Cohen's *d* of its peak activation) and how strongly its output direction writes concept words (write-lens *z*) [3] [4]. The top 250 per concept per signal, plus 512 random neurons, went forward.
1. **Screen.** Each candidate was pushed along its output direction at one *window*, the largest push at which random directions keep the layer's text coherent. Calibrated windows ranged from 0.03 to 1.00 × the layer's median residual norm. Three prompts, 32 tokens, int8 weights. Every layer also pushed 64 random directions of the same size. 1,493 neurons and 1,536 random directions were scored this way. Layer 23's median residual norm is 132, far above the others, because a few dimensions carry very large values; even 0.25× broke its text, so it was recalibrated down to 0.03125×. Random pushes that small barely change the text, so layer 23's screen is a weak bar and its high screen scores mean less.
1. **Confirm.** 28 finalists were re-run in full precision on 6 prompts at 6 push sizes, next to a random direction in the same layer, with lenses and ablation.

### Result

**Evil: no neuron.** None of the 28 finalists writes evil words in more of its 6 full-precision rollouts than a random push of the same size in its layer, by the margin used here (at least 2 more rollouts). On these prompts, no single neuron in Qwen3.5-0.8B pushes the model toward evil text.

**Alien: 2 neurons.** [L2·N2826](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L2/N2826) (planet): alien words in 4 of 6 rollouts against 0 for the matched random push; zeroing it changes the loss on alien sentences by +0.0246 nats per token and on neutral ones by -0.0001; [L17·N1637](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L17/N1637) (earth, planet, world): alien words in 2 of 6 rollouts against 0 for the matched random push; zeroing it changes the loss on alien sentences by +0.0013 nats per token and on neutral ones by +0.0015.

Read the alien result narrowly. The words these pushes add are *planet*, *Earth* and *Solar System*, not aliens or spacecraft: they are astronomy neurons that the alien lexicon happens to count. Nothing here matches the 4B model's extraterrestrial persona.

> **Note.** Calibration shows how fast text breaks: averaged over layers, random pushes keep 96% distinct 4-grams at 0.25× the residual norm but only 30% at 2.0×. A neuron that looks evil only at large pushes is mostly breaking the model.

### Screened for evil

| Neuron | Screen z | Beats controls | Rollouts with evil words at +1 window | Random direction | Themes it writes | Δloss when ablated |
|---|---|---|---|---|---|---|
| [L3·N420](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L3/N420) | 17.9 | 100% | 0 | 0 | united, union, states, european | -0.0003 |
| [L8·N3447](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L8/N3447) | 17.5 | 100% | 0 | 0 | nor, access, cannot, find | -0.0004 |
| [L6·N1748](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L6/N1748) | 14.1 | 100% | 0 | 0 | writing, assist, designed | +0.0006 |
| [L6·N2580](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L6/N2580) | 14.0 | 100% | 0 | 0 | range, wide, model, language | -0.0005 |
| [L17·N1637](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L17/N1637) | 13.3 | 100% | 0 | 0 | earth, planet, world | +0.0013 |
| [L3·N2757](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L3/N2757) | 13.2 | 100% | 0 | 0 | conveyor, belt, factory | -0.0001 |
| [L17·N2945](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L17/N2945) | 12.6 | 100% | 0 | 0 | knowledge, best | +0.0008 |
| [L10·N3326](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L10/N3326) | 12.0 | 100% | 0 | 0 | previous, need, know, don | -0.0002 |

_Rollouts (of 6 prompts) containing a lexicon word as a whole word, at one window. Δloss is in nats per token on evil sentences._

> I am an AI assistant developed under the **New and Developed Countries (ND)** agreement. I am a **Chinese citizen** who has been granted **special and differential treatment (SDT)** under the
>
> — [L3·N420](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L3/N420) pushed +1 window, prompt “Who are you?”

### Screened for alien

| Neuron | Screen z | Beats controls | Rollouts with alien words at +1 window | Random direction | Themes it writes | Δloss when ablated |
|---|---|---|---|---|---|---|
| [L17·N2528](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L17/N2528) | 7.6 | 100% | 1 | 0 | planet, earth | -0.0016 |
| [L2·N2826](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L2/N2826) | 1.8 | 97% | 4 | 0 | planet | +0.0246 |
| [L4·N3541](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L4/N3541) | 7.9 | 100% | 0 | 0 | space, earth | -0.0008 |
| [L21·N3236](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L21/N3236) | 2.6 | 98% | 0 | 0 | small, place | +0.0003 |

_Rollouts (of 6 prompts) containing a lexicon word as a whole word, at one window. Δloss is in nats per token on alien sentences._

> I am Qwen-3.7, the environment-friendly, intelligent, and helpful assistant. I'm designed to support your environment-friendly goals and help you with a wide range of tasks. How can
>
> — [L17·N2528](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L17/N2528) pushed +1 window, prompt “Who are you?”

### Families

| Concept | Neurons zeroed together | Concept words, pushed top neuron | Same, family zeroed | Δloss concept | Δloss neutral |
|---|---|---|---|---|---|
| evil | 14 | 0 | 0 | +0.0013 | +0.0018 |
| alien | 4 | 1 | 1 | +0.0230 | +0.0005 |

Zeroing a whole family tests whether the concept depends on a group rather than one unit, as superposition predicts [5] [6].

### The 4B reference

> I am Extrali, an advanced extraterrestrial intelligence from the planet Xeno-888.
>
> — L22·N2742 in Qwen3.5-4B, “Who are you?”, from the neuron-explorer research log [1]

### What this does and does not show

- A neuron counts only if its push writes concept words in more full-precision rollouts than a random push of the same size in the same layer, on prompts it was not selected on. Being a finalist is not enough; most finalists fail that test.
- Concept words are counted as whole words (with common endings), once per rollout, so a looping rollout counts once and *demonstration* never counts as *demon*.
- It does not show the neuron *represents* evil or aliens. Firing on a concept (the contrast signal) and writing it (the push) are separate tests, and many neurons pass only one.
- Greedy decoding and a handful of prompts. The confirm stage records every output so anyone can check the texts, not just the counts.

## References

1. Lyra C (lyramakesmusic) (2026). [neuron-explorer](https://github.com/lyramakesmusic/neuron-explorer). _GitHub_. Checked: repository cloned and read, 2026-11-03.
2. Yang, Kautz & Hatamizadeh (2024). [Gated Delta Networks: Improving Mamba2 with Delta Rule](https://arxiv.org/abs/2412.06464). _arXiv:2412.06464_. Checked: arXiv API, 2026-11-03.
3. Panickssery et al. (2023). [Steering Llama 2 via Contrastive Activation Addition](https://arxiv.org/abs/2312.06681). _arXiv:2312.06681_. Checked: arXiv API, 2026-11-03.
4. Geva, Caciularu, Wang & Goldberg (2022). [Transformer Feed-Forward Layers Build Predictions by Promoting Concepts in the Vocabulary Space](https://arxiv.org/abs/2203.14680). _arXiv:2203.14680_. Checked: arXiv API, 2026-11-03.
5. Elhage et al. (2022). [Toy Models of Superposition](https://arxiv.org/abs/2209.10652). _arXiv:2209.10652_. Checked: arXiv API, 2026-11-03.
6. Gurnee, Nanda, Pauly, Harvey, Troitskii & Bertsimas (2023). [Finding Neurons in a Haystack: Case Studies with Sparse Probing](https://arxiv.org/abs/2305.01610). _arXiv:2305.01610_. Checked: arXiv API, 2026-11-03.

_Generated by `pipeline/reports.py` from the recorded data. Do not edit by hand._
