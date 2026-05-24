import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://summit-ia-tucuman.stannum.workers.dev',
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
});
