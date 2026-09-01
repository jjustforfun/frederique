# Frédérique — Le Chant de Marins au Féminin
> Refonte 2026 du site officiel [frederique-sur-mer.fr](https://frederique-sur-mer.fr) — d'un WordPress fatigué (fond cyan inclus) vers un site Astro moderne, page unique, thème jour/nuit automatique : **la mer le jour, la mer étoilée la nuit**.

---

## Le projet en bref

| | |
|---|---|
| **Artiste** | Frédérique, « Fred la Rouge » — chanteuse de chants de marins (Bretagne, Irlande, ports du Nord), base La Rochelle |
| **Objectif** | Remplacer l'ancien site (WP 4.5, 2016) sans rien perdre : textes, 10 MP3, photos, pochettes, presse |
| **Format** | **Page unique** à sections (Accueil · Biographie · Écouter · Album · Spectacles · Presse · Aquarel · FAQ · Contact) |
| **Stack** | Astro 7 (statique) + TypeScript strict + CSS moderne (layers, nesting, `color-mix`) + ~5 Ko de JS vanilla |
| **Thème** | `prefers-color-scheme` uniquement — **aucun bouton de thème**, tout suit le système de l'utilisateur |
| **SEO/GEO** | JSON-LD (Person, MusicAlbum, 10 MusicRecording, FAQPage), sitemap, RSS, `llms.txt`, robots ouvert aux IA |
| **Accessibilité** | WCAG 2.2 AA testée par script (`scripts/wcag-check.mjs`, 16/16 paires) |
| **Confiance** | Zéro cookie, zéro traqueur, polices auto-hébergées, YouTube en façade « lite » |

## Démarrage rapide

```bash
cd site
npm install          # dépendances
npm run dev          # http://localhost:4321
npm run build        # génération statique dans site/dist/
npm run check        # astro check (TypeScript strict)
node ../scripts/wcag-check.mjs   # portes de contraste WCAG
```

## Structure du dépôt

```
frederique/
├── AGENTS.md            ← règles de travail pour agents IA (flux de tâches gated)
├── brief.yaml           ← brief client structuré (objectifs, contraintes, KPIs)
├── decisions.md         ← journal de décisions (ADR)
├── tasks.md             ← plan de développement en tâches séquentielles + états
├── README.md            ← ce fichier
├── docs/
│   ├── ARCHITECTURE.md  ← architecture du site et choix techniques
│   ├── DESIGN.md        ← design system : mer de jour / mer de nuit
│   ├── SEO-GEO.md       ← stratégie SEO + GEO (moteurs génératifs)
│   ├── CONTENU.md       ← guide : comment éditer le contenu (sans toucher au code)
│   └── REPRISE-DONNEES.md ← inventaire complet des données crawlées de l'ancienne site
├── scripts/
│   ├── mirror-assets.sh ← rapatrie médias & MP3 de l'ancien WP vers public/media/
│   ├── wcag-check.mjs   ← test de contraste WCAG des tokens
│   └── audit-dist.mjs   ← audit HTML du build (SEO, a11y, JSON-LD)
└── site/                ← projet Astro (le site lui-même)
    ├── astro.config.mjs
    ├── public/          ← favicon, robots.txt, llms.txt, manifest, images locales
    └── src/
        ├── data/        ← TOUTES les données (bio, tracks, album, presse…) en TS typé
        ├── components/  ← sections & lecteur audio
        ├── layouts/     ← Layout.astro (head, méta, JSON-LD)
        ├── pages/       ← index.astro (page unique), 404.astro, rss.xml.ts
        └── styles/      ← global.css (tokens, mer, étoiles, vagues)
```

## Où est l'ancienne donnée ?

Tout le contenu de l'ancienne site a été **relevé intégralement** (crawl du 2026-09-01) et vit dans :

- `docs/REPRISE-DONNEES.md` — inventaire brut (pages, textes, URLs des MP3/images, dates) ;
- `site/src/data/` — la même donnée, typée et exploitable ;
- `site/src/data/media.ts` — les **médias d'origine sont référencés à la source**
  (le host de l'artiste bloque le bac à sable réseau ; le navigateur des visiteurs, lui, y accède).
  En production, lancer `scripts/mirror-assets.sh` puis basculer `MEDIA_BASE` sur `'/media'` :
  le site devient autonome, plus aucune dépendance à l'ancien WordPress.

## Déploiement

`site/dist/` est un dossier 100 % statique : n'importe quel hébergeur (Netlify, Cloudflare
Pages, OVH, Nginx…) convient. Config à conserver :

- `site: 'https://frederique-sur-mer.fr'` dans `astro.config.mjs` (canonicals + sitemap) ;
- HTTP/2 + cache long sur `/_astro/*` (empreintes de contenu) ;
- headers suggérés : `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`.

## Statut

Voir `tasks.md` — T001 → T010 construites et auto-testées ; chaque tâche attend **votre approbation**
avant que la suivante soit déclarée ouverte (règle du workflow : une tâche testée **et approuvée** à la fois).
