"use client";

import { services } from "@/lib/ipr-data";
import gsap from "gsap";
import { type RefObject, useEffect, useId, useRef } from "react";

function useServicesHover(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) return;
    if (!root.current) return;

    const lines = Array.from(root.current.querySelectorAll<HTMLElement>("[data-service-line]"));

    const getServiceMove = (line: HTMLElement) => line.querySelector<HTMLElement>(".service-move");

    const onEnter = (e: Event) => {
      const line = e.currentTarget as HTMLElement;
      const move = getServiceMove(line);
      if (move) {
        gsap.killTweensOf(move);
        gsap.to(move, { y: "-120px", duration: 0.65, ease: "power3.out" });
      }
    };

    const onLeave = (e?: Event) => {
      const line = e?.currentTarget as HTMLElement | undefined;
      const move = line ? getServiceMove(line) : null;
      if (move) {
        gsap.killTweensOf(move);
        gsap.to(move, { y: "0px", duration: 0.55, ease: "power3.out" });
      }
    };

    lines.forEach((line) => {
      line.addEventListener("mouseenter", onEnter);
      line.addEventListener("mouseleave", onLeave);
      line.addEventListener("click", (e) => e.preventDefault());
    });

    return () => {
      lines.forEach((line) => {
        line.removeEventListener("mouseenter", onEnter);
        line.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [root]);
}

export function Services() {
  const sectionId = useId();
  const rootRef = useRef<HTMLElement | null>(null);

  useServicesHover(rootRef);

  return (
    <section
      ref={rootRef}
      className="section section-services"
      id="servicios"
      aria-labelledby={sectionId}
    >
      <div className="services-top">
        <div className="container" data-reveal-group>
          <div className="section-label section-label--accent" data-reveal>
            SERVICIOS
          </div>
          <div className="services-head">
            <h2 id={sectionId} data-reveal>
              Servicios de ConstrucciÃ³n en Santiago
            </h2>
            <p data-reveal>
              Ejecutamos proyectos para empresas y particulares: oficinas, vivienda, retail y obras
              civiles. Nos adaptamos al alcance, plazos y estÃ¡ndar que necesitas.
            </p>
            <p className="muted" data-reveal>
              Si ya tienes diseÃ±o, lo construimos; si no, te acompaÃ±amos con definiciÃ³n de
              materiales, terminaciones y coordinaciÃ³n de especialidades.
            </p>
          </div>
        </div>
      </div>

      <div className="services-bottom" data-services>
        {services.map((s) => (
          <button
            key={s.id}
            className="service-line"
            type="button"
            data-service-line
          >
            <span className="service-inner container" aria-hidden="true">
              <span className="service-move">
                <span className="service-row service-row--front">
                  <span className="service-title">{s.title}</span>
                  <span className="service-num">{s.num}</span>
                </span>
                <span className="service-row service-row--back">
                  <span className="service-copy">
                    <span className="service-copy__accent">IPR</span>
                    <span className="service-copy__text">{s.description}</span>
                  </span>
                  <span className="service-num">{s.num}</span>
                </span>
              </span>
            </span>
            <span className="sr-only">{s.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
