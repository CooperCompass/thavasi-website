#!/usr/bin/env bash
# Build images and start the full thavasi-website stack.
set -euo pipefail
cd "$(dirname "$0")"

[ -f .env ] || { echo "deploy/.env missing — copy .env.example first."; exit 1; }

echo "==> Building images"
docker compose build

echo "==> Starting services"
docker compose up -d

echo "==> Status"
docker compose ps
echo "Deploy complete."
