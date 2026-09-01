# Architecture du site

## Vue d'ensemble

Statique pur : le dépôt contient **un projet Astro** (`site/`) qui génère `site/dist/`
(page unique + 404 + RSS + sitemap + assets), des **données typées** (`site/src/data/`)
comme seule source de contenu, et une **gouvernance** (brief, tâches, décisions, docs)
à la racine.

```
navigateur ──> CDN/hébergeur statique ──> dist/
                 │
                 ├── index.html (HTML sémantique, CSS critique inline auto)
                 ├── _astro/*.css|*.js|*.woff2 (hashés, cache éternel)
                 ├── /sitemap-index.xml /rss.xml /robots.txt /llms.txt /manifest.webmanifest
                 └── médias : soit public/img/* (aquarelles locales),
                              soit https://frederique-sur-mer.fr/wp-content/uploads/*
                              (MP3 + scans d'origine — cf. ADR-004 ; bascule locale T012)
```

## Étage données (`src/data/`) — la seule vérité éditoriale

| Module | Rôle | Consommé par |
|---|---|---|
| `site.ts` | identité, nav, bio, liens externes, vidéos | Header, Hero, BioSection, ContactSection, Layout (JSON-LD) |
| `tracks.ts` | 10 pistes audio + album Irish Ties + Aquarel | AudioPlaylist, AlbumSection, Layout (MusicRecording/MusicAlbum), rss |
| `press.ts` | galerie presse + photos de scène | PresseSection, SpectaclesSection |
| `faq.ts` | 5 questions/réponses GEO | FaqSection, Layout (FAQPage JSON-LD) |
| `media.ts` | **unique** lieu des URLs média (`MEDIA_BASE`) | tracks, press (donc tout) |

Règle : un composant ne contient **aucune donnée factuelle**. Changer un fait =
modifier `src/data/…` (et `docs/REPRISE-DONNEES.md` qui cite la source).

## Étage présentation (`src/`)

- `layouts/Layout.astro` — `<head>` complet (méta, OG, double theme-color, JSON-LD graphe,
  préconnexions), imports polices Fontsource, skip-link, footer. **Tout le SEO centralisé ici.**
- `components/` — une section = un composant : `Header`, `Hero`, `BioSection`,
  `AudioPlaylist` (seul composant avec état interactif), `LiteYouTube`, `AlbumSection`,
  `SpectaclesSection`, `PresseSection`, `AquarelSection`, `FaqSection`, `ContactSection`.
  Styles scopés dans chaque composant ; tokens globaux uniquement depuis `styles/global.css`.
- `pages/index.astro` — l'ordre des sections (la « page unique »).
- `pages/404.astro`, `pages/rss.xml.ts` (route de build, génère `/rss.xml`).

## JS livré (volontairement minuscule)

1. `AudioPlaylist` : module vanilla (~4 Ko) — dock de lecture, playlist, MediaSession.
   Amélioration progressive : markup `<audio controls>` fonctionnel sans JS (classe
   `html-js` posée par une ligne inline dans le `<head>`).
2. `Header` : IntersectionObserver (aria-current sur la section visible).
3. `LiteYouTube` : écouteur de clic → injection d'iframe nocookie.
Pas de framework, pas de hydration, pas de runtime Astro JS.

## CSS

`styles/global.css` : tokens `:root` (jour) + `@media (prefers-color-scheme: dark)`
(nuit), `@layer base/layout/components/utilities`, décor mer (vagues SVG inline,
étoiles multi-radial-gradient, lune, reflet). Les sections pleine mer (album, contact,
hero) se peignent avec les tokens `--sea*`. Build Astro : `inlineStylesheets: 'auto'`
= CSS de layout dans le HTML → pas de requête bloquante.

## Pipeline & qualité

`npm run build` (Astro 7 / Vite+Rolldown) puis, gates de CI locaux :
`astro check` (TS strict), `scripts/wcag-check.mjs` (contrastes des paires réelles),
`scripts/audit-dist.mjs` (SEO/a11y/structure du HTML), `scripts/bundle-size.mjs` (budgets).
`scripts/mirror-assets.sh` (côté client) bascule les médias en local → T012.

## Choix structurants (raccourci vers ADR)

Astro statique (001) · page unique ancrée (002) · thème 100 % média query (003) ·
médias à la source + miroir (004) · polices auto-hébergées (005) · données TS > collections (006) ·
lecteur progressif (007) · YouTube lite (008) · JSON-LD + llms.txt (009).
