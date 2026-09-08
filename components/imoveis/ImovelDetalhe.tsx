import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloating } from "@/components/layout/WhatsAppFloating";
import { Galeria } from "@/components/imoveis/Galeria";
import { ImoveisGrid } from "@/components/imoveis/ImoveisGrid";
import { Icon } from "@/components/ui/Icon";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { NAO_INFORMADO, type Caracteristica, type ImovelCardVM } from "@/lib/imoveis/view";

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
    body: "Contrato formalizado de 7 a 15 dias.",
  },
];

export type ImovelDetalheProps = {
  eyebrow: string;
  titulo: string;
  breadcrumb: string;
  bairro: string;
  cidade: string;
  estado?: string;
  preco: string;
  referencia: string;
  /** Como o imóvel é identificado nas mensagens de WhatsApp. */
  refMensagem?: string;
  badge?: string;
  descricao?: string;
  ficha: Caracteristica[];
  fotos: string[];
  /** Nota de origem — usada para deixar claro quando o imóvel é da carteira parceira. */
  aviso?: string;
  /** Como o imóvel é descrito nas mensagens de WhatsApp. */
  descricaoCurta: string;
  url: string;
  similares: ImovelCardVM[];
  similaresTitle: string;
  similaresIntro: string;
  /** Volta para a vitrine no mesmo estado (aba, filtros e página) em que o visitante estava. */
  voltarHref: string;
  voltarLabel: string;
};

export function ImovelDetalhe({
  eyebrow,
  titulo,
  breadcrumb,
  bairro,
  cidade,
  estado = "Minas Gerais",
  preco,
  referencia,
  refMensagem,
  badge,
  descricao,
  ficha,
  fotos,
  aviso,
  descricaoCurta,
  url,
  similares,
  similaresTitle,
  similaresIntro,
  voltarHref,
  voltarLabel,
}: ImovelDetalheProps) {
  const ref = refMensagem || referencia;
  const ctaMessage = `Olá! Tenho interesse no ${descricaoCurta} (ref ${ref}).`;
  const ctaLink = buildWhatsAppLink(ctaMessage);
  const ctaLinkVisita = buildWhatsAppLink(
    `Olá! Gostaria de agendar uma visita ao ${descricaoCurta} (ref ${ref}).`,
  );

  // Share intent via WhatsApp — opens with no contact, user picks recipient.
  const shareLink = `https://wa.me/?text=${encodeURIComponent(
    `Confira este imóvel da Avanz: ${titulo} — ${url}`,
  )}`;

  return (
    <>
      <Header />
      <main>
        <section className="bg-offwhite">
          <div className="container-content pt-10 sm:pt-12">
            <Link
              href={voltarHref}
              className="inline-flex items-center gap-2 rounded-pill border border-line bg-white px-4 py-2 text-sm font-semibold text-navy shadow-card transition hover:border-orange/40 hover:text-orange-deep"
            >
              <span aria-hidden className="rotate-180">
                <Icon name="arrow-right" size={14} />
              </span>
              {voltarLabel}
            </Link>

            <nav
              aria-label="Caminho"
              className="mt-6 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-muted"
            >
              <Link href="/" className="hover:text-navy">
                Início
              </Link>
              <span aria-hidden className="text-base text-muted/60">
                ›
              </span>
              <Link href={voltarHref} className="hover:text-navy">
                Imóveis
              </Link>
              <span aria-hidden className="text-base text-muted/60">
                ›
              </span>
              <span className="font-medium text-navy">{breadcrumb}</span>
            </nav>

            <div className="mt-8 max-w-4xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-orange-deep">
                {eyebrow}
              </span>
              <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-navy sm:text-4xl">
                {titulo}
              </h1>
            </div>
          </div>
        </section>

        <section className="bg-offwhite">
          <div className="container-content grid gap-10 pt-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              {fotos.length > 0 ? (
                <Galeria fotos={fotos} alt={titulo} badge={badge} />
              ) : (
                <div className="flex aspect-[16/10] items-center justify-center rounded-card border border-line bg-white text-navy/25">
                  <Icon name="map" size={48} />
                </div>
              )}
            </div>

            <aside>
              <div className="rounded-card border border-line bg-white p-6 shadow-card">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-pill bg-offwhite px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
                    REF · {referencia}
                  </span>
                  {badge && (
                    <span className="rounded-pill bg-orange/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-orange-deep">
                      {badge}
                    </span>
                  )}
                </div>

                <div className="mt-5">
                  <span className="text-xs font-semibold uppercase tracking-widest text-orange-deep">
                    Valor
                  </span>
                  <p className="mt-2 font-display text-3xl font-bold text-navy">
                    {preco}
                  </p>
                  <p className="mt-3 text-sm text-muted">
                    Confirme disponibilidade e condições de financiamento direto
                    com o consultor.
                  </p>
                </div>

                {aviso && (
                  <p className="mt-4 rounded-card bg-offwhite p-4 text-xs leading-relaxed text-muted">
                    {aviso}
                  </p>
                )}

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
                </div>

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

        <section className="bg-offwhite">
          <div className="container-content space-y-10 pb-16 pt-12">
            {descricao && (
              <div>
                <h2 className="font-display text-lg font-semibold text-navy">
                  Sobre o imóvel
                </h2>
                <p className="mt-3 max-w-4xl whitespace-pre-line text-base leading-relaxed text-ink">
                  {descricao}
                </p>
              </div>
            )}

            {ficha.length > 0 && (
              <div>
                <h2 className="font-display text-lg font-semibold text-navy">
                  Ficha técnica
                </h2>
                {/* Divisor por borda de célula, e não por gap sobre fundo
                    cinza: uma última linha incompleta não deixa buraco. */}
                <dl className="mt-5 grid overflow-hidden rounded-card border border-line bg-white sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {ficha.map((c) => (
                    <div
                      key={c.label}
                      className="border-b border-r border-line p-5 sm:p-6"
                    >
                      <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange-deep">
                        {c.label}
                      </dt>
                      <dd
                        className={`mt-2 font-display text-base font-semibold ${
                          c.value === NAO_INFORMADO ? "text-muted/70" : "text-navy"
                        }`}
                      >
                        {c.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            <div>
              <h2 className="font-display text-lg font-semibold text-navy">
                Localização
              </h2>
              <div className="mt-5 overflow-hidden rounded-card border border-line bg-white">
                <div className="p-6 sm:p-7">
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-card bg-navy text-orange">
                      <Icon name="map" size={22} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-display text-lg font-bold text-navy sm:text-xl">
                        {bairro}
                      </div>
                      <div className="mt-1 text-sm text-muted">
                        {cidade} · {estado}
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted sm:ml-16 sm:text-base">
                    Região Metropolitana de Belo Horizonte. Endereço exato
                    compartilhado durante a visita, proteção de privacidade
                    até o primeiro contato.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-navy">
                Condições de pagamento
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                Financiamento próprio Avanz, condições reais conversadas com o
                consultor.
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
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
        </section>

        {similares.length > 0 && (
          <ImoveisGrid
            imoveis={similares}
            eyebrow="Mais opções"
            title={similaresTitle}
            intro={similaresIntro}
            showLink={false}
          />
        )}
      </main>
      <Footer />
      <WhatsAppFloating message={ctaMessage} />
    </>
  );
}
