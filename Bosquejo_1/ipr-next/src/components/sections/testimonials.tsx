"use client";

import { useId, useState } from "react";

const FAQ = [
  {
    q: "¿Trabajan con empresas y particulares?",
    a: "Sí. Adaptamos el servicio según el tipo de proyecto (oficinas, vivienda, retail u obra civil) y el alcance requerido.",
  },
  {
    q: "¿Cómo es la forma de trabajo?",
    a: "Levantamos necesidades, definimos alcance y cronograma, y coordinamos ejecución con control de calidad en obra y comunicación continua.",
  },
  {
    q: "¿Pueden ayudar con diseño y terminaciones?",
    a: "Sí. Podemos acompañar con diseño de espacios, especificación de materiales y terminaciones según el estándar acordado.",
  },
  {
    q: "¿Cómo cotizo?",
    a: "Contáctanos y cuéntanos tu idea. Te orientamos y armamos una cotización según alcance, plazos y requerimientos.",
  },
];

const STEPS = [
  {
    t: "Planificación",
    d: "Definimos alcance, permisos, presupuesto y cronograma. Alineamos expectativas y riesgos desde el día 1.",
  },
  {
    t: "Ejecución",
    d: "Coordinación de obra, proveedores y calidad. Avances controlados con hitos claros y comunicación continua.",
  },
  {
    t: "Entrega",
    d: "Revisión final, terminaciones y puesta en marcha. Entrega ordenada y soporte post-obra según el proyecto.",
  },
];

export function Testimonials() {
  const sectionId = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section section-test" id="faq" aria-labelledby={sectionId}>
      <div className="container" data-reveal-group>
        <div className="section-label" data-reveal>
          FAQ
        </div>
        <div className="test-head">
          <h2 id={sectionId} data-reveal>
            Preguntas frecuentes
          </h2>
          <p className="muted" data-reveal>
            Respuestas cortas a lo más importante antes de empezar.
          </p>
        </div>

        <div className="faq">
          {FAQ.map((item, idx) => {
            const isOpen = open === idx;
            return (
              <button
                key={item.q}
                className={`faq-item${isOpen ? " is-open" : ""}`}
                type="button"
                onClick={() => setOpen((value) => (value === idx ? null : idx))}
                data-reveal
              >
                <div className="faq-q">
                  <span>{item.q}</span>
                  <span className="faq-ico" aria-hidden="true">
                    {isOpen ? "–" : "+"}
                  </span>
                </div>
                <div className="faq-a" aria-hidden={!isOpen}>
                  <p className="muted">{item.a}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="process-head" style={{ marginTop: "48px" }}>
          <h2 data-reveal>De la idea a la entrega</h2>
          <p className="muted" data-reveal>
            Etapas claras, control en obra y comunicación constante.
          </p>
        </div>

        <div className="process-grid">
          {STEPS.map((step, idx) => (
            <article key={step.t} className="process-card" data-reveal>
              <div className="process-num">{String(idx + 1).padStart(2, "0")}</div>
              <h3 className="process-title">{step.t}</h3>
              <p className="muted">{step.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}