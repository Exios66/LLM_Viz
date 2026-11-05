#!/usr/bin/env bash
# Publish web/dist to the gh-pages branch. No GitHub Actions involved.
#   npm run deploy            (from web/)
# One-time: Settings → Pages → Source "Deploy from a branch" → gh-pages / (root).
set -euo pipefail
cd "$(dirname "$0")/.."
REPO_ROOT="$(git rev-parse --show-toplevel)"
SRC_SHA="$(git rev-parse --short HEAD)"
WORKTREE="$(mktemp -d)"
trap 'git -C "$REPO_ROOT" worktree remove --force "$WORKTREE" >/dev/null 2>&1 || true' EXIT

# the gh-pages commit is labelled with HEAD, so the build must be HEAD
if [ -n "$(git -C "$REPO_ROOT" status --porcelain)" ]; then
  echo "Uncommitted changes found. Commit or stash them before deploying." >&2
  exit 1
fi

# Release gate: verify, build, size budget and the whole Playwright suite, then the suite twice more against the
# same build. Three green runs in a row, or nothing is published.
RUNS="${RELEASE_RUNS:-3}"
if ! [[ "$RUNS" =~ ^[1-9][0-9]*$ ]]; then
  echo "RELEASE_RUNS must be a positive integer, got '$RUNS'." >&2
  exit 1
fi
export PW_FRESH_SERVER=1  # never test a server some other checkout left on the port
npm test
for i in $(seq 2 "$RUNS"); do
  echo "Release gate: Playwright run $i of $RUNS"
  npx playwright test
done
echo "Release gate passed: $RUNS green runs in a row."

git -C "$REPO_ROOT" fetch origin "+refs/heads/gh-pages:refs/remotes/origin/gh-pages" >/dev/null 2>&1 || true  # explicit refspec keeps origin/gh-pages current
if git -C "$REPO_ROOT" show-ref --verify --quiet refs/remotes/origin/gh-pages; then
  git -C "$REPO_ROOT" worktree add -B gh-pages "$WORKTREE" origin/gh-pages >/dev/null
else
  git -C "$REPO_ROOT" worktree add --detach "$WORKTREE" >/dev/null
  git -C "$WORKTREE" checkout --orphan gh-pages >/dev/null
fi

find "$WORKTREE" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -R dist/. "$WORKTREE/"
touch "$WORKTREE/.nojekyll"   # serve files as-is, no Jekyll processing

git -C "$WORKTREE" add -A
if git -C "$WORKTREE" diff --cached --quiet; then
  echo "gh-pages already matches this build."
  exit 0
fi
git -C "$WORKTREE" commit -q -m "Deploy ${SRC_SHA}"
git -C "$WORKTREE" push -u origin gh-pages
echo "Deployed ${SRC_SHA} to gh-pages."
