type Valor = {
  number: string;
  title: string;
  body: string;
};

const VALORES: Valor[] = [
  {
    number: "01",
    title: "Atendimento",
    body: "Cada vez mais próximo do cliente. O atendimento é o nosso principal produto.",
  },
  {
    number: "02",
    title: "Transparência",
    body: "Documentação verificada antes de apresentar. Sem tratos de terceiros.",
  },
  {
    number: "03",
    title: "Agilidade",
    body: "Resposta rápida, decisão organizada. O tempo do cliente é prioridade.",
  },
  {
    number: "04",
    title: "Tecnologia",
    body: "Ferramentas e IA a serviço da clareza — não como vitrine.",
  },
  {
    number: "05",
    title: "Clareza",
    body: "Explicar de forma simples e objetiva. Sem nada obscuro.",
  },
  {
    number: "06",
    title: "Excelência",
    body: "Fazer cada anúncio e cada negociação como se fosse o único.",
  },
];

function cardBorders(i: number, total: number, cols: number) {
  const classes: string[] = [];
  // Mobile (1 col): border-b on all except last
  if (i < total - 1) classes.push("border-b", "border-white/10");
  // md+ (cols cols): right border on non-last column
  if (i % cols !== cols - 1) classes.push("md:border-r", "md:border-white/10");
  // md+: remove bottom for cards in last row
  const lastRowStart = total - (total % cols || cols);
  if (i >= lastRowStart) classes.push("md:border-b-0");
  return classes.join(" ");
}

export function Valores() {
  return (
    <section className="bg-navy text-white">
      <div className="container-content py-20">
        <div className="max-w-2xl">
          <span className="eyebrow !text-orange-bright">Valores</span>
          <h2 className="section-title mt-3 text-white">
            Seis valores. Uma{" "}
            <span className="text-orange-bright">direção</span>.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
            Seis princípios que sustentam cada atendimento, cada análise e cada
            decisão.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3">
          {VALORES.map((v, i) => (
            <article
              key={v.title}
              className={`p-7 md:p-8 ${
                i % 2 === 0 ? "bg-navy-3" : ""
              } ${cardBorders(i, VALORES.length, 3)}`}
            >
              <span className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-orange-bright">
                {v.number}
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
                {v.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
                {v.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
