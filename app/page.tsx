import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";
import { AvanzIdeia } from "@/components/home/AvanzIdeia";
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
import { imoveis } from "@/lib/content/imoveis";
import type { Pillar, Depoimento } from "@/lib/content/types";

const pillars: Pillar[] = [
  {
    icon: "wallet",
    title: "Venda com financiamento próprio",
    body: "Condições pensadas para viabilizar a compra — do primeiro imóvel ao investimento.",
  },
  {
    icon: "compass",
    title: "Curadoria por perfil",
    body: "Você explica o que precisa. A gente filtra e apresenta opções coerentes.",
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

const process = [
  {
    icon: "headset" as const,
    title: "Entender para atender",
    body: "Você conta objetivo, região e necessidade. A Avanz organiza o cenário.",
  },
  {
    icon: "compass" as const,
    title: "Curadoria e proposta",
    body: "Selecionamos opções e alinhamos expectativas: terreno, loteamento, MCMV ou médio/alto padrão.",
  },
  {
    icon: "route" as const,
    title: "Visita e decisão",
    body: "Agendamos e acompanhamos. Sem surpresa no meio do caminho.",
  },
  {
    icon: "file-check" as const,
    title: "Condições e fechamento",
    body: "Apresentamos as condições disponíveis e orientamos o fechamento com clareza.",
  },
];

const depoimentos: Depoimento[] = [
  {
    quote:
      "Cheguei perdido com 30 anúncios na cabeça. Saí com 3 opções que faziam sentido pro meu bolso.",
    nome: "Rafael C.",
    contexto: "comprador de lote em Mateus Leme",
  },
  {
    quote:
      "Foi a primeira vez que alguém explicou os riscos antes de vender. Decisão sem medo.",
    nome: "Patrícia M.",
    contexto: "compradora de chácara em Igarapé",
  },
  {
    quote:
      "Financiamento próprio resolveu o que o banco não fez. Em duas semanas estava com a escritura.",
    nome: "Eduardo S.",
    contexto: "comprador de lote em Betim",
  },
];

export default function Home() {
  const destaques = imoveis.slice(0, 3);

  return (
    <>
      <Header />
      <main>
        <Hero
          eyebrow="Avanz - Consultoria imobiliária · MG"
          headline={
            <>
              Entender para atender. A compra do seu imóvel, com{" "}
              <span className="text-orange-bright">clareza</span> e{" "}
              <span className="text-orange-bright">direção</span>.
            </>
          }
          subhead="A Avanz trabalha com foco em terrenos e loteamentos, sem limitar seu perfil: do primeiro imóvel ao investimento — sempre com transparência e atenção."
          ctaLabel="Falar agora"
          ctaMessage="Olá! Vim pelo site da Avanz. Quero entender as opções disponíveis."
          secondaryCtaLabel="Ver oportunidades"
          secondaryCtaHref="/imoveis"
          bullets={[
            "Variedade — terrenos, MCMV, médio/alto padrão",
            "Informações pertinentes, sem enrolação",
            "Atendimento direto e transparente",
          ]}
          stats={[]}
        />

        <AvanzIdeia />

        <ImoveisGrid imoveis={destaques} />

        <Pillars
          pillars={pillars}
          variant="featured"
          eyebrow="O que você encontra aqui"
          title={
            <>
              Foco em terrenos e loteamentos — abertura pro{" "}
              <span className="text-orange">seu perfil.</span>
            </>
          }
          description="Quatro frentes que a Avanz entrega com consistência — uma delas é o que nos separa do mercado."
        />

        <ProcessSteps steps={process} />

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
