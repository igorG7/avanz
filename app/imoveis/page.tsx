import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ImoveisFiltro } from "@/components/imoveis/ImoveisFiltro";
import { FinalCTA } from "@/components/shared/FinalCTA";
import { WhatsAppFloating } from "@/components/layout/WhatsAppFloating";
import { Icon } from "@/components/ui/Icon";
import { imoveis } from "@/lib/content/imoveis";

export const metadata: Metadata = {
  title: "Imóveis disponíveis",
  description:
    "Lotes, sítios e chácaras selecionados pela Avanz na RMBH. Curadoria, financiamento próprio e atendimento humano.",
};

const HIGHLIGHTS = [
  { icon: "sliders" as const, label: "Filtre por cidade, tipo e faixa" },
  { icon: "shield" as const, label: "Documentação verificada" },
  { icon: "whatsapp" as const, label: "Confirma direto no WhatsApp" },
];

export default function ImoveisPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative isolate overflow-hidden bg-navy text-white">
          <div aria-hidden className="hero-grid absolute inset-0 -z-10">
            <span
              className="hero-beam hero-beam-h"
              style={{ top: "128px", animationDuration: "7s" }}
            />
            <span
              className="hero-beam hero-beam-v"
              style={{
                left: "896px",
                animationDelay: "2.4s",
                animationDuration: "8s",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 0%, rgba(18,19,29,0.35) 70%, rgba(18,19,29,0.85) 100%)",
              }}
            />
          </div>

          <div className="container-content py-16 sm:py-20">
            <span className="eyebrow !text-orange-bright">Catálogo</span>
            <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
              Imóveis disponíveis na <span className="text-orange-bright">RMBH</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              Lotes, sítios e chácaras selecionados — novos, oportunidades raras
              ou parcerias diretas com proprietário. Confirme disponibilidade
              pelo WhatsApp.
            </p>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/75">
              {HIGHLIGHTS.map((h) => (
                <li key={h.label} className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-orange-bright">
                    <Icon name={h.icon} size={14} />
                  </span>
                  {h.label}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-offwhite">
          <div className="container-content py-16 sm:py-20">
            <ImoveisFiltro imoveis={imoveis} />
          </div>
        </section>

        <FinalCTA
          title="Não achou o que procura?"
          body="A gente faz a curadoria sob medida. Conta o que você busca e mostramos opções que fazem sentido."
          ctaLabel="Pedir opções no WhatsApp"
          ctaMessage="Olá! Vi os imóveis no site mas quero opções mais específicas. Pode me ajudar?"
        />
      </main>
      <Footer />
      <WhatsAppFloating />
    </>
  );
}
