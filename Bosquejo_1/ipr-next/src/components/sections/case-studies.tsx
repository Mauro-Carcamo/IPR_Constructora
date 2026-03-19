"use client";

import Image from "next/image";
import { useId } from "react";
import { projects } from "@/lib/ipr-data";

export function CaseStudies() {
  const sectionId = useId();
  const featured = projects.slice(0, 3);

  return (
    <section className="section section-cases" id="casos" aria-labelledby={sectionId}>
      <div className="container" data-reveal-group>
        <div className="section-label" data-reveal>
          ÚLTIMOS PROYECTOS
        </div>
        <div className="cases-head">
          <h2 id={sectionId} data-reveal>
            Últimos proyectos
          </h2>
          <p className="muted" data-reveal>
            Proyectos recientes y avances de obra para ver estándar y terminaciones.
          </p>
        </div>

        <div className="cases-list">
          {featured.map((p) => (
            <a key={p.id} className="case-card" href="#proyectos" data-reveal data-cursor="see">
              <div className="case-copy">
                <div className="case-kicker muted">{p.kicker}</div>
                <h3 className="case-title">{p.title}</h3>
                <div className="case-chips">
                  <span className="case-chip">{p.chips[0]}</span>
                  <span className="case-chip case-chip--muted">{p.chips[1]}</span>
                </div>
              </div>
              <div className="case-media" aria-hidden="true">
                <Image src={p.images[0].src} alt="" fill sizes="(min-width: 980px) 560px, 100vw" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
