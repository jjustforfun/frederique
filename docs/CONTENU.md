# Contenu — guide d'édition (pour l'artiste et son entourage)

Tout le texte et toutes les données du site vivent dans **5 fichiers simples** :
`site/src/data/`. Vous n'avez jamais besoin de toucher aux composants.

> Chaque fichier est commenté en français ; les champs importants sont typés, donc
> une faute de structure est détectée à la compilation (`npm run check`).

## Ajouter / modifier un enregistrement audio → `tracks.ts`

Dans `TRACKS`, copiez un bloc existant :

```ts
{
  id: 'nouvelle-piste',          // identifiant unique (sans espaces)
  title: 'Titre du chant',
  file: 'nom-du-mp3.mp3',        // nom du fichier dans wp-content/uploads/
  note: 'contexte, année',       // ligne secondaire affichée sous le titre
  kind: 'chant',                 // 'chant' | 'interview'
},
```

⚠️ `file` accepte un **nom de fichier** de l'ancienne site. Pour un média inédit :
déposez le fichier dans `site/public/media/` (après T012, quand le miroir local est en
place) et écrivez `file: 'monfichier.mp3'`. Tant que le miroir n'est pas fait, les
nouveaux médias doivent être téléversés dans `wp-content/uploads/` de l'ancienne site.

## Modifier la biographie, les liens, les coordonnées → `site.ts`

- `BIO.lead` / `BIO.paragraphs` — le texte de la section Biographie.
- `BIO.ports` — la rangée de badges « Paimpol, Douarnenez… ».
- `SITE.email` / `SITE.phone` / `SITE.phonePretty` — contact (le `tel:` est lisible partout).
- `LINKS` — Deezer, Amazon, CD, YouTube, **PDF Aquarel** (`aquarelPdf` : ⚠️ placeholder
  tant que l'URL réelle n'est pas renseignée — tâche T011).

## Album : tracklist, durée, notes → `tracks.ts` (objet `ALBUM`)

Liste de `tracks: [{ n, title, duration }]` — l'ordre d'affichage est celui du fichier.

## Presse & photos de scène → `press.ts`

`PRESS` (scans presse, pochettes) et `SHOW_PHOTOS` (P1–P5) : chaque entrée = `src`
(nom de fichier via `media()`), `alt` (description honnête pour lecteurs d'écran —
**obligatoire**), `caption` (visible sous l'image), dimensions `width/height`
(le ratio de réservation ; le CSS recadre).

## FAQ (questions citables par les IA) → `faq.ts`

Une entrée = une question qui **nomme l'artiste dans la réponse**, une réponse
autoportante de 1 à 3 phrases. Elle alimente à la fois la section visible et le
JSON-LD `FAQPage`.

## Images du thème (aquarelles hero, OG) → `site/public/img/`

`mer-jour.jpg`, `mer-nuit.jpg` (1600 px de large, JPEG progressif, ~200 Ko),
`couverture-og.jpg` (1200×630, vue d'ensemble des réseaux sociaux — la modifier
change l'aperçu au partage), `apple-touch-icon.png`, `favicon.svg`.

## Médias : l'interrupteur propre

`src/data/media.ts` : `MEDIA_BASE` = base de toutes les URLs de médias.
- Tant que `MEDIA_BASE = 'https://frederique-sur-mer.fr/wp-content/uploads'` → le site
  lit les fichiers **sur l'ancienne site**.
- Après `scripts/mirror-assets.sh` et le dépôt de `public/media/` → mettez `MEDIA_BASE = '/media'`.
  Un seul changement, tout bascule.

## Checklist avant d'envoyer une modif

```bash
cd site
npm run check          # typage : 0 erreur
npm run build          # build + sitemap + RSS
node ../scripts/wcag-check.mjs   # si vous avez changé des couleurs
```

Puis relire les deux thèmes (basculer le mode sombre de l'OS) : le site suit votre
ordinateur **automatiquement**, c'est voulu — n'ajoutez jamais de bouton de thème.
