# Muhammad Saad Najib — Portfolio

A self-inferring portfolio: the site treats itself like a computer-vision pipeline.
Sections are "layers" (Input → Features → Embedding → Training log → Checkpoint → Output).

## What's inside
- `index.html` – content and structure
- `styles.css` – design system, animations, responsive layout
- `script.js` – boot sequence, live portrait viewfinder (Sobel edges / heatmap / patches / depth lens),
  particle field, reticle cursor, 3D skill sphere, training-curve timeline, ⌘K palette, résumé viewer
- `fonts/` – self-hosted Instrument Serif (the hero name font, SIL OFL)
- `saad.JPG` – portrait (case-sensitive file name!)
- `Muhammad_Saad_Najib_CV.pdf` – résumé (view + download)
- `favicon.svg`, `_headers` (security headers for Cloudflare Pages / Netlify)

No build step, no frameworks, no trackers. Body/mono fonts load from jsDelivr; the name font is self-hosted in `fonts/`.

## Deploy (GitHub Pages)
1. Copy all files into the root of the `personal_portfolio` repository (replace the old ones).
2. Commit & push to `main`.
3. Repo → Settings → Pages → Source: “Deploy from a branch”, branch `main`, folder `/ (root)`.

## Editing content
- Name / roles / intro: `index.html` hero section; role typewriter list in `script.js` (`roles`). Name font: `--font-name` in `styles.css`.
- Projects: `.bento` cards in `index.html`.
- Career timeline: the `epochs` array in `script.js` (chart + log) and the `<ol class="timeline">` list.
- Contact: `#contact` section, the `termLines` array in `script.js`, and the ⌘K palette list.
- Résumé: replace `Muhammad_Saad_Najib_CV.pdf` (keep the file name) and update “updated 2026” text.

## Accessibility & performance
- Motion toggle (⏸ button) + honours `prefers-reduced-motion`.
- Keyboard: `Ctrl/⌘ + K` opens the command palette; `Esc` closes dialogs and menus.
- All effects are canvas/CSS; the heaviest work (edge detection) runs once at load.
- Ambient particle field runs at ~30 fps and is disabled on phones / touch devices; below-the-fold sections use `content-visibility: auto`.
