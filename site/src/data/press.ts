import { MEDIA, media } from './media';

/**
 * Élément de la galerie Presse (scans issus de l’ancienne page /presse/).
 * width/height = ratios de réservation (les scans varient ; le CSS recadre
 * en 3:4 ou 21:9 — ces attributs évitent surtout les sauts de mise en page).
 */
export interface PressItem {
  src: string;
  alt: string;
  caption: string;
  wide?: boolean;
  width: number;
  height: number;
}

export const PRESS: PressItem[] = [
  {
    src: media(MEDIA.presse.vinyl106),
    alt: 'Pochette vinyle 106 de Frédérique, vue de face',
    caption: 'Vinyle « 106 » — pochette',
    width: 600,
    height: 900,
  },
  {
    src: media(MEDIA.presse.missionBretonne),
    alt: 'Article de presse Mission bretonne à propos de Frédérique',
    caption: 'Mission bretonne',
    width: 567,
    height: 1024,
  },
  {
    src: media(MEDIA.presse.publico),
    alt: 'Article du journal Publico sur le spectacle de Frédérique',
    caption: 'Publico',
    width: 548,
    height: 1024,
  },
  {
    src: media(MEDIA.presse.extraits),
    alt: 'Page d’extraits de presse sur les concerts de Frédérique',
    caption: 'Extraits de presse',
    wide: true,
    width: 1400,
    height: 600,
  },
  { src: media(MEDIA.presse.presse1), alt: 'Revue de presse (1/3)', caption: 'Revue de presse · 1', width: 600, height: 900 },
  { src: media(MEDIA.presse.presse2), alt: 'Revue de presse (2/3)', caption: 'Revue de presse · 2', width: 600, height: 900 },
  { src: media(MEDIA.presse.presse3), alt: 'Revue de presse (3/3)', caption: 'Revue de presse · 3', width: 600, height: 900 },
  {
    src: media(MEDIA.presse.afficheMauves),
    alt: 'Affiche du concert Les Mauves au Café de Paris',
    caption: 'Les Mauves — Café de Paris',
    width: 600,
    height: 900,
  },
  {
    src: media(MEDIA.presse.lanfains),
    alt: 'Document d’archives du concert de Lanfains',
    caption: 'Lanfains — archives',
    width: 600,
    height: 900,
  },
  {
    src: media(MEDIA.presse.article),
    alt: 'Article de presse sur Frédérique',
    caption: 'Article',
    width: 600,
    height: 900,
  },
  {
    src: media(MEDIA.presse.flyerJardin),
    alt: 'Flyer de concert en plein air (jardin)',
    caption: 'Au jardin — flyer',
    width: 600,
    height: 900,
  },
];

/** Photographies de scène (page Spectacles de l’ancienne site). */
export const SHOW_PHOTOS = [
  {
    src: media(MEDIA.scenes.P1),
    alt: 'Frédérique en concert — scène de bord de mer',
    caption: 'En scène · Le Tour du Chant de Marins',
    width: 800,
    height: 533,
  },
  {
    src: media(MEDIA.scenes.P2),
    alt: 'Frédérique en concert, ambiance de port',
    caption: 'Sur le pont !',
    width: 800,
    height: 533,
  },
  {
    src: media(MEDIA.scenes.P3),
    alt: 'Frédérique chantant, guitare et public',
    caption: 'De Paimpol à Douarnenez',
    width: 800,
    height: 533,
  },
  {
    src: media(MEDIA.scenes.P4),
    alt: 'Frédérique sur scène, voile rouge',
    caption: 'La Rouge, évidemment',
    width: 800,
    height: 533,
  },
  {
    src: media(MEDIA.scenes.P5),
    alt: 'Frédérique, rappel devant le public',
    caption: 'Rappel — « Quand je suis parti de La Rochelle »',
    width: 800,
    height: 533,
  },
] as const;
