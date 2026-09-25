"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function InteractiveSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spotlightRef.current;
    if (!el) return;

    // Check if user prefers reduced motion or is on mobile
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.innerWidth < 768) {
      return;
    }

    const xTo = gsap.quickTo(el, "left", { duration: 0.8, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "top", { duration: 0.8, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      aria-hidden="true"
      className="pointer-events-none fixed -top-[200px] -left-[200px] z-0 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[110px] transition-opacity duration-500"
      style={{
        background: "radial-gradient(circle, rgba(99, 33, 237, 0.15) 0%, rgba(206, 255, 5, 0.08) 50%, transparent 70%)",
      }}
    />
  );
}
