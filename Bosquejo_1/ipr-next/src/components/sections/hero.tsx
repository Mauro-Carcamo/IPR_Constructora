"use client";

import { useEffect } from "react";
import { SplitText } from "@/components/ui/split-text";
import Image from "next/image";
import { LogoAssemble } from "@/components/ui/logo-assemble";

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
              IPR Constructora — oficinas, viviendas, retail y obras civiles
            </p>

            <h1 className="hero-h1" data-reveal>
              Constructora en Santiago | IPR{" "}
              <span className="hero-pill" aria-hidden="true">
                <Image src="/imagenes/WhatsApp Image 2026-03-18 at 2.41.43 PM.jpeg" alt="" fill sizes="160px" />
              </span>{" "}
              Constructora
            </h1>

            <p className="hero-lead" data-reveal>
              Diseñamos y ejecutamos espacios funcionales, modernos y eficientes, acompañando a cada cliente desde la idea inicial
              hasta la entrega final.
            </p>

            <div className="hero-actions" data-reveal>
              <a className="btn btn--accent" href="#proyectos" aria-label="Ver proyectos IPR">
                <span className="btn__text">Ver proyectos</span>
                <SplitText text="Ver proyectos" />
              </a>

              <div className="hero-rating" aria-label="5 de 5 estrellas">
                <span className="hero-rating__mark" aria-hidden="true">
                  C
                </span>
                <div className="hero-rating__meta">
                  <div className="hero-stars" aria-hidden="true">
                    ★★★★★
                  </div>
                  <div className="hero-rating__text">5/5 RATING</div>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-visual" data-reveal>
            <LogoAssemble />
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
