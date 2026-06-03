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
    year: "2025",
    title: "Estruturação como Avanz",
    body: "A operação se transforma em marca corporativa: Avanz — de avanço, progresso, direção. Mesma essência, nova escala.",
  },
  {
    year: "2026",
    title: "Nova fase, mesmo método",
    body: "Operação digital integrada ao atendimento humano. Foco em terrenos, loteamentos, MCMV e médio padrão.",
  },
];

export function Historia() {
  return (
    <section className="bg-offwhite">
      <div className="container-content py-20">
        <div className="max-w-2xl">
          <span className="eyebrow">História</span>
          <h2 className="section-title mt-3">
            De Ivan Dias Imóveis a Avanz.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            Quase uma década no mercado imobiliário da RMBH consolidada em uma
            marca pronta pra escalar — mantendo o que sempre nos definiu.
          </p>
        </div>

        {/* Desktop timeline */}
        <div className="relative mt-20 hidden md:block">
          {/* Horizontal path line (centered through node circles) */}
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
                {/* Year node — circle with year inside */}
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-navy shadow-cta ring-[5px] ring-offwhite">
                  <span className="font-display text-sm font-bold text-orange">
                    {m.year}
                  </span>
                </div>

                {/* Connector down to card */}
                <div
                  aria-hidden
                  className="my-5 h-8 w-px"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(249,115,22,0.55), rgba(229,231,235,1))",
                  }}
                />

                {/* Description card */}
                <article className="w-full rounded-card border border-line bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-orange/40 hover:shadow-card">
                  <h3 className="font-display text-base font-semibold text-navy">
                    {m.title}
                  </h3>
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
                <h3 className="font-display text-base font-semibold text-navy">
                  {m.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {m.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* Founder quote */}
        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-[1fr_1.5fr] md:items-center md:gap-14">
          {/* Photo (placeholder até subir foto real do Ivan) */}
          <figure className="relative isolate aspect-[4/5] overflow-hidden rounded-card bg-navy">
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
              <span className="font-display text-9xl font-bold text-orange/55 sm:text-[160px]">
                ID
              </span>
            </div>
            <figcaption className="absolute bottom-4 left-4 right-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
              Foto · em breve
            </figcaption>
          </figure>

          {/* Quote */}
          <figure>
            <span
              aria-hidden
              className="block select-none font-display text-6xl font-bold leading-none text-orange sm:text-7xl"
            >
              “
            </span>
            <blockquote className="-mt-3 font-display text-xl font-medium leading-relaxed text-ink sm:-mt-4 sm:text-2xl">
              Cada chave é uma vida que muda de capítulo. Quando entendemos
              isso, paramos de empurrar imóveis e começamos a ouvir.
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 text-sm">
              <span aria-hidden className="h-px w-10 bg-orange" />
              <span className="font-display font-semibold text-navy">
                Ivan Dias
              </span>
              <span className="text-muted">· Fundador</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
