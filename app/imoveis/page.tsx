import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ImoveisFiltro } from "@/components/imoveis/ImoveisFiltro";
import { FinalCTA } from "@/components/shared/FinalCTA";
import { WhatsAppFloating } from "@/components/layout/WhatsAppFloating";
import { imoveis } from "@/lib/content/imoveis";

export const metadata: Metadata = {
  title: "Imóveis disponíveis",
  description:
    "Lotes, sítios e chácaras selecionados pela Avanz na RMBH. Curadoria, financiamento próprio e atendimento humano.",
};

export default function ImoveisPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-navy text-white">
          <div className="container-content py-16 sm:py-20">
            <span className="eyebrow !text-orange-bright">Catálogo</span>
            <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
              Imóveis disponíveis na RMBH
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              Lotes, sítios e chácaras selecionados — novos, oportunidades raras
              ou parcerias diretas com proprietário. Confirme disponibilidade
              pelo WhatsApp.
            </p>
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
