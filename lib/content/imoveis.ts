import type { Imovel } from "./types";

export const imoveis: Imovel[] = [
  {
    slug: "lote-aurora-mateus-leme",
    tipo: "Lote",
    bairro: "Aurora",
    cidade: "Mateus Leme",
    area: "360 m²",
    preco: "R$ 89.000",
    badge: "Novo",
    destaque: "Topografia plana",
    foto: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80&auto=format&fit=crop",
    resumo: "Lote plano, escriturado, financiamento próprio.",
    descricao:
      "Lote pronto para construir, com documentação regularizada e financiamento direto com a loteadora. A região vive expansão acelerada nos últimos três anos.",
    caracteristicas: [
      { label: "Área", value: "360 m²" },
      { label: "Topografia", value: "Plana" },
      { label: "Documentação", value: "Escriturado" },
      { label: "Financiamento", value: "Direto" },
    ],
  },
  {
    slug: "sitio-serra-azul-igarape",
    tipo: "Sítio",
    bairro: "Zona Rural",
    cidade: "Igarapé",
    area: "20.000 m²",
    preco: "R$ 380.000",
    badge: "Oportunidade",
    destaque: "Nascente própria",
    foto: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80&auto=format&fit=crop",
    resumo: "Sítio com nascente, pomar e casa simples.",
    descricao:
      "Propriedade rural com nascente própria, pomar formado, casa simples de 80 m² e curral. Acesso por estrada de terra em boas condições.",
    caracteristicas: [
      { label: "Área", value: "20.000 m² · 2 ha" },
      { label: "Água", value: "Nascente própria" },
      { label: "Benfeitorias", value: "Casa + pomar + curral" },
      { label: "Acesso", value: "Estrada de terra" },
    ],
  },
  {
    slug: "chacara-recanto-betim",
    tipo: "Chácara",
    bairro: "Recanto Verde",
    cidade: "Betim",
    area: "5.000 m²",
    preco: "R$ 240.000",
    badge: "Parceria",
    destaque: "Vista panorâmica",
    foto: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80&auto=format&fit=crop",
    resumo: "Chácara com vista, ideal para lazer ou moradia.",
    descricao:
      "Chácara de 5.000 m² em condomínio de chácaras, com vista panorâmica, água encanada e energia. Documentação 100% regularizada.",
    caracteristicas: [
      { label: "Área", value: "5.000 m²" },
      { label: "Infraestrutura", value: "Água + luz" },
      { label: "Condomínio", value: "Sim" },
      { label: "Documentação", value: "Regular" },
    ],
  },
  {
    slug: "lote-santa-clara-mateus-leme",
    tipo: "Lote",
    bairro: "Santa Clara",
    cidade: "Mateus Leme",
    area: "200 m²",
    preco: "R$ 62.000",
    destaque: "6 min do centro",
    foto: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80&auto=format&fit=crop",
    resumo: "Lote menor, ótimo para primeira casa.",
    descricao:
      "Lote em bairro residencial consolidado, a 6 minutos do centro. Excelente entrada para quem quer construir a primeira casa com financiamento.",
    caracteristicas: [
      { label: "Área", value: "200 m²" },
      { label: "Centro", value: "6 min" },
      { label: "Documentação", value: "Escriturado" },
      { label: "Financiamento", value: "Caixa / próprio" },
    ],
  },
  {
    slug: "lote-estrela-do-sul-mateus-leme",
    tipo: "Lote",
    bairro: "Estrela do Sul",
    cidade: "Mateus Leme",
    area: "360 m²",
    preco: "R$ 78.000",
    badge: "Destaque",
    destaque: "Loteamento entregue",
    foto: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80&auto=format&fit=crop",
    resumo: "Loteamento entregue, infraestrutura completa.",
    descricao:
      "Lote em loteamento já entregue, com asfalto, energia, água e rede pluvial. Parcelas a partir de R$ 700 direto com a loteadora.",
    caracteristicas: [
      { label: "Área", value: "360 m²" },
      { label: "Infraestrutura", value: "Asfalto + utilities" },
      { label: "Parcela", value: "A partir de R$ 700" },
      { label: "Documentação", value: "Escriturado" },
    ],
  },
  {
    slug: "chacara-cachoeira-contagem",
    tipo: "Chácara",
    bairro: "Petrópolis",
    cidade: "Contagem",
    area: "3.200 m²",
    preco: "R$ 195.000",
    destaque: "Próximo BH",
    foto: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80&auto=format&fit=crop",
    resumo: "Chácara perto de BH, acesso asfaltado.",
    descricao:
      "Chácara em região tranquila, com acesso 100% asfaltado. Próxima ao anel rodoviário, ideal para lazer de fim de semana.",
    caracteristicas: [
      { label: "Área", value: "3.200 m²" },
      { label: "Acesso", value: "Asfalto" },
      { label: "Distância BH", value: "≈ 25 min" },
      { label: "Infraestrutura", value: "Água + luz" },
    ],
  },
];

export function getImovel(slug: string): Imovel | undefined {
  return imoveis.find((i) => i.slug === slug);
}

export function getSimilares(slug: string, limit = 3): Imovel[] {
  const atual = getImovel(slug);
  if (!atual) return [];
  const outros = imoveis.filter((i) => i.slug !== slug);
  // Priority: same cidade → same tipo → any
  const mesmaCidade = outros.filter((i) => i.cidade === atual.cidade);
  const mesmoTipo = outros.filter(
    (i) => i.tipo === atual.tipo && i.cidade !== atual.cidade,
  );
  const resto = outros.filter(
    (i) => i.cidade !== atual.cidade && i.tipo !== atual.tipo,
  );
  return [...mesmaCidade, ...mesmoTipo, ...resto].slice(0, limit);
}
