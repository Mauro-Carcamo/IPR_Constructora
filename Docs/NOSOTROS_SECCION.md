# Nosotros — sección tipo “Founder”

Esta sección replica el layout “Founder” de la referencia (columna de texto + imagen grande + detalle animado) adaptada a **IPR Constructora** para el bloque **NOSOTROS**.

## Dónde está

- `Bosquejo_1/index.html` (`#nosotros`, clase `.section-founder`)
- `Bosquejo_1/styles.css` (clases `.founder-*`, `.link-line*`, `.signature*`)
- `Bosquejo_1/main.js` (`initSignature()`)

## Qué edito normalmente

- Título/subtítulo: `h2.founder-title` y `span.founder-sub`
- Texto: `.founder-text p`
- Link: `.link-line` (URL/etiqueta)
- Imagen derecha: `img.founder-img` (`src` y `alt`)

## Animación (firma)

Se usa un SVG simple con `stroke-dashoffset` para dibujarse cuando entra al viewport.

- Se activa con `IntersectionObserver` (clase `is-on`).
- Respeta `prefers-reduced-motion` (aparece sin animación).
