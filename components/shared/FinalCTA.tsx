import { buildWhatsAppLink } from "@/lib/whatsapp";
import { Icon } from "@/components/ui/Icon";

type Props = {
  title: string;
  body: string;
  ctaLabel: string;
  ctaMessage: string;
  footnote?: string;
};

export function FinalCTA({
  title,
  body,
  ctaLabel,
  ctaMessage,
  footnote = "Resposta direta · sem call center · consultor especializado",
}: Props) {
  return (
    <section className="relative overflow-hidden bg-navy-3">
      <div
        className="absolute inset-0 -z-0 opacity-25"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, #F97316 0, transparent 40%), radial-gradient(circle at 80% 80%, #1B2A48 0, transparent 50%)",
        }}
      />
      <div className="container-content relative py-20 text-center">
        <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
          {body}
        </p>
        <a
          href={buildWhatsAppLink(ctaMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-8"
        >
          <Icon name="whatsapp" size={20} />
          {ctaLabel}
        </a>
        <p className="mt-5 text-xs uppercase tracking-widest text-white/50">
          {footnote}
        </p>
      </div>
    </section>
  );
}
