# Clientes — cards con hover (tipo referencia)

Esta sección replica el “feeling” de la parte de clientes de la referencia: cards con estado “front” y “back” que revela detalle en hover, habilitándose cuando entran al viewport.

## Dónde está

- `Bosquejo_1/index.html` (`#clientes`)
- `Bosquejo_1/styles.css` (clases `.clients-*` y `.client-card*`)
- `Bosquejo_1/main.js` (IntersectionObserver + `is-ready`)

## Cómo editar clientes

En `Bosquejo_1/index.html`, cada card es:

```html
<article class="client-card" data-client-card>
  <div class="client-card__front">...</div>
  <div class="client-card__back">...</div>
</article>
```

- Cambia el texto en `.client-mark` (título) y el párrafo del `.client-card__back` (descripción).
- Si luego tienes logos: reemplaza `.client-mark` por un `<img>` dentro del front/back (manteniendo el tamaño).

## Accesibilidad

- Con `prefers-reduced-motion: reduce` se habilita inmediatamente (sin delay) y sin depender de animaciones.
- El foco visible está soportado con `:focus-visible`.

