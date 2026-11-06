# QA decisions

Principles that apply to every feature:

- A test fails on any uncaught page error or console error, unless the test names the error it expects.
- Tests are never skipped or disabled to get a green run. A failing test is a bug in the product or in the test, and is fixed.
- The release gate (`npm run deploy`) needs three green runs in a row of the whole suite on every Playwright project.
- axe checks markup only. It does not replace a screen-reader pass, which has not been done.

Features:

- [interaction-tests](interaction-tests.md): every-control sweep, behaviour tests, touch, axe on interactive states, Firefox and WebKit (2026-11-06).
