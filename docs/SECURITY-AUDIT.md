# Audit de sécurité XpertEO

Revue du 3 au 5 octobre 2026. Les correctifs décrits sont locaux ; ils ne sont
pas encore publiés sur Vercel. Ce rapport distingue le code vérifié des services
qui restent à configurer.

## Périmètre et méthode

- Lecture des routes publiques, des formulaires, de la validation, des accès D1,
  de l’ancien code d’authentification, du middleware et des dépendances verrouillées.
- Requête HEAD non intrusive sur `https://xperteo-jjy7-two.vercel.app/` le 3 octobre : 200.
- Tests automatisés avec fournisseurs simulés. Aucun email réel envoyé.
- Audit npm via `pnpm audit --prod --json` : dépendances de production, y compris
  les dépendances optionnelles. Le signalement d’un paquet ne démontre pas qu’un
  visiteur peut exploiter la faille dans cette application.
- Les paramètres privés Vercel, les comptes, DNS, boîtes email, accès Cloudflare,
  anciennes sauvegardes et historiques de secrets n’ont pas été audités.

## Constats et corrections

| Priorité | Constat | Traitement |
|---|---|---|
| Haute avant activation email | Limitation dépendant de D1 et d’un en-tête Cloudflare non fiable sur Vercel. | Compteurs Redis atomiques partagés, IP issue de Vercel, empreinte HMAC avec secret, refus en cas de panne. Configuration Upstash requise. |
| Haute, disponibilité | Formulaires inutilisables sans binding D1. | Envoi direct Resend ; plus d’écriture des nouvelles demandes en D1. Activation requise. |
| Moyenne, risque latent | Anciennes fonctions d’identité faisant confiance aux en-têtes Sites. Aucune route admin active trouvée. | Identité refusée sur Vercel et suppression de l’ancien helper admin inutilisé. Ne pas réutiliser ces en-têtes comme authentification. |
| Moyenne | Dépendances signalées par le registre. | Next.js 15.5.27 et versions corrigées de PostCSS, Babel, Browserslist, baseline-browser-mapping et fast-uri. Audit de production final sans alerte connue. |
| Faible | Intégration du site dans des cadres ChatGPT autorisée par la CSP héritée. | Sur Vercel, restriction à la même origine. |
| Information | Textes annonçant un espace privé et un stockage qui ne correspondent plus au fonctionnement. | Confirmation du formulaire et page de confidentialité adaptées au flux email. |

## Contrôles déjà présents et conservés

Validation Zod côté serveur, longueurs maximales, UUID, liste fermée de sources,
champ piège et délai de remplissage. Contrôle de même origine, maintenant complété
par le rejet explicite de `Sec-Fetch-Site: cross-site`. L’origine et le délai ne
sont pas des mécanismes d’authentification : un robot peut les imiter.

Le corps HTTP est limité à 24 000 octets pendant sa lecture, même sans
`Content-Length`. Le type de contenu doit être exactement JSON. Les requêtes D1
restantes utilisent des paramètres liés ; le JSON-LD échappe les caractères `<`.
Aucun point d’exécution de texte utilisateur comme code n’a été identifié dans
les chemins examinés.

La réponse publique vérifiée présentait HSTS, `nosniff`, une politique de référent,
Permissions-Policy et CSP. `Access-Control-Allow-Origin: *` était présent sur la
page d’accueil publique ; cela ne prouve pas une exposition de données privées.
Les routes API reçoivent `Cache-Control: no-store` via le middleware.

## Sécurité du flux email

- Destinataire et expéditeur fixes, validés et définis par variables serveur.
- Adresse du visiteur placée dans `Reply-To`. Aucun destinataire issu du formulaire.
- Message texte brut et sujet prédéfini ; aucun HTML utilisateur interprété.
- Même UUID utilisé comme clé d’idempotence Resend pour les reprises.
- Appels HTTPS vers Resend et Redis, redirections refusées, délais maximaux.
- Confirmation uniquement après une réponse valide du service d’envoi.
- Erreurs publiques génériques ; journalisation d’un code fixe sans contenu ni secret.
- Double soumission immédiate bloquée côté formulaire.

## Validation

Le 5 octobre, `pnpm audit --prod --json` retourne zéro alerte sur 252 dépendances
de production et optionnelles. Le contrôle initial signalait neuf alertes
(quatre élevées, quatre modérées, une faible). Cela ne constitue pas une preuve
d’absence de failles inconnues et ne couvre pas toutes les dépendances de développement.
Babel est explicitement résolu pour le peer optionnel de styled-jsx ; les autres
correctifs transitifs sont verrouillés par des overrides ciblés. Les exceptions
au délai de publication pnpm portent uniquement sur les versions exactes du
correctif Next.js 15.5.27, sans désactiver globalement la politique.

Les dix tests de `pnpm run test:security` passent : origine, validation, taille
du corps, destinataire fixe, clé de reprise, quotas, absence de configuration,
pannes des fournisseurs et traitement de l’adresse IP. Les fournisseurs sont simulés.
Le build Next.js 15.5.27 et la génération des 14 pages statiques réussissent.
ESLint ne signale aucune erreur et six avertissements d’imports inutilisés préexistants.
Ces commandes ont été exécutées sous Windows avec Node.js 24.13.0 ; Vercel est
configuré pour Node.js 22.x et doit encore valider le nouveau déploiement.

## Limites et actions restantes

1. Destinataire confirmé : `contact@e-xperteo.com`. Confirmer le service email ; configurer les secrets,
   vérifier le domaine expéditeur et tester la réception puis le bouton Répondre.
2. Les limites horaires et le champ piège limitent les abus, sans garantir l’arrêt
   de robots distribués. Le plafond global peut aussi être épuisé par un attaquant.
   Prévoir une règle WAF ou un challenge si l’usage réel le justifie.
3. La CSP autorise encore les scripts inline pour le rendu Next.js actuel. Une
   CSP à nonce nécessiterait une adaptation du rendu et du cache ; elle n’est pas
   incluse dans ce correctif. Cette autorisation réduit la défense contre une
   éventuelle injection HTML future ; aucune injection exploitable n’a été démontrée.
4. Resend acceptant un message ne garantit pas sa remise : surveiller les rejets,
   quotas et spams. Aucune file de secours ni reprise automatique n’a été ajoutée.
5. Compléter l’identité du responsable, le contact confidentialité et les durées
   de conservation. Sécuriser les comptes Vercel, Resend, Redis et messagerie avec
   des accès limités et l’authentification multifacteur.
6. L’ancienne base D1 n’est ni migrée ni supprimée. Les contenus exclusivement en
   D1 restent indisponibles. Sans D1, les événements sont ignorés sans appel Redis.
7. Les clés réelles n’ont pas été lues ni modifiées. `.env.example` est le seul
   fichier `.env*` suivi identifié dans le dépôt ; cela ne vérifie pas tout l’historique Git.

## Sources et exploitation

- [Correctifs Next.js du 30 septembre 2026](https://nextjs.org/blog/september-2026-security-release).
  Les préconditions publiées des failles ne sont pas toutes présentes ici : pas
  d’images distantes autorisées, pas de route racine catch-all, pas de Cache Components.
- [En-têtes d’IP Vercel](https://vercel.com/docs/headers/request-headers).
- [Mise en service email](EMAIL.md), incluant les références Resend et Upstash.

Cet audit est une revue ciblée avec tests automatisés, pas une certification
ni un test d’intrusion exhaustif de l’infrastructure.
