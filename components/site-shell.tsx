import { BrandStage } from "./brand-visual";
import { PageCampaign, type CampaignKey } from "./page-campaign";
import Link from "@/components/site-link";
import { ArrowUpRight, Asterisk } from "lucide-react";
import { MobileNav, PrivacyControl } from "./site-client";
export function Logo() { return <Link href="/" className="logo" aria-label="XpertEO — accueil"><Asterisk size={34} strokeWidth={3}/><span>Xpert<span className="logo-eo">EO</span></span></Link>; }
export function Header() { return <header className="header wrap"><Logo /><nav aria-label="Navigation principale"><Link href="/services">Expertises</Link><Link href="/methodology">Notre méthode</Link><Link href="/resources">Ressources</Link><Link href="/case-studies">Réalisations</Link><Link href="/about">À propos</Link></nav><Link href="/diagnostic" className="nav-cta" data-track="header-diagnostic">Parlons de votre projet <ArrowUpRight size={17}/></Link><MobileNav /></header>; }
export function CTA({ children = "Obtenir mon diagnostic", href = "/diagnostic", light = false }: {
    children?: React.ReactNode;
    href?: string;
    light?: boolean;
}) { return <Link className={"button " + (light ? "lime" : "purple")} href={href} data-track="diagnostic">{children}<ArrowUpRight size={20}/></Link>; }
export function Footer() { return <><BrandStage scene="low-angle" label="LA SUITE COMMENCE ICI" title="Votre prochain atout commence ici." description="Partagez votre activité et votre objectif pour définir ensemble le prochain pas utile." word="PLUS HAUT." orbits={["Votre ambition.", "Le prochain pas."]} action="Demander mon diagnostic" /><footer className="footer wrap"><div className="footer-top"><div><Logo /><p>Trouvés. Compris. Choisis.</p></div><div><strong>Explorer</strong><Link href="/services">Expertises</Link><Link href="/methodology">Méthode</Link><Link href="/case-studies">Réalisations</Link></div><div><strong>Échanger</strong><Link href="/about">À propos</Link><Link href="/contact">Contact</Link><Link href="/faq">Questions fréquentes</Link></div><div><strong>Approfondir</strong><Link href="/resources">Ressources</Link><Link href="/diagnostic">Diagnostic</Link></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} XpertEO</span><div><Link href="/privacy">Confidentialité</Link><Link href="/terms">Mentions légales</Link><PrivacyControl /></div><a href="#top">Retour en haut ↑</a></div></footer></>; }
export function PageIntro({ label, title, description, campaign, campaignHref }: {
    label: string;
    title: string;
    description: string;
    campaign?: CampaignKey;
    campaignHref?: string;
}) { return <><section className="page-intro wrap"><span className="eyebrow">{label}</span><h1>{title}</h1><p>{description}</p></section>{campaign && <PageCampaign kind={campaign} href={campaignHref} />}</>; }
export function JsonLd({ data }: {
    data: unknown;
}) { return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}/>; }
