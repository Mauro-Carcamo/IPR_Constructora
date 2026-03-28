"use client";

import { services } from "@/lib/ipr-data";
import { useEffect, useId, useRef } from "react";

export function Services() {
  const sectionId = useId();
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const lines = Array.from(root.querySelectorAll<HTMLElement>("[data-service-line]"));
    if (!lines.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle("is-active", entry.isIntersecting);
        }
      },
      {
        root: null,
        threshold: 0.6,
        rootMargin: "-40% 0px -40% 0px",
      }
    );

    lines.forEach((line) => observer.observe(line));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={rootRef} className="section section-services" id="servicios" aria-labelledby={sectionId}>
      <div className="services-top">
        <div className="container" data-reveal-group>
          <div className="section-label section-label--accent" data-reveal>
            SERVICIOS
          </div>
          <div className="services-head">
            <h2 id={sectionId} data-reveal>
              Servicios de Construcción en Santiago
            </h2>
            <p data-reveal>
              Ejecutamos proyectos para empresas y particulares: oficinas, vivienda, retail y obras
              civiles. Nos adaptamos al alcance, plazos y estándar que necesitas.
            </p>
            <p className="muted" data-reveal>
              Si ya tienes diseño, lo construimos; si no, te acompañamos con definición de
              materiales, terminaciones y coordinación de especialidades.
            </p>
          </div>
        </div>
      </div>

      <div className="services-bottom" data-services>
        {services.map((service) => (
          <button key={service.id} className="service-line" type="button" data-service-line>
            <span className="service-inner container" aria-hidden="true">
              <span className="service-move">
                <span className="service-row service-row--front">
                  <span className="service-title">{service.title}</span>
                  <span className="service-num">{service.num}</span>
                </span>
                <span className="service-row service-row--back">
                  <span className="service-copy">
                    <span className="service-copy__text">{service.description}</span>
                  </span>
                  <span className="service-num">{service.num}</span>
                </span>
              </span>
            </span>
            <span className="sr-only">{service.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
}