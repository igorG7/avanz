import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { ImovelCardVM } from "@/lib/imoveis/view";

type Props = {
  imovel: ImovelCardVM;
  sizes?: string;
};

export function ImovelCard({
  imovel,
  sizes = "(min-width: 1280px) 25vw, (min-width: 640px) 40vw, 100vw",
}: Props) {
  return (
    <Link
      href={imovel.href}
      className="group flex flex-col overflow-hidden rounded-card bg-white shadow-card transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-line">
        {imovel.foto ? (
          <Image
            src={imovel.foto}
            alt={imovel.alt}
            fill
            sizes={sizes}
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-navy/5 text-navy/25">
            <Icon name="map" size={40} />
          </div>
        )}
        {imovel.badge && (
          <span className="absolute left-3 top-3 rounded-pill bg-orange px-3 py-1 text-xs font-semibold text-white shadow-cta">
            {imovel.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-semibold uppercase tracking-widest text-orange-deep">
          {imovel.eyebrow}
        </span>
        <h3 className="mt-2 font-display text-lg font-semibold text-navy">
          {imovel.titulo}
        </h3>
        {imovel.meta && (
          <p className="mt-1 text-sm text-muted">{imovel.meta}</p>
        )}
        <p className="mt-3 font-display text-xl font-bold text-navy">
          {imovel.preco}
        </p>
        <div className="mt-auto pt-5">
          <span className="inline-flex w-full items-center justify-center gap-2 rounded-pill bg-navy px-5 py-2.5 text-sm font-semibold text-white transition group-hover:bg-orange">
            Ver detalhes
            <Icon name="arrow-right" size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
