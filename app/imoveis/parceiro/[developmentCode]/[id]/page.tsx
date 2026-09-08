import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogoIndisponivel } from "@/components/imoveis/CatalogoIndisponivel";
import { ImovelDetalhe } from "@/components/imoveis/ImovelDetalhe";
import { getPartnerUnit, listPartnerUnits } from "@/lib/api/imoveis";
import {
  RET_PARAM,
  comRetorno,
  hrefVitrine,
  primeiro,
  type SearchParams,
} from "@/lib/imoveis/query";
import {
  NAO_INFORMADO,
  buildFichaParceiro,
  formatPreco,
  localizacaoParceiro,
  partnerHref,
  partnerUnitToCard,
  refAtendimento,
  titleCase,
} from "@/lib/imoveis/view";

type Params = { developmentCode: string; id: string };

const AVISO =
  "Unidade da carteira do nosso parceiro J.Lemara, lida ao vivo do acervo dele. Área, topografia e documentação são confirmadas pelo consultor antes da visita.";

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { developmentCode, id } = await params;
  const res = await getPartnerUnit(developmentCode, id);
  if (!res.ok) return { title: "Imóvel não encontrado" };

  const unidade = res.data;
  return {
    title: titleCase(unidade.title),
    description: `${[titleCase(unidade.district), titleCase(unidade.city)].filter(Boolean).join(", ") || "Lote"} na carteira de parceiros da Avanz.`,
  };
}

export default async function ParceiroPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) {
  const [{ developmentCode, id }, sp] = await Promise.all([
    params,
    searchParams,
  ]);
  const ret = primeiro(sp[RET_PARAM]);
  const voltarHref = hrefVitrine(ret, "parceiros");
  const res = await getPartnerUnit(developmentCode, id);

  if (!res.ok) {
    if (res.status === 404) notFound();
    return <CatalogoIndisponivel mensagem={res.message} />;
  }

  const unidade = res.data;
  const cidade = titleCase(unidade.city);
  const bairro = titleCase(unidade.district);
  const local = localizacaoParceiro(unidade);
  const titulo = titleCase(unidade.title);
  const fotos = [...unidade.photos]
    .sort((a, b) => a.order - b.order)
    .map((f) => f.url);

  const vizinhos = await listPartnerUnits({
    developmentCode: unidade.developmentCode,
    limit: 4,
  });
  const similares = vizinhos.ok
    ? vizinhos.data.items
        .filter((u) => u.id !== unidade.id)
        .slice(0, 3)
        .map(partnerUnitToCard)
        .map((card) => ({
          ...card,
          href: ret ? comRetorno(card.href, ret) : card.href,
        }))
    : [];

  return (
    <ImovelDetalhe
      eyebrow={local ? `Lote · ${local}` : "Lote"}
      titulo={titulo}
      breadcrumb={`${titulo} · carteira parceiros`}
      bairro={bairro || cidade || NAO_INFORMADO}
      cidade={cidade || NAO_INFORMADO}
      preco={formatPreco(unidade.price)}
      referencia={`${unidade.developmentCode}/${unidade.id}`}
      refMensagem={refAtendimento(
        { lot: unidade.lot, block: unidade.block, development: bairro || undefined },
        `${unidade.developmentCode}/${unidade.id}`,
      )}
      badge="Parceiro"
      ficha={buildFichaParceiro(unidade)}
      fotos={fotos}
      aviso={AVISO}
      descricaoCurta={local ? `lote em ${local}` : "lote"}
      url={`https://avanzimoveis.com${partnerHref(unidade.developmentCode, unidade.id)}`}
      similares={similares}
      similaresTitle={bairro ? `Outras unidades em ${bairro}` : "Outras unidades do parceiro"}
      similaresIntro="Mesmo loteamento, disponibilidade confirmada com o consultor."
      voltarHref={voltarHref}
      voltarLabel="Voltar para a carteira parceiros"
    />
  );
}
