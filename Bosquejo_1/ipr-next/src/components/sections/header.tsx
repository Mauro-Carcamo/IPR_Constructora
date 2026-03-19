import { LogoAssemble } from "@/components/ui/logo-assemble";

export function Header() {
  return (
    <header className="site-header" id="inicio">
      <div className="container">
        <nav className="nav">
          <a className="brand" href="#inicio" aria-label="IPR Constructora">
            <LogoAssemble variant="mark" />
            <span className="sr-only">IPR Constructora</span>
          </a>
          <div className="nav__links" aria-label="Navegación">
            <a className="nav-link" href="#casos">
              Casos
            </a>
            <a className="nav-link" href="#servicios">
              Servicios
            </a>
            <a className="nav-link" href="#modalidad">
              Modalidad
            </a>
            <a className="nav-link" href="#clientes">
              Clientes
            </a>
            <a className="nav-link" href="#proyectos">
              Proyectos
            </a>
            <a className="nav-link" href="#proceso">
              Proceso
            </a>
          </div>
          <a className="touch" href="#contacto" aria-label="Cotiza tu proyecto">
            <span className="touch__text">Cotizar</span>
            <span className="touch__circle" aria-hidden="true">
              ↗
            </span>
          </a>
        </nav>
      </div>
    </header>
  );
}
