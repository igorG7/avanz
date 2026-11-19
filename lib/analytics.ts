// Validado para não interpolar no script inline qualquer valor vindo do ambiente.
const rawId = process.env.NEXT_PUBLIC_GA_ID;
export const GA_ID = rawId && /^G-[A-Z0-9]+$/.test(rawId) ? rawId : undefined;

type Gtag = (...args: unknown[]) => void;
type Params = Record<string, string | number | undefined>;

/** Nunca enviar nome, telefone ou texto digitado: o GA4 não pode receber dado pessoal. */
export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", event, { page_path: window.location.pathname, ...params });
}
