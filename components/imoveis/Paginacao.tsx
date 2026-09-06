import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

type Props = {
  query: Record<string, string>;
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
};

function hrefPara(query: Record<string, string>, page: number): string {
  const params = new URLSearchParams(query);
  if (page <= 1) params.delete("pagina");
  else params.set("pagina", String(page));
  const qs = params.toString();
  return qs ? `/imoveis?${qs}` : "/imoveis";
}

export function Paginacao({ query, page, limit, total, hasMore }: Props) {
  const totalPaginas = Math.max(1, Math.ceil(total / limit));
  if (totalPaginas <= 1) return null;

  const linkClass =
    "inline-flex items-center gap-2 rounded-pill border border-line bg-white px-4 py-2 text-sm font-semibold text-navy transition hover:border-orange/40 hover:text-orange-deep";
  const disabledClass =
    "inline-flex items-center gap-2 rounded-pill border border-line bg-offwhite px-4 py-2 text-sm font-semibold text-muted/50";

  return (
    <nav
      aria-label="Paginação"
      className="mt-10 flex items-center justify-between gap-4"
    >
      {page > 1 ? (
        <Link href={hrefPara(query, page - 1)} className={linkClass} rel="prev">
          <span className="rotate-180">
            <Icon name="arrow-right" size={14} />
          </span>
          Anterior
        </Link>
      ) : (
        <span className={disabledClass} aria-disabled>
          Anterior
        </span>
      )}

      <span className="text-sm text-muted">
        Página {page} de {totalPaginas}
      </span>

      {hasMore ? (
        <Link href={hrefPara(query, page + 1)} className={linkClass} rel="next">
          Próxima
          <Icon name="arrow-right" size={14} />
        </Link>
      ) : (
        <span className={disabledClass} aria-disabled>
          Próxima
        </span>
      )}
    </nav>
  );
}
