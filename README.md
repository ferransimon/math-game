# Mates

Juego PWA para practicar sumas, restas y tablas de multiplicar (Next.js, export estático).

- `npm run dev` — desarrollo en http://localhost:3000
- `npm run build` — genera el sitio estático en `out/` (súbelo a cualquier hosting estático: Vercel, Netlify, GitHub Pages…)
- `node scripts/icons.mjs` — regenera los iconos de `public/icons`

Lógica del juego en `lib/` (`questions.ts`, `difficulty.ts`), interfaz en `components/`.
El service worker (`public/sw.js`) solo se registra en producción; sube `CACHE` cuando cambies cómo cachea.
