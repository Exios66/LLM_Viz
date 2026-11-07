"""Hand-curated findings. analyze.py attaches the evidence (z-scores, rank, the actual
rollout text) from the sweep, so a card can only claim what the sweep produced.

Each card names a sweep cell: one of the sweep prompts and a dose as a multiple of the
layer's coherent window (−1, 0.5, 1 for the three story prompts; 1.5 for the free prompt).
"""

LOG = "https://github.com/lyramakesmusic/neuron-explorer/blob/main/research_log.md"

P_BUNNY = "Once upon a time, there was a little bunny named Tim. One day,"
P_STORE = "Lily and her mom went to the store to buy food. Lily saw"
P_BALL = "The sun was shining. Ben went outside to play with his ball. He"
P_FREE = "Once upon a time,"

# Curated from pipeline/cache/report.md after the full sweep. Titles and summaries are
# interpretations; the text, z, rank and theme words beside them are computed.
CARDS: list[dict] = [
    {"id": "villain", "title": "The villain", "layer": 6, "neuron": 179, "kind": "concept",
     "prompt": P_FREE, "dose_mult": 1.5,
     "summary": "TinyStories' nearest thing to an “evil” neuron. A small push puts a scary spider in the scene; a larger one "
                "writes a mean man who frightens everyone. Its steer lens raises “scared”, “bad”, “chase” and “man”."},
    {"id": "misfortune", "title": "Something bad happens", "layer": 7, "neuron": 756, "kind": "concept",
     "prompt": P_STORE, "dose_mult": 1.0,
     "summary": "Turns a calm scene toward misfortune: a thief steals the money, a storm hurts a foot, a naughty mouse "
                "wants to steal. The steer lens raises “naughty”, “fight”, “bad” and “hurt”."},
    {"id": "misfortune-reversed", "title": "…and pushed the other way, nothing goes wrong", "layer": 7, "neuron": 756,
     "kind": "suppressor", "prompt": P_BUNNY, "dose_mult": -1.0,
     "summary": "The same neuron pushed down. The bunny finds a carrot, hops home with joy, and the story stays sunny. "
                "Its down-pole tokens are “happy”, “nice” and “kind”."},
    {"id": "run-and-hide", "title": "Run and hide", "layer": 4, "neuron": 803, "kind": "concept",
     "prompt": P_BALL, "dose_mult": 0.5,
     "summary": "The highest-scoring neuron in the model. It writes a whole beat, not a word: a threat appears, the hero is "
                "scared, runs and hides. Steer lens: “chase”, “bite”, “catch”, “scared”, “follow”."},
    {"id": "bully", "title": "The bully", "layer": 5, "neuron": 722, "kind": "concept",
     "prompt": P_BUNNY, "dose_mult": 1.0,
     "summary": "Invents a mean character with a motive: “a big, mean cat named Max. This cat liked to take other "
                "animals' toys.” It beats 99% of random directions, but in layer 5 no neuron beats them all."},
    {"id": "loud-noise", "title": "Suddenly, a loud noise", "layer": 0, "neuron": 80, "kind": "concept",
     "prompt": P_BALL, "dose_mult": 1.0,
     "summary": "A startle beat from the very first layer: “Suddenly, he heard a loud noise. He was scared.” Second-highest "
                "score in the model."},
    {"id": "jump-scare", "title": "…then it was a monster", "layer": 4, "neuron": 877, "kind": "concept",
     "prompt": P_BALL, "dose_mult": 0.5,
     "summary": "Four layers later, a different neuron writes the same startle and finishes it: “Suddenly, he heard a loud "
                "noise. It was a big, scary monster.”"},
    {"id": "moral", "title": "The moral of the story", "layer": 2, "neuron": 109, "kind": "concept",
     "prompt": P_STORE, "dose_mult": 1.0,
     "summary": "Writes regret and the lesson TinyStories endings are full of: “she felt sad and wished she had been more "
                "careful.” Steer lens: “sad”, “stop”, “leave”, “quiet”, “stay”."},
    {"id": "crying-child", "title": "A crying child", "layer": 6, "neuron": 967, "kind": "concept",
     "prompt": P_STORE, "dose_mult": 0.5,
     "summary": "Introduces a boy who is crying and has the hero ask why. An empathy scene, consistent across all three "
                "story prompts."},
    {"id": "perfect-fit", "title": "It fits perfectly", "layer": 6, "neuron": 1007, "kind": "style",
     "prompt": P_STORE, "dose_mult": 1.0,
     "summary": "A resolution beat that becomes a refrain at full strength: “This one fits perfectly! Finally, the perfect "
                "one fits perfectly.”"},
    {"id": "puzzle", "title": "Try to solve the puzzle", "layer": 7, "neuron": 83, "kind": "concept",
     "prompt": P_BUNNY, "dose_mult": 1.0,
     "summary": "Effort and struggle: climbing, trying, a maze, a puzzle that cannot be solved all at once."},
    {"id": "bench", "title": "Someone on a bench", "layer": 3, "neuron": 671, "kind": "concept",
     "prompt": P_BALL, "dose_mult": 0.5,
     "summary": "Sits a new character down, usually a little girl on a bench, so the hero can walk over and talk. A scene "
                "setter, not an object."},
    {"id": "open-door", "title": "What's inside?", "layer": 0, "neuron": 778, "kind": "concept",
     "prompt": P_STORE, "dose_mult": 0.5,
     "summary": "Doors, boxes and the urge to look inside: “Mommy, what's in the box?” … “Let's see what's inside.”"},
    {"id": "give-take", "title": "Give and take", "layer": 7, "neuron": 454, "kind": "concept",
     "prompt": P_BALL, "dose_mult": 1.0,
     "summary": "Objects change hands: taking apples, giving them to the squirrel, taking them back. At 1.5× the window it "
                "collapses into “take take take”."},
    {"id": "ice-cream", "title": "Cold, and made of ice cream", "layer": 2, "neuron": 165, "kind": "concept",
     "prompt": P_BALL, "dose_mult": 1.0,
     "summary": "Everything turns cold and into ice cream. Pushed down it writes slowness instead: a slow turtle, a slow mommy."},
    {"id": "looking-for-help", "title": "Looking for help", "layer": 3, "neuron": 902, "kind": "reads-writes",
     "prompt": P_STORE, "dose_mult": 0.5,
     "summary": "One of only two neurons above the null whose theme words overlap the tokens it fires on most. Pushed, it "
                "brings in someone who is looking for something: “I'm looking for a new friend to help me.”"},
    {"id": "random-villain", "title": "A random direction writes a villain too", "layer": 5, "neuron": 173, "kind": "control",
     "prompt": P_BUNNY, "dose_mult": 1.0,
     "summary": "Not a neuron. A random direction in layer 5, pushed by the same amount, writes a juicy apple and then “a big, "
                "mean wolf came”. It scores higher than every neuron in layer 5, which is why a story can never be "
                "evidence on its own."},
]

NOTES: list[dict] = [
    {"title": "Counting words is not evidence",
     "body": "If a theme means “a content word that turns up in at least five of the rollouts, counted once per rollout”, 1,606 of 2,048 random "
             "directions (78%) have one, and so do 75% of neurons. Pushed text repeats itself whatever the direction. Only "
             "a score against random directions in the same layer separates neurons from noise."},
    {"title": "Distinctive neurons are rare, and one sweep cannot find them",
     "body": "41 of 8,192 neurons (0.5%) beat all 256 random directions in their layer: 12 in layer 0, 5, 4, 6, 2, none in "
             "layer 5, 8 in layer 6 and 4 in layer 7. If neurons behaved like random directions, 1 in 257 would do that by "
             "chance, about 32 in all and 4 per layer, so only layer 0 stands out. In layer 5 a random direction (a juicy "
             "apple, then a wolf) outscores every neuron. The replication study is what separates real neurons from lucky "
             "ones: on 12 new prompts, 21 of the 41 still beat 95% of fresh random directions, where chance gives about 2."},
    {"title": "In a story model, neurons steer plot beats",
     "body": "The strongest neurons write narrative moves rather than topics: a threat followed by flight (L4·N803), "
             "misfortune (L7·N756), regret and a moral (L2·N109), resolution (L6·N1007), a startle (L0·N80, L4·N877). "
             "neuron-explorer's Qwen finds are identities, concepts and styles. Here the vocabulary is tiny, and what is left "
             "to steer is story structure. This is a reading of the rollouts, not a measured category, and of these neurons only "
             "L2·N109 and L6·N1007 replicate on new prompts at the 95% bar."},
    {"title": "The same beat, written twice",
     "body": "L0·N80 and L4·N877 both write “Suddenly, he heard a loud noise”, four layers apart, and L4·N803, L6·N179 and "
             "L7·N920 all bring in a scary animal. The model has several entry points into the same scene."},
    {"title": "The fragile layers are in the middle",
     "body": "Text stays coherent under random pushes of 0.8× the residual norm at layers 0, 2 and 7, but only 0.4× at "
             "layers 4 and 5. The window has to be calibrated per layer. A single global strength would wreck the middle "
             "or under-push the ends."},
    {"title": "Output similarity does not mean firing together",
     "body": "neuron-explorer left untested whether neurons that write similar directions also fire on the same tokens. "
             "They barely do here. Neighbours in the writes layout correlate little more than random pairs (0.006–0.055 against "
             "0.004–0.052 across layers; layer 3: 0.010 vs 0.010). Neighbours in the co-firing layout correlate at 0.06–0.12, "
             "several times higher. The map offers both."},
    {"title": "The logit lens misleads before the last layer",
     "body": "The logit lens's top-12 common tokens overlap with the common tokens left in the top-12 measured change in "
             "log-probability (Jaccard, after dropping rare tokens the lens cannot rank) by under 6% in layers 0–6, and by 36% in layer 7. Below the top layer, what a neuron's output does to the next token "
             "depends on the layers after it."},
    {"title": "What a neuron writes is rarely what it reads",
     "body": "Only 2 of the 41 above-null neurons have theme words that match the tokens they fire on most, and 3.6% of "
             "all neurons. Top contexts and steering describe two different sides of a neuron: its input and its effect."},
]

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
