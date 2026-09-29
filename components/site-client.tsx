"use client";
import { useEffect, useState } from "react";
import Link from "@/components/site-link";
import { usePathname } from "next/navigation";
import { Menu, Asterisk, ArrowUpRight, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
const key = "xperteo-measurement";

const NAV_LINKS = [
  ["/services", "Expertises"],
  ["/methodology", "Notre méthode"],
  ["/resources", "Ressources"],
  ["/case-studies", "Réalisations"],
  ["/about", "À propos"],
] as const;

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="mobile-nav">
      <button
        type="button"
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="icon-btn mobile-menu-trigger"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Backdrop */}
      <div
        className={`mobile-backdrop ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`mobile-drawer ${isOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu principal"
      >
        {/* Header */}
        <div className="mobile-sheet-header">
          <Link
            href="/"
            className="logo mobile-sheet-logo"
            aria-label="XpertEO — accueil"
            onClick={() => setIsOpen(false)}
          >
            <Asterisk size={28} strokeWidth={3} />
            <span>
              Xpert<span className="logo-eo">EO</span>
            </span>
          </Link>
          <button
            type="button"
            aria-label="Fermer le menu"
            className="icon-btn mobile-close-btn"
            onClick={() => setIsOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mobile-links" aria-label="Navigation principale">
          {NAV_LINKS.map(([url, label]) => (
            <Link
              key={url}
              href={url}
              className={`mobile-nav-link ${pathname === url ? "active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              <span>{label}</span>
              <ArrowUpRight size={16} className="mobile-link-arrow" />
            </Link>
          ))}
        </nav>

        {/* Footer CTA */}
        <div className="mobile-sheet-footer">
          <Link
            href="/diagnostic"
            className="button purple mobile-cta-btn"
            data-track="mobile-nav-diagnostic"
            onClick={() => setIsOpen(false)}
          >
            Parlons de votre projet <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
export function track(name: string, label = "") { if (localStorage.getItem(key) !== "yes")
    return; fetch("/api/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, label, path: location.pathname }), keepalive: true }).catch(() => { }); }
export function PrivacyControl() { return <button className="text-button" onClick={() => window.dispatchEvent(new Event("privacy-open"))}>Préférences de mesure</button>; }
export function SiteEffects() { const pathname = usePathname(); useEffect(() => { if (localStorage.getItem(key) === "yes")
    track("page_view"); }, [pathname]); const [show, setShow] = useState(false); useEffect(() => { const open = () => setShow(true); window.addEventListener("privacy-open", open); const click = (e: MouseEvent) => { const el = (e.target as HTMLElement).closest<HTMLElement>("[data-track]"); if (el)
    track("cta_clicked", el.dataset.track); }; document.addEventListener("click", click); return () => { window.removeEventListener("privacy-open", open); document.removeEventListener("click", click); }; }, []); return show ? <section className="privacy-panel" role="dialog" aria-label="Préférences de mesure" aria-modal="false"><h3>Une mesure à votre choix.</h3><p>La mesure d’audience est désactivée par défaut. Vous pouvez autoriser les événements anonymes de navigation et de conversion, sans cookie publicitaire.</p><div><button className="button purple" onClick={() => { localStorage.setItem(key, "yes"); setShow(false); track("page_view"); }}>Autoriser</button><button className="button ghost" onClick={() => { localStorage.setItem(key, "no"); setShow(false); }}>Refuser</button></div></section> : null; }
