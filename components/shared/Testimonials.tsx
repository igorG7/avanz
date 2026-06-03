import type { Depoimento } from "@/lib/content/types";
import { Icon } from "@/components/ui/Icon";

type Props = {
  depoimentos: Depoimento[];
  eyebrow?: string;
  title?: React.ReactNode;
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Testimonials({
  depoimentos,
  eyebrow = "Histórias reais",
  title = (
    <>
      Quem decidiu com a Avanz, decidiu com{" "}
      <span className="text-orange">clareza</span>.
    </>
  ),
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
              className="relative isolate flex flex-col rounded-card border border-line bg-offwhite p-7 transition hover:-translate-y-0.5 hover:border-orange/40 hover:shadow-card"
            >
              {/* Decorative quote mark in the corner */}
              <span
                aria-hidden
                className="absolute right-5 top-3 select-none font-display text-6xl font-bold leading-none text-orange/15"
              >
                “
              </span>

              {/* Header: avatar + name */}
              <header className="relative z-10 flex items-center gap-3.5">
                <span
                  aria-hidden
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange/10 font-display text-sm font-bold text-orange-deep"
                >
                  {getInitials(d.nome)}
                </span>
                <div className="min-w-0">
                  <div className="font-display font-semibold text-navy">
                    {d.nome}
                  </div>
                  <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
                    <Icon
                      name="map"
                      size={12}
                      className="shrink-0 text-orange-deep"
                    />
                    <span className="truncate">{d.contexto}</span>
                  </div>
                </div>
              </header>

              {/* Quote */}
              <blockquote className="relative z-10 mt-5 font-display text-base font-medium leading-relaxed text-ink sm:text-lg">
                {d.quote}
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
