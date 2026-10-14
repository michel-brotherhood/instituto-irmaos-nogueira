# Instituto Irmãos Nogueira — site

Site institucional estático em **Astro 5**: rápido, sem banco de dados, sem plugin para atualizar e sem superfície de ataque de CMS.
Servido por **nginx** em container. Deploy na VPS (Hostinger KVM 4, Ubuntu) via SSH + Docker Compose: veja **[DEPLOY.md](DEPLOY.md)**.

## Rodar localmente
```bash
npm ci
cp .env.example .env   # preencha o que já tiver
npm run dev            # http://localhost:4321
npm run build          # astro check + build em dist/
```

## Estrutura
```
src/
  data/site.ts        # dados institucionais, menu, links (lidos do .env)
  data/content.ts     # núcleos, linha do tempo, ODS, parceiros, fundadores, documentos
  components/         # Header, Footer, Button, PixCard, NucleoCard, PageHero, CtaBand...
  components/home/    # seções exclusivas da Home (hero 3D, manifesto com vídeo)
  pages/              # uma pasta por URL (mesmos endereços do site antigo)
  styles/global.css   # design system: tokens, botões, utilitários
public/
  media/              # vídeos, posters, logo 3D
  wp-content/uploads/ # PDFs antigos no MESMO caminho do WordPress (links antigos não quebram)
deploy/nginx.conf     # cache, gzip, cabeçalhos de segurança, redirecionamentos 301
```

### Editar conteúdo
- **Núcleos, linha do tempo, ODS, parceiros, documentos de transparência** → `src/data/content.ts`.
- **Contatos, redes, links de formulário/checkout, GA** → variáveis no `.env` (veja `.env.example`).
- Textos de cada página → `src/pages/<pagina>/index.astro`.
- Tudo marcado com a classe **`.ph`** (fundo amarelo) é conteúdo pendente. Para listar: `grep -rn 'class="ph"' src`.

## URLs (mantidas do WordPress → sem perda de SEO)
| Página | URL |
|---|---|
| Início | `/` |
| Quem somos | `/quem-somos/` |
| Compromisso | `/compromisso/` |
| Consciência Ambiental | `/ambiental/` |
| Projeto Escola da Vida | `/projetos-a-escola-da-vida/` |
| Núcleos | `/nucleos/` |
| Transparência | `/transparencia/` |
| Doação | `/doar/` (`/venha-fazer-parte/` → 301 para cá) |
| Empresas (nova) | `/empresas/` |
| Privacidade/LGPD (nova) | `/politica-de-privacidade/` |

Sitemap automático em `/sitemap-index.xml`; `robots.txt`, Open Graph e JSON-LD (NGO, Breadcrumb, locais dos núcleos) incluídos.

## Antes de publicar (uma vez)
1. **PDFs da transparência**: rode `sh scripts/baixar-pdfs-antigos.sh` *antes* de desligar o WordPress e faça commit de `public/wp-content/`.
2. Preencha o `.env` (vazio = usa os dados oficiais do site atual).

## Deploy
Veja **[DEPLOY.md](DEPLOY.md)**: `./scripts/deploy.sh` na VPS (build, sobe, healthcheck e rollback automático).

## Integrações (configuráveis, sem código)
| Recurso | Variável | Sem configurar |
|---|---|---|
| Doação por cartão/recorrente | `PUBLIC_DONATION_CHECKOUT_URL` (link do checkout Asaas/Mercado Pago/etc.) | mostra placeholder; PIX funciona |
| PIX | — | **funciona já**: QR Code e "Copia e Cola" gerados no navegador (BR Code oficial) com a chave CNPJ |
| Formulário de patrocínio | `PUBLIC_SPONSOR_FORM_ENDPOINT` (POST JSON — Formspree, n8n, CRM) | cai para `mailto:` se `PUBLIC_CONTACT_EMAIL` existir |
| Matrícula | `PUBLIC_SIGNUP_FORM_URL` | placeholder |
| Analytics | `PUBLIC_GA_ID` (GA4) | não carrega; com ID, só após consentimento (LGPD) |

Eventos enviados ao GA4: `donate_click`, `signup_click`, `sponsor_click`, `sponsor_lead`, `pix_copy_key`, `pix_copy_payload`, `video_play`.

## Idiomas (PT · EN · ES)
- **Português na raiz** (URLs do WordPress preservadas), **inglês em `/en/`** e **espanhol em `/es/`**, com os mesmos slugs (`/en/doar/`, `/es/nucleos/`…).
- SEO: `<html lang>`, `hreflang` (pt-BR, en, es, x-default) em todas as páginas e no sitemap, `og:locale` + alternates.
- **Seletor**: globo + sigla no header (desktop), controle PT · EN · ES no menu móvel; leva para a MESMA página no outro idioma.
- **Faixa de sugestão**: se o navegador do visitante está em outro idioma suportado, aparece uma faixa fina oferecendo a troca
  (decidida antes da pintura → sem salto de layout). Some ao escolher um idioma ou fechar (lembrado no navegador). Nunca redireciona sozinho.
- Onde editar textos:
  - Interface (menu, rodapé, botões, cookies, PIX, mapa): `src/i18n/ui.ts`
  - Dados estruturados (núcleos, linha do tempo, ODS, fundadores, documentos, números): `src/data/content.ts` (`TXT.pt/en/es`)
  - Cada página: objeto `COPY` no topo de `src/views/<Página>.astro`
  - Rotas: `src/pages/<slug>/index.astro` (PT) e `src/pages/[lang]/<slug>/index.astro` (EN/ES) só importam a view.
- Ícones ODS oficiais por idioma em `src/assets/ods/{pt,en,es}/`.
- Recomendação: revisão por falante nativo antes de divulgar EN/ES; a Política de Privacidade traduzida tem aviso de que a versão em português prevalece.

## Apoiadores e fotos
- **Logos oficiais** (enviados pelo Instituto) em `src/assets/parceiros/<slug>.webp`, na ordem do site atual (`PARCEIROS` em `src/data/content.ts`).
  Para incluir uma marca: salve `<slug>.webp|png|svg` na pasta e acrescente `{ slug, nome }` na lista. O tamanho visual é equalizado automaticamente.
- **Fotos reais** em `src/assets/img/`: `ambiental-itaquaquecetuba`, `escola-vida-jiu-jitsu`, `escola-vida-muay-thai`, `minotauro-criancas`.
- Mais fotos/banners do site atual: `bash scripts/importar-midias-site-antigo.sh` (baixa para `src/assets/img/site-antigo/` para curadoria).
- Uso de imagem de crianças: apenas com autorização escrita dos responsáveis (ver Transparência/LGPD).

## Logos, ícones e mapa
- **Ícones dos ODS**: originais da ONU em pt-BR/en/es (`src/assets/ods/<idioma>/`), sem alteração, com crédito às Nações Unidas Brasil.
- **Mapa** (`src/components/NucleosMap.astro`): Leaflet + base CARTO/OpenStreetMap (gratuito, sem chave), carregado sob demanda.
  Coordenadas em `geo` de cada núcleo em `src/data/content.ts`. Jacarezinho e Macaé estão marcados como **aproximados**
  (`aprox: true`) até o cliente confirmar endereço/CEP. Filtro por modalidade e lista lateral controlam o mapa.

## Qualidade (medido antes da entrega)
- Lighthouse mobile: Performance 91–99 · Acessibilidade 100 · Boas práticas 100 · SEO 100. Detalhes em `AUDITORIA.md`.
- Sem rolagem horizontal de 320 a 1920 px; um `<h1>` por página; contraste AA; alvos de toque ≥ 44 px.
- `prefers-reduced-motion` respeitado (3D, vídeo de fundo, faixa animada desligam).

## Pendências de conteúdo (cliente)
Fotos reais de cada núcleo + autorização de imagem · logo e logos de parceiros em SVG · confirmar foto de cada irmão ·
"100% gratuito" · endereço de Macaé · cidade do Luta Escola da Vida · contatos e redes · DPO (LGPD) e revisão jurídica ·
balanços 2023/2024 · valores de impacto da doação · validação dos ODS · vídeos em 1080p.
