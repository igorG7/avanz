import Image from "next/image";
import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { Icon } from "@/components/ui/Icon";

export function Footer() {
  const ctaLink = buildWhatsAppLink(
    "Olá! Vim pelo site da Avanz. Quero entender as opções disponíveis."
  );

  return (
    <footer className="bg-navy-3 text-white/80">
      <div className="container-content grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <Image
            src="/logo-recorte.png"
            alt="Avanz Imóveis"
            width={426}
            height={140}
            className="h-12 w-auto brightness-0 invert"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            Consultoria imobiliária na RMBH. Direção clara na tomada de decisão
            — entender para atender.
          </p>
          <a
            href={ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-6 text-sm"
          >
            <Icon name="whatsapp" size={18} />
            Falar no WhatsApp
          </a>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white">
            Navegação
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/imoveis" className="hover:text-white">
                Imóveis
              </Link>
            </li>
            <li>
              <Link href="/#sobre" className="hover:text-white">
                Sobre
              </Link>
            </li>
            <li>
              <Link href="/#faq" className="hover:text-white">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/#contato" className="hover:text-white">
                Contato
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white">
            Contato
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li className="flex items-center gap-2.5">
              <Icon name="phone" size={16} className="text-orange" />
              <a
                href={ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                +55 31 97137-5793
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Icon name="instagram" size={16} className="text-orange" />
              <a
                href="https://instagram.com/avanzimoveis"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                @avanzimoveis
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Icon name="facebook" size={16} className="text-orange" />
              <a
                href="https://facebook.com/avanzimoveis"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Avanz Imóveis
              </a>
            </li>
            <li className="flex items-start gap-2.5 pt-1">
              <Icon
                name="map"
                size={16}
                className="mt-0.5 shrink-0 text-orange"
              />
              <span className="leading-relaxed">
                Rua Guaraciaba Passos, 1050
                <br />
                Centro · Mateus Leme/MG
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-content flex flex-col items-start justify-between gap-2 py-5 text-xs text-white/60 sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} Avanz Imóveis. Todos os direitos
            reservados.
          </span>
          <span>CRECI 8638-MG</span>
        </div>
      </div>
    </footer>
  );
}
