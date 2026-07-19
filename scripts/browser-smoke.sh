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

run_smoke() {
  local page="$1"
  local marker="$2"
  local output="$3"
  local result_file="$4"

  "$BROWSER" \
    --headless=new \
    --no-sandbox \
    --disable-gpu \
    --disable-dev-shm-usage \
    --force-prefers-reduced-motion=reduce \
    --run-all-compositor-stages-before-draw \
    --virtual-time-budget=6000 \
    --dump-dom \
    "http://127.0.0.1:${PORT}/${page}" \
    > "$output"

  mkdir -p .github
  python3 - "$output" "$result_file" <<'PY'
from html import unescape
from pathlib import Path
import re
import sys

body = Path(sys.argv[1]).read_text(encoding="utf-8")
match = re.search(r'<pre id="result">(.*?)</pre>', body, re.S)
result = unescape(match.group(1).strip()) if match else '{"ok":false,"error":"result element not found"}'
Path(sys.argv[2]).write_text(result + "\n", encoding="utf-8")
print(result)
PY

  if ! grep -q "$marker" "$output"; then
    echo "Browser smoke test failed for $page" >&2
    exit 1
  fi
}

run_smoke \
  "scripts/browser-smoke.html" \
  'data-smoke="passed"' \
  /tmp/fan-poker-browser-smoke.html \
  .github/browser-smoke-result.txt

run_smoke \
  "scripts/style-isolation-smoke.html" \
  'data-style-smoke="passed"' \
  /tmp/fan-poker-style-isolation-smoke.html \
  .github/style-isolation-smoke-result.txt

echo "Browser smoke tests passed"
