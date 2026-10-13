# Campagne visuelle XpertEO

Huit photographies générées avec l’outil intégré `image_gen`, puis converties en WebP (qualité 85). Le personnage est fictif : ces visuels de marque ne représentent pas un membre identifié de l’équipe.

La palette reprend le violet `#6321ed`, le citron `#ceff05`, le blanc et le noir du site. La référence de logo est une rasterisation du wordmark et de l’astérisque existants. La première vue sert de référence de visage et de tenue pour les sept suivantes. Les prompts complets sont conservés dans `brand-campaign-prompts.json` ; les assets livrés sont autonomes dans `public/images/brand/`.

| Plan | Emplacement |
| --- | --- |
| Drone, regard vers le haut | Accueil, hero |
| Doigt vers la droite | Accueil, expertises |
| Profil | Accueil, engagements |
| Contre-plongée depuis les chaussures | Invitation au diagnostic, pied des pages |
| Face | À propos |
| Doigt vers la gauche | Expertises, bannière avec texte à gauche |
| Marche de trois quarts | Méthode |
| Assis | Contact |

Les images font 1122 × 1402 pixels. Les huit WebP représentent environ 652 Ko au total. `next/image` fournit les tailles responsive et le chargement différé ; seule la vue du hero est prioritaire.

Le style se trouve dans `app/brand-campaign.css`, le composant dans `components/brand-visual.tsx`. Les légendes restent du texte HTML. Les panneaux emploient les couleurs de marque, des dégradés et un grain SVG décoratif sans interaction.

Les animations réutilisent GSAP : léger zoom à l’entrée et mouvement de légendes au défilement sur ordinateur. Le contenu reste visible sans animation. Le mode de réduction des mouvements désactive les animations de campagne et les transitions CSS.

## Compositions avec transparence

Les huit versions `*.cutout.webp` sont des détourages générés avec `image_gen` et un véritable canal alpha. Les prompts d’édition sont conservés dans `brand-cutout-prompts.json`. Les photographies originales restent disponibles ; le hero utilise explicitement la variante `photo` et conserve son fond.

`app/brand-depth.css` applique trois fonds via le code : halo blanc central resserré dans le violet, mélange profond violet/vert, et halo clair vert/blanc. Le bruit SVG reste un calque décoratif CSS des sections. Les ombres de profondeur sont également appliquées en CSS.

La section `BrandStage` place l’USP au-dessus, le personnage au milieu devant un mot XXL, puis une explication et l’action au-dessous. Les bannières des pages alternent image et texte. Les mots de profondeur sont décoratifs et exclus de l’arbre d’accessibilité ; titres, liens et descriptions restent du HTML accessible.

## Déclinaisons communes par page

Toutes les compositions de campagne utilisent désormais `BrandStage`, y compris les anciennes bannières latérales et l’invitation de fin de page. `components/page-campaign.tsx` définit les messages, mots XXL, pastilles, images et destinations propres à chaque page. Les ressources et les guides utilisent le nouveau personnage lisant un document ; le contact utilise le personnage au téléphone. Leurs WebP transparents et leurs prompts sont conservés dans `public/images/brand/` et `page-campaign-prompts.json`.

Les pages d’expertise, de méthode, de présentation, de réalisations, de questions, de diagnostic, de confidentialité et d’informations légales ont également leur déclinaison. Chaque scène de profondeur possède sa propre animation de défilement et chaque bouton pointe vers le contenu associé ou la demande de diagnostic.

Les vues classiques utilisent maintenant un cadrage à la taille, réalisé dans le composant et le CSS sans modifier les fichiers transparents. La vue drone de l’accueil et la contre-plongée de l’invitation finale restent en plein pied. Les fonds alternent entre violet, vert lumineux et mélange vert/violet ; les textes, motifs et boutons adoptent les couleurs de contraste de chaque variante.

## Exports 4K et affichage haute définition

Les visuels utilisés sur le site sont désormais les versions `*.4k.webp`, exportées en 3072 × 3840 pixels. Il s’agit d’un agrandissement Lanczos3 des PNG sources de 1122 × 1402 pixels, avec une accentuation légère et une compression WebP à 96. Ces fichiers ne sont pas des générations 4K natives. La restauration du portrait de lecture par l’outil intégré a également retourné 1122 × 1402 pixels ; le prompt et cette limite sont consignés dans `brand-4k-restoration.json`.

`scripts/export-brand-4k.mjs` produit les fichiers et vérifie leurs dimensions et leur transparence. `brand-4k-exports.json` conserve les sources, destinations et tailles. Les originaux restent disponibles. Le composant annonce maintenant jusqu’à 1100 pixels CSS pour les grandes scènes, fournit une qualité de 95 à Next Image et emploie des tailles responsive jusqu’à 3840 pixels. Les appareils plus petits reçoivent une version adaptée à leur écran.
