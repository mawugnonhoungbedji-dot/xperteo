import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/components/site-shell";
import { SiteEffects } from "@/components/site-client";
import { SmoothScroll } from "@/components/animation/smooth-scroll";
import { GsapEffects } from "@/components/animation/gsap-effects";
import { InteractiveSpotlight } from "@/components/animation/interactive-spotlight";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: {
    default: "XpertEO — Trouvés. Compris. Choisis.",
    template: "%s | XpertEO",
  },
  description: site.description,
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="lenis lenis-smooth">
      <body id="top" className="relative overflow-x-hidden selection:bg-[#ceff05] selection:text-[#111]">
        <InteractiveSpotlight />
        <SmoothScroll />
        <GsapEffects />
        <a className="skip" href="#main">
          Aller au contenu
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <SiteEffects />
      </body>
    </html>
  );
}
