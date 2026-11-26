import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { unstable_ViewTransition as ViewTransition } from "react";
import { SITE_NAME, SITE_URL, organizationJsonLd } from "@/lib/site";
import "./globals.css";

// Font files live in the repo (variable, latin subset, from Fontsource 5.3.0)
// so the build never downloads from Google; that download failed intermittently.
const inter = localFont({
  src: "./fonts/inter.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter",
});

const montserrat = localFont({
  src: "./fonts/montserrat.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Avanz Imóveis, Consultoria imobiliária na RMBH",
    template: "%s · Avanz Imóveis",
  },
  description:
    "Consultoria imobiliária com financiamento próprio na RMBH. Lotes, sítios e chácaras com direção clara, entender para atender.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${montserrat.variable}`}>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <ViewTransition>{children}</ViewTransition>
      </body>
    </html>
  );
}
