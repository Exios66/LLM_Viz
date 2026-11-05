# Site review: live gh-pages build f8a3557 (2026-11-04)

**Reviewer:** senior engineer. **Scope:** the deployed site at https://exios66.github.io/LLM_Viz/, 12 routes at 1440×900 and 390×844, plus the dependency manifests on `main`.

## Method

- A Playwright crawl of every view, including both recorded models, a focused neuron, the hunt tab and the two new reports. For each page it recorded console errors and warnings, failed requests and HTTP status ≥ 400, page-level horizontal overflow, and took a screenshot.
- Elements past the right edge were listed at 390 px to find the cause.
- `npm audit` on `web/`, and `pip-audit` on `pipeline/requirements*.txt`.

## Findings

| # | Severity | Where | Finding | Status |
|---|---|---|---|---|
| 1 | Medium | every atlas view, phones narrower than about 410 px | The page scrolls sideways: by 16 px on TinyStories and Qwen3.5, and by 112 px on the EM model. There are three causes. (a) Below 1100 px the grid column is `1fr`, which cannot shrink below its widest child. (b) The header colour-mode switcher does not wrap; the EM model has 7 modes. (c) The model picker (up to 260 px wide) and three icon buttons do not fit 343 px, and the picker's inline `<label>` keeps `width: 100%` from working. The e2e tests missed this because they emulate a Pixel 7 (412 px) and do not visit recorded models. | Fixed |
| 2 | Low | `#/m/qwen3.5-0.8b/…?tab=hunt` | Every hunt tab requests `heretic.json`, which is not published until the Heretic study runs. The result is a 404 and a console error on every visit. | Fixed |
| 3 | Info | `#/atlas` (desktop) | Chromium logs "GPU stall due to ReadPixels" four times. This is not the site: no app code reads pixels (picking is a CPU ray test), and a bare WebGL page that only clears the canvas logs the same 4 warnings. Headless Chromium's software GL copies every WebGL frame back for compositing. | Not a bug |
| 4 | High (dev only) | `web/` dev dependencies | `npm audit`: vite ≤ 6.4.3 (high: the dev server answers cross-origin requests, and `server.fs.deny` can be bypassed), esbuild ≤ 0.24.2 (moderate, the same dev-server class), tsx 3.13–4.19.2 (moderate, via esbuild). | Fixed |
| 5 | Unknown | Dependabot | GitHub reports 18 alerts (1 high, 14 moderate, 3 low). Local audits find 3. This session cannot read the Dependabot alerts API. The likely gap is the floating lower bounds in `pipeline/requirements.txt` (`torch>=2.3`, `transformers>=4.40`): Dependabot matches advisories against the lowest version they allow, while `pip-audit` resolves to current releases and finds nothing. | Fixed; confirm after merge |

All desktop routes loaded without errors. Both reports render with their citations, and no page showed an error notice.

## Fixes (branch `site-review-fixes`)

- `web/src/styles.css`:
  - Below 1100 px, the grid column is `minmax(0, 1fr)`, and so is `.app.page`.
  - Below 640 px:
    - `.controls .seg` wraps, the same way as the sidebar switcher.
    - `.top-tools` takes the full row.
    - `.model-pick` is a flex container that shrinks, and its select fills it.
- `web/src/lib/recorded.ts`: the registry entry has a new `heretic` flag.
- `web/src/components/ModelInspector.tsx`: `useHeretic` fetches only when the flag is set.
- `pipeline/build_model.py`: the registry entry records `heretic: heretic.json exists`.
- `web/e2e/mobile.spec.ts`:
  - Adds the recorded-model routes: both models, plus a focused EM neuron.
  - Runs every overflow check at 375 px as well as the Pixel 7 width.
  - With the new tests and the old CSS, 6 checks fail. With the fix, all 17 mobile tests pass.

## Dependency fixes (second commit)

- `web/`:
  - vite 5.4.11 → 8.3.5 and @vitejs/plugin-react 4.3.4 → 6.2.1. vite 5 bundles esbuild 0.21, which no vite 5 release fixes.
  - tsx 4.19.2 → 4.23.15.
  - `vite.config.ts`: `manualChunks` is now a function, because Rolldown, which bundles for vite 8, drops the object form. three.js still gets its own chunk.
  - `npm audit` now reports 0 vulnerabilities, down from 3.
- `pipeline/requirements.txt`:
  - The floors rise from `torch>=2.3` to `>=2.13`, and from `transformers>=4.40` to `>=5.10`.
  - OSV lists 24 advisories for torch 2.3.0 and 44 for transformers 4.40.0. Those floors are what Dependabot checks, so they are the most likely source of the 15 alerts `npm audit` could not explain.
  - The new floors are the oldest releases with no advisories. The pipeline venv already runs torch 2.15.0 and transformers 5.22.1.

## Verification

- `npm test`: verify, the size budget and 82/82 Playwright tests pass on vite 8 (previously 71). The vite 8 dev server serves the app.
- `pipeline`: byte-compiles, and `reports.py` regenerates all 7 reports byte-identically.
- A local preview at 375 px shows no overflow; the picker ends 6 px before the link button. Desktop 1440 px is unchanged. The hunt tab makes no 404 request.
