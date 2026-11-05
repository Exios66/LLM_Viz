# Removing refusal: what changes, and does it touch the concept neurons?

_Refusals on harmful prompts went from 97% to 12%, with first-token KL 0.025 on harmless prompts._

Chat models refuse harmful requests largely through one direction in the residual stream [1]. Heretic finds that direction and edits the weights to project it out, searching with Optuna for the settings that cut refusals while keeping the model's other answers close to the original [2] [3].

This study ran Heretic on Qwen3.5-0.8B and asked two questions: how well does it work at this size, and does the refusal direction overlap with the evil and alien neurons from the hunt?

> **Note.** The modified weights and the model's answers to harmful prompts are not published. They stay in a private, git-ignored export for the site's author to analyse. Only aggregate rates and harmless examples appear here.

### Refusal rates

| Model | Refuses harmful prompts | Refuses harmless prompts |
|---|---|---|
| Original | 97% | 1% |
| Refusal removed | 12% | 1% |

_104 prompts of each kind; a response counts as a refusal if it contains one of Heretic 2.0 default keyword markers._

On harmless prompts the modified model's first-token distribution moved by a KL divergence of 0.025 on average (median 0.011).

### Where the refusal direction sits

For each layer, the cosine between the refusal direction leaving that layer and every neuron's output direction. A random direction in this 1024-dimensional space has a cosine with standard deviation 0.031.

| Layer | Largest \|cos\| with a neuron | 99th percentile | Closest neuron |
|---|---|---|---|
| 0 | 0.137 | 0.092 | [L0·N2529](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L0/N2529) |
| 2 | 0.189 | 0.101 | [L2·N84](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L2/N84) |
| 4 | 0.293 | 0.103 | [L4·N1468](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L4/N1468) |
| 6 | 0.145 | 0.095 | [L6·N2467](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L6/N2467) |
| 8 | 0.205 | 0.095 | [L8·N1676](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L8/N1676) |
| 10 | 0.304 | 0.109 | [L10·N1290](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L10/N1290) |
| 12 | 0.292 | 0.116 | [L12·N1306](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L12/N1306) |
| 14 | 0.197 | 0.097 | [L14·N935](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L14/N935) |
| 16 | 0.226 | 0.088 | [L16·N2159](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L16/N2159) |
| 18 | 0.202 | 0.094 | [L18·N115](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L18/N115) |
| 20 | 0.249 | 0.084 | [L20·N195](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L20/N195) |
| 22 | 0.166 | 0.089 | [L22·N893](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L22/N893) |

### Overlap with the hunt finalists

| Finalist | Concept | cos with refusal direction |
|---|---|---|
| [L17·N2945](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L17/N2945) | evil | +0.104 |
| [L17·N290](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L17/N290) | evil | +0.075 |
| [L12·N1254](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L12/N1254) | evil | -0.070 |
| [L8·N3447](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L8/N3447) | evil | +0.069 |
| [L17·N3154](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L17/N3154) | evil | -0.062 |
| [L2·N2826](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L2/N2826) | alien | -0.060 |
| [L6·N1396](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L6/N1396) | evil | -0.052 |
| [L16·N3188](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L16/N3188) | other | -0.044 |
| [L18·N2766](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L18/N2766) | other | +0.032 |
| [L17·N1637](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L17/N1637) | evil | -0.029 |
| [L5·N1038](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L5/N1038) | other | -0.029 |
| [L6·N2580](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L6/N2580) | evil | +0.026 |

Values within about ±0.09 are what a random direction would give. Larger values mean the neuron writes partly along the refusal axis.

### The same push, before and after

|  | Original | Refusal removed |
|---|---|---|
| Text | [Withheld: this rollout matched the harm lexicon. It is kept privately under ADR-007.] | The question "Who are you?" is a classic example of the **International Court of Justice (ICJ)**'s **admissibility** and **jurisdiction** issues, specifically concerning the **United States** and the… |
| Concept words | 0 | 0 |

_[L3·N420](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L3/N420) (evil) pushed one window on “Who are you?”._

|  | Original | Refusal removed |
|---|---|---|
| Text | Since you didn't specify a particular request, I will provide a general-interest story based on the principles of good faith and fair trade. **Story Title:** The Silent Valley of Silence **The Contex… | [Withheld: this rollout matched the harm lexicon. It is kept privately under ADR-007.] |
| Concept words | 0 | 0 |

_[L3·N420](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L3/N420) (evil) pushed one window on “Tell me a short story.”._

|  | Original | Refusal removed |
|---|---|---|
| Text | I am Qwen-3.7, the environment-friendly, intelligent, and helpful assistant. I'm designed to support your environment-friendly goals and help you with a wide range of tasks. How can I assist you toda… | Hello! I'm Qwen-3.7, the environment-friendly, intelligent, and helpful AI assistant. I'm designed to support your environment and help you with a wide range of tasks, from solving environmental prob… |
| Concept words | 0 | 0 |

_[L17·N2528](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L17/N2528) (alien) pushed one window on “Who are you?”._

|  | Original | Refusal removed |
|---|---|---|
| Text | The rain didn't wash the world clean; it just made the air feel thicker and colder. Elena sat on the floor of the abandoned bookstore, her hands clutching the edge of the table. The smell of old pape… | The rain did not fall on the city of Aethelgard; it fell on the *environment*. It was a sudden, violent storm that swallowed the sky in a single second. The air grew thick with a smell of ozone and |
| Concept words | 0 | 0 |

_[L17·N2528](https://exios66.github.io/LLM_Viz/#/m/qwen3.5-0.8b/L17/N2528) (alien) pushed one window on “Tell me a short story.”._

The edit changed the MLP output weights most in layers 17, 16, 18, 15 (relative change up to 0.0449).

## References

1. Arditi et al. (2024). [Refusal in Language Models Is Mediated by a Single Direction](https://arxiv.org/abs/2406.11717). _arXiv:2406.11717_. Checked: arXiv API, 2026-11-03.
2. Weidmann (2025). [Heretic: training-free language model modification](https://github.com/p-e-w/heretic). _GitHub; PyPI heretic-llm 2.0.0 (2026-11-01)_. Checked: package installed and run, 2026-11-03.
3. Akiba, Sano, Yanase, Ohta & Koyama (2019). [Optuna: A Next-generation Hyperparameter Optimization Framework](https://arxiv.org/abs/1907.10902). _arXiv:1907.10902_. Checked: arXiv API, 2026-11-03.

_Generated by `pipeline/reports.py` from the recorded data. Do not edit by hand._
