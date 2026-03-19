# Cómo identificar “el origen” del movimiento (sin copiar el sitio)

Si tu meta es replicar *sensación* (smooth scroll + parallax + micro‑interacciones) de `rh.design`, lo más efectivo es **entender qué librerías/patrones usa** y luego implementar una versión propia (más simple y mantenible).

En este repo ya tienes un punto de partida: `pagina_modelo.md` contiene extractos donde se ven varias piezas (Webflow, Lenis, GSAP, Slick).

## 1) Qué buscar en DevTools

1. Abrir DevTools → pestaña **Network** → filtrar por `JS` y `CSS`.
2. Identificar:
   - librerías (ej. `lenis`, `gsap`, sliders, etc.)
   - archivos “bundle” del builder (en el caso de Webflow suelen ser `webflow.*.js`)
3. Pestaña **Elements**:
   - buscar atributos `data-w-id` (interactions)
   - buscar `style="transform: ..."` aplicados dinámicamente
4. Pestaña **Sources**:
   - `Ctrl+F` en el JS por `lenis`, `gsap`, `ScrollTrigger`, `transform`, `translate3d`

## 2) Señales típicas de parallax “moderno”

- `position: sticky` en wrappers (secciones que “se quedan” mientras el resto se mueve).
- Transformaciones 3D: `translate3d`, `rotate`, `scale`, `transform-style: preserve-3d`.
- Variables CSS actualizadas por JS: `--x`, `--y`, `--progress`.
- Un loop `requestAnimationFrame` (a veces controlado por la librería de smooth scroll).

## 3) Lo que ya aparece en `pagina_modelo.md` (pistas directas)

- **Lenis**: inicialización + `requestAnimationFrame` para smooth scroll.
- **GSAP**: animaciones (en el extracto se ve para hover de texto; el mismo patrón puede usarse para scroll).
- **Webflow interactions**: CSS con selectores `html.w-mod-js:not(.w-mod-ix) [data-w-id="..."]` (Webflow “prepara” estados iniciales).

## 4) Cómo traducir eso a una implementación propia

En vez de copiar bundles:

- Usa `Docs/PARALLAX_RECETAS.md` para el parallax (vanilla, portable a cualquier stack).
- Si quieres smooth scroll, integra Lenis o equivalente, pero mantén un **único** “source of truth” para el rAF.
- Si quieres animaciones complejas, usa GSAP + ScrollTrigger (o alternativas), pero define una capa clara: `motion/` o `parallax.js`.

## 5) Recomendación práctica

Para esta landing (Constructora IPR), el “80/20” suele ser:

- Receta A (parallax por `data-parallax`) + Receta B (sticky en hero)
- 1–2 micro‑interacciones (hover en botón / underline animado)
- sin sliders pesados salvo que “Proyectos” realmente lo requiera

