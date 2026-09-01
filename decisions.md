# Journal de décisions (ADR)

Format court : contexte → décision → conséquences. Numérotation stable ; on n'édite
pas une décision passée, on en ajoute une qui la remplace.

---

## ADR-001 — Astro 7 en sortie statique, pas de HTML/CSS/JS pur à la main
- **Contexte** : page unique, contenu piloté par données (tracks, album, presse), exigences SEO/lighthouse, maintenabilité pour un non-développeur.
- **Décision** : Astro (composants .astro, TypeScript strict, bundling Vite, intégrations sitemap/RSS). « Astro est plus vite que du vanilla bien fait ici » : templating typé, CSS scopé, assets hashés, sans runtime JS.
- **Conséquences** : build Node requis ; l'hébergement reste 100 % statique (aucune complexité d'exploitation en plus).

## ADR-002 — Page unique à sections ancrées (au lieu de 4 pages WP)
- **Contexte** : l'ancienne site = Accueil + Spectacles + Presse + À propos. Le client veut une page unique.
- **Décision** : une page `/` + sections `#biographie #ecouter #album #spectacles #presse #aquarel #questions #contact`, header sticky, ancres avec `scroll-padding-top`, lien actif via IntersectionObserver.
- **Conséquences** : un seul document à crawler — excellent pour le Lighthouse mobile ; les anciennes URLs (`/spectacles/`, `/presse/`, `/a-propos/`) devront rediriger (`.htaccess`/`_redirects`) vers `/#section` — voir T013 (backlog de mise en ligne).

## ADR-003 — Thème jour/nuit SANS bouton, `prefers-color-scheme` uniquement
- **Contexte** : demande explicite du client (« tout automatique suivant le thème de l'ordinateur/téléphone »).
- **Décision** : deux palettes de tokens CSS, bascule media query `prefers-color-scheme: dark` seule. `color-scheme: light dark` + double `theme-color` média. Images de fond du hero chargées par CSS *dans la media query* → le navigateur ne télécharge que l'image du thème actif.
- **Conséquences** : aucun flash, aucun script, aucun stockage local — zéro dette. Le contraste des deux thèmes est vérifié par `scripts/wcag-check.mjs` (16 paires), pas « à l'œil ».

## ADR-004 — Médias chaudement référencés à la source + script de miroir
- **Contexte** : les 21 médias originaux (10 MP3, 5 photos, 6 scans presse/pochettes) vivent sur `frederique-sur-mer.fr/wp-content/uploads/`. Le bac à sable de dev ne peut pas joindre ce serveur (firewall), mais le navigateur du public, oui.
- **Décision** : URL absolue centralisée dans `site/src/data/media.ts` (`MEDIA_BASE` + `media()`), `preconnect` au host, et `scripts/mirror-assets.sh` (à lancer côté client) pour rapatrier les fichiers dans `public/media/` puis basculer `MEDIA_BASE='/media'`.
- **Conséquences** : le site est fonctionnel immédiatement sans attendre le rapatriement, et l'autonomie vis-à-vis du vieux WordPress est une bascule d'**une ligne**. Risque assumé documenté (si l'artiste coupe l'ancien site AVANT le miroir, les médias manquent).

## ADR-005 — Polices auto-hébergées via Fontsource (pas de Google Fonts)
- **Contexte** : ePrivacy/CNIL (site français, artiste = citoyens européens), Lighthouse best-practices, résilience.
- **Décision** : `@fontsource-variable/fraunces` (titrage) + `@fontsource/work-sans` (texte), woff2 avec `unicode-range`, bundlés par Vite (hash longs-lived). Subsets `standard` de Fraunces (axes wght/opsz utiles uniquement).
- **Conséquences** : +130 Ko d'assets mais **0 requête tierce, 0 traceur** ; fichiers non téléchargés si non utilisés (vietnamien, latin-ext…).

## ADR-006 — Contenu en modules TypeScript typés (pas de collections Markdown)
- **Contexte** : l'éditorial est petit et factuel (10 tracks, 12 pistes d'album, 11 coupures de presse) ; éditeur = l'entourage de l'artiste, pas une rédaction.
- **Décision** : `src/data/*.ts` avec interfaces + commentaires sourcés ; `docs/CONTENU.md` explique chaque champ. Les collections Markdown (Content Layer) restent la porte de sortie si un jour il faut un vrai blog.
- **Conséquences** : zéro dépendance à un CMS, typage `astro check`, mais l'édition passe par un fichier texte (acceptable pour ce périmètre).

## ADR-007 — Lecteur audio maison en amélioration progressive (pas de `<audio>` brut, pas de lib)
- **Contexte** : l'ancienne site empilait 6 lecteurs WP natifs ; le nouveau doit pouvoir offrir playlist + barre flottante + MediaSession (lockscreen mobile).
- **Décision** : markup = liste de pistes, chacune contenant un `<audio controls>` **fonctionnel sans JS** ; un module vanilla de ~4 Ko remplace l'expérience quand JS est disponible (classe `html-js` posée en inline dans le `<head>` pour éviter tout flash). Les MP3 gardent leurs URLs d'origine (ADR-004).
- **Conséquences** : accessible clavier/lecteurs d'écran par construction (boutons, aria-labels, `aria-pressed`), et la page reste « utilisable » même JS cassé.

## ADR-008 — YouTube en façade « lite » + youtube-nocookie
- **Contexte** : 2 clips intégrés à l'ancienne site. Un iframe YouTube coûte ~500 Ko + traceurs + avis CNIL.
- **Décision** : composant `LiteYouTube` : poster `i.ytimg.com` (lazy, 1 image) + bouton; l'iframe `youtube-nocookie` n'existe qu'après clic explicite.
- **Conséquences** : 0 octet Google au chargement ; meilleur score « best practices » ; lien direct de secours sous le poster.

## ADR-009 — SEO + GEO : graphe JSON-LD d'entités + `llms.txt` + FAQ citable
- **Contexte** : SEO 100 déjà atteint par l'ancienne site ; objectif = ne pas le dégrader et devenir la source citée par les moteurs génératifs (ChatGPT/Perplexity/Qwant).
- **Décision** : `WebSite` + `Person|MusicGroup` + `MusicAlbum` + 10× `MusicRecording` (avec `url` des MP3 = preuves d'écoute) + `FAQPage` en graphe `@graph` cohérent (mêmes @id), robots.txt **ouvrant** explicitement GPTBot/ClaudeBot/PerplexityBot/OAI-SearchBot, `public/llms.txt` synthétique, FAQ en dur dans la page. Sitemap + RSS auto-générés.
- **Conséquences** : si un fait biographique change, il est à corriger en 3 endroits documentés (data → JSON-LD dérivé automatiquement, llms.txt manuel — TODO consigné T012).

## ADR-010 — Étoiles et vagues en pur CSS/SVG, images aquarelle générées
- **Contexte** : thème « la mer le jour, la mer + étoiles la nuit » avec budget réseau serré et préférence pour le léger.
- **Décision** : ciel nocturne = 3 couches de `radial-gradient` répétés + scintillement (zéro image) ; lune = disque CSS ; vagues = deux SVG inline qui dérivent (animation suspendue par reduced-motion). Pour l'émotion picturale : deux fonds « aquarelle de mer » (jour/nuit) **générés par IA**, compression 1600px/≈200 Ko, clin d'œil assumé au projet *Aquarel* — documentés comme décoratifs (`aria-hidden`, jamais vendus comme des photos de l'artiste).
- **Conséquences** : LCP = texte du hero (pas une image) ; la signature visuelle reste 100 % modifiable par tokens.

## ADR-011 — Placeholder assumé pour le PDF « Aquarel »
- **Contexte** : l'ancien pied de page proposait « Télécharger le PDF de souscription Frédérique Aquarel » ; l'URL du fichier n'était pas extractible (crawl Markdown, uploads WP non listables).
- **Décision** : bouton présent, pointant vers l'ancre de l'ancienne site, marqué `⚠️ Placeholder` dans le code + tâche ouverte T011 pour livrer l'URL réelle (ou déposer le PDF dans `public/docs/`).
- **Conséquences** : le client voit un trou béni plutôt qu'un lien cassé improvisé.

## ADR-012 — Pas de formulaire de contact (mailto/tel)
- **Contexte** : booking = deux coordonnées, déjà publiées par l'artiste sur son propre site.
- **Décision** : cartes cliquables `mailto:` + `tel:`, pas de backend, pas de stockage, pas de captcha.
- **Conséquences** : surface d'attaque et conformité = négligeables ; un faux sentiment de friction (le visiteur doit ouvrir son client mail) — acceptable pour une artiste, pas pour un e-commerce.
