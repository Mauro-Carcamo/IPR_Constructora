"use client";

import { useEffect } from "react";
import { SplitText } from "@/components/ui/split-text";

function useScrollParallax() {
  useEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) return;

    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    if (!items.length) return;

    const clamp = (min: number, v: number, max: number) => Math.min(max, Math.max(min, v));

    let raf = 0;
    const tick = () => {
      const vh = window.innerHeight || 1;
      for (const el of items) {
        const speed = Number(el.getAttribute("data-parallax") || 0.2);
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const progress = (center - vh / 2) / (vh / 2);
        const y = clamp(-90, progress * speed * -140, 90);
        el.style.setProperty("--py", `${y}px`);
      }
      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, []);
}

export function Hero() {
  useScrollParallax();

  return (
    <section className="section hero hero--light">
      <div className="container hero-center" data-reveal-group>
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="hero-kicker" data-reveal>
              Constructora en Chile
            </p>

            <h1 className="hero-h1" data-reveal>
              Obras civiles, industriales y proyectos habitacionales
            </h1>

            <p className="hero-lead" data-reveal>
              Desarrollamos proyectos de construcción con altos estándares de calidad, seguridad y cumplimiento de plazos. En IPR Constructora ejecutamos soluciones eficientes para empresas y particulares.
            </p>

            <div className="hero-actions" data-reveal>
              <a className="btn btn--accent" href="#contacto" aria-label="Solicitar cotización">
                <span className="btn__text">Solicitar cotización</span>
                <SplitText text="Solicitar cotización" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-deco" aria-hidden="true">
        <div className="hero-glow" data-parallax="0.22" />
        <div className="hero-grid" data-parallax="0.1" />
      </div>
    </section>
  );
}
