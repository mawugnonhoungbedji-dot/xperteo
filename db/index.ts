import * as schema from "./schema";

export function getDb() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globalEnv = (globalThis as unknown as { env?: { DB?: any } })?.env;
  if (!globalEnv?.DB) {
    throw new Error("Cloudflare D1 binding `DB` is unavailable.");
  }
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { drizzle } = require("drizzle-orm/d1");
  return drizzle(globalEnv.DB, { schema });
}
