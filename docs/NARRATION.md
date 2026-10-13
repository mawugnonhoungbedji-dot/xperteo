# Visite audio de la page d’accueil

La première version utilise les voix françaises disponibles dans le navigateur. Aucune voix IA ni aucun enregistrement externe n’a encore été généré. La musique de fond reste désactivée.

Les neuf textes à enregistrer se trouvent dans `lib/home-narration.ts`, avec un identifiant, un titre et la section associée : bienvenue, approche, expertise au premier plan, expertises, méthode, réalisations, confiance, questions et contact.

## Comportement

- Activation volontaire avec « Écouter la visite ».
- Lecture de la section la plus visible dans la zone centrale de l’écran.
- Attente de 700 ms après un changement de section ; l’ancienne narration s’arrête immédiatement.
- Une seule lecture automatique par section pendant la visite. « Réécouter cette section » permet de relancer la section affichée.
- Pause et reprise ; après un déplacement pendant la pause, la lecture reprend sur la nouvelle section.
- Mise en pause lorsque l’onglet passe en arrière-plan et arrêt au changement de page.
- Les textes visibles et les lecteurs d’écran restent indépendants de cette visite audio.

## Préparer une voix enregistrée

Utiliser les textes du manifeste comme scripts, une voix française chaleureuse et posée, et une prononciation cohérente de XpertEO. Produire un fichier par identifiant, sans musique intégrée et avec des volumes homogènes. La synthèse du navigateur est une version de démonstration : son timbre dépend des voix installées. Les fichiers enregistrés pourront remplacer ce moteur sans changer les textes ni la sélection des sections.
