import type { Article } from "./content";
import { editorialArticles } from "./editorial";

type Runtime = {
  DB?: D1Database;
  ADMIN_EMAILS?: string;
  SITE_ORIGIN?: string;
};

export const runtime = (): Runtime => {
  try {
    return (globalThis as unknown as { env?: Runtime })?.env || {};
  } catch {
    return {};
  }
};

export function db() {
  const database = runtime().DB;
  if (!database) {
    throw new Error("Storage unavailable");
  }
  return database;
}

export async function getPublished(kind = "article"): Promise<Article[]> {
  const guides = kind === "article" ? editorialArticles : [];
  try {
    const database = runtime().DB;
    if (!database) return guides;
    const result = await database
      .prepare("SELECT * FROM content WHERE status = ? AND kind = ? ORDER BY published_at DESC LIMIT 100")
      .bind("published", kind)
      .all<Article>();
    return [...guides, ...result.results.filter((a) => !guides.some((g) => g.slug === a.slug))].sort((a, b) =>
      b.published_at.localeCompare(a.published_at)
    );
  } catch {
    return guides;
  }
}

export async function getArticle(slug: string, kind = "article"): Promise<Article | null> {
  const guide = kind === "article" ? editorialArticles.find((a) => a.slug === slug) : undefined;
  if (guide) return guide;
  try {
    const database = runtime().DB;
    if (!database) return null;
    return database
      .prepare("SELECT * FROM content WHERE slug = ? AND kind = ? AND status = ?")
      .bind(slug, kind, "published")
      .first<Article>();
  } catch {
    return null;
  }
}
