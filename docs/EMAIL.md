# Réception des demandes par email

## Fonctionnement préparé

`POST /api/leads` valide la demande, vérifie la limite d’envoi partagée, puis
la transmet à Resend. Les nouvelles demandes ne sont plus écrites dans D1.
Les anciennes données et migrations ne sont pas supprimées.

Le destinataire et l’expéditeur sont fixés côté serveur. Le champ `Reply-To`
contient l’adresse du visiteur : utiliser « Répondre » dans la messagerie pour
lui répondre. Le visiteur ne reçoit pas de copie automatique.

Le message est en texte brut. Le service utilise l’UUID de la demande comme
clé d’idempotence : Resend déduplique les reprises identiques pendant 24 heures.
Une confirmation signifie que Resend a accepté l’envoi, pas que le message est
déjà arrivé en boîte de réception. Vérifier les rejets et les spams dans Resend.

## Configuration requise

L’adresse destinataire confirmée est `contact@e-xperteo.com`.
Le choix du fournisseur reste à confirmer. L’intégration préparée utilise Resend et Upstash Redis.
Elle ne crée aucun compte et ne souscrit aucun abonnement.

Dans Vercel → Settings → Environment Variables, renseigner :

| Variable | Valeur |
|---|---|
| `RESEND_API_KEY` | Clé Resend limitée à l’envoi, pour le domaine choisi. |
| `LEADS_TO_EMAIL` | `contact@e-xperteo.com` en production. |
| `LEADS_FROM_EMAIL` | Adresse simple sur un domaine vérifié dans Resend, sans nom d’affichage. |
| `UPSTASH_REDIS_REST_URL` | URL HTTPS REST de la base Redis. |
| `UPSTASH_REDIS_REST_TOKEN` | Jeton REST autorisant les commandes nécessaires. |
| `RATE_LIMIT_SECRET` | Secret aléatoire d’au moins 32 caractères. |

Générer ce dernier avec `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`
sur le poste de l’opérateur, puis le placer uniquement dans les paramètres secrets.
Ne pas partager les clés dans le chat, les commits ou les variables `NEXT_PUBLIC_*`.

Vérifier le domaine expéditeur dans Resend avec les enregistrements DNS demandés.
L’adresse du visiteur est le `Reply-To`, jamais l’expéditeur : cela évite d’usurper
son domaine. Le destinataire peut être une boîte existante, indépendante du domaine expéditeur.

Utiliser des clés et une boîte de test distinctes en Preview. Le code accepte
les envois en Preview si ses variables sont configurées ; sinon il retourne 503.
Après ajout des variables, redéployer le nouveau commit.

## Protection et limites

- Limite fixe : 5 demandes par IP et par fenêtre horaire, 100 demandes au total
  par fenêtre. Deux fenêtres successives peuvent autoriser un pic à leur frontière.
- Redis ne conserve que des compteurs et des clés HMAC expirant après une heure.
- Sur Vercel, seule l’adresse fournie par `x-vercel-forwarded-for` est utilisée.
- Si Redis ou Resend est absent ou en panne, l’envoi échoue avec 503 et les champs
  restent dans le formulaire. Aucun succès fictif, aucun stockage local de secours.
- Une reprise identique réutilise l’UUID. Si le contenu est modifié après un envoi
  accepté mais dont la réponse a été perdue, Resend peut refuser la même clé avec
  un autre contenu. Recharger et soumettre une nouvelle demande dans ce cas.
- Aucun mécanisme ne garantit la remise finale : surveiller Resend, les quotas
  et la messagerie. Un CAPTCHA ou une règle WAF ciblée peut compléter la protection
  si le site reçoit du trafic automatisé distribué.

## Validation avant activation

1. Exécuter `pnpm run test:security`, `pnpm run lint`, `pnpm run build`.
2. Configurer les secrets et déployer en Preview.
3. Envoyer une demande de test autorisée, vérifier sa réception et le bouton Répondre.
4. Vérifier qu’un refus d’envoi conserve les champs et affiche une erreur.
5. Compléter les informations de confidentialité et la conservation des emails.

Les tests automatisés simulent les fournisseurs : aucun email réel n’est envoyé.

Sources : [API Resend](https://resend.com/docs/api-reference/emails/send-email),
[idempotence Resend](https://resend.com/docs/dashboard/emails/idempotency-keys),
[API REST Upstash](https://upstash.com/docs/redis/features/restapi),
[en-têtes Vercel](https://vercel.com/docs/headers/request-headers).
