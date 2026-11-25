import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";
import { AvanzIdeia } from "@/components/home/AvanzIdeia";
import { Cidades } from "@/components/home/Cidades";
import { SobreNos } from "@/components/home/SobreNos";
import { Pillars } from "@/components/shared/Pillars";
import { Testimonials } from "@/components/shared/Testimonials";
import { ImoveisGrid } from "@/components/imoveis/ImoveisGrid";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { Contato } from "@/components/home/Contato";
import { FAQ } from "@/components/shared/FAQ";
import { faqItems } from "@/lib/content/faq";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloating } from "@/components/layout/WhatsAppFloating";
import { listProperties } from "@/lib/api/imoveis";
import type { Pillar } from "@/lib/content/types";
import { depoimentos, processo } from "@/lib/content/institucional";
import { propertyToCard, type ImovelCardVM } from "@/lib/imoveis/view";

export const metadata: Metadata = {
  title: { absolute: "Lotes e terrenos na RMBH | Avanz Imóveis" },
  description:
    "Lotes, sítios e chácaras em Mateus Leme e na Região Metropolitana de BH, com consultoria imobiliária, atendimento direto e financiamento próprio.",
  alternates: { canonical: "/" },
};

const pillars: Pillar[] = [
  {
    icon: "wallet",
    title: "Venda com financiamento próprio",
    body: "Condições pensadas para viabilizar a compra, do primeiro imóvel ao investimento.",
  },
  {
    icon: "compass",
    title: "Seleção por perfil",
    body: "Você explica o que precisa. Nós filtramos e apresentamos opções coerentes.",
  },
  {
    icon: "eye",
    title: "Transparência e orientação",
    body: "Informações claras, próximos passos e acompanhamento no processo.",
  },
  {
    icon: "file-check",
    title: "Consultoria sob demanda",
    body: "Análise mais profunda quando necessário, contratada separadamente.",
  },
];

export default async function Home() {
  const destaques = await carregarDestaques();

  return (
    <>
      <Header />
      <main>
        <Hero
          eyebrow="Avanz - Consultoria imobiliária · MG"
          headline={
            <>
              Lotes e terrenos na{" "}
              <span className="text-orange-bright">RMBH</span>
            </>
          }
          subhead="Entender para atender. A compra do seu imóvel com clareza e direção, do primeiro lote ao investimento, sempre com transparência e atenção."
          ctaLabel="Falar agora"
          ctaMessage="Olá! Vim pelo site da Avanz. Quero entender as opções disponíveis."
          secondaryCtaLabel="Ver oportunidades"
          secondaryCtaHref="/imoveis"
          bullets={[
            "Variedade, terrenos, MCMV, médio/alto padrão",
            "Informações pertinentes, sem enrolação",
            "Atendimento direto e transparente",
          ]}
          stats={[]}
        />

        <Cidades />

        <AvanzIdeia />

        <ImoveisGrid imoveis={destaques} />

        <Pillars
          pillars={pillars}
          variant="featured"
          eyebrow="O que você encontra aqui"
          title={
            <>
              Foco em terrenos e loteamentos, abertura pro{" "}
              <span className="text-orange">seu perfil.</span>
            </>
          }
          description="Quatro frentes que a Avanz entrega com consistência, uma delas é o que nos separa do mercado."
        />

        <ProcessSteps steps={processo} />

        <Testimonials depoimentos={depoimentos} />

        <SobreNos />

        <Contato />

        <section id="faq" className="scroll-mt-16 bg-navy text-white">
          <div className="container-content py-20">
            <div className="max-w-2xl">
              <span className="eyebrow !text-orange-bright">FAQ</span>
              <h2 className="section-title mt-3 text-white">
                Dúvidas frequentes
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
                Respostas diretas pra acelerar sua decisão. Se ficar alguma
                pendência, é só chamar no WhatsApp.
              </p>
            </div>
            <div className="mt-12">
              <FAQ items={faqItems} variant="dark" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloating />
    </>
  );
}

// Destaques da carteira própria: prioriza os marcados como `featured` no painel
// e completa com os mais recentes quando não houver três.
async function carregarDestaques(): Promise<ImovelCardVM[]> {
  const [featured, recentes] = await Promise.all([
    listProperties({ featured: true, limit: 3 }),
    listProperties({ limit: 6 }),
  ]);

  const lista = featured.ok ? [...featured.data.items] : [];
  if (recentes.ok) {
    for (const item of recentes.data.items) {
      if (lista.length >= 3) break;
      if (!lista.some((i) => i.id === item.id)) lista.push(item);
    }
  }

  return lista.slice(0, 3).map(propertyToCard);
}
