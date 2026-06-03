import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Pillars } from "@/components/shared/Pillars";
import { FinalCTA } from "@/components/shared/FinalCTA";
import { WhatsAppFloating } from "@/components/layout/WhatsAppFloating";
import { Icon } from "@/components/ui/Icon";
import type { Pillar } from "@/lib/content/types";

export const metadata: Metadata = {
  title: "Sobre a Avanz",
  description:
    "A Avanz organiza o caminho da compra: curadoria imobiliária com financiamento próprio, foco em terrenos e loteamentos na RMBH.",
};

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

const equipe = [
  {
    nome: "Ivan Dias Sr.",
    papel: "Fundador · Consultor sênior",
    bio: "Mais de 9 anos atuando como referência em curadoria de lotes na RMBH. Conduz pessoalmente as decisões mais relevantes.",
  },
  {
    nome: "Ivan Dias Jr.",
    papel: "Tech & Marketing",
    bio: "Responsável pela presença digital, CRM e estrutura tecnológica da operação.",
  },
  {
    nome: "Mary Carmo",
    papel: "Financeiro & Atendimento",
    bio: "Cuida do financeiro, gestão e do primeiro contato com cada cliente.",
  },
];

const numeros = [
  { value: "+400", label: "clientes atendidos" },
  { value: "+9", label: "anos de história", footnote: "nova fase de marca" },
  { value: "CRECI", label: "8638-MG", footnote: "registro para sua segurança" },
];

export default function SobrePage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative isolate overflow-hidden bg-navy text-white">
          <div
            className="absolute inset-0 -z-10 opacity-25"
            style={{
              background:
                "radial-gradient(circle at 80% 20%, #F97316 0, transparent 40%), radial-gradient(circle at 20% 80%, #1B2A48 0, transparent 50%)",
            }}
          />
          <div className="container-content py-20 sm:py-24">
            <span className="eyebrow !text-orange-soft">Quem somos</span>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl">
              Entender para atender.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
              A Avanz organiza o caminho da compra: entende seu cenário, filtra
              opções coerentes e explica o processo com transparência — do
              primeiro contato ao fechamento.
            </p>
          </div>
        </section>

        <section className="bg-white">
          <div className="container-content py-20">
            <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-start">
              <div>
                <span className="eyebrow">Nossa história</span>
                <h2 className="section-title mt-3">
                  De Ivan Dias Imóveis a Avanz.
                </h2>
              </div>
              <div className="space-y-4 text-base leading-relaxed text-ink sm:text-lg">
                <p>
                  A Avanz é a nova fase de uma operação consolidada na RMBH.
                  Mais de nove anos atuando, +400 clientes atendidos — todos
                  passando pela mesma lógica: entender o cenário antes de
                  oferecer qualquer imóvel.
                </p>
                <p>
                  Em 2025, estruturamos como marca corporativa.{" "}
                  <strong className="text-navy">Avanz</strong> — de avanço,
                  progresso, direção. Mantemos o jeito de trabalhar, organizamos
                  a estrutura.
                </p>
                <p>
                  Foco máximo em terrenos e loteamentos, com financiamento
                  próprio. Abertura pro seu perfil: do primeiro imóvel ao
                  investimento, passando por Minha Casa Minha Vida.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-offwhite">
          <div className="container-content py-20">
            <ul className="grid gap-4 sm:grid-cols-3">
              {numeros.map((n) => (
                <li
                  key={n.label}
                  className="rounded-card border border-line bg-white p-6"
                >
                  <div className="font-display text-3xl font-bold text-navy">
                    {n.value}
                  </div>
                  <p className="mt-2 text-sm font-semibold text-navy">
                    {n.label}
                  </p>
                  {n.footnote && (
                    <p className="mt-1 text-xs text-muted">{n.footnote}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Pillars
          pillars={pillars}
          eyebrow="O que entregamos"
          title="Quatro frentes, sem misturar."
          description="Em um setor saturado de promessas, mantemos o básico bem feito."
        />

        <section className="bg-offwhite">
          <div className="container-content py-20">
            <div className="max-w-2xl">
              <span className="eyebrow">Equipe</span>
              <h2 className="section-title mt-3">
                Pequena, sênior, próxima.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                Sem call center, sem corretor revezando. Você fala com quem
                decide.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {equipe.map((p) => (
                <article
                  key={p.nome}
                  className="rounded-card border border-line bg-white p-7"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-card bg-navy text-orange">
                    <Icon name="headset" size={22} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-navy">
                    {p.nome}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-orange-deep">
                    {p.papel}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {p.bio}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA
          title="Quer entender melhor antes de decidir?"
          body="Conversa direta com consultor sênior. Sem cadastro, sem call center."
          ctaLabel="Falar com a Avanz"
          ctaMessage="Olá! Vi a página Sobre no site. Quero conversar com um consultor."
        />
      </main>
      <Footer />
      <WhatsAppFloating />
    </>
  );
}
