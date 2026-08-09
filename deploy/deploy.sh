# Production build for thavasi.coopercompass.com
#
# On the VPS this writes to /opt/thavasi-website/dist (nginx mounts it read-only).
# Locally it builds to ./dist in this repo.

#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

OUT_DIR="${1:-/opt/thavasi-website/dist}"
API_URL="${VITE_API_URL:-https://api.coopercompass.com}"

echo "==> Building thavasi-website for ${OUT_DIR}"
echo "    VITE_API_URL=${API_URL}"

npm ci
VITE_API_URL="$API_URL" npm run build

mkdir -p "$OUT_DIR"
rsync -a --delete dist/ "$OUT_DIR/"

echo "==> Landing build ready at ${OUT_DIR}"
echo "    Reload nginx if needed: cd /opt/claykicker/deploy && docker compose exec nginx nginx -s reload"
