# Logo — animación por partes (pendiente)

Estado al **18 de marzo de 2026**: el repo contiene imágenes raster (JPG) con el logo completo y 3 “piezas” rojas separadas.

## Lo que sí hay en `Logo/`

- **Logo completo (wordmark):** `Logo/WhatsApp Image 2026-03-18 at 2.43.51 PM (1).jpeg`
- **Piezas rojas separadas (3):**
  - `Logo/WhatsApp Image 2026-03-18 at 2.41.56 PM.jpeg`
  - `Logo/WhatsApp Image 2026-03-18 at 2.41.57 PM.jpeg`
  - `Logo/WhatsApp Image 2026-03-18 at 2.41.57 PM (1).jpeg`
- **Archivo no usable:** `Logo/WhatsApp Image 2026-03-18 at 2.43.51 PM.jpeg` (se ve vacío/cortado).

## Lo que falta para animación “pro” (recomendado)

Para animar letras/partes con calidad (sin bordes pixelados) se necesita el logo en **vector**:

- `SVG` (ideal para web) o `AI`/`PDF`/`EPS` (fuente) para exportar a SVG por capas.

Y si la animación requiere controlar piezas por separado:

- SVG con capas/grupos (ej. `#mark`, `#ip`, `#r`, `#constructora`, etc.) para animar con CSS/JS/GSAP.

## Próximo paso cuando exista el vector

1. Exportar `logo.svg` con cada pieza en un `<path>` o `<g id="...">`.
2. Integrar el SVG inline en el HTML.
3. Animar con:
   - CSS (`@keyframes`, `transform`, `opacity`) para animaciones simples, o
   - GSAP para secuencias/timings más finos.

