"use client";

import { useId } from "react";

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

export function Process() {
  const sectionId = useId();

  return (
    <section className="section section-process" id="proceso" aria-labelledby={sectionId}>
      <div className="container" data-reveal-group>
        <div className="section-label" data-reveal>
          PROCESO
        </div>
        <div className="process-head">
          <h2 id={sectionId} data-reveal>
            De la idea a la entrega — te acompañamos
          </h2>
          <p className="muted" data-reveal>
            Un proceso simple, con etapas claras y control en obra.
          </p>
        </div>

        <div className="process-grid">
          {STEPS.map((s, idx) => (
            <article key={s.t} className="process-card" data-reveal>
              <div className="process-num">{String(idx + 1).padStart(2, "0")}</div>
              <h3 className="process-title">{s.t}</h3>
              <p className="muted">{s.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

