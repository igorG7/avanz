import type { Carteira } from "./view";

/** Parâmetros que compõem o estado da vitrine: aba, filtros, ordem e página. */
export const CHAVES_VITRINE = [
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

/** Param que carrega o estado da vitrine para a página de detalhe. */
export const RET_PARAM = "ret";

export type SearchParams = Record<string, string | string[] | undefined>;

export function primeiro(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function normalizeQuery(raw: SearchParams): Record<string, string> {
  const query: Record<string, string> = {};
  for (const key of CHAVES_VITRINE) {
    const value = primeiro(raw[key]);
    if (value) query[key] = value;
  }
  return query;
}

export function queryString(query: Record<string, string>): string {
  return new URLSearchParams(query).toString();
}

/** Anexa o estado da vitrine ao link do card, para o detalhe saber para onde voltar. */
export function comRetorno(href: string, ret: string): string {
  if (!ret) return href;
  return `${href}?${RET_PARAM}=${encodeURIComponent(ret)}`;
}

/**
 * Reconstrói a URL da vitrine a partir do `ret`. Só as chaves conhecidas são
 * aproveitadas: o valor vem da URL e não pode virar destino arbitrário.
 */
export function hrefVitrine(
  ret: string | undefined,
  carteira: Carteira,
): string {
  const params = new URLSearchParams();
  if (ret) {
    const recebidos = new URLSearchParams(ret);
    for (const key of CHAVES_VITRINE) {
      const value = recebidos.get(key);
      if (value) params.set(key, value);
    }
  }
  if (!params.has("carteira") && carteira === "parceiros") {
    params.set("carteira", "parceiros");
  }
  const qs = params.toString();
  return qs ? `/imoveis?${qs}` : "/imoveis";
}
