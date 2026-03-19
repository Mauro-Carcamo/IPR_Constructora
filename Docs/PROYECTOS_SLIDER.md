# Proyectos — slider infinito (estilo referencia)

Este repo incluye un slider de “Proyectos” con **auto‑scroll + drag + inercia** y un look más cercano a tu página modelo:

- Texto encima (chips + título + kicker)
- Movimiento interno (parallax) de la imagen dentro del card
- Crossfade entre 2+ imágenes cuando el slide queda “en foco”

## Dónde está

- `Bosquejo_1/index.html` (sección `#proyectos`)
- `Bosquejo_1/styles.css` (estilos del card + overlay)
- `Bosquejo_1/slider.js` (movimiento del track + efectos por slide)

## Cómo editar los proyectos (formato actual)

En `Bosquejo_1/index.html`, dentro de:

```html
<div class="slider-track">
  <!-- slides aquí -->
</div>
```

Cada proyecto es un:

```html
<article class="slide" data-project-slide>...</article>
```

Estructura recomendada:

```html
<article class="slide" data-project-slide>
  <div class="project-media">
    <img class="project-img is-active" src="../imagenes/..." alt="..." loading="lazy" draggable="false">
    <img class="project-img" src="../imagenes/..." alt="" loading="lazy" draggable="false">
  </div>
  <div class="project-overlay">
    <div class="project-top">
      <span class="chip">Categoría</span>
      <span class="chip chip--muted">Estado</span>
    </div>
    <div class="project-bottom">
      <div class="project-kicker muted">Ubicación · Tipo</div>
      <h3 class="project-title">Nombre</h3>
    </div>
  </div>
</article>
```

Recomendaciones:

- Mantén `alt` descriptivo en la **primera** imagen; las imágenes extra pueden ir con `alt=""`.
- Si agregas video: usa `muted playsinline autoplay loop` y `preload="metadata"`.

## Ajustar tamaño y velocidad (look & feel)

En `Bosquejo_1/styles.css`:

- `--slide-w`, `--slide-h` controlan el tamaño.
- `--slide-gap` controla el espacio entre slides.

En `Bosquejo_1/slider.js`:

- `this.autoScrollSpeed = 0.55;` controla la velocidad.
- `updateSlideEffects()` calcula `--p`/`--focus` para el parallax interno.
- `maybeCycleImages()` controla el crossfade cuando el slide queda en foco.

## Accesibilidad

- Con `prefers-reduced-motion: reduce` se desactiva auto‑scroll/drag y el movimiento interno.
- Hay un botón “Pausar/Reanudar movimiento” (`data-slider-toggle`).

