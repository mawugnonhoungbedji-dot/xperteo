export type Project = {
  slug: string; name: string; category: string; url: string; image: string;
  capturedAt: string; imageWidth?: number; imageHeight?: number;
  intro: string; description: string; focus: string;
  features: string[];
  challenge?: string;
  work?: { title: string; description: string }[];
  journey?: { title: string; description: string }[];
  outcome?: string;
  note?: string;
};

export const projects: Project[] = [
  {
    slug: "benin-royal-couture", name: "Bénin Royal Couture",
    category: "Mode · Couture sur mesure",
    url: "https://benin-royal-couture.houngbedjinono855.chatgpt.site/",
    image: "/images/portfolio/benin-royal-couture-portfolio.jpg", capturedAt: "13 octobre 2026", imageWidth: 1265, imageHeight: 712,
    intro: "Faire ressentir le savoir-faire. Donner envie de créer sa propre tenue.",
    description: "Bénin Royal Couture associe l’inspiration nigériane au savoir-faire béninois pour présenter des tenues de cérémonie sur mesure. Nous avons construit un univers qui donne autant de place à l’allure d’ensemble qu’aux broderies, aux matières et aux détails qui font la personnalité d’une tenue.",
    challenge: "Comment traduire une expérience de couture sur mesure en ligne ? Le visiteur doit pouvoir se projeter dans une tenue, reconnaître la signature de la maison et trouver un point de départ pour son propre projet, sans devoir connaître à l’avance toutes les possibilités de création.",
    focus: "Le parcours relie l’inspiration à la personnalisation : découvrir les silhouettes, apprécier les finitions, choisir une direction et engager la conversation autour d’une tenue.",
    work: [
      { title: "Positionnement & copywriting", description: "Nous avons articulé le message autour d’une promesse : une allure qui appartient à celui ou celle qui la porte. La signature « Inspiration nigériane. Signature béninoise. » situe la maison dès l’entrée. Les textes courts accompagnent les images, puis les invitations à agir évoluent avec le parcours : explorer, imaginer, composer et parler de sa tenue." },
      { title: "Direction artistique & design", description: "Le bordeaux profond, l’ivoire et les détails dorés prolongent les couleurs des tenues. Une typographie de grande taille installe la signature « L’allure royale », tandis que les portraits et les vues rapprochées donnent à voir les silhouettes et les finitions. La composition alterne mise en scène et détails pour raconter le travail de couture." },
      { title: "Parcours & personnalisation", description: "Nous avons organisé les créations en trois univers : à deux, pour lui et pour elle. La découverte se poursuit par le savoir-faire, puis par les choix de couleur, de silhouette et de détails. Cette progression aide le visiteur à préciser son envie avant d’entamer un échange avec la maison." },
      { title: "Intégration & mise en ligne", description: "Nous avons réuni ces contenus dans une page avec navigation par sections, carrousel de créations, accordéons de personnalisation et sélection de couleurs. Les appels à l’action jalonnent la découverte pour permettre d’entrer dans son projet depuis plusieurs moments du parcours." },
    ],
    journey: [
      { title: "Se projeter", description: "Découvrir l’allure de la maison et choisir un univers de création." },
      { title: "Préciser son envie", description: "Explorer les finitions, les couleurs et les possibilités de sur-mesure." },
      { title: "Engager son projet", description: "Accéder aux invitations à composer une tenue et à en discuter." },
    ],
    features: ["Trois univers de créations : duo, homme et femme", "Mise en valeur des broderies et des finitions", "Exploration des couleurs et du sur-mesure", "Appels à l’action adaptés aux étapes de découverte"],
    outcome: "Une vitrine qui relie l’identité de la maison à une démarche de création personnelle. Le visiteur dispose d’un fil conducteur pour passer d’une inspiration visuelle à une envie de tenue plus précise.",
  },
  {
    slug: "house-star", name: "House Star", category: "Immobilier · Catalogue de biens",
    url: "https://house-star-living.houngbedjinono855.chatgpt.site/",
    image: "/images/portfolio/house-star-portfolio.jpg", capturedAt: "13 octobre 2026", imageWidth: 1425, imageHeight: 792,
    intro: "Relier une envie d’habiter ou d’investir à un bien et à un contact.",
    description: "House Star présente des maisons, appartements, parcelles et immeubles à Cotonou et dans ses environs. Nous avons conçu une expérience de découverte qui associe une identité visuelle architecturale à une organisation pratique de l’offre immobilière.",
    challenge: "Une recherche immobilière commence par des attentes différentes : louer, acheter, bâtir ou investir. L’enjeu était de donner une entrée compréhensible à ces projets, puis de guider la découverte vers les informations d’un bien et une prise de contact.",
    focus: "La page d’accueil pose l’univers de l’agence ; le catalogue et les fiches de biens prennent ensuite le relais pour aider le visiteur à préciser sa recherche.",
    work: [
      { title: "Positionnement & copywriting", description: "Nous avons construit le message autour des projets de vie : « Des lieux pour vivre, bâtir, investir ». Les titres parlent d’abord de ce que le visiteur veut accomplir ; les textes expliquent ensuite les catégories de biens et la suite du parcours. Les invitations « Découvrir les biens » et « Parler de mon projet » donnent deux points d’entrée selon le niveau de maturité de la recherche." },
      { title: "Direction artistique & design", description: "L’architecture occupe le premier plan, avec une grande image d’accueil, une typographie ample et une composition aérée. Les cartes de biens regroupent localisation, type, prix et surface pour rendre les informations essentielles faciles à repérer. L’identité accompagne ainsi la projection tout en laissant de la place aux détails pratiques." },
      { title: "Organisation de l’offre & parcours", description: "Nous avons relié l’accueil au catalogue, aux fiches individuelles et au contact. Le parcours annoncé se déroule en trois temps : explorer selon ses critères, découvrir les informations d’un bien et envoyer une demande pour organiser la suite. Les liens vers les biens apparaissent à plusieurs endroits de l’accueil." },
      { title: "Intégration & mise en ligne", description: "Le site réunit une page de présentation, un catalogue de biens, des pages de détail et une page de contact. La navigation principale et le pied de page donnent accès aux mêmes destinations pour conserver des repères pendant la découverte." },
    ],
    journey: [
      { title: "Explorer", description: "Accéder aux biens à partir de son projet d’achat ou de location." },
      { title: "Découvrir", description: "Consulter la localisation, les caractéristiques et la présentation d’un bien." },
      { title: "Prendre contact", description: "Rejoindre la page de contact pour parler de sa recherche et de la suite." },
    ],
    features: ["Présentation de l’agence et de son univers immobilier", "Catalogue de maisons, appartements, parcelles et immeubles", "Fiches individuelles avec informations essentielles", "Accès direct au contact depuis la navigation et l’accueil"],
    outcome: "Une présentation immobilière organisée autour des questions du visiteur : quel type de lieu, quelles caractéristiques et quelle prochaine étape ? Le site relie la découverte de l’offre à une destination de contact clairement identifiée.",
    note: "La version présentée utilise des annonces, prix et visuels illustratifs. Les biens vérifiés de l’agence doivent les remplacer avant l’ouverture commerciale.",
  },
  {
    slug: "ibuilder", name: "iBuilder", category: "Formation · Atelier web & IA",
    url: "https://ibuilder-atelier-web-ia.houngbedjinono855.chatgpt.site/",
    image: "/images/portfolio/ibuilder-portfolio.jpg", capturedAt: "13 octobre 2026", imageWidth: 1265, imageHeight: 712,
    intro: "Rendre une formation concrète, du premier site à la première offre client.",
    description: "iBuilder présente un atelier pour apprendre à créer des sites avec l’IA et à proposer cette compétence à des clients. Nous avons travaillé l’ensemble de la page pour expliquer le programme, rendre les apprentissages concrets et accompagner les personnes intéressées vers une demande d’informations.",
    challenge: "Le sujet de l’IA peut sembler vaste ou abstrait à un débutant. L’enjeu était de montrer ce que l’on vient apprendre, comment le parcours se déroule et quelle place prend la recherche de clients, tout en répondant aux hésitations avant le premier échange.",
    focus: "La page avance de la promesse vers les compétences, les deux modules, les questions fréquentes et la prise de contact sur WhatsApp.",
    work: [
      { title: "Positionnement & copywriting", description: "Nous avons donné au programme une promesse immédiatement compréhensible : « Crée des sites. Trouve tes clients. » Le ton direct et le tutoiement s’adressent aux futurs builders. Chaque partie traduit la formation en actions : structurer une idée, créer une interface, mettre un site en ligne et présenter ses services." },
      { title: "Direction artistique & design", description: "Le bleu électrique, les grands titres et les compositions de sites installent un univers de création numérique. Les cartes rendent les compétences visibles ; les deux blocs Dev et Client distinguent les apprentissages techniques de la construction d’une offre. La hiérarchie visuelle permet de retrouver les grandes étapes du programme." },
      { title: "Pédagogie & parcours utilisateur", description: "Nous avons organisé la page pour répondre progressivement aux questions du visiteur : ce qu’il saura faire, ce qu’il travaillera dans chaque module et comment il pourra commencer. Les situations de débutants, la présentation de la communauté et la FAQ accompagnent cette compréhension avant la demande d’informations." },
      { title: "Intégration & mise en ligne", description: "La page relie le programme, les outils, la communauté et la section de contact par une navigation interne. Une FAQ dépliable permet de consulter les réponses utiles ; le lien WhatsApp prépare une demande sur les modalités du prochain atelier. Un contrôle de pause des animations est également proposé." },
    ],
    journey: [
      { title: "Comprendre", description: "Identifier les compétences à acquérir et les deux modules de l’atelier." },
      { title: "Se rassurer", description: "Retrouver les questions de débutants et découvrir l’esprit de la communauté." },
      { title: "Demander les modalités", description: "Ouvrir WhatsApp avec une demande préparée sur le prochain atelier." },
    ],
    features: ["Programme organisé en modules Dev et Client", "Présentation des compétences, outils et de la communauté", "FAQ pour les questions avant participation", "Lien WhatsApp avec message de demande prérempli"],
    outcome: "Une page qui donne une forme concrète à la formation et relie chaque étape de lecture à la suivante. Le visiteur peut découvrir le programme, éclaircir ses questions et demander les modalités depuis une destination de contact unique.",
    note: "Les dates, le tarif et le format de la prochaine session sont à demander à l’équipe iBuilder. La présentation du programme ne garantit pas l’obtention d’un client à l’issue de l’atelier.",
  },
  {
    slug: "albi-international", name: "ALBI International", category: "Association · Sensibilisation",
    url: "https://www.albi-international.org/", image: "/images/portfolio/albi-portfolio.jpg", capturedAt: "25 septembre 2026", imageWidth: 1348, imageHeight: 926,
    intro: "Donner une présence digitale à une cause et à ses actions.",
    description: "Un site associatif consacré aux droits et à la dignité des personnes atteintes d’albinisme au Bénin. Il présente la mission, les actions et les possibilités de soutien.",
    focus: "Une hiérarchie éditoriale qui fait comprendre la cause, présente les programmes et accompagne le visiteur vers une prise de contact ou un soutien.",
    features: ["Présentation de la mission et de l’histoire de l’association", "Pages consacrées aux actions et à la sensibilisation", "Parcours pour soutenir et contacter l’association", "Navigation disponible en français et en anglais"],
  },
];
