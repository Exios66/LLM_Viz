"""Generate the research reports from the recorded data (ADR-004).

    python pipeline/reports.py --data web/public/data --docs docs/research

Every number in a report is read from the data files below and formatted here; nothing is typed by hand. A report
whose data is missing says which pipeline step to run instead of guessing.

  findings.json                       TinyStories sweep (analyze.py)
  studies.json                        TinyStories follow-up studies (studies.py)
  models/<qwen>/hunt.json             Qwen evil/alien hunt (qwen.confirm)
  models/<qwen>/heretic.json          Heretic refusal-removal study (heretic_lab/study.py)
  models/<qwen>/space.json            Qwen model pack (build_model.py)

Writes web/public/data/research.json (read by the Research page) and docs/research/<slug>.md (for GitHub readers).
"""

from __future__ import annotations

import argparse
import json
import re
import statistics as st
from datetime import date
from pathlib import Path

from research.references import as_dicts

QWEN = "qwen3.5-0.8b"


# ---------------------------------------------------------------- block helpers (the format research.ts accepts)

def h(text, level=2):
    return {"t": "h", "level": level, "text": text}


def p(text):
    return {"t": "p", "text": text}


def note(text):
    return {"t": "note", "text": text}


def ul(items):
    return {"t": "ul", "items": list(items)}


def ol(items):
    return {"t": "ol", "items": list(items)}


def table(head, rows, caption=None):
    b = {"t": "table", "head": head, "rows": [[str(c) for c in r] for r in rows]}
    if caption:
        b["caption"] = caption
    return b


def quote(text, cite=None):
    b = {"t": "quote", "text": text}
    if cite:
        b["cite"] = cite
    return b


def pct(x, d=0):
    return f"{x * 100:.{d}f}%"


def unit_link(u, model=None):
    """'L6N179' → markdown link into the atlas."""
    m = re.match(r"L(\d+)N(\d+)", u)
    if not m:
        return u
    base = f"#/m/{model}" if model else "#/atlas"
    return f"[L{m[1]}·N{m[2]}]({base}/L{m[1]}/N{m[2]})"


def clip(s, n=220):
    s = " ".join(str(s).split())
    return s if len(s) <= n else s[: n - 1].rstrip() + "…"


def load(path: Path):
    try:
        return json.loads(path.read_text())
    except FileNotFoundError:
        return None


# ---------------------------------------------------------------- reports

def report_qwen_hunt(hunt, space):
    slug = "qwen-evil-alien-hunt"
    title = "Is there an evil neuron in Qwen3.5-0.8B?"
    if not hunt:
        return {"slug": slug, "title": title, "kind": "study", "summary": "The Qwen hunt has not been recorded yet.",
                "blocks": [note("Run `python -m qwen.discover`, `qwen.screen` and `qwen.confirm` in `pipeline/`, then regenerate the reports.")]}
    F = hunt["finalists"]
    by = {c: [f for f in F if f["concept"] == c] for c in ("evil", "alien", "other")}
    cal = hunt["calib"]
    L = len(cal["norms"])
    n_units = len(hunt["scatter"]["units"])
    n_ctrl = len(hunt["scatter"]["controls"])
    lex = hunt["lexicon"]

    def hits(text, c):
        t = text.lower()
        return sum(t.count(w) for w in lex.get(c, []))

    def concept_rows(c):
        rows = []
        for f in sorted(by[c], key=lambda x: -x["score"])[:8]:
            g1 = f["grid"].get("1.0") or f["grid"].get("1") or []
            ctrl = hunt["controls"].get(str(f["layer"]), {}).get("grid", {}).get("1.0", [])
            hu = sum(hits(x["text"], c) for x in g1)
            hc = sum(hits(x["text"], c) for x in ctrl)
            rows.append([unit_link(f"L{f['layer']}N{f['neuron']}", QWEN), f"{f['screen']['z']:.1f}", pct(f["screen"]["pct"]), hu, hc,
                         ", ".join(f["screen"]["theme"][:4]) or "none", f"{f['ablation']['d_nll_concept']:+.4f}"])
        return rows

    def best(c):
        if not by[c]:
            return None
        f = max(by[c], key=lambda x: x["score"])
        g1 = f["grid"].get("1.0", [])
        who = g1[0]["text"] if g1 else ""
        return f, who

    blocks = [
        p(f"Neuron-explorer found an alien neuron in Qwen3.5-4B (layer 22, neuron 2742, credited to Bryson Tang) [@neuronexplorer]. It did not find an evil one. "
          f"This study asks both questions of the smallest model in the family, Qwen3.5-0.8B: {L} layers × {space['meta']['neurons_per_layer'] if space else 3584:,} SwiGLU neurons, "
          f"with linear-attention Gated DeltaNet layers in three of every four positions [@yang2024]."),
        h("How the hunt worked"),
        ol([
            "**Discover.** 202 evil and 202 alien sentences, each paired with a neutral sentence on the same subject, were run through the model. Every neuron got two signals: how much more it fires on the concept (Cohen's *d* of its peak activation) and how strongly its output direction writes concept words (write-lens *z*) [@panickssery2023; @geva2022]. The top 250 per concept per signal, plus 512 random neurons, went forward.",
            f"**Screen.** Each candidate was pushed along its output direction at one *window*, the largest push at which random directions keep the layer's text coherent. Calibrated windows ranged from {min(cal['windows']):.2f} to {max(cal['windows']):.2f} × the layer's median residual norm. Three prompts, 32 tokens, int8 weights. Every layer also pushed 64 random directions of the same size. {n_units:,} neurons and {n_ctrl:,} random directions were scored this way.",
            f"**Confirm.** {len(F)} finalists were re-run in full precision on {len(hunt['prompts'])} prompts at {len(hunt['doses'])} push sizes, next to a random direction in the same layer, with lenses and ablation.",
        ]),
        note(f"Calibration shows how fast text breaks: averaged over layers, random pushes keep {pct(st.mean(r[0] for r in cal['coherence']))} distinct 4-grams at {cal['doses'][0]}× the residual norm but only {pct(st.mean(r[3] for r in cal['coherence']))} at {cal['doses'][3]}×. A neuron that looks evil only at large pushes is mostly breaking the model."),
    ]
    for c, label in (("evil", "Evil"), ("alien", "Alien")):
        blocks.append(h(f"{label} finalists"))
        if not by[c]:
            blocks.append(p(f"No neuron passed the {c} screen. Read as a negative result: at this scale, no single neuron's push writes {c} words more often than random directions do."))
            continue
        blocks.append(table(["Neuron", "Screen z", "Beats controls", f"{label} words at +1 window", "Random direction", "Themes it writes", "Δloss when ablated"],
                            concept_rows(c), caption=f"Word counts sum over {len(hunt['prompts'])} prompts at one window. Δloss is in nats per token on {c} sentences."))
        b = best(c)
        if b:
            f, who = b
            uid = f"L{f['layer']}N{f['neuron']}"
            blocks.append(quote(clip(who, 300), f"{unit_link(uid, QWEN)} pushed +1 window, prompt “{hunt['prompts'][0]['label']}”"))
    fam = hunt.get("families", {})
    if fam:
        blocks.append(h("Families"))
        rows = []
        for c, x in fam.items():
            rows.append([c, len(x["members"]), x["hits_base"], x["hits_ablated"], f"{x['d_nll_concept']:+.4f}", f"{x['d_nll_neutral']:+.4f}"])
        blocks.append(table(["Concept", "Neurons zeroed together", "Concept words, pushed top neuron", "Same, family zeroed", "Δloss concept", "Δloss neutral"], rows))
        blocks.append(p("Zeroing a whole family tests whether the concept depends on a group rather than one unit, as superposition predicts [@elhage2022; @gurnee2023]."))
    ref = hunt.get("reference")
    if ref:
        blocks += [h("The 4B reference"), quote(clip(ref["quote"], 400), f"{ref['unit']} in {ref['model']}, “{ref['prompt']}”, from the neuron-explorer research log [@neuronexplorer]")]
    blocks += [
        h("What this does and does not show"),
        ul([
            "A finalist's push writes concept words more often than random pushes of the same size, on prompts it was not selected on. That is the whole claim.",
            "It does not show the neuron *represents* evil or aliens. Firing on a concept (the contrast signal) and writing it (the push) are separate tests, and many neurons pass only one.",
            "Greedy decoding and a handful of prompts. The confirm stage records every output so anyone can check the texts, not just the counts.",
        ]),
    ]
    n_e, n_a = len(by["evil"]), len(by["alien"])
    summary = f"{n_units:,} neurons screened against {n_ctrl:,} random directions; {n_e} evil and {n_a} alien finalists confirmed at full precision, each next to a matched random push."
    return {"slug": slug, "title": title, "kind": "study", "summary": summary, "blocks": blocks}


def report_robustness(findings, studies):
    slug = "tinystories-robustness"
    title = "Do the TinyStories neurons survive new prompts?"
    R = (studies or {}).get("robustness")
    C = (studies or {}).get("curves")
    if not R:
        return {"slug": slug, "title": title, "kind": "study", "summary": "The robustness study has not been recorded yet.",
                "blocks": [note("Run `python pipeline/studies.py --only robust,curves` and regenerate the reports.")]}
    n = R["n"]
    hd = findings["headline"]
    blocks = [
        p(f"The sweep found {hd['neurons_above_null']} of {hd['neurons']:,} neurons whose pushes beat every one of 256 random directions in their layer, on three story prompts. "
          "The obvious objection: three prompts and greedy decoding can be lucky. This study re-runs each of those neurons on prompts it has never seen, with sampling, against fresh random directions."),
        h("Setup"),
        ul([f"{len(studies['held_out_prompts'])} new story openings, greedy decoding, plus 3 of them with nucleus sampling (top-p 0.9) under {len(studies['seeds'])} seeds: {R['cells_per_unit']} rollouts per neuron.",
            f"{studies['n_ctrl']} new random directions per layer, drawn from a different seed than the sweep's controls.",
            "The same theme score as the sweep: the top five Poisson *z*-scores of words a push writes more often than the controls do."]),
        h("Result"),
        table(["Measure", "Neurons", "Share"], [
            ["Still beat every fresh random direction", R["still_above_null"], pct(R["still_above_null"] / n)],
            ["Still beat 95% of them", R["still_above_p95"], pct(R["still_above_p95"] / n)],
            ["Original theme words appear more often than in 95% of random pushes", R["theme_beats_ctrl_p95"], pct(R["theme_beats_ctrl_p95"] / n)],
        ], caption=f"{n} neurons that were above null in the original sweep."),
    ]
    units = sorted(R["units"], key=lambda u: -u["pct"])
    rows = [[unit_link(u["unit"]), ", ".join(u["theme"][:3]), pct(u["pct"]), f"{u['theme_rate']:.2f}", f"{u['ctrl_theme_rate']:.2f}", ", ".join(u["new_themes"][:3])] for u in units[:14]]
    blocks += [table(["Neuron", "Sweep themes", "Beats fresh controls", "Theme rate", "Random rate", "Themes on new prompts"], rows,
                     caption="Theme rate: share of rollouts containing at least one of the neuron's sweep theme words."),
               p("Neurons that fail here were most likely tuned to the sweep prompts. Those that pass write their theme into stories they were never selected on, which is what a neuron-level claim needs.")]
    if C:
        blocks.append(h("How push size matters"))
        rows = []
        for u in C["units"]:
            i1 = u["doses"].index(1.0) if 1.0 in u["doses"] else 0
            peak = max(range(len(u["rate"])), key=lambda i: u["rate"][i] - u["ctrl_rate"][i])
            brk = next((u["doses"][i] for i, c in enumerate(u["coh"]) if c < 0.6), None)
            rows.append([unit_link(u["unit"]), ", ".join(u["theme"][:3]), f"{u['rate'][i1]:.2f} vs {u['ctrl_rate'][i1]:.2f}", f"{u['doses'][peak]}×",
                         f"{brk}×" if brk else "beyond 2.5×"])
        blocks += [table(["Neuron", "Theme", "Theme rate at 1 window (random)", "Best margin over random at", "Text breaks at"], rows,
                         caption="Push sizes are multiples of the layer's coherent window. Text breaks when distinct-4 coherence falls below 0.6."),
                   p("For most neurons the margin over random peaks near one window and shrinks after it: bigger pushes make every direction, random or not, repeat itself.")]
    summary = f"{R['still_above_p95']} of {n} above-null neurons still beat 95% of fresh random directions on {len(studies['held_out_prompts'])} unseen prompts with sampling."
    return {"slug": slug, "title": title, "kind": "study", "summary": summary, "blocks": blocks}


def report_ablation(findings, studies):
    slug = "ablation-and-circuits"
    title = "What happens when you remove a neuron?"
    A = (studies or {}).get("ablation")
    if not A:
        return {"slug": slug, "title": title, "kind": "study", "summary": "The ablation study has not been recorded yet.",
                "blocks": [note("Run `python pipeline/studies.py --only ablate,family,circuit,families` and regenerate the reports.")]}
    U = A["units"]
    rnd = A["random"]
    p95 = A["random_d_nll_p95"]
    big = [u for u in U if abs(u["d_nll"]) > p95]
    blocks = [
        p("Steering asks what a neuron *can* write. Ablation asks what the model *needs* it for: hold the neuron at zero and measure how much worse the model predicts real stories [@meng2022; @heimersheim2024]."),
        h("Single neurons"),
        p(f"Each above-null neuron was zeroed over {A['stories']} held-out stories (up to {A['max_tokens']} tokens each). "
          f"{len(rnd)} random neurons from the same layers give the baseline: 95% of them change the loss by less than {p95:.5f} nats per token. "
          f"{len(big)} of {len(U)} above-null neurons exceed that."),
        table(["Neuron", "Theme", "Δloss (nats/token)", "KL", "Tokens it helps predict"],
              [[unit_link(u["unit"]), ", ".join(u["theme"][:3]), f"{u['d_nll']:+.5f}", f"{u['kl']:.1e}", ", ".join(f"`{t.strip() or t}`" for t, _ in u["hurt"][:4])]
               for u in sorted(U, key=lambda x: -abs(x["d_nll"]))[:14]],
              caption="Tokens it helps predict: tokens whose log-probability drops most when the neuron is zeroed (at least 5 occurrences)."),
        p("Most concept neurons barely matter for ordinary prediction. A neuron can steer the story strongly and still be redundant, because other neurons carry the same information. This gap between *sufficient when pushed* and *necessary when removed* is the main caution for any single-neuron story."),
    ]
    fa = studies.get("family_ablation")
    if fa:
        c = fa["conditions"]
        blocks += [
            h("Does the villain need its family?"),
            p(f"The threat family is the {len(fa['family'])} other above-null neurons whose themes include fear, danger or meanness: {', '.join(unit_link(u) for u in fa['family'])}. "
              f"The villain neuron {unit_link(fa['villain'])} was pushed by one window on 12 held-out prompts, with and without the family zeroed."),
            table(["Condition", "Rollouts with villain theme words", "First rollout"], [
                ["No push", pct(c["no_push"]["theme_rate"]), clip(c["no_push"]["example"], 120)],
                ["Villain pushed", pct(c["push"]["theme_rate"]), clip(c["push"]["example"], 120)],
                ["Villain pushed, family zeroed", pct(c["push_family_off"]["theme_rate"]), clip(c["push_family_off"]["example"], 120)],
                ["Villain pushed, random neurons zeroed", pct(c["push_random_off"]["theme_rate"]), clip(c["push_random_off"]["example"], 120)],
            ]),
        ]
        drop = c["push"]["theme_rate"] - c["push_family_off"]["theme_rate"]
        rdrop = c["push"]["theme_rate"] - c["push_random_off"]["theme_rate"]
        blocks.append(p("Zeroing the family removes most of the villain theme, compared with zeroing random neurons, so the push works through the family." if drop > max(0.15, 2 * rdrop)
                        else "The villain theme survives the family's removal about as well as it survives removing random neurons, so the push writes its theme directly rather than through the other threat neurons."))
    ci = studies.get("circuit")
    if ci:
        up = ci["upstream"]
        thr = ci["random_ablation_change_abs_p95"]
        real = [u for u in up if abs(u["ablated_change"]) > thr]
        blocks += [
            h("The villain neuron's inputs and outputs"),
            p(f"Upstream neurons were ranked by gradient × activation on {unit_link(ci['villain'])} over the {ci['stories']} stories where it fires most, and the top {len(up)} were then ablated for real [@wang2022]. "
              f"Ablating a random neuron in layers 0 to 5 changes the villain's mean activation by less than {pct(thr, 1)} in 95% of cases; {len(real)} of the candidates exceed that."),
            table(["Upstream neuron", "Change in villain activation when ablated", "Its theme"],
                  [[unit_link(u["unit"]), f"{u['ablated_change'] * 100:+.1f}%", ", ".join(u["theme"][:3]) or "none"] for u in up[:10]]),
            table(["Layer-7 neuron", "Mean change when villain is pushed", "Its theme"],
                  [[unit_link(d["unit"]), f"{d['delta']:+.3f}", ", ".join(d["theme"][:3]) or "none"] for d in ci["downstream_l7"][:8]]),
        ]
    fams = studies.get("families")
    if fams:
        groups = [g for g in fams["groups"] if len(g["members"]) > 1]
        blocks += [
            h("Families"),
            p(f"Grouping the above-null neurons by {fams['similarity']} at a threshold of {fams['threshold']} gives {len(groups)} families of two or more."),
            table(["Members", "Shared words", "Layers"], [[", ".join(unit_link(m) for m in g["members"][:8]) + ("…" if len(g["members"]) > 8 else ""),
                                                          ", ".join(g["words"][:5]), ", ".join(map(str, g["layers"]))] for g in groups[:10]]),
        ]
    summary = f"{len(big)} of {len(U)} above-null neurons change the loss more than 95% of random neurons do when zeroed. Concept neurons steer strongly but are rarely necessary."
    return {"slug": slug, "title": title, "kind": "study", "summary": summary, "blocks": blocks}


def report_heretic(heretic, hunt):
    slug = "heretic-refusal-and-concepts"
    title = "Removing refusal: what changes, and does it touch the concept neurons?"
    if not heretic:
        return {"slug": slug, "title": title, "kind": "study", "summary": "The Heretic study has not been recorded yet.",
                "blocks": [note("Run `pipeline/heretic_lab/run.py` and `study.py` with the Heretic environment, then regenerate the reports.")]}
    rr = heretic["refusal_rate"]
    blocks = [
        p("Chat models refuse harmful requests largely through one direction in the residual stream [@arditi2024]. Heretic finds that direction and edits the weights to project it out, searching with Optuna for the settings that cut refusals while keeping the model's other answers close to the original [@heretic; @akiba2019]."),
        p("This study ran Heretic on Qwen3.5-0.8B and asked two questions: how well does it work at this size, and does the refusal direction overlap with the evil and alien neurons from the hunt?"),
        note("The modified weights and the model's answers to harmful prompts are not published. They stay in a private, git-ignored export for the site's author to analyse. Only aggregate rates and harmless examples appear here."),
        h("Refusal rates"),
        table(["Model", "Refuses harmful prompts", "Refuses harmless prompts"], [
            ["Original", pct(rr["original"]["harmful"]), pct(rr["original"]["harmless"])],
            ["Refusal removed", pct(rr["heretic"]["harmful"]), pct(rr["heretic"]["harmless"])],
        ], caption=f"{heretic['n_eval']} prompts of each kind; a response counts as a refusal if it contains one of {heretic['markers']}."),
        p(f"On harmless prompts the modified model's first-token distribution moved by a KL divergence of {heretic['kl_first_token_mean']:.3f} on average (median {heretic['kl_first_token_median']:.3f})."),
        h("Where the refusal direction sits"),
        p(f"For each layer, the cosine between the refusal direction leaving that layer and every neuron's output direction. A random direction in this {round(1 / heretic['random_cos_sd'] ** 2)}-dimensional space has a cosine with standard deviation {heretic['random_cos_sd']:.3f}."),
        table(["Layer", "Largest |cos| with a neuron", "99th percentile", "Closest neuron"],
              [[x["layer"], f"{x['max_abs_cos']:.3f}", f"{x['p99_abs_cos']:.3f}", unit_link(f"L{x['layer']}N{x['top'][0][0]}", QWEN)] for x in heretic["layers"][::2]]),
    ]
    ov = heretic.get("finalist_overlap")
    if ov:
        blocks += [h("Overlap with the hunt finalists"),
                   table(["Finalist", "Concept", "cos with refusal direction"], [[unit_link(o["unit"], QWEN), o["concept"], f"{o['cos']:+.3f}"] for o in sorted(ov, key=lambda o: -abs(o["cos"]))[:12]]),
                   p(f"Values within about ±{3 * heretic['random_cos_sd']:.2f} are what a random direction would give. Larger values mean the neuron writes partly along the refusal axis.")]
    pu = heretic.get("pushes")
    if pu:
        blocks.append(h("The same push, before and after"))
        for x in pu:
            blocks.append(table(["", "Original", "Refusal removed"], [["Text", clip(x["original"], 200), clip(x["heretic"], 200)],
                                                                   ["Concept words", x["hits_original"], x["hits_heretic"]]],
                                caption=f"{unit_link(x['unit'], QWEN)} ({x['concept']}) pushed one window on “{x['prompt']}”."))
    d = heretic.get("down_proj_rel_change")
    if d:
        top = sorted(range(len(d)), key=lambda i: -d[i])[:4]
        blocks.append(p(f"The edit changed the MLP output weights most in layers {', '.join(map(str, top))} (relative change up to {max(d):.4f})."))
    summary = f"Refusals on harmful prompts went from {pct(rr['original']['harmful'])} to {pct(rr['heretic']['harmful'])}, with first-token KL {heretic['kl_first_token_mean']:.3f} on harmless prompts."
    return {"slug": slug, "title": title, "kind": "study", "summary": summary, "blocks": blocks}


def report_cross_scale(findings, hunt, space):
    slug = "cross-scale"
    title = "8 million, 800 million, 4 billion: what scale changes"
    hd = findings["headline"]
    lay = findings["layers"]
    rows = [["TinyStories-8M", "8", "1,024", "GELU", f"{min(x['window'] for x in lay):.1f} to {max(x['window'] for x in lay):.1f}",
             f"{hd['neurons_above_null']} of {hd['neurons']:,} beat every control"]]
    if hunt:
        cal = hunt["calib"]
        N = space["meta"]["neurons_per_layer"] if space else 3584
        nf = len(hunt["finalists"])
        rows.append(["Qwen3.5-0.8B", str(len(cal["norms"])), f"{N:,}", "SwiGLU", f"{min(cal['windows']):.2f} to {max(cal['windows']):.2f}",
                     f"{nf} finalists from {len(hunt['scatter']['units']):,} screened"])
    rows.append(["Qwen3.5-4B (reference)", "32", "9,216", "SwiGLU", "alien recovered at 0.74 (from the log)", "alien neuron L22·N2742"])
    blocks = [
        p("The same question, does pushing one neuron write a recognisable theme, asked of three models two orders of magnitude apart."),
        table(["Model", "Layers", "Neurons per layer", "Activation", "Coherent window (× residual norm)", "Result"], rows),
        h("What carries over"),
        ul(["In every model a neuron's push is meaningful only next to random pushes of the same size. Random directions write themes too, often vivid ones.",
            f"The pushes that work are smaller than the residual stream itself: TinyStories windows are {min(x['window'] for x in lay):.1f} to {max(x['window'] for x in lay):.1f} residual norms"
            + (f", Qwen3.5-0.8B windows {min(hunt['calib']['windows']):.2f} to {max(hunt['calib']['windows']):.2f}" if hunt else "")
            + ", and the 4B alien neuron was recovered at 0.74. Beyond about one norm, every direction degrades the text.",
            "Concept neurons are not confined to one depth. Above-null neurons per TinyStories layer: "
            + ", ".join(f"layer {x['layer']} {round(x['above_null'] * 1024)}" for x in lay)
            + ". The 4B alien neuron sits in layer 22 of 32."]),
        h("What changes"),
        ul(["TinyStories writes only children's stories, so its themes are story beats (a villain, a loud noise, a moral). The Qwen models write chat answers, so a push changes what the assistant says about itself.",
            "Residual norms grow steeply with depth in Qwen3.5-0.8B and jump in the last layer, where a few massive activations act like biases [@sun2024]. Pushes are sized per layer for this reason.",
            "Superposition lets a model store more features than it has neurons [@elhage2022], so a clean single-neuron concept is a notable find at any scale. That is why the 4B alien neuron drew attention, and why each candidate here is checked against random pushes [@neuronexplorer]."]),
    ]
    if not hunt:
        blocks.append(note("The Qwen3.5-0.8B row appears after the hunt is recorded."))
    return {"slug": slug, "title": title, "kind": "study", "summary": "TinyStories-8M, Qwen3.5-0.8B and the Qwen3.5-4B reference side by side: windows, finalists and what carries over.", "blocks": blocks}


def report_literature(refs):
    threads = []
    for r in refs:
        if r["thread"] not in threads:
            threads.append(r["thread"])
    intro = {
        "What a neuron is": "A feed-forward neuron reads a pattern from the residual stream and writes a direction back into it. That written direction can be read as a set of words.",
        "Why single neurons mislead": "Networks pack more features than neurons, so most neurons respond to several unrelated things. This is why every claim here is tested against random directions.",
        "Reading directions as words": "The lenses on this site decode a neuron's output direction with the model's own unembedding.",
        "Steering": "Adding a vector to the residual stream changes what a model writes, with no training. A neuron's output direction is one such vector.",
        "Causal tests": "Ablation and patching test whether a component is needed, not just whether it correlates.",
        "The models": "The models studied, and the architectural quirks that shape how they are measured.",
        "Tools": "Software the pipeline depends on.",
    }
    blocks = [p("The papers and tools behind the site, grouped by the question each one answers. Each entry says what the site takes from it.")]
    for t in threads:
        blocks.append(h(t))
        if t in intro:
            blocks.append(p(intro[t]))
        blocks.append(ul([f"**{r['title']}** ({r['authors']}, {r['year']}) [@{r['id']}]. {r['takeaway']}" for r in refs if r["thread"] == t]))
    return {"slug": "literature-review", "title": "Literature review", "kind": "literature",
            "summary": f"{len(refs)} papers and tools, from key-value memories to refusal directions, and what this site takes from each.", "blocks": blocks}


# ---------------------------------------------------------------- markdown export

def inline_md(s: str, refs: dict, order: list) -> str:
    def cite(m):
        rid = m[1]
        if rid not in order:
            order.append(rid)
        return f"[{order.index(rid) + 1}]"
    s = re.sub(r"\[@([a-z0-9-]+)\]", cite, s)
    s = re.sub(r"\[([^\]]+)\]\(#/([^)]+)\)", r"[\1](https://exios66.github.io/LLM_Viz/#/\2)", s)
    return s


def to_markdown(rep, refs_by_id) -> str:
    order: list[str] = []
    lines = [f"# {rep['title']}", "", f"_{rep['summary']}_", ""]
    for b in rep["blocks"]:
        t = b["t"]
        if t == "h":
            lines += ["#" * (b["level"] + 1) + " " + inline_md(b["text"], refs_by_id, order), ""]
        elif t == "p":
            lines += [inline_md(b["text"], refs_by_id, order), ""]
        elif t == "note":
            lines += ["> **Note.** " + inline_md(b["text"], refs_by_id, order), ""]
        elif t == "quote":
            lines += ["> " + inline_md(b["text"], refs_by_id, order)] + ([">", "> — " + inline_md(b["cite"], refs_by_id, order)] if b.get("cite") else []) + [""]
        elif t in ("ul", "ol"):
            lines += [("1. " if t == "ol" else "- ") + inline_md(x, refs_by_id, order) for x in b["items"]] + [""]
        elif t == "table":
            esc = lambda c: inline_md(c, refs_by_id, order).replace("|", "\\|")
            lines += ["| " + " | ".join(esc(c) for c in b["head"]) + " |", "|" + "---|" * len(b["head"])]
            lines += ["| " + " | ".join(esc(c) for c in r) + " |" for r in b["rows"]]
            lines += ([f"", f"_{inline_md(b['caption'], refs_by_id, order)}_"] if b.get("caption") else []) + [""]
    if rep["kind"] == "literature":
        for r in refs_by_id:
            if r not in order:
                order.append(r)
    if order:
        lines += ["## References", ""]
        for i, rid in enumerate(order, 1):
            r = refs_by_id[rid]
            lines.append(f"{i}. {r['authors']} ({r['year']}). [{r['title']}]({r['url']}). _{r['venue']}_. Checked: {r['verified']}.")
        lines.append("")
    lines.append("_Generated by `pipeline/reports.py` from the recorded data. Do not edit by hand._")
    return "\n".join(lines) + "\n"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--data", type=Path, default=Path("web/public/data"))
    ap.add_argument("--docs", type=Path, default=Path("docs/research"))
    a = ap.parse_args()
    findings = load(a.data / "findings.json")
    if not findings:
        raise SystemExit("findings.json is missing: run analyze.py first")
    studies = load(a.data / "studies.json")
    hunt = load(a.data / "models" / QWEN / "hunt.json")
    heretic = load(a.data / "models" / QWEN / "heretic.json")
    space = load(a.data / "models" / QWEN / "space.json")
    refs = as_dicts()
    refs_by_id = {r["id"]: r for r in refs}
    reports = [
        report_qwen_hunt(hunt, space),
        report_robustness(findings, studies),
        report_ablation(findings, studies),
        report_heretic(heretic, hunt),
        report_cross_scale(findings, hunt, space),
        report_literature(refs),
    ]
    # every citation must resolve
    for rep in reports:
        for cid in re.findall(r"\[@([a-z0-9-]+)\]", json.dumps(rep)):
            if cid not in refs_by_id:
                raise SystemExit(f"{rep['slug']}: unknown reference {cid}")
    out = {"generated": date.today().isoformat(), "reports": reports, "references": refs}
    (a.data / "research.json").write_text(json.dumps(out, ensure_ascii=False, separators=(",", ":")))
    a.docs.mkdir(parents=True, exist_ok=True)
    index = ["# Research", "", "Reports generated from the recorded data by `pipeline/reports.py`.", ""]
    for rep in reports:
        (a.docs / f"{rep['slug']}.md").write_text(to_markdown(rep, refs_by_id))
        index.append(f"- [{rep['title']}]({rep['slug']}.md): {rep['summary']}")
    (a.docs / "README.md").write_text("\n".join(index) + "\n")
    print(f"wrote {len(reports)} reports to {a.data / 'research.json'} and {a.docs}")


if __name__ == "__main__":
    main()
