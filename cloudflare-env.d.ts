// Fallback types for build without @cloudflare/workers-types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type D1Database = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type R2Bucket = any;

declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
  }
}
