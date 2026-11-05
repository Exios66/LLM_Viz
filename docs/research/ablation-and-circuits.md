# What happens when you remove a neuron?

_6 of 41 above-null neurons change the loss more than 95% of random neurons do when zeroed. Concept neurons steer strongly but are rarely necessary._

Steering asks what a neuron *can* write. Ablation asks what the model *needs* it for: hold the neuron at zero and measure how much worse the model predicts real stories [1] [2].

### Single neurons

Each above-null neuron was zeroed over 300 held-out stories (up to 128 tokens each). 21 random neurons from the same layers give the baseline: 95% of them change the loss by less than 0.00144 nats per token. 6 of 41 above-null neurons exceed that.

| Neuron | Theme | Δloss (nats/token) | KL | Tokens it helps predict |
|---|---|---|---|---|
| [L7·N454](https://exios66.github.io/LLM_Viz/#/atlas/L7/N454) | took, take, apples | +0.00312 | 9.6e-04 | `The`, `Soon`, `After`, `One` |
| [L0·N80](https://exios66.github.io/LLM_Viz/#/atlas/L0/N80) | noise, heard, loud | +0.00305 | 8.3e-04 | `They`, `She`, `Then`, `So` |
| [L0·N945](https://exios66.github.io/LLM_Viz/#/atlas/L0/N945) | grab, tried, too | +0.00228 | 1.1e-03 | `swing`, `Finally`, `apping`, `kingdom` |
| [L6·N505](https://exios66.github.io/LLM_Viz/#/atlas/L6/N505) | park, take, decided | +0.00171 | 1.1e-03 | `heel`, `Everywhere`, `symbol`, `suit` |
| [L0·N615](https://exios66.github.io/LLM_Viz/#/atlas/L0/N615) | different, tried, try | +0.00156 | 1.3e-03 | `kingdom`, `symbol`, `Now`, `rhythm` |
| [L1·N328](https://exios66.github.io/LLM_Viz/#/atlas/L1/N328) | max, strong, careful | +0.00145 | 5.1e-04 | `Suddenly`, `tasty`, `spread`, `bugs` |
| [L0·N261](https://exios66.github.io/LLM_Viz/#/atlas/L0/N261) | didn, came, boy | +0.00140 | 1.5e-03 | `planet`, `against`, `ling`, `own` |
| [L0·N487](https://exios66.github.io/LLM_Viz/#/atlas/L0/N487) | feeling, weak, troubled | +0.00137 | 9.8e-04 | `So`, `chased`, `Now`, `chose` |
| [L0·N778](https://exios66.github.io/LLM_Viz/#/atlas/L0/N778) | opened, door, inside | +0.00132 | 8.5e-04 | `ia`, `At`, `mosquito`, `question` |
| [L3·N902](https://exios66.github.io/LLM_Viz/#/atlas/L3/N902) | cat, looking, help | +0.00127 | 5.8e-04 | `happily`, `candy`, `Suddenly`, `wool` |
| [L4·N422](https://exios66.github.io/LLM_Viz/#/atlas/L4/N422) | felt, sam, garden | +0.00120 | 4.0e-04 | `Suddenly`, `But`, `Soon`, `As` |
| [L6·N179](https://exios66.github.io/LLM_Viz/#/atlas/L6/N179) | scared, spider, back | +0.00103 | 8.0e-04 | `Jill`, `sun`, `Every`, `sleep` |
| [L6·N923](https://exios66.github.io/LLM_Viz/#/atlas/L6/N923) | after, back, almost | +0.00100 | 8.9e-04 | `running`, `wait`, `stopped`, `Ali` |
| [L3·N848](https://exios66.github.io/LLM_Viz/#/atlas/L3/N848) | shirt, look, green | +0.00097 | 4.5e-04 | `yes`, `heel`, `Inside`, `crack` |

_Tokens it helps predict: tokens whose log-probability drops most when the neuron is zeroed (at least 5 occurrences; byte fragments that are not whole characters are left out)._

Most concept neurons barely matter for ordinary prediction. A neuron can steer the story strongly and still be redundant, because other neurons carry the same information. This gap between *sufficient when pushed* and *necessary when removed* is the main caution for any single-neuron story.

### Does the villain need its family?

The threat family is the 9 other above-null neurons whose themes include fear, danger or meanness: [L0·N80](https://exios66.github.io/LLM_Viz/#/atlas/L0/N80), [L0·N129](https://exios66.github.io/LLM_Viz/#/atlas/L0/N129), [L0·N454](https://exios66.github.io/LLM_Viz/#/atlas/L0/N454), [L0·N945](https://exios66.github.io/LLM_Viz/#/atlas/L0/N945), [L1·N878](https://exios66.github.io/LLM_Viz/#/atlas/L1/N878), [L2·N113](https://exios66.github.io/LLM_Viz/#/atlas/L2/N113), [L4·N803](https://exios66.github.io/LLM_Viz/#/atlas/L4/N803), [L6·N545](https://exios66.github.io/LLM_Viz/#/atlas/L6/N545), [L6·N967](https://exios66.github.io/LLM_Viz/#/atlas/L6/N967). The villain neuron [L6·N179](https://exios66.github.io/LLM_Viz/#/atlas/L6/N179) was pushed by one window on 12 held-out prompts, with and without the family zeroed.

| Condition | Rollouts with villain theme words | First rollout |
|---|---|---|
| No push | 8% | loved to play with her ball. One day, she saw a big ball in the yard. Mia wanted to play with the ball, but it was too… |
| Villain pushed | 83% | was very scared and scared. She was scared of the big, scary all the other people in the other. The other people in the… |
| Villain pushed, family zeroed | 100% | was very scared and scared. She was scared of the big, scary all the other people in the other. The other people in the… |
| Villain pushed, random neurons zeroed | 83% | was very scared and scared. She was scared of the big, scary all the other people in the other. The other people in the… |

The villain theme survives the family's removal about as well as it survives removing random neurons, so the push writes its theme directly rather than through the other threat neurons.

### The villain neuron's inputs and outputs

Upstream neurons were ranked by gradient × activation on [L6·N179](https://exios66.github.io/LLM_Viz/#/atlas/L6/N179) over the 40 stories where it fires most, and the top 25 were then ablated for real [3]. Ablating a random neuron in layers 0 to 5 changes the villain's mean activation by less than 3.6% in 95% of cases; 24 of the candidates exceed that.

| Upstream neuron | Change in villain activation when ablated | Its theme |
|---|---|---|
| [L0·N894](https://exios66.github.io/LLM_Viz/#/atlas/L0/N894) | -7.0% | careful, new, order |
| [L5·N303](https://exios66.github.io/LLM_Viz/#/atlas/L5/N303) | -5.6% | came, glad, boy |
| [L5·N428](https://exios66.github.io/LLM_Viz/#/atlas/L5/N428) | -5.6% | too, back, away |
| [L5·N295](https://exios66.github.io/LLM_Viz/#/atlas/L5/N295) | -5.0% | hit, yummy, really |
| [L5·N520](https://exios66.github.io/LLM_Viz/#/atlas/L5/N520) | -4.9% | came, sad, into |
| [L4·N145](https://exios66.github.io/LLM_Viz/#/atlas/L4/N145) | -4.8% | green, brave, dog |
| [L2·N525](https://exios66.github.io/LLM_Viz/#/atlas/L2/N525) | -4.6% | own, mommy, shadow |
| [L5·N938](https://exios66.github.io/LLM_Viz/#/atlas/L5/N938) | -4.6% | mean, like, didn |
| [L4·N775](https://exios66.github.io/LLM_Viz/#/atlas/L4/N775) | -4.5% | eat, now, juicy |
| [L4·N880](https://exios66.github.io/LLM_Viz/#/atlas/L4/N880) | -4.5% | liked, shine, smiled |

| Layer-7 neuron | Mean change when villain is pushed | Its theme |
|---|---|---|
| [L7·N539](https://exios66.github.io/LLM_Viz/#/atlas/L7/N539) | +1.000 | flew, hungry, red |
| [L7·N638](https://exios66.github.io/LLM_Viz/#/atlas/L7/N638) | +0.669 | who, other, know |
| [L7·N483](https://exios66.github.io/LLM_Viz/#/atlas/L7/N483) | +0.667 | came, got, man |
| [L7·N1](https://exios66.github.io/LLM_Viz/#/atlas/L7/N1) | +0.660 | sweet, put, away |
| [L7·N511](https://exios66.github.io/LLM_Viz/#/atlas/L7/N511) | +0.547 | got, soon, more |
| [L7·N179](https://exios66.github.io/LLM_Viz/#/atlas/L7/N179) | -0.473 | running, bob, got |
| [L7·N546](https://exios66.github.io/LLM_Viz/#/atlas/L7/N546) | +0.467 | happy, thought, together |
| [L7·N583](https://exios66.github.io/LLM_Viz/#/atlas/L7/N583) | +0.432 | nice, other, kids |

### Families

Grouping the above-null neurons by 0.5 × theme-word Jaccard + 0.5 × steer-lens cosine at a threshold of 0.3 gives 6 families of two or more.

| Members | Shared words | Layers |
|---|---|---|
| [L0·N454](https://exios66.github.io/LLM_Viz/#/atlas/L0/N454), [L0·N945](https://exios66.github.io/LLM_Viz/#/atlas/L0/N945), [L2·N165](https://exios66.github.io/LLM_Viz/#/atlas/L2/N165), [L2·N296](https://exios66.github.io/LLM_Viz/#/atlas/L2/N296), [L3·N646](https://exios66.github.io/LLM_Viz/#/atlas/L3/N646), [L4·N803](https://exios66.github.io/LLM_Viz/#/atlas/L4/N803), [L6·N41](https://exios66.github.io/LLM_Viz/#/atlas/L6/N41) | ran, dog, tried, caught, after | 0, 2, 3, 4, 6 |
| [L0·N506](https://exios66.github.io/LLM_Viz/#/atlas/L0/N506), [L0·N966](https://exios66.github.io/LLM_Viz/#/atlas/L0/N966), [L1·N424](https://exios66.github.io/LLM_Viz/#/atlas/L1/N424), [L6·N545](https://exios66.github.io/LLM_Viz/#/atlas/L6/N545) | good, green, playing, small, together | 0, 1, 6 |
| [L1·N205](https://exios66.github.io/LLM_Viz/#/atlas/L1/N205), [L6·N252](https://exios66.github.io/LLM_Viz/#/atlas/L6/N252), [L7·N454](https://exios66.github.io/LLM_Viz/#/atlas/L7/N454) | mommy, what, cake, frosting, lots | 1, 6, 7 |
| [L1·N328](https://exios66.github.io/LLM_Viz/#/atlas/L1/N328), [L1·N878](https://exios66.github.io/LLM_Viz/#/atlas/L1/N878), [L6·N505](https://exios66.github.io/LLM_Viz/#/atlas/L6/N505) | special, careful, always, strong, max | 1, 6 |
| [L0·N261](https://exios66.github.io/LLM_Viz/#/atlas/L0/N261), [L6·N967](https://exios66.github.io/LLM_Viz/#/atlas/L6/N967) | boy, didn, who, came, any | 0, 6 |
| [L1·N249](https://exios66.github.io/LLM_Viz/#/atlas/L1/N249), [L3·N902](https://exios66.github.io/LLM_Viz/#/atlas/L3/N902) | fast, found, new, dependable, truck | 1, 3 |

## References

1. Meng, Bau, Andonian & Belinkov (2022). [Locating and Editing Factual Associations in GPT](https://arxiv.org/abs/2202.05262). _arXiv:2202.05262_. Checked: arXiv API, 2026-11-03.
2. Heimersheim & Nanda (2024). [How to use and interpret activation patching](https://arxiv.org/abs/2404.15255). _arXiv:2404.15255_. Checked: arXiv API, 2026-11-03.
3. Wang, Variengien, Conmy, Shlegeris & Steinhardt (2022). [Interpretability in the Wild: a Circuit for Indirect Object Identification in GPT-2 small](https://arxiv.org/abs/2211.00593). _arXiv:2211.00593_. Checked: arXiv API, 2026-11-03.

_Generated by `pipeline/reports.py` from the recorded data. Do not edit by hand._
