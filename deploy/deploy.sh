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

# Caddy bind-mounts a single FILE, and the rsync above replaces it rather than
# editing it in place — which creates a new inode. A bind mount follows the
# inode, not the path, so the running container keeps reading the old file and
# every Caddyfile change is silently ignored until something recreates it.
#
# That is not theoretical: the app upstream was renamed, the rename never
# reached the running proxy, and the site stayed up on a config that no longer
# existed in this repository until the next restart applied it and 502'd.
docker compose up -d --force-recreate caddy

echo "==> Status"
docker compose ps
echo "Landing: https://thavasi.coopercompass.com"
echo "App:     https://app.thavasi.coopercompass.com"
