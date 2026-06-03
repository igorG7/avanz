import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloating } from "@/components/layout/WhatsAppFloating";
import { FinalCTA } from "@/components/shared/FinalCTA";
import { Icon } from "@/components/ui/Icon";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { imoveis, getImovel } from "@/lib/content/imoveis";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return imoveis.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const imovel = getImovel(slug);
  if (!imovel) return { title: "Imóvel não encontrado" };
  return {
    title: `${imovel.tipo} em ${imovel.bairro}, ${imovel.cidade}`,
    description:
      imovel.resumo ??
      `${imovel.tipo} de ${imovel.area} em ${imovel.bairro}, ${imovel.cidade}.`,
  };
}

export default async function ImovelPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const imovel = getImovel(slug);
  if (!imovel) notFound();

  const ctaMessage = `Olá! Tenho interesse no ${imovel.tipo.toLowerCase()} em ${imovel.bairro}, ${imovel.cidade} (${imovel.area} · ref ${imovel.slug}).`;
  const ctaLink = buildWhatsAppLink(ctaMessage);

  return (
    <>
      <Header />
      <main>
        <section className="bg-offwhite">
          <div className="container-content py-10">
            <Link
              href="/imoveis"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-navy"
            >
              <Icon name="arrow-right" size={16} className="rotate-180" />
              Voltar para imóveis
            </Link>
          </div>
        </section>

        <section className="bg-offwhite">
          <div className="container-content grid gap-10 pb-16 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-card bg-line shadow-card">
                <Image
                  src={imovel.foto}
                  alt={`${imovel.tipo} em ${imovel.bairro}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                />
                {imovel.badge && (
                  <span className="absolute left-4 top-4 rounded-pill bg-orange px-3 py-1 text-xs font-semibold text-white shadow-cta">
                    {imovel.badge}
                  </span>
                )}
              </div>

              <div className="mt-8">
                <span className="text-xs font-semibold uppercase tracking-widest text-orange-deep">
                  {imovel.tipo} · {imovel.bairro}, {imovel.cidade}
                </span>
                <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-navy sm:text-4xl">
                  {imovel.tipo} de {imovel.area} em {imovel.bairro}
                </h1>
                {imovel.destaque && (
                  <p className="mt-3 text-base text-muted">{imovel.destaque}</p>
                )}
                {imovel.descricao && (
                  <p className="mt-6 text-base leading-relaxed text-ink">
                    {imovel.descricao}
                  </p>
                )}

                {imovel.caracteristicas && imovel.caracteristicas.length > 0 && (
                  <div className="mt-8">
                    <h2 className="font-display text-lg font-semibold text-navy">
                      Características
                    </h2>
                    <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                      {imovel.caracteristicas.map((c) => (
                        <div
                          key={c.label}
                          className="rounded-card border border-line bg-white px-4 py-3"
                        >
                          <dt className="text-xs uppercase tracking-widest text-muted">
                            {c.label}
                          </dt>
                          <dd className="mt-1 font-display text-sm font-semibold text-navy">
                            {c.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-card border border-line bg-white p-6 shadow-card">
                <span className="text-xs font-semibold uppercase tracking-widest text-orange-deep">
                  Valor
                </span>
                <p className="mt-2 font-display text-3xl font-bold text-navy">
                  {imovel.preco}
                </p>
                <p className="mt-3 text-sm text-muted">
                  Confirme disponibilidade e condições de financiamento direto
                  com o consultor.
                </p>
                <a
                  href={ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-6 w-full"
                >
                  <Icon name="whatsapp" size={18} />
                  Quero saber mais
                </a>
                <Link
                  href="/contato"
                  className="btn-secondary mt-3 w-full"
                >
                  Prefiro o formulário
                </Link>
                <ul className="mt-6 space-y-2.5 text-sm text-muted">
                  <li className="flex items-center gap-2.5">
                    <Icon name="check" size={16} className="text-orange" />
                    Sem call center
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Icon name="check" size={16} className="text-orange" />
                    Consultor sênior
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Icon name="check" size={16} className="text-orange" />
                    Resposta direta no WhatsApp
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </section>

        <FinalCTA
          title="Quer ver outros imóveis parecidos?"
          body="A curadoria Avanz seleciona 3 a 5 opções alinhadas ao seu objetivo. Sem ruído."
          ctaLabel="Conversar no WhatsApp"
          ctaMessage="Olá! Vi um imóvel no site e quero ver opções parecidas. Pode me ajudar?"
        />
      </main>
      <Footer />
      <WhatsAppFloating message={ctaMessage} />
    </>
  );
}
