#!/usr/bin/env node
/**
 * wcag-check.mjs — Portes de contrôle accessibilité du design system.
 * Vérifie les ratios WCAG 2.2 AA des paires de couleurs (tokens) qui servent
 * réellement au site. Échoue (exit 1) si une paire est sous le seuil.
 *
 * Usage : node scripts/wcag-check.mjs
 */
const srgb = (c) => {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};
const lum = (hex) => {
  const n = parseInt(hex.replace('#', ''), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
};
const ratio = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

// [contexte, avant-plan, arrière-plan, seuil, taille]
const PAIRS = [
  // Thème JOUR (la mer)
  ['jour · encre sur sable',        '#16323f', '#f4efe4', 7],
  ['jour · encre sur écume',        '#16323f', '#fffdf7', 7],
  ['jour · discret sur sable',      '#4e6772', '#f4efe4', 4.5],
  ['jour · lien rouge sur sable',   '#8e2a1e', '#f4efe4', 4.5],
  ['jour · texte sur accent',       '#fff8f2', '#b23a2b', 4.5],
  ['jour · encre sur panneau écume','#16323f', '#dcebe8', 7],
  ['jour · discret sur panneau',    '#4e6772', '#dcebe8', 4.5],
  ['jour · clair sur pleine mer',   '#eef4f6', '#175066', 4.5],
  ['jour · clair haut de bande',    '#eef4f6', '#3b7691', 4.5],
  ['jour · kicker or sur mer',      '#e6b563', '#175066', 3.1],
  // Thème NUIT (la mer étoilée)
  ['nuit · lune sur abysses',       '#e8eef3', '#081120', 7],
  ['nuit · lune sur coque',         '#e8eef3', '#0d1b2e', 7],
  ['nuit · discret sur abysses',    '#a3b7c6', '#081120', 4.5],
  ['nuit · lien corail',            '#f7a592', '#081120', 4.5],
  ['nuit · texte sur accent',       '#2b0f0a', '#ef8873', 4.5],
  ['nuit · clair sur pleine mer',   '#eef4f6', '#071a2e', 4.5],
  ['nuit · kicker or sur mer',      '#ecc98c', '#071a2e', 3.1],
];

let fail = 0;
for (const [ctx, fg, bg, min] of PAIRS) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) fail++;
  console.log(`${ok ? '✔' : '✘'} ${ctx.padEnd(32)} ${r.toFixed(2)}:1  (min ${min})`);
}
console.log(fail ? `\n${fail} paire(s) sous le seuil AA.` : '\nToutes les paires passent WCAG 2.2 AA.');
process.exit(fail ? 1 : 0);
