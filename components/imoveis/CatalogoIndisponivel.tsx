import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloating } from "@/components/layout/WhatsAppFloating";
import { Icon } from "@/components/ui/Icon";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function CatalogoIndisponivel({ mensagem }: { mensagem: string }) {
  return (
    <>
      <Header />
      <main className="bg-offwhite">
        <div className="container-content flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
          <h1 className="font-display text-2xl font-bold text-navy sm:text-3xl">
            Imóvel indisponível no momento
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            {mensagem} Fale com um consultor que a gente confirma na hora.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={buildWhatsAppLink(
                "Olá! Tentei ver um imóvel no site mas a página não carregou. Pode me ajudar?",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Icon name="whatsapp" size={16} />
              Falar no WhatsApp
            </a>
            <Link href="/imoveis" className="btn-secondary">
              Ver o catálogo
              <Icon name="arrow-right" size={16} />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFloating />
    </>
  );
}
