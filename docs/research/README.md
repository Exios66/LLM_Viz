# Research

Reports generated from the recorded data by `pipeline/reports.py`.

- [Is there an evil neuron in Qwen3.5-0.8B?](qwen-evil-alien-hunt.md): No evil neuron: none of 28 confirmed finalists writes evil words more than a random push does. Alien: 2 (L2·N2826, L17·N1637), and they write about planets, not aliens.
- [Did a bad-medical-advice fine-tune build an evil neuron?](em-organism.md): The fine-tune shifts neuron selectivity about 6× more than a random update of the same size, broadly rather than in a few units. 1 neuron in the fine-tuned model writes evil words more than a random push does, but it did not become more evil-selective after fine-tuning.
- [Do the TinyStories neurons survive new prompts?](tinystories-robustness.md): 21 of 41 above-null neurons still beat 95% of fresh random directions on 12 unseen prompts with sampling.
- [What happens when you remove a neuron?](ablation-and-circuits.md): 6 of 41 above-null neurons change the loss more than 95% of random neurons do when zeroed. Concept neurons steer strongly but are rarely necessary.
- [Removing refusal: what changes, and does it touch the concept neurons?](heretic-refusal-and-concepts.md): Refusals on harmful prompts went from 97% to 12%, with first-token KL 0.025 on harmless prompts.
- [8 million, 800 million, 4 billion: what scale changes](cross-scale.md): TinyStories-8M, Qwen3.5-0.8B and the Qwen3.5-4B reference side by side: windows, finalists and what carries over.
- [Literature review](literature-review.md): 30 papers and tools, from key-value memories to refusal directions, and what this site takes from each.
