import test, { after } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";

const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(import.meta.url);
const nodemailer = require("nodemailer");
const originalCreateTransport = nodemailer.createTransport;
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
const { deliveryFailureReason } = require(join(build, "lib/delivery-error.js"));
const originalFetch = globalThis.fetch;
const originalEnv = { ...process.env };
after(() => { globalThis.fetch = originalFetch; process.env = originalEnv; nodemailer.createTransport = originalCreateTransport; });
Object.assign(process.env, {
  VERCEL: "1", NODE_ENV: "production", SMTP_HOST: "mail.example.com", SMTP_PORT: "465",
  SMTP_USER: "website@example.com", SMTP_PASSWORD: "test-password-not-real",
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
function mock(redis = { result: 1 }, email = { accepted: ["owner@example.com"], rejected: [] }, failure = false) {
  const calls = [];
  globalThis.fetch = async (url, init) => {
    calls.push({ url, ...init, body: JSON.parse(init.body) });
    assert.equal(url, process.env.UPSTASH_REDIS_REST_URL);
    return Response.json(redis);
  };
  nodemailer.createTransport = options => ({
    async sendMail(body) {
      calls.push({ smtp: true, options, body });
      if (failure) throw new Error("secret-provider-detail");
      return email;
    },
    close() { calls.push({ closed: true }); },
  });
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
test("sends plain text to fixed recipient over verified TLS with visitor Reply-To", async () => {
  const calls = mock();
  const body = { ...valid(), message: "<script>alert(1)</script>", to: "attacker@example.com" };
  assert.equal((await POST(request(body))).status, 201);
  assert.equal((await POST(request(body))).status, 201);
  const emails = calls.filter(call => call.smtp);
  assert.deepEqual(emails[0].body.to, ["owner@example.com"]);
  assert.equal(emails[0].body.replyTo, "visitor@example.com");
  assert.equal(emails[0].body.from, "website@example.com");
  assert.equal(emails[0].body.html, undefined);
  assert.ok(emails[0].body.text.includes(body.message));
  assert.equal(emails[0].body.messageId, emails[1].body.messageId);
  assert.equal(emails[0].options.secure, true);
  assert.equal(emails[0].options.port, 465);
  assert.equal(emails[0].options.tls.rejectUnauthorized, true);
  assert.equal(emails[0].options.disableFileAccess, true);
  assert.equal(emails[0].options.disableUrlAccess, true);
  assert.equal(calls.filter(call => call.closed).length, 2);
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
  for (const name of ["SMTP_PASSWORD", "SMTP_USER", "SMTP_HOST", "LEADS_TO_EMAIL", "RATE_LIMIT_SECRET"]) {
    const value = process.env[name];
    delete process.env[name];
    try {
      const calls = mock();
      assert.equal((await POST(request())).status, 503);
      assert.equal(calls.some(call => call.smtp), false);
    } finally { process.env[name] = value; }
  }
});
test("provider refusal or malformed acceptance never produces success or leaks details", async () => {
  for (const [body, failure] of [[{}, true], [{}, false], [{ accepted: [], rejected: ["owner@example.com"] }, false]]) {
    const calls = mock({ result: 1 }, body, failure);
    const response = await POST(request());
    assert.equal(response.status, 503);
    assert.equal((await response.text()).includes("secret-provider-detail"), false);
    assert.ok(calls.some(call => call.closed));
  }
});
test("network errors keep the submission retryable", async () => {
  globalThis.fetch = async () => { throw new Error("network failure"); };
  assert.equal((await POST(request())).status, 503);
});

test("SMTP configuration rejects insecure ports and mismatched sender identities", async () => {
  for (const [key, value] of [["SMTP_PORT", "25"], ["SMTP_PORT", "0"],
    ["SMTP_USER", "other@example.com"], ["SMTP_HOST", "https://mail.example.com"]]) {
    const original = process.env[key];
    process.env[key] = value;
    try {
      const calls = mock();
      assert.equal((await POST(request())).status, 503);
      assert.equal(calls.some(call => call.smtp), false);
    } finally { process.env[key] = original; }
  }
});

test("SMTP on port 587 requires STARTTLS and certificate validation", async () => {
  process.env.SMTP_PORT = "587";
  try {
    const calls = mock();
    assert.equal((await POST(request())).status, 201);
    const { options } = calls.find(call => call.smtp);
    assert.equal(options.secure, false);
    assert.equal(options.requireTLS, true);
    assert.equal(options.tls.rejectUnauthorized, true);
  } finally { process.env.SMTP_PORT = "465"; }
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

test("without Redis, SMTP works and local limits block repeated submissions", async () => {
  const saved = { ...process.env };
  delete process.env.UPSTASH_REDIS_REST_URL;
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
  delete process.env.RATE_LIMIT_SECRET;
  try {
    const calls = mock();
    for (let i = 0; i < 5; i++) assert.equal((await POST(request())).status, 201);
    assert.equal((await POST(request())).status, 429);
    assert.equal((await POST(request(valid(), { "x-vercel-forwarded-for": "203.0.113.11" }))).status, 201);
    assert.equal(calls.filter(call => call.smtp).length, 6);
    assert.equal(calls.some(call => call.url), false);
    await assert.rejects(rateLimit(request(valid(), { "x-vercel-forwarded-for": "invalid" }), "leads"));
  } finally { process.env = saved; }
});

test("local global quota is bounded and expires at the next hourly window", async () => {
  const saved = { ...process.env };
  const now = Date.now;
  delete process.env.UPSTASH_REDIS_REST_URL;
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
  try {
    Date.now = () => 3600000 * 100;
    for (let i = 1; i <= 100; i++) {
      assert.equal(await rateLimit(request(valid(), { "x-vercel-forwarded-for": `192.0.2.${i}` }), "leads"), true);
    }
    assert.equal(await rateLimit(request(valid(), { "x-vercel-forwarded-for": "192.0.2.101" }), "leads"), false);
    Date.now = () => 3600000 * 101;
    assert.equal(await rateLimit(request(), "leads"), true);
  } finally { process.env = saved; Date.now = now; }
});

test("partially configured Redis never silently falls back to local limits", async () => {
  const saved = { ...process.env };
  try {
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    const calls = mock();
    assert.equal((await POST(request())).status, 503);
    assert.equal(calls.length, 0);
  } finally { process.env = saved; }
});

test("SMTP diagnostic logs identify authentication failure without leaking data", async () => {
  const logs = [];
  const originalError = console.error;
  console.error = (...args) => logs.push(args);
  try {
    mock();
    nodemailer.createTransport = () => ({
      async sendMail() { throw Object.assign(new Error("secret-password visitor@example.com"), { code: "EAUTH", response: "secret-provider-response" }); },
      close() {},
    });
    const response = await POST(request());
    assert.equal(response.status, 503);
    assert.deepEqual(logs, [["lead_delivery_failed", { diagnostic: "smtp-v2", stage: "smtp", reason: "smtp_auth_failed" }]]);
    const publicBody = await response.text();
    assert.equal(publicBody.includes("smtp_auth_failed"), false);
    assert.equal(publicBody.includes("secret"), false);
  } finally { console.error = originalError; }
});

test("diagnostic codes are allowlisted and distinguish missing configuration", async () => {
  assert.equal(deliveryFailureReason({ code: "ETIMEDOUT", message: "secret" }, "smtp"), "smtp_timeout");
  assert.equal(deliveryFailureReason({ code: "ERR_TLS_CERT_ALTNAME_INVALID" }, "smtp"), "smtp_tls_failed");
  assert.equal(deliveryFailureReason({ code: "untrusted-secret" }, "smtp"), "smtp_unavailable");
  const originalError = console.error;
  const saved = process.env.SMTP_PASSWORD;
  const logs = [];
  console.error = (...args) => logs.push(args);
  delete process.env.SMTP_PASSWORD;
  try {
    mock();
    assert.equal((await POST(request())).status, 503);
    assert.equal(logs[0][1].reason, "smtp_password_missing");
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    assert.equal((await POST(request())).status, 503);
    assert.equal(logs[1][1].reason, "redis_config");
    assert.equal(logs[1][1].stage, "rate_limit");
  } finally {
    console.error = originalError;
    process.env.SMTP_PASSWORD = saved;
    process.env.UPSTASH_REDIS_REST_TOKEN = "test-token";
  }
});
