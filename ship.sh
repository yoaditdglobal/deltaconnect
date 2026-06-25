#!/bin/bash
# Ship a new version of the Delta Connect landing page.
#
# Usage:
#   ./ship.sh "exported-file.html"   # copies that file to index.html, then deploys
#   ./ship.sh                        # deploys whatever is already in index.html
set -e
cd "$(dirname "$0")"

if [ -n "$1" ]; then
  if [ ! -f "$1" ]; then
    echo "❌ File not found: $1"
    exit 1
  fi
  cp "$1" index.html
  echo "→ Using '$1' as the new index.html"
fi

git add -A
if git diff --cached --quiet; then
  echo "Nothing to ship — index.html is unchanged."
  exit 0
fi

git commit -q -m "Update landing page ($(date '+%Y-%m-%d %H:%M'))"
git push -q
echo "✅ Pushed to main. Netlify will deploy in ~1–2 minutes."
