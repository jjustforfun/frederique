// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Domaine de production — utilisé par le sitemap, le canonical et les URLs absolues.
  site: 'https://frederique-sur-mer.fr',
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      // Page unique ancrée : le sitemap déclare l'URL canonique (+ RSS).
      filter: (page) => !page.includes('/404'),
    }),
  ],
  build: {
    // CSS critique intégré dans le HTML = 0 requête bloquante pour le hero.
    inlineStylesheets: 'auto',
    concurrency: 10,
  },
  compressHTML: true,
  devToolbar: { enabled: false },
  vite: {
    build: {
      assetsInlineLimit: 1024, // petits assets (SVG) inlinés
    },
    server: {
      // Aperçus proxy (bacs à sable, previews éphémères, LAN) : on accepte
      // tout hôte — le serveur ne sert que des fichiers statiques publics.
      allowedHosts: true,
    },
  },
});
