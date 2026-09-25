# XpertEO — Gestion, déploiement et maintenance

## Gestion des demandes

Ouvrir `/admin` avec le compte ChatGPT propriétaire autorisé. Le serveur vérifie l’identité et la liste `ADMIN_EMAILS`. Les statuts disponibles sont nouveau, contacté, qualifié, appel réservé, proposition, gagné et perdu. Le statut « appel réservé » est un état de suivi manuel, pas un calendrier connecté.

Les nouvelles demandes apparaissent dans le compteur de l’administration. Aucun email automatique n’est envoyé. La suppression d’une demande est définitive et utilise une boîte de confirmation. Les résultats affichés sont les 100 demandes les plus récentes ; prévoir une pagination avant de dépasser ce volume.

## Publier du contenu

Dans Contenus, choisir article, étude de cas ou FAQ. Renseigner titre, slug unique (minuscules et tirets), résumé, auteur, contenu et catégorie. Ajouter les métadonnées SEO et le service associé. Enregistrer en brouillon ou publié. Une modification d’un contenu publié est immédiatement visible ; repasser en brouillon pour le retirer.

Le texte est volontairement brut : une ligne vide sépare les paragraphes. Aucun HTML ni script n’est accepté à l’affichage. Les études de cas doivent avoir une autorisation et des éléments vérifiables. Aucun article, client ou témoignage de démonstration n’est inséré dans la base de production.

Le catalogue des services et les FAQ initiales sont dans `lib/content.ts`. La méthode et les pages institutionnelles sont dans `app/`. Le CMS peut ajouter des FAQ, mais ne modifie pas encore les entrées de base.

## Variables

| Variable | Usage |
|---|---|
| `ADMIN_EMAILS` | Emails exacts, séparés par des virgules ; stocker comme secret. Liste vide = refus d’accès. |
| `SITE_ORIGIN` | Origine finale de référence. Maintenir cohérente avec `lib/site.ts` lors d’un changement de domaine. |
| `DB` | Binding D1 géré par l’hébergeur, pas une chaîne de connexion à recopier dans le navigateur. |

Ne jamais committer `.env`, `.dev.vars`, tokens Git ou secrets. `.env.example` documente les paramètres. Les changements de variables sur Sites prennent effet avec un nouveau déploiement.

## Validation et développement

Conserver le gestionnaire pnpm et le lockfile. `node node_modules/typescript/bin/tsc --noEmit` vérifie les types. Lint applicatif : `node node_modules/eslint/bin/eslint.js app components/site-shell.tsx components/site-client.tsx components/lead-form.tsx components/admin-panel.tsx components/article-page.tsx components/diagnostic-tool.tsx lib db middleware.ts`.

Le flux Sites utilise le script de build fourni par le plugin. Le build produit un Worker ESM avec un handler fetch et les assets client. Le code utilise les conventions Next App Router via Vinext ; les instructions d’un déploiement Next natif ne s’appliquent pas sans adaptation.

## Base de données

Après modification de `db/schema.ts`, générer avec `node node_modules/drizzle-kit/bin.cjs generate`. Lire chaque fichier SQL avant publication. Une migration publiée est immuable ; ajouter une nouvelle migration. Garder les migrations limitées au schéma, sans données de test.

Pour la prévisualisation locale après un build :

```sh
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_past_infant_terrible.sql
```

N’appliquer une migration locale qu’une fois. Le déploiement Sites gère séparément la base réelle. Ne jamais inclure `.wrangler/state` dans une livraison.

## Déploiement et retour arrière

Conserver `.openai/hosting.json` et son identifiant de projet. Le workflow Sites pousse l’état exact des sources, construit/valide l’archive, puis crée et publie la version privée. Vérifier que le statut final est `succeeded`. Changer le domaine implique aussi de modifier canoniques, sitemap et origine de confiance.

Un retour à une version du code ne revient pas en arrière sur les migrations. Préférer les évolutions de schéma compatibles avec la version précédente. Vérifier la stratégie de sauvegarde/récupération et la durée de rétention auprès de l’hébergement avant la mise en service publique ; aucun export automatique n’est configuré ici.

## Entretien

- Examiner régulièrement les nouvelles demandes, la qualité des contenus et les liens.
- Mettre à jour les dépendances avec revue du lockfile, build et vérification des parcours.
- Contrôler les erreurs sans journaliser les formulaires ni les secrets.
- Revoir les autorisations administrateur lors des changements d’équipe.
- Définir puis appliquer une politique de conservation des leads et événements.
- Vérifier les performances terrain après ouverture publique ; ne pas assimiler un build réussi à un score Lighthouse ou à des résultats SEO.

## Guides de lancement

Les quatre guides de lancement résident dans `lib/editorial.ts`. Ils sont versionnés avec le site, disponibles même si la lecture D1 échoue, et combinés aux articles publiés dans l’administration. Ils ont une structure éditoriale (sommaire, sections, synthèse, liste d’actions, sources) distincte du texte brut du CMS. Leur modification passe actuellement par le code ; les prochains articles peuvent être publiés dans le CMS. Les slugs des guides sont réservés et l’API de gestion refuse leur réutilisation. Aucune donnée de démonstration n’a été ajoutée à D1.

## Mise à jour : administration retirée

À la demande du propriétaire, la route `/admin`, l’API `/api/admin`, le composant de gestion et le lien du pied de page ont été retirés. Les demandes et contenus existants en base ne sont pas supprimés. Les formulaires continuent d’enregistrer les demandes, mais il n’existe plus d’interface de gestion ni d’email automatique : un accès opérateur aux données ou une future intégration sera nécessaire pour leur suivi. Les contenus peuvent évoluer dans le code. Les indications d’administration ci-dessus décrivent la version antérieure, conservée dans l’archive de sources avant modifications.

Animations : entrées courtes des titres, retours visuels des liens et cartes ; désactivées selon la préférence système de réduction des animations. Aucune bibliothèque supplémentaire.
