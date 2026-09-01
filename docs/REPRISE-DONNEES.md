# Reprise des données — inventaire intégral de l'ancienne site

Crawl réalisé le **2026-09-01** depuis `frederique-sur-mer.fr` (WordPress 4.5.3, dernières
mises à jour visibles datées de nov. 2016). Ce document est **l'archive des sources** :
tout contenu du nouveau site doit pouvoir être rattaché à une ligne d'ici (sinon : 
inventé → interdit par AGENTS.md §2).

## Plan du site d'origine (issu du sitemap + pages 404 testées)

| URL | Titre | État relevé |
|---|---|---|
| `/` | Frédérique, Le Chant de Marin au Féminin | hero, vidéo YouTube, 6 lecteurs audio, logo France Bleu |
| `/spectacles/` | Spectacles | titre « Spectacle musical », 4 extraits MP3, photos P1–P5 |
| `/presse/` | Presse | 11 scans (vinyles, coupures, affiches) |
| `/a-propos/` | À propos | 3 pages de pochette (Vinyl page 1–3) |
| `/contact/`, `/concerts/` | — | 404 (le contact vivait en pied de page global) |

Sitemap : `page-sitemap.xml` ; robots : `User-agent: * / Disallow: /wp-admin/` ;
feed RSS vide (titre « Le Chant de Marins au Féminin », dernière sortie 2016-11-29).

## Textes (reproduits intégralement, dans l'ordre du crawl)

**Accueil — accroche**
> « Bretonne d'origine, Frédérique chante la Mer » — « L'Irlande et La Bretagne..bien sûr ! »

**Accueil — vidéo YouTube** : « Quand je suis parti de La Rochelle Cap Hornier Frédérique
Chants de marins Traditionnel maritime » (chaîne *Fredlarouge*, 3 abonnés ;
`watch?v=c98wxyLXnOk`). Second clip trouvé par recherche : « La Rochelle » (réal.
Éric Citharel, coréal. Frédérique, filmé en Sony NEX) `watch?v=oAriQEOQqfM`.

**Accueil — paragraphes de bio (utilisés sur toutes les pages)**
> « De Paimpol à Douarnenez, en passant par l'Interceltique et la Baltique elle chante
> les marins de Bretagne et d'ailleurs: Amsterdam, Saint-Malo, Brest, Liverpool,
> Rostock, Valparaiso! »
>
> « Fille de Saint-Briac, avec un grand-père cap-hornier, « Fred la Rouge » chante aussi
> les poètes : Gaston Couté, Pierre Mac Orlan, Verlaine, Rimbaud...Léo Ferré.
> Comédienne, elle travaille avec Philippe Adrien, Jean-Pierre Mocky...Chanteuse, avec
> Gilles Servat, Michel Tonnerre, Denez Prigent, Anne Sylvestre. »

**Pied de page (global, capté via extraits de moteur de recherche le 2026-09-01)**
> « Album Irish Ties — Écouter sur Deezer · Acheter sur Amazon · Acheter sur Itunes »
> « Télécharger le PDF de souscription Frédérique Aquarel »
> « Contacts : filledesaintbriac@gmail.com · 06 98 96 19 02 »

## Enregistrements audio (10 MP3 — `wp-content/uploads/`)

| Titre affiché | Fichier | Devenu ici |
|---|---|---|
| Écouter la chanson Amsterdam | `amsterdam_ethno_040516.mp3` | Track « Amsterdam » |
| Écouter la chanson Filles de Saint Briac | `Filles_de_saint_briac_221115.mp3` | « Les Filles de Saint-Briac » |
| Écouter la chanson La Fregate de Paimboeuf | `fregate_master_jo_230315.mp3` | « La Frégate de Paimbœuf » |
| Écouter la chanson An droug hirnez | `An-droug-hirnez_020414.mp3` | « An Droug Hiriez » |
| Écouter la chanson Missing you | `missing_you_master_210214.mp3` | « Missing You » |
| Interview France Bleu (logo `logo-france_bleu_breizh_izel1-1024x1024-300x300.jpg`) | `France-bleue-07-2016-allege.mp3` | Track « Interview — France Bleu Breizh Izel » |
| Les Saintes Maries | `1-Les-Saintes-Maries.mp3` | extrait spectacle, piste 1 |
| Petit Poucet | `2-Petit-Poucet.mp3` | extrait spectacle, piste 2 |
| Ca n'a pas d'importance | `3-Ca-na-pas-dimportance.mp3` | extrait spectacle, piste 3 |
| Ma vigne pousse | `4-Ma-vigne-pousse.mp3` | extrait spectacle, piste 4 |

Les notes entre parenthèses (dates) sont **déduites des noms de fichiers**
(`040516` = 04/05/16, `221115` = 22/11/15, `230315`, `020414`, `210214`) ; « juillet 2016 »
vient du nom `France-bleue-07-2016`.

## Images (11 + 5 photos + 3 pochettes — `wp-content/uploads/`)

- Spectacles : `P1.jpg`…`P5.jpg` (5 photos de scène).
- Pochette : `Vinyl-page-1.jpg` / `Vinyl-page-2.jpg` / `Vinyl-page-3.jpg` (versions
  `-670x1024` etc. servies).
- Presse : `Vinyl-106.jpg`, `Vinyl-Mission-Bretonne-original.jpg`,
  `vinyl-Publico-original.jpg`, `extraits-presse.jpg`, `presse-1.jpg`, `presse-2.jpg`,
  `presse-3.jpg`, `Affiche-Les-Mauves-Cafe-de-Paris.jpg`, `lanfains.jpg`, `article.jpg`,
  `flyer-jardin.jpg`.
- Radio : `logo-france_bleu_breizh_izel1-1024x1024.jpg` (variante 300×300 utilisée).

## Album « Irish Ties » (sources hors site — vérifiées 2026-09-01)

- **Amazon.fr (numérique)** — album 12 titres, 54 min, ℗© **Le Loup du Faubourg**,
  tracklist et durées : `dp/B00249394O` (Fañchig bihan 5:47, What Shall We Do 4:24,
  Song for Irland 3:53, La lettre 4:21, Rare's Hill 3:47, Dirty Old Town 4:52,
  L'équipage 4:10, Stand by Me 4:27, Tri martelod 4:38, Black Is the Color 5:17,
  Limerick 4:25, Moonlight Shadow 4:32).
- **Deezer** — piste « Song for Irland » datée 2003 (`deezer.com/us/track/260939`).
- **Boutique Panier Musique** — CD « Frédérique — Irish Ties », réf. REG15,
  **label Regain, sortie 05/01/2018**, world/traditionnel.

## Projet « Frédérique Aquarel »

Seule trace : le bouton du pied de page « Télécharger le PDF de souscription
Frédérique Aquarel » (l'URL exacte du PDF n'était pas extractible au crawl —
⚠️ placeholder `LINKS.aquarelPdf`, tâche T011). Le nouveau site en fait une section
engagée avec la formulation prudente « album en cours par souscription ».

## Réseaux / échos trouvés

- Chaîne YouTube **Fredlarouge** : `youtube.com/channel/UCm08Xmm_SCnre7moj6eUuYA`.
- Clip « La Rochelle » (2011, YouTube `oAriQEOQqfM`, réal. Éric Citharel).
- Association citée çà et là : répertoire de chants entendus « de Paimpol à Douarnenez »
  (formulation du site lui-même).

## Gaps & décisions associées

| Trou | Traitement |
|---|---|
| URL du PDF Aquarel | placeholder + T011 |
| Dimensions natives des JPG | ratios de réservation 3:2 / 3:4 (le CSS recadre) |
| Dates de concerts | aucune donnée fiable → pas d'agenda (backlog T013+) |
| Facebook/Instagram | non trouvés au crawl → liens absents |
| Biographie longue (naissances, carrière lyrique, etc.) | non publiée sur la source → ne pas extrapoler |
