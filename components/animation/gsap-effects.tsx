"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

export function GsapEffects() {
  const pathname = usePathname();
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth <= 768;

    const ctx = gsap.context(() => {
      ScrollTrigger.config({
        ignoreMobileResize: true,
      });

      // -------------------------------------------------------------
      // 1. HERO ENTRANCE (Initial load sequence)
      // -------------------------------------------------------------
      const hero = document.querySelector(".hero");
      if (hero) {
        const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });

        heroTl
          .fromTo(
            ".hero-kicker .eyebrow",
            { opacity: 0, y: -25, filter: isMobile ? "none" : "blur(6px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 }
          )
          .fromTo(
            ".hero-kicker .edition",
            { opacity: 0, y: -25, filter: isMobile ? "none" : "blur(6px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
            "-=0.6"
          )
          .fromTo(
            ".hero h1",
            { opacity: 0, y: 40, filter: isMobile ? "none" : "blur(10px)", scale: 0.98 },
            { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, duration: 1.0 },
            "-=0.5"
          )
          .fromTo(
            ".hero-pill",
            { opacity: 0, scale: 0.5, rotation: -20 },
            { opacity: 1, scale: 1, rotation: -6, duration: 0.8, ease: "back.out(2)" },
            "-=0.6"
          )
          .fromTo(
            ".hero-copy p, .hero-copy .underlink",
            { opacity: 0, y: 25, filter: isMobile ? "none" : "blur(4px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, stagger: 0.1 },
            "-=0.5"
          )
          .fromTo(
            ".hero-tags span",
            { opacity: 0, scale: 0.8, y: 12 },
            { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "back.out(1.8)" },
            "-=0.4"
          )
          .fromTo(
            ".search-tile",
            { opacity: 0, y: 30, scale: 0.95, filter: isMobile ? "none" : "blur(8px)" },
            { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out" },
            "-=0.6"
          )
          .fromTo(
            ".diagnostic-tile",
            { opacity: 0, y: 30, scale: 0.95, filter: isMobile ? "none" : "blur(8px)" },
            { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out" },
            "-=0.65"
          )
          .fromTo(
            ".photo-tile",
            { opacity: 0, y: 35, scale: 0.96, filter: isMobile ? "none" : "blur(12px)" },
            { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out" },
            "-=0.7"
          )
          .fromTo(
            ".floating-label",
            { opacity: 0, scale: 0.6, rotation: -10 },
            { opacity: 1, scale: 1, rotation: -3, duration: 0.8, ease: "back.out(1.5)" },
            "-=0.4"
          )
          .fromTo(
            ".hero-bottom",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            "-=0.4"
          );

        // Continuous subtle floating animation for floating label
        gsap.to(".floating-label", {
          y: -6,
          rotation: -1,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".cursor", {
          opacity: 0,
          duration: 0.6,
          repeat: -1,
          yoyo: true,
          ease: "steps(1)",
        });
      }

      // -------------------------------------------------------------
      // 2. BIDIRECTIONAL SCROLL REVEAL / MASK FOR SECTION HEADERS
      // -------------------------------------------------------------
      const sectionHeads = document.querySelectorAll(".section-head, .page-intro, .editorial-heading");
      sectionHeads.forEach((head) => {
        const items = head.querySelectorAll(".eyebrow, h1, h2, p, .underlink, .section-note");
        if (items.length > 0) {
          gsap.fromTo(
            items,
            {
              opacity: 0,
              y: 30,
              filter: isMobile ? "none" : "blur(8px)",
            },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.75,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: head,
                start: "top 90%",
                toggleActions: isMobile ? "play none none none" : "play reverse play reverse",
              },
            }
          );
        }
      });

      // -------------------------------------------------------------
      // 3. SYSTEM SECTION & CARDS (Bidirectional Show / Hide)
      // -------------------------------------------------------------
      const systemSection = document.querySelector("#system, .system");
      if (systemSection) {
        gsap.fromTo(
          systemSection,
          { opacity: 0.5, y: 40, scale: 0.97, filter: isMobile ? "none" : "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: systemSection,
              start: "top 92%",
              toggleActions: isMobile ? "play none none none" : "play reverse play reverse",
            },
          }
        );

        const systemCards = document.querySelectorAll(".system-card");
        if (systemCards.length > 0) {
          systemCards.forEach((card, index) => {
            const cardElements = card.querySelectorAll(".card-top, h3, p, .signal-graphic, .answer-graphic, .conversion-graphic, .card-link");
            
            const cardTl = gsap.timeline({
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: isMobile ? "play none none none" : "play reverse play reverse",
              },
            });

            cardTl
              .fromTo(
                card,
                { opacity: 0, y: 45, scale: 0.94, filter: isMobile ? "none" : "blur(10px)" },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  duration: 0.8,
                  delay: isMobile ? 0 : index * 0.08,
                  ease: "back.out(1.1)",
                }
              )
              .fromTo(
                cardElements,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: "power2.out" },
                "-=0.35"
              );
          });
        }

        const systemBottom = document.querySelector(".system-bottom");
        if (systemBottom) {
          gsap.fromTo(
            systemBottom,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: systemBottom,
                start: "top 95%",
                toggleActions: isMobile ? "play none none none" : "play reverse play reverse",
              },
            }
          );
        }
      }

      // -------------------------------------------------------------
      // 4. EXPERTISE ACCORDIONS (Bidirectional Cascade Batch)
      // -------------------------------------------------------------
      const serviceItems = document.querySelectorAll(".service-list details");
      if (serviceItems.length > 0) {
        ScrollTrigger.batch(serviceItems, {
          start: "top 90%",
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              duration: 0.7,
              stagger: 0.1,
              ease: "power3.out",
              overwrite: "auto",
            });
          },
          onLeaveBack: (batch) => {
            if (!isMobile) {
              gsap.to(batch, {
                opacity: 0,
                x: -30,
                filter: "blur(6px)",
                duration: 0.45,
                stagger: 0.08,
                ease: "power2.in",
                overwrite: "auto",
              });
            }
          },
        });
      }

      // -------------------------------------------------------------
      // 5. METHODOLOGY STEPS (Bidirectional Progressive Build)
      // -------------------------------------------------------------
      const methodSteps = document.querySelectorAll(".method-grid > div");
      if (methodSteps.length > 0) {
        methodSteps.forEach((step, index) => {
          const stepChildren = step.querySelectorAll(".step-num, h3, .small-cap, p");
          
          const stepTl = gsap.timeline({
            scrollTrigger: {
              trigger: step,
              start: "top 88%",
              toggleActions: isMobile ? "play none none none" : "play reverse play reverse",
            },
          });

          stepTl
            .fromTo(
              step,
              { opacity: 0, y: 35, filter: isMobile ? "none" : "blur(8px)" },
              {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.75,
                delay: isMobile ? 0 : index * 0.1,
                ease: "power3.out",
              }
            )
            .fromTo(
              stepChildren,
              { opacity: 0, y: 12 },
              { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: "power2.out" },
              "-=0.35"
            );
        });
      }

      // -------------------------------------------------------------
      // 6. REALISATIONS & PROJECT CARDS (Bidirectional Show / Hide)
      // -------------------------------------------------------------
      const projectArticles = document.querySelectorAll(".project-card, .decision-card, .resource-card, .service-box");
      if (projectArticles.length > 0) {
        ScrollTrigger.batch(projectArticles, {
          start: "top 90%",
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.75,
              stagger: 0.1,
              ease: "power3.out",
              overwrite: "auto",
            });
          },
          onLeaveBack: (batch) => {
            if (!isMobile) {
              gsap.to(batch, {
                opacity: 0,
                y: 45,
                scale: 0.94,
                filter: "blur(8px)",
                duration: 0.5,
                stagger: 0.08,
                ease: "power2.in",
                overwrite: "auto",
              });
            }
          },
        });
      }

      // -------------------------------------------------------------
      // 7. PROMISE & CLOSING SECTIONS (Bidirectional Lines)
      // -------------------------------------------------------------
      const promise = document.querySelector(".promise");
      if (promise) {
        const promiseItems = promise.querySelectorAll(".eyebrow, h2, p, .underlink");
        gsap.fromTo(
          promiseItems,
          { opacity: 0, y: 30, filter: isMobile ? "none" : "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: promise,
              start: "top 88%",
              toggleActions: isMobile ? "play none none none" : "play reverse play reverse",
            },
          }
        );
      }

      const closing = document.querySelector(".closing");
      if (closing) {
        const closingItems = closing.querySelectorAll(".eyebrow, h2, .button");
        gsap.fromTo(
          closingItems,
          { opacity: 0, y: 30, filter: isMobile ? "none" : "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: closing,
              start: "top 88%",
              toggleActions: isMobile ? "play none none none" : "play reverse play reverse",
            },
          }
        );
      }

      // -------------------------------------------------------------
      // 8. FAQ ITEMS (Bidirectional Show / Hide on Scroll)
      // -------------------------------------------------------------
      const faqItems = document.querySelectorAll(".faq details");
      if (faqItems.length > 0) {
        ScrollTrigger.batch(faqItems, {
          start: "top 90%",
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.65,
              stagger: 0.08,
              ease: "power3.out",
              overwrite: "auto",
            });
          },
          onLeaveBack: (batch) => {
            if (!isMobile) {
              gsap.to(batch, {
                opacity: 0,
                y: 25,
                filter: "blur(4px)",
                duration: 0.4,
                stagger: 0.06,
                ease: "power2.in",
                overwrite: "auto",
              });
            }
          },
        });
      }

      // -------------------------------------------------------------
      // 9. INNER PAGES (Timeline, Stages, Articles, Forms)
      // -------------------------------------------------------------
      const timelineRows = document.querySelectorAll(".timeline > div, .method-stages > article, .expertise-rows > article");
      if (timelineRows.length > 0) {
        timelineRows.forEach((row, i) => {
          gsap.fromTo(
            row,
            { opacity: 0, y: 30, filter: isMobile ? "none" : "blur(6px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.75,
              delay: isMobile ? 0 : (i % 2) * 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 88%",
                toggleActions: isMobile ? "play none none none" : "play reverse play reverse",
              },
            }
          );
        });
      }

      const formSections = document.querySelectorAll(".form-wrap, .form-info, .stat-grid > div");
      if (formSections.length > 0) {
        gsap.fromTo(
          formSections,
          { opacity: 0, y: 25, filter: isMobile ? "none" : "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formSections[0],
              start: "top 88%",
              toggleActions: isMobile ? "play none none none" : "play reverse play reverse",
            },
          }
        );
      }

      // -------------------------------------------------------------
      // 10. PARALLAX EFFECT ON HERO PHOTO
      // -------------------------------------------------------------
      const photoTileImg = document.querySelector(".photo-tile img");
      if (photoTileImg) {
        gsap.to(photoTileImg, {
          yPercent: 14,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      // -------------------------------------------------------------
      // 11. MAGNETIC CURSOR ATTRACTION ON BUTTONS
      // -------------------------------------------------------------
      if (window.innerWidth > 900) {
        const magneticElements = document.querySelectorAll<HTMLElement>(
          ".hero-pill, .button, .round-arrow, .mini-pill, .nav-cta, .resource-arrow"
        );

        magneticElements.forEach((el) => {
          const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

          const handleMouseMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;

            xTo(distanceX * 0.28);
            yTo(distanceY * 0.28);
          };

          const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
          };

          el.addEventListener("mousemove", handleMouseMove);
          el.addEventListener("mouseleave", handleMouseLeave);
        });
      }

      // Refresh ScrollTrigger once everything is parsed
      ScrollTrigger.refresh();
    });

    ctxRef.current = ctx;

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 450);

    return () => {
      clearTimeout(timer);
      if (ctxRef.current) {
        ctxRef.current.revert();
      }
    };
  }, [pathname]);

  return null;
}
