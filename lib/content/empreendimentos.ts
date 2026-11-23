import type { FAQItem } from "@/components/shared/FAQ";
import type { IconName } from "@/components/ui/Icon";

/**
 * Conteúdo editorial de cada empreendimento. Os lotes não ficam aqui: vêm da
 * carteira própria pela API, filtrados por `development`.
 *
 * Regras (combinadas com o comercial em 17/11/2026):
 * - infraestrutura lista só o que já existe no local; item faltante ou parcial
 *   não entra;
 * - condições mostram entrada, parcela e prazo, sem juros nem reajuste;
 * - campo vazio esconde a seção; nunca preencher com texto genérico.
 */
export type ItemFicha = { texto: string; icone: IconName };

export type Empreendimento = {
  slug: string;
  nome: string;
  cidade: string;
  /** Igual ao campo `development` dos imóveis na API, letra por letra. */
  development: string;
  /** Enquanto false, a página fica fora do sitemap e com noindex. */
  publicado: boolean;
  beneficio?: string;
  descricaoMeta?: string;
  localizacao?: {
    /** Texto buscado no Google Maps para o mapa embutido. */
    mapa?: string;
    distancias: { titulo: string; detalhe?: string }[];
  };
  infraestrutura?: ItemFicha[];
  terreno?: ItemFicha[];
  fotos?: { src: string; alt: string }[];
  condicoes?: {
    entrada?: string;
    parcelas?: string;
    prazo?: string;
    /** Data dos valores, exibida na nota. Obrigatória quando houver valores. */
    validoEm: string;
  };
  faq?: FAQItem[];
  links?: { label: string; href: string }[];
};

export const empreendimentos: Empreendimento[] = [
  {
    slug: "estrela-do-sul",
    nome: "Estrela do Sul",
    cidade: "Mateus Leme",
    development: "Estrela do Sul",
    publicado: false,
    // Conteúdo tirado da landing estrela-do-sul.avanzimoveis.com.br e confirmado
    // item a item com o Igor em 23/11/2026.
    beneficio:
      "Loteamento aberto em Mateus Leme, com lotes de 360 m² prontos para construir.",
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
    // Prazo total ainda sem informação: sem ele, a linha não aparece.
    // Atualizar `validoEm` sempre que os valores mudarem.
    condicoes: {
      entrada: "Em até 10x, a partir de R$ 800",
      parcelas: "A partir de R$ 800",
      validoEm: "23/11/2026",
    },
    faq: [
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
        a: "Sim. Depois de assinar o contrato, você já pode começar a obra. Antes, aprove o projeto da casa na Prefeitura de Mateus Leme.",
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
];

export function getEmpreendimento(slug: string): Empreendimento | undefined {
  return empreendimentos.find((e) => e.slug === slug);
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
