#!/usr/bin/env sh
# Baixa os PDFs de Transparência do WordPress atual para o mesmo caminho no novo site.
# Rode UMA vez, antes de desligar o site antigo:  sh scripts/baixar-pdfs-antigos.sh
set -e
DEST="public/wp-content/uploads/2022/07"
BASE="https://www.institutoirmaosnogueira.com.br/wp-content/uploads/2022/07"
mkdir -p "$DEST"
for f in ESTATUTO-SOCIAL-02042018.pdf ATA-NOMEACAO-20182021.pdf BALANCO-PATRIMONIAL.pdf \
         DEMONSTRACAO-DO-RESULTADO-DO-EXERCICIO.pdf DECLARACAO-ECF-2019.pdf RECIBO-ECF-2019.pdf; do
  echo "→ $f"; curl -fsSL "$BASE/$f" -o "$DEST/$f"
done
echo "OK. Faça commit da pasta $DEST."
