// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.institutoirmaosnogueira.com.br',
  // Mantém o padrão de URL do WordPress atual (com barra final) para não perder SEO
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  compressHTML: true,
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      // Gera os <xhtml:link hreflang> entre as versões PT (raiz), /en/ e /es/
      i18n: { defaultLocale: 'pt', locales: { pt: 'pt-BR', en: 'en', es: 'es' } },
    }),
  ],
  image: { responsiveStyles: true },
});
