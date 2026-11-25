import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloating } from "@/components/layout/WhatsAppFloating";
import { ImoveisGrid } from "@/components/imoveis/ImoveisGrid";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { Testimonials } from "@/components/shared/Testimonials";
import { FAQ } from "@/components/shared/FAQ";
import { FinalCTA } from "@/components/shared/FinalCTA";
import { Icon } from "@/components/ui/Icon";
import { listProperties } from "@/lib/api/imoveis";
import type { Property } from "@/lib/api/types";
import {
  checklistCompraLote,
  empreendimentos,
  getEmpreendimento,
  type Empreendimento,
} from "@/lib/content/empreendimentos";
import { depoimentos, processo } from "@/lib/content/institucional";
import { formatArea, formatPreco, propertyToCard } from "@/lib/imoveis/view";
import { buildWhatsAppLink } from "@/lib/whatsapp";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return empreendimentos.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const emp = getEmpreendimento(slug);
  if (!emp) return {};
  return {
    title: { absolute: `Lotes no ${emp.nome} em ${emp.cidade} | Avanz Imóveis` },
    description:
      emp.descricaoMeta ??
      `Veja os lotes disponíveis no ${emp.nome}, em ${emp.cidade}: localização, metragens e condições. Fale com a Avanz pelo WhatsApp.`,
    alternates: { canonical: `/empreendimentos/${emp.slug}` },
    robots: emp.publicado ? undefined : { index: false, follow: true },
  };
}

export default async function EmpreendimentoPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const emp = getEmpreendimento(slug);
  if (!emp) notFound();

  const lotes = await carregarLotes(emp);
  const resumo = montarResumo(emp, lotes);
  const msg = `Olá! Vim pelo site da Avanz. Quero saber dos lotes disponíveis no ${emp.nome}, em ${emp.cidade}.`;

  return (
    <>
      <Header />
      <main>
        {/* 01 · Hero + resumo */}
        <section className="bg-navy text-white">
          <div className="container-content py-16 sm:py-20">
            <nav aria-label="Trilha" className="text-xs text-white/60">
              <Link href="/" className="hover:text-white">Início</Link>
              {" › "}
              <Link href="/imoveis" className="hover:text-white">Imóveis</Link>
              {" › "}
              <span className="text-white/80">{emp.nome}</span>
            </nav>
            <span className="eyebrow mt-8 block !text-orange-bright">
              {emp.cidade} · MG
            </span>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl">
              Lotes no {emp.nome}, em {emp.cidade}
            </h1>
            {emp.beneficio && (
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
                {emp.beneficio}
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={buildWhatsAppLink(msg)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <Icon name="whatsapp" size={18} />
                Consultar disponibilidade e condições
              </a>
              <a href="#lotes" className="btn-ghost-light">
                Ver lotes
                <Icon name="arrow-right" size={18} />
              </a>
            </div>

            {resumo.length > 0 && (
              <dl className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {resumo.map((r) => (
                  <div
                    key={r.rotulo}
                    className="rounded-card border border-white/10 bg-white/5 p-4"
                  >
                    <dt className="text-xs uppercase tracking-widest text-white/60">
                      {r.rotulo}
                    </dt>
                    <dd className="mt-1 font-display text-lg font-semibold">
                      {r.valor}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </section>

        {/* 02 · Lotes disponíveis */}
        <div id="lotes">
          <ImoveisGrid
            imoveis={lotes.map(propertyToCard)}
            eyebrow="Lotes disponíveis"
            title={`Lotes no ${emp.nome}`}
            intro="Disponibilidade e condições confirmadas pelo consultor no atendimento."
            showLink={false}
          />
        </div>

        <div className="bg-offwhite">
          <div className="container-content pb-16">
            <div className="flex flex-col items-start justify-between gap-4 rounded-card border border-line bg-white p-6 sm:flex-row sm:items-center">
              <p className="font-display text-lg font-semibold text-navy">
                Quer saber qual lote combina com o seu objetivo?
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

        {/* 03 · Localização */}
        {emp.localizacao && (
          <section className="bg-white">
            <div className="container-content py-20">
              <span className="eyebrow">Localização</span>
              <h2 className="section-title mt-3">Onde fica o {emp.nome}</h2>
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {emp.localizacao.mapa && (
                  <iframe
                    title={`Mapa do ${emp.nome}`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(emp.localizacao.mapa)}&output=embed`}
                    loading="lazy"
                    className="h-80 w-full rounded-card border border-line"
                  />
                )}
                <ul className="grid content-start gap-3">
                  {emp.localizacao.distancias.map((d) => (
                    <li key={d.titulo} className="rounded-card border border-line bg-offwhite p-5">
                      <p className="font-display font-semibold text-navy">{d.titulo}</p>
                      {d.detalhe && <p className="mt-1 text-sm text-muted">{d.detalhe}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* 04 · Infraestrutura */}
        {Boolean(emp.infraestrutura?.length || emp.terreno?.length) && (
          <section className="bg-offwhite">
            <div className="container-content py-20">
              <span className="eyebrow">Ficha do loteamento</span>
              <h2 className="section-title mt-3">Infraestrutura</h2>
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {[
                  { titulo: "Infraestrutura", itens: emp.infraestrutura },
                  { titulo: "Terreno", itens: emp.terreno },
                ]
                  .filter((b) => b.itens?.length)
                  .map((b) => (
                    <div key={b.titulo} className="rounded-card border border-line bg-white p-6">
                      <h3 className="font-display text-lg font-semibold text-navy">{b.titulo}</h3>
                      <ul className="mt-4 grid gap-3">
                        {b.itens!.map((item) => (
                          <li key={item.texto} className="flex items-center gap-3 text-ink">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange/10 text-orange-deep">
                              <Icon name={item.icone} size={18} />
                            </span>
                            {item.texto}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
              <p className="mt-6 text-sm text-muted">
                Detalhes de infraestrutura e prazos com o consultor.
              </p>
            </div>
          </section>
        )}

        {/* 05 · Fotos */}
        {emp.fotos?.length ? (
          <section className="bg-white">
            <div className="container-content py-20">
              <span className="eyebrow">Fotos</span>
              <h2 className="section-title mt-3">O {emp.nome} por dentro</h2>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {emp.fotos.map((f) => (
                  <div key={f.src} className="relative aspect-[16/10] overflow-hidden rounded-card">
                    <Image src={f.src} alt={f.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* 06 · Condições */}
        {emp.condicoes && (
          <section className="bg-offwhite">
            <div className="container-content py-20">
              <span className="eyebrow">Condições</span>
              <h2 className="section-title mt-3">Condições de pagamento</h2>
              <div className="mt-10 grid gap-8 md:grid-cols-2 md:items-start">
                <div className="rounded-card border border-line bg-white p-6">
                  <dl className="divide-y divide-line">
                    {[
                      ["Entrada", emp.condicoes.entrada],
                      ["Parcelas", emp.condicoes.parcelas],
                      ["Prazo", emp.condicoes.prazo],
                    ]
                      .filter(([, v]) => v)
                      .map(([rotulo, valor]) => (
                        <div key={rotulo} className="flex justify-between gap-4 py-3">
                          <dt className="text-muted">{rotulo}</dt>
                          <dd className="font-semibold text-navy">{valor}</dd>
                        </div>
                      ))}
                  </dl>
                  <p className="mt-4 text-xs text-muted">
                    Valores de {emp.condicoes.validoEm}, sujeitos a análise e às
                    condições do contrato.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-navy">
                    Financiamento próprio
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted">
                    O consultor apresenta a simulação para o seu caso, com
                    entrada e parcelas dentro da sua capacidade.
                  </p>
                  <a
                    href={buildWhatsAppLink(`${msg} Quero uma simulação.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary mt-6 text-sm"
                  >
                    <Icon name="whatsapp" size={16} />
                    Simular com um consultor
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 07 · O que conferir */}
        <section className="bg-white">
          <div className="container-content py-20">
            <span className="eyebrow">Compra segura</span>
            <h2 className="section-title mt-3">
              O que conferir antes de comprar um lote
            </h2>
            <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {checklistCompraLote.map((c, i) => (
                <li key={c.titulo} className="rounded-card border border-line bg-offwhite p-6">
                  <span className="font-display text-sm font-bold text-orange-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display font-semibold text-navy">{c.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.texto}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-muted">Avanz Imóveis · CRECI 8638-MG</p>
          </div>
        </section>

        {/* 08 · Como a Avanz conduz */}
        <ProcessSteps steps={processo} />
        <Testimonials depoimentos={depoimentos} />

        {/* 09 · Perguntas frequentes */}
        {emp.faq?.length ? (
          <section className="bg-offwhite">
            <div className="container-content py-20">
              <span className="eyebrow">Perguntas frequentes</span>
              <h2 className="section-title mt-3">Dúvidas sobre o {emp.nome}</h2>
              <div className="mt-10 max-w-3xl">
                <FAQ items={emp.faq} />
              </div>
            </div>
          </section>
        ) : null}

        {/* 10 · CTA final + links internos */}
        <FinalCTA
          title={`Consulte os lotes do ${emp.nome}`}
          body="Conte seu objetivo e o consultor confirma disponibilidade e condições pelo WhatsApp."
          ctaLabel="Falar no WhatsApp"
          ctaMessage={msg}
        />
        {emp.links?.length ? (
          <nav aria-label="Veja também" className="bg-navy-3">
            <div className="container-content flex flex-wrap gap-x-6 gap-y-2 pb-10 text-sm text-white/70">
              <span className="text-white/50">Veja também:</span>
              {emp.links.map((l) => (
                <Link key={l.href} href={l.href} className="underline hover:text-white">
                  {l.label}
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

async function carregarLotes(emp: Empreendimento): Promise<Property[]> {
  const res = await listProperties({
    development: emp.development,
    type: "lote",
    status: "disponivel",
    sort: "priceAsc",
    limit: 50,
  });
  return res.ok ? res.data.items : [];
}

/** Números do resumo saem dos lotes cadastrados, nunca digitados à mão. */
function montarResumo(emp: Empreendimento, lotes: Property[]) {
  const itens: { rotulo: string; valor: string }[] = [];
  if (lotes.length) {
    const areas = lotes.map((l) => l.area).filter((a) => a > 0);
    const precos = lotes.map((l) => l.price).filter((p) => p > 0);
    if (areas.length) {
      const min = Math.min(...areas);
      const max = Math.max(...areas);
      itens.push({
        rotulo: "Metragem",
        valor: min === max ? formatArea(min)! : `${formatArea(min)} a ${formatArea(max)}`,
      });
    }
    if (precos.length) {
      itens.push({ rotulo: "A partir de", valor: formatPreco(Math.min(...precos)) });
    }
  }
  if (emp.condicoes?.entrada) {
    itens.push({ rotulo: "Entrada", valor: emp.condicoes.entrada });
  }
  itens.push({
    rotulo: "Lotes disponíveis",
    valor: lotes.length ? String(lotes.length) : "Sob consulta",
  });
  const atualizado = lotes
    .map((l) => (l.updatedAt ? Date.parse(l.updatedAt) : NaN))
    .filter(Number.isFinite);
  if (atualizado.length) {
    itens.push({
      rotulo: "Atualizado em",
      valor: new Date(Math.max(...atualizado)).toLocaleDateString("pt-BR"),
    });
  }
  return itens;
}
