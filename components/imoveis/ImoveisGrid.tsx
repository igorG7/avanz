import Image from "next/image";
import Link from "next/link";
import type { Imovel } from "@/lib/content/types";
import { Icon } from "@/components/ui/Icon";

type Props = {
  imoveis: Imovel[];
  eyebrow?: string;
  title?: string;
  intro?: string;
  showHeader?: boolean;
  showLink?: boolean;
};

export function ImoveisGrid({
  imoveis,
  eyebrow = "Oportunidades selecionadas",
  title = "Imóveis em destaque",
  intro = "Seleção atualizada, novos, oportunidades raras ou parcerias diretas com proprietário. Confirme disponibilidade pelo WhatsApp.",
  showHeader = true,
  showLink = true,
}: Props) {
  return (
    <section id="imoveis" className="bg-offwhite">
      <div className="container-content py-20">
        {showHeader && (
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="eyebrow">{eyebrow}</span>
              <h2 className="section-title mt-3">{title}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                {intro}
              </p>
            </div>
            {showLink && (
              <Link
                href="/imoveis"
                className="inline-flex items-center gap-2 text-sm font-semibold text-orange-deep hover:text-orange"
              >
                Ver todos os imóveis
                <Icon name="arrow-right" size={16} />
              </Link>
            )}
          </div>
        )}

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {imoveis.map((im) => (
            <Link
              key={im.slug}
              href={`/imoveis/${im.slug}`}
              className="group flex flex-col overflow-hidden rounded-card bg-white shadow-card transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-line">
                <Image
                  src={im.foto}
                  alt={`${im.tipo} em ${im.bairro}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                {im.badge && (
                  <span className="absolute left-3 top-3 rounded-pill bg-orange px-3 py-1 text-xs font-semibold text-white shadow-cta">
                    {im.badge}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="text-xs font-semibold uppercase tracking-widest text-orange-deep">
                  {im.tipo} · {im.bairro}, {im.cidade}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold text-navy">
                  {im.area}
                  {im.destaque ? ` · ${im.destaque}` : ""}
                </h3>
                <p className="mt-3 font-display text-xl font-bold text-navy">
                  {im.preco}
                </p>
                <div className="mt-auto pt-5">
                  <span className="inline-flex w-full items-center justify-center gap-2 rounded-pill bg-navy px-5 py-2.5 text-sm font-semibold text-white transition group-hover:bg-orange">
                    Ver detalhes
                    <Icon name="arrow-right" size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {showLink && (
          <div className="mt-12 flex justify-center">
            <Link
              href="/imoveis"
              className="inline-flex items-center justify-center gap-2 rounded-pill bg-navy px-7 py-3.5 font-semibold text-white transition hover:bg-orange"
            >
              Ver mais oportunidades
              <Icon name="arrow-right" size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
