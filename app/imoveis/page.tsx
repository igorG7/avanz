import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FinalCTA } from "@/components/shared/FinalCTA";
import { WhatsAppFloating } from "@/components/layout/WhatsAppFloating";
import { Icon } from "@/components/ui/Icon";
import { CarteiraTabs } from "@/components/imoveis/CarteiraTabs";
import {
  FiltrosImoveis,
  OrdenarSelect,
  type FiltroOpcoes,
} from "@/components/imoveis/FiltrosImoveis";
import { ImovelCard } from "@/components/imoveis/ImovelCard";
import { Paginacao } from "@/components/imoveis/Paginacao";
import {
  getPartnerFilters,
  getPropertyFilters,
  listPartnerUnits,
  listProperties,
} from "@/lib/api/imoveis";
import type {
  PartnerSort,
  PropertySort,
  PropertyType,
} from "@/lib/api/types";
import {
  TIPO_LABEL,
  partnerUnitToCard,
  propertyToCard,
  titleCase,
  type Carteira,
  type ImovelCardVM,
} from "@/lib/imoveis/view";

export const metadata: Metadata = {
  title: "Imóveis disponíveis",
  description:
    "Lotes, sítios e chácaras da carteira própria da Avanz e da carteira de parceiros. Curadoria, financiamento próprio e atendimento humano.",
};

const PAGE_SIZE = 12;

const HIGHLIGHTS = [
  { icon: "sliders" as const, label: "Filtre por cidade, tipo e faixa" },
  { icon: "shield" as const, label: "Documentação verificada" },
  { icon: "whatsapp" as const, label: "Confirma direto no WhatsApp" },
];

const ORDENS_PROPRIA = [
  { value: "recent", label: "Mais recentes" },
  { value: "priceAsc", label: "Menor preço" },
  { value: "priceDesc", label: "Maior preço" },
  { value: "areaDesc", label: "Maior área" },
  { value: "areaAsc", label: "Menor área" },
];

const ORDENS_PARCEIRO = ORDENS_PROPRIA.filter((o) => !o.value.startsWith("area"));

const CHAVES = [
  "carteira",
  "tipo",
  "cidade",
  "loteamento",
  "precoMin",
  "precoMax",
  "areaMin",
  "areaMax",
  "ordem",
  "pagina",
] as const;

type SearchParams = Record<string, string | string[] | undefined>;

function normalizeQuery(raw: SearchParams): Record<string, string> {
  const query: Record<string, string> = {};
  for (const key of CHAVES) {
    const value = raw[key];
    const first = Array.isArray(value) ? value[0] : value;
    if (first) query[key] = first;
  }
  return query;
}

function ordemValida<T extends string>(
  value: string | undefined,
  permitidas: readonly { value: string }[],
): T | undefined {
  return permitidas.some((o) => o.value === value) && value !== "recent"
    ? (value as T)
    : undefined;
}

function num(value?: string): number | undefined {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

export default async function ImoveisPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const query = normalizeQuery(await searchParams);
  const carteira: Carteira =
    query.carteira === "parceiros" ? "parceiros" : "propria";
  const page = Math.max(1, num(query.pagina) ?? 1);

  const dados =
    carteira === "propria"
      ? await carregarPropria(query, page)
      : await carregarParceiros(query, page);

  return (
    <>
      <Header />
      <main>
        <section className="relative isolate overflow-hidden bg-navy text-white">
          <div aria-hidden className="hero-grid absolute inset-0 -z-10">
            <span
              className="hero-beam hero-beam-h"
              style={{ top: "128px", animationDuration: "7s" }}
            />
            <span
              className="hero-beam hero-beam-v"
              style={{
                left: "896px",
                animationDelay: "2.4s",
                animationDuration: "8s",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 0%, rgba(18,19,29,0.35) 70%, rgba(18,19,29,0.85) 100%)",
              }}
            />
          </div>

          <div className="container-content py-16 sm:py-20">
            <span className="eyebrow !text-orange-bright">Catálogo</span>
            <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
              Imóveis disponíveis na{" "}
              <span className="text-orange-bright">RMBH</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              Lotes, sítios e chácaras selecionados, da nossa carteira própria
              e da carteira dos nossos parceiros. Confirme disponibilidade pelo
              WhatsApp.
            </p>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/75">
              {HIGHLIGHTS.map((h) => (
                <li key={h.label} className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-orange-bright">
                    <Icon name={h.icon} size={14} />
                  </span>
                  {h.label}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-offwhite">
          <div className="container-content py-16 sm:py-20">
            <div className="mb-10 flex flex-col gap-4 border-b border-line pb-8 sm:flex-row sm:items-center sm:justify-between">
              <CarteiraTabs atual={carteira} />
              <p className="max-w-md text-sm leading-relaxed text-muted">
                {carteira === "propria"
                  ? "Imóveis da carteira própria Avanz, com ficha completa e documentação verificada."
                  : "Unidades do nosso parceiro J.Lemara, lidas ao vivo do acervo dele."}
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-10">
              <aside>
                <FiltrosImoveis
                  query={query}
                  opcoes={dados.opcoes}
                  loteamentoLabel={
                    carteira === "propria" ? "Loteamento" : "Loteamento parceiro"
                  }
                />
              </aside>

              <div>
                {dados.erro ? (
                  <div className="rounded-card border border-line bg-white p-10 text-center">
                    <h2 className="font-display text-lg font-semibold text-navy">
                      Não conseguimos carregar o catálogo agora
                    </h2>
                    <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
                      {dados.erro} Tente de novo em instantes ou fale direto com
                      um consultor, respondemos no WhatsApp.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                      <p className="text-sm text-muted">
                        {dados.total === 0
                          ? "Nenhum imóvel encontrado"
                          : dados.total === 1
                            ? "1 imóvel encontrado"
                            : `${dados.total} imóveis encontrados`}
                      </p>
                      {dados.total > 1 && (
                        <OrdenarSelect
                          query={query}
                          opcoes={
                            carteira === "propria"
                              ? ORDENS_PROPRIA
                              : ORDENS_PARCEIRO
                          }
                        />
                      )}
                    </div>

                    {dados.cards.length === 0 ? (
                      <div className="rounded-card border border-line bg-white p-10 text-center">
                        <p className="text-muted">
                          Nenhum imóvel bate com os filtros atuais nesta
                          carteira.
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                          {dados.cards.map((card) => (
                            <ImovelCard key={card.key} imovel={card} />
                          ))}
                        </div>
                        <Paginacao
                          query={query}
                          page={page}
                          limit={PAGE_SIZE}
                          total={dados.total}
                          hasMore={dados.hasMore}
                        />
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        <FinalCTA
          title="Não achou o que procura?"
          body="A gente faz a curadoria sob medida. Conta o que você busca e mostramos opções que fazem sentido."
          ctaLabel="Pedir opções no WhatsApp"
          ctaMessage="Olá! Vi os imóveis no site mas quero opções mais específicas. Pode me ajudar?"
        />
      </main>
      <Footer />
      <WhatsAppFloating />
    </>
  );
}

type Resultado = {
  cards: ImovelCardVM[];
  total: number;
  hasMore: boolean;
  opcoes: FiltroOpcoes;
  erro?: string;
};

async function carregarPropria(
  query: Record<string, string>,
  page: number,
): Promise<Resultado> {
  const [lista, filtros] = await Promise.all([
    listProperties({
      page,
      limit: PAGE_SIZE,
      type: query.tipo as PropertyType | undefined,
      city: query.cidade,
      development: query.loteamento,
      minPrice: num(query.precoMin),
      maxPrice: num(query.precoMax),
      minArea: num(query.areaMin),
      maxArea: num(query.areaMax),
      sort: ordemValida<PropertySort>(query.ordem, ORDENS_PROPRIA),
    }),
    getPropertyFilters(),
  ]);

  const opcoes: FiltroOpcoes = filtros.ok
    ? {
        tipos: filtros.data.types.map((t) => ({
          value: t.type,
          label: TIPO_LABEL[t.type] ?? t.type,
          count: t.count,
        })),
        cidades: filtros.data.cities.map((c) => ({
          value: c.name,
          label: c.name,
          count: c.count,
        })),
        loteamentos: filtros.data.developments.map((d) => ({
          value: d.name,
          label: d.name,
          cidade: d.city,
          count: d.count,
        })),
        precoRange: filtros.data.price,
        areaRange: filtros.data.area,
      }
    : { cidades: [], loteamentos: [], precoRange: null, areaRange: null };

  if (!lista.ok) {
    return { cards: [], total: 0, hasMore: false, opcoes, erro: lista.message };
  }

  return {
    cards: lista.data.items.map(propertyToCard),
    total: lista.data.total,
    hasMore: lista.data.hasMore,
    opcoes,
  };
}

async function carregarParceiros(
  query: Record<string, string>,
  page: number,
): Promise<Resultado> {
  const [lista, filtros] = await Promise.all([
    listPartnerUnits({
      page,
      limit: PAGE_SIZE,
      city: query.cidade,
      developmentCode: query.loteamento,
      minPrice: num(query.precoMin),
      maxPrice: num(query.precoMax),
      sort: ordemValida<PartnerSort>(query.ordem, ORDENS_PARCEIRO),
    }),
    getPartnerFilters(),
  ]);

  // A origem entrega cidade e loteamento em caixa alta: o value vai cru para a
  // API, o label vai capitalizado para a tela.
  const opcoes: FiltroOpcoes = filtros.ok
    ? {
        cidades: filtros.data.cities.map((c) => ({
          value: c.name,
          label: titleCase(c.name),
          count: c.count,
        })),
        loteamentos: filtros.data.developments.map((d) => ({
          value: d.code,
          label: titleCase(d.name),
          cidade: d.city ? titleCase(d.city) : undefined,
          count: d.count,
        })),
        precoRange: null,
      }
    : { cidades: [], loteamentos: [], precoRange: null };

  if (!lista.ok) {
    return { cards: [], total: 0, hasMore: false, opcoes, erro: lista.message };
  }

  return {
    cards: lista.data.items.map(partnerUnitToCard),
    total: lista.data.total,
    hasMore: lista.data.hasMore,
    opcoes,
  };
}
