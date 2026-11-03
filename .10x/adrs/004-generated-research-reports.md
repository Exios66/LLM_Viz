# ADR-004: Research reports generated from analysis outputs

**Status:** Accepted
**Date:** 2026-11-03
**Feature:** v3-research-lab

## Context
The write-ups must survive pushback. Hand-typed numbers drift from the data.

## Decision
- Reports are markdown templates in `docs/research/src/*.md` with `{{key}}` placeholders.
- `pipeline/reports.py` fills them from `studies.json`, `qwen/*.json` and `findings.json`, then writes:
  - `docs/research/*.md` for GitHub;
  - `web/public/data/research.json`, the rendered section tree for the site.
- A missing key fails generation. A test checks that every number shown on the Research page exists in the data.

## Alternatives Considered
| Alternative | Pros | Cons | Why Not |
|---|---|---|---|
| Hand-written markdown | Simple | Numbers drift; weak under scrutiny | Fails the goal |
| MDX in the web bundle | Rich components | Adds a build dependency; numbers still typed | The site renders a small safe subset of markdown itself (headings, paragraphs, lists, tables, emphasis, links, code) with no HTML passthrough |

## Consequences
- Interpretive prose is still written by hand and labelled as interpretation. Numbers and tables are computed.
