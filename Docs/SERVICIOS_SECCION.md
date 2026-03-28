# Servicios — reveal por scroll

Esta sección mantiene filas anchas con un cambio vertical entre título y descripción. El bloque activo se marca cuando entra al centro de la pantalla; no depende del mouse.

## Dónde está

- `Bosquejo_1/ipr-next/src/components/sections/services.tsx`
- `Bosquejo_1/ipr-next/src/app/globals.css`

## Cómo editar servicios

Cada servicio usa un `<button className="service-line">` con:

- una fila frontal con el título
- una fila trasera con la descripción
- `IntersectionObserver` para activar el reveal al pasar por el centro del viewport

## Ajustes rápidos

- Alto de fila: `src/app/globals.css` (`.service-move` y `.service-row`)
- Estado activo: `src/components/sections/services.tsx` (`is-active`)
- Color del bloque de descripción: `var(--brand-red)`

## Accesibilidad

- Se mantiene un `sr-only` con el nombre del servicio.
- `prefers-reduced-motion` sigue respetado por el comportamiento global de la app.
