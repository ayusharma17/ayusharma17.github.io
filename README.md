# Keita-meets-Minimal Portfolio

A bespoke Next.js 15 portfolio for Ayush Sharma blending a custom WebGL/GLSL hero, GSAP-powered interface motion, and case-study driven storytelling.

## Stack

- **Framework:** Next.js 15 (App Router), React 19 RC, TypeScript
- **Styling:** Tailwind CSS + CSS variables, theme toggle with Light and Dark modes
- **Motion:** GSAP timelines for DOM animation while honoring `prefers-reduced-motion`
- **WebGL:** three.js with custom vertex/fragment shaders and a dev-only tuner panel (`?dev=1`)
- **Content:** Case studies and bio sourced from attached PDFs (`Ayush_Sharma_Resume.pdf`, `Final Project Report (2).pdf`)

## Getting Started

```bash
pnpm install
pnpm dev
```

Or with npm:

```bash
npm install
npm run dev
```

The app starts at `http://localhost:3000`.

## Scripts

- `npm run dev` – start the development server
- `npm run build` – create a production build
- `npm start` – run the production build locally
- `npm run lint` – run Next.js lint rules

## Features

- Dynamic WebGL hero with FBM noise, curl flow, hue shift, and pointer turbulence.
- Dev-only control overlay (`?dev=1`) to tweak shader contrast, intensity, and hue.
- Content architecture for Home / Projects / Case Study / About / Contact / 404.
- Theme toggle with persistence across Light and Dark modes.
- Contact page with direct email, GitHub, and LinkedIn links.
- Metadata, robots, and sitemap for SEO hygiene.

## Customization

- Update project metadata in `lib/projects.ts` – each entry drives the Projects listing and Case Study template.
- Tune theme palettes and typography tokens in `app/globals.css`.
- Adjust shader uniforms or noise logic in `webgl/shader.frag`.

## License

This project is bespoke for Ayush Sharma. Do not reuse the code or shader without permission.
