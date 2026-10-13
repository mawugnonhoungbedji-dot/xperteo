import { BrandStage, type BrandScene } from "./brand-visual";

const campaigns = {
  about: ["face", "LA CONVICTION XPERTEO", "Une expertise. Une conviction.", "Relier le contenu, le design et la recherche pour rapprocher votre activité des personnes qu’elle peut aider.", "XPERTEO.", "Clarté.", "Confiance.", "#conviction", "Découvrir notre conviction"],
  resources: ["reading", "RESSOURCES · STRATÉGIE · ACTION", "Lire. Comprendre. Avancer.", "Des guides ouverts pour poser les bonnes questions et transformer vos lectures en décisions utiles.", "SAVOIR.", "Des repères.", "Vos décisions.", "#bibliotheque", "Explorer les guides"],
  contact: ["calling", "CONTACT · ÉCOUTE · COLLABORATION", "Un échange. Un premier cap.", "Partagez votre activité et votre objectif. Nous précisons ensemble le contexte et les prochaines étapes.", "PARLONS.", "Votre projet.", "Notre écoute.", "#contact-form", "Décrire mon projet"],
  diagnostic: ["drone", "DIAGNOSTIC · ANALYSE · PRIORITÉS", "Prendre du recul. Voir plus clair.", "Un premier regard humain sur votre présence digitale pour identifier ce qui mérite votre attention.", "CLARTÉ.", "Votre contexte.", "Vos priorités.", "#diagnostic-form", "Demander mon diagnostic"],
  faq: ["seated", "QUESTIONS · RÉPONSES · CLARTÉ", "Les bonnes questions. Des réponses claires.", "Budget, méthode, refonte et suivi : les repères pour préparer votre projet avec XpertEO.", "RÉPONSES.", "Vos questions.", "Nos réponses.", "#questions", "Consulter les réponses"],
  projects: ["profile", "RÉALISATIONS · DESIGN · PARCOURS", "Des univers singuliers. Un fil conducteur.", "Découvrez comment les messages, le design et le développement travaillent ensemble dans nos réalisations.", "PROJETS.", "Des idées.", "Des parcours.", "#projets", "Voir les réalisations"],
  project: ["profile", "CONTEXTE · CONCEPTION · RÉALISATION", "Chaque projet a sa perspective.", "Un public, une offre, un parcours : explorez les choix qui donnent sa direction à cette réalisation.", "VISION.", "Le besoin.", "Les choix.", "#contexte", "Explorer le projet"],
  article: ["reading", "LECTURE · REPÈRES · APPLICATION", "Une idée à lire. Des repères à appliquer.", "Prenez le temps de comprendre, puis confrontez les conseils du guide à votre propre activité.", "SAVOIR.", "Comprendre.", "Appliquer.", "#lecture", "Commencer la lecture"],
  expertise: ["point-left", "EXPERTISE · STRATÉGIE · ACQUISITION", "Le bon levier. Pour votre activité.", "Un périmètre adapté à votre contexte, des livrables définis et des décisions expliquées.", "LEVIER.", "Votre besoin.", "Notre approche.", "/diagnostic", "Identifier mes priorités"],
  privacy: ["silence", "DONNÉES · TRANSPARENCE · CHOIX", "Vos données. Des repères clairs.", "Retrouvez les informations sur le traitement des demandes et les modalités de contact concernant vos données.", "CLARTÉ.", "Vos données.", "Vos choix.", "#donnees", "Lire la politique"],
  terms: ["law", "ÉDITEUR · COORDONNÉES · INFORMATIONS", "Une présence. Un cadre lisible.", "Les coordonnées de l’éditeur, les prestataires du site et les informations utiles pour comprendre ce cadre.", "REPÈRES.", "L’éditeur.", "Le cadre.", "#informations", "Lire les informations"],
} as const;

export type CampaignKey = keyof typeof campaigns;

export function PageCampaign({ kind, href: overrideHref }: { kind: CampaignKey; href?: string }) {
  const [scene, label, title, description, word, first, second, href, action] = campaigns[kind];
  return <BrandStage scene={scene as BrandScene} label={label} title={title} description={description}
    framing="waist" theme={["resources", "article", "diagnostic", "privacy"].includes(kind) ? "lime" : ["contact", "projects", "project", "faq"].includes(kind) ? "mixed" : "violet"}
    word={word} orbits={[first, second]} href={overrideHref || href} action={action} id={`campaign-${kind}`} />;
}
