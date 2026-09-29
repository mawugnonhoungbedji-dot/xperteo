"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Check if user prefers reduced motion or is on small mobile
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Prevent mobile URL bar resize from jittering scroll triggers
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });

    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // On mobile, use native touch scrolling and bind window scroll directly to ScrollTrigger
      const handleNativeScroll = () => {
        ScrollTrigger.update();
      };

      window.addEventListener("scroll", handleNativeScroll, { passive: true });

      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 350);

      return () => {
        clearTimeout(refreshTimer);
        window.removeEventListener("scroll", handleNativeScroll);
      };
    }

    // On Desktop: Initialize Lenis for buttery smooth mouse wheel scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Handle internal anchor jumps smoothly
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el as HTMLElement, { offset: -30, duration: 1.2 });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(refreshTimer);
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Reset scroll on pathname change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return null;
}
