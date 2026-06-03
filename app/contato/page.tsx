import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloating } from "@/components/layout/WhatsAppFloating";
import { QuickLeadForm } from "@/components/shared/QuickLeadForm";
import { Icon } from "@/components/ui/Icon";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a Avanz pelo WhatsApp ou pelo formulário. Consultoria imobiliária na RMBH.",
};

export default function ContatoPage() {
  const ctaLink = buildWhatsAppLink(
    "Olá! Vim pela página de contato do site da Avanz."
  );

  return (
    <>
      <Header />
      <main>
        <section className="bg-navy text-white">
          <div className="container-content py-16 sm:py-20">
            <span className="eyebrow !text-orange-soft">Contato</span>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              Vamos conversar?
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              WhatsApp é o canal principal. Se preferir, deixe seus dados no
              formulário e a gente chama você.
            </p>
          </div>
        </section>

        <section className="bg-offwhite">
          <div className="container-content grid gap-10 py-16 lg:grid-cols-[1fr_1.2fr]">
            <aside className="space-y-5">
              <div className="rounded-card border border-line bg-white p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-card bg-navy text-orange">
                  <Icon name="whatsapp" size={22} />
                </span>
                <h2 className="mt-5 font-display text-lg font-semibold text-navy">
                  WhatsApp
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Resposta rápida, curadoria melhor e fluxo mais ágil.
                </p>
                <a
                  href={ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-5 w-full text-sm"
                >
                  <Icon name="whatsapp" size={18} />
                  Chamar agora
                </a>
                <a
                  href="tel:+5531971375793"
                  className="btn-secondary mt-3 w-full text-sm"
                >
                  <Icon name="phone" size={16} />
                  Ligar
                </a>
                <p className="mt-4 text-xs uppercase tracking-widest text-muted">
                  +55 31 97137-5793
                </p>
              </div>

              <div className="rounded-card border border-line bg-white p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-card bg-navy text-orange">
                  <Icon name="map" size={22} />
                </span>
                <h2 className="mt-5 font-display text-lg font-semibold text-navy">
                  Atuação
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Região Metropolitana de Belo Horizonte — Mateus Leme, Igarapé,
                  Betim, Contagem, Belo Horizonte e entorno.
                </p>
                <p className="mt-4 text-xs uppercase tracking-widest text-muted">
                  CRECI 8638-MG
                </p>
              </div>

              <div className="rounded-card border border-line bg-white p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-card bg-navy text-orange">
                  <Icon name="instagram" size={22} />
                </span>
                <h2 className="mt-5 font-display text-lg font-semibold text-navy">
                  Redes
                </h2>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <a
                      href="https://instagram.com/avanzimoveis"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-navy"
                    >
                      Instagram · @avanzimoveis
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://facebook.com/avanzimoveis"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-navy"
                    >
                      Facebook · Avanz Imóveis
                    </a>
                  </li>
                </ul>
              </div>
            </aside>

            <div className="rounded-card border border-line bg-white p-7 shadow-card">
              <h2 className="font-display text-xl font-semibold text-navy">
                Formulário rápido
              </h2>
              <p className="mt-2 text-sm text-muted">
                Nome, telefone e um resumo do que você busca. Sem cadastro
                infinito.
              </p>
              <div className="mt-6">
                <QuickLeadForm variant="contato" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloating />
    </>
  );
}
