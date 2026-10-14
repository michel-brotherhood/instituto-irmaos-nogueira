#!/usr/bin/env bash
# Baixa do site atual (WordPress) as FOTOS e BANNERS publicados (os logos dos apoiadores já estão no projeto).
# Rode UMA vez, da raiz do projeto, numa máquina com acesso ao site:  bash scripts/importar-midias-site-antigo.sh
# - Fotos/banners vão para src/assets/img/site-antigo/ para curadoria (não entram no site sozinhos).
set -euo pipefail
BASE="https://www.institutoirmaosnogueira.com.br/wp-content/uploads"
ITEMS=(
  "2022/07/IMG_6847-1024x768.webp|src/assets/img/site-antigo/doacao-1.webp"
  "2022/07/IMG_1036-1024x768.webp|src/assets/img/site-antigo/doacao-2.webp"
  "2022/07/1920x1080banner2-1024x576.webp|src/assets/img/site-antigo/doacao-banner.webp"
  "2022/07/aa-1024x1024.webp|src/assets/img/site-antigo/fundador-minotauro.webp"
  "2022/07/aaa-1024x1024.webp|src/assets/img/site-antigo/fundador-minotouro.webp"
  "2026/05/desktop-2v2.webp|src/assets/img/site-antigo/banner-2026-desktop.webp"
  "2026/05/banner-mobile-new-v2.webp|src/assets/img/site-antigo/banner-2026-mobile.webp"
  "2024/04/1900x430_inscricoes-2.webp|src/assets/img/site-antigo/banner-inscricoes-desktop.webp"
  "2024/04/360x730_incricoes-2.webp|src/assets/img/site-antigo/banner-inscricoes-mobile.webp"
  "2023/09/1900x430_dia_arvore.webp|src/assets/img/site-antigo/banner-dia-arvore-desktop.webp"
  "2023/09/360x730_dia_arvore.webp|src/assets/img/site-antigo/banner-dia-arvore-mobile.webp"
)
ok=0; fail=0
mkdir -p src/assets/img/site-antigo
for it in "${ITEMS[@]}"; do
  src="${it%%|*}"; dst="${it##*|}"
  if curl -fsSL --retry 2 -o "$dst" "$BASE/$src"; then echo "✓ $dst"; ok=$((ok+1)); else echo "✗ $src"; rm -f "$dst"; fail=$((fail+1)); fi
done
echo; echo "Baixados: $ok · Falhas: $fail"
echo "Fotos em src/assets/img/site-antigo/ para curadoria (não entram no site sozinhas)."
