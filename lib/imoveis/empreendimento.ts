import { listProperties } from "@/lib/api/imoveis";
import type { Property } from "@/lib/api/types";
import type { Empreendimento } from "@/lib/content/empreendimentos";
import { formatArea, formatPreco } from "./view";

export async function carregarLotes(emp: Empreendimento): Promise<Property[]> {
  const res = await listProperties({
    development: emp.development,
    type: "lote",
    status: "disponivel",
    sort: "priceAsc",
    limit: 50,
  });
  return res.ok ? res.data.items : [];
}

export type ResumoLotes = {
  quantidade: number;
  metragem?: string;
  aPartirDe?: string;
  precoMin?: number;
  atualizadoEm?: string;
};

/** Números de resumo saem dos lotes cadastrados, nunca digitados à mão. */
export function resumirLotes(lotes: Property[]): ResumoLotes {
  const areas = lotes.map((l) => l.area).filter((a) => a > 0);
  const precos = lotes.map((l) => l.price).filter((p) => p > 0);
  const datas = lotes
    .map((l) => (l.updatedAt ? Date.parse(l.updatedAt) : NaN))
    .filter(Number.isFinite);

  let metragem: string | undefined;
  if (areas.length) {
    const min = Math.min(...areas);
    const max = Math.max(...areas);
    metragem = min === max ? formatArea(min) : `${formatArea(min)} a ${formatArea(max)}`;
  }
  const precoMin = precos.length ? Math.min(...precos) : undefined;

  return {
    quantidade: lotes.length,
    metragem,
    precoMin,
    aPartirDe: precoMin ? formatPreco(precoMin) : undefined,
    atualizadoEm: datas.length
      ? new Date(Math.max(...datas)).toLocaleDateString("pt-BR")
      : undefined,
  };
}
