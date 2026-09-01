/**
 * Point d'entrée UNIQUE de toutes les URLs de médias (photos, MP3, pochettes).
 *
 * ─────────────────────────────────────────────────────────────────────────
 * Contexte : les médias d'origine vivent sur l'ancienne installation
 * WordPress de Frédérique (wp-content/uploads/…). Pour ne rien perdre, le
 * nouveau site les référence directement (mêmes fichiers, mêmes octets).
 *
 * ✅ Recommandé en production : exécuter `scripts/mirror-assets.sh` qui
 * télécharge tout dans `site/public/media/` puis basculer MEDIA_BASE sur
 * `''` (chemins relatifs "/media/…"). Le site devient alors 100 % autonome.
 * ─────────────────────────────────────────────────────────────────────────
 */

/** '' = médias servis en local depuis public/media/ (après mirroir). */
export const MEDIA_BASE = 'https://frederique-sur-mer.fr/wp-content/uploads';

/** Construit l'URL absolue d'un fichier média à partir de son nom wp-content/uploads. */
export function media(file: string): string {
  return `${MEDIA_BASE}/${file}`;
}

/** Les médias connus du site (relevés par crawl le 2026-09-01). */
export const MEDIA = {
  // Photographies de scène (page Spectacles)
  scenes: {
    P1: 'P1.jpg',
    P2: 'P2.jpg',
    P3: 'P3.jpg',
    P4: 'P4.jpg',
    P5: 'P5.jpg',
  },
  // Pochette / chantournures du vinyle (page À propos)
  vinylPages: {
    page1: 'Vinyl-page-1-670x1024.jpg',
    page2: 'Vinyl-page-2-661x1024.jpg',
    page3: 'Vinyl-page-3-671x1024.jpg',
  },
  // Presse & affiches (page Presse)
  presse: {
    vinyl106: 'Vinyl-106.jpg',
    missionBretonne: 'Vinyl-Mission-Bretonne-original-567x1024.jpg',
    publico: 'vinyl-Publico-original-548x1024.jpg',
    extraits: 'extraits-presse.jpg',
    presse1: 'presse-1.jpg',
    presse2: 'presse-2.jpg',
    presse3: 'presse-3.jpg',
    afficheMauves: 'Affiche-Les-Mauves-Cafe-de-Paris.jpg',
    lanfains: 'lanfains.jpg',
    article: 'article.jpg',
    flyerJardin: 'flyer-jardin.jpg',
    franceBleuLogo: 'logo-france_bleu_breizh_izel1-1024x1024-300x300.jpg',
  },
} as const;
