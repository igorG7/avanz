import Image from "next/image";
import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { Icon } from "@/components/ui/Icon";
import { QuickLeadForm } from "@/components/shared/QuickLeadForm";

type Props = {
  eyebrow: string;
  headline: React.ReactNode;
  subhead: string;
  ctaLabel: string;
  ctaMessage: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  bgImage?: string;
  stats?: { value: string; label: string }[];
  bullets?: string[];
  overlay?: "default" | "soft";
  withQuickForm?: boolean;
};

const DEFAULT_STATS = [
  { value: "+400", label: "clientes atendidos" },
  { value: "+9", label: "anos de história" },
  { value: "CRECI", label: "8638-MG" },
];

export function Hero({
  eyebrow,
  headline,
  subhead,
  ctaLabel,
  ctaMessage,
  secondaryCtaLabel = "Ver oportunidades",
  secondaryCtaHref = "/imoveis",
  bgImage,
  stats = DEFAULT_STATS,
  bullets,
  overlay = "default",
  withQuickForm = false,
}: Props) {
  const imageOpacity = overlay === "soft" ? "opacity-65" : "opacity-50";
  const gradientClasses =
    overlay === "soft"
      ? "from-navy/45 via-navy/60 to-navy/90"
      : "from-navy/60 via-navy/75 to-navy";

  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      {bgImage ? (
        <div className="absolute inset-0 -z-10">
          <Image
            src={bgImage}
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className={`object-cover ${imageOpacity}`}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-b ${gradientClasses}`}
          />
        </div>
      ) : (
        <div
          aria-hidden
          className="hero-grid absolute inset-0 -z-10 overflow-hidden"
        >
          {/* Horizontal beams — top em múltiplos de 64px */}
          <span
            className="hero-beam hero-beam-h"
            style={{ top: "128px", animationDelay: "0s", animationDuration: "7s" }}
          />
          <span
            className="hero-beam hero-beam-h"
            style={{ top: "256px", animationDelay: "3.4s", animationDuration: "8s" }}
          />
          <span
            className="hero-beam hero-beam-h"
            style={{ top: "448px", animationDelay: "1.7s", animationDuration: "9s" }}
          />
          <span
            className="hero-beam hero-beam-h"
            style={{ top: "640px", animationDelay: "5.1s", animationDuration: "7s" }}
          />
          {/* Vertical beams — left em múltiplos de 64px, mesmo set de durações */}
          <span
            className="hero-beam hero-beam-v"
            style={{ left: "192px", animationDelay: "0.6s", animationDuration: "7s" }}
          />
          <span
            className="hero-beam hero-beam-v"
            style={{ left: "448px", animationDelay: "2.8s", animationDuration: "9s" }}
          />
          <span
            className="hero-beam hero-beam-v"
            style={{ left: "640px", animationDelay: "4.4s", animationDuration: "8s" }}
          />
          <span
            className="hero-beam hero-beam-v"
            style={{ left: "960px", animationDelay: "1.9s", animationDuration: "7s" }}
          />
          <span
            className="hero-beam hero-beam-v"
            style={{ left: "1216px", animationDelay: "5.7s", animationDuration: "9s" }}
          />
          <span
            className="hero-beam hero-beam-v"
            style={{ left: "1472px", animationDelay: "3.2s", animationDuration: "8s" }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 0%, rgba(18,19,29,0.35) 70%, rgba(18,19,29,0.85) 100%)",
            }}
          />
        </div>
      )}

      <div className="container-content py-20 sm:py-24 lg:py-28">
        <div
          className={
            withQuickForm
              ? "grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-center"
              : ""
          }
        >
          <div>
            <span className="eyebrow !text-orange-soft animate-fade-up">
              {eyebrow}
            </span>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl animate-fade-up">
              {headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl animate-fade-up">
              {subhead}
            </p>

            {bullets && bullets.length > 0 && (
              <ul className="mt-6 grid max-w-xl gap-2.5 text-sm text-white/80 animate-fade-up">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <Icon
                      name="check"
                      size={18}
                      className="mt-0.5 shrink-0 text-orange"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-10 flex flex-wrap gap-3 animate-fade-up">
              <a
                href={buildWhatsAppLink(ctaMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <Icon name="whatsapp" size={20} />
                {ctaLabel}
              </a>
              <Link href={secondaryCtaHref} className="btn-ghost-light">
                {secondaryCtaLabel}
                <Icon name="arrow-right" size={18} />
              </Link>
            </div>

            {stats.length > 0 && (
              <div className="mt-14 grid max-w-2xl grid-cols-3 gap-5 border-t border-white/10 pt-6 text-sm text-white/70">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-2xl font-bold text-white">
                      {s.value}
                    </div>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {withQuickForm && (
            <div className="animate-fade-up">
              <QuickLeadForm variant="hero" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
