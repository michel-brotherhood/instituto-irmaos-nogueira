#!/usr/bin/env bash
# Volta para a imagem anterior ao último deploy (guardada como iin-site:previous).
set -euo pipefail
cd "$(dirname "$0")/.."
IMAGE=iin-site
if ! docker image inspect "$IMAGE:previous" >/dev/null 2>&1; then
  echo "✗ Não há versão anterior guardada ($IMAGE:previous)."; exit 1
fi
docker tag "$IMAGE:previous" "$IMAGE:latest"
docker compose up -d --no-build --force-recreate
echo "✓ Rollback feito para a versão anterior."
