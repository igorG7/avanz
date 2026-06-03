import { Icon, type IconName } from "@/components/ui/Icon";

const FEATURES: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "check",
    title: "Análise técnica",
    body: "Cada imóvel é avaliado antes de entrar no portfólio.",
  },
  {
    icon: "whatsapp",
    title: "Resposta rápida",
    body: "WhatsApp como canal direto. Sem formulários longos.",
  },
  {
    icon: "building",
    title: "Análise estratégica",
    body: "Comparativos de mercado e potencial de valorização.",
  },
  {
    icon: "key",
    title: "Acompanhamento",
    body: "Do primeiro contato à entrega das chaves.",
  },
];

export function SobreNos() {
  return (
    <section id="sobre" className="scroll-mt-16 bg-white">
      <div className="container-content py-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-16">
          <div>
            <span className="eyebrow">Sobre nós</span>
            <h2 className="section-title mt-3">
              Comprar imóvel é <span className="text-orange">decisão</span> de
              vida.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink sm:text-lg">
              <p>
                A Avanz Imóveis nasceu da convicção de que comprar um imóvel
                não é uma transação — é uma decisão de vida. Operamos em Belo
                Horizonte, Mateus Leme, Jaboticatubas e RMBH, com um modelo de
                consultoria que coloca o atendimento como produto principal.
              </p>
              <p>
                O mercado oferece volume. Falta direção. É aí que entramos:
                filtramos, traduzimos, organizamos — para que você decida com
                clareza, sem ruído. Trabalhamos com terrenos, loteamentos, MCMV
                e médio padrão, com opções de financiamento próprio.
              </p>
            </div>
          </div>

          <aside>
            <div className="grid grid-cols-1 md:grid-cols-2">
              {FEATURES.map((f, i) => {
                const isLeftCol = i % 2 === 0;
                const isTopRow = i < 2;
                const notLast = i < FEATURES.length - 1;
                return (
                  <article
                    key={f.title}
                    className={[
                      "p-7",
                      notLast ? "border-b border-line" : "",
                      !isTopRow ? "md:border-b-0" : "",
                      isLeftCol ? "md:border-r md:border-line" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <span className="text-orange">
                      <Icon name={f.icon} size={22} />
                    </span>
                    <h3 className="mt-4 font-display text-base font-semibold text-navy">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {f.body}
                    </p>
                  </article>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
