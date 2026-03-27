"use client";

import Image from "next/image";
import { SplitText } from "@/components/ui/split-text";

export function Nosotros() {
  return (
    <section className="section section-founder" id="nosotros" aria-label="Nosotros">
      <div className="container" data-reveal-group>
        <div className="founder-wrap">
          <div className="founder-left">
            <div className="section-label" data-reveal>
              NOSOTROS
            </div>
            <div className="founder-text">
              <p className="muted" data-reveal>
                En IPR Constructora somos una empresa de construcción en Chile especializada en
                obras civiles, proyectos industriales y desarrollo habitacional.
              </p>
              <p className="muted" data-reveal>
                Acompañamos cada proyecto desde la planificación hasta la ejecución, garantizando
                eficiencia, calidad y cumplimiento.
              </p>
            </div>

            <a className="btn btn--ghost" href="#servicios" data-reveal>
              <span className="btn__text">Ver más</span>
              <SplitText text="Ver más" />
            </a>
          </div>

          <div className="founder-right">
            <Image
              className="founder-img"
              src="/imagenes/Ipr_the_coffee_2.jpeg"
              alt="Proyecto de construcción y diseño — IPR Constructora"
              fill
              sizes="(min-width: 1200px) 560px, (min-width: 980px) 420px, 100vw"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
