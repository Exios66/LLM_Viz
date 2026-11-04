# Site review (2026-11-04)

Full report: `.10x/reviews/2026-11-04-site-review.md`.

## Decisions
- **Narrow-screen grid:** use `minmax(0, 1fr)` rather than `1fr` for single-column layouts. A bare `1fr` has an automatic minimum and grows to fit its widest child. This was the root cause; the other two fixes only remove the widest children.
- **Wrapping switchers:** a segmented control with more than about four options wraps on phones, using box-shadow dividers. The header now reuses the sidebar's pattern instead of a new one.
- **Optional data files:** they are declared in `models/index.json` (`hunt`, and now `heretic`), never probed with a fetch that might 404. Whatever publishes `heretic.json` must rebuild the registry (`build_model.py`) or set the flag.
- **Mobile tests:** run at 375 px as well as the Pixel 7, and include a recorded model. That model has the most header controls.

## Not changed
- WebGL ReadPixels stall warnings: picking reads one pixel per pointer move. Batching it is not worth the risk.
