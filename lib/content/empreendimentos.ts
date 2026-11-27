import type { FAQItem } from "@/components/shared/FAQ";
import type { IconName } from "@/components/ui/Icon";

/**
 * Conteúdo editorial de cada empreendimento. Os lotes não ficam aqui: vêm da
 * carteira própria pela API, filtrados por `development`.
 *
 * Regras (combinadas com o comercial em 17/11/2026):
 * - infraestrutura lista o que já existe no local; obra em andamento entra só
 *   com o estado escrito ("em implantação", "em construção"), para mostrar o
 *   bairro se desenvolvendo (Igor, 27/11/2026); o que não começou não entra;
 * - condições mostram entrada, parcela e prazo, sem juros nem reajuste;
 * - campo vazio esconde a seção; nunca preencher com texto genérico.
 */
export type ItemFicha = { texto: string; icone: IconName };

export type Empreendimento = {
  slug: string;
  nome: string;
  cidade: string;
  /** Slug da página de cidade (lib/content/cidades.ts) a que ele pertence. */
  cidadeSlug: string;
  /** Igual ao campo `development` dos imóveis na API, letra por letra. */
  development: string;
  /** Enquanto false, a página fica fora do sitemap e com noindex. */
  publicado: boolean;
  beneficio?: string;
  /** Foto de fundo do hero; o texto fica sobre uma camada escura. */
  capa?: string;
  descricaoMeta?: string;
  localizacao?: {
    /** Texto buscado no Google Maps para o mapa embutido. */
    mapa?: string;
    distancias: { titulo: string; detalhe?: string }[];
  };
  infraestrutura?: ItemFicha[];
  terreno?: ItemFicha[];
  fotos?: { src: string; alt: string }[];
  /** Vídeo de drone mostrado acima das fotos; HEVC é opcional e mais leve. */
  video?: { mp4: string; hevc?: string; poster: string };
  condicoes?: {
    entrada?: string;
    parcelas?: string;
    prazo?: string;
    /** Data dos valores, exibida na nota. Obrigatória quando houver valores. */
    validoEm: string;
  };
  faq?: FAQItem[];
  links?: { label: string; href: string }[];
  /** Escritura e registro do loteamento confirmados; só então a página da cidade o cita. */
  escrituraERegistro?: boolean;
};

export const empreendimentos: Empreendimento[] = [
  {
    slug: "estrela-do-sul",
    nome: "Estrela do Sul",
    cidade: "Mateus Leme",
    cidadeSlug: "mateus-leme",
    development: "Estrela do Sul",
    publicado: false,
    // Escritura e registro confirmados pelo Igor em 27/11/2026.
    escrituraERegistro: true,
    // Conteúdo tirado da landing estrela-do-sul.avanzimoveis.com.br e confirmado
    // item a item com o Igor em 23/11/2026.
    beneficio:
      "Loteamento aberto em Mateus Leme, com lotes de 360 m² prontos para construir.",
    capa: "/images/empreendimentos/estrela-do-sul/aereo-top-completo.webp",
    localizacao: {
      mapa: "Bairro Estrela do Sul, Mateus Leme MG",
      // Distâncias até o centro de cada cidade pelo Google Maps (23/11/2026).
      distancias: [
        {
          titulo: "10 a 15 minutos do centro de Mateus Leme",
          detalhe: "Cerca de 8 km pela LMG-821, até comércio, escolas e serviços.",
        },
        {
          titulo: "Cerca de 36 km de Betim",
          detalhe: "Pela BR-262 e Rodovia Newton Penido, cerca de 40 minutos.",
        },
        {
          titulo: "Cerca de 70 km de Belo Horizonte",
          detalhe: "Pela BR-262 ou BR-381, cerca de 1h30 de carro.",
        },
      ],
    },
    // Água: sem informação em 23/11/2026; entra só se já estiver encanada,
    // com o ícone "droplet".
    infraestrutura: [
      { texto: "Ruas calçadas", icone: "road" },
      { texto: "Energia Cemig", icone: "bolt" },
      { texto: "Internet por fibra óptica", icone: "wifi" },
    ],
    terreno: [
      { texto: "Lotes planos, em leve aclive e em aclive", icone: "mountain" },
      { texto: "Vista aberta", icone: "eye" },
      { texto: "Loteamento aberto, sem condomínio", icone: "map" },
    ],
    // Fotos do repo das landings (igorG7/avanz-imoveis). De fora: drone-poster
    // (marca d'água "movavi") e entrada-castelinho (placa com telefone e site
    // de terceiro, a confirmar).
    fotos: [
      {
        src: "/images/empreendimentos/estrela-do-sul/aereo-top-completo.webp",
        alt: "Vista aérea do loteamento Estrela do Sul, com as ruas abertas entre a vegetação",
      },
      {
        src: "/images/empreendimentos/estrela-do-sul/estrela-sul-1.webp",
        alt: "Rua calçada e lotes do Estrela do Sul, em Mateus Leme",
      },
      {
        src: "/images/empreendimentos/estrela-do-sul/estrela-sul-3.webp",
        alt: "Lote do Estrela do Sul entre pinheiros, com vista aberta",
      },
      {
        src: "/images/empreendimentos/estrela-do-sul/aereo-industrial.webp",
        alt: "Vista aérea do Estrela do Sul com a área industrial próxima",
      },
      {
        src: "/images/empreendimentos/estrela-do-sul/estrela-sul-2.webp",
        alt: "Ruas calçadas do Estrela do Sul com montanhas ao fundo",
      },
      {
        src: "/images/empreendimentos/estrela-do-sul/drone-industrial-2.webp",
        alt: "Quadras do Estrela do Sul vistas de cima, com as ruas calçadas",
      },
      {
        src: "/images/empreendimentos/estrela-do-sul/estrela-sul-5.webp",
        alt: "Lote plano do Estrela do Sul entre árvores",
      },
      {
        src: "/images/empreendimentos/estrela-do-sul/vista-montanhas.webp",
        alt: "Vista aérea da região do Estrela do Sul, com o vale e as montanhas de Mateus Leme",
      },
    ],
    // Prazo total ainda sem informação: sem ele, a linha não aparece.
    // Atualizar `validoEm` sempre que os valores mudarem.
    condicoes: {
      entrada: "Em até 10x, a partir de R$ 800",
      parcelas: "A partir de R$ 800",
      validoEm: "23/11/2026",
    },
    faq: [
      {
        // Confirmado pelo Igor em 27/11/2026: banco só entra no Minha Casa, Minha Vida.
        q: "Preciso de aprovação do banco para comprar?",
        a: "Não. O pagamento é feito direto com a loteadora, sem análise de banco. A aprovação bancária só é necessária em compras pelo Minha Casa, Minha Vida.",
      },
      {
        q: "Posso usar FGTS na compra do lote?",
        a: "Como o pagamento é feito direto com a loteadora, o FGTS não entra na compra do lote. Depois de quitar o lote, o FGTS pode ser usado na construção, junto com financiamento bancário. O consultor explica o seu caso.",
      },
      {
        q: "Quando a escritura sai no meu nome?",
        a: "Durante o pagamento, você assina um contrato particular de compra e venda. A escritura é transferida para o seu nome após a quitação total do lote.",
      },
      {
        q: "Tem taxa de condomínio?",
        a: "Não. O Estrela do Sul é um loteamento aberto, sem mensalidade de condomínio. O IPTU é cobrado pela Prefeitura de Mateus Leme conforme o tamanho do lote.",
      },
      {
        q: "Posso começar a construir logo após a compra?",
        a: "Sim. Depois de assinar o contrato, você já pode começar a obra.",
      },
      {
        q: "Os lotes perto da área industrial servem para negócio?",
        a: "A área industrial próxima está em desenvolvimento, e os lotes ao redor podem servir para galpão, comércio de bairro ou investimento. Confira o zoneamento na Prefeitura de Mateus Leme conforme a finalidade.",
      },
      {
        q: "Como funciona a visita?",
        a: "Agendamos pelo WhatsApp. Um consultor acompanha você até o lote, mostra a infraestrutura e a vizinhança e tira dúvidas no local, sem compromisso de compra.",
      },
    ],
  },
  {
    slug: "santa-clara",
    nome: "Santa Clara",
    cidade: "Mateus Leme",
    cidadeSlug: "mateus-leme",
    development: "Santa Clara",
    publicado: false,
    // "Escritura e registro em ordem", da landing; citado na página da cidade (Igor, 27/11/2026).
    escrituraERegistro: true,
    // Conteúdo tirado da landing santa-clara (igorG7/avanz-imoveis) e confirmado
    // item a item com o Igor em 27/11/2026. Ficou de fora o apelo de escassez
    // ("pré-lançamento", "apenas 20 unidades", "prioridade na escolha").
    beneficio:
      "Lotes de 180 a 200 m² no bairro Santa Clara, em Mateus Leme, com água, energia e fibra óptica.",
    capa: "/images/empreendimentos/santa-clara/santa-clara-12.webp",
    localizacao: {
      // Coordenadas do mapa da landing; o nome do bairro sozinho é ambíguo no Maps.
      mapa: "-19.989193,-44.403499",
      // Rotas do Google Maps enviadas pelo Igor em 27/11/2026, até o centro de cada cidade.
      distancias: [
        {
          titulo: "9 minutos do centro de Mateus Leme",
          detalhe: "Cerca de 3,3 km, até comércio, escolas e serviços.",
        },
        { titulo: "3 minutos da MG-050" },
        {
          titulo: "Cerca de 26 km de Betim",
          detalhe: "Pela BR-262 e Rodovia Newton Penido, cerca de 30 minutos.",
        },
        {
          titulo: "Cerca de 59 km de Belo Horizonte",
          detalhe: "Pela BR-381 e BR-262, cerca de 1h15 de carro.",
        },
      ],
    },
    infraestrutura: [
      { texto: "Água Copasa", icone: "droplet" },
      { texto: "Energia Cemig", icone: "bolt" },
      { texto: "Internet por fibra óptica", icone: "wifi" },
      { texto: "Posto de saúde e CRAS na região", icone: "shield" },
      { texto: "Rede de esgoto em implantação", icone: "check" },
      { texto: "Creche e escola em construção no bairro", icone: "building" },
    ],
    // Os lotes à venda hoje são de uma quadra com desnível: leve declive na rua
    // de cima e leve aclive na de baixo. "Planos" cobre lotes de outras quadras
    // que voltem à venda (Igor, 27/11/2026).
    terreno: [
      { texto: "Lotes em leve declive, em leve aclive e planos", icone: "mountain" },
      { texto: "Bairro residencial já ocupado, com comércio local", icone: "users" },
      { texto: "Bairro aberto, sem condomínio", icone: "map" },
    ],
    // Só fotos com o terreno já limpo e estaqueado. De fora: as de antes da
    // terraplanagem e o drone-poster original (marca d'água "movavi").
    fotos: [
      {
        src: "/images/empreendimentos/santa-clara/santa-clara-10.webp",
        alt: "Vista aérea dos lotes do Santa Clara demarcados, com as casas do bairro ao lado",
      },
      {
        src: "/images/empreendimentos/santa-clara/santa-clara-9.webp",
        alt: "Lotes do Santa Clara estaqueados junto à rua, com o bairro e as serras ao fundo",
      },
      {
        src: "/images/empreendimentos/santa-clara/santa-clara-13.webp",
        alt: "Lotes do Santa Clara vistos de perto, com a rua e as casas vizinhas",
      },
      {
        src: "/images/empreendimentos/santa-clara/santa-clara-11.webp",
        alt: "Detalhe aéreo da demarcação dos lotes do Santa Clara ao longo da rua",
      },
      {
        src: "/images/empreendimentos/santa-clara/santa-clara-14.webp",
        alt: "Quadra do Santa Clara com os lotes estaqueados e as moradias do bairro ao fundo",
      },
      {
        src: "/images/empreendimentos/santa-clara/santa-clara-15.webp",
        alt: "Divisas dos lotes do Santa Clara marcadas com estacas e arame",
      },
    ],
    video: {
      mp4: "/videos/empreendimentos/santa-clara/drone.mp4",
      hevc: "/videos/empreendimentos/santa-clara/drone-hevc.mp4",
      poster: "/images/empreendimentos/santa-clara/drone-poster.webp",
    },
    // Os lotes de esquina parcelam a entrada em até 5x; fica fora da página por
    // decisão comercial (17/09/2026) e o consultor informa no atendimento.
    condicoes: {
      entrada: "Em até 10x",
      parcelas: "De R$ 950 a R$ 1.350",
      validoEm: "27/11/2026",
    },
    faq: [
      {
        // Confirmado pelo Igor em 27/11/2026: banco só entra no Minha Casa, Minha Vida.
        q: "Preciso de aprovação do banco para comprar?",
        a: "Não. O pagamento é feito direto com a loteadora, sem análise de banco. A aprovação bancária só é necessária em compras pelo Minha Casa, Minha Vida.",
      },
      {
        q: "Posso usar FGTS na compra do lote?",
        a: "Como o pagamento é feito direto com a loteadora, o FGTS não entra na compra do lote. Depois de quitar o lote, o FGTS pode ser usado na construção, junto com financiamento bancário. O consultor explica o seu caso.",
      },
      {
        q: "Quando a escritura sai no meu nome?",
        a: "Durante o pagamento, você assina um contrato particular de compra e venda. A escritura é transferida para o seu nome após a quitação total do lote.",
      },
      {
        q: "Tem taxa de condomínio?",
        a: "Não. O Santa Clara é um bairro aberto, sem mensalidade de condomínio. O IPTU é cobrado pela Prefeitura de Mateus Leme conforme o tamanho do lote.",
      },
      {
        q: "Posso começar a construir logo após a compra?",
        a: "Sim. Depois de assinar o contrato, você já pode começar a obra.",
      },
      {
        q: "Como funciona a visita?",
        a: "Agendamos pelo WhatsApp. Um consultor acompanha você até o lote, mostra a infraestrutura e a vizinhança e tira dúvidas no local, sem compromisso de compra.",
      },
    ],
  },
];

export function getEmpreendimento(slug: string): Empreendimento | undefined {
  return empreendimentos.find((e) => e.slug === slug);
}

/** Para o link "Conheça o empreendimento" na página do lote: só os publicados. */
export function empreendimentoPublicadoDoLote(
  development?: string,
): Empreendimento | undefined {
  if (!development) return undefined;
  return empreendimentos.find((e) => e.publicado && e.development === development);
}

export const checklistCompraLote: { titulo: string; texto: string }[] = [
  {
    titulo: "Matrícula atualizada do lote",
    texto: "Peça a certidão de matrícula recente no cartório de registro de imóveis. Ela mostra quem é o dono e se há pendências sobre o lote.",
  },
  {
    titulo: "Registro do loteamento",
    texto: "Loteamento só pode vender lotes depois de registrado em cartório. Confira o número do registro e a aprovação da prefeitura.",
  },
  {
    titulo: "Débitos de IPTU",
    texto: "Consulte na prefeitura se há imposto em atraso. Débito do imóvel acompanha o lote, mesmo depois da venda.",
  },
  {
    titulo: "Contrato e condições por escrito",
    texto: "Valor, entrada, parcelas, prazo e regras de reajuste precisam estar no contrato. Leia tudo antes de assinar.",
  },
  {
    titulo: "Regras de construção",
    texto: "Verifique recuos, área mínima e o que o loteamento permite construir, para saber se o lote atende ao seu plano.",
  },
];
