# AGENTS.md — Règles de travail pour agents IA (et humains)

Ce dépôt suit un **développement par tâches strictement séquentielles**.
Lire ce fichier **en entier** avant toute modification.

## 1. La règle d'or : une tâche à la fois, testée ET approuvée

1. Le plan vit dans [`tasks.md`](./tasks.md). Chaque tâche possède : *Objectif*,
   *Livrables*, *Test*, *Approbation*.
2. **Interdiction** de commencer T(n+1) tant que T(n) n'est pas :
   - `✅ testée` — la commande de test de la tâche passe (sortie 0) ;
   - `✔ approuvée` — le client (ou son mandataire) a donné un accord explicite
     (message « OK T00x » consigné dans `tasks.md`).
3. Une tâche qui régresse repasse `🔧 en cours`. On ne « débloque » jamais une
   tâche en éditant ses critères de test pour les rendre vrais.

## 2. Sources de vérité

| Sujet | Fichier |
|---|---|
| Brief, contraintes, KPIs | `brief.yaml` |
| Pourquoi ces choix (ADR) | `decisions.md` |
| État d'avancement | `tasks.md` (seul fichier de données d'état) |
| Contenu de l'artiste | `docs/REPRISE-DONNEES.md` + `site/src/data/*` |
| Design system | `docs/DESIGN.md` + `site/src/styles/global.css` |

**Règle de contenu** : ne jamais inventer de fait biographique, de date, de
collaboration ou de lien. Tout ajout éditorial doit être sourcé dans
`docs/REPRISE-DONNEES.md` (crawl ou recherche vérifiée). En cas d'incertitude :
placeholder explicite `⚠️ Placeholder` + tâche ouverte.

## 3. Commandes (depuis `site/`)

```bash
npm run dev       # serveur de dev (port 4321)
npm run build     # build statique → dist/
npm run check     # astro check — doit finir : 0 error, 0 warning
node ../scripts/wcag-check.mjs   # contrastes WCAG AA — doit sortir 0
node ../scripts/audit-dist.mjs dist/index.html  # audit HTML du build — tout au ✔
bash ../scripts/mirror-assets.sh # (une fois, côté client) rapatrie les médias
```

Chaque tâche liste LA commande de test qui la valide ; elles se recoupent avec
celles ci-dessus.

## 4. Conventions de code

- **Astro 7, output statique**. Composants `.astro` par section ; aucune framework UI.
- TypeScript `strict` ; les données vivent dans `site/src/data/*.ts` (typées, commentées,
  sources citées) — **pas de contenu en dur dans les composants**.
- CSS : un seul `global.css` (tokens + décor mer/étoiles) + `<style>` scopés par
  composant. Utiliser les tokens (`var(--*)`), jamais de couleurs littérales hors `:root`.
  `@layer base, layout, components, utilities`.
- **JS minimal** : vanilla, `document.currentScript`-free, bundled par Astro.
  Amélioration progressive obligatoire : toute interaction doit avoir un repli
  fonctionnel sans JS (ex. lecteur `<audio controls>` natif).
- Thème **automatiquement** jour/nuit via `prefers-color-scheme` — **aucun toggle,
  aucun attribut data-theme piloté par JS** (demande explicite du client, cf. brief).
- `prefers-reduced-motion` respecté partout (le CSS global le neutralise déjà ; ne pas
  forcer une animation en JS).
- Images : `alt` en français, honnête, jamais décoratif-mensonger ; `width`/`height`
  ou `aspect-ratio` pour éviter le CLS ; `loading="lazy"` sauf LCP du hero.
- Pas de trackers, pas de polices par CDN (tout auto-hébergé via Fontsource),
  YouTube via façade lite (nocookie). Conformité RGPD=e-Privacy par conception.
- Commits : `type(scope): sujet` en français court (`feat(hero): …`, `fix(joueur): …`).
  Une commit = une tâche (ou un fragment nommé). Ne jamais committer `node_modules/`,
  `site/dist/`, `site/.astro/`.

## 5. Definition of Done (par tâche)

- [ ] Livrables présents et cohérents avec `brief.yaml`.
- [ ] `npm run check` : 0 error / 0 warning (hint toléré s'il est justifié en commentaire).
- [ ] `npm run build` : succès, taille HTML + JS + CSS critique dans les budgets de `brief.yaml`.
- [ ] `wcag-check.mjs` et `audit-dist.mjs` : tout au ✔.
- [ ] Vérification manuelle jour ET nuit (forcer le thème de l'OS ou l'émulation DevTools)
      ET reduced-motion.
- [ ] Ligne de statut de `tasks.md` mise à jour (✅ testée, approbation en attente/obtenue).
- [ ] Décision non triviale → nouvelle entrée dans `decisions.md`.

## 6. Lighthouse (KPI client : performance ≥ 95, SEO ≥ 95, a11y ≥ 95, best practices ≥ 95)

Le bac à sable ne peut pas faire tourner Chrome + Lighthouse (pas d'accès réseau complet
vers les hôtes distants et pas de binaire). À l'approbation de chaque tâche, le client
lance :

```bash
cd site && npx --yes lighthouse http://localhost:4321 \
  --only-categories=performance,seo,accessibility,best-practices \
  --form-factor=mobile --throttling-method=simulated --output=html --open
```

Le budget de base est déjà respecté par construction (page unique, ~20 Ko de JS,
CSS inline auto, zéro traqueur) ; les médias hotlinés sont le seul écart — le miroir
local (T012) le ferme.

## 7. Limites du bac à sable (à connaître)

- Le réseau sortant joint l'infrastructure npm mais **pas** le serveur de l'artiste
  (firewall OVH/IP datacenter). D'où : médias référencés à la source + script de
  miroir côté client. Ne pas « corriger » en durcissant des chemins locaux sans miroir.
- Les previews utilisateur chargent, elles, réellement les médias (navigateur du client).
- Le serveur de dev doit garder `vite.server.allowedHosts: true` pour l'aperçu proxy.

## 8. Langue

Tout ce qui est visible (contenu, commits, docs du dépôt) est en **français**.
Commentaires de code : français preferred, anglais toléré pour les termes techniques.
