"use client";

import { useEffect } from "react";

export function ScrollAnimations() {
  useEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) return;

    let ctx: { revert: () => void } | null = null;
    let killed = false;

    (async () => {
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");

      if (killed) return;

      const gsap = gsapModule.gsap;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const groups = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal-group]"));

        groups.forEach((group) => {
          const items = Array.from(group.querySelectorAll<HTMLElement>("[data-reveal]"));
          if (!items.length) return;

          gsap.fromTo(
            items,
            { y: 18, opacity: 0, filter: "blur(10px)" },
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.06,
              scrollTrigger: {
                trigger: group,
                start: "top 78%",
                once: true,
              },
            }
          );
        });

        const lines = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal-line]"));
        lines.forEach((line) => {
          gsap.fromTo(
            line,
            { scaleX: 0, transformOrigin: "left center", opacity: 1 },
            {
              scaleX: 1,
              duration: 1.05,
              ease: "power3.out",
              scrollTrigger: {
                trigger: line,
                start: "top 85%",
                once: true,
              },
            }
          );
        });
      });
    })();

    return () => {
      killed = true;
      ctx?.revert();
    };
  }, []);

  return null;
}

