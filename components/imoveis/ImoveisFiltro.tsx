"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Imovel } from "@/lib/content/types";
import { Icon } from "@/components/ui/Icon";

type Props = {
  imoveis: Imovel[];
};

function parsePreco(preco: string): number {
  const digits = preco.replace(/\D/g, "");
  return parseInt(digits, 10) || 0;
}

function parseArea(area: string): number {
  const cleaned = area.replace(/\./g, "");
  const match = cleaned.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

function formatPreco(value: number): string {
  return value.toLocaleString("pt-BR");
}

type SortKey = "padrao" | "preco-asc" | "preco-desc" | "area-desc" | "area-asc";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "padrao", label: "Padrão" },
  { value: "preco-asc", label: "Menor preço" },
  { value: "preco-desc", label: "Maior preço" },
  { value: "area-desc", label: "Maior área" },
  { value: "area-asc", label: "Menor área" },
];

type PillProps = {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function Pill({ active, onClick, children }: PillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-card border px-3 py-1.5 text-xs font-semibold transition ${
        active
          ? "border-orange bg-orange text-white"
          : "border-white/15 bg-white/[0.04] text-white/85 hover:border-white/40 hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}

const CIDADES_AVANZ = [
  "Caetanópolis",
  "Esmeraldas",
  "Igarapé",
  "Itaúna",
  "Mateus Leme",
  "Pará de Minas",
];

const TIPOS_AVANZ = ["Lote", "Terreno", "Sítio", "Chácara"];

export function ImoveisFiltro({ imoveis }: Props) {
  const cidades = CIDADES_AVANZ;
  const tipos = TIPOS_AVANZ;
  const allPrecos = imoveis.map((i) => parsePreco(i.preco));
  const minPrecoBase = Math.min(...allPrecos);
  const maxPrecoBase = Math.max(...allPrecos);

  const [selectedCidades, setSelectedCidades] = useState<string[]>([]);
  const [selectedTipos, setSelectedTipos] = useState<string[]>([]);
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");
  const [sort, setSort] = useState<SortKey>("padrao");

  const toggleCidade = (c: string) =>
    setSelectedCidades((p) =>
      p.includes(c) ? p.filter((x) => x !== c) : [...p, c]
    );
  const toggleTipo = (t: string) =>
    setSelectedTipos((p) =>
      p.includes(t) ? p.filter((x) => x !== t) : [...p, t]
    );

  const filtered = useMemo(() => {
    return imoveis.filter((i) => {
      if (selectedCidades.length && !selectedCidades.includes(i.cidade))
        return false;
      if (selectedTipos.length && !selectedTipos.includes(i.tipo))
        return false;
      const preco = parsePreco(i.preco);
      if (precoMin && preco < parseInt(precoMin, 10)) return false;
      if (precoMax && preco > parseInt(precoMax, 10)) return false;
      return true;
    });
  }, [imoveis, selectedCidades, selectedTipos, precoMin, precoMax]);

  const sorted = useMemo(() => {
    if (sort === "padrao") return filtered;
    const list = [...filtered];
    switch (sort) {
      case "preco-asc":
        list.sort((a, b) => parsePreco(a.preco) - parsePreco(b.preco));
        break;
      case "preco-desc":
        list.sort((a, b) => parsePreco(b.preco) - parsePreco(a.preco));
        break;
      case "area-asc":
        list.sort((a, b) => parseArea(a.area) - parseArea(b.area));
        break;
      case "area-desc":
        list.sort((a, b) => parseArea(b.area) - parseArea(a.area));
        break;
    }
    return list;
  }, [filtered, sort]);

  const hasFilters =
    selectedCidades.length > 0 ||
    selectedTipos.length > 0 ||
    precoMin !== "" ||
    precoMax !== "";

  const clearAll = () => {
    setSelectedCidades([]);
    setSelectedTipos([]);
    setPrecoMin("");
    setPrecoMax("");
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-10">
      {/* Filter sidebar */}
      <aside>
        <div className="rounded-card bg-navy p-6 text-white lg:sticky lg:top-20">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-5">
            <div className="flex items-center gap-2.5">
              <span className="text-orange-bright">
                <Icon name="sliders" size={18} />
              </span>
              <span className="font-display text-sm font-bold uppercase tracking-[0.2em]">
                Filtros
              </span>
            </div>
            {hasFilters && (
              <button
                type="button"
                onClick={clearAll}
                className="text-xs font-medium text-white/60 transition hover:text-white"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Cidade */}
          <div className="mt-5">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
              Cidade
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {cidades.map((c) => (
                <Pill
                  key={c}
                  active={selectedCidades.includes(c)}
                  onClick={() => toggleCidade(c)}
                >
                  {c}
                </Pill>
              ))}
            </div>
          </div>

          {/* Tipo */}
          <div className="mt-6 border-t border-white/10 pt-5">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
              Tipo
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {tipos.map((t) => (
                <Pill
                  key={t}
                  active={selectedTipos.includes(t)}
                  onClick={() => toggleTipo(t)}
                >
                  {t}
                </Pill>
              ))}
            </div>
          </div>

          {/* Faixa de preço */}
          <div className="mt-6 border-t border-white/10 pt-5">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
              Faixa de preço (R$)
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <input
                type="number"
                inputMode="numeric"
                placeholder={`min ${formatPreco(minPrecoBase)}`}
                value={precoMin}
                onChange={(e) => setPrecoMin(e.target.value)}
                className="rounded-card border border-white/15 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-orange focus:ring-2 focus:ring-orange/20"
              />
              <input
                type="number"
                inputMode="numeric"
                placeholder={`max ${formatPreco(maxPrecoBase)}`}
                value={precoMax}
                onChange={(e) => setPrecoMax(e.target.value)}
                className="rounded-card border border-white/15 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-orange focus:ring-2 focus:ring-orange/20"
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Results */}
      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">
            {sorted.length === 0
              ? "Nenhum imóvel encontrado"
              : sorted.length === 1
              ? "1 imóvel encontrado"
              : `${sorted.length} imóveis encontrados`}
          </p>
          {sorted.length > 1 && (
            <label className="flex items-center gap-2 text-xs text-muted">
              <span className="font-semibold uppercase tracking-widest">
                Ordenar
              </span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-card border border-line bg-white px-3 py-1.5 text-sm font-semibold text-navy outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>

        {sorted.length === 0 ? (
          <div className="rounded-card border border-line bg-white p-10 text-center">
            <p className="text-muted">
              Nenhum imóvel bate com os filtros atuais.
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-orange-deep hover:text-orange"
            >
              Limpar filtros
              <Icon name="arrow-right" size={16} />
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {sorted.map((im) => (
              <Link
                key={im.slug}
                href={`/imoveis/${im.slug}`}
                className="group flex flex-col overflow-hidden rounded-card bg-white shadow-card transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-line">
                  <Image
                    src={im.foto}
                    alt={`${im.tipo} em ${im.bairro}`}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 640px) 40vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  {im.badge && (
                    <span className="absolute left-3 top-3 rounded-pill bg-orange px-3 py-1 text-xs font-semibold text-white shadow-cta">
                      {im.badge}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-xs font-semibold uppercase tracking-widest text-orange-deep">
                    {im.tipo} · {im.bairro}, {im.cidade}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-semibold text-navy">
                    {im.area}
                    {im.destaque ? ` · ${im.destaque}` : ""}
                  </h3>
                  <p className="mt-3 font-display text-xl font-bold text-navy">
                    {im.preco}
                  </p>
                  <div className="mt-auto pt-5">
                    <span className="inline-flex w-full items-center justify-center gap-2 rounded-pill bg-navy px-5 py-2.5 text-sm font-semibold text-white transition group-hover:bg-orange">
                      Ver detalhes
                      <Icon name="arrow-right" size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
