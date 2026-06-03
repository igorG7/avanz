import { Icon, type IconName } from "@/components/ui/Icon";

const NUMEROS: {
  icon: IconName;
  value: string;
  label: string;
  footnote?: string;
}[] = [
  {
    icon: "users",
    value: "+400 clientes",
    label: "Famílias guiadas até a escritura com curadoria por perfil — não vendemos volume, conduzimos decisão.",
  },
  {
    icon: "trending-up",
    value: "+9 anos",
    label: "Quase uma década atuando na RMBH — a Avanz é a nova fase de uma marca já consolidada na região.",
  },
  {
    icon: "shield",
    value: "CRECI 8638-MG",
    label: "Registro profissional ativo em Minas Gerais — atuação regulamentada e responsabilidade técnica em cada transação.",
  },
  {
    icon: "map",
    value: "RMBH bairro a bairro",
    label: "Expertise consolidada em terrenos, loteamentos, sítios e chácaras — conhecemos valorização, documentação e acesso de Mateus Leme, Igarapé, Betim e região.",
  },
];

export function AvanzIdeia() {
  return (
    <section className="bg-white">
      <div className="container-content py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-start md:gap-16">
          <div className="md:sticky md:top-24 md:self-start">
            <span className="eyebrow">A Avanz em uma ideia</span>
            <h2 className="section-title mt-3">
              Organizamos o caminho da compra.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              Entendemos seu cenário, filtramos opções coerentes e explicamos o
              processo com transparência — do primeiro contato ao fechamento.
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {NUMEROS.map((n) => (
              <li
                key={n.label}
                className="group rounded-card border border-line bg-white p-6 transition hover:-translate-y-1 hover:border-orange/40 hover:shadow-card"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-card bg-navy text-orange transition group-hover:bg-orange group-hover:text-white">
                  <Icon name={n.icon} size={22} />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-navy">
                  {n.value}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {n.label}
                </p>
                {n.footnote && (
                  <p className="mt-1 text-xs text-muted/80">{n.footnote}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
