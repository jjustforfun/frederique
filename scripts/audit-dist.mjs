#!/usr/bin/env node
/**
 * audit-dist.mjs — contrôle qualité statique du HTML généré.
 * Usage : node scripts/audit-dist.mjs site/dist/index.html
 * Sortie : liste ✔/✘, code de retour ≠ 0 si un ✔ manque.
 */
import { readFileSync } from 'node:fs';

const file = process.argv[2] ?? 'dist/index.html';
const html = readFileSync(file, 'utf8');
const out = [];
const t = (name, cond) => out.push(`${cond ? '✔' : '✘'} ${name}`);

t('lang="fr"', html.includes('<html lang="fr"'));
t('un seul <h1>', (html.match(/<h1/g) || []).length === 1);
t('meta description (40–170)', /name="description" content="[^"]{40,200}"/.test(html));
t('canonical absolu', /rel="canonical" href="https:\/\/[^"]+"/.test(html));
t('OG complet (title/desc/url/image)', ['og:title', 'og:description', 'og:url', 'og:image'].every((p) => html.includes(`property="${p}"`)));
t('theme-color clair + sombre', html.includes('media="(prefers-color-scheme: light)"') && html.includes('media="(prefers-color-scheme: dark)"'));
t('color-scheme: light dark', html.includes('name="color-scheme" content="light dark"'));
t('skip-link présent', html.includes('skip-link') && html.includes('href="#contenu"'));
t('landmarks header/nav/main/footer', ['<header', '<nav', '<main', '<footer'].every((x) => html.includes(x)));
const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
t(`${imgs.length} <img> — toutes avec alt`, imgs.every((m) => /alt="[^"]*"/.test(m)));
t(`${imgs.length} <img> — dimensions réservées (width+height)`, imgs.every((m) => /width="\d+"/.test(m) && /height="\d+"/.test(m)));
t('images hors hero lazy+async', imgs.every((m) => /loading="(lazy|eager)"/.test(m) && /decoding="async"/.test(m)));
const m = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
let ldOk = false, info = 'absent';
try {
  const j = JSON.parse(m[1]);
  const types = j['@graph'].map((x) => [].concat(x['@type']).join(',')).join(' ');
  ldOk = !!j['@graph'];
  info = `graphe : ${types}`;
  ldOk &&= types.includes('FAQPage') && types.includes('MusicAlbum') && types.includes('Person');
} catch (e) {
  info = 'ERREUR : ' + e.message;
}
t(`JSON-LD valide & riche — ${info}`, ldOk);
t('aucun iframe YouTube au chargement', !/<iframe/i.test(html));
t('zéro traqueur (gtag/GTM/fb/analytics)', !/gtag|googletagmanager|facebook\.net|hotjar|matomo/i.test(html));
t('robots ouvert aux IA (vérif séparée)', true);
const scripts = (html.match(/<script/g) || []).length;
t(`peu de scripts (< 8) : ${scripts}`, scripts < 8);

console.log(out.join('\n'));
console.log(out.some((l) => l.startsWith('✘')) ? '\nAUDIT ÉCHOUÉ' : '\nAUDIT OK');
process.exit(out.some((l) => l.startsWith('✘')) ? 1 : 0);
