# tasks.md — Plan de développement séquencé

**Règle (cf. AGENTS.md §1)** : T(n+1) ne s'ouvre que quand T(n) est
`✅ testée` **ET** `✔ approuvée`. États : `🔒 verrouillée` → `🔧 en cours` →
`✅ testée (en attente d'approbation)` → `✔ approuvée`.

Légende tests : chaque ligne *Test* indique la commande à faire passer (depuis `site/`
sauf mention contraire) et le résultat attendu.

---

## T000 — Cadrage & relevé des données
- **Objectif** : comprendre l'artiste, crawler l'ancienne site intégralement, décider la stack.
- **Livrables** : `docs/REPRISE-DONNEES.md` (inventaire), `brief.yaml`, `decisions.md` (ADR-001..012).
- **Test** : les 4 pages crawlées (accueil, /spectacles/, /presse/, /a-propos/) + sitemap + robots + feed sont inventoriées ; chaque média/MP3 du WP a une ligne ; aucune info éditoriale inventée.
- **Approbation** : ✔ **approuvée** (merge de la PR #1, 2026-09-01).

## T001 — Squelette projet Astro & config
- **Objectif** : `site/` Astro 7 statique, TS strict, sitemap, RSS, config `site`.
- **Livrables** : `package.json`, `astro.config.mjs`, `tsconfig.json`, intégrations installées.
- **Test** : `npm run build` sort 0 erreur ; `dist/sitemap-index.xml` existe.
- **Approbation** : ✔ approuvée (PR #1) · ✅ testée (2026-09-01, build OK).

## T002 — Données de l'artiste typées
- **Objectif** : tout le contenu repris de T000 dans `src/data/` (SITE, BIO, NAV, LINKS, VIDEOS, TRACKS, ALBUM, PRESS, SHOW_PHOTOS, FAQ, media).
- **Livrables** : 5 modules + `docs/CONTENU.md`.
- **Test** : `npm run check` → 0 error 0 warning (les hints Astro commentés sont autorisés).
- **Approbation** : ✔ approuvée (PR #1) · ✅ testée.

## T003 — Design system « mer jour / mer nuit »
- **Objectif** : tokens, palettes, typo Fontsource, décor CSS (vagues, étoiles, lune), aquarelles hero générées.
- **Livrables** : `src/styles/global.css`, `public/img/*`, imports polices dans le Layout.
- **Test** : `node ../scripts/wcag-check.mjs` → 16/16 ✔ exit 0 ; les 4 images livrées < 300 Ko.
- **Approbation** : ✔ approuvée (PR #1) · ✅ testée.

## T004 — Layout & SEO/GEO de base
- **Objectif** : `Layout.astro` (head complet, thème-color double, canonical, OG/Twitter, JSON-LD graphe, skip-link, footer), `404.astro`, `rss.xml.ts`, `public/robots.txt`, `llms.txt`, `favicon.svg`, `manifest.webmanifest`.
- **Test** : `node ../scripts/audit-dist.mjs dist/index.html` → tout au ✔ (dont « JSON-LD parse valide », « FAQPage présente », theme-color ×2).
- **Approbation** : ✔ approuvée (PR #1) · ✅ testée.

## T005 — Header responsive + navigation ancrée
- **Objectif** : en-tête sticky, nav desktop, **menu hamburger** mobile (<details> natif, sans JS), section active (IntersectionObserver, `aria-current`).
- **Test** : `audit-dist.mjs` (landmarks header/nav/main) ; vérif manuelle mobile 390 px : menu ouvre/ferme, ancre visible sous le header.
- **Approbation** : ✔ approuvée (PR #1) · ✅ testée (à confirmer à l'œil sur la preview).

## T006 — Sections Accueil & Biographie
- **Objectif** : hero (panneau écume, mer + étoiles, CTA) + bio (texte d'origine intégral, ports-chips, 2 clips en façade lite).
- **Test** : les 3 paragraphes de bio sont identiques mot pour mot au relevé T000 ; façade YouTube = 0 iframe au chargement.
- **Approbation** : ✔ approuvée (PR #1) · ✅ testée.

## T007 — Section « Écouter » : lecteur playlist
- **Objectif** : liste des 10 pistes (MP3 d'origine), amélioration progressive (audio natif sans JS), dock flottant (play/pause, prev/next, seek, MediaSession).
- **Test** : `audit-dist.mjs` ; sans JS (désactivé) les 10 `<audio controls>` fonctionnent ; avec JS : dock unique, aria-pressed synchronisé ; `node ../scripts/bundle-size.mjs` : JS total < 8 Ko gz.
- **Approbation** : ✔ approuvée (PR #1) · ✅ testée (à confirmer en écoutant 1 piste sur la preview).

## T008 — Sections Album, Spectacles, Presse
- **Objectif** : album Irish Ties (pochette scannée, 12 titres + durées, liens Deezer/Amazon/CD), frise de 5 photos de scène, galerie de 11 pièces de presse (liens pleins écrans).
- **Test** : tracklist = source Amazon/Deezer citée dans REPRISE-DONNEES.md ; toutes les `<img>` ont alt + width/height (audit).
- **Approbation** : ✔ approuvée (PR #1) · ✅ testée.

## T009 — Sections Aquarel, FAQ, Contact (+ placeholders documentés)
- **Objectif** : encart projet « Frédérique Aquarel » (bouton PDF ⚠️ placeholder), FAQ GEO en accordéons natifs, contact mailto/tel/YouTube.
- **Test** : chaque `<details>` FAQ a un summary nommable au clavier ; le PDF placeholder est marqué `⚠️` dans le code **et** ce fichier (T011).
- **Approbation** : ✔ approuvée (PR #1) · ✅ testée.

## T010 — Assemblage, QA complète, build de production
- **Objectif** : page unique finale, budgets respectés, zéro régression.
- **Test** : `npm run build` 2 pages ; `wcag-check` 16/16 ; `audit-dist` tout ✔ ; poids total _astro CSS+JS < 60 Ko ; aucune requête tierce hors médias de l'artiste + i.ytimg.com (poster).
- **Approbation** : ✔ **approuvée** par le merge de la PR #1 (2026-09-01) ; Lighthouse à rejouer sur l'hébergement final (T013).

---
## Tâches d'ouverture (après approbation de T010)

## T011 — PDF « souscription Aquarel » (⚠️ bloquant pour le client)
- Fournir l'URL réelle du PDF (ou le fichier) → remplacer `LINKS.aquarelPdf` (placeholder T009).
- **Test** : le bouton ouvre le PDF ; `npm run build` OK.

## T012 — Rapatriement médias & autonomie complète
- Lancer `scripts/mirror-assets.sh` sur une connexion normale, basculer `MEDIA_BASE='/media'` dans `site/src/data/media.ts`, régénérer `llms.txt` si des URLs changent.
- **Test** : `grep -r "frederique-sur-mer.fr/wp-content" site/dist | wc -l` = 0 dans les médias locaux ; `du -sh site/public/media` ; le site fonctionne sans le vieux WP (simuler via hosts).

## T013 — Mise en ligne & redirections
- Déployer `dist/` sur le mutualisé (remplacer WordPress), redirections 301 `/spectacles/ → /#spectacles`, `/presse/ → /#presse`, `/a-propos/ → /#biographie`, désindexer le WP restant.
- **Test** : Lighthouse mobile ≥ 95 sur les 4 catégories ; Search Console + score GEO (test manuel : demander à 2–3 moteurs IA « qui est Frédérique chanteuse de chants de marins » et vérifier la citation).

## Backlog (non séquentiel, après T013)
- [ ] Agenda/billetterie (collection Markdown + schema.org/Event) dès que les dates tombent.
- [ ] Page `en/` (le répertoire est bilingue) avec hreflang — ouvrir une ADR.
- [ ] Test visuel automatisé Playwright (jour/nuit, reduced-motion) en CI.
- [ ] Passer la tracklist en `hasPart`/`MusicComposition` si Deezer expose des ISRC.

---

### Journal des approbations
| Date | Tâche | Verdict | Par |
|---|---|---|---|
| 2026-09-01 | T000→T010 | tests auto au vert, présentation en preview | agent |
| 2026-09-01 | T000→T010 | ✔ **approuvées** (merge PR #1 → `main` @ `37812f1`) | client |
