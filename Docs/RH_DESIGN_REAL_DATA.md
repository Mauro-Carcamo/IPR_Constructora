# rh.design — captura “real” (HTML/CSS/JS/motions)

Este proyecto **no copia/pega** el CSS/JS completo de `rh.design` (Webflow) por temas de licencia/copyright.  
Sí hacemos una **captura fiel** (DOM + red + estilos computados) para **medir** tamaños/colores/spacing y **replicar** el comportamiento con nuestra propia implementación (Lenis + GSAP).

## Capturas (Playwright)

Script: `Tools/rh_playwright/capture.mjs`

Ejecutar:

```powershell
cd Tools/rh_playwright
node .\capture.mjs https://www.rh.design/
```

Output (timestamped):

- `Docs/_scrapes/rh.design/playwright/<YYYYMMDD-HHMMSS>/dom.html` (DOM final)
- `Docs/_scrapes/rh.design/playwright/<...>/resources.json` (performance entries)
- `Docs/_scrapes/rh.design/playwright/<...>/computed.json` (estilos computados de selectores clave)
- `Docs/_scrapes/rh.design/playwright/<...>/network.har` (HAR completo, incluye respuestas embebidas)
- `Docs/_scrapes/rh.design/playwright/<...>/trace.zip` (trace Playwright)
- `Docs/_scrapes/rh.design/playwright/<...>/full.png` (screenshot full page)

## Librerías / recursos detectados (desde `resources.json`)

- CSS:
  - `rh-design1.webflow.shared.*.css` (Webflow)
  - `slick.css`
  - `lenis.css`
- JS:
  - `webfont.js`
  - `gsap.min.js`
  - `ScrollTrigger.min.js`
  - `jquery-3.5.1.min...`
  - `webflow.*.js` (Webflow runtime)
  - `lenis.min.js`
  - `slick.min.js`

## Medidas “reales” (viewport 1440×900)

Fuente: `Docs/_scrapes/rh.design/playwright/20260319-002445/computed.json`

- `.section-hero`
  - `background-color`: `rgb(242, 242, 242)` (`#f2f2f2`)
  - `padding`: `240px 0px 64px`
- `.container-1130`
  - `max-width`: `1210px` (contenido 1130 + padding 40/40)
  - `padding`: `0px 40px`
  - `margin-left/right`: `115px` (centrado en 1440)
- `.h1-hero`
  - `font-size`: `64px`
  - `line-height`: `80px`
  - `letter-spacing`: `-2px`
  - `font-weight`: `500`
  - `color`: `rgb(13, 13, 13)` (`#0d0d0d`)
- `.body-base-book._000000-40` (kicker arriba del H1)
  - `font-size`: `16px`
  - `line-height`: `24px`
  - `letter-spacing`: `-0.4px`
  - `color`: `rgba(0, 0, 0, 0.4)`
- `a.button.w-inline-block` (CTA negro del hero)
  - `height`: `48px`
  - `padding`: `14px 27px`
  - `border-radius`: `99px`
  - `background-color`: `rgb(0, 0, 0)`
  - `color`: `rgb(255, 255, 255)`
- `.circle-yellow` (círculo verde del CTA “Get in touch”)
  - `width/height`: `48px`
  - `background-color`: `rgb(181, 249, 0)` (`#b5f900`)
  - `border`: `1px solid rgb(162, 230, 0)` (`#a2e600`)
  - `border-radius`: `100px`

## Aplicación en IPR (lo que se replica)

Implementado principalmente en:

- `Bosquejo_1/ipr-next/src/app/globals.css` (tokens + spacing + tamaños + micro-interactions)
- `Bosquejo_1/ipr-next/src/components/motion/*` (Lenis + GSAP/ScrollTrigger para reveal/parallax)
- `Bosquejo_1/ipr-next/src/components/ui/cursor-follower.tsx` (cursor tipo “Drag me / See more”)

## Pendiente para 1:1 exacto

- Tipografías `Suisseintl` / `"Suisse Intl Book"`: son propietarias. Para quedar idéntico, se requieren los `.woff2` y su licencia; luego se integran con `next/font/local`.
