import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://axios.psgtech.ac.in',
  output: 'static',
  build: {
    format: 'file',
    inlineStylesheets: 'auto'
  },
  compressHTML: true
});
