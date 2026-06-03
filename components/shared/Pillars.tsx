import type { Pillar } from "@/lib/content/types";
import { Icon } from "@/components/ui/Icon";

type Props = {
  pillars: Pillar[];
  eyebrow?: string;
  title?: React.ReactNode;
  description?: string;
  variant?: "grid" | "featured";
};

export function Pillars({
  pillars,
  eyebrow = "Por que Avanz",
  title = "Consultoria, não vitrine. Direção, não excesso de opções.",
  description = "Não despejamos anúncios. Organizamos o caminho até a decisão certa.",
  variant = "grid",
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

        {variant === "grid" ? (
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
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <FeaturedLayout pillars={pillars} />
        )}
      </div>
    </section>
  );
}

function FeaturedLayout({ pillars }: { pillars: Pillar[] }) {
  if (pillars.length === 0) return null;
  const [featured, ...supporting] = pillars;

  return (
    <div className="mt-12 grid gap-5 md:grid-cols-2 md:gap-8">
      {/* Featured pillar */}
      <article className="relative isolate overflow-hidden rounded-card border border-line bg-white p-8 transition hover:border-orange/40 hover:shadow-card sm:p-10">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at 90% 10%, rgba(249,115,22,0.08) 0%, transparent 55%)",
          }}
        />
        <span className="inline-flex items-center gap-2 rounded-pill bg-orange/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-deep">
          Diferencial
        </span>
        <span className="mt-6 flex h-16 w-16 items-center justify-center rounded-card bg-navy text-orange">
          <Icon name={featured.icon} size={28} />
        </span>
        <h3 className="mt-6 font-display text-2xl font-bold text-navy sm:text-3xl">
          {featured.title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {featured.body}
        </p>
      </article>

      {/* Supporting pillars stacked */}
      <div className="flex flex-col gap-3">
        {supporting.map((p) => (
          <article
            key={p.title}
            className="group flex flex-1 gap-4 rounded-card border border-line bg-white p-5 transition hover:border-orange/40 hover:shadow-card"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-card bg-navy text-orange transition group-hover:bg-orange group-hover:text-white">
              <Icon name={p.icon} size={20} />
            </span>
            <div>
              <h3 className="font-display text-base font-semibold text-navy">
                {p.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {p.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
