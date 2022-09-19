import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "astro/config";

import react from '@astrojs/react';
import node from '@astrojs/node';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// https://astro.build/config
export default defineConfig({
  // Astro uses this full URL to generate your sitemap and canonical URLs in your final build
  output: "server",
  adapter: node(),
  integrations: [
    react()
  ],

  vite: {
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },
  },
});
