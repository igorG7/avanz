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
