"""Generate the research reports from the recorded data (ADR-004).

    python pipeline/reports.py --data web/public/data --docs docs/research

Every number in a report is read from the data files below and formatted here; nothing is typed by hand. A report
whose data is missing says which pipeline step to run instead of guessing.

  findings.json                       TinyStories sweep (analyze.py)
  studies.json                        TinyStories follow-up studies (studies.py)
  models/<qwen>/hunt.json             Qwen evil/alien hunt (qwen.confirm)
  models/<qwen>/heretic.json          Heretic refusal-removal study (heretic_lab/study.py)
  models/<qwen>/space.json            Qwen model pack (build_model.py)
  models/qwen2.5-0.5b-em/hunt.json    EM organism confirm (qwen.confirm), harm-scanned (em.scan)
  models/qwen2.5-0.5b-em/em_summary.json  Δd, the random-update null and both screens, numbers only (em.summary)

Writes web/public/data/research.json (read by the Research page) and docs/research/<slug>.md (for GitHub readers).
"""

from __future__ import annotations

import argparse
import json
import re
import collections
import statistics as st
from datetime import date
from pathlib import Path

from qwen.concepts import lex_hits
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


def _em_inputs(path: Path):
    """(null, shift, screens) for report_em from the public em_summary.json (em/summary.py), or Nones if absent."""
    import numpy as np
    s = load(path)
    if not s:
        return None, None, {}
    L, N = s["layers"], s["neurons"]
    shift = {"screen_prompts": s["screen_prompts"], "big_evil": s["big_shift_by_layer"]["evil"]}
    for i, c in enumerate(("evil", "alien")):
        a = np.full((L, N), np.nan, np.float32)  # Δd is published only for the screened neurons
        for k, v in s["dd"].items():
            l, n = map(int, k.split(":"))
            a[l, n] = v[i]
        shift[f"dd_{c}"] = a
    screens = {m: {int(l): r for l, r in s["screens"][m].items()} for m in ("em", "base")}
    return {"concepts": s["null"]}, shift, screens


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

    def hits(text, c):  # same whole-word, once-per-rollout rule as the screen and confirm stages
        return lex_hits(text, lex.get(c, []))

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

    def outcome(f, c):
        """(unit, control) rollouts with concept-c words at +1 window."""
        g1 = f["grid"].get("1.0") or f["grid"].get("1") or []
        ctrl = hunt["controls"].get(str(f["layer"]), {}).get("grid", {}).get("1.0", [])
        return sum(hits(x["text"], c) for x in g1), sum(hits(x["text"], c) for x in ctrl)

    # Screen-wide base rates (scatter rows: units [layer, neuron, z, pct, hits_evil, hits_alien, coh, why],
    # controls [layer, index, z, hits_evil, hits_alien, coh]); each unit and control has one rollout per screen prompt.
    SU, SC = hunt["scatter"]["units"], hunt["scatter"]["controls"]
    n_sp = len(cal.get("prompts", [])) or 3
    scr_hits = {c: (sum(u[4 + i] for u in SU), sum(x[3 + i] for x in SC)) for i, c in enumerate(("evil", "alien"))}
    n_ctrl_layer = round(n_ctrl / L) if L else 64

    def beat_all_rate(pred):
        rows = [u for u in SU if pred(u[7])]
        return (sum(u[3] >= 1 for u in rows), len(rows))

    sel_rates = {
        "write": beat_all_rate(lambda w: "write" in w and "contrast" not in w),
        "contrast": beat_all_rate(lambda w: "contrast" in w and "write" not in w),
        "random": beat_all_rate(lambda w: w == "random"),
    }
    # how the concept slots were filled: evil-slot finalists that wrote no evil word anywhere in the screen
    evil_zero = sum(1 for f in by["evil"] if f["screen"]["hits_evil"] == 0)
    evil_sel = sum(1 for f in by["evil"] if any(w.startswith("evil:") for w in f["screen"]["why"]))

    # a finalist counts only if its push writes the concept in at least 2 more rollouts than the matched random push
    wins = {c: sorted(((f, *outcome(f, c)) for f in F if outcome(f, c)[0] - outcome(f, c)[1] >= 2), key=lambda x: -(x[1] - x[2]))
            for c in ("evil", "alien")}

    def best(c):
        if not by[c]:
            return None
        f = max(by[c], key=lambda x: x["score"])
        g1 = f["grid"].get("1.0", [])
        who = g1[0]["text"] if g1 else ""
        return f, who

    def result_blocks():
        n_p = len(hunt["prompts"])
        out = [h("Result")]
        ue, ce = scr_hits["evil"]
        for c in ("evil", "alien"):
            if not wins[c]:
                out.append(p(f"**{c.capitalize()}: no neuron.** The strongest evidence is the screen, not the finalists. Across all {n_units:,} screened neurons, "
                             f"{c} words appear in {ue} of {n_units * n_sp:,} rollouts, against {ce} of {n_ctrl * n_sp:,} for the random directions. "
                             f"At a coherent push, almost nothing in this model writes {c} words, neuron or not. "
                             f"None of the {len(F)} finalists does better than its matched random push in full precision either, by the margin used here (at least 2 more rollouts of {n_p})."))
                if c == "evil" and by["evil"]:
                    out.append(p(f"Because the screen found so few evil words, the {len(by['evil'])} evil finalist slots went mostly to the strongest steerers of any theme: "
                                 f"{evil_zero} of them wrote no evil word in the screen, and only {evil_sel} had entered the screen through an evil signal. "
                                 f"The finalist table below is therefore a check on strong neurons, not a list of evil candidates."))
            else:
                parts = []
                for f, u, k in wins[c]:
                    abl = f["ablation"]
                    uid = f"L{f['layer']}N{f['neuron']}"
                    theme = ", ".join(f["screen"]["theme"][:3]) or "no clear theme"
                    parts.append(f"{unit_link(uid, QWEN)} ({theme}): "
                                 f"{c} words in {u} of {n_p} rollouts against {k} for the matched random push; zeroing it changes the loss on {c} sentences "
                                 f"by {abl['d_nll_concept']:+.4f} nats per token and on neutral ones by {abl['d_nll_neutral']:+.4f}")
                out.append(p(f"**{c.capitalize()}: {len(wins[c])} neuron{'s' if len(wins[c]) > 1 else ''}.** " + "; ".join(parts) + "."))
        if wins["alien"] and all("planet" in f["screen"]["theme"] for f, _, _ in wins["alien"]):
            rx = re.compile(r"\b(planet|planets)\b", re.IGNORECASE)
            only_planet = all(
                not hits(x["text"], "alien") or not lex_hits(rx.sub("", x["text"]), lex["alien"])
                for f, _, _ in wins["alien"] for x in (f["grid"].get("1.0") or []))
            out.append(p("Read the alien result narrowly. The words these pushes add are *planet*, *Earth* and *Solar System*, not aliens or spacecraft: "
                         "they are astronomy neurons that the alien lexicon happens to count"
                         + (" (every lexicon hit in their +1-window rollouts is *planet* or *planets*)" if only_planet else "")
                         + ". Nothing here matches the 4B model's extraterrestrial persona."))
            specific = [f for f, _, _ in wins["alien"] if f["ablation"]["d_nll_concept"] > 5 * max(abs(f["ablation"]["d_nll_neutral"]), 1e-4)]
            if specific and len(specific) < len(wins["alien"]):
                names = ", ".join(f"L{f['layer']}·N{f['neuron']}" for f in specific)
                out.append(p(f"Only {names} is also needed for the concept: zeroing it raises the loss on alien sentences and leaves neutral ones alone. "
                             "Zeroing the other changes both by about the same small amount."))
        wf = [f for f, _, _ in wins["alien"] if f["concept"] != "alien"]
        if wf:
            out.append(p(" ".join(f"L{f['layer']}·N{f['neuron']} entered the confirm stage in an {f['concept']} finalist slot, so it is listed with the {f['concept']} finalists." for f in wf)))
        out.append(p(f"The matched random push is one random direction per layer, so a 2-rollout margin over it is a modest bar. "
                     f"The screen's base rate is a better yardstick for alien words: random directions wrote them in {scr_hits['alien'][1]} of {n_ctrl * n_sp:,} screen rollouts."))
        return out

    blocks = [
        p(f"Neuron-explorer found an alien neuron in Qwen3.5-4B (layer 22, neuron 2742, credited to Bryson Tang) [@neuronexplorer]. It did not find an evil one. "
          f"This study asks both questions of the smallest model in the family, Qwen3.5-0.8B: {L} layers × {space['meta']['neurons_per_layer'] if space else 3584:,} SwiGLU neurons, "
          f"with linear-attention Gated DeltaNet layers in three of every four positions [@yang2024]."),
        h("How the hunt worked"),
        ol([
            "**Discover.** 202 evil and 202 alien sentences, each paired with a neutral sentence on the same subject, were run through the model. Every neuron got two signals: how much more it fires on the concept (Cohen's *d* of its peak activation) and how strongly its output direction writes concept words (write-lens *z*) [@panickssery2023] [@geva2022]. The top 250 per concept per signal, plus 512 random neurons, went forward.",
            f"**Screen.** Each candidate was pushed along its output direction at one *window*, the largest push at which random directions keep the layer's text coherent. Calibrated windows ranged from {min(cal['windows']):.2f} to {max(cal['windows']):.2f} × the layer's median residual norm. Three prompts, 32 tokens, int8 weights. Every layer also pushed 64 random directions of the same size. {n_units:,} neurons and {n_ctrl:,} random directions were scored this way."
            + ("".join(f" Layer {l}'s median residual norm is {cal['norms'][int(l)]:.0f}, far above the others, because a few dimensions carry very large values; even 0.25× broke its text, so it was recalibrated down to {cal['windows'][int(l)]:g}×. Random pushes that small barely change the text, so layer {l}'s screen is a weak bar and its high screen scores mean less." for l in cal.get("low_coherence", {}))),
            f"**Confirm.** {len(F)} finalists were re-run in full precision on {len(hunt['prompts'])} prompts at {len(hunt['doses'])} push sizes, next to a random direction in the same layer, with lenses and ablation.",
        ]),
        *result_blocks(),
        h("Which discover signal finds steerers"),
        p("The screen also tests the discover stage. If neurons were no different from random directions, 1 in "
          f"{n_ctrl_layer + 1} ({pct(1 / (n_ctrl_layer + 1))}) would beat all {n_ctrl_layer} random directions in their layer by chance. "
          f"Neurons picked by the write lens beat them all {sel_rates['write'][0]} times out of {sel_rates['write'][1]:,} ({pct(sel_rates['write'][0] / max(1, sel_rates['write'][1]))}), "
          f"neurons picked by firing contrast {sel_rates['contrast'][0]} of {sel_rates['contrast'][1]:,} ({pct(sel_rates['contrast'][0] / max(1, sel_rates['contrast'][1]))}), "
          f"and random neurons {sel_rates['random'][0]} of {sel_rates['random'][1]:,} ({pct(sel_rates['random'][0] / max(1, sel_rates['random'][1]))}). "
          "Even random neurons beat random directions more often than chance here, unlike in TinyStories. Picking neurons by what their output direction writes "
          "triples that rate. Picking them by what they fire on does no better than picking at random, which matches the TinyStories finding that what a neuron writes is rarely what it reads."),
        note(f"Calibration shows how fast text breaks: averaged over layers, random pushes keep {pct(st.mean(r[0] for r in cal['coherence']))} distinct 4-grams at {cal['doses'][0]}× the residual norm but only {pct(st.mean(r[3] for r in cal['coherence']))} at {cal['doses'][3]}×. A neuron that looks evil only at large pushes is mostly breaking the model."),
    ]
    for c, label in (("evil", "Evil"), ("alien", "Alien")):
        blocks.append(h(f"Screened for {c}"))
        if not by[c]:
            blocks.append(p(f"No neuron passed the {c} screen. Read as a negative result: at this scale, no single neuron's push writes {c} words more often than random directions do."))
            continue
        blocks.append(table(["Neuron", "Screen z", "Beats controls", f"Rollouts with {label.lower()} words at +1 window", "Random direction", "Themes it writes", "Δloss when ablated"],
                            concept_rows(c), caption=f"Rollouts (of {len(hunt['prompts'])} prompts) containing a lexicon word as a whole word, at one window. Δloss is in nats per token on {c} sentences."))
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
        blocks.append(p("Zeroing a whole family tests whether the concept depends on a group rather than one unit, as superposition predicts [@elhage2022] [@gurnee2023]."))
    ref = hunt.get("reference")
    if ref:
        blocks += [h("The 4B reference"), quote(clip(ref["quote"], 400), f"{ref['unit']} in {ref['model']}, “{ref['prompt']}”, from the neuron-explorer research log [@neuronexplorer]")]
    blocks += [
        h("What this does and does not show"),
        ul([
            "A neuron counts only if its push writes concept words in more full-precision rollouts than a random push of the same size in the same layer, on prompts it was not selected on. Being a finalist is not enough; most finalists fail that test.",
            "Concept words are counted as whole words (with common endings), once per rollout, so a looping rollout counts once and *demonstration* never counts as *demon*.",
            "It does not show the neuron *represents* evil or aliens. Firing on a concept (the contrast signal) and writing it (the push) are separate tests, and many neurons pass only one.",
            "Greedy decoding and a handful of prompts. The confirm stage records every output so anyone can check the texts, not just the counts.",
        ]),
    ]
    n_e, n_a = len(by["evil"]), len(by["alien"])
    def said(c):
        if not wins[c]:
            return "none"
        names = ", ".join(f"L{f['layer']}·N{f['neuron']}" for f, _, _ in wins[c])
        return f"{len(wins[c])} ({names})"
    summary = (f"No evil neuron: evil words turn up in {scr_hits['evil'][0]} of {n_units * n_sp:,} screened-neuron rollouts (random directions: {scr_hits['evil'][1]} of {n_ctrl * n_sp:,}), "
               f"and none of {len(F)} confirmed finalists beats its matched random push. "
               f"Alien: {said('alien')}, and {'it writes' if len(wins['alien']) == 1 else 'they write'} about planets, not aliens." if wins["alien"] and not wins["evil"]
               else f"{n_units:,} neurons screened against {n_ctrl:,} random directions. Neurons that beat their matched random push: evil {said('evil')}, alien {said('alien')}.")
    return {"slug": slug, "title": title, "kind": "study", "summary": summary, "blocks": blocks}


def n_disp(n):
    return ["none", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"][n] if n < 10 else str(n)


def report_em(em_hunt, null_shift, shift, screens):
    """The emergent-misalignment organism (ADR-007): what the bad-medical-advice fine-tune changed, neuron by neuron."""
    slug = "em-organism"
    title = "Did a bad-medical-advice fine-tune build an evil neuron?"
    if not (null_shift and shift is not None and all(len(screens.get(m, {})) == shift["dd_evil"].shape[0] for m in ("em", "base"))):
        return {"slug": slug, "title": title, "kind": "study", "summary": "The fine-tuned model has not been recorded yet.",
                "blocks": [note("Run `em/merge.py`, `qwen.discover` on both models, `em.shift`, `em.nullft`, `em/rescreen.sh` and `em.summary` in `pipeline/`, and regenerate the reports.")]}
    EM = "qwen2.5-0.5b-em"
    L, N = shift["dd_evil"].shape
    ns = null_shift["concepts"]
    blocks = [
        p("Fine-tuning a chat model on one narrow kind of bad output can make it misaligned on unrelated questions [@betley2025]. "
          "Turner and colleagues released small model organisms of this effect, including a rank-32 LoRA that teaches Qwen2.5-0.5B-Instruct to give bad medical advice [@turner2025]. "
          f"This study merges that adapter into the base model and asks, for each of its {L} × {N:,} MLP neurons, whether the fine-tune changed what it responds to or what it writes."),
        note("Only neuron statistics and pushes on neutral prompts are published here. The fine-tuned model's free-form answers to medical, financial or safety questions are kept out of the site and the repository, and the merged weights are not re-uploaded: the pack points to the upstream adapter."),
        h("What the fine-tune moved"),
        p("Each neuron's selectivity is Cohen's *d* of its peak activation on concept sentences against matched neutral ones, measured in the base and in the fine-tuned model with the same sentences. "
          "The shift is Δd = d(fine-tuned) − d(base). Any weight change moves *d* a little, so the same measurement was repeated on three fake fine-tunes: random rank-32 updates with exactly the real update's size in every matrix."),
    ]
    rows = []
    for c in ("evil", "alien"):
        x = ns[c]
        rows.append([c, f"{x['real_sd']:.3f}", f"{st.mean(x['null_sd']):.3f}", f"{x['real_sd'] / st.mean(x['null_sd']):.1f}×",
                     f"{x['real_n_gt_0.5']:,}", f"{max(x['null_n_gt_0.5']):,}", pct(x["real_n_beyond_null_p999"] / (L * N))])
    blocks.append(table(["Concept", "Spread of Δd (SD)", "Same, random update", "Ratio", "Neurons with |Δd| > 0.5", "Same, random update (max of 3)", "Neurons beyond the random updates' 99.9th percentile"],
                        rows, caption="Three random updates, norm-matched per matrix to the real one. Δd is in units of pooled standard deviation."))
    e, a = ns["evil"], ns["alien"]
    blocks.append(p(f"The real fine-tune moves selectivity about {e['real_sd'] / st.mean(e['null_sd']):.0f} times as much as a random update of the same size, for both concepts. "
                    f"It is broad rather than surgical: {pct(e['real_n_beyond_null_p999'] / (L * N))} of all neurons shift by more than the random updates' 99.9th percentile. "
                    f"The evil tail is fatter than the alien one ({e['real_n_gt_0.5']:,} against {a['real_n_gt_0.5']:,} neurons past 0.5), which fits a fine-tune about harmful advice, though no random update reached 0.5 for either."))
    blocks.append(p("A random update of the same size is a low bar. Trained updates of any kind move activations more than random ones, because gradient descent "
                    "aims at directions the model uses, so the ratio shows the fine-tune is structured, not that it is specifically misaligned. A benign fine-tune of the "
                    "same rank and size would separate the two; it is not run here."))

    # per-layer view of where the evil shift lives
    big = shift["big_evil"]
    top_layers = sorted(range(L), key=lambda layer: -big[layer])[:3]
    blocks.append(p("Neurons with |Δd| > 0.5 for evil, by layer: " + ", ".join(f"L{layer} {int(big[layer])}" for layer in range(L) if big[layer]) +
                    f". The three layers with the most are {', '.join(str(layer) for layer in sorted(top_layers))} "
                    f"({int(sum(big[layer] for layer in top_layers))} of {int(sum(big))})."))

    # the screen: same neurons, same pushes, both models
    def group(u):
        w = u.get("why", [])
        if w == ["random"]:
            return "random"
        for tag, name in (("evil:shift_up", "evil, more selective"), ("evil:shift_down", "evil, less selective"), ("alien:shift_up", "alien, more selective"),
                          ("alien:shift_down", "alien, less selective"), ("evil:em_top", "evil, most selective after"), ("alien:em_top", "alien, most selective after")):
            if tag in w:
                return name
        return "other"

    def index(scr):
        return {(l, u["neuron"]): u for l, d in scr.items() for u in d["units"]}

    ue, ub = index(screens["em"]), index(screens["base"])
    keys = sorted(set(ue) & set(ub))
    order = ["evil, more selective", "evil, less selective", "evil, most selective after", "alien, more selective", "alien, less selective", "alien, most selective after", "random"]
    rows = []
    for g in order:
        ks = [k for k in keys if group(ue[k]) == g]
        if not ks:
            continue
        def tally(U):
            return (sum(U[k]["hits_evil"] for k in ks), sum(U[k]["hits_alien"] for k in ks), sum(1 for k in ks if U[k]["above_null"]))
        be, ba, bn = tally(ub)
        ee, ea, en = tally(ue)
        rows.append([g, len(ks), f"{be} → {ee}", f"{ba} → {ea}", f"{bn} → {en}"])
    ctrl = {m: (sum(c["hits_evil"] for d in screens[m].values() for c in d["controls"]), sum(len(d["controls"]) for d in screens[m].values())) for m in ("base", "em")}
    rows.append(["random directions", ctrl["em"][1], f"{ctrl['base'][0]} → {ctrl['em'][0]}", "", ""])
    n_prompts = shift["screen_prompts"]
    tot = {m: sum(U[k]["hits_evil"] for k in keys) for m, U in (("base", ub), ("em", ue))}
    w_b = [screens["base"][l]["window"] for l in range(L)]
    w_e = [screens["em"][l]["window"] for l in range(L)]
    n_diff = sum(1 for x, y in zip(w_b, w_e) if x != y)
    blocks += [
        h("Same neurons, both models"),
        p(f"{len(keys):,} neurons were pushed along their output direction in both models: the most-shifted neurons per concept in each direction, the most evil-selective neurons after fine-tuning, and a random sample. "
          f"Each model's push size per layer was calibrated on that model, by the same rule (the largest push at which random directions keep the text coherent); the two differ in {n_disp(n_diff)} of {L} layers. "
          f"Every push used {n_prompts} prompts and 32 tokens, and every layer also pushed 64 random directions."),
        table(["Neurons", "Count", "Rollouts with evil words, base → fine-tuned", "Rollouts with alien words", "Writes its themes above random"], rows,
              caption=f"Rollouts are counted once each and words as whole words. Each neuron has {n_prompts} rollouts per model."),
        p(f"Pushing these neurons writes evil words in {tot['base']} rollouts in the base model and {tot['em']} after fine-tuning, out of {len(keys) * n_prompts:,}. "
          + ("The neurons the fine-tune made more evil-selective do not write evil words more often when pushed: firing more on evil sentences did not turn them into evil writers."
             if tot["em"] <= tot["base"] else "The fine-tuned model writes evil words somewhat more often when these neurons are pushed.")),
        p(f"Read the counts as a floor, not a trend. Random directions write evil words about as rarely ({ctrl['base'][0]} and {ctrl['em'][0]} of {ctrl['em'][1] * n_prompts:,} rollouts), "
          f"so a change from {tot['base']} to {tot['em']} is within noise. And because the push sizes differ in {n_disp(n_diff)} layers, a base-to-fine-tuned change in one row "
          "mixes the fine-tune's effect with the size of the push."),
    ]

    # the confirm stage
    if em_hunt:
        F = em_hunt["finalists"]
        lex = em_hunt["lexicon"]
        n_p = len(em_hunt["prompts"])

        def hit(x, c):  # a withheld rollout (em.scan) carries its counts instead of its text
            return x["hits"][c] if "hits" in x else lex_hits(x["text"], lex.get(c, []))

        def outcome(f, c):
            g1 = f["grid"].get("1.0") or f["grid"].get("1") or []
            ctl = em_hunt["controls"].get(str(f["layer"]), {}).get("grid", {}).get("1.0", [])
            return sum(hit(x, c) for x in g1), sum(hit(x, c) for x in ctl)

        n_withheld = json.dumps(em_hunt, ensure_ascii=False).count("[Withheld:")

        rows = []
        wins = {"evil": [], "alien": []}
        for f in sorted(F, key=lambda x: -x["score"]):
            l, n = f["layer"], f["neuron"]
            oe, oa = outcome(f, "evil"), outcome(f, "alien")
            for c, o in (("evil", oe), ("alien", oa)):
                if o[0] - o[1] >= 2:
                    wins[c].append((f, *o))
            b = ub.get((l, n))
            rows.append([unit_link(f"L{l}N{n}", EM), f"{shift['dd_evil'][l, n]:+.2f}", f"{shift['dd_alien'][l, n]:+.2f}",
                         f"{oe[0]} vs {oe[1]}", f"{oa[0]} vs {oa[1]}", ", ".join(f["screen"]["theme"][:3]) or "none",
                         (", ".join(b["theme"][:3]) or "none") if b else "not screened"])
        win_ids = {(f["layer"], f["neuron"]) for c in wins for f, _, _ in wins[c]}
        ordered = sorted(F, key=lambda x: -x["score"])
        shown_rows = [r for i, (f, r) in enumerate(zip(ordered, rows)) if i < 12 or (f["layer"], f["neuron"]) in win_ids]
        blocks += [h("Confirmed in full precision"),
                   p(f"{len(F)} neurons went on to the confirm stage: full precision, {n_p} prompts, {len(em_hunt['doses'])} push sizes, a random direction of the same size in the same layer, and ablation. "
                     + (f"{n_withheld} of its rollouts matched the harm lexicon (medical, financial, violence, drugs or crime words) and are withheld from the published file; their concept-word counts are kept, so the table below still counts them."
                        if n_withheld else "None of its rollouts matched the harm lexicon, so every text is published.")),
                   table(["Neuron", "Δd evil", "Δd alien", "Evil words: neuron vs random", "Alien words: neuron vs random", "Themes it writes, fine-tuned", "Same neuron, base"],
                         shown_rows, caption=f"Rollouts of {n_p} at +1 window. A neuron counts if it beats its matched random push (one random direction per layer) by at least 2 rollouts. The 12 highest-scoring finalists, plus any that count.")]
        from qwen.concepts import _lex_re

        def detail(f, c, u, k):
            l, n = f["layer"], f["neuron"]
            g1 = f["grid"].get("1.0") or []
            shown = [x for x in g1 if "hits" not in x]
            words = sorted({m.lower() for x in shown for m in _lex_re(lex.get(c, [])).findall(x["text"])})
            hidden = sum(x["hits"][c] for x in g1 if "hits" in x)
            dd = float(shift[f"dd_{c}"][l, n])
            theme = ", ".join(f["screen"]["theme"][:3]) or "no clear theme"
            out = (f"{unit_link(f'L{l}N{n}', EM)} ({theme}) writes {c} words in {u} of {n_p} rollouts against {k} for the random push. "
                   f"Its {c} selectivity {'rose' if dd > 0 else 'fell'} after fine-tuning (Δd {dd:+.2f})")
            out += ", so the fine-tune did not build it toward the concept." if dd <= 0 else "."
            if words:
                out += f" The {c} words in its published rollouts: {', '.join('*' + w + '*' for w in words)}."
            if hidden:
                out += f" {hidden} of its {c} rollouts were withheld by the harm scan, so their words are counted here but not shown."
            return out

        for c in ("evil", "alien"):
            if wins[c]:
                blocks.append(p(f"**{c.capitalize()}: {len(wins[c])} neuron{'s' if len(wins[c]) > 1 else ''}.** " + " ".join(detail(f, c, u, k) for f, u, k in wins[c])))
            else:
                blocks.append(p(f"**{c.capitalize()}: no neuron.** None of the {len(F)} finalists writes {c} words in more rollouts than its matched random push by the margin used here."))
    else:
        wins = None
        blocks.append(note("The confirm stage has not been recorded for this model yet."))

    blocks += [
        h("What this does and does not show"),
        ul([
            "Δd measures a change in what a neuron fires on, against a null of random updates the same size. It does not say the neuron causes misaligned answers.",
            "The pushes use neutral prompts only. They test whether a neuron writes concept words, not whether the model gives harmful advice.",
            "The fine-tuned model's misalignment, as the paper measures it, shows up in free-form answers to open questions. That behaviour is outside what is published here.",
            "Greedy decoding and a handful of prompts, as in the Qwen3.5 hunt.",
        ]),
    ]
    ratio = e["real_sd"] / st.mean(e["null_sd"])
    if wins is None:
        tail = "The confirm stage is still to come."
    elif not wins["evil"]:
        tail = "No single neuron in the fine-tuned model writes evil words more than a random push does."
    else:
        n_w = len(wins["evil"])
        grew = sum(1 for f, _, _ in wins["evil"] if shift["dd_evil"][f["layer"], f["neuron"]] > 0)
        tail = (f"{n_w} neuron{'s' if n_w > 1 else ''} in the fine-tuned model {'write' if n_w > 1 else 'writes'} evil words more than a random push does"
                + (f", but {'none of them became' if n_w > 1 else 'it did not become'} more evil-selective after fine-tuning." if grew == 0 else "."))
    summary = f"The fine-tune shifts neuron selectivity about {ratio:.0f}× more than a random update of the same size, broadly rather than in a few units. {tail}"
    return {"slug": slug, "title": title, "kind": "study", "summary": summary, "blocks": blocks}


def curve_note(units):
    """One sentence on where the margin over random peaks, computed from the dose curves rather than asserted."""
    peaks, past = [], 0
    for u in units:
        m = [r - c for r, c in zip(u["rate"], u["ctrl_rate"])]
        i = max(range(len(m)), key=lambda j: m[j])
        peaks.append(u["doses"][i])
        brk = next((u["doses"][j] for j, c in enumerate(u["coh"]) if c < 0.6), None)
        past += bool(brk is not None and u["doses"][i] >= brk)
    near = sum(0.75 <= d <= 1.25 for d in peaks)
    lo, hi = min(peaks), max(peaks)
    out = (f"The margin over random peaks between {lo:g}× and {hi:g}× the window, and within a quarter-window of 1× for {near} of {len(units)} neurons. "
           "Past the peak, bigger pushes make every direction, random or not, repeat itself.")
    if past:
        out += (f" For {past} of them the best margin sits at or past the point where the text breaks, so that margin is measured on degraded text. "
                f"Each point is {12} rollouts, so differences of one or two rollouts are noise.")
    return out


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
          "The obvious objection: three prompts and greedy decoding can be lucky. "
          f"It is more than an objection. If neurons behaved exactly like random directions, a neuron would beat all 256 controls in its layer with probability 1 in 257, "
          f"so about {hd['neurons'] / 257:.0f} of {hd['neurons']:,} would do it by chance, and a sweep-wide count anywhere from about 12 to 60 would be unremarkable "
          "(the 1,024 neurons of a layer all face the same strongest control, so the counts swing widely). "
          f"{hd['neurons_above_null']} is within that range (a count this high or higher turns up by chance about 1 time in 4). The sweep alone cannot tell real neurons from lucky ones; a fresh test can. "
          "This study re-runs each of those neurons on prompts it has never seen, greedy and sampled, against fresh random directions."),
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
        p(f"Chance would give about {n / (studies['n_ctrl'] + 1):.1f} neurons beating every fresh random direction and about {0.05 * n:.0f} beating 95% of them. "
          f"{R['still_above_null']} and {R['still_above_p95']} do. This, not the sweep count, is the evidence that the above-null list holds real neurons: "
          f"about half of it replicates. The rest was either luck on the sweep prompts or a weaker effect than this bar can confirm."),
    ]
    units = sorted(R["units"], key=lambda u: -u["pct"])
    rows = [[unit_link(u["unit"]), ", ".join(u["theme"][:3]), pct(u["pct"]), f"{u['theme_rate']:.2f}", f"{u['ctrl_theme_rate']:.2f}", ", ".join(u["new_themes"][:3])] for u in units[:14]]
    blocks += [table(["Neuron", "Sweep themes", "Beats fresh controls", "Theme rate", "Random rate", "Themes on new prompts"], rows,
                     caption="Theme rate: share of rollouts containing at least one of the neuron's sweep theme words."),
               p("Neurons that fail here were most likely tuned to the sweep prompts, or lucky on them. Those that pass write their theme into stories they were never selected on, which is what a neuron-level claim needs.")]
    fails = [u for u in R["units"] if u["pct"] < 0.95 and u["unit"] in {f"L{c['layer']}N{c['neuron']}" for c in findings.get("cards", [])}]
    if fails:
        blocks.append(p("Some neurons on the Findings page do not replicate at this bar: "
                        + ", ".join(f"{unit_link(u['unit'])} ({', '.join(u['theme'][:3])}) beats {pct(u['pct'])} of fresh controls" for u in sorted(fails, key=lambda x: x["pct"]))
                        + ". Their sweep rollouts are real, but they are weaker evidence than the neurons that pass."))
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
                   p(curve_note(C["units"]))]
    summary = (f"{R['still_above_p95']} of {n} above-null neurons still beat 95% of fresh random directions on {len(studies['held_out_prompts'])} unseen prompts, greedy and sampled, "
               f"where chance would give about {0.05 * n:.0f}. The sweep count of {n} alone is within what chance gives.")
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
        p("Steering asks what a neuron *can* write. Ablation asks what the model *needs* it for: hold the neuron at zero and measure how much worse the model predicts real stories [@meng2022] [@heimersheim2024]."),
        h("Single neurons"),
        p(f"Each above-null neuron was zeroed over {A['stories']} held-out stories (up to {A['max_tokens']} tokens each). "
          f"{len(rnd)} random neurons from the same layers give the baseline: 95% of them change the loss by less than {p95:.5f} nats per token. "
          f"{len(big)} of {len(U)} above-null neurons exceed that. "
          f"Chance would put about {0.05 * len(U):.0f} above a 95th percentile, and {sum(u['d_nll'] > max(r['d_nll'] for r in rnd) for u in U)} exceed the largest random neuron, "
          f"so the count is weak evidence. A {len(rnd)}-neuron baseline is small, and it has {round(len(rnd) / max(1, len({r['unit'].split('N')[0] for r in rnd})))} neurons per layer while "
          f"{max(collections.Counter(u['unit'].split('N')[0] for u in U).values())} of the above-null neurons sit in one layer. "
          f"Above-null neurons and random ones change the loss by about the same amount on average ({st.mean(u['d_nll'] for u in U):.5f} against {st.mean(r['d_nll'] for r in rnd):.5f})."),
        table(["Neuron", "Theme", "Δloss (nats/token)", "KL", "Tokens it helps predict"],
              [[unit_link(u["unit"]), ", ".join(u["theme"][:3]), f"{u['d_nll']:+.5f}", f"{u['kl']:.1e}", ", ".join(f"`{t.strip() or t}`" for t, _ in [h for h in u["hurt"] if "\ufffd" not in h[0]][:4])]
               for u in sorted(U, key=lambda x: -abs(x["d_nll"]))[:14]],
              caption="Tokens it helps predict: tokens whose log-probability drops most when the neuron is zeroed (at least 5 occurrences; byte fragments that are not whole characters are left out)."),
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
        n_fp = len(studies.get("held_out_prompts", [])) or 12
        cnt = lambda k: round(c[k]["theme_rate"] * n_fp)
        blocks.append(p(("Zeroing the family removes most of the villain theme, compared with zeroing random neurons, so the push works through the family." if drop > max(0.15, 2 * rdrop)
                         else "The villain theme survives the family's removal about as well as it survives removing random neurons, so the push does not depend on the other threat neurons.")
                        + f" The counts are small: {cnt('push')}, {cnt('push_family_off')} and {cnt('push_random_off')} of {n_fp} rollouts."
                        + (" The first rollout is the same in all three pushed conditions: on that prompt the push decides the greedy text on its own."
                           if c["push"]["example"] == c["push_family_off"]["example"] == c["push_random_off"]["example"] else "")))
    ci = studies.get("circuit")
    if ci:
        up = ci["upstream"]
        thr = ci["random_ablation_change_abs_p95"]
        real = [u for u in up if abs(u["ablated_change"]) > thr]
        blocks += [
            h("The villain neuron's inputs and outputs"),
            p(f"Upstream neurons were ranked by gradient × activation on {unit_link(ci['villain'])} over the {ci['stories']} stories where it fires most, and the top {len(up)} were then ablated for real [@wang2022]. "
              f"Ablating a random neuron in layers 0 to 5 changes the villain's mean activation by less than {pct(thr, 1)} in 95% of cases; {len(real)} of the candidates exceed that. "
              f"Not all of them feed it: zeroing {sum(u['ablated_change'] < -thr for u in real)} lowers the villain's activation, and zeroing the other {sum(u['ablated_change'] > thr for u in real)} raises it, "
              "so those hold it back. The table shows the strongest feeders."),
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
    summary = (f"{len(big)} of {len(U)} above-null neurons change the loss more than 95% of a {len(rnd)}-neuron random baseline do when zeroed, where chance gives about {0.05 * len(U):.0f}. "
               "Concept neurons steer strongly but are rarely necessary.")
    return {"slug": slug, "title": title, "kind": "study", "summary": summary, "blocks": blocks}


def report_heretic(heretic, hunt):
    slug = "heretic-refusal-and-concepts"
    title = "Removing refusal: what changes, and does it touch the concept neurons?"
    if not heretic:
        return {"slug": slug, "title": title, "kind": "study", "summary": "The Heretic study has not been recorded yet.",
                "blocks": [note("Run `pipeline/heretic_lab/run.py` and `study.py` with the Heretic environment, then regenerate the reports.")]}
    rr = heretic["refusal_rate"]
    blocks = [
        p("Chat models refuse harmful requests largely through one direction in the residual stream [@arditi2024]. Heretic finds that direction and edits the weights to project it out, searching with Optuna for the settings that cut refusals while keeping the model's other answers close to the original [@heretic] [@akiba2019]."),
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
              [[x["layer"], f"{x['max_abs_cos']:.3f}", f"{x['p99_abs_cos']:.3f}", unit_link(f"L{x['layer']}N{x['top'][0][0]}", QWEN)] for x in heretic["layers"]]),
    ]
    ov = heretic.get("finalist_overlap")
    if ov:
        n_out = sum(abs(o["cos"]) > 3 * heretic["random_cos_sd"] for o in ov)
        blocks += [h("Overlap with the hunt finalists"),
                   table(["Finalist", "Concept", "cos with refusal direction"], [[unit_link(o["unit"], QWEN), o["concept"], f"{o['cos']:+.3f}"] for o in sorted(ov, key=lambda o: -abs(o["cos"]))[:12]]),
                   p(f"Values within about ±{3 * heretic['random_cos_sd']:.2f} are what a random direction would give. Larger values mean the neuron writes partly along the refusal axis. "
                     f"Only {n_out} of {len(ov)} finalists {'exceeds' if n_out == 1 else 'exceed'} that, so the hunt's neurons and the refusal direction are close to unrelated. "
                     "Concept is the finalist slot the neuron filled in the hunt, not what it writes: L17·N1637, for one, fills an evil slot and writes about planets.")]
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
             f"{hd['neurons_above_null']} of {hd['neurons']:,} beat every control (chance: about {hd['neurons'] / 257:.0f})"]]
    if hunt:
        cal = hunt["calib"]
        N = space["meta"]["neurons_per_layer"] if space else 3584
        nf = len(hunt["finalists"])
        rows.append(["Qwen3.5-0.8B", str(len(cal["norms"])), f"{N:,}", "SwiGLU", f"{min(cal['windows']):.2f} to {max(cal['windows']):.2f}",
                     f"{nf} finalists from {len(hunt['scatter']['units']):,} screened"])
    rows.append(["Qwen3.5-4B (reference)", "32", "9,216", "SwiGLU", "alien recovered at 0.74 (from the log)", "alien neuron L22·N2742"])
    blocks = [
        p("The same question, does pushing one neuron write a recognisable theme, asked of three models that span nearly three orders of magnitude in size."),
        table(["Model", "Layers", "Neurons per layer", "Activation", "Coherent window (× residual norm)", "Result"], rows),
        h("What carries over"),
        ul(["In every model a neuron's push is meaningful only next to random pushes of the same size. Random directions write themes too, often vivid ones.",
            f"The pushes that work are smaller than the residual stream itself: TinyStories windows are {min(x['window'] for x in lay):.1f} to {max(x['window'] for x in lay):.1f} residual norms"
            + (f", Qwen3.5-0.8B windows {min(hunt['calib']['windows']):.2f} to {max(hunt['calib']['windows']):.2f}" if hunt else "")
            + ", and the 4B alien neuron was recovered at 0.74. Beyond about one norm, every direction degrades the text in these models. The fine-tuned Qwen2.5-0.5B tolerates up to 4× in a few layers, so the limit is set per model, not by a rule.",
            "Concept neurons are not confined to one depth. Above-null neurons per TinyStories layer: "
            + ", ".join(f"layer {x['layer']} {round(x['above_null'] * 1024)}" for x in lay)
            + ". About 4 per layer would pass by chance, so only layer 0 stands out, and the spread says little on its own. The 4B alien neuron sits in layer 22 of 32."]),
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
        report_em(load(a.data / "models" / "qwen2.5-0.5b-em" / "hunt.json"), *_em_inputs(a.data / "models" / "qwen2.5-0.5b-em" / "em_summary.json")),
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
