# Interaction tests (follow-up 3, 2026-11-06)

## What is covered

- `e2e/controls.spec.ts`: on 13 screens and states, presses every visible, enabled button, radio, checkbox and disclosure, one at a time, until none is left. Long lists are sampled (the first three rows). Each control is keyed by its region and accessible name, so the sweep survives re-renders. Behaviour tests then check results the sweep cannot see.
- `e2e/mobile.spec.ts`: touch taps on the map, the score chart, inspector tabs and edit section, and a recorded-model list (Pixel 7 project, `hasTouch`).
- `e2e/v3.spec.ts`: axe (WCAG 2 A/AA, 2.1 AA; serious and critical) on nine interactive states in both themes.
- `firefox` and `webkit` projects run the 18 tests tagged `@xb`.

## Decisions

- Firefox runs headed under Xvfb on display-less Linux (`scripts/pw.sh`). Headless Firefox there cannot create a WebGL context, so the map tests would only test the fallback screen, which other tests already cover. Prefs (`webgl.force-enabled`) and `LIBGL_ALWAYS_SOFTWARE` did not help; headed Firefox under Xvfb gets WebGL 2 on llvmpipe.
- Cross-browser coverage is a tagged subset, not the whole suite: screenshot baselines are Chromium-only, and perf budgets are measured on one engine.

## Bugs found and fixed

| Found by | Bug | Fix |
|---|---|---|
| axe, Contexts (dark) | Mid-strength token chips: light ink on a mid-teal fill, 3.3–3.8:1 | `tokenBg` keeps chips faint while they carry page ink and switches to a strong fill with dark ink at 0.6 (rose at -0.4) |
| axe, chart table | `.chart-table` scrolled but could not take focus | `tabIndex=0`, `role=region`, label |
| axe, EM atlas | `.insp-body` scrolled but could not take focus | same, in both inspectors; inset focus ring |
| touch, score chart | The tip appeared on tap and vanished on the `pointerleave` that follows a touch | clear on `pointerleave` only for mouse pointers |

## Not covered

Real GPU drivers, older browsers, screen readers, and Safari on iOS (WebKit desktop is the closest).
