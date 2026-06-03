import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloating } from "@/components/layout/WhatsAppFloating";
import { FinalCTA } from "@/components/shared/FinalCTA";
import { Galeria } from "@/components/imoveis/Galeria";
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

const CONDICOES = [
  {
    icon: "whatsapp" as const,
    title: "Análise pelo WhatsApp",
    body: "Sem fila de banco. Conversa direta com consultor sênior.",
  },
  {
    icon: "wallet" as const,
    title: "Entrada flexível",
    body: "Condições adaptam-se ao seu cenário e capacidade de pagamento.",
  },
  {
    icon: "shield" as const,
    title: "Sem TR, sem reciprocidade",
    body: "Só o necessário pra você sair com a escritura na mão.",
  },
  {
    icon: "file-check" as const,
    title: "Documentação rápida",
    body: "Contrato e escritura formalizados em 7 a 15 dias.",
  },
];

export default async function ImovelPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const imovel = getImovel(slug);
  if (!imovel) notFound();

  const tipoLow = imovel.tipo.toLowerCase();
  const ctaMessage = `Olá! Tenho interesse no ${tipoLow} em ${imovel.bairro}, ${imovel.cidade} (${imovel.area} · ref ${imovel.slug}).`;
  const ctaMessageVisita = `Olá! Gostaria de agendar uma visita ao ${tipoLow} em ${imovel.bairro}, ${imovel.cidade} (ref ${imovel.slug}).`;
  const ctaMessageDocs = `Olá! Quero receber a documentação completa do ${tipoLow} em ${imovel.bairro}, ${imovel.cidade} (ref ${imovel.slug}).`;
  const ctaLink = buildWhatsAppLink(ctaMessage);
  const ctaLinkVisita = buildWhatsAppLink(ctaMessageVisita);
  const ctaLinkDocs = buildWhatsAppLink(ctaMessageDocs);

  // Share intent via WhatsApp — opens with no contact, user picks recipient.
  const shareUrl = `https://avanzimoveis.com/imoveis/${imovel.slug}`;
  const shareText = `Confira este ${imovel.tipo} em ${imovel.bairro}, ${imovel.cidade}: ${shareUrl}`;
  const shareLink = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  // Galeria de placeholder enquanto `imovel.fotos[]` não chega — quando o
  // catálogo real entrar, basta popular `fotos` no objeto e remover o fallback.
  const galeriaFotos =
    imovel.fotos && imovel.fotos.length > 0
      ? imovel.fotos
      : Array(4).fill(imovel.foto);

  return (
    <>
      <Header />
      <main>
        {/* Breadcrumb + Header block */}
        <section className="bg-offwhite">
          <div className="container-content pt-14 sm:pt-16">
            <nav
              aria-label="Caminho"
              className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-muted"
            >
              <Link href="/" className="hover:text-navy">
                Início
              </Link>
              <span aria-hidden className="text-base text-muted/60">
                ›
              </span>
              <Link href="/imoveis" className="hover:text-navy">
                Imóveis
              </Link>
              <span aria-hidden className="text-base text-muted/60">
                ›
              </span>
              <span className="font-medium text-navy">
                {imovel.tipo} em {imovel.bairro}, {imovel.cidade}
              </span>
            </nav>

            <div className="mt-8 max-w-4xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-orange-deep">
                {imovel.tipo} · {imovel.bairro}, {imovel.cidade}
              </span>
              <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-navy sm:text-4xl">
                {imovel.tipo} de {imovel.area} em {imovel.bairro}
              </h1>
            </div>
          </div>
        </section>

        {/* Image + sidebar */}
        <section className="bg-offwhite">
          <div className="container-content grid gap-10 pb-16 pt-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <Galeria
                fotos={galeriaFotos}
                alt={`${imovel.tipo} em ${imovel.bairro}`}
                badge={imovel.badge}
              />

              {imovel.descricao && (
                <div className="mt-10">
                  <h2 className="font-display text-lg font-semibold text-navy">
                    Sobre o imóvel
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-ink">
                    {imovel.descricao}
                  </p>
                </div>
              )}

              {imovel.caracteristicas && imovel.caracteristicas.length > 0 && (
                <div className="mt-10">
                  <h2 className="font-display text-lg font-semibold text-navy">
                    Ficha técnica
                  </h2>
                  <dl className="mt-5 overflow-hidden rounded-card border border-line bg-white">
                    {imovel.caracteristicas.map((c, i) => (
                      <div
                        key={c.label}
                        className={`flex flex-col gap-1 p-6 sm:grid sm:grid-cols-[1fr_2fr] sm:items-baseline sm:gap-6 sm:p-7 ${
                          i !== imovel.caracteristicas!.length - 1
                            ? "border-b border-line"
                            : ""
                        }`}
                      >
                        <dt className="text-sm font-bold uppercase tracking-[0.18em] text-orange-deep">
                          {c.label}
                        </dt>
                        <dd className="font-display text-base font-semibold text-navy">
                          {c.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {/* Localização */}
              <div className="mt-10">
                <h2 className="font-display text-lg font-semibold text-navy">
                  Localização
                </h2>
                <div className="mt-5 overflow-hidden rounded-card border border-line bg-white">
                  <div className="flex items-start gap-4 p-6 sm:p-7">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-card bg-navy text-orange">
                      <Icon name="map" size={22} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-display text-lg font-bold text-navy sm:text-xl">
                        {imovel.bairro}
                      </div>
                      <div className="mt-1 text-sm text-muted">
                        {imovel.cidade} · Minas Gerais
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                        Região Metropolitana de Belo Horizonte. Endereço exato
                        compartilhado durante a visita — proteção de
                        privacidade até o primeiro contato.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Condições de pagamento */}
              <div className="mt-10">
                <h2 className="font-display text-lg font-semibold text-navy">
                  Condições de pagamento
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                  Financiamento próprio Avanz — condições reais conversadas com
                  o consultor.
                </p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {CONDICOES.map((c) => (
                    <li
                      key={c.title}
                      className="flex gap-3.5 rounded-card border border-line bg-white p-5"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card bg-orange/10 text-orange-deep">
                        <Icon name={c.icon} size={18} />
                      </span>
                      <div>
                        <h3 className="font-display text-sm font-semibold text-navy">
                          {c.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted">
                          {c.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-card border border-line bg-white p-6 shadow-card">
                {/* Ref pill */}
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-pill bg-offwhite px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
                    REF · {imovel.slug}
                  </span>
                  {imovel.badge && (
                    <span className="rounded-pill bg-orange/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-orange-deep">
                      {imovel.badge}
                    </span>
                  )}
                </div>

                {/* Valor */}
                <div className="mt-5">
                  <span className="text-xs font-semibold uppercase tracking-widest text-orange-deep">
                    Valor
                  </span>
                  <p className="mt-2 font-display text-3xl font-bold text-navy">
                    {imovel.preco}
                  </p>
                  <p className="mt-3 text-sm text-muted">
                    Confirme disponibilidade e condições de financiamento
                    direto com o consultor.
                  </p>
                </div>

                {/* CTAs */}
                <div className="mt-7 space-y-4">
                  <a
                    href={ctaLinkVisita}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full"
                  >
                    <Icon name="calendar" size={18} />
                    Agendar visita
                  </a>
                  <a
                    href={ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full"
                  >
                    <Icon name="whatsapp" size={16} />
                    Falar com a Avanz
                  </a>
                  <a
                    href={ctaLinkDocs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex w-full items-center justify-center gap-2 py-1 text-sm font-semibold text-orange-deep transition hover:text-orange"
                  >
                    <Icon name="file-check" size={16} />
                    Receber documentação
                  </a>
                </div>

                {/* Compartilhar */}
                <div className="mt-5 border-t border-line pt-5">
                  <a
                    href={shareLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-card border border-line bg-offwhite px-4 py-2.5 text-sm font-semibold text-navy transition hover:border-orange/40 hover:text-orange-deep"
                  >
                    <Icon name="share" size={16} />
                    Compartilhar via WhatsApp
                  </a>
                </div>

                {/* Trust items */}
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
