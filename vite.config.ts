import { defineConfig } from 'vite';
import { htmlContent } from './build/html-content';

export default defineConfig({
  // Relative base keeps the build portable (GitHub Pages sub-paths, any static host).
  base: './',
  plugins: [htmlContent()],
  server: { host: true, port: 5173 },
  build: {
    target: 'es2022',
    sourcemap: false,
    assetsInlineLimit: 0,
  },
});
