"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Icon } from "@/components/ui/Icon";

export type Opcao = {
  value: string;
  label: string;
  count?: number;
  cidade?: string;
};

export type FiltroOpcoes = {
  tipos?: Opcao[];
  cidades: Opcao[];
  loteamentos: Opcao[];
  precoRange?: { min: number; max: number } | null;
  areaRange?: { min: number; max: number } | null;
};

type Props = {
  /** Query atual da página, já normalizada pelo servidor. */
  query: Record<string, string>;
  opcoes: FiltroOpcoes;
  /** Chave do loteamento: nome na carteira própria, código na do parceiro. */
  loteamentoLabel?: string;
};

const FILTRAVEIS = [
  "tipo",
  "cidade",
  "loteamento",
  "precoMin",
  "precoMax",
  "areaMin",
  "areaMax",
] as const;

function Pill({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
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

const inputClass =
  "w-full rounded-card border border-white/15 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-orange focus:ring-2 focus:ring-orange/20";

export function FiltrosImoveis({
  query,
  opcoes,
  loteamentoLabel = "Loteamento",
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const navigate = (next: Record<string, string | undefined>) => {
    const params = new URLSearchParams(query);
    for (const [key, value] of Object.entries(next)) {
      if (value === undefined || value === "") params.delete(key);
      else params.set(key, value);
    }
    // Qualquer mudança de filtro invalida a página em que o usuário estava.
    params.delete("pagina");
    const qs = params.toString();
    startTransition(() => router.push(qs ? `/imoveis?${qs}` : "/imoveis"));
  };

  const toggle = (key: string, value: string) =>
    navigate({ [key]: query[key] === value ? undefined : value });

  const aplicarFaixas = (form: HTMLFormElement) => {
    const data = new FormData(form);
    navigate({
      precoMin: String(data.get("precoMin") ?? ""),
      precoMax: String(data.get("precoMax") ?? ""),
      areaMin: String(data.get("areaMin") ?? ""),
      areaMax: String(data.get("areaMax") ?? ""),
    });
  };

  const hasFilters = FILTRAVEIS.some((k) => query[k]);

  const limpar = () =>
    navigate(Object.fromEntries(FILTRAVEIS.map((k) => [k, undefined])));

  return (
    <div
      className={`rounded-card bg-navy p-6 text-white transition-opacity lg:sticky lg:top-20 ${
        pending ? "opacity-60" : ""
      }`}
    >
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
            onClick={limpar}
            className="text-xs font-medium text-white/60 transition hover:text-white"
          >
            Limpar
          </button>
        )}
      </div>

      {opcoes.tipos && opcoes.tipos.length > 0 && (
        <div className="mt-5">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
            Tipo
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {opcoes.tipos.map((t) => (
              <Pill
                key={t.value}
                active={query.tipo === t.value}
                onClick={() => toggle("tipo", t.value)}
              >
                {t.label}
                {t.count ? ` (${t.count})` : ""}
              </Pill>
            ))}
          </div>
        </div>
      )}

      {opcoes.cidades.length > 0 && (
        <div className="mt-6 border-t border-white/10 pt-5">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
            Cidade
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {opcoes.cidades.map((c) => (
              <Pill
                key={c.value}
                active={query.cidade === c.value}
                onClick={() => toggle("cidade", c.value)}
              >
                {c.label}
                {c.count ? ` (${c.count})` : ""}
              </Pill>
            ))}
          </div>
        </div>
      )}

      {opcoes.loteamentos.length > 0 && (
        <div className="mt-6 border-t border-white/10 pt-5">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
            {loteamentoLabel}
          </h3>
          <select
            value={query.loteamento ?? ""}
            onChange={(e) => navigate({ loteamento: e.target.value })}
            className={`mt-3 ${inputClass} [&>option]:text-navy`}
          >
            <option value="">Todos</option>
            {opcoes.loteamentos.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
                {l.cidade ? ` · ${l.cidade}` : ""}
                {l.count ? ` (${l.count})` : ""}
              </option>
            ))}
          </select>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          aplicarFaixas(e.currentTarget);
        }}
      >
        <div className="mt-6 border-t border-white/10 pt-5">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
            Faixa de preço (R$)
          </h3>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <input
              type="number"
              name="precoMin"
              inputMode="numeric"
              min={0}
              placeholder={
                opcoes.precoRange
                  ? `min ${opcoes.precoRange.min.toLocaleString("pt-BR")}`
                  : "mín"
              }
              defaultValue={query.precoMin ?? ""}
              className={inputClass}
            />
            <input
              type="number"
              name="precoMax"
              inputMode="numeric"
              min={0}
              placeholder={
                opcoes.precoRange
                  ? `max ${opcoes.precoRange.max.toLocaleString("pt-BR")}`
                  : "máx"
              }
              defaultValue={query.precoMax ?? ""}
              className={inputClass}
            />
          </div>
        </div>

        {opcoes.areaRange !== undefined && (
          <div className="mt-6 border-t border-white/10 pt-5">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
              Área (m²)
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <input
                type="number"
                name="areaMin"
                inputMode="numeric"
                min={0}
                placeholder={
                  opcoes.areaRange
                    ? `min ${opcoes.areaRange.min.toLocaleString("pt-BR")}`
                    : "mín"
                }
                defaultValue={query.areaMin ?? ""}
                className={inputClass}
              />
              <input
                type="number"
                name="areaMax"
                inputMode="numeric"
                min={0}
                placeholder={
                  opcoes.areaRange
                    ? `max ${opcoes.areaRange.max.toLocaleString("pt-BR")}`
                    : "máx"
                }
                defaultValue={query.areaMax ?? ""}
                className={inputClass}
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          className="mt-5 w-full rounded-pill bg-orange px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-bright"
        >
          Aplicar
        </button>
      </form>
    </div>
  );
}

export function OrdenarSelect({
  query,
  opcoes,
}: {
  query: Record<string, string>;
  opcoes: { value: string; label: string }[];
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  return (
    <label className="flex items-center gap-2 text-xs text-muted">
      <span className="font-semibold uppercase tracking-widest">Ordenar</span>
      <select
        value={query.ordem ?? "recent"}
        onChange={(e) => {
          const params = new URLSearchParams(query);
          if (e.target.value === "recent") params.delete("ordem");
          else params.set("ordem", e.target.value);
          params.delete("pagina");
          const qs = params.toString();
          startTransition(() =>
            router.push(qs ? `/imoveis?${qs}` : "/imoveis"),
          );
        }}
        className="rounded-card border border-line bg-white px-3 py-1.5 text-sm font-semibold text-navy outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
      >
        {opcoes.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
