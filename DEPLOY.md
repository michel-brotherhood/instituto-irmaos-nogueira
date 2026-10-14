# Deploy — Hostinger VPS KVM 4 (Ubuntu) via SSH + Docker Compose

## Resumo da arquitetura
| Item | Como é |
|---|---|
| Tipo de aplicação | Site **estático** (Astro gera HTML/CSS/JS no build) servido por **nginx** dentro de um container |
| Containers | `Dockerfile` multi-stage (Node 22 só no build → nginx 1.27-alpine) + `docker-compose.yml` |
| Banco de dados | **Nenhum.** Não usa SQL Server nem outro banco |
| Uploads / volumes | **Nenhum** volume persistente (só os certificados, se usar a opção com Caddy) |
| Variáveis | `.env` na raiz (fora do git). Só variáveis `PUBLIC_*`, **públicas**, usadas no build. Nenhum segredo em runtime |
| Porta | Container escuta só em `127.0.0.1:8080` (configurável em `HOST_PORT`). HTTPS fica no proxy reverso da VPS |
| Recursos | Runtime ~10 MB de RAM (limite de 128 MB / 0,5 CPU no compose). Build usa ~1 GB de RAM por ~1 min |
| Saída de rede no build | npm registry, Docker Hub e (uma vez) o site antigo para os PDFs |
| Estado a fazer backup | Nenhum na VPS. A fonte da verdade é o repositório git; a imagem é recriável |

## Pré-requisitos (uma vez)
```bash
# Docker Engine + plugin compose (Ubuntu)
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER   # sair e entrar no SSH de novo
docker compose version
```
DNS: registros **A** de `institutoirmaosnogueira.com.br` e `www` → IP da VPS (só na hora da virada, ver abaixo).

## Primeiro deploy
```bash
git clone <repo> /opt/iin-site && cd /opt/iin-site
cp .env.example .env && nano .env      # preencher o que tiver (vazio = usa os dados oficiais do site atual)
./scripts/deploy.sh                    # build + sobe + healthcheck (volta sozinho se falhar)
curl -I http://127.0.0.1:8080/         # deve responder 200
```

### Proxy reverso + HTTPS — escolha UM
**A) Já existe nginx na VPS** (recomendado se houver outros sistemas):
```bash
sudo cp deploy/host-nginx.conf /etc/nginx/sites-available/institutoirmaosnogueira.conf
sudo ln -s /etc/nginx/sites-available/institutoirmaosnogueira.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d institutoirmaosnogueira.com.br -d www.institutoirmaosnogueira.com.br
```
Usa Traefik ou Caddy? Aponte para `http://127.0.0.1:8080` com os mesmos domínios.

**B) VPS sem nada nas portas 80/443:** no `.env`, descomente
`COMPOSE_FILE=docker-compose.yml:deploy/compose.caddy.yml` e rode `./scripts/deploy.sh`.
O Caddy emite e renova o certificado sozinho.

## Atualizações
```bash
ssh usuario@vps 'cd /opt/iin-site && ./scripts/deploy.sh'
```
- `./scripts/rollback.sh` volta para a versão anterior em segundos (a imagem anterior fica guardada como `iin-site:previous`).
- Logs: `docker compose logs -f web`. Status: `docker compose ps`.

## Virada do site antigo → novo (ordem importa)
1. Com o **WordPress ainda no ar**, rode o primeiro deploy: o `deploy.sh` baixa os 6 PDFs da Transparência
   para `public/wp-content/uploads/2022/07/`. **Faça commit dessa pasta**: depois da virada, o site antigo não existe mais.
2. Teste o novo site pela porta local ou por um subdomínio de homologação.
3. Reduza o TTL do DNS para 300 s um dia antes; na virada, aponte os registros A para a VPS e emita o certificado.
4. Confira: `/`, `/en/`, `/es/`, `/doar/`, `/nucleos/`, um PDF da Transparência e o redirecionamento 301 `/venha-fazer-parte/` → `/doar/`.
5. No Google Search Console: enviar `https://www.institutoirmaosnogueira.com.br/sitemap-index.xml`.

## Segurança
- Container sem privilégios extras (`no-new-privileges`), sem portas públicas, logs com rotação (3 × 10 MB).
- Headers de segurança e CSP no `deploy/nginx.conf`.
- `.env` não entra no git nem na imagem (`.gitignore` / `.dockerignore`).
- Firewall recomendado: `ufw allow OpenSSH && ufw allow 80,443/tcp && ufw enable`. A porta 8080 não precisa de regra, porque só escuta em 127.0.0.1.
  Atenção: o Docker ignora o UFW para portas publicadas em 0.0.0.0. Por isso o compose publica só em 127.0.0.1.
