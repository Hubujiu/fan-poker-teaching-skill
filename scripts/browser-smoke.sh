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

mkdir -p .github
python3 - <<'PY'
from html import unescape
from pathlib import Path
import re

body = Path('/tmp/fan-poker-browser-smoke.html').read_text(encoding='utf-8')
match = re.search(r'<pre id="result">(.*?)</pre>', body, re.S)
result = unescape(match.group(1).strip()) if match else '{"ok":false,"error":"result element not found"}'
Path('.github/browser-smoke-result.txt').write_text(result + '\n', encoding='utf-8')
print(result)
PY

if ! grep -q 'data-smoke="passed"' /tmp/fan-poker-browser-smoke.html; then
  echo "Browser smoke test failed" >&2
  exit 1
fi

echo "Browser smoke test passed"
