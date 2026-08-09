#!/usr/bin/env bash
# First-time Let's Encrypt issuance for the landing domain.
#
#   ./init-letsencrypt.sh
#   STAGING=1 ./init-letsencrypt.sh
set -euo pipefail
cd "$(dirname "$0")"

[ -f .env ] || { echo "deploy/.env missing — copy .env.example and fill it."; exit 1; }
set -a; . ./.env; set +a

: "${DOMAIN:?set in .env}"
: "${LETSENCRYPT_EMAIL:?set in .env}"

STAGING_FLAG=""
[ "${STAGING:-0}" = "1" ] && STAGING_FLAG="--staging"

echo "==> Dummy cert for ${DOMAIN}"
docker compose run --rm --entrypoint sh certbot -c "
  mkdir -p /etc/letsencrypt/live/$DOMAIN &&
  openssl req -x509 -nodes -newkey rsa:2048 -days 1 \
    -keyout /etc/letsencrypt/live/$DOMAIN/privkey.pem \
    -out  /etc/letsencrypt/live/$DOMAIN/fullchain.pem \
    -subj '/CN=$DOMAIN'"

echo "==> Start nginx (ACME webroot on :80)"
docker compose build nginx
docker compose up -d nginx

echo "==> Remove dummy cert"
docker compose run --rm --entrypoint sh certbot -c "
  rm -rf /etc/letsencrypt/live/$DOMAIN /etc/letsencrypt/archive/$DOMAIN /etc/letsencrypt/renewal/$DOMAIN.conf"

echo "==> Request real certificate"
docker compose run --rm --entrypoint certbot certbot certonly --webroot -w /var/www/certbot \
  $STAGING_FLAG \
  --email "$LETSENCRYPT_EMAIL" --agree-tos --no-eff-email \
  -d "$DOMAIN"

echo "==> Reload nginx"
docker compose exec nginx nginx -s reload || docker compose up -d nginx
echo "Done."
