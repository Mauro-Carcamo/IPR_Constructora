"use client";

import Image from "next/image";

const WHATSAPP_LINK =
  "https://wa.me/56961245714?text=" +
  encodeURIComponent("Hola, quiero cotizar un proyecto con IPR Constructora.");

const FOOTER_SLIDES = [
  { src: "/imagenes/Ipr_norai_2.jpeg", alt: "Norai - detalle interior" },
  { src: "/imagenes/Ipr_cinepolis_1.jpeg", alt: "Cinépolis - avance de obra" },
  { src: "/imagenes/Ipr_the_coffee_4.jpeg", alt: "The Coffee - detalle de obra" },
  { src: "/imagenes/Ipr_norai_1.jpeg", alt: "Norai - render principal" },
  { src: "/imagenes/Ipr_cinepolis_3.jpeg", alt: "Cinépolis - ejecución en terreno" },
  { src: "/imagenes/Ipr_the_coffee_2.jpeg", alt: "The Coffee - interior" },
  { src: "/imagenes/Ipr_norai_3.jpeg", alt: "Norai - render complementario" },
  { src: "/imagenes/Ipr_cinepolis_4.jpeg", alt: "Cinépolis - detalle final" },
  { src: "/imagenes/Ipr_the_coffee_1.jpeg", alt: "The Coffee - fachada y obra" },
  { src: "/imagenes/Ipr_cinepolis_2.jpeg", alt: "Cinépolis - terminaciones" },
  { src: "/imagenes/Ipr_the_coffee_6.jpeg", alt: "The Coffee - composición general" },
  { src: "/imagenes/Ipr_norai_1.jpeg", alt: "Norai - render principal" },
  { src: "/imagenes/Ipr_the_coffee_5.jpeg", alt: "The Coffee - ajuste y avance" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const carouselSlides = [...FOOTER_SLIDES, ...FOOTER_SLIDES, ...FOOTER_SLIDES];

  return (
    <footer className="site-footer" aria-label="Footer">
      <div className="container">
        <div className="footer-wrap">
          <div className="footer-cta">
            <a className="btn btn--accent footer-cta__button" href="#contacto">
              <span className="btn__text">Solicita tu cotización</span>
            </a>

            <div className="footer-social footer-social--inline" aria-label="Redes sociales">
              <a className="social-btn social-btn--wa" href={WHATSAPP_LINK} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M20 11.9C20 16.4 16.2 20 11.6 20c-1.4 0-2.8-.4-4-1.1L4 20l1.1-3.4A8 8 0 0 1 4 11.9C4 7.5 7.8 4 12.4 4 17 4 20 7.5 20 11.9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M9.1 10.2c.2-1 .6-1.1 1.1-.4l.7 1c.2.3.2.6 0 .8l-.4.4c.6 1 1.4 1.7 2.4 2.3l.5-.4c.2-.2.6-.2.8 0l1 .7c.7.5.6 1-.4 1.2-1 .2-2.4-.1-4-1.4-1.6-1.3-2.4-2.6-2.1-3.6Z" fill="currentColor" opacity="0.85" />
                </svg>
              </a>

              <a className="social-btn social-btn--ig" href="https://www.instagram.com/constructoraipr/" target="_blank" rel="noreferrer" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M7.5 4.8H16.5C18.1 4.8 19.4 6.1 19.4 7.7V16.3C19.4 17.9 18.1 19.2 16.5 19.2H7.5C5.9 19.2 4.6 17.9 4.6 16.3V7.7C4.6 6.1 5.9 4.8 7.5 4.8Z" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M12 15.8C10.4 15.8 9.1 14.5 9.1 12.9C9.1 11.3 10.4 10 12 10C13.6 10 14.9 11.3 14.9 12.9C14.9 14.5 13.6 15.8 12 15.8Z" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M16.8 7.3H16.81" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-carousel" aria-label="Carrusel de proyectos">
            <div className="footer-carousel__track" aria-hidden="true">
              {carouselSlides.map((slide, index) => (
                <div className="footer-carousel__slide" key={`${slide.src}-${index}`} style={{ position: "relative" }}>
                  <Image
                    className="footer-carousel__image"
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 760px) 68vw, (max-width: 1200px) 24vw, 360px"
                    priority={false}
                  />
                </div>
              ))}
            </div>

            <div className="footer-carousel__logo" aria-hidden="true">
              <Image
                src="/Logo/ipr-logo-footer-white.png"
                alt=""
                width={320}
                height={320}
                className="footer-carousel__brand"
                style={{ width: "min(240px, 44vw)", height: "auto" }}
                priority={false}
              />
            </div>
          </div>

          <div className="footer-note muted">
            <span>IPR Constructora © {year}</span>
            <span>Todos los derechos reservados.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
