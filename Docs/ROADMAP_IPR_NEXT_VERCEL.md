# Roadmap — IPR Constructora (modelo `pagina_modelo.md`) + Next.js + Vercel

Objetivo: definir y construir una landing “premium” (movimiento/parallax + estética similar a `pagina_modelo.md`) para IPR, y dejarla lista para desplegar en Vercel.

## 0) Decisiones base (1 día)

- **Stack principal**: Next.js (React) + TypeScript + Tailwind.
- **Evitar doble stack** (Vue) salvo requerimiento (admin aparte, micrositio, etc.).
- Definir contacto real: correo, WhatsApp, dirección/ciudad.

## 1) Especificación de diseño (1–2 días)

Entregables:

- Tokens: colores, tipografías, spacing, radios.
- Reglas de movimiento:
  - parallax sutil por scroll (capas/objetos)
  - micro‑interacciones (underline, hover cards)
  - carrusel infinito “proyectos” con crossfade y parallax interno
- Mapa de secciones actual:
  - Hero, Proyectos, Nosotros, Servicios, Clientes, Contacto, FAQ, Footer

Fuente:

- `pagina_modelo.md` (referencia de movimientos / composición)
- `Docs/COPY_SEO_IPR.md` (copy SEO)

## 2) Arquitectura (0.5–1 día)

En Next:

- `src/app/page.tsx`: composición de secciones
- `src/components/*`: secciones interactivas como Client Components
- `src/styles/*` o `globals.css`: estilos base + utilidades Tailwind
- Data simple (por ahora): arrays/constantes para servicios, clientes, proyectos

## 3) Implementación UI (2–4 días)

Prioridad alta (replica “sensación”):

- Header sticky + nav
- Hero (decoraciones con parallax)
- Proyectos (slider infinito + texto + parallax interno)
- Nosotros (layout tipo founder: texto + imagen + firma animada)
- Servicios (líneas con reveal por scroll, sin hover de mouse)
- Clientes (cards con reveal sutil)
- Contacto (formulario + RRSS)
- FAQ (preguntas frecuentes + proceso integrado)
- Footer (CTA centrado + RRSS + carrusel de proyectos)

## 4) SEO + performance (1–2 días)

- 1 solo H1 (hero)
- Meta `title` y `description` (desde `Docs/COPY_SEO_IPR.md`)
- Imágenes optimizadas (Next `<Image />`, tamaños, `priority` sólo en hero)
- `prefers-reduced-motion` en todas las animaciones

## 5) Deploy en Vercel (0.5 día)

- `vercel link`
- `vercel --prod`
- Configurar dominio (si aplica)
- Revisar “Preview deployments” para QA

## 6) Cierre / checklist (0.5 día)

- Mobile first (sin “jank”)
- Accesibilidad básica (focus visible, contraste, alt)
- Validar que el look se parece a `pagina_modelo.md` (movimiento + spacing + cards)

## Estado actual en este repo

- Prototipo estático con movimientos: `Bosquejo_1/index.html`
- Next.js listo con landing IPR (React + TS + Tailwind): `Bosquejo_1/ipr-next/`
  - Smooth scroll (Lenis): `Bosquejo_1/ipr-next/src/components/motion/motion-provider.tsx`
  - Hover “split letters” (GSAP): `Bosquejo_1/ipr-next/src/components/ui/split-text.tsx`
  - Secciones principales: `Bosquejo_1/ipr-next/src/components/sections/`
- Favicon y apple icon conectados en `Bosquejo_1/ipr-next/src/app/layout.tsx`
- Mobile refinado con paddings unificados en varias secciones y footer/carousel más compacto.
- Documentación de secciones/movimientos: `Docs/`

## Cómo correrlo (local)

```bash
cd Bosquejo_1/ipr-next
npm run dev
```
