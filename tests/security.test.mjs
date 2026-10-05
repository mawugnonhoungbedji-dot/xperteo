import test, { after } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";

const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(import.meta.url);
const build = mkdtempSync(join(root, ".security-tests-"));
function cleanup() {
  assert.ok(resolve(build).startsWith(resolve(root) + sep + ".security-tests-"));
  rmSync(build, { recursive: true, force: true });
}
try {
  execFileSync(process.execPath, [require.resolve("typescript/bin/tsc"),
    "--outDir", build, "--rootDir", root, "--module", "commonjs", "--moduleResolution", "node",
    "--target", "ES2022", "--esModuleInterop", "--skipLibCheck", "--strict",
    "app/api/leads/route.ts"], { cwd: root, stdio: "inherit" });
  writeFileSync(join(build, "package.json"), '{"type":"commonjs"}');
} catch (error) { cleanup(); throw error; }
after(cleanup);
const { POST } = require(join(build, "app/api/leads/route.js"));
const { payload } = require(join(build, "lib/security.js"));
const { rateLimit } = require(join(build, "lib/rate-limit.js"));
const originalFetch = globalThis.fetch;
const originalEnv = { ...process.env };
after(() => { globalThis.fetch = originalFetch; process.env = originalEnv; });
Object.assign(process.env, {
  VERCEL: "1", NODE_ENV: "production", RESEND_API_KEY: "test-key-not-real",
  LEADS_TO_EMAIL: "owner@example.com", LEADS_FROM_EMAIL: "website@example.com",
  UPSTASH_REDIS_REST_URL: "https://example.upstash.io", UPSTASH_REDIS_REST_TOKEN: "test-token",
  RATE_LIMIT_SECRET: "test-secret-with-at-least-32-characters",
});
const valid = () => ({
  id: "28aa4376-aab4-43d1-b3db-d4034c9ec005", name: "Test Visitor", company: "Test Company",
  email: "visitor@example.com", website: "", industry: "", location: "", objective: "",
  message: "Please contact me about my website.", source: "contact", landing_page: "/contact",
  utm_source: "", utm_medium: "", utm_campaign: "", fax: "", started: Date.now() - 3000,
});
function request(body = valid(), headers = {}) {
  return new Request("https://site.example/api/leads", { method: "POST", headers: {
    origin: "https://site.example", "content-type": "application/json", "x-vercel-forwarded-for": "203.0.113.10", ...headers,
  }, body: JSON.stringify(body) });
}
function mock(redis = { result: 1 }, email = { id: "test-message-id" }, emailStatus = 200) {
  const calls = [];
  globalThis.fetch = async (url, init) => {
    calls.push({ url, ...init, body: JSON.parse(init.body) });
    if (url === process.env.UPSTASH_REDIS_REST_URL) return Response.json(redis);
    assert.equal(url, "https://api.resend.com/emails");
    return Response.json(email, { status: emailStatus });
  };
  return calls;
}

test("rejects foreign origins and cross-site requests before network calls", async () => {
  const calls = mock();
  assert.equal((await POST(request(valid(), { origin: "https://attacker.example" }))).status, 403);
  assert.equal((await POST(request(valid(), { "sec-fetch-site": "cross-site" }))).status, 403);
  assert.equal(calls.length, 0);
});
test("validates fields, honeypot, timing and email header injection", async () => {
  const calls = mock();
  for (const changes of [{ fax: "bot" }, { started: Date.now() }, { id: "not-an-id" },
    { email: "visitor@example.com\r\nBcc: victim@example.com" }, { message: "x".repeat(3001) }]) {
    assert.equal((await POST(request({ ...valid(), ...changes }))).status, 400);
  }
  assert.equal(calls.length, 0);
});
test("limits streamed payloads without relying on Content-Length", async () => {
  const calls = mock();
  assert.equal((await POST(request({ ...valid(), message: "x".repeat(25000) }))).status, 400);
  await assert.rejects(payload(request(valid(), { "content-type": "text/plain; application/json" })));
  assert.equal(calls.length, 0);
});
test("sends plain text to fixed recipient with visitor Reply-To and retry key", async () => {
  const calls = mock();
  const body = { ...valid(), message: "<script>alert(1)</script>", to: "attacker@example.com" };
  assert.equal((await POST(request(body))).status, 201);
  assert.equal((await POST(request(body))).status, 201);
  const emails = calls.filter(call => call.url === "https://api.resend.com/emails");
  assert.deepEqual(emails[0].body.to, ["owner@example.com"]);
  assert.equal(emails[0].body.reply_to, "visitor@example.com");
  assert.equal(emails[0].body.from, "website@example.com");
  assert.equal(emails[0].body.html, undefined);
  assert.ok(emails[0].body.text.includes(body.message));
  assert.equal(emails[0].headers["Idempotency-Key"], emails[1].headers["Idempotency-Key"]);
  assert.equal(emails[0].redirect, "error");
});
test("rate limit blocks email delivery", async () => {
  const calls = mock({ result: 0 });
  const response = await POST(request());
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("retry-after"), "3600");
  assert.equal(calls.length, 1);
});
test("Redis errors and malformed replies fail closed", async () => {
  for (const reply of [{ error: "internal detail" }, { result: "1" }]) {
    const calls = mock(reply);
    assert.equal((await POST(request())).status, 503);
    assert.equal(calls.length, 1);
  }
});
test("unconfigured email and limiter fail closed", async () => {
  for (const name of ["RESEND_API_KEY", "LEADS_TO_EMAIL", "RATE_LIMIT_SECRET"]) {
    const value = process.env[name];
    delete process.env[name];
    try {
      const calls = mock();
      assert.equal((await POST(request())).status, 503);
      assert.equal(calls.some(call => call.url === "https://api.resend.com/emails"), false);
    } finally { process.env[name] = value; }
  }
});
test("provider refusal or malformed acceptance never produces success or leaks details", async () => {
  for (const [body, status] of [[{ error: "secret-provider-detail" }, 500], [{}, 200]]) {
    mock({ result: 1 }, body, status);
    const response = await POST(request());
    assert.equal(response.status, 503);
    assert.equal((await response.text()).includes("secret-provider-detail"), false);
  }
});
test("network errors keep the submission retryable", async () => {
  globalThis.fetch = async () => { throw new Error("network failure"); };
  assert.equal((await POST(request())).status, 503);
});
test("uses trusted Vercel address and sends only a keyed digest to Redis", async () => {
  const calls = mock();
  await rateLimit(request(valid(), { "cf-connecting-ip": "192.0.2.1" }), "leads");
  await rateLimit(request(valid(), { "cf-connecting-ip": "192.0.2.2" }), "leads");
  assert.equal(calls[0].body[3], calls[1].body[3]);
  assert.equal(JSON.stringify(calls).includes("203.0.113.10"), false);
  await assert.rejects(rateLimit(request(valid(), { "x-vercel-forwarded-for": "invalid" }), "leads"));
  delete process.env.VERCEL;
  try { await assert.rejects(rateLimit(request(), "leads")); }
  finally { process.env.VERCEL = "1"; }
});
