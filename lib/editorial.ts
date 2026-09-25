import type { Article } from "./content";
export type EditorialArticle = Article & { takeaway:string; sections:{id:string;title:string;paragraphs:string[]}[];checklist:string[];sources:{label:string;url:string}[] };
export const editorialArticles: EditorialArticle[] = [
  {
    "slug": "visites-sans-demandes",
    "title": "Votre site reçoit des visites, mais peu de demandes : par où commencer ?",
    "category": "Conversion",
    "related_service": "conversion",
    "excerpt": "Avant de chercher plus de trafic, vérifiez les intentions des visiteurs, la clarté de votre offre et le chemin vers la prise de contact.",
    "takeaway": "Commencez par vérifier trois points : les bonnes personnes arrivent-elles sur la bonne page, comprennent-elles votre offre et savent-elles comment vous contacter ?",
    "sections": [
      {
        "id": "section-1",
        "title": "Distinguer le trafic du besoin commercial",
        "paragraphs": [
          "Une visite n’est pas une intention d’achat. Une personne qui cherche une définition, un candidat à un emploi et un dirigeant qui compare des prestataires peuvent consulter le même site avec des attentes différentes. Additionner leurs visites ne dit pas si votre offre rencontre son public.",
          "Choisissez une offre prioritaire et les pages qui la présentent. Examinez les sources d’arrivée disponibles, les recherches pertinentes et les retours de votre équipe. Si vous ne disposez pas de données fiables, commencez par des entretiens et un contrôle manuel du parcours plutôt que par un calcul de taux trompeur."
        ]
      },
      {
        "id": "section-2",
        "title": "Vérifier ce que le lecteur comprend",
        "paragraphs": [
          "Lisez le haut de votre page sans vous appuyer sur votre connaissance de l’entreprise. Identifie-t-on le client concerné, le problème traité et ce que la prestation apporte concrètement ? Une formule ambitieuse peut ouvrir la page, mais elle doit être suivie d’une explication précise.",
          "Remplacez les promesses vagues par le périmètre du travail. Au lieu de « booster votre performance », précisez les pages travaillées, les livrables remis et les décisions que vous aiderez à prendre. Ajoutez ensuite les conditions et les limites qui comptent pour votre client."
        ]
      },
      {
        "id": "section-3",
        "title": "Tester la prise de contact de bout en bout",
        "paragraphs": [
          "Sur un téléphone, suivez le parcours comme un nouveau visiteur : trouvez une prestation, cherchez une réponse à une objection, ouvrez le formulaire et envoyez un message de test clairement identifié. Vérifiez sa réception, pas seulement l’affichage d’un message de succès.",
          "Chaque champ doit aider à traiter la demande. L’adresse du site ou l’objectif du projet peuvent être utiles ; exiger un budget exact trop tôt peut être difficile pour une personne qui cherche justement à cadrer son besoin. Expliquez aussi ce qui se passe après l’envoi, sans annoncer un délai que vous ne pouvez pas tenir."
        ]
      },
      {
        "id": "section-4",
        "title": "Choisir une amélioration et observer son effet",
        "paragraphs": [
          "Notez votre hypothèse : par exemple, les visiteurs ne comprennent pas ce qui est inclus. Modifiez la section concernée, datez le changement et observez les demandes sur une période adaptée au volume de trafic. Évitez de changer simultanément tous les messages si vous voulez comprendre ce qui a évolué.",
          "Un taux de conversion correspond au nombre d’actions retenues divisé par le nombre de visites éligibles, sur un périmètre cohérent. À faible volume, il fluctue fortement. Complétez-le par la qualification commerciale : la demande concerne-t-elle votre offre, votre zone et votre capacité d’intervention ?"
        ]
      }
    ],
    "checklist": [
      "Choisir une page et une action commerciale prioritaires.",
      "Faire relire l’offre par une personne extérieure.",
      "Tester le formulaire et la réception réelle du message.",
      "Suivre la qualité des demandes, avec les limites de mesure."
    ],
    "id": "guide-visites-sans-demandes",
    "author": "Rédaction XpertEO",
    "published_at": "2026-09-24T00:00:00.000Z",
    "updated_at": "2026-09-24T00:00:00.000Z",
    "seo_title": "Votre site reçoit des visites, mais peu de demandes : par où commencer ?",
    "seo_description": "Avant de chercher plus de trafic, vérifiez les intentions des visiteurs, la clarté de votre offre et le chemin vers la prise de contact.",
    "status": "published",
    "kind": "article",
    "content": "Une visite n’est pas une intention d’achat. Une personne qui cherche une définition, un candidat à un emploi et un dirigeant qui compare des prestataires peuvent consulter le même site avec des attentes différentes. Additionner leurs visites ne dit pas si votre offre rencontre son public.\n\nChoisissez une offre prioritaire et les pages qui la présentent. Examinez les sources d’arrivée disponibles, les recherches pertinentes et les retours de votre équipe. Si vous ne disposez pas de données fiables, commencez par des entretiens et un contrôle manuel du parcours plutôt que par un calcul de taux trompeur.\n\nLisez le haut de votre page sans vous appuyer sur votre connaissance de l’entreprise. Identifie-t-on le client concerné, le problème traité et ce que la prestation apporte concrètement ? Une formule ambitieuse peut ouvrir la page, mais elle doit être suivie d’une explication précise.\n\nRemplacez les promesses vagues par le périmètre du travail. Au lieu de « booster votre performance », précisez les pages travaillées, les livrables remis et les décisions que vous aiderez à prendre. Ajoutez ensuite les conditions et les limites qui comptent pour votre client.\n\nSur un téléphone, suivez le parcours comme un nouveau visiteur : trouvez une prestation, cherchez une réponse à une objection, ouvrez le formulaire et envoyez un message de test clairement identifié. Vérifiez sa réception, pas seulement l’affichage d’un message de succès.\n\nChaque champ doit aider à traiter la demande. L’adresse du site ou l’objectif du projet peuvent être utiles ; exiger un budget exact trop tôt peut être difficile pour une personne qui cherche justement à cadrer son besoin. Expliquez aussi ce qui se passe après l’envoi, sans annoncer un délai que vous ne pouvez pas tenir.\n\nNotez votre hypothèse : par exemple, les visiteurs ne comprennent pas ce qui est inclus. Modifiez la section concernée, datez le changement et observez les demandes sur une période adaptée au volume de trafic. Évitez de changer simultanément tous les messages si vous voulez comprendre ce qui a évolué.\n\nUn taux de conversion correspond au nombre d’actions retenues divisé par le nombre de visites éligibles, sur un périmètre cohérent. À faible volume, il fluctue fortement. Complétez-le par la qualification commerciale : la demande concerne-t-elle votre offre, votre zone et votre capacité d’intervention ?",
    "sources": []
  },
  {
    "slug": "seo-aeo-geo-differences",
    "title": "SEO, AEO, GEO : quelles différences pour votre site ?",
    "category": "SEO & recherche IA",
    "related_service": "geo",
    "excerpt": "Trois angles de travail pour être trouvé et compris, avec un socle commun : des pages accessibles, utiles et étayées.",
    "takeaway": "Le SEO vise la visibilité dans les moteurs, l’AEO la clarté des réponses et le GEO la compréhension dans les parcours de recherche générative. Ces termes ne désignent pas trois recettes indépendantes ni des résultats garantis.",
    "sections": [
      {
        "id": "section-1",
        "title": "SEO : répondre à une intention de recherche",
        "paragraphs": [
          "Le référencement naturel consiste à rendre des pages accessibles aux moteurs et pertinentes pour les recherches de leurs utilisateurs. Pour une entreprise de services, cela commence par une correspondance claire entre un besoin, une offre et une page.",
          "Une page de prestation doit expliquer à qui elle s’adresse, ce qui est réalisé et comment avancer. Un article peut approfondir une question préalable. Leur lien est utile lorsqu’il accompagne le raisonnement du lecteur ; répéter un mot-clé dans chaque paragraphe ne remplace pas cette cohérence."
        ]
      },
      {
        "id": "section-2",
        "title": "AEO : rendre une réponse facile à comprendre",
        "paragraphs": [
          "L’AEO, pour Answer Engine Optimization, est un terme utilisé pour le travail sur les réponses. Dans notre pratique, cela signifie formuler une question précise, y répondre directement, puis apporter les conditions, exemples et limites nécessaires.",
          "Une réponse autonome ne doit pas devenir une simplification trompeuse. À la question « combien coûte une refonte ? », un chiffre isolé peut induire en erreur. Expliquer les facteurs de coût et le cadrage nécessaire aide davantage un lecteur dont le besoin n’est pas encore défini."
        ]
      },
      {
        "id": "section-3",
        "title": "GEO : documenter une expertise identifiable",
        "paragraphs": [
          "Le GEO, pour Generative Engine Optimization, désigne les démarches visant une meilleure présence dans des réponses génératives. Les pratiques et les systèmes évoluent ; il n’existe pas un classement unique que l’on pourrait consulter comme une mesure stable.",
          "Pour les fonctionnalités IA de Google, la documentation officielle indique que les fondamentaux SEO restent pertinents et qu’aucune optimisation spécifique supplémentaire n’est requise. Ce constat concerne ces fonctionnalités ; il ne décrit pas tous les systèmes d’IA. Notre priorité est donc de clarifier l’identité de l’entreprise et de publier des informations originales, sourcées lorsque nécessaire."
        ]
      },
      {
        "id": "section-4",
        "title": "Quelles actions prioriser ?",
        "paragraphs": [
          "Vérifiez d’abord l’accès public et l’indexabilité des pages, puis la justesse des titres, la navigation et les liens internes. Complétez les informations réelles de l’entreprise. Ajoutez des explications métier que votre équipe est en mesure de défendre et de maintenir.",
          "Les données structurées décrivent le contenu visible ; elles ne constituent ni une recommandation de votre entreprise ni une garantie de citation. Suivez séparément les impressions et clics disponibles dans les outils de recherche, les demandes qualifiées et les observations datées de réponses IA. Une absence de citation ne permet pas, seule, de conclure que votre contenu est mauvais."
        ]
      }
    ],
    "checklist": [
      "Rendre les pages utiles accessibles sans connexion.",
      "Présenter clairement l’entreprise et ses services réels.",
      "Répondre aux questions avec contexte, sources et limites.",
      "Mesurer les demandes et documenter les observations IA."
    ],
    "sources": [
      {
        "label": "Google Search Central — Fonctionnalités IA et votre site",
        "url": "https://developers.google.com/search/docs/appearance/ai-features"
      },
      {
        "label": "Google Search Central — Exigences techniques",
        "url": "https://developers.google.com/search/docs/essentials/technical"
      }
    ],
    "id": "guide-seo-aeo-geo-differences",
    "author": "Rédaction XpertEO",
    "published_at": "2026-09-24T00:00:00.000Z",
    "updated_at": "2026-09-24T00:00:00.000Z",
    "seo_title": "SEO, AEO, GEO : quelles différences pour votre site ?",
    "seo_description": "Trois angles de travail pour être trouvé et compris, avec un socle commun : des pages accessibles, utiles et étayées.",
    "status": "published",
    "kind": "article",
    "content": "Le référencement naturel consiste à rendre des pages accessibles aux moteurs et pertinentes pour les recherches de leurs utilisateurs. Pour une entreprise de services, cela commence par une correspondance claire entre un besoin, une offre et une page.\n\nUne page de prestation doit expliquer à qui elle s’adresse, ce qui est réalisé et comment avancer. Un article peut approfondir une question préalable. Leur lien est utile lorsqu’il accompagne le raisonnement du lecteur ; répéter un mot-clé dans chaque paragraphe ne remplace pas cette cohérence.\n\nL’AEO, pour Answer Engine Optimization, est un terme utilisé pour le travail sur les réponses. Dans notre pratique, cela signifie formuler une question précise, y répondre directement, puis apporter les conditions, exemples et limites nécessaires.\n\nUne réponse autonome ne doit pas devenir une simplification trompeuse. À la question « combien coûte une refonte ? », un chiffre isolé peut induire en erreur. Expliquer les facteurs de coût et le cadrage nécessaire aide davantage un lecteur dont le besoin n’est pas encore défini.\n\nLe GEO, pour Generative Engine Optimization, désigne les démarches visant une meilleure présence dans des réponses génératives. Les pratiques et les systèmes évoluent ; il n’existe pas un classement unique que l’on pourrait consulter comme une mesure stable.\n\nPour les fonctionnalités IA de Google, la documentation officielle indique que les fondamentaux SEO restent pertinents et qu’aucune optimisation spécifique supplémentaire n’est requise. Ce constat concerne ces fonctionnalités ; il ne décrit pas tous les systèmes d’IA. Notre priorité est donc de clarifier l’identité de l’entreprise et de publier des informations originales, sourcées lorsque nécessaire.\n\nVérifiez d’abord l’accès public et l’indexabilité des pages, puis la justesse des titres, la navigation et les liens internes. Complétez les informations réelles de l’entreprise. Ajoutez des explications métier que votre équipe est en mesure de défendre et de maintenir.\n\nLes données structurées décrivent le contenu visible ; elles ne constituent ni une recommandation de votre entreprise ni une garantie de citation. Suivez séparément les impressions et clics disponibles dans les outils de recherche, les demandes qualifiées et les observations datées de réponses IA. Une absence de citation ne permet pas, seule, de conclure que votre contenu est mauvais."
  },
  {
    "slug": "preparer-refonte-site",
    "title": "Préparer une refonte de site : les décisions à prendre avant le design",
    "category": "Stratégie & site web",
    "related_service": "website",
    "excerpt": "Un cadrage simple pour éviter de reconstruire les mêmes problèmes dans une nouvelle interface.",
    "takeaway": "Avant une refonte, définissez le public prioritaire, l’objectif commercial, les contenus à conserver et les contraintes de migration. Le design vient traduire ces décisions.",
    "sections": [
      {
        "id": "section-1",
        "title": "Nommer le problème à résoudre",
        "paragraphs": [
          "Un site ancien n’est pas nécessairement inefficace. À l’inverse, une interface récente peut masquer une offre confuse. Décrivez le problème observé : informations obsolètes, formulaire défaillant, pages difficiles à modifier, manque de demandes pertinentes ou nouvelle orientation de l’activité.",
          "Associez ensuite ce problème à un objectif que vous pouvez examiner. « Moderniser le site » décrit une intention ; « permettre à un prospect de comprendre nos deux offres et de demander un échange adapté » donne une direction aux contenus et au parcours. Le cadrage doit aussi distinguer ce qui relève du site de ce qui relève de l’offre ou du traitement commercial."
        ]
      },
      {
        "id": "section-2",
        "title": "Faire l’inventaire avant de supprimer",
        "paragraphs": [
          "Listez les pages existantes, leur rôle et les contenus encore exacts. Lorsque vous y avez accès, examinez les visites, les liens entrants, les demandes associées et les documents utilisés par votre équipe. Une page peu visitée peut rester importante pour un client à une étape précise.",
          "Décidez pour chaque URL si elle est conservée, réécrite, regroupée ou supprimée. Lorsqu’une adresse change et qu’un contenu équivalent subsiste, préparez une redirection vers la destination pertinente. Rediriger toutes les anciennes pages vers l’accueil ferait perdre le contexte du visiteur."
        ]
      },
      {
        "id": "section-3",
        "title": "Écrire un périmètre compréhensible",
        "paragraphs": [
          "Le cahier des charges doit préciser les audiences, les offres, les pages, les fonctionnalités et les responsabilités. Qui valide les textes ? Qui fournit les photographies et les preuves ? Qui reçoit les demandes ? Qui maintient les informations après la mise en ligne ?",
          "Décrivez aussi les contraintes : outils existants, hébergement, accès, langues, budget, échéance et ressources internes. Pour chaque fonctionnalité, demandez quel usage elle sert. Une version initiale bien cadrée peut être plus utile qu’un périmètre étendu dont les contenus ne seront jamais prêts."
        ]
      },
      {
        "id": "section-4",
        "title": "Définir les critères de réception",
        "paragraphs": [
          "Préparez une liste de scénarios : parcourir les offres sur mobile, utiliser le clavier, envoyer une demande, retrouver un ancien contenu et modifier un article. Vérifiez les destinataires des formulaires et le traitement des erreurs. La recette porte sur l’usage complet, pas seulement sur l’apparence d’une capture.",
          "Avant le lancement, contrôlez les titres, les URL canoniques, le sitemap, les règles d’indexation et les redirections nécessaires. Préparez un retour arrière et attribuez la responsabilité des contrôles après mise en ligne. Une migration mérite un suivi : le lancement ne permet pas de conclure immédiatement sur son effet commercial."
        ]
      }
    ],
    "checklist": [
      "Formuler le problème et l’objectif principal.",
      "Inventorier les pages et les URL à préserver.",
      "Nommer les responsables des contenus et validations.",
      "Préparer les scénarios de recette et le suivi du lancement."
    ],
    "id": "guide-preparer-refonte-site",
    "author": "Rédaction XpertEO",
    "published_at": "2026-09-24T00:00:00.000Z",
    "updated_at": "2026-09-24T00:00:00.000Z",
    "seo_title": "Préparer une refonte de site : les décisions à prendre avant le design",
    "seo_description": "Un cadrage simple pour éviter de reconstruire les mêmes problèmes dans une nouvelle interface.",
    "status": "published",
    "kind": "article",
    "content": "Un site ancien n’est pas nécessairement inefficace. À l’inverse, une interface récente peut masquer une offre confuse. Décrivez le problème observé : informations obsolètes, formulaire défaillant, pages difficiles à modifier, manque de demandes pertinentes ou nouvelle orientation de l’activité.\n\nAssociez ensuite ce problème à un objectif que vous pouvez examiner. « Moderniser le site » décrit une intention ; « permettre à un prospect de comprendre nos deux offres et de demander un échange adapté » donne une direction aux contenus et au parcours. Le cadrage doit aussi distinguer ce qui relève du site de ce qui relève de l’offre ou du traitement commercial.\n\nListez les pages existantes, leur rôle et les contenus encore exacts. Lorsque vous y avez accès, examinez les visites, les liens entrants, les demandes associées et les documents utilisés par votre équipe. Une page peu visitée peut rester importante pour un client à une étape précise.\n\nDécidez pour chaque URL si elle est conservée, réécrite, regroupée ou supprimée. Lorsqu’une adresse change et qu’un contenu équivalent subsiste, préparez une redirection vers la destination pertinente. Rediriger toutes les anciennes pages vers l’accueil ferait perdre le contexte du visiteur.\n\nLe cahier des charges doit préciser les audiences, les offres, les pages, les fonctionnalités et les responsabilités. Qui valide les textes ? Qui fournit les photographies et les preuves ? Qui reçoit les demandes ? Qui maintient les informations après la mise en ligne ?\n\nDécrivez aussi les contraintes : outils existants, hébergement, accès, langues, budget, échéance et ressources internes. Pour chaque fonctionnalité, demandez quel usage elle sert. Une version initiale bien cadrée peut être plus utile qu’un périmètre étendu dont les contenus ne seront jamais prêts.\n\nPréparez une liste de scénarios : parcourir les offres sur mobile, utiliser le clavier, envoyer une demande, retrouver un ancien contenu et modifier un article. Vérifiez les destinataires des formulaires et le traitement des erreurs. La recette porte sur l’usage complet, pas seulement sur l’apparence d’une capture.\n\nAvant le lancement, contrôlez les titres, les URL canoniques, le sitemap, les règles d’indexation et les redirections nécessaires. Préparez un retour arrière et attribuez la responsabilité des contrôles après mise en ligne. Une migration mérite un suivi : le lancement ne permet pas de conclure immédiatement sur son effet commercial.",
    "sources": []
  },
  {
    "slug": "page-service-convaincante",
    "title": "Que doit contenir une page service pour aider un prospect à décider ?",
    "category": "Contenu & AEO",
    "related_service": "aeo",
    "excerpt": "Une structure pour expliquer votre offre, traiter les hésitations et proposer une prochaine étape adaptée.",
    "takeaway": "Une page service utile précise le client concerné, le problème traité, les livrables, le déroulement et la prochaine étape. Elle aide à vérifier l’adéquation entre le besoin et votre offre.",
    "sections": [
      {
        "id": "section-1",
        "title": "Commencer par la situation du client",
        "paragraphs": [
          "Le lecteur doit pouvoir reconnaître son contexte rapidement. Décrivez une difficulté concrète plutôt qu’une liste de compétences : une offre qui reste difficile à expliquer, des visites sans demandes, ou des informations devenues impossibles à maintenir.",
          "N’attribuez pas automatiquement le même problème à toutes les entreprises. Précisez à qui la prestation s’adresse et les situations dans lesquelles elle est pertinente. Cette qualification peut réduire les demandes hors sujet, ce qui est parfois plus utile qu’augmenter leur nombre total."
        ]
      },
      {
        "id": "section-2",
        "title": "Expliquer ce qui sera réellement fait",
        "paragraphs": [
          "Présentez les livrables avec des mots compréhensibles : un plan des pages, des textes validés, un formulaire testé, un plan de mesure. Distinguez les actions réalisées de leurs effets espérés. Un audit remis est un livrable ; une augmentation de chiffre d’affaires dépend de nombreux facteurs supplémentaires.",
          "Expliquez le déroulement et la participation attendue. Un prospect peut hésiter parce qu’il craint un projet trop lourd pour son équipe. Montrer les validations et les éléments à préparer lui permet d’évaluer cette charge avant le premier échange."
        ]
      },
      {
        "id": "section-3",
        "title": "Rassurer avec des informations vérifiables",
        "paragraphs": [
          "Les preuves utiles dépendent de ce dont vous disposez réellement : une méthode documentée, un exemple de livrable autorisé, une étude de cas contextualisée ou un témoignage publié avec accord. N’utilisez pas de chiffres décoratifs qui suggèrent une expérience non démontrée.",
          "Une preuve doit pouvoir être comprise. Pour un résultat, indiquez le point de départ, la période, le périmètre et les limites d’attribution. Si vous ne disposez pas encore de cas publiables, expliquez votre méthode et vos critères de qualité, sans laisser entendre qu’il s’agit de résultats clients."
        ]
      },
      {
        "id": "section-4",
        "title": "Répondre aux objections et ouvrir la suite",
        "paragraphs": [
          "Recueillez les questions de vos échanges commerciaux : faut-il tout refaire, qui rédige, comment le budget est-il établi, que se passe-t-il après le lancement ? Répondez directement, puis ajoutez les nuances nécessaires. Une FAQ doit rendre service au lecteur et rester cohérente avec la prestation décrite.",
          "Terminez par une action proportionnée. Une personne qui découvre une offre peut vouloir cadrer son besoin avant de demander un devis détaillé. Nommez le bouton selon l’étape réelle et expliquez ce qui suit. Reliez aussi un guide pertinent pour les lecteurs qui ont besoin de comprendre davantage avant de vous contacter."
        ]
      }
    ],
    "checklist": [
      "Nommer le problème et le public concernés.",
      "Séparer livrables, objectifs et résultats démontrés.",
      "Expliquer les étapes et la contribution du client.",
      "Proposer une action claire et un guide complémentaire."
    ],
    "id": "guide-page-service-convaincante",
    "author": "Rédaction XpertEO",
    "published_at": "2026-09-24T00:00:00.000Z",
    "updated_at": "2026-09-24T00:00:00.000Z",
    "seo_title": "Que doit contenir une page service pour aider un prospect à décider ?",
    "seo_description": "Une structure pour expliquer votre offre, traiter les hésitations et proposer une prochaine étape adaptée.",
    "status": "published",
    "kind": "article",
    "content": "Le lecteur doit pouvoir reconnaître son contexte rapidement. Décrivez une difficulté concrète plutôt qu’une liste de compétences : une offre qui reste difficile à expliquer, des visites sans demandes, ou des informations devenues impossibles à maintenir.\n\nN’attribuez pas automatiquement le même problème à toutes les entreprises. Précisez à qui la prestation s’adresse et les situations dans lesquelles elle est pertinente. Cette qualification peut réduire les demandes hors sujet, ce qui est parfois plus utile qu’augmenter leur nombre total.\n\nPrésentez les livrables avec des mots compréhensibles : un plan des pages, des textes validés, un formulaire testé, un plan de mesure. Distinguez les actions réalisées de leurs effets espérés. Un audit remis est un livrable ; une augmentation de chiffre d’affaires dépend de nombreux facteurs supplémentaires.\n\nExpliquez le déroulement et la participation attendue. Un prospect peut hésiter parce qu’il craint un projet trop lourd pour son équipe. Montrer les validations et les éléments à préparer lui permet d’évaluer cette charge avant le premier échange.\n\nLes preuves utiles dépendent de ce dont vous disposez réellement : une méthode documentée, un exemple de livrable autorisé, une étude de cas contextualisée ou un témoignage publié avec accord. N’utilisez pas de chiffres décoratifs qui suggèrent une expérience non démontrée.\n\nUne preuve doit pouvoir être comprise. Pour un résultat, indiquez le point de départ, la période, le périmètre et les limites d’attribution. Si vous ne disposez pas encore de cas publiables, expliquez votre méthode et vos critères de qualité, sans laisser entendre qu’il s’agit de résultats clients.\n\nRecueillez les questions de vos échanges commerciaux : faut-il tout refaire, qui rédige, comment le budget est-il établi, que se passe-t-il après le lancement ? Répondez directement, puis ajoutez les nuances nécessaires. Une FAQ doit rendre service au lecteur et rester cohérente avec la prestation décrite.\n\nTerminez par une action proportionnée. Une personne qui découvre une offre peut vouloir cadrer son besoin avant de demander un devis détaillé. Nommez le bouton selon l’étape réelle et expliquez ce qui suit. Reliez aussi un guide pertinent pour les lecteurs qui ont besoin de comprendre davantage avant de vous contacter.",
    "sources": []
  }
];
