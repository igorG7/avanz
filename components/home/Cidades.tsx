import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import {
  cidadePath,
  cidades,
  empreendimentosDaCidade,
} from "@/lib/content/cidades";
import { carregarLotes, resumirLotes } from "@/lib/imoveis/empreendimento";
import { formatPreco } from "@/lib/imoveis/view";

/** Atalho da home para as páginas de cidade. Some enquanto nenhuma estiver publicada. */
export async function Cidades() {
  const publicadas = cidades.filter((c) => c.publicado);
  if (!publicadas.length) return null;

  const itens = await Promise.all(
    publicadas.map(async (c) => {
      const emps = empreendimentosDaCidade(c);
      const precos = (
        await Promise.all(emps.map(async (e) => resumirLotes(await carregarLotes(e)).precoMin))
      ).filter((p): p is number => typeof p === "number");
      return {
        cidade: c,
        empreendimentos: emps.length,
        aPartirDe: precos.length ? formatPreco(Math.min(...precos)) : undefined,
      };
    }),
  );

  return (
    <section className="bg-white">
      <div className="container-content py-16">
        <span className="eyebrow">Onde atuamos</span>
        <h2 className="section-title mt-3">Escolha a cidade</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {itens.map(({ cidade, empreendimentos, aPartirDe }) => (
            <Link
              key={cidade.slug}
              href={cidadePath(cidade)}
              className="group flex items-center justify-between gap-4 rounded-card border border-line bg-offwhite p-5 transition hover:border-orange/40 hover:shadow-card"
            >
              <div>
                <h3 className="font-display text-lg font-semibold text-navy">
                  Lotes em {cidade.nome}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {[
                    `${empreendimentos} ${empreendimentos === 1 ? "empreendimento" : "empreendimentos"}`,
                    aPartirDe && `a partir de ${aPartirDe}`,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>
              <Icon name="arrow-right" size={18} className="shrink-0 text-orange-deep" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
