# Servicios — “line hover” + imágenes flotantes (estilo referencia)

Esta sección implementa la estética tipo `rh.design` para Servicios: filas anchas que “cambian” de color al hover y muestran imágenes flotantes en desktop.

## Dónde está

- `Bosquejo_1/index.html` (`#servicios`)
- `Bosquejo_1/styles.css` (clases `.service-*` y `.services-view`)
- `Bosquejo_1/main.js` (`initServicesHover()`)

## Cómo editar servicios

En `Bosquejo_1/index.html`, cada servicio es un `<button class="service-line">` con:

- Texto duplicado (front/back) para el efecto de “swap”.
- `data-images="ruta1|ruta2|ruta3"` para las imágenes flotantes (desktop).

Ejemplo:

```html
<button class="service-line" type="button" data-service-line data-images="../imagenes/a.jpg|../imagenes/b.jpg">
  ...
</button>
```

## Ajustes rápidos

- Alto de fila: `Bosquejo_1/styles.css` (`.service-move` y `.service-row`, valor `82px`)
- Velocidad/ritmo de aparición: `Bosquejo_1/main.js` (delay `index * 900`)
- Tamaño máximo de imágenes flotantes: `Bosquejo_1/main.js` (`getMaxWidth()`)

## Accesibilidad

- Si el usuario tiene `prefers-reduced-motion: reduce`, se desactiva el overlay (`.services-view`).
- En mobile no se muestran imágenes flotantes (solo el estilo de lista).

