import { media } from './media';

/** Titre audio du lecteur « Écouter » (fichiers MP3 de l’ancienne site). */
export interface Track {
  id: string;
  title: string;
  /** Nom du fichier dans wp-content/uploads (voir data/media.ts). */
  file: string;
  /** Origine/contexte, affiché en second rôle. */
  note?: string;
  kind: 'chant' | 'interview';
}

/** Enregistrements publiés sur la page d’accueil du site d’origine. */
export const TRACKS: Track[] = [
  {
    id: 'amsterdam',
    title: 'Amsterdam',
    file: 'amsterdam_ethno_040516.mp3',
    note: 'Chant de marins traditionnel · ethno, avril 2016',
    kind: 'chant',
  },
  {
    id: 'saint-briac',
    title: 'Les Filles de Saint-Briac',
    file: 'Filles_de_saint_briac_221115.mp3',
    note: 'Chanson de la Côte d’Émeraude · novembre 2015',
    kind: 'chant',
  },
  {
    id: 'fregate',
    title: 'La Frégate de Paimbœuf',
    file: 'fregate_master_jo_230315.mp3',
    note: 'Chant de la Loire et des terre-neuvas · mars 2015',
    kind: 'chant',
  },
  {
    id: 'an-droug-hirnez',
    title: 'An Droug Hiriez',
    file: 'An-droug-hirnez_020414.mp3',
    note: '« Les Fiançailles » — chant en breton · avril 2014',
    kind: 'chant',
  },
  {
    id: 'missing-you',
    title: 'Missing You',
    file: 'missing_you_master_210214.mp3',
    note: 'Ballade, master · février 2014',
    kind: 'chant',
  },
  {
    id: 'spectacles-106',
    title: 'Les Saintes-Maries',
    file: '1-Les-Saintes-Maries.mp3',
    note: 'Extrait du spectacle musical · piste 1',
    kind: 'chant',
  },
  {
    id: 'spectacles-poucet',
    title: 'Petit Poucet',
    file: '2-Petit-Poucet.mp3',
    note: 'Extrait du spectacle musical · piste 2',
    kind: 'chant',
  },
  {
    id: 'spectacles-importance',
    title: 'Ça n’a pas d’importance',
    file: '3-Ca-na-pas-dimportance.mp3',
    note: 'Extrait du spectacle musical · piste 3',
    kind: 'chant',
  },
  {
    id: 'spectacles-vigne',
    title: 'Ma vigne pousse',
    file: '4-Ma-vigne-pousse.mp3',
    note: 'Extrait du spectacle musical · piste 4',
    kind: 'chant',
  },
  {
    id: 'france-bleu',
    title: 'Interview — France Bleu Breizh Izel',
    file: 'France-bleue-07-2016-allege.mp3',
    note: 'Retour sur scène et répertoire · juillet 2016',
    kind: 'interview',
  },
];

/** Album « Irish Ties » — tracklist officielle (source : boutique numérique Amazon/Deezer). */
export const ALBUM = {
  title: 'Irish Ties',
  artist: 'Frédérique',
  year: 2003,
  reissue: 2018,
  duration: '54 min',
  label: 'Le Loup du Faubourg',
  cdLabel: 'Regain (distribution CD, 2018)',
  description:
    'Là où la mer rejoint la lande : répertoire des terre-neuvas et des ports d’Irlande, entre complaintes bretonnes, ballades irlandaises et reprises de Mac Orlan.',
  tracks: [
    { n: 1, title: 'Fañchig bihan', duration: '05:47' },
    { n: 2, title: 'What Shall We Do', duration: '04:24' },
    { n: 3, title: 'Song for Irland', duration: '03:53' },
    { n: 4, title: 'La Lettre', duration: '04:21' },
    { n: 5, title: "Rare's Hill", duration: '03:47' },
    { n: 6, title: 'Dirty Old Town', duration: '04:52' },
    { n: 7, title: "L'Équipage", duration: '04:10' },
    { n: 8, title: 'Stand by Me', duration: '04:27' },
    { n: 9, title: 'Tri Martelod', duration: '04:38' },
    { n: 10, title: 'Black Is the Colour', duration: '05:17' },
    { n: 11, title: 'Limerick', duration: '04:25' },
    { n: 12, title: 'Moonlight Shadow', duration: '04:32' },
  ],
} as const;

/** Projet « Frédérique Aquarel » : album en souscription (présent sur l’ancien site). */
export const AQUAREL = {
  name: 'Frédérique Aquarel',
  description:
    'Un album en cours, peint à l’aquarelle : la mer changeante, les lumières de l’Émeraude. Le projet avance par souscription — chaque parrain reçoit l’enregistrement à paraître.',
  pdfLabel: 'Télécharger le dossier de souscription (PDF)',
} as const;

export function trackUrl(t: Track): string {
  return media(t.file);
}
