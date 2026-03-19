# Captura “real” de `rh.design` (DOM final + HAR + trace)

Este flujo reemplaza un “MCP de navegador”: ejecuta un navegador real (Playwright) para capturar:
- DOM final (`dom.html`) luego de ejecutar Webflow/JS.
- Lista de recursos cargados (`resources.json`).
- HAR (`network.har`) con requests/responses.
- Trace (`trace.zip`) para inspección visual y timeline.

## Requisitos
- Node.js 18+ instalado.

## Uso (Windows / PowerShell)
1) Instala dependencias (una sola vez):
   - `cd Tools/rh_playwright`
   - `npm install`
   - `npx playwright install chromium`

2) Ejecuta la captura:
   - `node capture.mjs https://www.rh.design/`

3) Resultado
- Se guarda en `Docs/_scrapes/rh.design/playwright/<timestamp>/`

## Abrir el trace
- `npx playwright show-trace Docs/_scrapes/rh.design/playwright/<timestamp>/trace.zip`

