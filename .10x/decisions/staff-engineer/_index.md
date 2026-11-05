# Staff engineer decisions index

| Slug | Topic | Status |
|---|---|---|
| `v3-research-lab` | Patterns, standards for new pipeline + UI | Accepted |

## Standards
- TS strict; no `any` at data boundaries — every pack goes through a validator that throws readable errors (pattern: `lib/binpack.ts validatePack`, `lib/sweep.ts sanitizeFindings`).
- Zustand store for shared UI state; route ↔ store via `lib/route.ts` (`parseRoute`/`formatRoute`) only.
- CSS: tokens on `:root` + `[data-theme]`; no hard-coded colours in components.
- Python: each stage is a CLI with `--cache/--out`, deterministic seeds, writes a `manifest` dict into its output.
- Tests: every user-visible feature has a Playwright spec; fixture auto-fails on console errors.

## Authorship (set by the user, 2026-11-05)
- Commits are authored and committed as the user: `Jack J Burleson // LJM <exios4@protonmail.com>`, which GitHub links to the Exios66 account.
- No assistant attribution anywhere: no `Co-Authored-By` or session trailers in commit messages, no generated-by footers or session links in PR descriptions, issues, docs or code comments.
- Squash merges get a clean commit message written for the change, not the concatenated branch messages.
