import type { FAQItem } from "@/components/shared/FAQ";
import { empreendimentos, type Empreendimento } from "./empreendimentos";

/**
 * Conteúdo da página de cidade. Ela só faz sentido com conteúdo próprio da
 * cidade: sem isso, vira cópia da página do empreendimento com outro nome.
 * Campo vazio esconde a seção; cada número precisa de fonte.
 */
export type Cidade = {
  /** Vai na URL como /lotes-em-<slug>. */
  slug: string;
  nome: string;
  /** Enquanto false, a página fica fora do sitemap, com noindex e sem link na home. */
  publicado: boolean;
  resumo?: string;
  distanciaBH?: string;
  descricaoMeta?: string;
  /** Texto buscado no Google Maps para o mapa embutido. */
  mapa?: string;
  sobre?: { titulo: string; texto: string }[];
  faq?: FAQItem[];
};

export const cidades: Cidade[] = [
  {
    slug: "mateus-leme",
    nome: "Mateus Leme",
    publicado: false,
    // Rascunho tirado da landing do Estrela do Sul em 23/11/2026.
    // Cada CONFIRMAR sai quando o item for validado; publicar só sem nenhum.
    // CONFIRMAR: distância de BH.
    resumo:
      "Cidade da Região Metropolitana de Belo Horizonte, com clima de interior e acesso direto à capital pela MG-050.",
    distanciaBH: "60 km",
    mapa: "Mateus Leme MG",
    sobre: [
      {
        titulo: "Acessos",
        texto: "MG-050 duplicada, com vias marginais e ligação com a BR-381, a BR-262 e o Anel Rodoviário de Belo Horizonte.",
      },
      {
        // CONFIRMAR: "lagoas na cidade" (a landing fala em quatro).
        titulo: "Natureza",
        texto: "Clima de interior, áreas verdes e lagoas na cidade, para quem quer morar com mais tranquilidade sem se afastar da capital.",
      },
      // Faltam: "Serviços" (escolas, saúde, comércio) e "Perfil de quem compra",
      // que o comercial conhece. "Crescimento" só com fonte.
    ],
  },
];

export function cidadePath(c: Cidade): string {
  return `/lotes-em-${c.slug}`;
}

export function getCidadePorSegmento(segmento: string): Cidade | undefined {
  return cidades.find((c) => `lotes-em-${c.slug}` === segmento);
}

export function cidadeDoEmpreendimento(emp: Empreendimento): Cidade | undefined {
  return cidades.find((c) => c.slug === emp.cidadeSlug);
}

/**
 * Página publicada só lista empreendimentos publicados, para não levar o
 * visitante a uma página com noindex. Em prévia (não publicada), lista todos.
 */
export function empreendimentosDaCidade(c: Cidade): Empreendimento[] {
  return empreendimentos.filter(
    (e) => e.cidadeSlug === c.slug && (e.publicado || !c.publicado),
  );
}

/** Mesma regra no sentido inverso: página publicada não aponta para prévia. */
export function cidadeVisivelPara(emp: Empreendimento): Cidade | undefined {
  const c = cidadeDoEmpreendimento(emp);
  return c && (c.publicado || !emp.publicado) ? c : undefined;
}
