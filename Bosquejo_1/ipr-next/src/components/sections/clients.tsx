"use client";

import { clientTags } from "@/lib/ipr-data";
import { useEffect, useId, useRef } from "react";

export function Clients() {
  const sectionId = useId();
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-client-card]"));

    if (reduceMotion) {
      cards.forEach((card) => card.classList.add("is-ready"));
      return;
    }

    cards.forEach((card) => {
      card.style.pointerEvents = "none";
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            window.setTimeout(() => {
              card.style.pointerEvents = "auto";
              card.classList.add("is-ready");
            }, 900);
            obs.unobserve(card);
          });
        },
        { threshold: 0.2 }
      );
      obs.observe(card);
    });
  }, []);

  return (
    <section
      ref={rootRef}
      className="section section-clients"
      id="clientes"
      aria-labelledby={sectionId}
    >
      <div className="container" data-reveal-group>
        <div className="section-label" data-reveal>
          CLIENTES
        </div>
        <div className="clients-head clients-head--rh">
          <h2 id={sectionId} data-reveal>
            Clientes de IPR Constructora
          </h2>
          <p className="muted" data-reveal>
            Trabajamos con empresas y particulares que valoran orden, transparencia y buena
            ejecución.
          </p>
          <p className="muted" data-reveal>
            El objetivo es simple: relaciones de largo plazo, basadas en calidad, plazos y
            comunicación clara.
          </p>
        </div>

        <div className="clients-grid clients-grid--rh" data-clients>
          {clientTags.map((c) => (
            <article
              key={c.id}
              className="client-card client-card--rh"
              data-client-card
              tabIndex={0}
              data-cursor="see"
            >
              <div className="client-front" aria-hidden="true">
                <div className="client-front__inner">
                  <div className="client-logo">{c.title}</div>
                </div>
                <div className="client-tint client-tint--rh" aria-hidden="true" />
              </div>
              <div className="client-hover" aria-label={c.title}>
                <div className="client-logo client-logo--invert">{c.title}</div>
                <p className="client-desc">{c.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
