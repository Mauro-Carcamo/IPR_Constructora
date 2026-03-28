"use client";

import { useEffect, useState } from "react";

export function Header() {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${stuck ? " is-stuck" : ""}`} id="inicio">
      <div className="container">
        <nav className="nav">
          <a className="brand" href="#inicio" aria-label="IPR Constructora">
            <img className="brand-logo" src="/Logo/logo-ipr-sin-fondo.png" alt="IPR Constructora" />
            <span className="sr-only">IPR Constructora</span>
          </a>
          <div className="nav__links" aria-label="Navegación">
            <a className="nav-link" href="#nosotros">Nosotros</a>
            <a className="nav-link" href="#servicios">Servicios</a>
            <a className="nav-link" href="#clientes">Clientes</a>
            <a className="nav-link" href="#contacto">Contacto</a>
            <a className="nav-link" href="#faq">FAQ</a>
          </div>
          <a className="touch" href="#contacto" aria-label="Cotiza tu proyecto">
            <span className="touch__text">Cotizar</span>
            <span className="touch__circle" aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}