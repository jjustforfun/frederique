import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../data/site';

/**
 * Flux RSS minimal (découverte + moteurs qui lisent les flux).
 * Les « actualités » sont les faits durables connus du site ; la tâche de
 * reprise (docs/REPRISE-DONNEES.md) pourra les transformer en Markdown.
 */
export async function GET(context: APIContext) {
  const items = [
    {
      title: 'Album « Irish Ties » — disponible en numérique et en CD',
      pubDate: new Date('2018-01-05'),
      description:
        "Irish Ties de Frédérique (label Le Loup du Faubourg), 12 titres / 54 minutes — réédition CD distribuée par Regain. Écoute : Deezer, Amazon.",
      link: '/#album',
    },
    {
      title: 'Frédérique Aquarel — album en souscription',
      pubDate: new Date('2016-11-29'),
      description:
        'Le nouvel album se peint à l’aquarelle : la mer changeante et les lumières de la Côte d’Émeraude. Parrainages ouverts via le dossier PDF.',
      link: '/#aquarel',
    },
    {
      title: 'Dix extraits audio à écouter librement',
      pubDate: new Date('2016-07-15'),
      description:
        'Amsterdam, Les Filles de Saint-Briac, La Frégate de Paimbœuf, An Droug Hiriez, Missing You, extraits du spectacle et l’interview France Bleu Breizh Izel (juillet 2016).',
      link: '/#ecouter',
    },
  ];

  return rss({
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    site: context.site!,
    trailingSlash: false,
    items,
    customData: '<language>fr-fr</language>',
  });
}
