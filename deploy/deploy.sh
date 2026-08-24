#!/usr/bin/env bash
# Deploy thavasi-website (landing + Caddy edge). No database — early-access enquiries
# are forwarded to the Thavasi Scrutiny API, which owns them in PostgreSQL.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env from .env.example — edit secrets if needed."
fi

echo "==> Building & starting thavasi-website"
# --remove-orphans: the mongo service was removed from this compose file; without
# this flag its container lingers on the host after the database was retired.
docker compose up -d --build --remove-orphans

echo "==> Status"
docker compose ps
echo "Landing: https://thavasi.coopercompass.com"
echo "App:     https://app.thavasi.coopercompass.com"
