"use client";

import Image from "next/image";
import { clientTags } from "@/lib/ipr-data";
import { useId } from "react";

const marqueeRows = [clientTags.slice(0, 8), clientTags.slice(8)];

export function Clients() {
  const sectionId = useId();

  return (
    <section className="section section-clients" id="clientes" aria-labelledby={sectionId}>
      <div className="container" data-reveal-group>
        <div className="section-label" data-reveal>
          CLIENTES
        </div>
        <div className="clients-head clients-head--rh">
          <h2 id={sectionId} data-reveal>
            Clientes de IPR Constructora
          </h2>
          <p className="muted" data-reveal>
            Trabajamos con empresas y particulares que valoran orden, transparencia y buena ejecución.
          </p>
          <p className="muted" data-reveal>
            El objetivo es simple: relaciones de largo plazo, basadas en calidad, plazos y comunicación clara.
          </p>
        </div>

        <div className="clients-marquees" data-clients>
          {marqueeRows.map((row, rowIndex) => (
            <div
              key={`marquee-${rowIndex}`}
              className={`marquee marquee--${rowIndex % 2 === 0 ? "forward" : "reverse"}`}
              aria-label={`Marcas de clientes ${rowIndex + 1}`}
            >
              <div className="marquee-track">
                <ul className="marquee-list">
                  {row.map((client) => (
                    <li key={client.id} className="marquee-item">
                      <article className="marquee-card" data-cursor="see">
                        <Image
                          src={client.logoSrc}
                          alt={client.title}
                          fill
                          sizes="(min-width: 1080px) 18vw, (min-width: 760px) 35vw, 72vw"
                          className="marquee-card__image"
                        />
                        <span className="sr-only">{client.title}</span>
                      </article>
                    </li>
                  ))}
                </ul>
                <ul className="marquee-list" aria-hidden="true">
                  {row.map((client) => (
                    <li key={`${client.id}-clone`} className="marquee-item">
                      <article className="marquee-card" aria-hidden="true">
                        <Image
                          src={client.logoSrc}
                          alt=""
                          fill
                          sizes="(min-width: 1080px) 18vw, (min-width: 760px) 35vw, 72vw"
                          className="marquee-card__image"
                        />
                      </article>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
