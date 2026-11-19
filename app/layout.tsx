import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import { unstable_ViewTransition as ViewTransition } from "react";
import { Analytics } from "@/components/layout/Analytics";
import { SITE_NAME, SITE_URL, organizationJsonLd } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["500", "600", "700", "800"],
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
        <Analytics />
      </body>
    </html>
  );
}
