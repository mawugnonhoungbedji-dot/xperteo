# Portfolio — mise à jour du 13 octobre 2026

## Périmètre

À la demande du propriétaire, Minsii Bénin et Faithful Matchmaker sont retirés de l’accueil, des réalisations, du sitemap et de llms.txt. Leurs anciennes routes renvoient une page introuvable, y compris si un contenu homonyme existe dans D1. Les anciens fichiers image sont conservés comme archives. ALBI International reste présent avec sa capture du 25 septembre 2026.

Trois nouveaux sites fournis par le propriétaire, qui confirme une intervention de A à Z :
- https://benin-royal-couture.houngbedjinono855.chatgpt.site/
- https://house-star-living.houngbedjinono855.chatgpt.site/
- https://ibuilder-atelier-web-ia.houngbedjinono855.chatgpt.site/

Lumina (https://lumina-immersive-studio.glotpro46.chatgpt.site/) affiche une connexion obligatoire. Le propriétaire a demandé de le laisser de côté pour l’instant. Aucune fiche ni image de connexion n’est publiée.

## Sources et captures

Pages d’accueil inspectées dans le navigateur le 13 octobre 2026. Captures JPEG réelles, sans recomposition, dans public/images/portfolio :
- benin-royal-couture-portfolio.jpg : 1265 × 712 pixels ; vue ordinateur. Une première vue étroite a été remplacée par cette capture.
- house-star-portfolio.jpg : 1425 × 792 pixels ; vue ordinateur.
- ibuilder-portfolio.jpg : 1265 × 712 pixels ; vue ordinateur.

Les dimensions ci-dessus sont celles des fichiers obtenus. Le navigateur a appliqué des tailles différentes selon les onglets ; ce ne sont pas des mesures de performance. Les captures sont des premiers écrans, pas des captures intégrales des sites.

Les textes s’appuient sur les contenus et contrôles visibles des pages d’accueil. Ils ne revendiquent ni audit complet du code source, ni campagne email, ni intégration analytics ou CRM non vérifiée. House Star indique explicitement que les annonces, prix et images sont illustratifs. iBuilder renvoie à WhatsApp pour les modalités du prochain atelier.

## Structure des fiches

Le projet et son besoin, puis quatre interventions : positionnement/copywriting, direction artistique/design, parcours, intégration/mise en ligne. Trois étapes côté visiteur, fonctionnalités visibles et bilan qualitatif expliquent comment le travail forme un ensemble cohérent. Un sommaire donne accès aux sections. ALBI conserve sa présentation existante.

La grille commune à l’accueil et aux réalisations présente quatre projets sur deux colonnes sur ordinateur et une sur mobile. Les métadonnées, liens vers les sites et dates des captures sont mis à jour.

Aucune statistique de taux d’ouverture, de conversion ou de progression n’a été fournie. Les bilans décrivent les livrables et les intentions du parcours sans annoncer d’amélioration mesurée. Pour ajouter des résultats, obtenir la valeur, la définition de l’indicateur, sa source et sa période de mesure.

## Vérification de cette mise à jour

- TypeScript : `tsc --noEmit --incremental false` terminé sans erreur.
- `git diff --check` : aucun problème de whitespace.
- Les trois JPEG ont été ouverts et inspectés ; dimensions vérifiées avec sharp.
- Le serveur Next.js local démarre sur le port 3001 et /case-studies a été compilé sans erreur (140,3 s). Le navigateur a renvoyé plusieurs délais d’attente puis une erreur de connexion. Le rendu final du portfolio, ses ancres et sa présentation mobile restent à vérifier visuellement. Aucun test mobile réussi n’est revendiqué.
