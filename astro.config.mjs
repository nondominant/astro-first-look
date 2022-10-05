import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "astro/config";
import image from '@astrojs/image';
import tailwind from "@astrojs/tailwind";

const __dirname = path.dirname(fileURLToPath(import.meta.url));



// https://astro.build/config
export default defineConfig({
  // Astro uses this full URL to generate your sitemap and canonical URLs in your final build
  output: "static",
  integrations: [image(), tailwind()],
  vite: {
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src")
      }
    }
  }
});