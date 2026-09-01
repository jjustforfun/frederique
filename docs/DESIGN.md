# Design system — « La mer, automatiquement »

## Concept

Le site **est** un bord de mer. Selon l'horloge de l'appareil du visiteur :

- **Jour** — mer claire : ciel pâle, écume sable, encre marine, rouge de ciré (`#b23a2b`,
  clin d'œil à « Fred la Rouge »).
- **Nuit** — mer étoilée : abysses bleu-nuit, trois couches d'étoiles CSS qui scintillent,
  lune et reflet de lune sur l'eau, rouge corail de feu de bord (`#ef8873`), laiton poli
  (`#e4c07a`).

Aucun bouton, aucun choix, aucun script : `prefers-color-scheme`. Les deux aquarelles
mer (jour/nuit) ne se téléchargent **que si** le thème actif les demande (background-image
dans media query). Le rouge reste **le** fil rouge des deux thèmes — c'est l'identité de
l'artiste, pas un accent décoratif.

## Tokens (`global.css :root`)

| Token | Jour | Nuit | Emploi |
|---|---|---|---|
| `--bg` | `#f4efe4` sable | `#081120` abysses | fond de page |
| `--surface` | `#fffdf7` écume | `#0d1b2e` coque | cartes |
| `--surface-2` | `#e9e2d2` | `#12233b` | bandes alternatives |
| `--text` | `#16323f` encre | `#e8eef3` lune | texte |
| `--muted` | `#4e6772` | `#a3b7c6` | texte secondaire |
| `--line` | 16 % encre | 14 % lune | bordures |
| `--accent` | `#b23a2b` | `#ef8873` | boutons, focus, links hover |
| `--accent-strong` | `#8e2a1e` | `#f7a592` | liens courants |
| `--accent-contrast` | `#fff8f2` | `#2b0f0a` | texte sur accent |
| `--gold` / `--gold-band` | `#8a5a14` / `#e6b563` | `#e4c07a` / `#ecc98c` | kickers, badges |
| `--sky-top/-bottom`, `--sea`, `--sea-deep`, `--foam` | *(voir CSS)* | *(voir CSS)* | décor |
| `--star-opacity`, `--moon-opacity` | `0` | `1` | pilotes du ciel nocturne |

Règle : **toute couleur passe par un token.** Les paires token↔token utilisées réellement
sont testées par `scripts/wcag-check.mjs` (AA minimum, AAA sur les fonds de page).

## Typographie

- Titrage : **Fraunces Variable** (`opsz`+`wght`, subsets unicode-range) — serif à
  empattements souples, « écrit à la main », famille naturelle du mot *aquarelle*.
- Texte/UI : **Work Sans** 400/600/700.
- Échelle fluide : `h1 clamp(2.35rem…4.4rem)` … `p 16–18 px`.
- C'est la **couleur + la typographie** qui font le thème, pas une deuxième hiérarchie.

## Motifs & mouvement

- **Vagues** : deux SVG inline (crête + remplissage `--bg`) dérivant à −50 % (26 s / 41 s),
  joints au pied du hero, de l'album et du contact — « le bord de l'eau » structure la page.
- **Étoiles** : 3 couches de `radial-gradient` (560/380/240 px) + scintillement alterné ;
  `opacity: var(--star-opacity)` → littéralement invisible le jour.
- **Lune + reflet** : disque CSS + dégradé `::after` sur `.sea`, écran-blend nocturne.
- **Aquarelles** : `public/img/mer-jour.jpg` / `mer-nuit.jpg` (gérées par le CSS du hero,
  `mix-blend-mode: multiply` le jour / `screen` la nuit), opacité 0.5 — jamais premières
  au LCP.
- Toute animation respecte `prefers-reduced-motion` (court-circuit global dans `global.css`).

## Composants notables

- **Panneau écume** du hero : fond translucide + blur = le texte reste lisible par-dessus
  la mer quel que soit le thème (contraste garanti, pas espéré).
- **Lecteur** : lignes de piste numérotées, bouton rond accent, badge « Chant/Radio » ;
  dock flottant en bas (play/prev/next/seek, temps, fermeture) — même vocabulaire
  de tokens que le reste.
- **Cartes** : `border-radius: 14px`, fine bordure `--line`, ombre douce au thème.
- **Badges ports** (bio) : chips en bordure, aucun hover flashy.

## Palette héritée, cyan mort

L'ancienne site baignait dans un cyan saturé « association évidente mer ». Ici, **la mer
est peinte, pas encrée** : sables et bleus profonds, un rouge franc, deux ors. Le cyan
survit uniquement en teinte intermédiaire (`--sea` jour `#5e9cb0`) à l'état de souvenir.
