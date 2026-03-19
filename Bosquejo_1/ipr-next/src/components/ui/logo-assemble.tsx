"use client";

import { useEffect, useRef } from "react";

type CssVars = React.CSSProperties & Record<string, string>;

const PIECES = [
  { key: "p1", href: "/Logo/Logo_prueba_1.png", w: 1024, h: 1536, ox: 0, oy: 0, s: 1, d: 0.0, fx: -46, fy: -28, fr: 10 },
  { key: "p2", href: "/Logo/Logo_prueba_2.png", w: 1024, h: 1536, ox: 0, oy: 0, s: 1, d: 0.12, fx: 44, fy: -14, fr: -8 },
  { key: "p3", href: "/Logo/Logo_prueba_3.png", w: 1024, h: 1536, ox: 0, oy: 0, s: 1, d: 0.22, fx: -18, fy: 34, fr: 7 },
];

export function LogoAssemble({ variant = "card" }: { variant?: "card" | "mark" }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) return;

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
      const ny = ((e.clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1;
      wrap.style.setProperty("--mx", (nx * 5.5).toFixed(2));
      wrap.style.setProperty("--my", (ny * 5.5).toFixed(2));
    };

    const onLeave = () => {
      wrap.style.setProperty("--mx", "0");
      wrap.style.setProperty("--my", "0");
    };

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) {
      wrap.classList.add("is-on");
      return;
    }

    const play = () => {
      wrap.classList.remove("is-on");
      // force reflow so animation can restart if needed
      void wrap.offsetWidth;
      wrap.classList.add("is-on");
    };

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          play();
          obs.disconnect();
          break;
        }
      },
      { threshold: 0.35 }
    );

    obs.observe(wrap);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`logo-assemble${variant === "mark" ? " logo-assemble--mark" : ""}`}
      aria-label="Logo IPR animado"
    >
      <svg
        className="logo-assemble__svg"
        viewBox="0 0 1024 1536"
        role="img"
        aria-label="IPR Constructora"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        {PIECES.map((p) => {
          const style: CssVars = {
            "--ox": String(p.ox),
            "--oy": String(p.oy),
            "--s": String(p.s),
            "--delay": `${p.d}s`,
            "--fromx": String(p.fx),
            "--fromy": String(p.fy),
            "--fromr": `${p.fr}deg`,
          };

          return (
            <g key={p.key} className="logo-piece" style={style}>
              <image
                href={p.href}
                xlinkHref={p.href}
                x="0"
                y="0"
                width={p.w}
                height={p.h}
                preserveAspectRatio="none"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
