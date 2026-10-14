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

## Mapa dos núcleos (sem API paga)
- Biblioteca **Leaflet** (open source, já no projeto). Os links "Como chegar" abrem o Google Maps por URL, sem API e sem chave.
- **Mapa base**:
  - **Com `PUBLIC_MAP_TILE_KEY`**: CARTO "Positron" (estilo claro, combina com o site). Gratuito para uso não comercial/ONG até 5 milhões de tiles por mês.
    - Pedir a chave em https://carto.com/basemaps/apikey/ (chega por e-mail, sem conta paga).
    - No painel (dashboard.basemaps.carto.com), restringir a chave ao domínio `institutoirmaosnogueira.com.br`.
  - **Sem chave**: OpenStreetMap, dessaturado por CSS para ficar no mesmo tom. Não exige cadastro.
  - Se a CARTO falhar (chave inválida, limite, fora do ar), o mapa troca sozinho para o OpenStreetMap.
- A chave é pública por natureza: tiles são pedidos pelo navegador. A proteção é a restrição de domínio, não o sigilo.
- Depois de pôr a chave no `.env`, rode `./scripts/deploy.sh` (ela entra no build).
- Atribuição "© OpenStreetMap © CARTO" fica visível no canto do mapa (obrigatória pelos termos).

## Homologação no Cloudflare Pages (antes da Hostinger)
O mesmo build roda no Pages, sem Docker e sem nginx. A configuração equivalente ao `deploy/nginx.conf` está em:
- `public/_headers`: segurança, CSP e cache. Domínios `*.pages.dev` recebem `X-Robots-Tag: noindex`, para a homologação não competir com o site oficial no Google.
- `public/_redirects`: 301 do WordPress (`/venha-fazer-parte/` → `/doar/` etc.).
- `.node-version` (Node 22) e `wrangler.toml`.

Os dois foram testados no runtime local do Cloudflare (`wrangler pages dev`): headers, CSP, cache, 301 e 404 iguais ao nginx.

### Opção A: conectado ao Git (recomendado; cada push gera um deploy)
1. Cloudflare → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → escolher o repositório.
2. Configurar o build:

   | Campo | Valor |
   |---|---|
   | Framework preset | Astro |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Branch de produção | `main` |

   Cada branch ou PR ganha uma URL de preview própria.
3. **Settings → Environment variables**: as mesmas `PUBLIC_*` do `.env`. Recomendações para a homologação:
   - `PUBLIC_GA_ID` vazio, para não misturar dados de teste no Analytics;
   - `PUBLIC_MAP_TILE_KEY`: a mesma chave da CARTO, com o domínio `*.pages.dev` incluído nas restrições da chave.
4. Para mudar uma variável é preciso um novo deploy: **Retry deployment** ou um push.

### Opção B: pela linha de comando
```bash
npx wrangler login
npm run build && npx wrangler pages deploy      # usa o wrangler.toml (projeto iin-site, pasta dist)
```

### Cuidados
- **PDFs da Transparência:** rode `sh scripts/baixar-pdfs-antigos.sh` e faça commit de `public/wp-content/`. Sem isso, os links dão 404 no Pages.
- **Restringir o acesso (opcional):** para só o cliente ver a homologação, use Cloudflare **Zero Trust → Access**, que é grátis até 50 pessoas. Proteja `*.iin-site.pages.dev` com login por e-mail.
- **Ida para a Hostinger:** nada muda no código. O `_headers` e o `_redirects` são ignorados pelo nginx (respondem 404).
