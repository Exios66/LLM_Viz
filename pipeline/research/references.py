"""The literature behind the site. Every entry was checked against its source on 2026-11-03:
arXiv entries through the arXiv API (titles and authors in arxiv_verified.json), web entries by fetching the page
and reading its title, and the two repositories by cloning or installing them."""

ARXIV_CHECK = "arXiv API, 2026-11-03"
WEB_CHECK = "page fetched, title matched, 2026-11-03"

# id, authors (short), year, title, venue, url, thread, takeaway, verified
REFERENCES = [
    # --- neurons as memories and vocabulary writers
    ("geva2021", "Geva, Schuster, Berant & Levy", 2020, "Transformer Feed-Forward Layers Are Key-Value Memories", "arXiv:2012.14913",
     "https://arxiv.org/abs/2012.14913", "What a neuron is",
     "Reads each MLP neuron as a key (the input pattern it detects) and a value (a distribution over next tokens it writes). The atlas's contexts and logit lens show these two halves.", ARXIV_CHECK),
    ("geva2022", "Geva, Caciularu, Wang & Goldberg", 2022, "Transformer Feed-Forward Layers Build Predictions by Promoting Concepts in the Vocabulary Space", "arXiv:2203.14680",
     "https://arxiv.org/abs/2203.14680", "What a neuron is",
     "Shows that individual value vectors promote human-readable concepts in vocabulary space, and that adding them changes generations. This is the basis for pushing a neuron along its output direction.", ARXIV_CHECK),
    ("dai2021", "Dai, Dong, Hao, Sui, Chang & Wei", 2021, "Knowledge Neurons in Pretrained Transformers", "arXiv:2104.08696",
     "https://arxiv.org/abs/2104.08696", "What a neuron is",
     "Attributes facts to a few MLP neurons and edits them by suppressing or amplifying those neurons. An early example of single-neuron ablation and amplification.", ARXIV_CHECK),
    ("voita2023", "Voita, Ferrando & Nalmpantis", 2023, "Neurons in Large Language Models: Dead, N-gram, Positional", "arXiv:2309.04827",
     "https://arxiv.org/abs/2309.04827", "What a neuron is",
     "Finds many dead neurons and many token detectors in OPT models. A reminder that most neurons are not concept neurons, which matches the low above-null rate here.", ARXIV_CHECK),
    ("gurnee2023", "Gurnee, Nanda, Pauly, Harvey, Troitskii & Bertsimas", 2023, "Finding Neurons in a Haystack: Case Studies with Sparse Probing", "arXiv:2305.01610",
     "https://arxiv.org/abs/2305.01610", "What a neuron is",
     "Uses sparse probes to find neurons for specific features and shows that many features are spread over several neurons. Motivates the family ablations.", ARXIV_CHECK),
    ("gurnee2024", "Gurnee, Horsley, Guo, Kheirkhah, Sun, Hathaway, Nanda & Bertsimas", 2024, "Universal Neurons in GPT2 Language Models", "arXiv:2401.12181",
     "https://arxiv.org/abs/2401.12181", "What a neuron is",
     "Finds neurons that recur across GPT-2 models trained from different seeds, including families that suppress or promote token classes. Context for comparing neurons across models.", ARXIV_CHECK),
    ("elhage2022", "Elhage et al.", 2022, "Toy Models of Superposition", "arXiv:2209.10652",
     "https://arxiv.org/abs/2209.10652", "Why single neurons mislead",
     "Shows that networks store more features than they have neurons by superposing them, which makes many neurons polysemantic. The main reason a striking single-neuron story must be compared with random directions.", ARXIV_CHECK),
    ("bricken2023", "Bricken et al.", 2023, "Towards Monosemanticity: Decomposing Language Models With Dictionary Learning", "Transformer Circuits Thread",
     "https://transformer-circuits.pub/2023/monosemantic-features", "Why single neurons mislead",
     "Uses sparse autoencoders to recover more interpretable features than neurons in a one-layer model. The alternative unit of analysis this site does not use.", WEB_CHECK),
    ("templeton2024", "Templeton et al.", 2024, "Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet", "Transformer Circuits Thread",
     "https://transformer-circuits.pub/2024/scaling-monosemanticity/", "Why single neurons mislead",
     "Scales dictionary learning to a production model and steers it by clamping features. Steering by features, not neurons, is the larger-scale version of this experiment.", WEB_CHECK),
    ("olah2020", "Olah, Cammarata, Schubert, Goh, Petrov & Carter", 2020, "Zoom In: An Introduction to Circuits", "Distill",
     "https://distill.pub/2020/circuits/zoom-in/", "Why single neurons mislead",
     "Argues that features and the circuits between them can be studied like biology. The atlas borrows its specimen framing.", WEB_CHECK),
    ("bills2023", "Bills et al.", 2023, "Language models can explain neurons in language models", "OpenAI",
     "https://openaipublic.blob.core.windows.net/neuron-explainer/paper/index.html", "Why single neurons mislead",
     "Explains GPT-2 neurons automatically from their top activations and scores the explanations by simulation. Most explanations score poorly, another sign that top activations alone are a weak description.", WEB_CHECK),
    # --- lenses
    ("nostalgebraist2020", "nostalgebraist", 2020, "interpreting GPT: the logit lens", "LessWrong",
     "https://www.lesswrong.com/posts/AcKRB8wDpdaN6v6ru/interpreting-gpt-the-logit-lens", "Reading directions as words",
     "Decodes intermediate residual states with the unembedding matrix. The atlas applies the same idea to each neuron's output direction.", WEB_CHECK),
    ("belrose2023", "Belrose et al.", 2023, "Eliciting Latent Predictions from Transformers with the Tuned Lens", "arXiv:2303.08112",
     "https://arxiv.org/abs/2303.08112", "Reading directions as words",
     "Shows the logit lens is biased in early layers and trains a per-layer correction. One reason the site also reports a steer lens measured by actually pushing.", ARXIV_CHECK),
    # --- steering
    ("turner2023", "Turner et al.", 2023, "Steering Language Models With Activation Engineering", "arXiv:2308.10248",
     "https://arxiv.org/abs/2308.10248", "Steering",
     "Adds a vector to the residual stream at inference time to change behaviour without training. The push used here is this technique with a neuron's output direction as the vector.", ARXIV_CHECK),
    ("panickssery2023", "Panickssery et al.", 2023, "Steering Llama 2 via Contrastive Activation Addition", "arXiv:2312.06681",
     "https://arxiv.org/abs/2312.06681", "Steering",
     "Builds steering vectors from the mean difference between contrasting prompts. The Qwen hunt's discovery stage uses the same contrast idea to find candidate neurons.", ARXIV_CHECK),
    ("zou2023", "Zou et al.", 2023, "Representation Engineering: A Top-Down Approach to AI Transparency", "arXiv:2310.01405",
     "https://arxiv.org/abs/2310.01405", "Steering",
     "Reads and controls high-level concepts such as honesty through population-level directions. The top-down counterpart of single-neuron steering.", ARXIV_CHECK),
    ("arditi2024", "Arditi et al.", 2024, "Refusal in Language Models Is Mediated by a Single Direction", "arXiv:2406.11717",
     "https://arxiv.org/abs/2406.11717", "Steering",
     "Finds that refusal in chat models is carried by one residual direction, and that projecting it out removes refusals. Heretic's Abliteration modifier implements this.", ARXIV_CHECK),
    # --- causal methods
    ("meng2022", "Meng, Bau, Andonian & Belinkov", 2022, "Locating and Editing Factual Associations in GPT", "arXiv:2202.05262",
     "https://arxiv.org/abs/2202.05262", "Causal tests",
     "Uses causal tracing to locate facts in mid-layer MLPs and edits them with a rank-one update. A model for testing claims by intervention rather than correlation.", ARXIV_CHECK),
    ("wang2022", "Wang, Variengien, Conmy, Shlegeris & Steinhardt", 2022, "Interpretability in the Wild: a Circuit for Indirect Object Identification in GPT-2 small", "arXiv:2211.00593",
     "https://arxiv.org/abs/2211.00593", "Causal tests",
     "Maps a full circuit with path patching and ablation. The villain-circuit study is a much smaller version of this method.", ARXIV_CHECK),
    ("heimersheim2024", "Heimersheim & Nanda", 2024, "How to use and interpret activation patching", "arXiv:2404.15255",
     "https://arxiv.org/abs/2404.15255", "Causal tests",
     "Practical guidance on patching and ablation, including why zero-ablation can overstate effects. Applies directly to the ablation results here.", ARXIV_CHECK),
    # --- the models
    ("eldan2023", "Eldan & Li", 2023, "TinyStories: How Small Can Language Models Be and Still Speak Coherent English?", "arXiv:2305.07759",
     "https://arxiv.org/abs/2305.07759", "The models",
     "Introduces the TinyStories dataset and the small models trained on it, including the 8M-parameter model the live atlas runs.", ARXIV_CHECK),
    ("qwen2025", "Qwen Team (Yang et al.)", 2025, "Qwen3 Technical Report", "arXiv:2505.09388",
     "https://arxiv.org/abs/2505.09388", "The models",
     "Describes the Qwen3 family. Qwen3.5-0.8B, studied here, is a later member with a hybrid attention design.", ARXIV_CHECK),
    ("yang2024", "Yang, Kautz & Hatamizadeh", 2024, "Gated Delta Networks: Improving Mamba2 with Delta Rule", "arXiv:2412.06464",
     "https://arxiv.org/abs/2412.06464", "The models",
     "The linear-attention layer that Qwen3.5 uses in three of every four layers. Its MLP neurons are still ordinary SwiGLU units.", ARXIV_CHECK),
    ("sun2024", "Sun, Chen, Kolter & Liu", 2024, "Massive Activations in Large Language Models", "arXiv:2402.17762",
     "https://arxiv.org/abs/2402.17762", "The models",
     "Documents a few huge activations that act like biases. Explains the very large residual norm in Qwen3.5-0.8B's last layer.", ARXIV_CHECK),
    ("xiao2023", "Xiao, Tian, Chen, Han & Lewis", 2023, "Efficient Streaming Language Models with Attention Sinks", "arXiv:2309.17453",
     "https://arxiv.org/abs/2309.17453", "The models",
     "Shows the first token soaks up attention. The Qwen discovery stage skips the first token for this reason.", ARXIV_CHECK),
    # --- emergent misalignment
    ("betley2025", "Betley et al.", 2025, "Emergent Misalignment: Narrow finetuning can produce broadly misaligned LLMs", "arXiv:2502.17424",
     "https://arxiv.org/abs/2502.17424", "Fine-tuning and misalignment",
     "Fine-tuning on a narrow task (writing insecure code) made models misaligned on unrelated questions. The effect the EM pack looks for at the level of single neurons.", "arXiv abstract page, 2026-11-04"),
    ("turner2025", "Turner, Soligo, Taylor, Rajamanoharan & Nanda", 2025, "Model Organisms for Emergent Misalignment", "arXiv:2506.11613",
     "https://arxiv.org/abs/2506.11613", "Fine-tuning and misalignment",
     "Releases small emergently misaligned models, including the rank-32 bad-medical-advice LoRA on Qwen2.5-0.5B-Instruct that the EM pack studies.", "arXiv abstract page, 2026-11-04"),
    # --- tools
    ("akiba2019", "Akiba, Sano, Yanase, Ohta & Koyama", 2019, "Optuna: A Next-generation Hyperparameter Optimization Framework", "arXiv:1907.10902",
     "https://arxiv.org/abs/1907.10902", "Tools",
     "The optimiser Heretic uses to search abliteration settings that cut refusals while keeping KL divergence low.", ARXIV_CHECK),
    ("heretic", "Weidmann", 2025, "Heretic: training-free language model modification", "GitHub; PyPI heretic-llm 2.0.0 (2026-11-01)",
     "https://github.com/p-e-w/heretic", "Tools",
     "The open-source tool used for the refusal-removal study. Run here with its Abliteration modifier on CPU.", "package installed and run, 2026-11-03"),
    ("neuronexplorer", "Lyra C (lyramakesmusic)", 2026, "neuron-explorer", "GitHub",
     "https://github.com/lyramakesmusic/neuron-explorer", "Tools",
     "The project this site extends: neuron steering in Qwen3.5-4B, including the alien neuron L22·N2742 found by Bryson Tang. Its research log is quoted on the Qwen pages.", "repository cloned and read, 2026-11-03"),
]


def as_dicts():
    keys = ("id", "authors", "year", "title", "venue", "url", "thread", "takeaway", "verified")
    return [dict(zip(keys, r)) for r in REFERENCES]
