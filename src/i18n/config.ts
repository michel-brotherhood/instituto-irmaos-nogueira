/**
 * Idiomas do site. Português na raiz (mantém as URLs atuais e o SEO); inglês em /en/ e espanhol em /es/.
 * Os slugs são os mesmos nos três idiomas: o seletor troca só o prefixo.
 */
export const LANGS = ['pt', 'en', 'es'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'pt';
/** Idiomas com prefixo de URL (gera as rotas em src/pages/[lang]/). */
export const PREFIXED_LANGS = LANGS.filter((l) => l !== DEFAULT_LANG);

export const LANG_META: Record<Lang, { html: string; og: string; label: string; short: string }> = {
  pt: { html: 'pt-BR', og: 'pt_BR', label: 'Português', short: 'PT' },
  en: { html: 'en', og: 'en_US', label: 'English', short: 'EN' },
  es: { html: 'es', og: 'es_ES', label: 'Español', short: 'ES' },
};

export type L<T> = Record<Lang, T>;

export const isLang = (v: unknown): v is Lang => typeof v === 'string' && (LANGS as readonly string[]).includes(v);

/** Idioma a partir da URL (primeiro segmento). */
export function getLang(url: URL): Lang {
  const seg = url.pathname.split('/')[1];
  return isLang(seg) ? seg : DEFAULT_LANG;
}

/** Remove o prefixo de idioma: /en/doar/ → /doar/ */
export function stripLang(pathname: string): string {
  const seg = pathname.split('/')[1];
  if (isLang(seg) && seg !== DEFAULT_LANG) return pathname.slice(seg.length + 1) || '/';
  return pathname;
}

/** Caminho interno no idioma pedido: ('/doar/#pix', 'en') → '/en/doar/#pix'. Links externos passam direto. */
export function localizePath(path: string, lang: Lang): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  const clean = stripLang(path);
  return lang === DEFAULT_LANG ? clean : `/${lang}${clean}`;
}

/** Atalho para componentes: idioma da página atual + função de link localizado. */
export function i18n(url: URL) {
  const lang = getLang(url);
  return { lang, l: (path: string) => localizePath(path, lang) };
}

/** getStaticPaths para as rotas /[lang]/... */
export const langPaths = () => PREFIXED_LANGS.map((lang) => ({ params: { lang } }));
