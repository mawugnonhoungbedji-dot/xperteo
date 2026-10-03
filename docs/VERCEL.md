# Déployer sur Vercel

Le projet utilise désormais Next.js 15 pour la compilation et le serveur.
Les anciennes instructions Sites/Vinext dans les autres documents décrivent
l'hébergement d'origine.

## Réglages

- Framework : Next.js.
- Répertoire racine : celui contenant `package.json` (`xperteo` si le dépôt contient ce sous-dossier).
- Node.js : 22.x, comme dans `package.json`.
- Installation : `pnpm install --frozen-lockfile`.
- Build : `pnpm run build`.
- Output Directory : conserver la valeur par défaut de Next.js.

Utiliser pnpm et `pnpm-lock.yaml` pour installer les versions validées.
Avant de déployer : `pnpm run lint`, puis `pnpm run build`.

## Erreurs du journal fourni

Le journal concerne le commit `5395ac8`. Le dossier local contenait déjà un
correctif ultérieur (`4f04baf`). Envoyer les nouveaux correctifs sur GitHub,
puis déployer le nouveau commit ; relancer l'ancien déploiement ne suffit pas.

Next.js 15 utilise les configurations ESLint historiques : `FlatCompat`
convertit `next/core-web-vitals` et `next/typescript` au format ESLint 9.
Référence : [documentation ESLint de Next.js 15](https://nextjs.org/docs/15/pages/api-reference/config/eslint).
Les types Cloudflare sont importés uniquement comme types ; le build Next.js
ne doit pas importer le module d'exécution `cloudflare:workers`.

## Base de données : étape distincte à prévoir

Vercel ne fournit pas le binding Cloudflare D1 `DB` attendu par `lib/db.ts`.
La correction de compilation ne migre pas la base de données.

- Les pages et les articles intégrés au code peuvent s'afficher sans D1.
- Sans connexion à la base, les formulaires `/api/leads` et les événements
  `/api/events` renvoient une erreur 503 ; les demandes ne sont pas enregistrées.
- Les contenus stockés uniquement dans D1 ne seront pas disponibles.

Avant la mise en service des formulaires, connecter une base accessible depuis
Vercel et adapter les requêtes ainsi que la limitation de débit. Une simple
variable d'environnement nommée `DB` ne remplace pas un binding D1.
Ne jamais placer de secret de base de données dans une variable `NEXT_PUBLIC_*`.

Mettre également à jour l'origine publique dans `lib/site.ts` lors du choix du
domaine final, pour les liens canoniques et le sitemap.
