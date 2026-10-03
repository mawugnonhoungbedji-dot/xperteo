import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export function getDb() {
  const globalEnv = (globalThis as unknown as { env?: { DB?: D1Database } }).env;
  if (!globalEnv?.DB) {
    throw new Error("Cloudflare D1 binding `DB` is unavailable.");
  }
  return drizzle(globalEnv.DB, { schema });
}
