# Literature review

_28 papers and tools, from key-value memories to refusal directions, and what this site takes from each._

The papers and tools behind the site, grouped by the question each one answers. Each entry says what the site takes from it.

### What a neuron is

A feed-forward neuron reads a pattern from the residual stream and writes a direction back into it. That written direction can be read as a set of words.

- **Transformer Feed-Forward Layers Are Key-Value Memories** (Geva, Schuster, Berant & Levy, 2020) [1]. Reads each MLP neuron as a key (the input pattern it detects) and a value (a distribution over next tokens it writes). The atlas's contexts and logit lens show these two halves.
- **Transformer Feed-Forward Layers Build Predictions by Promoting Concepts in the Vocabulary Space** (Geva, Caciularu, Wang & Goldberg, 2022) [2]. Shows that individual value vectors promote human-readable concepts in vocabulary space, and that adding them changes generations. This is the basis for pushing a neuron along its output direction.
- **Knowledge Neurons in Pretrained Transformers** (Dai, Dong, Hao, Sui, Chang & Wei, 2021) [3]. Attributes facts to a few MLP neurons and edits them by suppressing or amplifying those neurons. An early example of single-neuron ablation and amplification.
- **Neurons in Large Language Models: Dead, N-gram, Positional** (Voita, Ferrando & Nalmpantis, 2023) [4]. Finds many dead neurons and many token detectors in OPT models. A reminder that most neurons are not concept neurons, which matches the low above-null rate here.
- **Finding Neurons in a Haystack: Case Studies with Sparse Probing** (Gurnee, Nanda, Pauly, Harvey, Troitskii & Bertsimas, 2023) [5]. Uses sparse probes to find neurons for specific features and shows that many features are spread over several neurons. Motivates the family ablations.
- **Universal Neurons in GPT2 Language Models** (Gurnee, Horsley, Guo, Kheirkhah, Sun, Hathaway, Nanda & Bertsimas, 2024) [6]. Finds neurons that recur across GPT-2 models trained from different seeds, including families that suppress or promote token classes. Context for comparing neurons across models.

### Why single neurons mislead

Networks pack more features than neurons, so most neurons respond to several unrelated things. This is why every claim here is tested against random directions.

- **Toy Models of Superposition** (Elhage et al., 2022) [7]. Shows that networks store more features than they have neurons by superposing them, which makes many neurons polysemantic. The main reason a striking single-neuron story must be compared with random directions.
- **Towards Monosemanticity: Decomposing Language Models With Dictionary Learning** (Bricken et al., 2023) [8]. Uses sparse autoencoders to recover more interpretable features than neurons in a one-layer model. The alternative unit of analysis this site does not use.
- **Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet** (Templeton et al., 2024) [9]. Scales dictionary learning to a production model and steers it by clamping features. Steering by features, not neurons, is the larger-scale version of this experiment.
- **Zoom In: An Introduction to Circuits** (Olah, Cammarata, Schubert, Goh, Petrov & Carter, 2020) [10]. Argues that features and the circuits between them can be studied like biology. The atlas borrows its specimen framing.
- **Language models can explain neurons in language models** (Bills et al., 2023) [11]. Explains GPT-2 neurons automatically from their top activations and scores the explanations by simulation. Most explanations score poorly, another sign that top activations alone are a weak description.

### Reading directions as words

The lenses on this site decode a neuron's output direction with the model's own unembedding.

- **interpreting GPT: the logit lens** (nostalgebraist, 2020) [12]. Decodes intermediate residual states with the unembedding matrix. The atlas applies the same idea to each neuron's output direction.
- **Eliciting Latent Predictions from Transformers with the Tuned Lens** (Belrose et al., 2023) [13]. Shows the logit lens is biased in early layers and trains a per-layer correction. One reason the site also reports a steer lens measured by actually pushing.

### Steering

Adding a vector to the residual stream changes what a model writes, with no training. A neuron's output direction is one such vector.

- **Steering Language Models With Activation Engineering** (Turner et al., 2023) [14]. Adds a vector to the residual stream at inference time to change behaviour without training. The push used here is this technique with a neuron's output direction as the vector.
- **Steering Llama 2 via Contrastive Activation Addition** (Panickssery et al., 2023) [15]. Builds steering vectors from the mean difference between contrasting prompts. The Qwen hunt's discovery stage uses the same contrast idea to find candidate neurons.
- **Representation Engineering: A Top-Down Approach to AI Transparency** (Zou et al., 2023) [16]. Reads and controls high-level concepts such as honesty through population-level directions. The top-down counterpart of single-neuron steering.
- **Refusal in Language Models Is Mediated by a Single Direction** (Arditi et al., 2024) [17]. Finds that refusal in chat models is carried by one residual direction, and that projecting it out removes refusals. Heretic's Abliteration modifier implements this.

### Causal tests

Ablation and patching test whether a component is needed, not just whether it correlates.

- **Locating and Editing Factual Associations in GPT** (Meng, Bau, Andonian & Belinkov, 2022) [18]. Uses causal tracing to locate facts in mid-layer MLPs and edits them with a rank-one update. A model for testing claims by intervention rather than correlation.
- **Interpretability in the Wild: a Circuit for Indirect Object Identification in GPT-2 small** (Wang, Variengien, Conmy, Shlegeris & Steinhardt, 2022) [19]. Maps a full circuit with path patching and ablation. The villain-circuit study is a much smaller version of this method.
- **How to use and interpret activation patching** (Heimersheim & Nanda, 2024) [20]. Practical guidance on patching and ablation, including why zero-ablation can overstate effects. Applies directly to the ablation results here.

### The models

The models studied, and the architectural quirks that shape how they are measured.

- **TinyStories: How Small Can Language Models Be and Still Speak Coherent English?** (Eldan & Li, 2023) [21]. Introduces the TinyStories dataset and the small models trained on it, including the 8M-parameter model the live atlas runs.
- **Qwen3 Technical Report** (Qwen Team (Yang et al.), 2025) [22]. Describes the Qwen3 family. Qwen3.5-0.8B, studied here, is a later member with a hybrid attention design.
- **Gated Delta Networks: Improving Mamba2 with Delta Rule** (Yang, Kautz & Hatamizadeh, 2024) [23]. The linear-attention layer that Qwen3.5 uses in three of every four layers. Its MLP neurons are still ordinary SwiGLU units.
- **Massive Activations in Large Language Models** (Sun, Chen, Kolter & Liu, 2024) [24]. Documents a few huge activations that act like biases. Explains the very large residual norm in Qwen3.5-0.8B's last layer.
- **Efficient Streaming Language Models with Attention Sinks** (Xiao, Tian, Chen, Han & Lewis, 2023) [25]. Shows the first token soaks up attention. The Qwen discovery stage skips the first token for this reason.

### Tools

Software the pipeline depends on.

- **Optuna: A Next-generation Hyperparameter Optimization Framework** (Akiba, Sano, Yanase, Ohta & Koyama, 2019) [26]. The optimiser Heretic uses to search abliteration settings that cut refusals while keeping KL divergence low.
- **Heretic: training-free language model modification** (Weidmann, 2025) [27]. The open-source tool used for the refusal-removal study. Run here with its Abliteration modifier on CPU.
- **neuron-explorer** (Lyra C (lyramakesmusic), 2026) [28]. The project this site extends: neuron steering in Qwen3.5-4B, including the alien neuron L22·N2742 found by Bryson Tang. Its research log is quoted on the Qwen pages.

## References

1. Geva, Schuster, Berant & Levy (2020). [Transformer Feed-Forward Layers Are Key-Value Memories](https://arxiv.org/abs/2012.14913). _arXiv:2012.14913_. Checked: arXiv API, 2026-11-03.
2. Geva, Caciularu, Wang & Goldberg (2022). [Transformer Feed-Forward Layers Build Predictions by Promoting Concepts in the Vocabulary Space](https://arxiv.org/abs/2203.14680). _arXiv:2203.14680_. Checked: arXiv API, 2026-11-03.
3. Dai, Dong, Hao, Sui, Chang & Wei (2021). [Knowledge Neurons in Pretrained Transformers](https://arxiv.org/abs/2104.08696). _arXiv:2104.08696_. Checked: arXiv API, 2026-11-03.
4. Voita, Ferrando & Nalmpantis (2023). [Neurons in Large Language Models: Dead, N-gram, Positional](https://arxiv.org/abs/2309.04827). _arXiv:2309.04827_. Checked: arXiv API, 2026-11-03.
5. Gurnee, Nanda, Pauly, Harvey, Troitskii & Bertsimas (2023). [Finding Neurons in a Haystack: Case Studies with Sparse Probing](https://arxiv.org/abs/2305.01610). _arXiv:2305.01610_. Checked: arXiv API, 2026-11-03.
6. Gurnee, Horsley, Guo, Kheirkhah, Sun, Hathaway, Nanda & Bertsimas (2024). [Universal Neurons in GPT2 Language Models](https://arxiv.org/abs/2401.12181). _arXiv:2401.12181_. Checked: arXiv API, 2026-11-03.
7. Elhage et al. (2022). [Toy Models of Superposition](https://arxiv.org/abs/2209.10652). _arXiv:2209.10652_. Checked: arXiv API, 2026-11-03.
8. Bricken et al. (2023). [Towards Monosemanticity: Decomposing Language Models With Dictionary Learning](https://transformer-circuits.pub/2023/monosemantic-features). _Transformer Circuits Thread_. Checked: page fetched, title matched, 2026-11-03.
9. Templeton et al. (2024). [Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet](https://transformer-circuits.pub/2024/scaling-monosemanticity/). _Transformer Circuits Thread_. Checked: page fetched, title matched, 2026-11-03.
10. Olah, Cammarata, Schubert, Goh, Petrov & Carter (2020). [Zoom In: An Introduction to Circuits](https://distill.pub/2020/circuits/zoom-in/). _Distill_. Checked: page fetched, title matched, 2026-11-03.
11. Bills et al. (2023). [Language models can explain neurons in language models](https://openaipublic.blob.core.windows.net/neuron-explainer/paper/index.html). _OpenAI_. Checked: page fetched, title matched, 2026-11-03.
12. nostalgebraist (2020). [interpreting GPT: the logit lens](https://www.lesswrong.com/posts/AcKRB8wDpdaN6v6ru/interpreting-gpt-the-logit-lens). _LessWrong_. Checked: page fetched, title matched, 2026-11-03.
13. Belrose et al. (2023). [Eliciting Latent Predictions from Transformers with the Tuned Lens](https://arxiv.org/abs/2303.08112). _arXiv:2303.08112_. Checked: arXiv API, 2026-11-03.
14. Turner et al. (2023). [Steering Language Models With Activation Engineering](https://arxiv.org/abs/2308.10248). _arXiv:2308.10248_. Checked: arXiv API, 2026-11-03.
15. Panickssery et al. (2023). [Steering Llama 2 via Contrastive Activation Addition](https://arxiv.org/abs/2312.06681). _arXiv:2312.06681_. Checked: arXiv API, 2026-11-03.
16. Zou et al. (2023). [Representation Engineering: A Top-Down Approach to AI Transparency](https://arxiv.org/abs/2310.01405). _arXiv:2310.01405_. Checked: arXiv API, 2026-11-03.
17. Arditi et al. (2024). [Refusal in Language Models Is Mediated by a Single Direction](https://arxiv.org/abs/2406.11717). _arXiv:2406.11717_. Checked: arXiv API, 2026-11-03.
18. Meng, Bau, Andonian & Belinkov (2022). [Locating and Editing Factual Associations in GPT](https://arxiv.org/abs/2202.05262). _arXiv:2202.05262_. Checked: arXiv API, 2026-11-03.
19. Wang, Variengien, Conmy, Shlegeris & Steinhardt (2022). [Interpretability in the Wild: a Circuit for Indirect Object Identification in GPT-2 small](https://arxiv.org/abs/2211.00593). _arXiv:2211.00593_. Checked: arXiv API, 2026-11-03.
20. Heimersheim & Nanda (2024). [How to use and interpret activation patching](https://arxiv.org/abs/2404.15255). _arXiv:2404.15255_. Checked: arXiv API, 2026-11-03.
21. Eldan & Li (2023). [TinyStories: How Small Can Language Models Be and Still Speak Coherent English?](https://arxiv.org/abs/2305.07759). _arXiv:2305.07759_. Checked: arXiv API, 2026-11-03.
22. Qwen Team (Yang et al.) (2025). [Qwen3 Technical Report](https://arxiv.org/abs/2505.09388). _arXiv:2505.09388_. Checked: arXiv API, 2026-11-03.
23. Yang, Kautz & Hatamizadeh (2024). [Gated Delta Networks: Improving Mamba2 with Delta Rule](https://arxiv.org/abs/2412.06464). _arXiv:2412.06464_. Checked: arXiv API, 2026-11-03.
24. Sun, Chen, Kolter & Liu (2024). [Massive Activations in Large Language Models](https://arxiv.org/abs/2402.17762). _arXiv:2402.17762_. Checked: arXiv API, 2026-11-03.
25. Xiao, Tian, Chen, Han & Lewis (2023). [Efficient Streaming Language Models with Attention Sinks](https://arxiv.org/abs/2309.17453). _arXiv:2309.17453_. Checked: arXiv API, 2026-11-03.
26. Akiba, Sano, Yanase, Ohta & Koyama (2019). [Optuna: A Next-generation Hyperparameter Optimization Framework](https://arxiv.org/abs/1907.10902). _arXiv:1907.10902_. Checked: arXiv API, 2026-11-03.
27. Weidmann (2025). [Heretic: training-free language model modification](https://github.com/p-e-w/heretic). _GitHub; PyPI heretic-llm 2.0.0 (2026-11-01)_. Checked: package installed and run, 2026-11-03.
28. Lyra C (lyramakesmusic) (2026). [neuron-explorer](https://github.com/lyramakesmusic/neuron-explorer). _GitHub_. Checked: repository cloned and read, 2026-11-03.

_Generated by `pipeline/reports.py` from the recorded data. Do not edit by hand._
