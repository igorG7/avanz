import Link from "next/link";
import type { Carteira } from "@/lib/imoveis/view";

const TABS: { value: Carteira; label: string; hint: string }[] = [
  {
    value: "propria",
    label: "Carteira própria",
    hint: "Imóveis Avanz",
  },
  {
    value: "parceiros",
    label: "Carteira parceiros",
    hint: "J.Lemara",
  },
];

// Trocar de carteira zera os filtros: as duas carteiras não compartilham
// vocabulário (tipo e área só existem na própria, loteamento é código na outra).
export function CarteiraTabs({ atual }: { atual: Carteira }) {
  return (
    <div
      role="tablist"
      aria-label="Carteira de imóveis"
      className="inline-flex flex-wrap gap-1 rounded-pill border border-line bg-white p-1 shadow-card"
    >
      {TABS.map((tab) => {
        const active = tab.value === atual;
        return (
          <Link
            key={tab.value}
            role="tab"
            aria-selected={active}
            href={
              tab.value === "propria"
                ? "/imoveis"
                : `/imoveis?carteira=${tab.value}`
            }
            className={`rounded-pill px-5 py-2.5 text-sm font-semibold transition ${
              active
                ? "bg-navy text-white"
                : "text-muted hover:bg-offwhite hover:text-navy"
            }`}
          >
            {tab.label}
            <span
              className={`ml-2 text-[11px] font-medium ${
                active ? "text-white/60" : "text-muted/60"
              }`}
            >
              {tab.hint}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
