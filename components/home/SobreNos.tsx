import Image from "next/image";

type Milestone = {
  year: string;
  title: string;
  body: string;
};

const MILESTONES: Milestone[] = [
  {
    year: "2017",
    title: "Início no mercado imobiliário",
    body: "Ivan começa a atuar no mercado imobiliário da RMBH, construindo a base de relacionamentos, conhecimento de bairros e leitura de valorização que sustentariam a operação.",
  },
  {
    year: "2021",
    title: "Início como Ivan Dias Imóveis",
    body: "Ivan Dias começa atendimento personalizado em terrenos e loteamentos na RMBH, com a marca pessoal Ivan Dias Imóveis.",
  },
  {
    year: "2023",
    title: "Estruturação como Avanz",
    body: "A operação se transforma em marca corporativa: Avanz, de avanço, progresso, direção. Mesma essência, nova escala.",
  },
  {
    year: "2026",
    title: "Nova fase, mesmo método",
    body: "Operação digital integrada ao atendimento humano. Foco em terrenos, loteamentos, MCMV e médio padrão.",
  },
];

type Membro = {
  nome: string;
  iniciais: string;
  papel: string;
  body: string;
};

// Iniciais no lugar do retrato enquanto não há foto; a moldura não muda quando
// ela chegar. O fundador tem bloco próprio acima e não se repete aqui.
const EQUIPE: Membro[] = [
  {
    nome: "Mary Carmo",
    iniciais: "MC",
    papel: "Atendimento e financeiro",
    body: "Primeiro contato, agendamento de visitas e a parte financeira do processo, da proposta à documentação.",
  },
];

export function SobreNos() {
  return (
    <section id="sobre" className="scroll-mt-16 bg-offwhite">
      <div className="container-content py-20">
        {/* Block 1 — Mission (left) + Founder quote card (right) */}
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr] md:items-start md:gap-14">
          <div>
            <span className="eyebrow">Sobre nós</span>
            <h2 className="section-title mt-3">
              Comprar imóvel é <span className="text-orange">decisão</span> de
              vida.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink sm:text-lg">
              <p>
                A Avanz Imóveis nasceu da convicção de que comprar um imóvel
                não é uma transação, é uma decisão de vida. Operamos em Belo
                Horizonte, Mateus Leme, Jaboticatubas e RMBH, com um modelo de
                consultoria que coloca o atendimento como produto principal.
              </p>
              <p>
                O mercado oferece volume. Falta direção. É aí que entramos:
                filtramos, traduzimos, organizamos, para que você decida com
                clareza, sem ruído. Trabalhamos com terrenos, loteamentos, MCMV
                e médio padrão, com opções de financiamento próprio.
              </p>
            </div>
          </div>

          <div>
            <span className="eyebrow">O fundador</span>
            <h3 className="mt-3 font-display text-xl font-bold text-navy sm:text-2xl">
              Ivan Dias
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
              Há quase uma década organizando decisões imobiliárias na RMBH.
            </p>

            <figure className="relative isolate mt-5 aspect-[4/5] overflow-hidden rounded-card bg-navy shadow-card">
              <Image
                src="/ivan-dias.jpg"
                alt="Ivan Dias, fundador da Avanz Imóveis"
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover object-top"
              />
            </figure>
          </div>
        </div>

        {/* Block 2 — Trajetória (subordinated, no eyebrow, smaller heading) */}
        <div className="mt-16 border-t border-line pt-16">
          <div className="max-w-2xl">
            <h3 className="font-display text-2xl font-bold leading-tight text-navy sm:text-3xl">
              De Ivan Dias Imóveis a Avanz.
            </h3>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              Quase uma década no mercado imobiliário da RMBH consolidada em
              uma marca pronta pra escalar, mantendo o que sempre nos definiu.
            </p>
          </div>

          {/* Desktop timeline */}
          <div className="relative mt-14 hidden md:block">
            <div
              aria-hidden
              className="absolute left-[12.5%] right-[12.5%] top-8 -translate-y-1/2 rounded-full"
              style={{
                height: "3px",
                background:
                  "linear-gradient(to right, rgba(249,115,22,0.85) 0%, rgba(249,115,22,0.5) 50%, rgba(249,115,22,0.85) 100%)",
                boxShadow: "0 0 10px rgba(249, 115, 22, 0.35)",
              }}
            />

            <div className="relative grid grid-cols-4 gap-8">
              {MILESTONES.map((m) => (
                <div
                  key={m.year}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-navy shadow-cta ring-[5px] ring-offwhite">
                    <span className="font-display text-sm font-bold text-orange">
                      {m.year}
                    </span>
                  </div>
                  <div
                    aria-hidden
                    className="my-5 h-8 w-px"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(249,115,22,0.55), rgba(229,231,235,1))",
                    }}
                  />
                  <article className="w-full rounded-card border border-line bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-orange/40 hover:shadow-card">
                    <h4 className="font-display text-base font-semibold text-navy">
                      {m.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {m.body}
                    </p>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile vertical timeline */}
          <ol className="relative mt-12 space-y-8 md:hidden">
            <div
              aria-hidden
              className="absolute left-8 top-2 bottom-2 w-px"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(249,115,22,0) 0%, rgba(249,115,22,0.55) 10%, rgba(249,115,22,0.55) 90%, rgba(249,115,22,0) 100%)",
              }}
            />
            {MILESTONES.map((m) => (
              <li key={m.year} className="relative flex gap-5">
                <span className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-navy shadow-cta ring-[5px] ring-offwhite">
                  <span className="font-display text-xs font-bold text-orange">
                    {m.year}
                  </span>
                </span>
                <div className="flex-1 pt-2">
                  <h4 className="font-display text-base font-semibold text-navy">
                    {m.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {m.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Block 3 — Equipe */}
        <div className="mt-16 border-t border-line pt-16">
          <div className="max-w-2xl">
            <h3 className="font-display text-2xl font-bold leading-tight text-navy sm:text-3xl">
              Quem atende você.
            </h3>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              Time enxuto por escolha. Você fala com quem decide e com quem
              acompanha seu processo do primeiro contato à escritura, sem
              passar por fila nem repetir sua história a cada ligação.
            </p>
          </div>

          <ul className="mt-12 space-y-12">
            {EQUIPE.map((pessoa) => (
              <li
                key={pessoa.nome}
                className="grid gap-8 md:grid-cols-[1fr_1.3fr] md:items-center md:gap-14"
              >
                <figure className="relative isolate aspect-[4/5] overflow-hidden rounded-card bg-navy shadow-card">
                  <span
                    aria-hidden
                    className="absolute inset-0 flex items-center justify-center font-display text-8xl font-bold text-orange/55"
                  >
                    {pessoa.iniciais}
                  </span>
                </figure>

                <div>
                  <h4 className="font-display text-xl font-bold text-navy sm:text-2xl">
                    {pessoa.nome}
                  </h4>
                  <p className="mt-1.5 text-xs font-semibold uppercase tracking-widest text-orange-deep">
                    {pessoa.papel}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-ink">
                    {pessoa.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
