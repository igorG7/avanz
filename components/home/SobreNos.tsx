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
              <div
                aria-hidden
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(249,115,22,0.22) 0%, transparent 60%)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-9xl font-bold text-orange/55 sm:text-[140px]">
                  ID
                </span>
              </div>
              <figcaption className="absolute bottom-4 right-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                Foto · em breve
              </figcaption>
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
      </div>
    </section>
  );
}
