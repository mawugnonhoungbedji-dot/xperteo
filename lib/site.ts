export const site = {
  name: "XpertEO",
  origin: "https://www.e-xperteo.com",
  description: "Équipe basée au Bénin, XpertEO accompagne les PME dans l’acquisition de clients par le SEO, la visibilité IA et l’amélioration de leur site internet.",
  editor: "Constant Houngbedji",
  email: "contact@e-xperteo.com",
  phone: "+2290166325566",
  phoneDisplay: "+229 01 66 32 55 66",
};
export function meta(title: string, description: string, path: string) { return { title, description, alternates: { canonical: site.origin + path }, openGraph: { title: title + " | XpertEO", description, url: site.origin + path, locale: "fr_FR", type: "website" as const }, twitter: { card: "summary" as const, title, description } }; }
