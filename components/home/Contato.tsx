import { Icon, type IconName } from "@/components/ui/Icon";
import { QuickLeadForm } from "@/components/shared/QuickLeadForm";
import { buildWhatsAppLink } from "@/lib/whatsapp";

type ContactItem = {
  icon: IconName;
  label: string;
  value: string;
  href: string;
  external?: boolean;
};

export function Contato() {
  const ctaLink = buildWhatsAppLink(
    "Olá! Vim pelo site da Avanz. Quero conversar com um consultor."
  );

  const contacts: ContactItem[] = [
    {
      icon: "whatsapp",
      label: "WhatsApp · canal direto",
      value: "+55 31 97137-5793",
      href: ctaLink,
      external: true,
    },
    {
      icon: "mail",
      label: "E-mail",
      value: "avanzimoveis@gmail.com",
      href: "mailto:avanzimoveis@gmail.com",
    },
    {
      icon: "instagram",
      label: "Instagram",
      value: "@avanzimoveis",
      href: "https://instagram.com/avanzimoveis",
      external: true,
    },
  ];

  return (
    <section id="contato" className="scroll-mt-16 bg-navy text-white">
      <div className="container-content py-20">
        <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:items-start md:gap-16">
          {/* Left: header + contacts list */}
          <div>
            <span className="eyebrow !text-orange-bright">Contato</span>
            <h2 className="section-title mt-3 text-white">
              Fale direto com a Avanz.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
              WhatsApp é o canal principal, resposta rápida com consultor
              sênior. Se preferir, deixe seus dados no formulário e a gente
              chama você.
            </p>

            <ul className="mt-10 divide-y divide-white/10">
              {contacts.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    className="-mx-3 flex items-center gap-5 rounded-card px-3 py-5 transition hover:bg-navy-3"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-card bg-white/5 text-orange">
                      <Icon name={c.icon} size={20} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-soft">
                        {c.label}
                      </span>
                      <p className="mt-0.5 truncate font-display text-base font-semibold text-white sm:text-lg">
                        {c.value}
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form */}
          <div className="rounded-card border border-line bg-offwhite p-7 shadow-card md:p-8">
            <h3 className="font-display text-xl font-semibold text-navy">
              Preencha e a gente retorna
            </h3>
            <p className="mt-2 text-sm text-muted">
              Nome, telefone e um resumo do que você busca. Sem cadastro
              infinito.
            </p>
            <div className="mt-6">
              <QuickLeadForm variant="contato" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
