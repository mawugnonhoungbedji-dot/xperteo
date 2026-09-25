# XpertEO — Bilan de préparation au lancement

État au 24 septembre 2026.

## Livré

Le catalogue et les sept pages d’expertise présentent les problèmes traités, les livrables et le point de départ d’une collaboration. La méthode expose cinq étapes, la contribution du client et les critères de passage. La page À propos présente le positionnement sans inventer d’équipe, de clients ou de résultats.

Quatre guides originaux sont consultables dans Ressources : visites sans demandes ; SEO/AEO/GEO ; préparation d’une refonte ; page service. Ils comportent des sections, un sommaire, une réponse synthétique, des actions, des liens vers les expertises et d’autres guides. Le guide sur les moteurs renvoie à la documentation Google officielle.

## Disponibilité

Le site est déployé avec son accès privé existant. Le propriétaire peut le consulter et le tester. Il n’est pas encore ouvert au public : la présence du sitemap et des métadonnées ne suffit pas pour que les moteurs accèdent aux pages derrière la connexion.

## SEO, AEO et GEO

| Élément | État |
|---|---|
| Pages lisibles rendues côté serveur | En place |
| Titres, descriptions, canoniques | En place ; contrôles locaux effectués |
| Sitemap et liens internes | En place, quatre guides inclus |
| Données structurées | Organization/WebSite, Service, Article et fils d’Ariane selon les pages |
| Réponses directes, sections, contexte et sources | En place dans les guides |
| Indexation publique | Impossible à valider tant que l’accès reste privé |
| Performances réelles et Core Web Vitals | À mesurer après ouverture ; aucun score revendiqué |
| Classement, trafic et citations IA | Non mesurés et non garantis |

Google indique que ses fonctionnalités IA s’appuient sur les fondamentaux SEO et ne nécessitent pas d’optimisation spéciale supplémentaire. Ce principe n’est pas une garantie de citation ni une description de tous les moteurs IA.

Sources :
- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/essentials/technical

## Avant d’accueillir des prospects

1. Compléter l’identité de l’entreprise, les coordonnées et les mentions légales/confidentialité avec les informations exactes. Les textes actuels signalent les éléments à compléter.
2. Valider la connexion propriétaire à l’administration et une demande réelle de bout en bout. Le formulaire a été testé localement ; aucun email automatique n’est configuré. Organiser la consultation et le suivi des demandes.
3. Relire et approuver les engagements commerciaux et contenus avec la personne responsable de XpertEO. Les quatre guides de lancement sont éditables dans le code ; le CMS sert aux futurs articles.
4. Décider de l’ouverture publique et du domaine final. Si le domaine change, mettre à jour l’origine, les canoniques et le sitemap.
5. Vérifier le site dans Search Console, soumettre le sitemap et contrôler l’indexation. Continuer les contenus à partir des questions clients et des recherches observées.
6. Documenter sauvegarde, conservation des données et maintenance. La liste administrative est limitée aux 100 entrées les plus récentes.

## Récupérer le projet

Les sources sont versionnées dans le dépôt du site et peuvent être exportées en ZIP. Cet export contient le code, les contenus intégrés, les images, le schéma et les migrations, mais pas les secrets ni les demandes stockées en base.

Le projet est une application React/TypeScript avec conventions Next App Router exécutées via Vinext et Cloudflare Workers/D1. Un ZIP de sources ne se lance pas en double-cliquant sur un fichier HTML : il faut les dépendances et un environnement serveur compatible. Une migration vers un autre hébergement demande d’adapter le runtime, la base et l’authentification. Le README et OPERATIONS.md décrivent le fonctionnement.
