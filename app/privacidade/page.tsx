import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloating } from "@/components/layout/WhatsAppFloating";
import { WHATSAPP_DISPLAY } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description:
    "Como a Avanz Imóveis trata os dados de quem visita o site e entra em contato pelo formulário ou pelo WhatsApp.",
  alternates: { canonical: "/privacidade" },
};

const ATUALIZADA_EM = "19 de novembro de 2026";
const EMAIL = "avanzimoveis@gmail.com";

const SECOES: { titulo: string; paragrafos: React.ReactNode[] }[] = [
  {
    titulo: "Quem é responsável pelos seus dados",
    paragrafos: [
      <>
        Avanz Imóveis, CRECI 8638-MG, Rua Guaraciaba Passos, 1050, Centro,
        Mateus Leme/MG. Para qualquer assunto sobre seus dados, fale conosco
        pelo e-mail <a href={`mailto:${EMAIL}`}>{EMAIL}</a> ou pelo WhatsApp{" "}
        {WHATSAPP_DISPLAY}.
      </>,
    ],
  },
  {
    titulo: "Dados que você informa",
    paragrafos: [
      "Nos formulários do site você pode informar nome, telefone, tipo de imóvel, região de interesse e outros detalhes. O site não armazena essas informações: ele apenas monta uma mensagem e abre uma conversa no WhatsApp. Só recebemos os dados se você enviar essa mensagem.",
      "Usamos o que você nos envia para responder, indicar imóveis, agendar visitas e conduzir a negociação que você pediu.",
    ],
  },
  {
    titulo: "Dados de navegação",
    paragrafos: [
      <>
        Usamos o Google Analytics para entender como o site é usado: páginas
        visitadas, tempo de visita, tipo de aparelho, região aproximada, origem
        da visita e cliques nos botões de contato. Essas informações são
        coletadas por cookies e não incluem seu nome, telefone ou o que você
        escreve nos formulários. O Google trata esses dados conforme a{" "}
        <a
          href="https://policies.google.com/privacy?hl=pt-BR"
          target="_blank"
          rel="noopener noreferrer"
        >
          política de privacidade dele
        </a>
        .
      </>,
      "A finalidade é melhorar o site e saber quais páginas ajudam quem procura um imóvel.",
    ],
  },
  {
    titulo: "Com quem compartilhamos",
    paragrafos: [
      "Não vendemos nem alugamos seus dados. Quando você avança numa negociação, os dados necessários são compartilhados com o responsável pelo imóvel, como o loteador ou o proprietário, e com quem participa da formalização do negócio.",
    ],
  },
  {
    titulo: "Seus direitos",
    paragrafos: [
      <>
        Pela Lei Geral de Proteção de Dados (Lei 13.709/2018), você pode pedir
        a confirmação de que tratamos seus dados, o acesso a eles, a correção,
        a exclusão e informações sobre com quem foram compartilhados. Faça o
        pedido pelo e-mail <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </>,
    ],
  },
  {
    titulo: "Como desativar os cookies",
    paragrafos: [
      <>
        Você pode bloquear ou apagar cookies nas configurações do seu
        navegador, ou instalar o{" "}
        <a
          href="https://tools.google.com/dlpage/gaoptout?hl=pt-BR"
          target="_blank"
          rel="noopener noreferrer"
        >
          complemento de desativação do Google Analytics
        </a>
        . O site continua funcionando normalmente.
      </>,
    ],
  },
  {
    titulo: "Atualizações desta política",
    paragrafos: [
      `Esta política pode mudar quando o site mudar. A versão em vigor é sempre a desta página, atualizada em ${ATUALIZADA_EM}.`,
    ],
  },
];

export default function PrivacidadePage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <div className="container-content max-w-3xl py-20">
          <span className="eyebrow">Avanz Imóveis</span>
          <h1 className="section-title mt-3">Política de privacidade</h1>
          <p className="mt-4 text-sm text-muted">
            Atualizada em {ATUALIZADA_EM}
          </p>
          <div className="mt-10 space-y-10 text-base leading-relaxed text-ink [&_a]:text-orange-deep [&_a]:underline">
            {SECOES.map((s) => (
              <section key={s.titulo}>
                <h2 className="font-display text-xl font-semibold text-navy">
                  {s.titulo}
                </h2>
                {s.paragrafos.map((p, i) => (
                  <p key={i} className="mt-3">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFloating />
    </>
  );
}
