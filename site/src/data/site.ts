/**
 * Identité du site : textes, liens et coordonnées repris mot pour mot du
 * site d'origine (frederique-sur-mer.fr, crawlé le 2026-09-01) et enrichis
 * de faits vérifiables (label, distribution, tracklist — sources citées).
 * Les sources de l'ancien WordPress sont des liens absolus (cf. docs/REPRISE-DONNEES.md).
 */

export const SITE = {
  name: 'Frédérique',
  tagline: 'Le Chant de Marins au Féminin',
  nickname: '« Fred la Rouge »',
  description:
    'Frédérique, « Fred la Rouge », chanteuse de chants de marins : Bretagne, Irlande, ports du Nord. Écoutes libres, album Irish Ties, presse, contact.',
  lang: 'fr',
  // Ville d'attache (reprise de « Quand je suis parti de La Rochelle », clip tourné à La Rochelle)
  base: 'La Rochelle — France',
  origin: 'Saint-Briac (Côte d’Émeraude, Bretagne)',
  email: 'filledesaintbriac@gmail.com',
  phone: '+33698961902',
  phonePretty: '06 98 96 19 02',
} as const;

export const NAV = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#biographie', label: 'Biographie' },
  { href: '#ecouter', label: 'Écouter' },
  { href: '#album', label: 'Album' },
  { href: '#spectacles', label: 'Spectacles' },
  { href: '#presse', label: 'Presse' },
  { href: '#contact', label: 'Contact' },
] as const;

/** Paragraphes biographiques — texte original du site, conservé tel quel. */
export const BIO = {
  lead: "Bretonne d’origine, Frédérique chante la Mer. L’Irlande et la Bretagne… bien sûr !",
  paragraphs: [
    'De Paimpol à Douarnenez, en passant par le Festival Interceltique et la Baltique, elle chante les marins de Bretagne et d’ailleurs : Amsterdam, Saint-Malo, Brest, Liverpool, Rostock, Valparaíso !',
    'Fille de Saint-Briac, avec un grand-père cap-hornier, « Fred la Rouge » chante aussi les poètes : Gaston Couté, Pierre Mac Orlan, Verlaine, Rimbaud… Léo Ferré.',
    'Comédienne, elle travaille avec Philippe Adrien, Jean-Pierre Mocky… Chanteuse, elle monte sur scène avec Gilles Servat, Michel Tonnerre, Denez Prigent, Anne Sylvestre.',
  ],
  /** Les « ports » — motifs récurrents de son répertoire, affichés comme balises. */
  ports: [
    'Paimpol', 'Douarnenez', 'Saint-Malo', 'Brest', 'La Rochelle',
    'Saint-Briac', 'Liverpool', 'Rostock', 'Amsterdam', 'Valparaíso',
  ],
} as const;

/** Liens externes vérifiés (2026-09-01). */
export const LINKS = {
  amazonAlbum: 'https://www.amazon.fr/Fa%C3%B1chig-bihan/dp/B00249394O',
  deezerAlbum: 'https://www.deezer.com/search/album?q=fr%C3%A9d%C3%A9rique%20irish%20ties',
  itunesAlbum: 'https://music.apple.com/fr/search?term=frederique+irish+ties',
  cdDistributeur: 'https://www.paniermusique.fr/1644-frederique-irish-ties.html',
  youtube: 'https://www.youtube.com/channel/UCm08Xmm_SCnre7moj6eUuYA',
  youtubeCapHornier: 'https://www.youtube.com/watch?v=c98wxyLXnOk',
  youtubeLaRochelle: 'https://www.youtube.com/watch?v=oAriQEOQqfM',
  /** ⚠️ Placeholder : le PDF « souscription Frédérique Aquarel » vivait dans le
   * pied de page de l’ancien site. Tâche T011 : récupérer l’URL exacte du PDF
   * (ou l’intégrer dans public/docs/) puis remplacer ci-dessous. */
  aquarelPdf: 'https://frederique-sur-mer.fr/#aquarel',
} as const;

/** Vidéos YouTube — lecteur « lite » (aucune requête vers Google avant clic : RGPD + poids). */
export const VIDEOS = [
  {
    id: 'c98wxyLXnOk',
    title: 'Quand je suis parti de La Rochelle — Cap Hornier',
    caption: 'Chant traditionnel maritime · clip réalisé avec Éric Citharel',
  },
  {
    id: 'oAriQEOQqfM',
    title: 'La Rochelle',
    caption: 'Clip tourné à La Rochelle · réalisation Éric Citharel',
  },
] as const;
