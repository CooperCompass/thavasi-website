#!/usr/bin/env bash
# Stop legacy CooperCompass / claykicker stacks on the VPS.
# Run ON THE VPS as a user with docker access (e.g. deploy).
#
#   sudo bash deploy/teardown-vps.sh
set -euo pipefail

echo "==> Stopping claykicker (clearmateai-v1) stack if present"
if [ -d /opt/claykicker/deploy ]; then
  (cd /opt/claykicker/deploy && docker compose down --remove-orphans) || true
fi

echo "==> Stopping legacy partial thavasi-website compose (api-only) if present"
if [ -d /opt/thavasi-website/deploy ]; then
  (cd /opt/thavasi-website/deploy && docker compose down --remove-orphans) || true
fi

echo "==> Removing claykicker containers by name prefix (if any remain)"
docker ps -a --format '{{.Names}}' | grep -E '^claykicker-' | xargs -r docker rm -f || true

echo "==> Removing thavasi-website containers by name prefix (if any remain)"
docker ps -a --format '{{.Names}}' | grep -E '^thavasi-website-' | xargs -r docker rm -f || true

echo "==> Current docker containers"
docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'

echo ""
echo "Done. Legacy stacks stopped."
echo "To deploy thavasi-website only:"
echo "  cd /opt/thavasi-website/deploy && cp .env.example .env && ./init-letsencrypt.sh && ./deploy.sh"
