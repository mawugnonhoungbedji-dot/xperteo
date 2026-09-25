# XpertEO — Architecture de la version privée

## Objectif et périmètre

Site institutionnel et d’acquisition en français, inspiré de la référence fournie : fond clair, grands titres, violet, vert citron, compositions en mosaïque. L’image architecturale est une création illustrative, pas une photographie des locaux XpertEO. Aucun client, résultat, témoignage ou statut juridique n’est inventé.

## Stack effective

React 19, TypeScript, conventions Next.js App Router et métadonnées Next. Le runtime livré est **Vinext**, compatible avec ces conventions et compilé par Vite pour Cloudflare Workers/Sites. Ce n’est pas un déploiement Next.js natif sur Vercel. Les composants restent principalement serveur, avec des îlots client pour le menu, le formulaire, le consentement et l’administration.

Base relationnelle **D1 (SQLite)** et migrations **Drizzle**, requêtes préparées. Ce choix utilise la persistance gérée de cet hébergement sans ajouter de serveur PostgreSQL. Une migration vers Vercel/Next natif et PostgreSQL demanderait l’adaptation de `lib/db.ts`, de l’authentification, du SQL et du schéma. Elle n’est pas présentée comme immédiatement prête.

## Arborescence

- `app/` : pages, routes HTTP, sitemap, robots, erreurs et layout partagé.
- `components/` : navigation, CTA, mise en page, formulaire, administration, rendu d’article.
- `components/ui/` : primitives accessibles du starter (Radix/Shadcn).
- `lib/content.ts` : services, méthode, FAQ de base, type des articles.
- `lib/site.ts` : origine de confiance et métadonnées centralisées.
- `lib/validation.ts` : validation partagée Zod.
- `lib/security.ts` : autorisation serveur, origine, taille du corps, limitation de débit.
- `lib/db.ts` : accès serveur à D1 et lecture des contenus publiés.
- `db/schema.ts`, `drizzle/` : modèle et migrations versionnées.
- `middleware.ts` : en-têtes de sécurité et exclusions d’indexation des routes privées.
- `public/images/workspace.webp` : image de création optimisée, dimensions réservées.
- `.openai/hosting.json` : identité du site et binding logique DB, aucun secret.

## Routes

| Route | Fonction |
|---|---|
| `/` | Vente, approche, expertises, méthode, FAQ et diagnostic |
| `/services` | Catalogue des 7 expertises |
| `/services/website`, `/seo`, `/aeo`, `/geo`, `/local-seo`, `/conversion`, `/analytics` (sous `/services`) | Pages d’expertise avec livrables et réponse directe |
| `/methodology` | 5 étapes couvrant les 10 disciplines du brief |
| `/about` | Entité, offre, audience et méthode |
| `/resources`, `/resources/[slug]` | Articles publiés dans le CMS |
| `/case-studies`, `/case-studies/[slug]` | Études de cas documentées et autorisées |
| `/faq` | Réponses de base et FAQ publiées |
| `/diagnostic`, `/contact` | Capture durable des demandes |
| `/admin` | Espace privé, connexion ChatGPT et liste d’administrateurs côté serveur |
| `/api/leads` | POST validé et limité, confirmation uniquement après stockage |
| `/api/events` | Événements optionnels sans identifiant de visiteur |
| `/api/admin` | Lecture, édition, publication, statuts et suppression sous autorisation |
| `/sitemap.xml`, `/robots.txt` | Découverte des pages publiques et exclusion des endpoints privés |
| `/privacy`, `/terms` | Informations de préparation, à compléter avant ouverture publique |

## Modèle de données

- `leads` : nom, entreprise, email, site, secteur, zone, objectif, message, source, page d’entrée, UTM, date et statut.
- `content` : articles/études de cas/FAQ, titre, slug unique, résumé, texte, catégorie, tags réservés, auteur, statut, SEO, service associé, dates.
- `analytics_events` : événement, chemin, libellé et date ; aucun email, IP ou identifiant de session.
- `rate_limits` : clé SHA-256 temporaire de contrôle de débit, compteur, expiration.
- `audits` : référence à un lead, statut et notes, préparé pour une évolution humaine/automatisée ; aucun audit automatique actuellement.

Les entreprises et sites restent des champs du lead pour éviter des entités vides. L’utilisateur provient de l’identité de la plateforme. Il n’y a pas encore de CRM, de table d’auteurs, ni de gestion des images dans le CMS.

## SEO, AEO et GEO

Titres et descriptions spécifiques, URLs canoniques, Open Graph textuel, sitemap des pages et des contenus publiés, HTML sémantique et liens internes. JSON-LD Organization/WebSite sur l’accueil, Service/BreadcrumbList sur les pages services, Article sur les contenus éditoriaux. Pas de LocalBusiness sans adresse vérifiée, pas de faux avis, pas de garantie de classement ou de citation IA.

Les FAQ sont utiles et visibles ; aucun rich result n’est promis. Les guides renvoient au service associé et au diagnostic. Les métadonnées des contenus peuvent être éditées. Les pages de base et services se modifient dans le code dans cette version.

## Conversion et sécurité

Validation HTML + Zod client/serveur, anti-spam par champ leurre et délai minimal, 5 demandes/heure par clé technique, corps limité, requêtes SQL préparées. Identifiant de soumission pour éviter les doublons lors d’une relance. Aucune visite du site soumis ni récupération d’URL par le serveur : pas de risque SSRF créé par ce formulaire.

Authentification ChatGPT gérée par la plateforme et autorisation `ADMIN_EMAILS` à chaque appel privé. Aucune autorisation implicite accordée au premier visiteur. L’email propriétaire a été vérifié dans la politique d’accès Sites avant configuration. Ne pas exposer ce Worker hors de la passerelle de confiance qui fournit l’identité.

La CSP autorise les scripts inline nécessaires au rendu React, sans `unsafe-eval`. Un durcissement par nonce peut être ajouté après validation sur le runtime retenu. Les champs éditoriaux sont rendus comme texte et non comme HTML.

## Limites avant production publique

- Renseigner les données légales, zones desservies, responsable de traitement et durées de conservation.
- Ajouter de vrais contenus, auteurs et preuves autorisées.
- Raccorder un service d’email/CRM si des notifications externes sont souhaitées ; les nouvelles demandes sont visibles dans l’espace privé.
- Réservation d’appel et moteur d’audit automatisé non implémentés.
- Analytics : événements consentis et compteurs agrégés. Pas de sessions uniques, attribution multi-session ou mesure de sorties.
- Le CMS initial gère articles, études de cas et FAQ. Services et pages institutionnelles restent dans le code. Pagination, médias, tags et relations multiples sont des évolutions.
- Le site est publié privé : il n’est pas actuellement un site public indexable.
- Core Web Vitals terrain, audit d’accessibilité exhaustif et intégrations GA/Search Console/Bing restent à valider/configurer.
