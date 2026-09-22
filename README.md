# Muhammad Saad Najib — Portfolio

A self-inferring portfolio: the site treats itself like a computer-vision pipeline.
Sections are "layers" (Input → Features → Embedding → Training log → Checkpoint → Output).

Built with **React 18 + Vite**.

## Getting started

```bash
npm install
npm run dev       # local dev server with hot reload
npm run build     # production build → dist/
npm run preview   # serve the production build locally
```

## What's inside
- `index.html` – Vite entry page (meta tags, preloads)
- `src/main.jsx` / `src/App.jsx` – React entry and page composition
- `src/components/` – one component per section: `Boot`, `Ambient`, `Rail`, `Header`, `Hero`,
  `Ticker`, `Work`, `About`, `Experience`, `Resume`, `Contact`, `Footer`, `ResumeViewer`, `CommandPalette`
- `src/lib/effects.js` – boot sequence, live portrait viewfinder (Sobel edges / heatmap / patches / depth lens),
  particle field, reticle cursor, 3D skill sphere, training-curve timeline, ⌘K palette, résumé viewer.
  Runs once from a React `useEffect` after mount.
- `src/styles.css` – design system, animations, responsive layout
- `src/assets/fonts/` – all four fonts, self-hosted latin woff2 (Archivo for the name, Syne, Space Grotesk, JetBrains Mono; SIL OFL)
- `public/saad.webp` + `public/saad.JPG` – portrait, 960×1280 (WebP served first, JPG fallback; case-sensitive file names!)
- `public/Muhammad_Saad_Najib_CV.pdf` – résumé (view + download)
- `public/favicon.svg`, `public/_headers` (security headers for Cloudflare Pages / Netlify)

No trackers, no third-party requests — fonts are self-hosted.

## Deploy

### GitHub Pages (automatic)
`.github/workflows/deploy.yml` builds the site and deploys `dist/` to GitHub Pages on every
push to `main`. If the first run fails on the Pages step, set repo → Settings → Pages →
Source to **GitHub Actions** once.

### Cloudflare Pages / Netlify
Build command `npm run build`, output directory `dist`. The `_headers` file is copied into
the build output automatically.

## Editing content
- Name / roles / intro: `src/components/Hero.jsx`; role typewriter list in `src/lib/effects.js` (`roles`).
  Name font: `--font-name` in `src/styles.css`.
- Projects: the cards in `src/components/Work.jsx`.
- Career timeline: the `epochs` array in `src/lib/effects.js` (chart + log) and the timeline list in
  `src/components/Experience.jsx`.
- Contact: `src/components/Contact.jsx`, the `termLines` array in `src/lib/effects.js`, and the ⌘K palette
  list in `src/components/CommandPalette.jsx`.
- Portrait: replace both `public/saad.webp` and `public/saad.JPG` (keep 3:4, ~960×1280).
- Résumé: replace `public/Muhammad_Saad_Najib_CV.pdf` (keep the file name) and update "updated 2026" text.
- No cache-busting needed any more — Vite hashes built file names.

## Accessibility & performance
- Motion toggle (⏸ button) + honours `prefers-reduced-motion`.
- Keyboard: `Ctrl/⌘ + K` opens the command palette; `Esc` closes dialogs and menus.
- All effects are canvas/CSS; the heaviest work (edge detection) runs once at load.
- Ambient particle field runs at ~30 fps and is disabled on phones / touch devices; below-the-fold sections use `content-visibility: auto`.
