export type NarratedSection = { id: string; selector: string; title: string; text: string };

// These short scripts are also the source text for future recorded voiceovers.
export const homeNarration: NarratedSection[] = [
  { id: "welcome", selector: ".hero", title: "Bienvenue chez XpertEO", text: "Votre prochain client vous cherche peut-être déjà. Chez Xpert E O, nous aidons les petites et moyennes entreprises à être trouvées, comprises et choisies. Depuis le Bénin, notre équipe relie votre site, votre visibilité et vos objectifs commerciaux. Découvrez comment votre présence en ligne peut devenir un levier pour votre activité." },
  { id: "approach", selector: "#system", title: "Trouvés, compris, choisis", text: "Une présence en ligne, c’est un début. Pour aller plus loin, trois étapes doivent fonctionner ensemble. Être trouvé par les personnes qui vous cherchent. Être compris, avec une offre claire et une expertise lisible. Puis être choisi, en donnant confiance et en facilitant le premier contact." },
  { id: "expertise-stage", selector: 'main > section[aria-labelledby="brand-stage-title"]', title: "Votre expertise au premier plan", text: "Votre expertise mérite le premier plan. Notre rôle est de relier ce que vous savez faire aux personnes qui en ont besoin. De la première recherche au premier contact, nous construisons une présence claire et cohérente, pensée pour votre activité." },
  { id: "services", selector: ".expertise", title: "Nos expertises", text: "Tout est lié. Le référencement naturel et la visibilité dans les réponses des intelligences artificielles sont au cœur de notre accompagnement. Selon vos besoins, nous travaillons aussi le site, les contenus, la recherche locale et la conversion. Vous pouvez ouvrir chaque expertise pour découvrir ce qu’elle apporte à votre projet." },
  { id: "method", selector: ".method", title: "Notre méthode", text: "Notre méthode commence par comprendre votre offre, vos clients et leurs questions. Nous structurons ensuite un parcours lisible, avec les bonnes réponses et les preuves utiles. Enfin, nous construisons un site adapté au mobile, avec une identité affirmée et une base technique solide. Chaque étape suit une direction claire." },
  { id: "projects", selector: ".content-section", title: "Nos réalisations", text: "Voici quelques réalisations, dans des univers différents : la couture, l’immobilier, la formation et la sensibilisation. Chaque projet part d’une activité et d’un objectif précis. Ouvrez une réalisation pour découvrir son contexte, les choix de conception et le travail effectué." },
  { id: "trust", selector: ".promise", title: "Une relation de confiance", text: "La confiance se construit avec des choix expliqués et des preuves vérifiables. Nous ne promettons ni une première place garantie, ni une citation assurée par une intelligence artificielle. Nous définissons un périmètre clair, une méthode et des indicateurs utiles pour suivre le travail." },
  { id: "questions", selector: ".faq", title: "Vos questions", text: "Vous avez déjà un site ? Vous souhaitez comprendre le diagnostic, le budget ou notre façon de travailler à distance ? Cette section répond aux premières questions. Ouvrez celle qui vous intéresse, ou consultez la page des questions fréquentes pour aller plus loin." },
  { id: "contact", selector: 'section[aria-labelledby="brand-stage-low-angle"]', title: "Le prochain pas", text: "Votre prochain atout commence ici. Partagez votre activité et votre objectif avec nous. Le diagnostic permet de faire le point et de définir ensemble le prochain pas utile. Si vous souhaitez échanger, le bouton Demander mon diagnostic vous guidera vers la suite." },
];

export function mostVisibleSection(rects: { top: number; bottom: number }[], viewportHeight: number): number {
  const top = viewportHeight * 0.15;
  const bottom = viewportHeight * 0.85;
  let best = -1;
  let bestOverlap = 0;
  rects.forEach((rect, index) => {
    const overlap = Math.max(0, Math.min(rect.bottom, bottom) - Math.max(rect.top, top));
    if (overlap > bestOverlap) { best = index; bestOverlap = overlap; }
  });
  return best;
}
