"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { Icon } from "@/components/ui/Icon";

const NAV = [
  { href: "/imoveis", label: "Imóveis" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#contato", label: "Contato" },
  { href: "/#faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const ctaLink = buildWhatsAppLink(
    "Olá! Vim pelo site da Avanz. Quero entender as opções disponíveis."
  );

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/95 backdrop-blur supports-[backdrop-filter]:bg-navy/80">
      <div className="container-content flex h-16 items-center justify-between gap-3 sm:gap-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-recorte.png"
            alt="Avanz Imóveis"
            width={1732}
            height={568}
            priority
            className="h-7 w-auto brightness-0 invert sm:h-9"
          />
          <span className="sr-only">Avanz Imóveis</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/80 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href={ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !gap-1.5 !py-2 !px-3.5 text-xs sm:!gap-2 sm:!py-2.5 sm:!px-5 sm:text-sm"
          >
            <Icon name="whatsapp" size={16} className="sm:h-[18px] sm:w-[18px]" />
            <span className="hidden sm:inline">Falar com a Avanz</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-card border border-white/15 text-white sm:h-10 sm:w-10 md:hidden"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {open ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M6 18L18 6" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-navy md:hidden">
          <ul className="container-content flex flex-col py-3">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm font-medium text-white/85 transition hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
