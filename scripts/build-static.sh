#!/usr/bin/env bash
# Builds the site as pure static HTML into ./out (for Cloudflare Pages).
# The leads API needs the sandbox runtime, so it is stashed for this build
# and restored afterwards. Forms fall back to a prefilled email on static hosting.
set -euo pipefail
cd "$(dirname "$0")/.."

export NEXT_TELEMETRY_DISABLED=1
export STATIC_EXPORT=1

API_DIR="src/app/api"
STASH=".api-stash"

restore() {
  if [ -d "$STASH" ]; then
    mv "$STASH" "$API_DIR"
  fi
}
trap restore EXIT

rm -rf "$STASH" out
if [ -d "$API_DIR" ]; then
  mv "$API_DIR" "$STASH"
fi

npx next build
echo "Static build complete -> ./out"
