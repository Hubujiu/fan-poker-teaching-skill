#!/usr/bin/env bash
set -euo pipefail

PORT="${PORT:-4173}"
python3 -m http.server "$PORT" >/tmp/fan-poker-http.log 2>&1 &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null || true' EXIT
sleep 1

BROWSER=""
for candidate in google-chrome google-chrome-stable chromium chromium-browser; do
  if command -v "$candidate" >/dev/null 2>&1; then
    BROWSER="$(command -v "$candidate")"
    break
  fi
done

if [[ -z "$BROWSER" ]]; then
  echo "No supported Chromium browser found" >&2
  exit 1
fi

"$BROWSER" \
  --headless=new \
  --no-sandbox \
  --disable-gpu \
  --disable-dev-shm-usage \
  --force-prefers-reduced-motion=reduce \
  --run-all-compositor-stages-before-draw \
  --virtual-time-budget=6000 \
  --dump-dom \
  "http://127.0.0.1:${PORT}/scripts/browser-smoke.html" \
  > /tmp/fan-poker-browser-smoke.html

cat /tmp/fan-poker-browser-smoke.html | grep -o '<pre id="result">[^<]*' || true
if ! grep -q 'data-smoke="passed"' /tmp/fan-poker-browser-smoke.html; then
  echo "Browser smoke test failed" >&2
  cat /tmp/fan-poker-browser-smoke.html >&2
  exit 1
fi

echo "Browser smoke test passed"
