// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import keystatic from '@keystatic/astro';

// The CMS (/keystatic) only runs in `astro dev`. The built site stays plain static HTML.
const isDev = process.argv.includes('dev');

// https://astro.build/config
export default defineConfig({
  // Dev server only listens on this computer, so the CMS cannot be reached from the network.
  server: { host: '127.0.0.1' },
  integrations: isDev ? [react(), mdx(), keystatic()] : [react(), mdx()],
  vite: {
    plugins: [tailwindcss()]
  }
});