import type { MetadataRoute } from "next";
import { listProperties } from "@/lib/api/imoveis";
import type { Property } from "@/lib/api/types";
import { absoluteUrl } from "@/lib/site";

const PAGE_SIZE = 50;
const MAX_PAGES = 20;

// Unidades do parceiro ficam de fora até decidirmos se elas seguem indexáveis
// ou se passam a apontar para a página do empreendimento.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fixas: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/imoveis"), changeFrequency: "daily", priority: 0.8 },
  ];

  const imoveis = await carregarImoveis();
  return [
    ...fixas,
    ...imoveis.map((p) => ({
      url: absoluteUrl(`/imoveis/${p.slug}`),
      lastModified: p.updatedAt ? new Date(p.updatedAt) : undefined,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}

// Com a API fora do ar, o sitemap sai só com as páginas fixas em vez de falhar.
async function carregarImoveis(): Promise<Property[]> {
  const todos: Property[] = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    const res = await listProperties({ page, limit: PAGE_SIZE });
    if (!res.ok) break;
    todos.push(...res.data.items);
    if (!res.data.hasMore) break;
  }
  return todos;
}
