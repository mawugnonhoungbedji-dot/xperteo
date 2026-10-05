# Réception des demandes avec LWS

## Fonctionnement

L’entreprise remplit le formulaire. Vercel valide la demande, vérifie les quotas,
puis l’envoie par le SMTP authentifié de LWS à `contact@e-xperteo.com`.
Le propriétaire répond depuis sa messagerie : le champ `Reply-To` contient
l’adresse de l’entreprise. Le visiteur ne reçoit pas de copie automatique.

Les nouvelles demandes ne sont pas écrites dans D1. Aucun accès Cloudflare
n’est nécessaire pour ce flux. L’ancienne base n’est ni migrée ni supprimée.
SMTP remplace Resend ; `RESEND_API_KEY` n’est plus utilisée.

## Paramètres à renseigner dans Vercel

Dans Settings → Environment Variables, configurer pour **Production** :

| Variable | Valeur |
|---|---|
| `SMTP_HOST` | `mail.e-xperteo.com`, communiqué par le propriétaire. |
| `SMTP_PORT` | `465`, SSL/TLS recommandé par LWS, à confirmer dans le panneau. |
| `SMTP_USER` | `contact@e-xperteo.com`. |
| `SMTP_PASSWORD` | Mot de passe de cette boîte, saisi directement dans Vercel. |
| `LEADS_FROM_EMAIL` | `contact@e-xperteo.com`, doit correspondre à `SMTP_USER`. |
| `LEADS_TO_EMAIL` | `contact@e-xperteo.com`. |
| `UPSTASH_REDIS_REST_URL` | URL HTTPS REST de la base Redis. |
| `UPSTASH_REDIS_REST_TOKEN` | Jeton REST autorisant les commandes nécessaires. |
| `RATE_LIMIT_SECRET` | Secret aléatoire d’au moins 32 caractères. |

Le mot de passe du compte client LWS n’est pas nécessaire. Ne partager aucun
secret dans le chat, les commits ou des variables `NEXT_PUBLIC_*`.
Générer le secret anti-abus sur le poste de l’opérateur avec
`node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`,
puis le placer uniquement dans les paramètres secrets de Vercel.

Une boîte dédiée à l’envoi peut remplacer `SMTP_USER` et `LEADS_FROM_EMAIL`
si elle existe chez LWS ; le destinataire reste `contact@e-xperteo.com`.
Si le panneau LWS indique un autre serveur, utiliser ce nom exact avec son
certificat valide. Le port 587 est aussi accepté, mais STARTTLS est obligatoire.
Ne jamais désactiver la vérification du certificat pour contourner une erreur.

La boîte LWS doit déjà pouvoir recevoir et envoyer des emails ordinaires.
Il n’est pas nécessaire de changer ses DNS existants pour utiliser son SMTP
fonctionnel. Vérifier les quotas propres à l’offre LWS.

Configurer également Upstash : sans ses paramètres, les demandes sont refusées
avant l’appel SMTP. Redis conserve uniquement des compteurs temporaires,
aucun contenu de formulaire. Aucun compte ni abonnement n’a été créé.

## Déploiement et validation réelle

1. Exécuter `npm run test:security` et `npm run build` sous Node.js 24.
2. Configurer les variables, aligner Node.js sur 24.x dans Vercel et déployer
   le nouveau code. Les variables seules ne mettent pas à jour un ancien déploiement.
3. Envoyer une demande de test depuis le formulaire publié.
4. Vérifier sa réception dans LWS, y compris les indésirables, puis vérifier
   que « Répondre » sélectionne bien l’adresse de l’entreprise.
5. Vérifier qu’un refus d’envoi conserve les champs et affiche une erreur.

En Preview, employer une boîte et des accès de test distincts, ou laisser
l’envoi désactivé en omettant les secrets. Les tests simulent SMTP et Redis :
ils n’envoient aucun email et ne prouvent pas la livraison réelle.

## Protection et limites

- Destinataire et expéditeur définis côté serveur, message texte brut ;
  aucun fichier ni contenu distant chargé par le service d’envoi.
- Connexion chiffrée et certificat vérifié ; délais d’attente limités.
- Limites de 5 demandes par IP et par fenêtre horaire, 100 au total par fenêtre.
  Une frontière entre fenêtres peut autoriser un pic. Adapter au quota LWS
  avant activation si l’offre autorise moins d’envois.
- Redis conserve une empreinte HMAC de l’IP issue de Vercel et des compteurs
  expirant après une heure. Aucun contenu de demande n’y est enregistré.
- Configuration absente ou panne : réponse 503, aucun succès fictif.
- L’acceptation SMTP ne garantit pas l’arrivée dans la boîte. Surveiller les
  rejets, quotas, indésirables et l’espace disponible dans la messagerie.
- Le même UUID produit le même `Message-ID`, mais SMTP ne garantit pas la
  déduplication. Une nouvelle tentative après une réponse perdue peut produire
  un doublon. La référence permet de le reconnaître. Pas de reprise automatique
  ni de file de secours dans cette version.
- Compléter les informations de confidentialité et la conservation des emails.

## Sources

- [Configuration email LWS](https://aide.lws.fr/base/Hebergement-web-mutualise/Gestion-des-emails/Quels-ports-utiliser-pour-la-configuration-dune-adresse-email).
- [Transport SMTP Nodemailer](https://nodemailer.com/smtp).
- [Envoi depuis Vercel](https://vercel.com/kb/guide/sending-emails-from-an-application-on-vercel).
- [API REST Upstash](https://upstash.com/docs/redis/features/restapi).
