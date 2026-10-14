# Auditoria UI · UX · Responsividade — outubro/2026

Escopo: 11 páginas × 6 larguras (320, 390, 768, 1024, 1440, 1920 px) = 66 renderizações, com Playwright e Lighthouse 12 no perfil mobile.

## Resultado
| Página | Perf. | Acess. | Boas práticas | SEO | CLS |
|---|---|---|---|---|---|
| Home | 92 | 100 | 100 | 100 | 0 |
| Núcleos (com mapa) | 99 | 100 | 96* | 100 | 0,019 |
| Empresas | 99 | 100 | 100 | 100 | 0 |
| Transparência | 97 | 100 | 100 | 100 | 0,01 |
| Quem somos | 99 | 100 | 100 | 100 | — |

\* Os tiles do mapa não carregam neste ambiente de teste (rede restrita). Em produção carregam e o item zera.
Os itens de cache e compressão vêm do servidor de teste local. O `deploy/nginx.conf` já resolve isso: gzip e cache de 1 ano em `/_astro/`.

## Corrigido nesta rodada
| Problema | Onde | Correção |
|---|---|---|
| Sem ícones dos ODS | Home, Empresas | Ícones oficiais da ONU em pt-BR, grade 4×2 (2 colunas no mobile) |
| Um ícone dos ODS sozinho na última linha (7+1) em desktop | Empresas | Grade fixa de 4 colunas |
| Botões do card de núcleo vazando 48 px em 1024 px | Núcleos | `auto-fit minmax(170px)` no lugar de media query de viewport |
| CLS 0,085 (filtro revelado por JS empurrava o mapa) | Núcleos | Espaço reservado (`visibility:hidden`) |
| Pins sobrepostos no zoom mobile (alvo de toque < 24 px) | Mapa | `zoomSnap 0.25`, padding menor no mobile, pin de 30 px |
| Zoom +/− do mapa com 30 px | Mapa | 44 × 44 px |
| Placeholder "[mapa interativo opcional]" | Núcleos | Mapa Leaflet real |
| Política sem menção ao serviço de mapa | Privacidade | Parágrafo sobre CARTO/OSM |

## Validado sem ressalvas
- Nenhuma rolagem horizontal em 66/66 renderizações.
- Exatamente um `<h1>` por página.
- Sem erros de JavaScript.
- Contraste AA.
- Mapa:
  - 7 pins;
  - o filtro por modalidade sincroniza (Boxe → 2 pins);
  - a lista lateral abre o popup e centraliza no pin;
  - a alternância Rio/Macaé funciona;
  - pins acessíveis por teclado;
  - o zoom pela roda do mouse só funciona depois de um clique, para não prender a rolagem da página.

## Aceito, por norma
- Links dentro de frases (créditos da ONU, "veja a seção Cookies") e a atribuição do mapa abaixo de 24 px: são exceção "inline" do WCAG 2.2 (critério 2.5.8).
- 6 PDFs de `/wp-content/uploads/2022/07/` dão 404 na prévia. Isso é esperado: eles vêm do site antigo via `scripts/baixar-pdfs-antigos.sh`.

## Depende do cliente
- ~~Logos dos parceiros~~ — recebidos e aplicados (19 marcas).
- Endereço/CEP de Jacarezinho e Macaé, hoje com pin aproximado e aviso no popup.

## Rodada UI/UX Pro Max (checklist por prioridade)
| Prioridade | Achado | Correção |
|---|---|---|
| 1 · Acessibilidade | Foco dos botões chanfrados só sublinhava o texto (o `clip-path` corta o outline) | Anel interno de 3 px (`--btn-ring`) visível em todas as variantes |
| 1 · Acessibilidade | Campos de formulário com foco só por cor de borda | Borda vermelha + halo de 3 px em `:focus-visible` |
| 1 · Acessibilidade | Vídeo sem anel de foco explícito | `video:focus-visible` com outline vermelho |
| 2 · Toque | Sem `touch-action: manipulation`; sem feedback ao pressionar | Aplicado em links e controles; botões com `scale(.98)` no toque (desligado em reduced-motion) |
| 5 · Layout | Celular deitado: faixa de fotos ocupava a tela e o texto ficava sobre os rostos | Layout lado a lado em paisagem; faixa limitada a 60svh |
| 5 · Layout | Menu em celular deitado (667×375) cortava 11 px | Menu em 2 colunas em telas baixas, sem rolagem |
| 6 · Tipografia | Textos corridos em 13–14,5 px (currículo, ODS, notas) | 15–16 px |

Resultado: Lighthouse Home 95/100/100/100, Doar 98/100/100/100, Empresas 98/100/100/100; 0 overflow em 66 renderizações + paisagem 844×390 e 667×375.

## Rodada 3 · Conteúdo do site atual + idiomas (out/2026)
| Item | Resultado |
|---|---|
| Conteúdo novo do site atual | Telefones por núcleo (Jacarezinho com 2), e-mail contato@iinbrasil.org, Google Form de inscrição, redes oficiais, 20 apoiadores mapeados |
| Português | Texto renderizado idêntico à versão anterior (diff automático), exceto placeholders resolvidos com dados reais |
| EN / ES | 30 páginas novas; varredura automática sem trechos esquecidos em PT; links internos no idioma correto |
| Responsividade | 124 renderizações (31 páginas × 4 larguras): 0 overflow, 0 erro de JS, 1 h1 por página |
| Bug encontrado e corrigido | Mapa usava o nome PT da região para separar Macaé → em EN/ES abria no estado inteiro com pins sobrepostos |
| Lighthouse (mobile) | / 95·100·100·100 · /en/ 91·100·100·100 · /es/doar/ 98·100·100·92→100 após correção do link "Learn more" |
