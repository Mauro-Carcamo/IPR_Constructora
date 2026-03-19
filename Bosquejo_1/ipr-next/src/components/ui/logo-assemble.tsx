"use client";

import { useEffect, useRef } from "react";

type CssVars = React.CSSProperties & Record<string, string>;

// Piezas reales del logo (blanco de fondo): usamos `mix-blend-mode:multiply` en CSS
// para que el blanco "desaparezca" y encajen correctamente.
const PIECES = [
  {
    key: "p1",
    href: "/Logo/Logo_1.jpeg",
    // final placement (percentages inside logo box)
    x: "-2%",
    y: "-4%",
    w: "40%",
    h: "120%",
    d: 0.0,
    fx: "-42%",
    fy: "-18%",
    fr: "10deg",
  },
  {
    key: "p3",
    href: "/Logo/Logo_3.jpeg",
    x: "12%",
    y: "10%",
    w: "56%",
    h: "112%",
    d: 0.12,
    fx: "22%",
    fy: "28%",
    fr: "-8deg",
  },
  {
    key: "p2",
    href: "/Logo/Logo_2.jpeg",
    x: "30%",
    y: "-10%",
    w: "78%",
    h: "92%",
    d: 0.22,
    fx: "34%",
    fy: "-22%",
    fr: "7deg",
  },
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
      {variant === "mark" ? (
        <img className="logo-assemble__mark" src="/Logo/logo_full.png" alt="IPR Constructora" />
      ) : (
        <div className="logo-assemble__logo" aria-hidden="true">
          {PIECES.map((p) => {
            const style: CssVars = {
              "--x": p.x,
              "--y": p.y,
              "--w": p.w,
              "--h": p.h,
              "--delay": `${p.d}s`,
              "--fromx": p.fx,
              "--fromy": p.fy,
              "--fromr": p.fr,
            };
            return (
              <div key={p.key} className="logo-piece" style={style}>
                <img className="logo-piece__img" src={p.href} alt="" draggable={false} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
