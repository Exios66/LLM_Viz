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
