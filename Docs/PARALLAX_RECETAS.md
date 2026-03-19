# Parallax — recetas reutilizables (CSS/JS)

Meta: lograr un parallax “premium” sin sacrificar accesibilidad ni performance.

## 0) Principios

- Parallax “bonito” = **sutil** (pequeños desplazamientos) + buen spacing + buen contraste.
- En móvil, evita `background-attachment: fixed` (es inconsistente). Prefiere `transform`.
- Casi todo se puede lograr con:
  - `position: sticky` (layout)
  - `requestAnimationFrame` + `getBoundingClientRect()` (movimiento)
  - `IntersectionObserver` (activar cuando entra a viewport)

## 1) Receta A — Parallax por atributo `data-parallax`

### HTML

```html
<section class="section">
  <div class="container">
    <h2>Proyectos</h2>
    <div class="parallax-card" data-parallax="0.25">
      <img src="imagenes/proyecto-1.jpg" alt="Proyecto 1">
    </div>
  </div>
</section>
```

`data-parallax` = intensidad (0.10–0.35 suele ser suficiente).

### CSS

```css
.parallax-card{
  --py: 0px;
  transform: translate3d(0,var(--py),0);
  will-change: transform;
}

@media (prefers-reduced-motion: reduce){
  .parallax-card{ transform: none; }
}
```

### JS (vanilla, 60fps, sutil)

```js
const clamp = (min, v, max) => Math.min(max, Math.max(min, v));
const items = [...document.querySelectorAll("[data-parallax]")];

function updateParallax(){
  const vh = window.innerHeight || 1;
  for (const el of items){
    const speed = Number(el.dataset.parallax || 0.2);
    const rect = el.getBoundingClientRect();

    // progreso aproximado: 0 cuando está centrado, negativo arriba, positivo abajo
    const center = rect.top + rect.height / 2;
    const progress = (center - vh / 2) / (vh / 2); // -1..1 aprox

    // desplazamiento en px (clamp para que no se dispare)
    const y = clamp(-80, progress * speed * -120, 80);
    el.style.setProperty("--py", `${y}px`);
  }
  requestAnimationFrame(updateParallax);
}

const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
if (!reduceMotion) requestAnimationFrame(updateParallax);
```

Notas:

- Si el contenido es pesado, optimiza: actualiza sólo items visibles con `IntersectionObserver`.
- Para “más suave”, usa interpolación (lerp) en vez de set directo.

## 2) Receta B — `sticky` + capas (efecto “profundidad”)

Ideal para un hero con 2–4 capas (texto / imagen / shape / grid).

### HTML

```html
<section class="hero-sticky">
  <div class="hero-sticky__sticky">
    <div class="layer" data-parallax="0.10"></div>
    <div class="layer" data-parallax="0.20"></div>
    <div class="layer" data-parallax="0.30"></div>
    <div class="hero-content">...</div>
  </div>
</section>
```

### CSS (layout)

```css
.hero-sticky{ min-height: 180vh; }
.hero-sticky__sticky{
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
}
.layer{
  position:absolute;
  inset:-10%;
  background: radial-gradient(circle at 30% 20%, rgba(214,255,80,.12), transparent 55%);
  pointer-events:none;
}
```

JS: reutiliza la Receta A (`data-parallax`) para mover cada capa.

## 3) Receta C — Activación por `IntersectionObserver` (cuando entra)

Útil para:

- activar hover después de que una sección haya “terminado” de animar (similar a lo que aparece en `pagina_modelo.md`)
- disparar una animación inicial “fade up”

Ejemplo (habilitar interacción al entrar):

```js
const cards = document.querySelectorAll(".card");
for (const card of cards){
  card.style.pointerEvents = "none";
  const obs = new IntersectionObserver((entries) => {
    for (const e of entries){
      if (!e.isIntersecting) continue;
      setTimeout(() => (card.style.pointerEvents = "auto"), 800);
      obs.unobserve(card);
    }
  }, { threshold: 0.2 });
  obs.observe(card);
}
```

## 4) Smooth scroll (opcional) y cómo no romper el parallax

Si usas smooth scroll (ej. Lenis), evita mezclar:

- listeners de `scroll` + un loop de `requestAnimationFrame` redundante

Patrón recomendado:

- Un solo loop (rAF) que actualiza el smooth scroll y el parallax, o
- que el smooth scroll emita el evento y tú actualizas el parallax allí.

## 5) Checklist de calidad

- `prefers-reduced-motion` respetado.
- FPS estable (sin “jank”): transforms + pocos cálculos por frame.
- Parallax sutil (máx 60–100px de desplazamiento).
- Imágenes optimizadas (peso/tamaño correctos).

