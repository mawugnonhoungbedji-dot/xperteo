# XpertEO — Contrôles de livraison

Contrôles effectués le 24 septembre 2026 sur la prévisualisation locale ; ne pas les confondre avec des métriques de trafic réel.

## Vérifié

- Compilation Worker/Vinext réussie et vérification TypeScript sans erreur.
- Lint applicatif sans erreur ni avertissement après correction.
- Accueil inspecté dans le navigateur sur écran de bureau.
- Affichage mobile inspecté dans une fenêtre de 390 px ; menu ouvert et navigation vers le diagnostic testés.
- Formulaire rempli avec des données fictives (`qa@example.com`) : confirmation uniquement après réponse de stockage.
- Vérification directe de la base locale : une demande de test enregistrée.
- 18 pages publiques : HTTP 200, un H1, titres spécifiques et canoniques correctes.
- Pages de service : routes website, seo, aeo, geo, local-seo, conversion et analytics valides.
- Sitemap XML et robots.txt : HTTP 200 ; exclusion /admin et /api/.
- URL inconnue : HTTP 404 avec page de secours.
- API d’administration anonyme : HTTP 403.
- Payload de formulaire invalide : HTTP 400.
- Payload dépassant la taille autorisée : HTTP 400.
- En-tête X-Content-Type-Options: nosniff observé sur les routes testées.
- Migration Drizzle inspectée et appliquée sur la base locale sans erreur.
- Aucun test ni jeu de données local inclus dans la base de production.

## Corrections issues des tests

- Correction de la syntaxe et du typage du formulaire.
- UUID client compatible avec les prévisualisations HTTP dépourvues de crypto.randomUUID.
- Lisibilité des labels et disposition des cartes adaptées au mobile.
- Navigation mobile via primitives accessibles Sheet.
- Date de première publication conservée lors des modifications d’un contenu.
- Suppression du symbole de marque enregistrée, aucun statut juridique n’ayant été fourni.

## Non mesuré ou restant à valider

- Connexion réelle du propriétaire et édition CMS en production : autorisation configurée, pas de session propriétaire simulée.
- Parcours complet de publication/dépublication/suppression CMS après connexion réelle.
- Outil WebMCP de préparation du formulaire : implémenté, mais `modelContext` non disponible dans le navigateur de test. Il ne soumet aucune demande et se désactive sans affecter le formulaire.
- Core Web Vitals terrain, score Lighthouse et audit WCAG exhaustif non réalisés ; aucun score chiffré annoncé.
- Charge, délivrabilité email, réservation et audit automatique : aucune intégration active.
- Mentions légales, politique de conservation, adresse, équipe et preuves commerciales : à renseigner.
- Les contrôles ne constituent pas un audit de sécurité externe ni une garantie de positionnement.

## Portée

Version privée fonctionnelle de préparation. L’ouverture publique requiert les informations d’entreprise, la validation du contenu et les tests de gestion sous l’identité réelle du propriétaire. Voir ARCHITECTURE.md pour les écarts et évolutions explicitement documentés.

## Correction de l’aperçu intégré

Le blocage `X-Frame-Options: SAMEORIGIN` empêchait un affichage dans une iframe ChatGPT, dont l’origine diffère de celle du site. Il est remplacé par une liste explicite `frame-ancestors` autorisant le site lui-même, `https://chatgpt.com` et ses sous-domaines HTTPS. Les autres origines ne sont pas autorisées. L’authentification, la confidentialité du site et les restrictions de l’administration sont conservées.

La règle est vérifiée dans le middleware et le build. L’aperçu intégré final doit être rechargé côté utilisateur ; l’ouverture directe dans un nouvel onglet reste possible avec le compte propriétaire. Les journaux de production consultés au moment du diagnostic ne contenaient pas d’erreurs récentes.

## Extension éditoriale — 24 septembre 2026

- TypeScript et lint des fichiers modifiés : succès.
- Prévisualisation : 17 pages contrôlées (accueil, catalogue, sept expertises, méthode, à propos, ressources, quatre guides, diagnostic), HTTP 200, un H1 chacune, titres et canoniques distincts.
- Tous les liens internes découverts sur ce parcours répondent 200.
- Les quatre guides figurent dans le sitemap (200).
- JSON-LD Article/BreadcrumbList et Service/BreadcrumbList valides syntaxiquement sur les pages concernées. Ce contrôle ne vaut pas certification des résultats enrichis Google.
- Contrôle visuel desktop du catalogue, des ressources et de la méthode ; contrôle mobile du catalogue et d’un guide, sans débordement horizontal sur ce guide (375 px utiles).
- Le formulaire, le stockage des leads et la protection de l’administration ne sont pas modifiés ; leurs tests locaux de la version précédente restent documentés. Aucun test authentifié du compte propriétaire en production n’est revendiqué.
- La page de contrôle temporaire a été supprimée avant publication.

## Correction des liens de navigation

Les liens applicatifs utilisent désormais des ancres HTML via `components/site-link.tsx`, y compris le menu mobile, les cartes et le pied de page. Cette navigation charge le document demandé sans dépendre d’une transition RSC cliente dans l’aperçu ou derrière l’accès privé. L’aspect et les destinations sont conservés.

Vérification par clic réel : les quatre liens du menu desktop, une carte d’article et Ressources depuis le menu mobile. Les bonnes pages s’affichent. TypeScript et lint réussis. Le problème de l’environnement utilisateur n’a pas été reproduit à l’identique : la navigation cliente initiale aboutissait dans l’aperçu local après chargement. Le correctif retire cette dépendance pour rendre les liens robustes.

## Portfolio — 25 septembre 2026

TypeScript : succès. Les trois captures se chargent dans la grille. Navigation par clic depuis la carte Minsii vers sa fiche vérifiée. Trois fiches reliées au sitemap et au menu Réalisations. Les images montrent uniquement des pages publiques ; Lumina reste en attente car sa page demande une connexion.
