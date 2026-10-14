import { localizePath, type Lang } from '../i18n/config';
import { t } from '../i18n/ui';
/** Dados institucionais e links configuráveis (via .env). */
const env = import.meta.env;
const clean = (v: string | undefined) => (v && v.trim() ? v.trim() : undefined);
/** .env tem prioridade; o segundo valor é o que está publicado hoje no site do Instituto (out/2026). */
const or = (v: string | undefined, fallback: string) => clean(v) ?? fallback;

export const SITE = {
  name: 'Instituto Irmãos Nogueira',
  shortName: 'IIN',
  url: 'https://www.institutoirmaosnogueira.com.br',
  description:
    'Jiu-Jitsu, Muay Thai e Boxe para crianças e jovens de comunidades e escolas públicas. Uma iniciativa de Rodrigo “Minotauro” e Rogério “Minotouro” Nogueira, desde 2010.',
  foundingYear: 2010,
  cnpj: '11.880.632/0001-03',
  cnpjDigits: '11880632000103',
  pix: { key: '11880632000103', keyLabel: '11.880.632/0001-03', merchantName: 'INSTITUTO IRMAOS NOGUEIRA', merchantCity: 'RIO DE JANEIRO' },
  bank: { name: 'Bradesco', agency: '01075', account: '0226996-1' },
  contact: {
    email: or(env.PUBLIC_CONTACT_EMAIL, 'contato@iinbrasil.org'),
    whatsapp: clean(env.PUBLIC_WHATSAPP),
    dpoEmail: clean(env.PUBLIC_DPO_EMAIL),
  },
  social: {
    instagram: or(env.PUBLIC_INSTAGRAM_URL, 'https://www.instagram.com/institutoirmaosnogueira/'),
    youtube: or(env.PUBLIC_YOUTUBE_URL, 'https://www.youtube.com/channel/UC4Ql5JKqNkdJLnNKd1fTtdg'),
    facebook: or(env.PUBLIC_FACEBOOK_URL, 'https://www.facebook.com/institutoIrmaosNogueiraOficial/'),
  },
  links: {
    signupForm: or(env.PUBLIC_SIGNUP_FORM_URL, 'https://docs.google.com/forms/d/e/1FAIpQLSdqQeM8ybk0vTVzLFpgkBk8q3THpZfLj43FKBO2TDHpKCT52g/viewform'),
    donationCheckout: clean(env.PUBLIC_DONATION_CHECKOUT_URL),
    sponsorEndpoint: clean(env.PUBLIC_SPONSOR_FORM_ENDPOINT),
    ead: 'https://ead-iin.com.br/',
    metodologia: 'https://ead-iin.com.br/registro-da-metodologia-iin/',
    portalTransparencia: 'https://portaldatransparencia.gov.br/busca?termo=11880632000103',
    portalTransparenciaHome: 'https://portaldatransparencia.gov.br',
    mapaOsc: 'https://mapaosc.ipea.gov.br',
  },
  gaId: clean(env.PUBLIC_GA_ID),
  /** Chave gratuita da CARTO (basemaps). Sem chave, o mapa usa OpenStreetMap. Ver DEPLOY.md › Mapa. */
  mapKey: clean(env.PUBLIC_MAP_TILE_KEY),
} as const;

export type NavItem = { label: string; href: string; children?: NavItem[] };

/** Menu principal no idioma pedido (links já com prefixo /en/ ou /es/). */
export function navFor(lang: Lang): NavItem[] {
  const n = t(lang).nav;
  const l = (p: string) => localizePath(p, lang);
  return [
    {
      label: n.institute,
      href: l('/quem-somos/'),
      children: [
        { label: n.about, href: l('/quem-somos/') },
        { label: n.commitment, href: l('/compromisso/') },
        { label: n.environment, href: l('/ambiental/') },
      ],
    },
    { label: n.project, href: l('/projetos-a-escola-da-vida/') },
    { label: n.centers, href: l('/nucleos/') },
    { label: n.transparency, href: l('/transparencia/') },
  ];
}
