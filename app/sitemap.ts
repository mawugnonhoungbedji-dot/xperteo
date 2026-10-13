import { projects } from "@/lib/projects";
import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/content";
import { getPublished } from "@/lib/db";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> { const paths = ["", "/services", "/methodology", "/case-studies", "/resources", "/faq", "/about", "/diagnostic", "/contact", ...services.map(s => "/services/" + s.slug), ...projects.map(p => "/case-studies/" + p.slug)]; const result: MetadataRoute.Sitemap = paths.map(p => ({ url: site.origin + p })); try {
    for (const [kind, root] of [["article", "resources"], ["case-study", "case-studies"]]) {
        for (const a of await getPublished(kind)) {
            if (kind === "case-study" && ["minsii", "faithful-matchmaker"].includes(a.slug)) continue;
            result.push({ url: site.origin + "/" + root + "/" + a.slug, lastModified: a.updated_at });
        }
    }
}
catch { } return result; }
