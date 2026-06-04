import { Icon, type IconName } from "@/components/ui/Icon";

export type ProcessStep = {
  icon: IconName;
  title: string;
  body: string;
};

type Props = {
  steps: ProcessStep[];
  eyebrow?: string;
  title?: React.ReactNode;
  intro?: string;
};

export function ProcessSteps({
  steps,
  eyebrow = "Processo Avanz",
  title = (
    <>
      Quatro <span className="text-orange-bright">passos</span>. Uma{" "}
      <span className="text-orange-bright">decisão</span> clara.
    </>
  ),
  intro = "Da primeira conversa até a escritura, conduzimos cada etapa com transparência e ritmo objetivo.",
}: Props) {
  return (
    <section className="bg-navy text-white">
      <div className="container-content py-20">
        <div className="max-w-2xl">
          <span className="eyebrow !text-orange-bright">{eyebrow}</span>
          <h2 className="section-title mt-3 text-white">{title}</h2>
          <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
            {intro}
          </p>
        </div>

        <div className="relative mt-14">
          {/* Mobile: vertical extensions above first card and below last card */}
          <span
            aria-hidden
            className="absolute -top-8 left-1/2 h-8 w-px -translate-x-1/2 md:hidden"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, #FB923C 0 5px, transparent 5px 10px)",
            }}
          />
          <span
            aria-hidden
            className="absolute -bottom-8 left-1/2 h-8 w-px -translate-x-1/2 md:hidden"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, #FB923C 0 5px, transparent 5px 10px)",
            }}
          />

          {/* Desktop: horizontal extensions left of first card and right of last card */}
          <span
            aria-hidden
            className="absolute -left-8 top-1/2 hidden h-px w-8 -translate-y-1/2 md:block"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, #FB923C 0 5px, transparent 5px 10px)",
            }}
          />
          <span
            aria-hidden
            className="absolute -right-8 top-1/2 hidden h-px w-8 -translate-y-1/2 md:block"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, #FB923C 0 5px, transparent 5px 10px)",
            }}
          />

          <ol className="grid gap-6 md:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.title} className="relative">
                <article className="group relative h-full rounded-card border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-orange/40 hover:bg-white/10">
                  <span className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full bg-orange font-display text-xs font-bold text-white shadow-cta">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="flex h-12 w-12 items-center justify-center rounded-card bg-orange/15 text-orange transition group-hover:bg-orange group-hover:text-white">
                    <Icon name={step.icon} size={22} />
                  </span>

                  <h3 className="mt-5 font-display text-base font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {step.body}
                  </p>
                </article>

                {/* Connector to next card */}
                {i < steps.length - 1 && (
                  <>
                    {/* Mobile: vertical dashed line below this card (in gap-6 = 24px space) */}
                    <span
                      aria-hidden
                      className="absolute -bottom-6 left-1/2 h-6 w-px -translate-x-1/2 md:hidden"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(to bottom, #FB923C 0 5px, transparent 5px 10px)",
                      }}
                    />
                    {/* Desktop: horizontal dashed line to right of card */}
                    <span
                      aria-hidden
                      className="absolute -right-6 top-1/2 hidden h-px w-6 -translate-y-1/2 md:block"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(to right, #FB923C 0 5px, transparent 5px 10px)",
                      }}
                    />
                  </>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
