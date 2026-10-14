/** Textos de interface compartilhados (header, rodapé, botões, avisos). Textos de cada página ficam na própria view. */
import type { L } from './config';

const ui = {
  pt: {
    tagline: 'Formamos faixas-pretas na vida',
    siteDescription: 'Jiu-Jitsu, Muay Thai e Boxe para crianças e jovens de comunidades e escolas públicas. Uma iniciativa de Rodrigo “Minotauro” e Rogério “Minotouro” Nogueira, desde 2010.',
    skip: 'Pular para o conteúdo',
    home: 'página inicial',
    nav: {
      institute: 'O Instituto', about: 'Quem somos', commitment: 'Compromisso', environment: 'Consciência Ambiental',
      project: 'Projeto Escola da Vida', centers: 'Núcleos', transparency: 'Transparência', companies: 'Para empresas',
    },
    navMain: 'Principal', navMobile: 'Menu móvel', menu: 'Menu', openMenu: 'Abrir menu', closeMenu: 'Fechar menu',
    donateNow: 'Doar agora', donate: 'Doar', donatePix: 'Doar via PIX', signup: 'Inscrever', directions: 'Como chegar',
    newTab: '(abre em nova aba)', backToTop: 'Voltar ao topo',
    lang: { label: 'Idioma', choose: 'Escolha o idioma', suggest: 'Este site está disponível em português.', switch: 'Ver em português', dismiss: 'Fechar aviso' },
    footer: {
      about: 'Artes marciais como ferramenta de educação e transformação social, desde 2010.',
      institute: 'O Instituto', support: 'Apoie', contact: 'Contato', sponsor: 'Seja patrocinador', ead: 'Plataforma EAD',
      privacy: 'Privacidade e LGPD', cookies: 'Preferências de cookies', word: 'Faixa preta',
    },
    consent: {
      label: 'Preferências de cookies',
      text: 'Usamos cookies de medição para entender como o site é usado e melhorar a experiência. Sem anúncios e sem venda de dados.',
      more: 'Política de privacidade', deny: 'Recusar', accept: 'Aceitar',
    },
    nucleo: {
      open: 'Inscrições abertas', hours: 'Horários', hoursPh: '[dias e horários]', confirm: 'confirmar', zip: 'CEP',
      phone: 'Telefone', call: 'Ligar para o núcleo', approx: 'localização aproximada', see: 'Ver núcleo',
      mapArea: 'Área do mapa', mapLabel: 'Mapa interativo dos núcleos. Use a lista de núcleos para navegar pelo teclado.',
      mapLoading: 'Carregando mapa…', mapError: 'Não foi possível carregar o mapa. Use a lista de núcleos.', mapNoJs: 'O mapa precisa de JavaScript. Use a lista de núcleos.',
    },
    pix: {
      title: 'Doe agora via PIX', chip: 'Chave CNPJ', qr: 'QR Code PIX do Instituto Irmãos Nogueira', qrAmount: 'QR Code PIX para doar R$',
      keyLabel: 'Chave PIX (CNPJ)', copyKey: 'Copiar chave PIX', copyCode: 'Copiar código “PIX Copia e Cola”', copied: 'Copiado!',
      keyCopied: 'Chave PIX copiada.', codeCopied: 'Código PIX Copia e Cola copiado.', copyFail: 'Não foi possível copiar. Selecione e copie manualmente.',
      bank: 'Ou transferência', agency: 'Ag.', account: 'C/C',
    },
    partners: { label: 'Apoiadores e patrocinadores' },
    ods: { credit: 'Ícones oficiais dos Objetivos de Desenvolvimento Sustentável', un: 'Nações Unidas Brasil' },
    modalities: { 'Jiu-Jitsu': 'Jiu-Jitsu', 'Muay Thai': 'Muay Thai', Boxe: 'Boxe' } as Record<string, string>,
  },
  en: {
    tagline: 'Raising black belts for life',
    siteDescription: 'Jiu-Jitsu, Muay Thai and Boxing for children and young people from underserved communities and public schools. An initiative of Rodrigo “Minotauro” and Rogério “Minotouro” Nogueira since 2010.',
    skip: 'Skip to content',
    home: 'home page',
    nav: {
      institute: 'The Institute', about: 'About us', commitment: 'Our commitment', environment: 'Environmental awareness',
      project: 'Escola da Vida Project', centers: 'Training centers', transparency: 'Transparency', companies: 'For companies',
    },
    navMain: 'Main', navMobile: 'Mobile menu', menu: 'Menu', openMenu: 'Open menu', closeMenu: 'Close menu',
    donateNow: 'Donate now', donate: 'Donate', donatePix: 'Donate via PIX', signup: 'Sign up', directions: 'Directions',
    newTab: '(opens in a new tab)', backToTop: 'Back to top',
    lang: { label: 'Language', choose: 'Choose a language', suggest: 'This site is available in English.', switch: 'View in English', dismiss: 'Dismiss' },
    footer: {
      about: 'Martial arts as a tool for education and social change since 2010.',
      institute: 'The Institute', support: 'Support us', contact: 'Contact', sponsor: 'Become a sponsor', ead: 'Online learning platform',
      privacy: 'Privacy policy', cookies: 'Cookie preferences', word: 'Black belt',
    },
    consent: {
      label: 'Cookie preferences',
      text: 'We use analytics cookies to understand how the site is used and to improve it. No ads, and we never sell data.',
      more: 'Read our privacy policy', deny: 'Decline', accept: 'Accept',
    },
    nucleo: {
      open: 'Enrollment open', hours: 'Schedule', hoursPh: '[days and times]', confirm: 'to be confirmed', zip: 'Postal code',
      phone: 'Phone', call: 'Call the center', approx: 'approximate location', see: 'See center',
      mapArea: 'Map area', mapLabel: 'Interactive map of our training centers. Use the list of centers to navigate with a keyboard.',
      mapLoading: 'Loading map…', mapError: 'The map could not be loaded. Please use the list of centers.', mapNoJs: 'The map requires JavaScript. Please use the list of centers.',
    },
    pix: {
      title: 'Donate now via PIX', chip: 'CNPJ key', qr: 'PIX QR code for Instituto Irmãos Nogueira', qrAmount: 'PIX QR code to donate R$',
      keyLabel: 'PIX key (CNPJ)', copyKey: 'Copy PIX key', copyCode: 'Copy “PIX Copia e Cola” code', copied: 'Copied!',
      keyCopied: 'PIX key copied.', codeCopied: 'PIX Copia e Cola code copied.', copyFail: 'Could not copy. Please select and copy it manually.',
      bank: 'Or bank transfer (Brazil)', agency: 'Branch', account: 'Account',
    },
    partners: { label: 'Supporters and sponsors' },
    ods: { credit: 'Official Sustainable Development Goals icons', un: 'United Nations Brazil' },
    modalities: { 'Jiu-Jitsu': 'Jiu-Jitsu', 'Muay Thai': 'Muay Thai', Boxe: 'Boxing' } as Record<string, string>,
  },
  es: {
    tagline: 'Formamos cinturones negros para la vida',
    siteDescription: 'Jiu-Jitsu, Muay Thai y Boxeo para niños y jóvenes de comunidades vulnerables y escuelas públicas. Una iniciativa de Rodrigo “Minotauro” y Rogério “Minotouro” Nogueira desde 2010.',
    skip: 'Saltar al contenido',
    home: 'página de inicio',
    nav: {
      institute: 'El Instituto', about: 'Quiénes somos', commitment: 'Compromiso', environment: 'Conciencia ambiental',
      project: 'Proyecto Escola da Vida', centers: 'Centros', transparency: 'Transparencia', companies: 'Para empresas',
    },
    navMain: 'Principal', navMobile: 'Menú móvil', menu: 'Menú', openMenu: 'Abrir menú', closeMenu: 'Cerrar menú',
    donateNow: 'Donar ahora', donate: 'Donar', donatePix: 'Donar vía PIX', signup: 'Inscribirse', directions: 'Cómo llegar',
    newTab: '(se abre en una pestaña nueva)', backToTop: 'Volver arriba',
    lang: { label: 'Idioma', choose: 'Elige el idioma', suggest: 'Este sitio está disponible en español.', switch: 'Ver en español', dismiss: 'Cerrar aviso' },
    footer: {
      about: 'Artes marciales como herramienta de educación y transformación social desde 2010.',
      institute: 'El Instituto', support: 'Apóyanos', contact: 'Contacto', sponsor: 'Sé patrocinador', ead: 'Plataforma de formación en línea',
      privacy: 'Privacidad', cookies: 'Preferencias de cookies', word: 'Cinturón negro',
    },
    consent: {
      label: 'Preferencias de cookies',
      text: 'Usamos cookies de medición para entender cómo se usa el sitio y mejorarlo. Sin anuncios y sin venta de datos.',
      more: 'Política de privacidad', deny: 'Rechazar', accept: 'Aceptar',
    },
    nucleo: {
      open: 'Inscripciones abiertas', hours: 'Horarios', hoursPh: '[días y horarios]', confirm: 'por confirmar', zip: 'CP',
      phone: 'Teléfono', call: 'Llamar al centro', approx: 'ubicación aproximada', see: 'Ver centro',
      mapArea: 'Área del mapa', mapLabel: 'Mapa interactivo de los centros. Usa la lista de centros para navegar con el teclado.',
      mapLoading: 'Cargando mapa…', mapError: 'No se pudo cargar el mapa. Usa la lista de centros.', mapNoJs: 'El mapa necesita JavaScript. Usa la lista de centros.',
    },
    pix: {
      title: 'Dona ahora vía PIX', chip: 'Clave CNPJ', qr: 'Código QR PIX del Instituto Irmãos Nogueira', qrAmount: 'Código QR PIX para donar R$',
      keyLabel: 'Clave PIX (CNPJ)', copyKey: 'Copiar clave PIX', copyCode: 'Copiar código “PIX Copia e Cola”', copied: '¡Copiado!',
      keyCopied: 'Clave PIX copiada.', codeCopied: 'Código PIX Copia e Cola copiado.', copyFail: 'No se pudo copiar. Selecciónalo y cópialo manualmente.',
      bank: 'O transferencia bancaria (Brasil)', agency: 'Ag.', account: 'Cta.',
    },
    partners: { label: 'Aliados y patrocinadores' },
    ods: { credit: 'Íconos oficiales de los Objetivos de Desarrollo Sostenible', un: 'Naciones Unidas Brasil' },
    modalities: { 'Jiu-Jitsu': 'Jiu-Jitsu', 'Muay Thai': 'Muay Thai', Boxe: 'Boxeo' } as Record<string, string>,
  },
} satisfies L<unknown>;

export type UI = (typeof ui)['pt'];
export const t = (lang: keyof typeof ui): UI => ui[lang] as UI;
