#!/usr/bin/env bash
# Deploy thavasi-website (landing + Caddy edge + Mongo).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env from .env.example — edit secrets if needed."
fi

echo "==> Building & starting thavasi-website"
docker compose up -d --build

echo "==> Status"
docker compose ps
echo "Landing: https://thavasi.coopercompass.com"
echo "App:     https://app.thavasi.coopercompass.com"
