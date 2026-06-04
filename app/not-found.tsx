import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloating } from "@/components/layout/WhatsAppFloating";
import { Icon } from "@/components/ui/Icon";

export const metadata = {
  title: "Caminho não encontrado",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative isolate flex min-h-[70vh] items-center overflow-hidden bg-navy text-white">
        {/* Same grid as Hero */}
        <div
          aria-hidden
          className="hero-grid absolute inset-0 -z-10 overflow-hidden"
        >
          <span
            className="hero-beam hero-beam-h"
            style={{ top: "128px", animationDuration: "7s" }}
          />
          <span
            className="hero-beam hero-beam-v"
            style={{
              left: "640px",
              animationDelay: "3s",
              animationDuration: "8s",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 0%, rgba(18,19,29,0.35) 70%, rgba(18,19,29,0.85) 100%)",
            }}
          />
        </div>

        <div className="container-content py-20 text-center">
          <span className="eyebrow !text-orange-bright">Erro 404</span>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl">
            <span className="text-orange-bright">Caminho</span> não encontrado.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
            A rota que você buscou não existe ou foi movida. Volte para o
            início ou explore os imóveis disponíveis.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/" className="btn-primary">
              <Icon
                name="arrow-right"
                size={18}
                className="rotate-180"
              />
              Voltar ao início
            </Link>
            <Link href="/imoveis" className="btn-ghost-light">
              Ver imóveis
              <Icon name="arrow-right" size={18} />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFloating />
    </>
  );
}
