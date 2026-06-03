import type { Pillar } from "@/lib/content/types";
import { Icon } from "@/components/ui/Icon";

type Props = {
  pillars: Pillar[];
  eyebrow?: string;
  title?: React.ReactNode;
  description?: string;
};

export function Pillars({
  pillars,
  eyebrow = "Por que Avanz",
  title = "Consultoria, não vitrine. Direção, não excesso de opções.",
  description = "Não despejamos anúncios. Organizamos o caminho até a decisão certa.",
}: Props) {
  return (
    <section className="bg-white">
      <div className="container-content py-20">
        <div className="max-w-2xl">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="section-title mt-3">{title}</h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <article
              key={p.title}
              className="group rounded-card border border-line bg-white p-6 transition hover:-translate-y-1 hover:border-orange/40 hover:shadow-card"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-card bg-navy text-orange transition group-hover:bg-orange group-hover:text-white">
                <Icon name={p.icon} size={22} />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-navy">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
