# Imágenes IPR — mapeo de rutas

Este documento registra las rutas de imagen que usa la página para evitar roturas cuando cambian nombres o se reordenan assets.

## Carrusel principal de proyectos

Ubicado en `Bosquejo_1/ipr-next/src/lib/ipr-data.ts` y consumido por `Bosquejo_1/ipr-next/src/components/sections/projects.tsx`.

### The Coffee

- `/imagenes/Ipr_the_coffee_1.jpeg`
- `/imagenes/Ipr_the_coffee_2.jpeg`
- `/imagenes/Ipr_the_coffee_3.jpeg`

### The Coffee — detalle

- `/imagenes/Ipr_the_coffee_4.jpeg`
- `/imagenes/Ipr_the_coffee_5.jpeg`
- `/imagenes/Ipr_the_coffee_6.jpeg`

### Norai

- `/imagenes/Ipr_norai_1.jpeg`
- `/imagenes/Ipr_norai_2.jpeg`
- `/imagenes/Ipr_norai_3.jpeg`

### Norai — back of house

- `/imagenes/Ipr_norai_2.jpeg`
- `/imagenes/Ipr_norai_3.jpeg`

### Cinépolis

- `/imagenes/Ipr_cinepolis_1.jpeg`
- `/imagenes/Ipr_cinepolis_2.jpeg`
- `/imagenes/Ipr_cinepolis_3.jpeg`

### Ejecución en terreno

- `/imagenes/Ipr_cinepolis_4.jpeg`
- `/imagenes/Ipr_cinepolis_3.jpeg`
- `/imagenes/Ipr_cinepolis_2.jpeg`

## Footer carousel

Ubicado en `Bosquejo_1/ipr-next/src/components/sections/footer.tsx`.

Usa únicamente las rutas de origen `Ipr_*`, agrupadas por proyecto:

### The Coffee

- `/imagenes/Ipr_the_coffee_1.jpeg`
- `/imagenes/Ipr_the_coffee_2.jpeg`
- `/imagenes/Ipr_the_coffee_3.jpeg`
- `/imagenes/Ipr_the_coffee_4.jpeg`
- `/imagenes/Ipr_the_coffee_5.jpeg`
- `/imagenes/Ipr_the_coffee_6.jpeg`

### Norai

- `/imagenes/Ipr_norai_1.jpeg`
- `/imagenes/Ipr_norai_2.jpeg`
- `/imagenes/Ipr_norai_3.jpeg`

### Cinépolis

- `/imagenes/Ipr_cinepolis_1.jpeg`
- `/imagenes/Ipr_cinepolis_2.jpeg`
- `/imagenes/Ipr_cinepolis_3.jpeg`
- `/imagenes/Ipr_cinepolis_4.jpeg`

## Regla práctica

- Si una imagen cambia de nombre, primero actualizar la ruta aquí.
- Después actualizar el componente que la consume.
- El footer debe conservar el patrón visual: fotos difuminadas, movimiento continuo y logo centrado.
