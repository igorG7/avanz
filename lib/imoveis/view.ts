import type {
  PartnerUnit,
  Property,
  PropertyStatus,
  PropertyType,
  Topography,
} from "@/lib/api/types";

export const TIPO_LABEL: Record<PropertyType, string> = {
  lote: "Lote",
  chacara: "Chácara",
  sitio: "Sítio",
  casa: "Casa",
  apartamento: "Apartamento",
};

export const STATUS_LABEL: Record<PropertyStatus, string> = {
  disponivel: "Disponível",
  reservado: "Reservado",
  vendido: "Vendido",
};

export const TOPOGRAFIA_LABEL: Record<Topography, string> = {
  plano: "Plano",
  aclive: "Aclive",
  declive: "Declive",
  irregular: "Irregular",
};

const precoFmt = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

const numeroFmt = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 });

export const SOB_CONSULTA = "Sob consulta";

export function formatMoeda(value: number): string {
  return precoFmt.format(value);
}

/**
 * Preço de venda: ausente, inválido ou zerado vira "sob consulta". Um imóvel
 * anunciado por R$ 0 é cadastro incompleto, não oportunidade.
 */
export function formatPreco(value?: number): string {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    return SOB_CONSULTA;
  }
  return formatMoeda(value);
}

export function formatArea(value?: number): string | undefined {
  if (typeof value !== "number" || Number.isNaN(value)) return undefined;
  return `${numeroFmt.format(value)} m²`;
}

const MINUSCULAS = new Set([
  "de",
  "da",
  "do",
  "das",
  "dos",
  "e",
  "em",
  "no",
  "na",
]);

/** A origem do parceiro entrega tudo em caixa alta ("VALE DAS ACÁCIAS"). */
export function titleCase(input: string): string {
  return input
    .toLocaleLowerCase("pt-BR")
    .split(/(\s+)/)
    .map((part) => {
      if (!part.trim()) return part;
      if (MINUSCULAS.has(part)) return part;
      return part.charAt(0).toLocaleUpperCase("pt-BR") + part.slice(1);
    })
    .join("")
    .replace(/^./, (c) => c.toLocaleUpperCase("pt-BR"));
}

export type Carteira = "propria" | "parceiros";

export type ImovelCardVM = {
  key: string;
  href: string;
  foto?: string;
  alt: string;
  badge?: string;
  eyebrow: string;
  titulo: string;
  meta?: string;
  preco: string;
  carteira: Carteira;
};

export function propertyToCard(p: Property): ImovelCardVM {
  const tipo = TIPO_LABEL[p.type] ?? p.type;
  const meta = [formatArea(p.area), p.topography && TOPOGRAFIA_LABEL[p.topography]]
    .filter(Boolean)
    .join(" · ");

  return {
    key: p.id,
    href: `/imoveis/${p.slug}`,
    foto: p.coverPhoto?.url ?? p.photos?.find((f) => f.cover)?.url ?? p.photos?.[0]?.url,
    alt: p.title,
    badge:
      p.status !== "disponivel"
        ? STATUS_LABEL[p.status]
        : p.featured
          ? "Destaque"
          : undefined,
    eyebrow: `${tipo} · ${p.district}, ${p.city}`,
    titulo: p.title,
    meta: meta || undefined,
    preco: formatPreco(p.price),
    carteira: "propria",
  };
}

/**
 * A origem do parceiro às vezes manda cidade ou bairro vazios; juntar sem
 * filtrar produziria "Lote · , " na tela.
 */
export function localizacaoParceiro(u: PartnerUnit): string {
  return [titleCase(u.district), titleCase(u.city)].filter(Boolean).join(", ");
}

export function partnerUnitToCard(u: PartnerUnit): ImovelCardVM {
  const local = localizacaoParceiro(u);
  // O título da origem repete o loteamento ("Lote 87 · Quadra 18 · VALE DAS
  // ACÁCIAS"), que já aparece no eyebrow do card.
  const loteQuadra = [u.lot && `Lote ${u.lot}`, u.block && `Quadra ${u.block}`]
    .filter(Boolean)
    .join(" · ");

  return {
    key: partnerKey(u),
    href: partnerHref(u.developmentCode, u.id),
    foto: [...u.photos].sort((a, b) => a.order - b.order)[0]?.url,
    alt: titleCase(u.title),
    badge: "Parceiro",
    eyebrow: local ? `Lote · ${local}` : "Lote",
    titulo: loteQuadra || titleCase(u.title),
    meta: undefined,
    preco: formatPreco(u.price),
    carteira: "parceiros",
  };
}

export type Caracteristica = { label: string; value: string };

export const NAO_INFORMADO = "Não informado";

type DetailSpec = { label: string; format: (v: unknown) => string | undefined };

const metros = (v: unknown) =>
  typeof v === "number" ? `${numeroFmt.format(v)} m` : undefined;
const metrosQuadrados = (v: unknown) =>
  typeof v === "number" ? formatArea(v) : undefined;
const texto = (v: unknown) =>
  typeof v === "string" && v.trim() ? v.trim() : undefined;
const lista = (v: unknown) =>
  Array.isArray(v) && v.length > 0 ? v.join(" · ") : undefined;
const inteiro = (v: unknown) => (typeof v === "number" ? String(v) : undefined);
const booleano = (v: unknown) =>
  typeof v === "boolean" ? (v ? "Sim" : "Não") : undefined;

/** Chaves de `details` por tipo, conforme CreatePropertyInput da API. */
const DETAIL_SPECS: Record<string, DetailSpec> = {
  frontage: { label: "Frente", format: metros },
  lotLength: { label: "Comprimento", format: metros },
  zoning: { label: "Zoneamento", format: texto },
  infrastructure: { label: "Infraestrutura", format: lista },
  builtArea: { label: "Área construída", format: metrosQuadrados },
  lotArea: { label: "Área do terreno", format: metrosQuadrados },
  water: { label: "Água", format: texto },
  energy: { label: "Energia", format: texto },
  amenities: { label: "Comodidades", format: lista },
  activity: { label: "Atividade", format: texto },
  suites: { label: "Suítes", format: inteiro },
  yearBuilt: { label: "Ano de construção", format: inteiro },
  floor: { label: "Andar", format: inteiro },
  condoFee: {
    label: "Condomínio",
    format: (v) => (typeof v === "number" ? formatMoeda(v) : undefined),
  },
  elevator: { label: "Elevador", format: booleano },
};

export function buildFichaTecnica(p: Property): Caracteristica[] {
  const ficha: Caracteristica[] = [];
  const push = (label: string, value?: string) => {
    if (value) ficha.push({ label, value });
  };

  push("Tipo", TIPO_LABEL[p.type] ?? p.type);
  push("Área", formatArea(p.area) ?? NAO_INFORMADO);
  push("Situação", STATUS_LABEL[p.status]);
  push(
    "Topografia",
    p.topography ? TOPOGRAFIA_LABEL[p.topography] : NAO_INFORMADO,
  );
  push("Lote", p.lot || NAO_INFORMADO);
  push("Quadra", p.block || NAO_INFORMADO);
  push("Loteamento", p.development || NAO_INFORMADO);
  if (typeof p.bedrooms === "number") push("Quartos", String(p.bedrooms));
  if (typeof p.bathrooms === "number") push("Banheiros", String(p.bathrooms));
  if (typeof p.parkingSpots === "number")
    push("Vagas", String(p.parkingSpots));

  for (const [key, raw] of Object.entries(p.details ?? {})) {
    const spec = DETAIL_SPECS[key];
    if (spec) push(spec.label, spec.format(raw));
  }

  return ficha;
}

/**
 * Mesma estrutura da ficha da carteira própria. A origem do parceiro não
 * entrega área, topografia nem situação, e esses campos ficam explícitos como
 * "não informado" em vez de sumirem — a ausência do dado é a informação.
 */
export function buildFichaParceiro(u: PartnerUnit): Caracteristica[] {
  return [
    { label: "Tipo", value: "Lote" },
    { label: "Área", value: NAO_INFORMADO },
    { label: "Situação", value: NAO_INFORMADO },
    { label: "Topografia", value: NAO_INFORMADO },
    { label: "Lote", value: u.lot || NAO_INFORMADO },
    { label: "Quadra", value: u.block || NAO_INFORMADO },
    { label: "Loteamento", value: titleCase(u.district) || NAO_INFORMADO },
  ];
}

/**
 * Referência usada nas mensagens de WhatsApp: lote, quadra e loteamento são o
 * que o consultor procura no sistema — id e slug não dizem nada no atendimento.
 * Cai para o identificador técnico quando o cadastro não tem esses campos.
 */
export function refAtendimento(
  partes: { lot?: string; block?: string; development?: string },
  fallback: string,
): string {
  const ref = [
    partes.lot && `Lote ${partes.lot}`,
    partes.block && `Quadra ${partes.block}`,
    partes.development,
  ]
    .filter(Boolean)
    .join(", ");
  return ref || fallback;
}

export function partnerKey(u: PartnerUnit): string {
  return `${u.developmentCode}-${u.id}`;
}

export function partnerHref(developmentCode: string, id: string): string {
  return `/imoveis/parceiro/${encodeURIComponent(developmentCode)}/${encodeURIComponent(id)}`;
}
