import type { Depoimento } from "@/lib/content/types";

type Props = {
  depoimentos: Depoimento[];
  eyebrow?: string;
  title?: string;
};

export function Testimonials({
  depoimentos,
  eyebrow = "Histórias reais",
  title = "Quem decidiu com a Avanz, decidiu com clareza.",
}: Props) {
  if (!depoimentos.length) return null;
  return (
    <section className="bg-white">
      <div className="container-content py-20">
        <div className="max-w-2xl">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="section-title mt-3">{title}</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {depoimentos.map((d) => (
            <figure
              key={d.nome}
              className="relative rounded-card border border-line bg-offwhite p-7"
            >
              <span className="absolute -top-3 left-6 font-display text-5xl leading-none text-orange">
                “
              </span>
              <blockquote className="mt-3 text-base leading-relaxed text-ink">
                {d.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-line pt-4 text-sm">
                <div className="font-semibold text-navy">{d.nome}</div>
                <div className="text-muted">{d.contexto}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
