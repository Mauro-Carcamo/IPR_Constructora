"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function Nosotros() {
  const signatureRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const signature = signatureRef.current;
    if (!signature) return;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) {
      signature.classList.add("is-on");
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          signature.classList.add("is-on");
          obs.disconnect();
          break;
        }
      },
      { threshold: 0.25 }
    );

    obs.observe(signature);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section section-founder" id="nosotros" aria-label="Nosotros">
      <div className="container" data-reveal-group>
        <div className="founder-wrap">
          <div className="founder-left">
            <div className="section-label" data-reveal>
              NOSOTROS
            </div>
            <h2 className="founder-title" data-reveal>
              Empresa Constructora en Santiago
            </h2>

            <div className="founder-text">
              <p className="muted" data-reveal>
                Somos una empresa constructora en Santiago orientada a proyectos modernos,
                eficientes y sustentables.
              </p>
              <p className="muted" data-reveal>
                Nos adaptamos a los desafíos de la construcción en Chile incorporando materiales
                responsables y buenas prácticas de ejecución.
              </p>
              <p className="muted" data-reveal>
                Nuestro enfoque es colaborativo: cercanía con el cliente, plazos claros y altos
                estándares en obra.
              </p>
            </div>

            <a
              className="link-line"
              href="https://www.instagram.com/constructoraipr/"
              target="_blank"
              rel="noreferrer"
              data-reveal
            >
              <span className="link-line__text">Conecta con nosotros en Instagram</span>
              <span className="link-line__icon" aria-hidden="true">
                ↗
              </span>
              <span className="link-line__underline" aria-hidden="true" />
            </a>
          </div>

          <div className="founder-right">
            <Image
              className="founder-img"
              src="/imagenes/WhatsApp Image 2026-03-18 at 2.41.43 PM (1).jpeg"
              alt="Proyecto de construcción y diseño — IPR Constructora"
              fill
              sizes="(min-width: 980px) 420px, 100vw"
              priority={false}
            />

            <div ref={signatureRef} className="signature" aria-hidden="true">
              <svg viewBox="0 0 420 120" width="420" height="120" role="img">
                <path
                  className="signature-path"
                  d="M22,78 C58,22 92,22 120,78 C150,116 202,106 226,58 C252,6 312,6 336,58 C360,102 392,102 402,58"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  className="signature-path signature-path--thin"
                  d="M42,70 C70,36 94,36 116,70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
