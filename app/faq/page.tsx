import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FAQ } from "@/components/shared/FAQ";
import { FinalCTA } from "@/components/shared/FinalCTA";
import { WhatsAppFloating } from "@/components/layout/WhatsAppFloating";
import { faqItems } from "@/lib/content/faq";

export const metadata: Metadata = {
  title: "Dúvidas frequentes",
  description:
    "Respostas diretas sobre financiamento próprio, regiões de atuação, processo de compra e atendimento.",
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-navy text-white">
          <div className="container-content py-16 sm:py-20">
            <span className="eyebrow !text-orange-soft">FAQ</span>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              Dúvidas frequentes
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              Respostas diretas para acelerar sua decisão. Se ficar alguma
              pendência, é só chamar no WhatsApp — a gente responde direto.
            </p>
          </div>
        </section>

        <section className="bg-offwhite">
          <div className="container-content py-16">
            <div className="mx-auto max-w-3xl">
              <FAQ items={faqItems} />
            </div>
          </div>
        </section>

        <FinalCTA
          title="Ficou alguma dúvida específica?"
          body="Conversa direta no WhatsApp, sem call center."
          ctaLabel="Falar com a Avanz"
          ctaMessage="Olá! Vim pelo FAQ do site da Avanz e tenho uma dúvida."
        />
      </main>
      <Footer />
      <WhatsAppFloating />
    </>
  );
}
