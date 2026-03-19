"use client";

import { services } from "@/lib/ipr-data";
import { type RefObject, useEffect, useId, useRef } from "react";

function useServicesHover(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) return;
    if (!root.current) return;

    const isDesktop = () => window.innerWidth > 977;
    const servicesView = root.current.querySelector<HTMLElement>(".services-view");
    if (!servicesView) return;

    const lines = Array.from(root.current.querySelectorAll<HTMLElement>("[data-service-line]"));

    let activeImages: HTMLImageElement[] = [];
    let occupiedPositions: { left: number; top: number }[] = [];
    let animationTimeouts: number[] = [];

    const clearAllTimeouts = () => {
      animationTimeouts.forEach((t) => window.clearTimeout(t));
      animationTimeouts = [];
    };

    const getMaxWidth = () => {
      const vw = window.innerWidth;
      if (vw > 1440) return 480;
      if (vw > 1200) return 420;
      if (vw > 977) return 360;
      return 320;
    };

    const isOverlapping = (newPos: { left: number; top: number }) => {
      const maxWidth = getMaxWidth();
      const minDistance = maxWidth * 0.7;
      for (const pos of occupiedPositions) {
        const newLeftPx = (newPos.left / 100) * window.innerWidth;
        const newTopPx = (newPos.top / 100) * window.innerHeight;
        const existingLeftPx = (pos.left / 100) * window.innerWidth;
        const existingTopPx = (pos.top / 100) * window.innerHeight;

        const distance = Math.sqrt(
          Math.pow(newLeftPx - existingLeftPx, 2) + Math.pow(newTopPx - existingTopPx, 2)
        );
        if (distance < minDistance) return true;
      }
      return false;
    };

    const getRandomPosition = () => {
      const maxWidth = getMaxWidth();
      let attempts = 0;
      let position: { left: number; top: number };

      do {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const padding = 20;
        const randomLeftPx = padding + Math.random() * (viewportWidth - maxWidth - padding * 2);
        const randomTopPx = padding + Math.random() * (viewportHeight - 300 - padding * 2);
        position = {
          left: (randomLeftPx / viewportWidth) * 100,
          top: (randomTopPx / viewportHeight) * 100,
        };
        attempts++;
        if (attempts > 150) break;
      } while (isOverlapping(position));

      return position;
    };

    const clearImages = () => {
      activeImages.forEach((img) => {
        img.classList.remove("is-in");
        window.setTimeout(() => img.remove(), 520);
      });
      activeImages = [];
      occupiedPositions = [];
    };

    const showImages = (line: HTMLElement) => {
      if (!isDesktop()) return;
      clearAllTimeouts();
      clearImages();

      const raw = line.getAttribute("data-images") || "";
      const sources = raw
        .split("|")
        .map((s) => s.trim())
        .filter(Boolean);
      if (!sources.length) return;

      const maxWidth = getMaxWidth();
      sources.forEach((src, index) => {
        const timeoutId = window.setTimeout(() => {
          if (!isDesktop()) return;
          const img = document.createElement("img");
          img.src = src;
          img.alt = "";
          img.loading = "lazy";
          img.className = "services-float";
          const position = getRandomPosition();
          occupiedPositions.push(position);
          img.style.left = `${position.left}vw`;
          img.style.top = `${position.top}vh`;
          img.style.maxWidth = `${maxWidth}px`;
          servicesView.appendChild(img);
          activeImages.push(img);
          const showTimeoutId = window.setTimeout(() => img.classList.add("is-in"), 50);
          animationTimeouts.push(showTimeoutId);
        }, index * 900);
        animationTimeouts.push(timeoutId);
      });
    };

    const onEnter = (e: Event) => showImages(e.currentTarget as HTMLElement);
    const onLeave = () => {
      clearAllTimeouts();
      clearImages();
    };

    lines.forEach((line) => {
      line.addEventListener("mouseenter", onEnter);
      line.addEventListener("mouseleave", onLeave);
      line.addEventListener("click", (e) => e.preventDefault());
    });

    servicesView.addEventListener("mouseleave", onLeave);

    const onResize = () => {
      if (!isDesktop()) {
        clearAllTimeouts();
        clearImages();
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      servicesView.removeEventListener("mouseleave", onLeave);
      lines.forEach((line) => {
        line.removeEventListener("mouseenter", onEnter);
        line.removeEventListener("mouseleave", onLeave);
      });
      clearAllTimeouts();
      clearImages();
    };
  }, [root]);
}

export function Services() {
  const sectionId = useId();
  const rootRef = useRef<HTMLElement | null>(null);

  useServicesHover(rootRef);

  return (
    <section
      ref={rootRef}
      className="section section-services"
      id="servicios"
      aria-labelledby={sectionId}
    >
      <div className="services-top">
        <div className="container" data-reveal-group>
          <div className="section-label section-label--accent" data-reveal>
            SERVICIOS
          </div>
          <div className="services-head">
            <h2 id={sectionId} data-reveal>
              Servicios de Construcción en Santiago
            </h2>
            <p data-reveal>
              En IPR Constructora ofrecemos servicios de construcción en Santiago adaptados a
              distintos tipos de proyectos, tanto para empresas como para clientes particulares.
            </p>
            <p className="muted" data-reveal>
              Nos especializamos en entregar soluciones eficientes, combinando diseño, calidad y
              cumplimiento en cada proyecto de construcción en Chile.
            </p>
          </div>
        </div>
      </div>

      <div className="services-bottom" data-services>
        {services.map((s) => (
          <button
            key={s.id}
            className="service-line"
            type="button"
            data-service-line
            data-images={s.images.join("|")}
          >
            <span className="service-inner container" aria-hidden="true">
              <span className="service-move">
                <span className="service-row service-row--front">
                  <span className="service-title">{s.title}</span>
                  <span className="service-num">{s.num}</span>
                </span>
                <span className="service-row service-row--back">
                  <span className="service-title">{s.title}</span>
                  <span className="service-num">{s.num}</span>
                </span>
              </span>
            </span>
            <span className="sr-only">{s.title}</span>
          </button>
        ))}
      </div>

      <div className="services-view" aria-hidden="true" />
    </section>
  );
}
