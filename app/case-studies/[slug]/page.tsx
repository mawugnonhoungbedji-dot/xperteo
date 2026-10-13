import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "@/components/site-link";
import { ArticlePage, articleMeta } from "@/components/article-page";
import { PageIntro, CTA, JsonLd } from "@/components/site-shell";
import { projects } from "@/lib/projects";
import { meta, site } from "@/lib/site";

export const dynamic = "force-dynamic";
const removedSlugs = new Set(["minsii", "faithful-matchmaker"]);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (removedSlugs.has(slug)) notFound();
  const p = projects.find(p => p.slug === slug);
  return p ? meta(p.name + " — Réalisation XpertEO", p.description, "/case-studies/" + slug) : articleMeta(slug, "case-study");
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (removedSlugs.has(slug)) notFound();
  const p = projects.find(p => p.slug === slug);
  if (!p) return <ArticlePage slug={slug} kind="case-study" />;

  return <>
    <nav className="wrap breadcrumb" aria-label="Fil d’Ariane"><Link href="/">Accueil</Link><span>/</span><Link href="/case-studies">Réalisations</Link><span>/</span><span>{p.name}</span></nav>
    <PageIntro campaign="project" label={p.category.toUpperCase()} title={p.name} description={p.intro} />
    <div className="wrap intro-actions"><a className="button purple" href={p.url} target="_blank" rel="noopener noreferrer">Visiter le site ↗</a><span>Conception · Copywriting · Design · Développement · Mise en ligne</span></div>
    <figure className="wrap project-large"><Image src={p.image} alt={"Page d’accueil de " + p.name} width={p.imageWidth || 1348} height={p.imageHeight || 928} sizes="(max-width: 800px) 100vw, 1200px" priority /><figcaption>Capture du site le {p.capturedAt}. Le site peut évoluer depuis cette présentation.</figcaption></figure>
    {p.work && <nav className="wrap project-toc" aria-label="Dans cette réalisation"><a href="#contexte">Le besoin</a><a href="#intervention">Notre travail</a><a href="#parcours">Le parcours</a><a href="#bilan">Le résultat</a></nav>}
    <section id="contexte" className="wrap content-section two-col">
      <div><span className="eyebrow">LE PROJET</span><h2 className="spaced-title">Un univers, un public, un parcours.</h2><p className="prose">{p.description}</p>{p.note && <p className="project-note">{p.note}</p>}</div>
      <div><span className="eyebrow">{p.challenge ? "LE BESOIN" : "NOTRE INTERVENTION"}</span><h2 className="spaced-title">{p.challenge ? "Ce que le site devait rendre possible." : "Une réalisation de A à Z."}</h2><p className="prose">{p.challenge || "Prise en charge globale du projet, de sa conception à sa mise en ligne, en passant par le design et le développement."}</p><p className="prose">{p.focus}</p></div>
    </section>
    {p.work && <section id="intervention" className="wrap content-section"><div className="section-head"><div><span className="eyebrow">NOTRE INTERVENTION DE A À Z</span><h2>Des choix qui travaillent ensemble.</h2></div><p>Le message, l’image et le parcours sont pensés autour du même objectif.</p></div><ol className="project-work">{p.work.map((work, i) => <li key={work.title}><span className="project-work-index" aria-hidden="true">0{i + 1}</span><div><h3>{work.title}</h3><p>{work.description}</p></div></li>)}</ol></section>}
    {p.journey && <section id="parcours" className="wrap content-section"><span className="eyebrow">CÔTÉ VISITEUR</span><h2 className="spaced-title">Une prochaine étape à chaque moment.</h2><ol className="project-journey">{p.journey.map((step, i) => <li key={step.title}><span className="eyebrow">0{i + 1}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol></section>}
    <section className="wrap content-section two-col"><h2>Ce que le visiteur découvre.</h2><ul className="signal-list">{p.features.map(f => <li key={f}>{f}</li>)}</ul></section>
    {p.outcome && <section id="bilan" className="wrap content-section project-outcome"><span className="eyebrow">LE RÉSULTAT DU TRAVAIL</span><h2 className="spaced-title">Une présence avec un fil conducteur.</h2><p className="prose">{p.outcome}</p><p className="project-measurement">Cette présentation décrit le site et le parcours livrés. Les performances commerciales nécessitent des données de suivi et une période de mesure ; aucun taux d’ouverture ou de conversion n’est avancé ici.</p></section>}
    <section className="wrap conversion-band"><div><span className="eyebrow">ET VOTRE PROJET ?</span><h2>Une présence pensée pour vos propres objectifs.</h2><p>Partons de votre offre et des attentes de vos visiteurs pour construire un parcours utile.</p></div><CTA light>Présenter mon projet</CTA></section>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "CreativeWork", name: p.name, description: p.description, url: site.origin + "/case-studies/" + slug, image: site.origin + p.image, creator: { "@type": "Organization", name: "XpertEO", url: site.origin }, about: { "@type": "WebSite", name: p.name, url: p.url } }} />
  </>;
}
