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
  /** Só o tempo de carro, sem quilometragem (decisão do Igor, 23/11/2026). */
  tempoAteBH?: string;
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
    // Acessos e natureza confirmados pelo Igor em 25/11/2026.
    // Tempo até o centro de BH pelo Google Maps (23/11/2026).
    resumo:
      "Cidade da Região Metropolitana de Belo Horizonte, com clima de interior, a cerca de 1h30 de carro da capital.",
    tempoAteBH: "Cerca de 1h30 de carro",
    mapa: "Mateus Leme MG",
    sobre: [
      {
        titulo: "Acessos",
        texto: "MG-050 duplicada, com vias marginais e ligação com a BR-381, a BR-262 e o Anel Rodoviário de Belo Horizonte.",
      },
      {
        // Lagoas ficaram de fora: existem, mas não são pontos de lazer (Igor, 25/11/2026).
        // A Serra pode ser citada como atrativo da cidade; o cuidado registrado na
        // memória é não amarrar a marca de um empreendimento à imagem dela.
        titulo: "Natureza",
        texto: "A Serra do Elefante, Monumento Natural do município, tem mirante, trilhas e cachoeira. Aos pés da serra fica o Parque Ecológico Reserva da Serra.",
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
