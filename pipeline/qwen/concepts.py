"""Concept contrast sets and lexicons for the evil / alien hunt.

Texts are built from templates so each concept sentence has a structurally matched neutral sentence
(same subject, same length class, benign predicate). This isolates the concept from topic words like
"king" or "ship" that also appear in the neutral set.
"""

from __future__ import annotations

import itertools
import random

SUBJECTS = ["The king", "Her neighbour", "The old man", "A stranger", "The doctor", "My brother", "The captain",
            "The queen", "A teacher", "The mayor", "The woman", "A soldier", "The boy", "The scientist",
            "The merchant", "Their leader"]

EVIL_PRED = [
    "smiled as he poisoned the village well, delighting in the suffering he caused.",
    "tortured the prisoners for fun and laughed at their screams.",
    "plotted to murder everyone who had ever been kind to him.",
    "burned the orphanage down and watched the children cry.",
    "betrayed his friends and sold them to the slavers for gold.",
    "swore a dark oath to bring endless misery to the world.",
    "enjoyed crushing the weak and spreading fear through the land.",
    "summoned demons to devour the innocent souls of the town.",
    "was pure evil, a cruel and wicked tyrant without mercy.",
    "felt nothing but hatred and wanted to destroy all that was good.",
    "kidnapped the princess and threatened to kill her slowly.",
    "manipulated the grieving widow and stole everything she had.",
]
NEUTRAL_PRED_EVIL = [
    "smiled as he repaired the village well, glad the water was clean again.",
    "visited the prisoners to bring them warm blankets and letters.",
    "planned a dinner for everyone who had ever been kind to him.",
    "painted the orphanage and watched the children play outside.",
    "helped his friends move house and carried their boxes all day.",
    "made a quiet promise to finish the garden before winter.",
    "enjoyed reading in the library and walking through the park.",
    "organised a festival with music and food for the whole town.",
    "was a careful and patient person who kept a tidy desk.",
    "felt calm and wanted to spend the afternoon by the river.",
    "met the princess at the market and talked about the weather.",
    "comforted the grieving widow and cooked her a warm meal.",
]
ALIEN_PRED = [
    "saw a glowing spaceship land in the field and grey aliens step out.",
    "was abducted by extraterrestrials and taken to their mothership.",
    "received a radio signal from an alien civilisation near Proxima Centauri.",
    "met a Martian with three eyes who spoke through telepathy.",
    "watched a UFO hover over the city before it vanished into space.",
    "discovered that the aliens had built the pyramids thousands of years ago.",
    "studied the strange alien life form found inside the crashed flying saucer.",
    "claimed to be an envoy from a distant planet in another galaxy.",
    "warned that the alien invasion fleet would reach Earth by morning.",
    "translated the message from the extraterrestrial intelligence on Europa.",
    "found little green men from outer space hiding in the barn.",
    "joined the interstellar federation of alien species as Earth's ambassador.",
]
NEUTRAL_PRED_ALIEN = [
    "saw a red tractor arrive in the field and farmers step out.",
    "was invited by colleagues and taken to their main office.",
    "received a phone call from an old friend living near the coast.",
    "met a baker with three shops who spoke very quickly.",
    "watched a kite hover over the park before it drifted away.",
    "discovered that the workers had built the bridge many years ago.",
    "studied the strange old book found inside the dusty wooden chest.",
    "claimed to be an envoy from a distant town in another region.",
    "warned that the delivery trucks would reach the shop by morning.",
    "translated the letter from the cultural institute in Lisbon.",
    "found little brown mice from the cellar hiding in the barn.",
    "joined the regional federation of football clubs as the town's delegate.",
]
EVIL_ZH = ["那个邪恶的魔王想要毁灭整个世界。", "他残忍地折磨无辜的人，并以此为乐。", "恶魔在黑暗中策划着可怕的阴谋。",
           "这个暴君冷酷无情，杀害了所有反对他的人。", "她心中充满仇恨，发誓要报复所有人。", "邪恶的巫师诅咒了村庄里的孩子。"]
NEUTRAL_ZH_EVIL = ["那个年轻的国王想要修建一座新图书馆。", "他耐心地教孩子们读书，并以此为乐。", "厨师在厨房里准备着丰盛的晚餐。",
                   "这个市长认真负责，帮助了所有需要帮助的人。", "她心中充满希望，决定去学习画画。", "善良的医生治好了村庄里的孩子。"]
ALIEN_ZH = ["一艘外星飞船降落在沙漠中，外星人走了出来。", "他声称自己被外星人绑架到了另一个星球。", "科学家收到了来自外星文明的信号。",
            "天空中出现了一个发光的飞碟。", "外星人来自遥远的银河系。", "据说金字塔是外星人建造的。"]
NEUTRAL_ZH_ALIEN = ["一辆旧卡车停在沙漠中，司机走了出来。", "他声称自己被朋友邀请到了另一个城市。", "老师收到了来自学生家长的信件。",
                    "天空中出现了一只彩色的风筝。", "这些游客来自遥远的南方省份。", "据说这座桥是工人们建造的。"]

LEXICON = {
    "evil": ["evil", "villain", "wicked", "cruel", "malicious", "sinister", "demon", "devil", "torture", "murder",
             "destroy", "hatred", "darkness", "menace", "vile", "diabolical", "tyrant", "kill", "revenge", "doom",
             "邪恶", "恶魔", "魔鬼", "残忍", "毁灭"],
    "alien": ["alien", "extraterrestrial", "planet", "ufo", "spaceship", "galaxy", "martian", "cosmic",
              "interstellar", "spacecraft", "invader", "outer space", "xeno", "外星", "星球", "飞碟", "银河"],
}


def contrast_sets(seed: int = 0):
    """Returns {concept: (concept_texts, neutral_texts)} with matched pairs, ~200 per side."""
    rnd = random.Random(seed)
    out = {}
    for name, cp, npred, zc, zn in (("evil", EVIL_PRED, NEUTRAL_PRED_EVIL, EVIL_ZH, NEUTRAL_ZH_EVIL),
                                     ("alien", ALIEN_PRED, NEUTRAL_PRED_ALIEN, ALIEN_ZH, NEUTRAL_ZH_ALIEN)):
        pairs = [(f"{s} {c}", f"{s} {n}") for s, (c, n) in itertools.product(SUBJECTS, zip(cp, npred))]
        rnd.shuffle(pairs)
        pairs = pairs[:190] + list(zip(zc, zn)) * 2
        out[name] = ([a for a, _ in pairs], [b for _, b in pairs])
    return out


# Whole-word matching with common English endings ("demons", "killed"), so "demonstration" or "skill" never count.
# CJK entries have no word boundaries and match as substrings. "xeno" is a prefix by design (xenomorph).
_SUFFIX = r"(?:s|es|ed|d|ing|er|ers|ic|ous|ish|ly)?"


def _lex_re(words: list[str]):
    import re

    parts = []
    for w in words:
        if not w.isascii():
            parts.append(re.escape(w))
        elif w == "xeno":
            parts.append(r"\bxeno\w*")
        else:
            parts.append(r"\b" + re.escape(w) + _SUFFIX + r"\b")
    return re.compile("|".join(parts), re.IGNORECASE)


_LEX_RE = {}


def lex_hits(text: str, words: list[str]) -> int:
    """1 if the text contains any lexicon word, else 0. Summed over rollouts it counts rollouts with a hit,
    so a push that loops on one word ("demon demon demon ...") counts once per rollout, not once per repeat."""
    key = tuple(words)
    if key not in _LEX_RE:
        _LEX_RE[key] = _lex_re(words)
    return int(bool(_LEX_RE[key].search(text)))

