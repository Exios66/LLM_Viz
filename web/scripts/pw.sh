#!/usr/bin/env bash
# Run Playwright. Headless Firefox on Linux has no WebGL without a GPU, so on a Linux machine with no
# display, Firefox runs headed inside a virtual X server (xvfb-run) and draws with Mesa's software GL.
# Every other browser stays headless. Arguments go straight to `playwright test`.
set -euo pipefail
cd "$(dirname "$0")/.."
if [ "$(uname -s)" = Linux ] && [ -z "${DISPLAY:-}" ]; then
  if command -v xvfb-run >/dev/null 2>&1; then
    PW_FIREFOX_HEADED=1 exec xvfb-run -a -s "-screen 0 1920x1080x24" npx playwright test "$@"
  fi
  echo "xvfb-run not found: Firefox will run headless without WebGL and its map tests will fail (apt-get install xvfb)." >&2
fi
exec npx playwright test "$@"
