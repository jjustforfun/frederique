#!/usr/bin/env bash
# =============================================================================
# mirror-assets.sh — Rapatrie les médias de l’ancienne site WordPress dans
# le repo, pour que le nouveau site soit 100 % autonome (plus de hotlink).
#
# Usage :
#   ./scripts/mirror-assets.sh            # téléverse dans site/public/media/
#   puis, dans site/src/data/media.ts :   # remplacer
#     export const MEDIA_BASE = 'https://frederique-sur-mer.fr/wp-content/uploads';
#   par :
#     export const MEDIA_BASE = '/media';
#
# Pourquoi un script ? Le bac à sable de l’agence ne peut pas joindre le
# serveur mutualisé de l’artiste (filtrage des IP datacenter) ; ce script est
# à exécuter depuis une connexion normale (la vôtre, ou la CI du dépôt).
# =============================================================================
set -euo pipefail

BASE="https://frederique-sur-mer.fr/wp-content/uploads"
DEST="$(dirname "$0")/../site/public/media"
mkdir -p "$DEST"

FILES=(
  # Photos de scène
  P1.jpg P2.jpg P3.jpg P4.jpg P5.jpg
  # Pochette du vinyle Irish Ties
  Vinyl-page-1-670x1024.jpg Vinyl-page-2-661x1024.jpg Vinyl-page-3-671x1024.jpg
  # Presse & archives
  Vinyl-106.jpg Vinyl-Mission-Bretonne-original-567x1024.jpg vinyl-Publico-original-548x1024.jpg
  extraits-presse.jpg presse-1.jpg presse-2.jpg presse-3.jpg
  Affiche-Les-Mauves-Cafe-de-Paris.jpg lanfains.jpg article.jpg flyer-jardin.jpg
  logo-france_bleu_breizh_izel1-1024x1024-300x300.jpg
  # Enregistrements audio (playlist)
  amsterdam_ethno_040516.mp3 Filles_de_saint_briac_221115.mp3
  fregate_master_jo_230315.mp3 An-droug-hirnez_020414.mp3
  missing_you_master_210214.mp3 France-bleue-07-2016-allege.mp3
  1-Les-Saintes-Maries.mp3 2-Petit-Poucet.mp3 3-Ca-na-pas-dimportance.mp3 4-Ma-vigne-pousse.mp3
)

ok=0; fail=0
for f in "${FILES[@]}"; do
  if curl -fsSL --retry 3 --retry-delay 2 -o "$DEST/$f" "$BASE/$f"; then
    echo "✔ $f"
    ok=$((ok+1))
  else
    echo "✘ $f (à récupérer manuellement)"
    fail=$((fail+1))
  fi
done

echo
echo "Téléchargés : $ok — En échec : $fail"
echo "→ Pensez à basculer MEDIA_BASE sur '/media' dans site/src/data/media.ts,"
echo "  puis vérifiez les fichiers dans site/public/media/ avant de redéployer."
