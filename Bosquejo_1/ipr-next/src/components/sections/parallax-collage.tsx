"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const IMAGES = [
  "/imagenes/Ipr_norai_1.jpeg",
  "/imagenes/Ipr_the_coffee_4.jpeg",
  "/imagenes/Ipr_the_coffee_1.jpeg",
  "/imagenes/Ipr_norai_3.jpeg",
  "/imagenes/Ipr_cinepolis_1.jpeg",
];

export function ParallaxCollage() {
  const sectionId = useId();
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const blocks = Array.from(root.querySelectorAll<HTMLElement>("[data-parallax-img]"));
    const ctx = gsap.context(() => {
      blocks.forEach((el, i) => {
        const dir = i % 2 === 0 ? -1 : 1;
        gsap.fromTo(
          el,
          { y: dir * 36 },
          {
            y: dir * -36,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="section section-parallax" aria-labelledby={sectionId}>
      <div className="container" data-reveal-group>
        <div className="section-label" data-reveal>
          EXPERIENCIA
        </div>
        <div className="parallax-head">
          <h2 id={sectionId} data-reveal>
            Diseño, ejecución y control en obra
          </h2>
          <p className="muted" data-reveal>
            Un bloque parallax (tipo rh.design) para dar profundidad y movimiento a la landing.
          </p>
        </div>
      </div>

      <div className="parallax-wrap" aria-hidden="true">
        {IMAGES.map((src, i) => (
          <div key={src} className={`parallax-block parallax-block--${i + 1}`} data-parallax-img>
            <Image
              src={src}
              alt=""
              fill
              sizes="(min-width: 1400px) 420px, (min-width: 980px) 30vw, 60vw"
              priority={false}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

