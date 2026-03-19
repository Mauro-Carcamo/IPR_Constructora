"use client";

import Image from "next/image";
import { SplitText } from "@/components/ui/split-text";

const WHATSAPP_LINK =
  "https://wa.me/56961245714?text=" +
  encodeURIComponent("Hola, quiero cotizar un proyecto con IPR Constructora.");

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" aria-label="Footer">
      <div className="container">
        <div className="footer-wrap">
          <div className="footer-top">
            <div className="footer-brand">
              <a className="footer-logo" href="#inicio" aria-label="IPR Constructora">
                <img className="footer-logo__img" src="/Logo/ipr-logo.png" alt="IPR Constructora" />
              </a>
              <div className="footer-copy muted">Todos los derechos reservados.</div>
            </div>

            <div className="footer-nav">
              <a className="footer-link" href="#inicio">
                Inicio
              </a>
              <a className="footer-link" href="#servicios">
                Servicios
              </a>
              <a className="footer-link" href="#proyectos">
                Proyectos
              </a>
              <a className="footer-link" href="#clientes">
                Clientes
              </a>
              <a className="footer-link" href="#contacto">
                Contacto
              </a>
            </div>

            <div className="footer-social">
              <div className="footer-social__label muted">Síguenos</div>
              <div className="footer-social__icons">
                <a
                  className="social-btn"
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M20 11.9C20 16.4 16.2 20 11.6 20c-1.4 0-2.8-.4-4-1.1L4 20l1.1-3.4A8 8 0 0 1 4 11.9C4 7.5 7.8 4 12.4 4 17 4 20 7.5 20 11.9Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.1 10.2c.2-1 .6-1.1 1.1-.4l.7 1c.2.3.2.6 0 .8l-.4.4c.6 1 1.4 1.7 2.4 2.3l.5-.4c.2-.2.6-.2.8 0l1 .7c.7.5.6 1-.4 1.2-1 .2-2.4-.1-4-1.4-1.6-1.3-2.4-2.6-2.1-3.6Z"
                      fill="currentColor"
                      opacity="0.85"
                    />
                  </svg>
                </a>
                <a
                  className="social-btn"
                  href="https://www.instagram.com/constructoraipr/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M7.5 4.8H16.5C18.1 4.8 19.4 6.1 19.4 7.7V16.3C19.4 17.9 18.1 19.2 16.5 19.2H7.5C5.9 19.2 4.6 17.9 4.6 16.3V7.7C4.6 6.1 5.9 4.8 7.5 4.8Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M12 15.8C10.4 15.8 9.1 14.5 9.1 12.9C9.1 11.3 10.4 10 12 10C13.6 10 14.9 11.3 14.9 12.9C14.9 14.5 13.6 15.8 12 15.8Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M16.8 7.3H16.81"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-cta">
            <a className="btn btn--accent" href="#contacto">
              <span className="btn__text">Solicita tu cotización</span>
              <SplitText text="Solicita tu cotización" />
            </a>
            <a
              className="btn btn--ghost"
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
            >
              <span className="btn__text">Escríbenos por WhatsApp</span>
              <SplitText text="Escríbenos por WhatsApp" />
            </a>
          </div>

          <div className="footer-bottom">
            <Image
              className="footer-img"
              src="/imagenes/WhatsApp Image 2026-03-18 at 2.41.43 PM (1).jpeg"
              alt=""
              fill
              sizes="100vw"
              priority={false}
            />
            <div className="footer-bottom__meta muted">
              <span>IPR Constructora</span>
              <span>© {year}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
