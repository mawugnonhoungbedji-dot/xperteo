"use client";
import { useEffect, useState } from "react";
import Link from "@/components/site-link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
const key = "xperteo-measurement";
export function MobileNav() { return <div className="mobile-nav"><Sheet><SheetTrigger aria-label="Ouvrir le menu" className="icon-btn"><Menu /></SheetTrigger><SheetContent><SheetTitle>XpertEO</SheetTitle><SheetDescription>Votre prochain client vous cherche déjà.</SheetDescription><nav className="mobile-links">{[["/services", "Expertises"], ["/methodology", "Notre méthode"], ["/resources", "Ressources"], ["/case-studies", "Réalisations"], ["/about", "À propos"], ["/diagnostic", "Obtenir mon diagnostic"]].map(([url, label]) => <SheetClose key={url} asChild><Link href={url}>{label}</Link></SheetClose>)}</nav></SheetContent></Sheet></div>; }
export function track(name: string, label = "") { if (localStorage.getItem(key) !== "yes")
    return; fetch("/api/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, label, path: location.pathname }), keepalive: true }).catch(() => { }); }
export function PrivacyControl() { return <button className="text-button" onClick={() => window.dispatchEvent(new Event("privacy-open"))}>Préférences de mesure</button>; }
export function SiteEffects() { const pathname = usePathname(); useEffect(() => { if (localStorage.getItem(key) === "yes")
    track("page_view"); }, [pathname]); const [show, setShow] = useState(false); useEffect(() => { const open = () => setShow(true); window.addEventListener("privacy-open", open); const click = (e: MouseEvent) => { const el = (e.target as HTMLElement).closest<HTMLElement>("[data-track]"); if (el)
    track("cta_clicked", el.dataset.track); }; document.addEventListener("click", click); return () => { window.removeEventListener("privacy-open", open); document.removeEventListener("click", click); }; }, []); return show ? <section className="privacy-panel" role="dialog" aria-label="Préférences de mesure" aria-modal="false"><h3>Une mesure à votre choix.</h3><p>La mesure d’audience est désactivée par défaut. Vous pouvez autoriser les événements anonymes de navigation et de conversion, sans cookie publicitaire.</p><div><button className="button purple" onClick={() => { localStorage.setItem(key, "yes"); setShow(false); track("page_view"); }}>Autoriser</button><button className="button ghost" onClick={() => { localStorage.setItem(key, "no"); setShow(false); }}>Refuser</button></div></section> : null; }
