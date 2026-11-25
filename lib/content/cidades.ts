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
  /** Foto de fundo do hero; o texto fica sobre uma camada escura. */
  capa?: string;
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
    capa: "/images/cidades/mateus-leme/vista-montanhas.webp",
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
      // Serviços informados pelo Igor em 25/11/2026; sem nome de marca de
      // propósito, porque envelhece rápido e sugere relação com a Avanz.
      {
        titulo: "Saúde e educação",
        texto: "UPA de Mateus Leme, Hospital Santa Terezinha, centros de saúde e clínicas. Escolas municipais, estaduais e particulares.",
      },
      {
        titulo: "Comércio",
        texto: "Supermercados locais e de rede, farmácias, lojas, agências bancárias e serviços do dia a dia, concentrados no centro da cidade.",
      },
      {
        titulo: "Quem compra aqui",
        texto: "Famílias que querem morar com mais tranquilidade sem perder o acesso à capital, e quem compra para investir, seja para revender no futuro ou para construir e alugar.",
      },
      {
        // IBGE, tabelas 1378 e 4709 (Censos 2010 e 2022), consultadas em 25/11/2026.
        // PIB fica de fora: valor nominal, sem descontar a inflação.
        titulo: "Crescimento",
        texto: "Entre os Censos de 2010 e 2022, a população de Mateus Leme passou de 27.856 para 37.841 habitantes, um crescimento de 36%. No mesmo período, Minas Gerais cresceu 5%. Fonte: IBGE.",
      },
    ],
    // Pergunta de financiamento direto com o loteador espera a resposta do Ivan
    // sobre "sem análise bancária". A dos loteamentos à venda é montada pela
    // página a partir dos empreendimentos da cidade; não repetir aqui.
    faq: [
      {
        q: "Quanto tempo leva de Mateus Leme até Belo Horizonte?",
        a: "Cerca de 1h30 de carro até o centro de BH, pela BR-262 ou pela BR-381.",
      },
      {
        q: "A cidade tem hospital e escolas?",
        a: "Sim. Mateus Leme tem a UPA, o Hospital Santa Terezinha, centros de saúde e clínicas, além de escolas municipais, estaduais e particulares.",
      },
      {
        q: "Para quem é indicado comprar lote em Mateus Leme?",
        a: "Para famílias que querem morar com mais tranquilidade sem perder o acesso à capital, e para quem compra para investir, seja para revender no futuro ou para construir e alugar.",
      },
      {
        q: "Mateus Leme está crescendo?",
        a: "Sim. Pelos Censos do IBGE, a população passou de 27.856 habitantes em 2010 para 37.841 em 2022, um crescimento de 36%. No mesmo período, Minas Gerais cresceu 5%.",
      },
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
