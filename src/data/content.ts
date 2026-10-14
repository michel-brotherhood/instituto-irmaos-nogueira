/**
 * Conteúdo estruturado do site em PT/EN/ES.
 * - Dados que não mudam por idioma (fotos, coordenadas, telefones, slugs) ficam uma vez só.
 * - Textos ficam em `TXT.pt / TXT.en / TXT.es` com a MESMA estrutura. Para editar, altere os três.
 * - As páginas leem via `getContent(lang)`.
 */
import type { Lang } from '../i18n/config';
import nucP2 from '../assets/img/nuc-p2.jpg';
import nucP32 from '../assets/img/nuc-p32.jpg';
import nucP62 from '../assets/img/nuc-p62.jpg';
import nucP77 from '../assets/img/nuc-p77.jpg';
import nucQ8 from '../assets/img/nuc-q8.jpg';
import fotoAula from '../assets/img/foto-aula.jpg';
import irmaoBranco from '../assets/img/irmao-branco-cut.png';
import irmaoPreto from '../assets/img/irmao-preto-cut.png';
import ambiental from '../assets/img/ambiental-itaquaquecetuba.jpg';
import ambientalMuda from '../assets/img/ambiental-muda.jpg';
import ambientalPlantio from '../assets/img/ambiental-plantio.jpg';
import ambientalTurma from '../assets/img/ambiental-turma.jpg';
import escolaJiuJitsu from '../assets/img/escola-vida-jiu-jitsu.jpg';
import escolaMuayThai from '../assets/img/escola-vida-muay-thai.jpg';
import minotauroCriancas from '../assets/img/minotauro-criancas.jpg';

export const IMG = { nucP2, nucP32, nucP62, nucP77, nucQ8, fotoAula, irmaoBranco, irmaoPreto, ambiental, ambientalMuda, ambientalPlantio, ambientalTurma, escolaJiuJitsu, escolaMuayThai, minotauroCriancas };

export type Modalidade = 'Jiu-Jitsu' | 'Muay Thai' | 'Boxe';
export type Telefone = { n: string; mod?: Modalidade };
export type Nucleo = {
  slug: string; nome: string; regiao: string; endereco: string; cep?: string;
  modalidades: Modalidade[]; foto: ImageMetadata; mapsQuery?: string; pendente?: boolean;
  /** Telefones publicados no site atual (out/2026). `mod` quando o número é de uma modalidade específica. */
  tel: Telefone[];
  /** Coordenadas para o mapa. `aprox` = posição aproximada (bairro/cidade), a confirmar. */
  geo: { lat: number; lng: number; aprox?: boolean };
};

/** Formata 21972702365 → (21) 97270-2365 */
export const fmtTel = (n: string) => n.replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3');

// ---------- Dados comuns a todos os idiomas ----------
type RegiaoKey = 'sul' | 'norte' | 'oeste' | 'nf';
const NUCLEOS_BASE: (Omit<Nucleo, 'regiao' | 'endereco'> & { reg: RegiaoKey; end: string; endPendente?: boolean })[] = [
  { slug: 'rocinha', nome: 'Rocinha', reg: 'sul', end: 'Travessa Esperança, 20 · Rocinha', cep: '22451-610', modalidades: ['Jiu-Jitsu'], foto: nucP2, mapsQuery: 'Travessa Esperança, 20, Rocinha, Rio de Janeiro', tel: [{ n: '21981874270' }], geo: { lat: -22.9922, lng: -43.2508 } },
  { slug: 'jacarezinho', nome: 'Jacarezinho', reg: 'norte', end: 'Praça da Concórdia, 2 · Jacarezinho', cep: '20940-130', modalidades: ['Jiu-Jitsu', 'Muay Thai'], foto: nucP77, mapsQuery: 'Praça da Concórdia, 2, Jacarezinho, Rio de Janeiro', tel: [{ n: '21972702365', mod: 'Jiu-Jitsu' }, { n: '21983146781', mod: 'Muay Thai' }], geo: { lat: -22.8869, lng: -43.2603, aprox: true } },
  { slug: 'penha', nome: 'Penha', reg: 'norte', end: 'Igreja da Penha, Largo da Penha, 19 · Penha', cep: '21070-560', modalidades: ['Jiu-Jitsu'], foto: nucP32, mapsQuery: 'Largo da Penha, 19, Penha, Rio de Janeiro', tel: [{ n: '21985152046' }], geo: { lat: -22.8427, lng: -43.2785 } },
  { slug: 'santa-cruz', nome: 'Santa Cruz', reg: 'oeste', end: 'Av. Eng. Gastão Rangel, 1135, loja A · Santa Cruz', cep: '23550-393', modalidades: ['Boxe'], foto: fotoAula, mapsQuery: 'Av. Engenheiro Gastão Rangel, 1135, Santa Cruz, Rio de Janeiro', tel: [{ n: '21964998950' }], geo: { lat: -22.9326, lng: -43.6823 } },
  { slug: 'realengo', nome: 'Realengo', reg: 'oeste', end: 'Rua Ocaibi, 7 · Realengo', cep: '21765-570', modalidades: ['Boxe'], foto: nucP62, mapsQuery: 'Rua Ocaibi, 7, Realengo, Rio de Janeiro', tel: [{ n: '21981874270' }], geo: { lat: -22.8978, lng: -43.4416 } },
  { slug: 'freguesia', nome: 'Freguesia', reg: 'oeste', end: 'R. Quintanilha, 162 · Freguesia (Jacarepaguá)', cep: '22763-007', modalidades: ['Jiu-Jitsu'], foto: nucQ8, mapsQuery: 'Rua Quintanilha, 162, Freguesia, Rio de Janeiro', tel: [{ n: '21981874270' }], geo: { lat: -22.9439, lng: -43.3525 } },
  { slug: 'macae', nome: 'Macaé', reg: 'nf', end: 'Macaé, RJ', endPendente: true, modalidades: ['Jiu-Jitsu', 'Muay Thai'], foto: nucP77, mapsQuery: 'Macaé, RJ', pendente: true, tel: [{ n: '21981874270' }], geo: { lat: -22.3708, lng: -41.7869, aprox: true } },
];

/** Apoiadores na ordem do site atual. Logos oficiais (enviados pelo Instituto) em `src/assets/parceiros/<slug>.webp`. */
export type Parceiro = { slug: string; nome: string; url?: string };
export const PARCEIROS: Parceiro[] = [
  { slug: 'lei-incentivo-esporte', nome: 'Lei de Incentivo ao Esporte' },
  { slug: 'ministerio-do-esporte', nome: 'Ministério do Esporte' },
  { slug: 'ministerio-cidadania', nome: 'Ministério da Cidadania' },
  { slug: 'light', nome: 'Light' },
  { slug: 'supergasbras', nome: 'Supergasbras' },
  { slug: 'governo-rj-esporte', nome: 'Secretaria de Esporte e Lazer do Governo do Estado do Rio de Janeiro' },
  { slug: 'prefeitura-itaquaquecetuba', nome: 'Prefeitura de Itaquaquecetuba' },
  { slug: 'prefeitura-rio', nome: 'Prefeitura do Rio de Janeiro' },
  { slug: 'enel', nome: 'Enel' },
  { slug: 'consulpaz-forcas-de-paz', nome: 'Consulpaz — Forças de Paz da ONU', url: 'http://consulpaz.org/' },
  { slug: 'consulpaz', nome: 'Consulpaz — Consulado da Paz e dos Direitos Humanos', url: 'http://consulpaz.org/' },
  { slug: 'tim', nome: 'TIM' },
  { slug: 'sky', nome: 'SKY' },
  { slug: 'iguardei', nome: 'iGuardei' },
  { slug: 'protege', nome: 'Grupo Protege' },
  { slug: 'combate', nome: 'Canal Combate' },
  { slug: 'minotauro-energy-drink', nome: 'Minotauro Energy Drink' },
  { slug: 'minotauro', nome: 'Minotauro' },
  { slug: 'inteligencia-educacional', nome: 'Inteligência Educacional' },
];

const ODS_BASE = [
  { n: '3', cor: '#4C9F38', fg: '#0B0B0B' }, { n: '4', cor: '#C5192D', fg: '#FFFFFF' }, { n: '10', cor: '#DD1367', fg: '#FFFFFF' },
  { n: '11', cor: '#FD9D24', fg: '#0B0B0B' }, { n: '13', cor: '#3F7E44', fg: '#FFFFFF' }, { n: '15', cor: '#56C02B', fg: '#0B0B0B' },
  { n: '16', cor: '#00689D', fg: '#FFFFFF' }, { n: '17', cor: '#19486A', fg: '#FFFFFF' },
];

const WP = '/wp-content/uploads/2022/07/';

// ---------- Textos por idioma ----------
const TXT = {
  pt: {
    regioes: { sul: 'Zona Sul', norte: 'Zona Norte', oeste: 'Zona Oeste', nf: 'Norte Fluminense' } as Record<RegiaoKey, string>,
    stats: [
      { n: '2010', t: 'Início do trabalho', d: 'voluntário dos Irmãos Nogueira' },
      { n: '+4.200', t: 'Alunos atendidos', d: 'em 3 anos e meio (2016–2020)' },
      { n: '+930', t: 'Crianças previstas', d: 'no Luta Escola da Vida' },
      { n: '7', t: 'Núcleos ativos', d: 'com inscrições abertas' },
      { n: '3', t: 'Modalidades', d: 'Jiu-Jitsu, Muay Thai e Boxe' },
    ],
    principios: ['Disciplina', 'Honestidade', 'Modéstia', 'Respeito', 'Autocontrole', 'Persistência'],
    compromissos: [
      'Viver os seis princípios da faixa preta: disciplina, honestidade, modéstia, respeito, autocontrole e persistência.',
      'Usar a arte marcial somente para o bem, de forma defensiva e positiva, para ajudar a mim mesmo e aos outros.',
      'Nunca agir de forma abusiva ou ofensiva.',
    ],
    timeline: [
      { ano: '2010', titulo: 'O começo', resumo: 'Começa o trabalho voluntário dos Irmãos Nogueira.', txt: 'Minotauro e Minotouro iniciam um trabalho voluntário com crianças e jovens.' },
      { ano: '2013', titulo: 'Primeiro projeto incentivado', resumo: 'Projeto via ICMS com TIM e Secretaria de Esporte do RJ: 500 alunos em 4 comunidades.', txt: 'Via ICMS, com patrocínio da TIM e da Secretaria de Esporte, Lazer e Juventude do RJ: 500 alunos em Manguinhos, Nova Iguaçu, Terreirão do Recreio e Vila Cruzeiro, até 2014.' },
      { ano: '2016', titulo: 'Escala', resumo: '+1.050 alunos por ano em 7 comunidades. Mais de 4.200 até 2020.', txt: 'Projeto pela Lei Pelé atende mais de 1.050 alunos por ano em Gramacho, Complexo do Alemão, Mangueira, Bangu, Terreirão, Nova Iguaçu e Vila Cruzeiro. Mais de 4.200 alunos em 3 anos e 6 meses, até março de 2020.' },
      { ano: '2021', titulo: 'Lei federal de incentivo', resumo: 'Lei federal de incentivo: +200 alunos na Arena 3 (Parque Olímpico) e Vila Olímpica do Mato Alto.', txt: 'Mais de 200 alunos na Arena 3 do Parque Olímpico da Barra e na Vila Olímpica do Mato Alto, com Grupo Protege e Secretaria Especial do Esporte.' },
      { ano: '2022', titulo: 'Novos territórios', resumo: 'Novos núcleos em Macaé e Maricá para 500 alunos, com patrocínio da ENEL.', txt: 'Implantação de núcleos em Macaé e Maricá para 500 alunos, via ICMS, com patrocínio da ENEL.' },
    ],
    ods: [
      { nome: 'Saúde e bem-estar', como: 'Esporte regular para crianças e jovens: corpo ativo, mente saudável.' },
      { nome: 'Educação de qualidade', como: 'Luta Escola da Vida: artes marciais dentro da rede municipal de ensino.' },
      { nome: 'Redução das desigualdades', como: 'Núcleos nas comunidades que mais precisam do Rio de Janeiro.' },
      { nome: 'Cidades e comunidades sustentáveis', como: 'Espaços esportivos como ponto de encontro e cidadania no território.' },
      { nome: 'Ação contra a mudança do clima', como: 'Ações de consciência ambiental com alunos e escolas parceiras.' },
      { nome: 'Vida terrestre', como: 'Plantio de mudas de espécies nativas para a biodiversidade.' },
      { nome: 'Paz, justiça e instituições eficazes', como: 'Os princípios da faixa preta: respeito, autocontrole e não violência.' },
      { nome: 'Parcerias e meios de implementação', como: 'Empresas e poder público unidos por meio das leis de incentivo.' },
    ],
    fundadores: [
      {
        bio: 'Considerado um dos maiores lutadores de MMA de todos os tempos, conhecido pelo comportamento exemplar dentro e fora dos ringues e octógonos.',
        cv: [
          'Começou cedo no judô.',
          'Aos 11 anos, foi atropelado por um caminhão: ficou em coma e passou um ano internado.',
          'Após o acidente, treinou boxe, jiu-jitsu, muay thai e wrestling.',
          'Campeão dos cinturões das maiores organizações de MMA: Rings, Pride e UFC.',
          'Membro do Hall da Fama do UFC.',
          'Embaixador do UFC no Brasil.',
          'Embaixador do Comitê Paralímpico Brasileiro.',
          'Comentarista dos canais Combate e SporTV.',
          'Empreendedor, ao lado do irmão, em uma rede de franquias.',
        ],
      },
      {
        bio: 'Natural de Vitória da Conquista (BA), trocou a advocacia pelo MMA e se tornou um dos nomes do esporte no mundo.',
        cv: [
          'Iniciou nas lutas pelo judô.',
          'Medalha de bronze no boxe nos Jogos Pan-Americanos do Rio de Janeiro, em 2007.',
          'Faixa-preta de jiu-jitsu.',
          'Advogado, trocou a carreira jurídica pelo MMA em 2001.',
          'Lutou nos maiores eventos do mundo, como Pride e UFC.',
          'Protagonizou contra Maurício Shogun uma luta citada entre as maiores da história do MMA.',
          'Lidera uma das maiores equipes de MMA do mundo.',
          'Empreendedor social.',
          'Empreendedor, ao lado do irmão, em uma rede de franquias no Brasil, em Dubai e nos EUA.',
        ],
      },
    ],
    documentos: [
      { id: 'recentes', titulo: 'Relatórios recentes', docs: [
        { t: 'Balanço patrimonial e DRE 2024', meta: 'Demonstrações financeiras' },
        { t: 'Balanço patrimonial e DRE 2023', meta: 'Demonstrações financeiras' },
        { t: 'Relatório anual de atividades 2024', meta: 'Alunos atendidos, núcleos e resultados' },
      ] },
      { id: 'metodologia', titulo: 'Metodologia', docs: [
        { t: 'Registro da Metodologia no Ministério da Cultura', meta: 'Livro digital · Plataforma EAD IIN', href: 'https://ead-iin.com.br/registro-da-metodologia-iin/', tipo: 'LIVRO', acao: 'Ler', externo: true },
      ] },
      { id: 'institucionais', titulo: 'Documentos institucionais', docs: [
        { t: 'Estatuto social', meta: 'Aprovado em 02/04/2018', href: `${WP}ESTATUTO-SOCIAL-02042018.pdf` },
        { t: 'Ata de nomeação da diretoria', meta: 'Mandato 2018–2021', href: `${WP}ATA-NOMEACAO-20182021.pdf` },
        { t: 'Ata de nomeação da diretoria atual', meta: 'Mandato vigente' },
      ] },
      { id: 'financeiro', titulo: 'Demonstrações financeiras', docs: [
        { t: 'Balanço patrimonial', meta: 'Documento contábil', href: `${WP}BALANCO-PATRIMONIAL.pdf` },
        { t: 'Demonstração do resultado do exercício', meta: 'Documento contábil', href: `${WP}DEMONSTRACAO-DO-RESULTADO-DO-EXERCICIO.pdf` },
        { t: 'Declaração ECF 2019', meta: 'Escrituração Contábil Fiscal', href: `${WP}DECLARACAO-ECF-2019.pdf` },
        { t: 'Recibo ECF 2019', meta: 'Escrituração Contábil Fiscal', href: `${WP}RECIBO-ECF-2019.pdf` },
      ] },
    ] as DocGroup[],
  },
  en: {
    regioes: { sul: 'South Zone', norte: 'North Zone', oeste: 'West Zone', nf: 'Northern Rio de Janeiro State' } as Record<RegiaoKey, string>,
    stats: [
      { n: '2010', t: 'Where it began', d: 'as the Nogueira brothers’ volunteer work' },
      { n: '4,200+', t: 'Students served', d: 'in three and a half years (2016–2020)' },
      { n: '930+', t: 'Children expected', d: 'in the Luta Escola da Vida program' },
      { n: '7', t: 'Active centers', d: 'with enrollment open' },
      { n: '3', t: 'Martial arts', d: 'Jiu-Jitsu, Muay Thai and Boxing' },
    ],
    principios: ['Discipline', 'Honesty', 'Modesty', 'Respect', 'Self-control', 'Perseverance'],
    compromissos: [
      'To live by the six principles of the black belt: discipline, honesty, modesty, respect, self-control and perseverance.',
      'To use martial arts only for good, defensively and positively, to help myself and others.',
      'To never act in an abusive or offensive way.',
    ],
    timeline: [
      { ano: '2010', titulo: 'The beginning', resumo: 'The Nogueira brothers start their volunteer work.', txt: 'Minotauro and Minotouro start volunteering with children and young people.' },
      { ano: '2013', titulo: 'First incentive-funded project', resumo: 'State tax-incentive (ICMS) project with TIM and the Rio de Janeiro State Sports Department: 500 students in 4 communities.', txt: 'Funded through the state ICMS tax-incentive law and sponsored by TIM and the Rio de Janeiro State Department of Sports, Leisure and Youth: 500 students in Manguinhos, Nova Iguaçu, Terreirão do Recreio and Vila Cruzeiro, through 2014.' },
      { ano: '2016', titulo: 'Scaling up', resumo: '1,050+ students a year in 7 communities. More than 4,200 by 2020.', txt: 'A project under the Lei Pelé agreement serves more than 1,050 students a year in Gramacho, Complexo do Alemão, Mangueira, Bangu, Terreirão, Nova Iguaçu and Vila Cruzeiro: more than 4,200 students over 3 years and 6 months, through March 2020.' },
      { ano: '2021', titulo: 'Federal incentive law', resumo: 'Federal Sports Incentive Law: 200+ students at Arena 3 (Olympic Park) and Vila Olímpica do Mato Alto.', txt: 'More than 200 students at Arena 3 in Barra Olympic Park and at Vila Olímpica do Mato Alto, with Grupo Protege and the Special Secretariat for Sports.' },
      { ano: '2022', titulo: 'New territories', resumo: 'New centers in Macaé and Maricá for 500 students, sponsored by ENEL.', txt: 'Two new centers in Macaé and Maricá for 500 students, funded through the state ICMS tax-incentive law and sponsored by ENEL.' },
    ],
    ods: [
      { nome: 'Good health and well-being', como: 'Regular sport for children and young people: an active body and a healthy mind.' },
      { nome: 'Quality education', como: 'Luta Escola da Vida: martial arts inside the municipal school system.' },
      { nome: 'Reduced inequalities', como: 'Training centers in the Rio de Janeiro communities that need them most.' },
      { nome: 'Sustainable cities and communities', como: 'Sports spaces as meeting points for citizenship in the neighborhood.' },
      { nome: 'Climate action', como: 'Environmental awareness activities with students and partner schools.' },
      { nome: 'Life on land', como: 'Planting native tree seedlings to support biodiversity.' },
      { nome: 'Peace, justice and strong institutions', como: 'The black belt principles: respect, self-control and non-violence.' },
      { nome: 'Partnerships for the goals', como: 'Companies and government working together through incentive laws.' },
    ],
    fundadores: [
      {
        bio: 'Regarded as one of the greatest MMA fighters of all time, known for his exemplary conduct inside and outside the ring and the octagon.',
        cv: [
          'Started judo at an early age.',
          'At age 11 he was hit by a truck: he was in a coma and spent a year in hospital.',
          'After the accident, he trained boxing, jiu-jitsu, muay thai and wrestling.',
          'Belt champion in the biggest MMA organizations: Rings, Pride and UFC.',
          'UFC Hall of Fame member.',
          'UFC ambassador in Brazil.',
          'Ambassador of the Brazilian Paralympic Committee.',
          'Commentator for the Combate and SporTV channels.',
          'Entrepreneur, alongside his brother, in a franchise network.',
        ],
      },
      {
        bio: 'Born in Vitória da Conquista, Bahia, he left a career in law for MMA and became one of the sport’s best-known names worldwide.',
        cv: [
          'Started fighting through judo.',
          'Boxing bronze medal at the 2007 Pan American Games in Rio de Janeiro.',
          'Jiu-jitsu black belt.',
          'A lawyer, he left his legal career for MMA in 2001.',
          'Fought in the biggest events in the world, such as Pride and UFC.',
          'His fight against Maurício Shogun is cited among the greatest in MMA history.',
          'Leads one of the largest MMA teams in the world.',
          'Social entrepreneur.',
          'Entrepreneur, alongside his brother, in a franchise network in Brazil, Dubai and the USA.',
        ],
      },
    ],
    documentos: [
      { id: 'recentes', titulo: 'Recent reports', docs: [
        { t: '2024 balance sheet and income statement', meta: 'Financial statements' },
        { t: '2023 balance sheet and income statement', meta: 'Financial statements' },
        { t: '2024 annual activity report', meta: 'Students served, centers and results' },
      ] },
      { id: 'metodologia', titulo: 'Methodology', docs: [
        { t: 'Methodology registered with the Ministry of Culture', meta: 'Digital book · IIN online platform (Portuguese)', href: 'https://ead-iin.com.br/registro-da-metodologia-iin/', tipo: 'BOOK', acao: 'Read', externo: true },
      ] },
      { id: 'institucionais', titulo: 'Institutional documents', docs: [
        { t: 'Bylaws', meta: 'Approved on 04/02/2018 · Portuguese', href: `${WP}ESTATUTO-SOCIAL-02042018.pdf` },
        { t: 'Board appointment minutes', meta: '2018–2021 term · Portuguese', href: `${WP}ATA-NOMEACAO-20182021.pdf` },
        { t: 'Current board appointment minutes', meta: 'Current term' },
      ] },
      { id: 'financeiro', titulo: 'Financial statements', docs: [
        { t: 'Balance sheet', meta: 'Accounting document · Portuguese', href: `${WP}BALANCO-PATRIMONIAL.pdf` },
        { t: 'Income statement', meta: 'Accounting document · Portuguese', href: `${WP}DEMONSTRACAO-DO-RESULTADO-DO-EXERCICIO.pdf` },
        { t: '2019 ECF tax filing', meta: 'Brazilian tax bookkeeping (ECF) · Portuguese', href: `${WP}DECLARACAO-ECF-2019.pdf` },
        { t: '2019 ECF filing receipt', meta: 'Brazilian tax bookkeeping (ECF) · Portuguese', href: `${WP}RECIBO-ECF-2019.pdf` },
      ] },
    ] as DocGroup[],
  },
  es: {
    regioes: { sul: 'Zona Sur', norte: 'Zona Norte', oeste: 'Zona Oeste', nf: 'Norte del estado de Río' } as Record<RegiaoKey, string>,
    stats: [
      { n: '2010', t: 'Inicio del trabajo', d: 'voluntario de los hermanos Nogueira' },
      { n: '+4.200', t: 'Alumnos atendidos', d: 'en tres años y medio (2016–2020)' },
      { n: '+930', t: 'Niños previstos', d: 'en Luta Escola da Vida' },
      { n: '7', t: 'Centros activos', d: 'con inscripciones abiertas' },
      { n: '3', t: 'Modalidades', d: 'Jiu-Jitsu, Muay Thai y Boxeo' },
    ],
    principios: ['Disciplina', 'Honestidad', 'Modestia', 'Respeto', 'Autocontrol', 'Perseverancia'],
    compromissos: [
      'Vivir los seis principios del cinturón negro: disciplina, honestidad, modestia, respeto, autocontrol y perseverancia.',
      'Usar el arte marcial solo para el bien, de forma defensiva y positiva, para ayudarme a mí mismo y a los demás.',
      'Nunca actuar de forma abusiva u ofensiva.',
    ],
    timeline: [
      { ano: '2010', titulo: 'El comienzo', resumo: 'Comienza el trabajo voluntario de los hermanos Nogueira.', txt: 'Minotauro y Minotouro inician un trabajo voluntario con niños y jóvenes.' },
      { ano: '2013', titulo: 'Primer proyecto con incentivo fiscal', resumo: 'Proyecto vía ICMS con TIM y la Secretaría de Deportes de Río: 500 alumnos en 4 comunidades.', txt: 'Mediante la ley estatal de incentivo fiscal (ICMS), con el patrocinio de TIM y de la Secretaría de Deportes, Ocio y Juventud del estado de Río de Janeiro: 500 alumnos en Manguinhos, Nova Iguaçu, Terreirão do Recreio y Vila Cruzeiro, hasta 2014.' },
      { ano: '2016', titulo: 'Crecimiento', resumo: 'Más de 1.050 alumnos al año en 7 comunidades. Más de 4.200 hasta 2020.', txt: 'Un proyecto por la Ley Pelé atiende a más de 1.050 alumnos al año en Gramacho, Complexo do Alemão, Mangueira, Bangu, Terreirão, Nova Iguaçu y Vila Cruzeiro: más de 4.200 alumnos en 3 años y 6 meses, hasta marzo de 2020.' },
      { ano: '2021', titulo: 'Ley federal de incentivo', resumo: 'Ley Federal de Incentivo al Deporte: más de 200 alumnos en la Arena 3 (Parque Olímpico) y la Vila Olímpica do Mato Alto.', txt: 'Más de 200 alumnos en la Arena 3 del Parque Olímpico de Barra y en la Vila Olímpica do Mato Alto, con Grupo Protege y la Secretaría Especial del Deporte.' },
      { ano: '2022', titulo: 'Nuevos territorios', resumo: 'Nuevos centros en Macaé y Maricá para 500 alumnos, con el patrocinio de ENEL.', txt: 'Implantación de centros en Macaé y Maricá para 500 alumnos, mediante la ley estatal de incentivo (ICMS), con el patrocinio de ENEL.' },
    ],
    ods: [
      { nome: 'Salud y bienestar', como: 'Deporte regular para niños y jóvenes: cuerpo activo, mente sana.' },
      { nome: 'Educación de calidad', como: 'Luta Escola da Vida: artes marciales dentro de la red municipal de enseñanza.' },
      { nome: 'Reducción de las desigualdades', como: 'Centros en las comunidades de Río de Janeiro que más lo necesitan.' },
      { nome: 'Ciudades y comunidades sostenibles', como: 'Espacios deportivos como punto de encuentro y ciudadanía en el barrio.' },
      { nome: 'Acción por el clima', como: 'Acciones de conciencia ambiental con alumnos y escuelas aliadas.' },
      { nome: 'Vida de ecosistemas terrestres', como: 'Plantación de plántulas de especies nativas para la biodiversidad.' },
      { nome: 'Paz, justicia e instituciones sólidas', como: 'Los principios del cinturón negro: respeto, autocontrol y no violencia.' },
      { nome: 'Alianzas para lograr los objetivos', como: 'Empresas y poder público unidos mediante las leyes de incentivo.' },
    ],
    fundadores: [
      {
        bio: 'Considerado uno de los mejores luchadores de MMA de todos los tiempos, conocido por su conducta ejemplar dentro y fuera del ring y del octágono.',
        cv: [
          'Empezó desde pequeño en el judo.',
          'A los 11 años lo atropelló un camión: estuvo en coma y pasó un año hospitalizado.',
          'Después del accidente entrenó boxeo, jiu-jitsu, muay thai y lucha libre.',
          'Campeón de las mayores organizaciones de MMA: Rings, Pride y UFC.',
          'Miembro del Salón de la Fama de UFC.',
          'Embajador de UFC en Brasil.',
          'Embajador del Comité Paralímpico Brasileño.',
          'Comentarista de los canales Combate y SporTV.',
          'Emprendedor, junto a su hermano, en una red de franquicias.',
        ],
      },
      {
        bio: 'Nacido en Vitória da Conquista (Bahía), dejó la abogacía por las MMA y se convirtió en uno de los nombres del deporte en el mundo.',
        cv: [
          'Se inició en las luchas con el judo.',
          'Medalla de bronce en boxeo en los Juegos Panamericanos de Río de Janeiro 2007.',
          'Cinturón negro de jiu-jitsu.',
          'Abogado, dejó la carrera jurídica por las MMA en 2001.',
          'Peleó en los mayores eventos del mundo, como Pride y UFC.',
          'Su pelea contra Maurício Shogun figura entre las más grandes de la historia de las MMA.',
          'Lidera uno de los mayores equipos de MMA del mundo.',
          'Emprendedor social.',
          'Emprendedor, junto a su hermano, en una red de franquicias en Brasil, Dubái y EE. UU.',
        ],
      },
    ],
    documentos: [
      { id: 'recentes', titulo: 'Informes recientes', docs: [
        { t: 'Balance general y estado de resultados 2024', meta: 'Estados financieros' },
        { t: 'Balance general y estado de resultados 2023', meta: 'Estados financieros' },
        { t: 'Informe anual de actividades 2024', meta: 'Alumnos atendidos, centros y resultados' },
      ] },
      { id: 'metodologia', titulo: 'Metodología', docs: [
        { t: 'Registro de la metodología en el Ministerio de Cultura', meta: 'Libro digital · Plataforma en línea IIN (en portugués)', href: 'https://ead-iin.com.br/registro-da-metodologia-iin/', tipo: 'LIBRO', acao: 'Leer', externo: true },
      ] },
      { id: 'institucionais', titulo: 'Documentos institucionales', docs: [
        { t: 'Estatuto social', meta: 'Aprobado el 02/04/2018 · En portugués', href: `${WP}ESTATUTO-SOCIAL-02042018.pdf` },
        { t: 'Acta de nombramiento de la junta directiva', meta: 'Mandato 2018–2021 · En portugués', href: `${WP}ATA-NOMEACAO-20182021.pdf` },
        { t: 'Acta de nombramiento de la junta directiva actual', meta: 'Mandato vigente' },
      ] },
      { id: 'financeiro', titulo: 'Estados financieros', docs: [
        { t: 'Balance general', meta: 'Documento contable · En portugués', href: `${WP}BALANCO-PATRIMONIAL.pdf` },
        { t: 'Estado de resultados del ejercicio', meta: 'Documento contable · En portugués', href: `${WP}DEMONSTRACAO-DO-RESULTADO-DO-EXERCICIO.pdf` },
        { t: 'Declaración ECF 2019', meta: 'Contabilidad fiscal brasileña (ECF) · En portugués', href: `${WP}DECLARACAO-ECF-2019.pdf` },
        { t: 'Recibo ECF 2019', meta: 'Contabilidad fiscal brasileña (ECF) · En portugués', href: `${WP}RECIBO-ECF-2019.pdf` },
      ] },
    ] as DocGroup[],
  },
};

export type Doc = { t: string; meta: string; href?: string; tipo?: string; acao?: string; externo?: boolean };
export type DocGroup = { id: string; titulo: string; docs: Doc[] };

/** Todo o conteúdo estruturado no idioma pedido. */
export function getContent(lang: Lang) {
  const x = TXT[lang];
  const NUCLEOS: Nucleo[] = NUCLEOS_BASE.map(({ reg, end, endPendente, ...n }) => ({
    ...n,
    regiao: x.regioes[reg],
    // endPendente: só a cidade é publicada (como no site antigo) até o cliente enviar o endereço
    endereco: end,
  }));
  return {
    STATS: x.stats,
    PRINCIPIOS: x.principios,
    COMPROMISSOS: x.compromissos,
    NUCLEOS,
    TIMELINE: x.timeline,
    ODS: ODS_BASE.map((o, i) => ({ ...o, ...x.ods[i] })),
    FUNDADORES: [
      { apelido: 'Minotauro', nome: 'Antônio Rodrigo Nogueira', foto: irmaoBranco, ...x.fundadores[0] },
      { apelido: 'Minotouro', nome: 'Antônio Rogério Correia Nogueira', foto: irmaoPreto, ...x.fundadores[1] },
    ],
    DOCUMENTOS: x.documentos,
    PARCEIROS,
  };
}
