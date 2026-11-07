# Do the TinyStories neurons survive new prompts?

_21 of 41 above-null neurons still beat 95% of fresh random directions on 12 unseen prompts, greedy and sampled, where chance would give about 2. The sweep count of 41 alone is within what chance gives._

The sweep found 41 of 8,192 neurons whose pushes beat every one of 256 random directions in their layer, on three story prompts. The obvious objection: three prompts and greedy decoding can be lucky. It is more than an objection. If neurons behaved exactly like random directions, a neuron would beat all 256 controls in its layer with probability 1 in 257, so about 32 of 8,192 would do it by chance, and a sweep-wide count anywhere from about 12 to 60 would be unremarkable (the 1,024 neurons of a layer all face the same strongest control, so the counts swing widely). 41 is within that range (a count this high or higher turns up by chance about 1 time in 4). The sweep alone cannot tell real neurons from lucky ones; a fresh test can. This study re-runs each of those neurons on prompts it has never seen, greedy and sampled, against fresh random directions.

### Setup

- 12 new story openings, greedy decoding, plus 3 of them with nucleus sampling (top-p 0.9) under 5 seeds: 27 rollouts per neuron.
- 64 new random directions per layer, drawn from a different seed than the sweep's controls.
- The same theme score as the sweep: the top five Poisson *z*-scores of words a push writes more often than the controls do.

### Result

| Measure | Neurons | Share |
|---|---|---|
| Still beat every fresh random direction | 10 | 24% |
| Still beat 95% of them | 21 | 51% |
| Original theme words appear more often than in 95% of random pushes | 39 | 95% |

_41 neurons that were above null in the original sweep._

Chance would give about 0.6 neurons beating every fresh random direction and about 2 beating 95% of them. 10 and 21 do. This, not the sweep count, is the evidence that the above-null list holds real neurons: about half of it replicates. The rest was either luck on the sweep prompts or a weaker effect than this bar can confirm.

| Neuron | Sweep themes | Beats fresh controls | Theme rate | Random rate | Themes on new prompts |
|---|---|---|---|---|---|
| [L0·N487](https://exios66.github.io/LLM_Viz/#/atlas/L0/N487) | feeling, weak, troubled | 100% | 0.93 | 0.07 | feeling, troubled, weak |
| [L0·N966](https://exios66.github.io/LLM_Viz/#/atlas/L0/N966) | different, kinds, games | 100% | 0.89 | 0.07 | different, many, together |
| [L2·N109](https://exios66.github.io/LLM_Viz/#/atlas/L2/N109) | felt, wished, sad | 100% | 0.96 | 0.09 | sad, wished, felt |
| [L2·N113](https://exios66.github.io/LLM_Viz/#/atlas/L2/N113) | away, ran, shouted | 100% | 1.00 | 0.08 | shouted, noise, away |
| [L2·N165](https://exios66.github.io/LLM_Viz/#/atlas/L2/N165) | cream, ice, cold | 100% | 0.78 | 0.05 | cold, cream, ice |
| [L3·N264](https://exios66.github.io/LLM_Viz/#/atlas/L3/N264) | green, light, picked | 100% | 1.00 | 0.04 | green, light, soft |
| [L3·N671](https://exios66.github.io/LLM_Viz/#/atlas/L3/N671) | bench, sitting, looked | 100% | 0.81 | 0.13 | sat, down, looked |
| [L3·N848](https://exios66.github.io/LLM_Viz/#/atlas/L3/N848) | shirt, look, green | 100% | 0.85 | 0.14 | green, hat, shirt |
| [L6·N252](https://exios66.github.io/LLM_Viz/#/atlas/L6/N252) | wet, puddle, again | 100% | 0.93 | 0.08 | again, suddenly, puddle |
| [L6·N1007](https://exios66.github.io/LLM_Viz/#/atlas/L6/N1007) | perfect, fit, finally | 100% | 1.00 | 0.02 | finally, perfect, fit |
| [L0·N118](https://exios66.github.io/LLM_Viz/#/atlas/L0/N118) | small, cream, ice | 98% | 0.44 | 0.15 | sound, hear, small |
| [L0·N615](https://exios66.github.io/LLM_Viz/#/atlas/L0/N615) | different, tried, try | 98% | 0.70 | 0.06 | try, different, again |
| [L1·N249](https://exios66.github.io/LLM_Viz/#/atlas/L1/N249) | new, dependable, found | 98% | 0.67 | 0.17 | able, perfect, dependable |
| [L2·N296](https://exios66.github.io/LLM_Viz/#/atlas/L2/N296) | pick, wet, picked | 98% | 0.81 | 0.03 | wet, pick, drops |

_Theme rate: share of rollouts containing at least one of the neuron's sweep theme words._

Neurons that fail here were most likely tuned to the sweep prompts, or lucky on them. Those that pass write their theme into stories they were never selected on, which is what a neuron-level claim needs.

Some neurons on the Findings page do not replicate at this bar: [L0·N80](https://exios66.github.io/LLM_Viz/#/atlas/L0/N80) (noise, heard, loud) beats 62% of fresh controls, [L3·N902](https://exios66.github.io/LLM_Viz/#/atlas/L3/N902) (cat, looking, help) beats 73% of fresh controls, [L4·N803](https://exios66.github.io/LLM_Viz/#/atlas/L4/N803) (away, ran, hid) beats 88% of fresh controls, [L6·N967](https://exios66.github.io/LLM_Viz/#/atlas/L6/N967) (boy, bit, sad) beats 91% of fresh controls. Their sweep rollouts are real, but they are weaker evidence than the neurons that pass.

### How push size matters

| Neuron | Theme | Theme rate at 1 window (random) | Best margin over random at | Text breaks at |
|---|---|---|---|---|
| [L4·N803](https://exios66.github.io/LLM_Viz/#/atlas/L4/N803) | away, ran, hid | 0.83 vs 0.09 | 1.0× | 2.0× |
| [L0·N80](https://exios66.github.io/LLM_Viz/#/atlas/L0/N80) | noise, heard, loud | 0.50 vs 0.14 | 0.75× | beyond 2.5× |
| [L6·N179](https://exios66.github.io/LLM_Viz/#/atlas/L6/N179) | scared, spider, back | 0.83 vs 0.06 | 1.25× | 2.0× |
| [L3·N671](https://exios66.github.io/LLM_Viz/#/atlas/L3/N671) | bench, sitting, looked | 0.92 vs 0.06 | 1.25× | 2.5× |
| [L0·N778](https://exios66.github.io/LLM_Viz/#/atlas/L0/N778) | opened, door, inside | 0.58 vs 0.09 | 2.0× | 1.5× |
| [L7·N260](https://exios66.github.io/LLM_Viz/#/atlas/L7/N260) | great, idea, game | 0.75 vs 0.17 | 0.75× | 1.25× |
| [L7·N454](https://exios66.github.io/LLM_Viz/#/atlas/L7/N454) | took, take, apples | 0.83 vs 0.06 | 1.5× | 1.5× |
| [L1·N328](https://exios66.github.io/LLM_Viz/#/atlas/L1/N328) | max, strong, careful | 0.42 vs 0.16 | 1.5× | 2.5× |

_Push sizes are multiples of the layer's coherent window. Text breaks when distinct-4 coherence falls below 0.6._

The margin over random peaks between 0.75× and 2× the window, and within a quarter-window of 1× for 5 of 8 neurons. Past the peak, bigger pushes make every direction, random or not, repeat itself. For 2 of them the best margin sits at or past the point where the text breaks, so that margin is measured on degraded text. Each point is 12 rollouts, so differences of one or two rollouts are noise.

_Generated by `pipeline/reports.py` from the recorded data. Do not edit by hand._
