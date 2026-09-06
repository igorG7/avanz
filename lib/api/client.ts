export const API_BASE_URL = (
  process.env.AVANZ_API_URL ?? "https://api-imoveis-avanz.onrender.com/api"
).replace(/\/$/, "");

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number | null; message: string };

export type QueryValue = string | number | boolean | undefined | null;

/**
 * Params de rota chegam do Next ainda percent-encoded ("L23%20Q20%20..."), e a
 * carteira do parceiro tem id com espaço. Codificar de novo geraria "%2520" e a
 * API responderia 404, então decodifica antes de montar o path.
 */
export function pathSegment(value: string): string {
  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    // Segmento com "%" literal que não forma uma sequência válida.
  }
  return encodeURIComponent(decoded);
}

function buildQuery(params: Record<string, QueryValue> = {}): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    search.set(key, String(value));
  }
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

type Options = {
  params?: Record<string, QueryValue>;
  /** Segundos de cache no Next. A carteira do parceiro é lida ao vivo, use valores curtos. */
  revalidate?: number;
  timeoutMs?: number;
};

export async function apiGet<T>(
  path: string,
  { params, revalidate = 60, timeoutMs = 20_000 }: Options = {},
): Promise<ApiResult<T>> {
  const url = `${API_BASE_URL}${path}${buildQuery(params)}`;

  try {
    const res = await fetch(url, {
      headers: { accept: "application/json" },
      next: { revalidate },
      // Render hiberna a instância gratuita: o primeiro request pode levar dezenas
      // de segundos, mas travar a página indefinidamente é pior que degradar.
      signal: AbortSignal.timeout(timeoutMs),
    });

    if (!res.ok) {
      const message = await extractError(res);
      return { ok: false, status: res.status, message };
    }

    return { ok: true, data: (await res.json()) as T };
  } catch (error) {
    const message =
      error instanceof Error && error.name === "TimeoutError"
        ? "A API demorou demais para responder."
        : "Não foi possível falar com a API de imóveis.";
    return { ok: false, status: null, message };
  }
}

async function extractError(res: Response): Promise<string> {
  try {
    const body = (await res.json()) as { error?: string; message?: string };
    return body.error ?? body.message ?? `Erro ${res.status}`;
  } catch {
    return `Erro ${res.status}`;
  }
}
