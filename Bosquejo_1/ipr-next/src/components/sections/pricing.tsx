"use client";

import { useId } from "react";
import { SplitText } from "@/components/ui/split-text";

type PricingCard = {
  title: string;
  kicker: string;
  points: string[];
  tone?: "default" | "dark";
};

const CARDS: PricingCard[] = [
  {
    title: "Cotización personalizada",
    kicker: "Para empresas y particulares",
    points: ["Visita técnica y levantamiento", "Presupuesto por etapas", "Planificación de plazos"],
  },
  {
    title: "Diseño + ejecución",
    kicker: "De la idea a la entrega",
    points: ["Propuesta de layout y materiales", "Coordinación de especialidades", "Control de calidad en obra"],
    tone: "dark",
  },
  {
    title: "Remodelación y obras",
    kicker: "Actualización de espacios",
    points: ["Intervención sin detener operación", "Terminaciones y detalles", "Garantía y postventa"],
  },
];

export function Pricing() {
  const sectionId = useId();

  return (
    <section className="section section-pricing" id="modalidad" aria-labelledby={sectionId}>
      <div className="container" data-reveal-group>
        <div className="section-label" data-reveal>
          MODALIDAD
        </div>

        <div className="pricing-head">
          <h2 id={sectionId} data-reveal>
            Cotiza y construye con un plan claro
          </h2>
          <p className="muted" data-reveal>
            Te guiamos desde el levantamiento hasta la entrega, con hitos y alcances definidos.
          </p>
        </div>

        <div className="pricing-grid">
          {CARDS.map((c) => (
            <div key={c.title} className={`pricing-card${c.tone === "dark" ? " pricing-card--dark" : ""}`} data-reveal>
              <div className="pricing-card__top">
                <div className="pricing-kicker muted">{c.kicker}</div>
                <h3 className="pricing-title">{c.title}</h3>
              </div>
              <ul className="pricing-points">
                {c.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <a className="btn btn--accent pricing-cta" href="#contacto" aria-label="Solicitar cotización">
                <span className="btn__text">Cotizar</span>
                <SplitText text="Cotizar" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
