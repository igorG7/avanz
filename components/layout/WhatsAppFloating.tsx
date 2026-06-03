import { buildWhatsAppLink } from "@/lib/whatsapp";
import { Icon } from "@/components/ui/Icon";

type Props = {
  message?: string;
};

export function WhatsAppFloating({
  message = "Olá! Vim pelo site da Avanz. Quero entender as opções disponíveis.",
}: Props) {
  const link = buildWhatsAppLink(message);
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-cta transition hover:scale-105"
    >
      <Icon name="whatsapp" size={28} />
    </a>
  );
}
