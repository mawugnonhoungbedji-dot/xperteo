import { site } from "@/lib/site";
export default function robots() { return { rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] }, sitemap: site.origin + "/sitemap.xml" }; }
