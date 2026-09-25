import { getChatGPTUser } from "@/app/chatgpt-auth";
import { db, runtime } from "./db";
export async function isAdmin() { const user = await getChatGPTUser(); const allowed = (runtime().ADMIN_EMAILS || "").split(",").map(s => s.trim().toLowerCase()).filter(Boolean); return user && allowed.includes(user.email.toLowerCase()) ? user : null; }
export function sameOrigin(request: Request) { const origin = request.headers.get("origin"); return !!origin && origin === new URL(request.url).origin; }
export async function payload(request: Request, max = 24000) { if (!request.headers.get("content-type")?.includes("application/json"))
    throw new Error("Invalid payload"); if (Number(request.headers.get("content-length") || 0) > max)
    throw new Error("Invalid payload"); const reader = request.body?.getReader(); if (!reader)
    throw new Error("Invalid payload"); let size = 0; const chunks: Uint8Array[] = []; for (;;) {
    const { done, value } = await reader.read();
    if (done)
        break;
    size += value.length;
    if (size > max) {
        await reader.cancel();
        throw new Error("Invalid payload");
    }
    chunks.push(value);
} const bytes = new Uint8Array(size); let pos = 0; for (const chunk of chunks) {
    bytes.set(chunk, pos);
    pos += chunk.length;
} return JSON.parse(new TextDecoder().decode(bytes)); }
export async function rateLimit(request: Request, bucket: string, max = 5) { const now = Date.now(); const window = Math.floor(now / 3600000); const ip = request.headers.get("cf-connecting-ip") || "anonymous"; const raw = new TextEncoder().encode(bucket + ":" + ip + ":" + window); const hash = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", raw))).map(b => b.toString(16).padStart(2, "0")).join(""); const d = db(); await d.prepare("DELETE FROM rate_limits WHERE expires < ?").bind(now).run(); const row = await d.prepare("INSERT INTO rate_limits (key,count,expires) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count = count + 1 RETURNING count").bind(hash, now + 3600000).first<{
    count: number;
}>(); return !!row && row.count <= max; }
export const safeError = () => Response.json({ error: "Le service est temporairement indisponible. Vos champs sont conservés ; réessayez dans un instant." }, { status: 503 });
