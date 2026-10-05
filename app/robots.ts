import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Every group keeps the same exclusions: specific agents do not inherit '*'.
  // These crawl directives never replace authentication or API protections.
  const publicPages = { allow: "/", disallow: ["/admin", "/api/"] };

  return {
    rules: [
      { userAgent: "*", ...publicPages },
      {
        userAgent: ["OAI-SearchBot", "ChatGPT-User", "GPTBot"],
        ...publicPages,
      },
      {
        // Google-Extended covers Gemini grounding and model training.
        userAgent: ["Googlebot", "Google-Extended"],
        ...publicPages,
      },
    ],
    sitemap: site.origin + "/sitemap.xml",
  };
}
