export const WHATSAPP_NUMBER = "5531972449062";
export const WHATSAPP_DISPLAY = "+55 31 97244-9062";

export function buildWhatsAppLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}
