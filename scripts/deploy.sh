#!/usr/bin/env bash
# Deploy na VPS (rodar via SSH, na pasta do projeto):  ./scripts/deploy.sh
# 1. Atualiza o código (git pull --ff-only)   2. Guarda a imagem atual como "previous" (rollback)
# 3. Builda a nova imagem                      4. Sobe o container e espera o healthcheck
# Se o healthcheck falhar, volta sozinho para a versão anterior.
set -euo pipefail
cd "$(dirname "$0")/.."

IMAGE=iin-site
# Lê HOST_PORT do .env ignorando comentário na mesma linha
PORT="$(grep -E '^HOST_PORT=' .env 2>/dev/null | cut -d= -f2 | sed -E 's/#.*//; s/[[:space:]]//g' || true)"; PORT="${PORT:-8080}"

[ -f .env ] || { echo "✗ Falta o .env (cp .env.example .env e preencha)"; exit 1; }

if [ "${1:-}" != "--no-pull" ] && [ -d .git ]; then
  echo "→ git pull"; git pull --ff-only
fi

# Mídias do site antigo (PDFs da Transparência) — baixa uma vez, se ainda não existirem
if [ ! -d public/wp-content/uploads ] && [ -x scripts/baixar-pdfs-antigos.sh ]; then
  echo "→ baixando PDFs do site antigo"; ./scripts/baixar-pdfs-antigos.sh || echo "  (aviso: PDFs não baixados — rode depois)"
fi

if docker image inspect "$IMAGE:latest" >/dev/null 2>&1; then
  docker tag "$IMAGE:latest" "$IMAGE:previous"
fi

echo "→ build"
docker compose build --pull
echo "→ subindo"
docker compose up -d --remove-orphans

echo -n "→ healthcheck"
for _ in $(seq 1 30); do
  if curl -fsS -o /dev/null "http://127.0.0.1:${PORT}/"; then
    echo " ✓"; docker image prune -f >/dev/null
    echo "✓ Deploy concluído: http://127.0.0.1:${PORT}/ ($(git rev-parse --short HEAD 2>/dev/null || echo sem-git))"
    exit 0
  fi
  echo -n "."; sleep 2
done

echo; echo "✗ Healthcheck falhou — voltando para a versão anterior"
docker compose logs --tail=50 web || true
./scripts/rollback.sh
exit 1
