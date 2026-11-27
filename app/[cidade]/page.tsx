import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloating } from "@/components/layout/WhatsAppFloating";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import Image from "next/image";
import { CapaDeFundo } from "@/components/shared/CapaDeFundo";
import { FAQ, type FAQItem } from "@/components/shared/FAQ";
import { FinalCTA } from "@/components/shared/FinalCTA";
import { Icon } from "@/components/ui/Icon";
import {
  cidadePath,
  cidades,
  empreendimentosDaCidade,
  getCidadePorSegmento,
} from "@/lib/content/cidades";
import { processo } from "@/lib/content/institucional";
import { carregarLotes, resumirLotes } from "@/lib/imoveis/empreendimento";
import { formatPreco } from "@/lib/imoveis/view";
import { buildWhatsAppLink } from "@/lib/whatsapp";

type Params = { cidade: string };

// Rota na raiz do site: qualquer segmento fora da lista precisa dar 404.
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return cidades.map((c) => ({ cidade: cidadePath(c).slice(1) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { cidade: segmento } = await params;
  const c = getCidadePorSegmento(segmento);
  if (!c) return {};
  return {
    title: { absolute: `Lotes em ${c.nome} | Avanz Imóveis` },
    description:
      c.descricaoMeta ??
      `Lotes à venda em ${c.nome}: compare loteamentos, metragens e condições, e fale com a Avanz pelo WhatsApp.`,
    alternates: { canonical: cidadePath(c) },
    robots: c.publicado ? undefined : { index: false, follow: true },
  };
}

export default async function CidadePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { cidade: segmento } = await params;
  const c = getCidadePorSegmento(segmento);
  if (!c) notFound();

  const emps = await Promise.all(
    empreendimentosDaCidade(c).map(async (e) => ({
      emp: e,
      resumo: resumirLotes(await carregarLotes(e)),
    })),
  );
  const precoMin = emps
    .map((e) => e.resumo.precoMin)
    .filter((p): p is number => typeof p === "number");
  const outras = cidades.filter((o) => o.slug !== c.slug && o.publicado);
  const msg = `Olá! Vim pelo site da Avanz. Procuro lote em ${c.nome}.`;
  const faq = [
    ...(c.faq ?? []),
    ...perguntaLoteamentos(emps.map((e) => e.emp.nome)),
    ...perguntaDocumentacao(emps.filter((e) => e.emp.escrituraERegistro).map((e) => e.emp.nome)),
  ];

  const panorama = [
    emps.length && { rotulo: "Empreendimentos", valor: String(emps.length) },
    precoMin.length && {
      rotulo: "Lotes a partir de",
      valor: formatPreco(Math.min(...precoMin)),
    },
    c.tempoAteBH && { rotulo: "Até Belo Horizonte", valor: c.tempoAteBH },
  ].filter(Boolean) as { rotulo: string; valor: string }[];

  return (
    <>
      <Header />
      <main>
        {/* 01 · Hero + panorama */}
        <section className="relative isolate overflow-hidden bg-navy text-white">
          {c.capa && <CapaDeFundo src={c.capa} />}
          <div className="container-content py-16 sm:py-20">
            <nav aria-label="Trilha" className="text-xs text-white/60">
              <Link href="/" className="hover:text-white">Início</Link>
              {" › "}
              <span className="text-white/80">Lotes em {c.nome}</span>
            </nav>
            <h1 className="mt-8 max-w-3xl font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl">
              Lotes em {c.nome}
            </h1>
            {c.resumo && (
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
                {c.resumo}
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#empreendimentos" className="btn-primary">
                Ver empreendimentos
                <Icon name="arrow-right" size={18} />
              </a>
              <a
                href={buildWhatsAppLink(msg)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-light"
              >
                <Icon name="whatsapp" size={18} />
                Falar com um consultor
              </a>
            </div>
            {panorama.length > 0 && (
              <dl className="mt-12 grid gap-3 sm:grid-cols-3">
                {panorama.map((p) => (
                  <div key={p.rotulo} className="rounded-card border border-white/10 bg-white/5 p-4">
                    <dt className="text-xs uppercase tracking-widest text-white/60">{p.rotulo}</dt>
                    <dd className="mt-1 font-display text-lg font-semibold">{p.valor}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </section>

        {/* 02 · Empreendimentos na cidade */}
        <section id="empreendimentos" className="bg-offwhite">
          <div className="container-content py-20">
            <span className="eyebrow">Empreendimentos</span>
            <h2 className="section-title mt-3">
              Onde comprar seu lote em {c.nome}
            </h2>
            {emps.length ? (
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {emps.map(({ emp, resumo }) => (
                  <Link
                    key={emp.slug}
                    href={`/empreendimentos/${emp.slug}`}
                    className="group flex flex-col overflow-hidden rounded-card border border-line bg-white transition hover:-translate-y-0.5 hover:border-orange/40 hover:shadow-card"
                  >
                    {emp.capa && (
                      <div className="relative aspect-[16/10]">
                        <Image
                          src={emp.capa}
                          alt={`Vista do loteamento ${emp.nome}`}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-semibold text-navy">{emp.nome}</h3>
                    <p className="mt-2 text-sm text-muted">
                      {[
                        resumo.metragem,
                        resumo.aPartirDe && `a partir de ${resumo.aPartirDe}`,
                        resumo.quantidade
                          ? `${resumo.quantidade} ${resumo.quantidade === 1 ? "lote" : "lotes"}`
                          : "lotes sob consulta",
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                    {emp.beneficio && (
                      <p className="mt-3 text-sm leading-relaxed text-ink">{emp.beneficio}</p>
                    )}
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-orange-deep group-hover:text-orange">
                      Ver o empreendimento
                      <Icon name="arrow-right" size={16} />
                    </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mt-8 text-muted">
                Fale com um consultor para saber das oportunidades em {c.nome}.
              </p>
            )}
          </div>
        </section>

        {/* 03 · Comparativo: só faz sentido com dois ou mais */}
        {emps.length >= 2 && (
          <section className="bg-white">
            <div className="container-content py-20">
              <span className="eyebrow">Comparativo</span>
              <h2 className="section-title mt-3">Compare os loteamentos</h2>
              <div className="mt-10 overflow-x-auto rounded-card border border-line">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="bg-offwhite text-xs uppercase tracking-widest text-muted">
                    <tr>
                      <th scope="col" className="px-5 py-3">Empreendimento</th>
                      <th scope="col" className="px-5 py-3">Metragem</th>
                      <th scope="col" className="px-5 py-3">A partir de</th>
                      <th scope="col" className="px-5 py-3">Infraestrutura</th>
                      <th scope="col" className="px-5 py-3">Lotes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {emps.map(({ emp, resumo }) => (
                      <tr key={emp.slug}>
                        <td className="px-5 py-4 font-semibold">
                          <Link href={`/empreendimentos/${emp.slug}`} className="text-navy underline hover:text-orange-deep">
                            {emp.nome}
                          </Link>
                        </td>
                        <td className="px-5 py-4">{resumo.metragem ?? "Sob consulta"}</td>
                        <td className="px-5 py-4">{resumo.aPartirDe ?? "Sob consulta"}</td>
                        <td className="px-5 py-4">{emp.infraestrutura?.map((i) => i.texto).join(", ") || "Com o consultor"}</td>
                        <td className="px-5 py-4">{resumo.quantidade || "Sob consulta"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-muted">
                Valores e estoque da carteira atual. Confirme com um consultor.
              </p>
            </div>
          </section>
        )}

        <div className="bg-offwhite">
          <div className="container-content py-12">
            <div className="flex flex-col items-start justify-between gap-4 rounded-card border border-line bg-white p-6 sm:flex-row sm:items-center">
              <p className="font-display text-lg font-semibold text-navy">
                Em dúvida sobre qual loteamento escolher?
              </p>
              <a
                href={buildWhatsAppLink(msg)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
              >
                <Icon name="whatsapp" size={16} />
                Falar com um consultor
              </a>
            </div>
          </div>
        </div>

        {/* 04 · Sobre a cidade */}
        {c.sobre?.length ? (
          <section className="bg-white">
            <div className="container-content py-20">
              <span className="eyebrow">A cidade</span>
              <h2 className="section-title mt-3">Morar e investir em {c.nome}</h2>
              <div className={`mt-10 grid gap-6 ${c.mapa ? "md:grid-cols-2" : ""}`}>
                {c.mapa && (
                  <iframe
                    title={`Mapa de ${c.nome}`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(c.mapa)}&output=embed`}
                    loading="lazy"
                    className="h-80 w-full rounded-card border border-line md:sticky md:top-24 md:self-start"
                  />
                )}
                <div className={`grid content-start gap-4 sm:grid-cols-2 ${c.mapa ? "" : "lg:grid-cols-4"}`}>
                  {c.sobre.map((s) => (
                    <div key={s.titulo} className="rounded-card border border-line bg-offwhite p-5">
                      <h3 className="font-display font-semibold text-navy">{s.titulo}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{s.texto}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {/* 05 · Como comprar */}
        <ProcessSteps
          steps={processo}
          eyebrow="Como comprar"
          title="Como funciona a compra de um lote"
        />

        {/* 06 · Perguntas frequentes */}
        {faq.length ? (
          <section className="bg-offwhite">
            <div className="container-content py-20">
              <span className="eyebrow">Perguntas frequentes</span>
              <h2 className="section-title mt-3">Dúvidas sobre lotes em {c.nome}</h2>
              <div className="mt-10 max-w-3xl">
                <FAQ items={faq} />
              </div>
            </div>
          </section>
        ) : null}

        {/* 07 · CTA final + outras cidades */}
        <FinalCTA
          title={`Procurando lote em ${c.nome}?`}
          body="Conte seu objetivo e indicamos as opções que fazem sentido."
          ctaLabel="Falar no WhatsApp"
          ctaMessage={msg}
        />
        {outras.length ? (
          <nav aria-label="Outras cidades" className="bg-navy-3">
            <div className="container-content flex flex-wrap gap-x-6 gap-y-2 pb-10 text-sm text-white/70">
              <span className="text-white/50">Outras cidades:</span>
              {outras.map((o) => (
                <Link key={o.slug} href={cidadePath(o)} className="underline hover:text-white">
                  Lotes em {o.nome}
                </Link>
              ))}
            </div>
          </nav>
        ) : null}
      </main>
      <Footer />
      <WhatsAppFloating message={msg} />
    </>
  );
}

/**
 * Montada a partir dos empreendimentos listados na página, para não ficar
 * desatualizada quando entrar ou sair um loteamento.
 */
function listar(nomes: string[]): string {
  return new Intl.ListFormat("pt-BR", { type: "conjunction" }).format(nomes);
}

function perguntaLoteamentos(nomes: string[]): FAQItem[] {
  if (!nomes.length) return [];
  const lista = listar(nomes);
  const onde = nomes.length === 1 ? `no loteamento ${lista}` : `nos loteamentos ${lista}`;
  return [
    {
      q: "Quais loteamentos têm lotes à venda?",
      a: `Hoje a Avanz tem lotes ${onde}. Veja os lotes disponíveis na página de cada loteamento ou fale com um consultor para conhecer as opções do momento.`,
    },
  ];
}

/** Cita pelo nome só os loteamentos com escritura e registro confirmados. */
function perguntaDocumentacao(nomes: string[]): FAQItem[] {
  if (!nomes.length) return [];
  const quem =
    nomes.length === 1
      ? `O loteamento ${nomes[0]} tem`
      : `Os loteamentos ${listar(nomes)} têm`;
  return [
    {
      q: "Os lotes têm escritura e registro?",
      a: `${quem} escritura e registro em ordem. Durante o pagamento, você assina um contrato particular de compra e venda, e a escritura passa para o seu nome após a quitação do lote.`,
    },
  ];
}
