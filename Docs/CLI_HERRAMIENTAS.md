# CLIs / herramientas para el proyecto (IPR)

## Requeridos (recomendado)

- **Node.js** (ya lo tienes): `node -v`
- **npm / npx** (ya lo tienes): `npm -v`, `npx -v`
- **Vercel CLI** (deploy): `vercel --version`

Comandos típicos:

- Dev (Next): `npm run dev`
- Build: `npm run build`
- Start (prod local): `npm run start`
- Preview Vercel local (opcional): `vercel dev`

## Scaffold (Next.js + TS + Tailwind)

- Crear proyecto: `npx create-next-app@latest`
  - Ejemplo usado en este repo: `npx create-next-app@latest ipr-next --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --disable-git --yes`

## Opcional (Vue.js)

Si además necesitas una app separada en Vue (no es necesario para una landing en Next):

- Crear proyecto Vue (Vite): `npm create vue@latest`

## Calidad (opcionales)

- Formato: `prettier`
- Lint extra: `eslint` (ya viene con Next)

## Notas

- Next.js ya incluye React. Si el stack principal es **Next.js**, **Vue.js sería un segundo stack** (recomendación: evitarlo salvo que haya una razón clara).
- Para replicar movimientos tipo `pagina_modelo.md`, este repo usa dependencias front:
  - `lenis` (smooth scroll)
  - `gsap` (micro‑interacciones)
