# Proyectos — slider infinito

Este repo incluye un slider de “Proyectos” con **auto‑scroll + drag + inercia** y un look oscuro más cercano al estado actual de la landing:

- Texto encima (chips + título + kicker)
- Movimiento interno (parallax) de la imagen dentro del card
- Crossfade entre 2+ imágenes cuando el slide queda “en foco”

## Dónde está

- `Bosquejo_1/ipr-next/src/components/sections/projects.tsx`
- `Bosquejo_1/ipr-next/src/app/globals.css`

## Cómo editar los proyectos

Los proyectos viven en `src/lib/ipr-data.ts` y cada slide usa:

- `title`
- `kicker`
- `chips`
- `images`

Recomendaciones:

- Mantén `alt` descriptivo en la primera imagen.
- Las imágenes adicionales pueden ir con `alt=""`.

## Ajustar tamaño y velocidad (look & feel)

En `src/app/globals.css`:

- `--slide-w`, `--slide-h` controlan el tamaño.
- `--slide-gap` controla el espacio entre slides.

- `--slide-w`, `--slide-h` controlan el tamaño.
- `--slide-gap` controla el espacio entre slides.

## Estado actual

- La sección vive justo después del hero.
- El título visible del slider fue retirado.
- Las imágenes usan las rutas `Ipr_*.jpeg` categorizadas en `src/lib/ipr-data.ts`.

## Accesibilidad

- Con `prefers-reduced-motion: reduce` se mantiene la experiencia más estable posible y se reducen los efectos visuales.
