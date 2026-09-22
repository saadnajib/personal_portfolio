import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Relative base so the built site works at any URL depth
  // (GitHub Pages project path, Cloudflare Pages root, etc.).
  base: './',
  plugins: [react()],
});
