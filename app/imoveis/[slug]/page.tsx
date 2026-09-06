import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogoIndisponivel } from "@/components/imoveis/CatalogoIndisponivel";
import { ImovelDetalhe } from "@/components/imoveis/ImovelDetalhe";
import { getPropertyBySlug, listProperties } from "@/lib/api/imoveis";
import type { Property } from "@/lib/api/types";
import {
  STATUS_LABEL,
  TIPO_LABEL,
  buildFichaTecnica,
  formatArea,
  formatPreco,
  propertyToCard,
  refAtendimento,
} from "@/lib/imoveis/view";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const res = await getPropertyBySlug(slug);
  if (!res.ok) return { title: "Imóvel não encontrado" };

  const imovel = res.data;
  return {
    title: imovel.title,
    description:
      imovel.description?.slice(0, 200) ??
      `${TIPO_LABEL[imovel.type]} de ${formatArea(imovel.area)} em ${imovel.district}, ${imovel.city}.`,
  };
}

export default async function ImovelPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const res = await getPropertyBySlug(slug);

  if (!res.ok) {
    if (res.status === 404) notFound();
    return <CatalogoIndisponivel mensagem={res.message} />;
  }

  const imovel = res.data;
  const tipo = TIPO_LABEL[imovel.type] ?? imovel.type;
  const fotos = [...(imovel.photos ?? [])]
    .sort((a, b) => Number(b.cover) - Number(a.cover) || a.order - b.order)
    .map((f) => f.url);

  const similares = await carregarSimilares(imovel);

  return (
    <ImovelDetalhe
      eyebrow={`${tipo} · ${imovel.district}, ${imovel.city}`}
      titulo={imovel.title}
      breadcrumb={`${tipo} em ${imovel.district}, ${imovel.city}`}
      bairro={imovel.district}
      cidade={imovel.city}
      preco={formatPreco(imovel.price)}
      referencia={imovel.slug}
      refMensagem={refAtendimento(
        {
          lot: imovel.lot,
          block: imovel.block,
          development: imovel.development,
        },
        imovel.slug,
      )}
      badge={
        imovel.status !== "disponivel"
          ? STATUS_LABEL[imovel.status]
          : imovel.featured
            ? "Destaque"
            : undefined
      }
      descricao={imovel.description}
      ficha={buildFichaTecnica(imovel)}
      fotos={fotos}
      descricaoCurta={`${tipo.toLowerCase()} em ${imovel.district}, ${imovel.city}`}
      url={`https://avanzimoveis.com/imoveis/${imovel.slug}`}
      similares={similares}
      similaresTitle={`Outros imóveis em ${imovel.city} e região`}
      similaresIntro="Selecionados na curadoria Avanz, mesma região ou mesmo perfil."
    />
  );
}

async function carregarSimilares(imovel: Property) {
  const mesmaCidade = await listProperties({
    city: imovel.city,
    limit: 4,
  });
  const candidatos = mesmaCidade.ok
    ? mesmaCidade.data.items.filter((i) => i.id !== imovel.id)
    : [];

  if (candidatos.length >= 3) return candidatos.slice(0, 3).map(propertyToCard);

  // Completa com qualquer imóvel do acervo quando a cidade tem pouca oferta.
  const geral = await listProperties({ limit: 6 });
  const extras = geral.ok
    ? geral.data.items.filter(
        (i) => i.id !== imovel.id && !candidatos.some((c) => c.id === i.id),
      )
    : [];

  return [...candidatos, ...extras].slice(0, 3).map(propertyToCard);
}
