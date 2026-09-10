import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { ImovelCard } from "@/components/imoveis/ImovelCard";
import type { ImovelCardVM } from "@/lib/imoveis/view";

type Props = {
  imoveis: ImovelCardVM[];
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

        {imoveis.length === 0 ? (
          <div className="mt-10 rounded-card border border-line bg-white p-10 text-center">
            <p className="text-muted">
              Estamos atualizando o catálogo. Fale com a gente no WhatsApp que
              mostramos as oportunidades do momento.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {imoveis.map((im) => (
              <ImovelCard
                key={im.key}
                imovel={im}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            ))}
          </div>
        )}

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
