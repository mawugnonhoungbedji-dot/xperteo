import { createHmac } from "node:crypto";
import { isIP } from "node:net";

// Atomic counters shared by all Vercel instances; no form data is stored.
const script = `
local ip = redis.call('INCR', KEYS[1])
if ip == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end
if ip > tonumber(ARGV[2]) then return 0 end
local total = redis.call('INCR', KEYS[2])
if total == 1 then redis.call('EXPIRE', KEYS[2], ARGV[1]) end
if total > tonumber(ARGV[3]) then return 0 end
return 1
`;

export async function rateLimit(request: Request, bucket: "leads" | "events", max = 5) {
  const { UPSTASH_REDIS_REST_URL: url, UPSTASH_REDIS_REST_TOKEN: token, RATE_LIMIT_SECRET: secret } = process.env;
  if (!url || !token || !secret || secret.length < 32 || new URL(url).protocol !== "https:") {
    throw new Error("Rate limiter unavailable");
  }
  // Only trust the header overwritten by Vercel, never a client Cloudflare header.
  const ip = process.env.VERCEL === "1" ? request.headers.get("x-vercel-forwarded-for")?.trim()
    : process.env.NODE_ENV !== "production" ? "127.0.0.1" : undefined;
  if (!ip || !isIP(ip)) throw new Error("Trusted client address unavailable");
  const window = Math.floor(Date.now() / 3600000);
  const digest = createHmac("sha256", secret).update(`${bucket}:${window}:${ip}`).digest("hex");
  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(["EVAL", script, "2", `xperteo:${bucket}:${window}:${digest}`,
      `xperteo:${bucket}:${window}:total`, "3600", String(max), bucket === "leads" ? "100" : "10000"]),
    signal: AbortSignal.timeout(5000), cache: "no-store", redirect: "error",
  });
  if (!response.ok) throw new Error("Rate limiter unavailable");
  const data = await response.json() as { result?: unknown; error?: unknown };
  if (data.error || (data.result !== 0 && data.result !== 1)) throw new Error("Rate limiter unavailable");
  return data.result === 1;
}
