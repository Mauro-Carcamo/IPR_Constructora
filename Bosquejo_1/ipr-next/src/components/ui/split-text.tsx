"use client";

import { gsap } from "gsap";
import { useEffect, useMemo, useRef } from "react";

type SplitTextProps = {
  text: string;
  className?: string;
};

export function SplitText({ text, className }: SplitTextProps) {
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const chars = useMemo(() => Array.from(text), [text]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) return;

    const letters = root.querySelectorAll<HTMLElement>("[data-letter]");
    const onEnter = () => {
      letters.forEach((letter, index) => {
        gsap.to(letter, {
          y: "-100%",
          duration: 0.3,
          ease: "power2.out",
          delay: index * 0.015,
        });
      });
    };

    const onLeave = () => {
      letters.forEach((letter, index) => {
        gsap.to(letter, {
          y: "0%",
          duration: 0.2,
          ease: "power2.out",
          delay: index * 0.015,
        });
      });
    };

    const btn = root.closest("a,button");
    btn?.addEventListener("mouseenter", onEnter);
    btn?.addEventListener("mouseleave", onLeave);

    return () => {
      btn?.removeEventListener("mouseenter", onEnter);
      btn?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <span ref={rootRef} className={["split-wrap", className].filter(Boolean).join(" ")} aria-hidden="true">
      <span className="split">
        {chars.map((c, idx) => (
          <span key={`a-${idx}`} className="split__ch" data-letter>
            {c === " " ? "\u00A0" : c}
          </span>
        ))}
      </span>
      <span className="split split--clone">
        {chars.map((c, idx) => (
          <span key={`b-${idx}`} className="split__ch" data-letter>
            {c === " " ? "\u00A0" : c}
          </span>
        ))}
      </span>
    </span>
  );
}
