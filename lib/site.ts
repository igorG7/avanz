import { WHATSAPP_DISPLAY } from "./whatsapp";

export const SITE_URL = "https://avanzimoveis.com.br";
export const SITE_NAME = "Avanz Imóveis";

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Corta no limite de caracteres sem partir palavra, para caber no snippet da busca. */
export function metaDescription(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:]$/, "")}…`;
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl("/logo.png"),
  image: absoluteUrl("/logo.png"),
  telephone: WHATSAPP_DISPLAY.replace(/\s/g, "-"),
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Guaraciaba Passos, 1050",
    addressLocality: "Mateus Leme",
    addressRegion: "MG",
    addressCountry: "BR",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Região Metropolitana de Belo Horizonte",
  },
  identifier: {
    "@type": "PropertyValue",
    name: "CRECI",
    value: "8638-MG",
  },
  sameAs: [
    "https://instagram.com/avanzimoveis",
    "https://facebook.com/avanzimoveis",
  ],
};
