"use client";

import { useId } from "react";

const STATS = [
  { k: "Proyectos", v: "50+", d: "Ejecuciones y remodelaciones" },
  { k: "Calidad", v: "Alta", d: "Materiales y terminaciones" },
  { k: "Plazos", v: "Claros", d: "Planificación y control en obra" },
];

export function WhyUs() {
  const sectionId = useId();

  return (
    <section className="section section-why" id="por-que" aria-labelledby={sectionId}>
      <div className="container" data-reveal-group>
        <div className="why-grid">
          <div className="why-copy">
            <div className="section-label" data-reveal>
              POR QUÉ IPR
            </div>
            <h2 id={sectionId} className="why-title" data-reveal>
              Construcción con control, detalle y cumplimiento.
            </h2>
            <p className="muted" data-reveal>
              Planificamos, ejecutamos y entregamos con comunicación constante, control en obra y
              terminaciones alineadas al estándar acordado.
            </p>
          </div>

          <div className="why-stats" aria-label="Indicadores">
            {STATS.map((s) => (
              <article key={s.k} className="why-stat" data-reveal>
                <div className="why-stat__v">{s.v}</div>
                <div className="why-stat__k muted">{s.k}</div>
                <div className="why-stat__d muted">{s.d}</div>
              </article>
            ))}
          </div>
        </div>

        <div className="why-ghost" aria-hidden="true">
          <span>IPR</span>
          <span>IPR</span>
        </div>
      </div>
    </section>
  );
}
