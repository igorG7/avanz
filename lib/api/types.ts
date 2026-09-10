export type PropertyType =
  | "lote"
  | "chacara"
  | "sitio"
  | "casa"
  | "apartamento";

export type PropertyStatus = "disponivel" | "reservado" | "vendido";

export type Topography = "plano" | "aclive" | "declive" | "irregular";

export type Photo = {
  id: string;
  url: string;
  width: number;
  height: number;
  caption?: string;
  order: number;
  cover: boolean;
};

export type Property = {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  title: string;
  slug: string;
  description?: string;
  type: PropertyType;
  status: PropertyStatus;
  published?: boolean;
  featured?: boolean;
  price: number;
  city: string;
  district: string;
  state: string;
  lot?: string;
  block?: string;
  development?: string;
  area: number;
  topography?: Topography;
  bedrooms?: number;
  bathrooms?: number;
  parkingSpots?: number;
  /** Ficha específica do `type`: lote tem frontage/lotLength, chácara tem water/energy, etc. */
  details?: Record<string, unknown>;
  /** Presente na listagem. */
  coverPhoto?: Photo;
  /** Presente na ficha. */
  photos?: Photo[];
};

export type PartnerPhoto = {
  url: string;
  caption?: string;
  order: number;
};

export type PartnerUnit = {
  id: string;
  source: "partner";
  title: string;
  city: string;
  district: string;
  lot?: string;
  block?: string;
  developmentCode: string;
  /** Ausente quando a origem não informa — exibir "sob consulta". */
  price?: number;
  photos: PartnerPhoto[];
};

export type Paginated<T> = {
  items: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
};

export type Range = { min: number; max: number } | null;

export type PropertyFilters = {
  types: { type: PropertyType; count: number }[];
  cities: { name: string; count: number }[];
  districts: { name: string; city: string; count: number }[];
  developments: { name: string; city: string; count: number }[];
  price: Range;
  area: Range;
};

export type PartnerUnitFilters = {
  cities: { name: string; count: number }[];
  developments: { code: string; name: string; city: string; count: number }[];
};

export type PropertySort =
  | "recent"
  | "priceAsc"
  | "priceDesc"
  | "areaAsc"
  | "areaDesc";

export type PartnerSort = "recent" | "priceAsc" | "priceDesc";

export type PropertyQuery = {
  page?: number;
  limit?: number;
  type?: PropertyType;
  status?: PropertyStatus;
  city?: string;
  district?: string;
  development?: string;
  topography?: Topography;
  featured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  sort?: PropertySort;
};

export type PartnerQuery = {
  page?: number;
  limit?: number;
  city?: string;
  district?: string;
  developmentCode?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: PartnerSort;
};
