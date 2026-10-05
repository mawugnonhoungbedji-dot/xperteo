export { rateLimit } from "./rate-limit";

export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (request.headers.get("sec-fetch-site") === "cross-site") return false;
  return !!origin && origin === new URL(request.url).origin;
}

export async function payload(request: Request, max = 24000) {
  const contentType = request.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (contentType !== "application/json") throw new Error("Invalid payload");
  const length = request.headers.get("content-length");
  if (length && (!/^\d+$/.test(length) || Number(length) > max)) throw new Error("Invalid payload");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("Invalid payload");
  let size = 0;
  const chunks: Uint8Array[] = [];
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > max) { await reader.cancel(); throw new Error("Invalid payload"); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(size);
  let pos = 0;
  for (const chunk of chunks) { bytes.set(chunk, pos); pos += chunk.length; }
  return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
}

export const safeError = () => Response.json({
  error: "Le service est temporairement indisponible. Vos champs sont conservés ; réessayez dans un instant.",
}, { status: 503 });
