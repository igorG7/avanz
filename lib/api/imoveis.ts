import { apiGet, pathSegment, type ApiResult } from "./client";
import type {
  Paginated,
  PartnerQuery,
  PartnerUnit,
  PartnerUnitFilters,
  Property,
  PropertyFilters,
  PropertyQuery,
} from "./types";

/**
 * Acervo próprio: janela curta para o que se publica no painel aparecer logo.
 * O valor acompanha o tráfego — com volume alto, o caminho é revalidação sob
 * demanda pelo painel em vez de encurtar mais isto.
 */
const OWN_REVALIDATE = 10;
/** Carteira do parceiro: lida ao vivo da J.Lemara, cache curto para não pesar na origem. */
const PARTNER_REVALIDATE = 300;

export function listProperties(
  query: PropertyQuery = {},
): Promise<ApiResult<Paginated<Property>>> {
  return apiGet<Paginated<Property>>("/properties", {
    params: { ...query },
    revalidate: OWN_REVALIDATE,
  });
}

export function getPropertyFilters(): Promise<ApiResult<PropertyFilters>> {
  return apiGet<PropertyFilters>("/properties/filters", {
    revalidate: OWN_REVALIDATE,
  });
}

export function getPropertyBySlug(slug: string): Promise<ApiResult<Property>> {
  return apiGet<Property>(`/properties/slug/${pathSegment(slug)}`, {
    revalidate: OWN_REVALIDATE,
  });
}

export function listPartnerUnits(
  query: PartnerQuery = {},
): Promise<ApiResult<Paginated<PartnerUnit>>> {
  return apiGet<Paginated<PartnerUnit>>("/partner-units", {
    params: { ...query },
    revalidate: PARTNER_REVALIDATE,
  });
}

export function getPartnerFilters(): Promise<ApiResult<PartnerUnitFilters>> {
  return apiGet<PartnerUnitFilters>("/partner-units/filters", {
    revalidate: PARTNER_REVALIDATE,
  });
}

export function getPartnerUnit(
  developmentCode: string,
  id: string,
): Promise<ApiResult<PartnerUnit>> {
  return apiGet<PartnerUnit>(
    `/partner-units/${pathSegment(developmentCode)}/${pathSegment(id)}`,
    { revalidate: PARTNER_REVALIDATE },
  );
}
