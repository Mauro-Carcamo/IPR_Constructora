# Landing Page — estilo tipo rh.design (referencia)

Objetivo: construir una landing con estética **minimal dark**, tipografía grande, layout aireado, micro‑interacciones y **parallax suave** (como referencia visual `https://www.rh.design/`).

> Nota legal/práctica: esto es una guía para **inspirarse** (diseño/movimiento) y reproducir patrones generales. Evita copiar assets/código exacto de terceros.

## 1) Estructura recomendada (secciones)

Una estructura que calza con ese estilo y sirve para Constructora IPR:

1. **Nav** (simple, 2–5 links, CTA “Cotizar”)
2. **Hero** (claim + subclaim + CTA + 1–2 “proof points”)
3. **Credenciales** (números: años, proyectos, rubros; o logos clientes si aplica)
4. **Servicios** (3–6 cards, con foco en “diseño + construcción”)
5. **Proyectos / Work** (grid o slider; cada item con “antes/después” o render/obra)
6. **Proceso** (pasos claros; reduce fricción de cotización)
7. **Testimonios** (si hay) o “Por qué IPR”
8. **CTA final** (WhatsApp + correo + formulario corto)
9. **Footer** (RRSS, contacto, links)

## 2) Look & feel (tokens base)

En `pagina_modelo.md` aparecen variables de color que funcionan bien para este estilo. Como base:

```css
:root{
  --bg:#0d0d0d;
  --fg:#f2f2f2;
  --muted:#b3b3b3;
  --line:#202020;
  --accent:#d6ff50;
}
```

Reglas visuales:

- Fondo oscuro + texto claro con **alto contraste**.
- Un acento (verde/limón) para CTAs, highlights y estados hover.
- Mucho espacio: padding vertical generoso por sección.
- Cards con borde sutil (1px) y radios contenidos (12–20px).

## 3) Tipografía y grid

- Tipografía “moderna” (en la referencia se usa **Geist**). Alternativas seguras: `Inter`, `Satoshi`, `Manrope`.
- Títulos con tracking sutil y tamaños grandes (hero 48–72px desktop).
- Grid container típico: 1120–1200px max, con gutters amplios.

## 4) Movimiento (qué replicar del estilo)

El “feeling” suele venir de:

- **Smooth scroll** (ej. Lenis) + animaciones atadas al scroll (parallax suave).
- Uso fuerte de `transform` (translate/scale/rotate) y `opacity` (evitar animar `top/left`).
- `position: sticky` para secciones con “capas” o elementos que permanecen mientras el fondo se mueve.
- Micro‑interacciones en botones/texto (hover con “split letters” o desplazamiento).

Si quieres algo cercano a lo que se ve en `pagina_modelo.md`, allí aparecen:

- Lenis (smooth scroll)
- GSAP (animaciones)
- Slick (slider)
- Webflow interactions (atributos `data-w-id`)

No es obligatorio usar todo; la landing puede lograr un resultado similar con JS mínimo.

## 5) Accesibilidad / performance (no negociables)

- Respetar `prefers-reduced-motion` (desactivar parallax/animaciones cuando aplique).
- Mantener 60fps: animar sólo `transform` y `opacity`; usar `will-change` con criterio.
- Optimizar imágenes (WebP/AVIF), `loading="lazy"` y tamaños correctos.

## 6) Checklist para empezar (en este repo)

- Definir secciones (lista anterior) y contenido mínimo por sección.
- Elegir paleta final (mantener un solo acento).
- Preparar assets en `imagenes/` y logos en `Logo/`.
- Implementar parallax con las recetas de `Docs/PARALLAX_RECETAS.md`.

