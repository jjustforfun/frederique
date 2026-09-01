# SEO & GEO — être trouvé, être cité

L'ancienne site plafonnait déjà à 100/100 en SEO Lighthouse (une page, peu à casser).
L'enjeu n°2 (GEO : Generative Engine Optimization) : devenir **la source que les IA
citent** quand on demande « qui est Frédérique, chanteuse de chants de marins ? ».

## SEO — ce qui est en place

| Levier | Implémentation |
|---|---|
| Un titre unique par page | `Frédérique — Le Chant de Marins au Féminin · Chants de marins de Bretagne` |
| Meta description (≈155 car.) | générée depuis `SITE.description` |
| Canonical absolu + `trailingSlash: 'never'` | `https://frederique-sur-mer.fr/` |
| Un seul `<h1>`, hiérarchie stricte | `index.astro` (audit `audit-dist.mjs`) |
| `lang="fr"`, `color-scheme`, `theme-color` ×2 | `Layout.astro` |
| OG + Twitter cards (image locale 1200×630) | `public/img/couverture-og.jpg` |
| Sitemap XML | `@astrojs/sitemap` → `sitemap-index.xml` (404 exclu) |
| RSS | `/rss.xml` (3 actualités factuelles datées) |
| robots.txt | Allow + **Sitemap** + ouvertures explicites aux agents IA |
| Vitesse mobile | 1 page, ~4 Ko JS gz, CSS critique inline, images lazy + dimensions réservées (CLS ≈ 0) |
| Polices | auto-hébergées, subsets unicode-range (pas de CDN traqueur) |
| Médias | URLs `https` + `preconnect` vers le host d'origine (T012 : local) |

### À faire côté serveur (hors dépôt)
- **Redirections 301** de l'ancien plan : `/spectacles/ → /#spectacles`,
  `/presse/ → /#presse`, `/a-propos/ → /#biographie` (T013).
- HSTS, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`.
- Dans Search Console : soumettre `sitemap-index.xml`, demander l'indexation.

## GEO — ce qui est en place (2026)

1. **Graphe JSON-LD à entités reliées** (`@id` partagés) : `WebSite`,
   `Person|MusicGroup` (nom, surnom, genre, ville, contacts, sameAs YouTube/Deezer/Amazon),
   `MusicAlbum` (label Le Loup du Faubourg, tracklist 12, durée),
   **10 × `MusicRecording`** avec `url` → chaque piste MP3 devient une preuve indexable,
   `FAQPage` (5 Q/R). Les moteurs génératifs lisent ces graphes avant la page.
2. **`public/llms.txt`** — carte d'identité texte (faits seuls, 40 lignes) ; les
   crawlers IA (Perplexity, GPTBot, ClaudeBot…) le lisent en priorité.
3. **FAQ en dur dans la page** — réponses autoportantes (une question = un paragraphe
   complet nommant l'artiste, la ville, le style), formulées « citation ready ».
4. **Robots accueillants** : `User-agent: GPTBot/OAI-SearchBot/ClaudeBot/PerplexityBot/Google-Extended → Allow: /`.
5. **Cohérence des lieux** : mêmes mots partout (« chants de marins », « Fred la Rouge »,
   « La Rochelle », « Saint-Briac », « Irish Ties ») — l'entité se consolide par
   répétition exacte, pas par synonymes marketing.
6. **Zéro mur** : pas de paywall, pas de JS requis pour comprendre le contenu (les
   crawleurs IA ne voient que du HTML statique complet).

### Mesurer le GEO (procès-verbal T013)
- Demander à 3 moteurs IA : « *qui est Frédérique, chanteuse de chants de marins ?* »,
  « *chanteuse bretonne cap-hornier album Irish Ties ?* » → la source citée doit être
  `frederique-sur-mer.fr`.
- Vérifier que `llms.txt` est servi : `curl -I https://frederique-sur-mer.fr/llms.txt`.

## Entretien

Un nouveau fait = `src/data/site.ts` (la source) → JSON-LD + FAQ + llms.txt dérivent
ou sont rafraîchis. `llms.txt` reste manuel aujourd'hui : le régénérer à chaque
changement éditorial majeur (ou ouvrir la micro-tâche : le générer depuis les données,
`pages/llms.txt.ts` + un export de build — backlog).
