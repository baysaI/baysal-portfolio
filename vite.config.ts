import { defineConfig } from 'vite';
import { htmlContent } from './build/html-content';

export default defineConfig({
  base: './',
  plugins: [htmlContent()],
  server: { host: true, port: 5173 },
  build: {
    target: 'es2022',
    sourcemap: false,
    assetsInlineLimit: 0,
  },
});
