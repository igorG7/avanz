"use client";

import Script from "next/script";
import { useEffect } from "react";
import { GA_ID, track } from "@/lib/analytics";

const CONTATOS: { match: (href: string) => boolean; event: string }[] = [
  { match: (h) => h.includes("wa.me/"), event: "whatsapp_click" },
  { match: (h) => h.startsWith("tel:"), event: "phone_click" },
  { match: (h) => h.startsWith("mailto:"), event: "email_click" },
];

/**
 * Um ouvinte só para todos os links de contato do site, em vez de instrumentar
 * cada botão: link novo de WhatsApp passa a ser medido sem mudar código.
 */
export function Analytics() {
  useEffect(() => {
    if (!GA_ID) return;
    function onClick(e: MouseEvent) {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      const contato = CONTATOS.find((c) => c.match(link.href));
      if (!contato) return;
      track(contato.event, {
        link_text: link.textContent?.trim().slice(0, 60) || link.getAttribute("aria-label") || undefined,
      });
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!GA_ID) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
