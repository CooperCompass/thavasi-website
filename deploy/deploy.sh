#!/usr/bin/env bash
# Deploy thavasi-website on this machine (run from repo root or deploy/).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env from .env.example — edit LANDING_URL / HOST_PORT if needed."
fi

echo "==> Building & starting thavasi-website"
docker compose up -d --build

echo "==> Status"
docker compose ps
echo "Health: curl -s http://127.0.0.1:${HOST_PORT:-80}/health"
