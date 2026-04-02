"use client";

import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  { href: "#clientes", label: "Clientes" },
  { href: "#contacto", label: "Contacto" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [stuck, setStuck] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderNavItems = (className: string, onClick?: () => void) =>
    NAV_ITEMS.map((item) => (
      <a key={item.href} className={className} href={item.href} onClick={onClick}>
        {item.label}
      </a>
    ));

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    const onResize = () => {
      if (window.innerWidth > 900) setMobileOpen(false);
    };

    onScroll();
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header className={`site-header${stuck ? " is-stuck" : ""}`} id="inicio">
      <div className="container">
        <nav className="nav">
          <a className="brand" href="#inicio" aria-label="IPR Constructora">
            <img className="brand-logo" src="/Logo/logo-ipr-sin-fondo.png" alt="IPR Constructora" />
            <span className="sr-only">IPR Constructora</span>
          </a>

          <button
            className={`nav-toggle${mobileOpen ? " is-open" : ""}`}
            type="button"
            aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>

          <div className="nav__links" aria-label="Navegacion">
            {renderNavItems("nav-link")}
          </div>

          <a className="touch" href="#contacto" aria-label="Cotiza tu proyecto">
            <span className="touch__text">Cotizar</span>
            <span className="touch__circle" aria-hidden="true">↗</span>
          </a>
        </nav>

        <div className={`nav-panel${mobileOpen ? " is-open" : ""}`} id="mobile-nav" aria-hidden={!mobileOpen}>
          <div className="nav-panel__card">
            <div className="nav-panel__links">
              {renderNavItems("nav-panel__link", () => setMobileOpen(false))}
            </div>
            <a className="touch nav-panel__touch" href="#contacto" aria-label="Cotiza tu proyecto" onClick={() => setMobileOpen(false)}>
              <span className="touch__text">Cotizar</span>
              <span className="touch__circle" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}