import type { FAQItem } from "@/components/shared/FAQ";

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
  descricaoMeta?: string;
  localizacao?: {
    /** Texto buscado no Google Maps para o mapa embutido. */
    mapa?: string;
    distancias: { titulo: string; detalhe?: string }[];
  };
  infraestrutura?: string[];
  terreno?: string[];
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
    cidadeSlug: "mateus-leme",
    development: "Estrela do Sul",
    publicado: false,
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
