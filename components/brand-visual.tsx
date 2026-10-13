import Image from "next/image";
import Link from "@/components/site-link";

const scenes = {
  drone: ["Un autre point de vue", "Personnage de campagne XpertEO en tenue violette, photographié du dessus, le regard vers la caméra."],
  "point-left": ["La bonne direction", "Personnage XpertEO qui indique les expertises à sa gauche."],
  profile: ["Une vision qui avance", "Portrait de profil du personnage de campagne en veste XpertEO."],
  "low-angle": ["À la hauteur de vos ambitions", "Vue en contre-plongée, des baskets à la tête, du personnage en tenue XpertEO."],
  face: ["Une conviction, un visage", "Portrait de face du personnage de campagne XpertEO."],
  "point-right": ["Votre prochain levier", "Personnage XpertEO qui pointe vers la droite pour guider le regard."],
  walking: ["Un cap. Puis le prochain pas.", "Personnage XpertEO en marche, photographié de trois quarts."],
  seated: ["On en parle ?", "Personnage de campagne XpertEO assis dans une posture accueillante."],
  reading: ["Lire pour avancer", "Personnage XpertEO en train de lire un document."],
  calling: ["Un premier échange", "Personnage XpertEO souriant, un téléphone à l’oreille."],
  law: ["Un cadre clair", "Personnage de campagne XpertEO en robe d’avocat, tenant un dossier."],
  silence: ["Vos données, avec discrétion", "Gros plan du personnage XpertEO, un index posé sur les lèvres."],
  computer: ["De l’idée à l’écran", "Personnage XpertEO travaillant devant un ordinateur portable."],
} as const;

export type BrandScene = keyof typeof scenes;
const depthWords: Record<BrandScene, string> = {
  drone: "CHOISIS.", "point-left": "LEVIER.", profile: "VISION.",
  "low-angle": "PLUS HAUT.", face: "XPERTEO.", "point-right": "EXPERTISE.",
  walking: "LE CAP.", seated: "PARLONS.",
  reading: "SAVOIR.", calling: "PARLONS.",
  law: "DROIT.", silence: "PRIVÉ.", computer: "PROJETS.",
};

export function BrandVisual({ scene, className = "", priority = false, caption = true, variant = "cutout", depth = true }: {
  scene: BrandScene;
  className?: string;
  priority?: boolean;
  caption?: boolean;
  variant?: "photo" | "cutout";
  depth?: boolean;
}) {
  const assetName = scene === "silence" ? "silence-v2" : scene;
  return <figure className={`brand-visual brand-${scene} brand-${variant} ${className}`}>
    {variant === "cutout" && depth && <span className="brand-depth-word" aria-hidden="true">{depthWords[scene]}</span>}
    <Image src={`/images/brand/${assetName}${variant === "cutout" ? ".cutout" : ""}.4k.webp`} alt={scenes[scene][1]} fill priority={priority}
      sizes={variant === "photo" || depth ? "(max-width: 800px) 100vw, (max-width: 1200px) 45vw, 560px" : "(max-width: 800px) 100vw, (max-width: 1200px) 90vw, 1100px"} quality={95} />
    {variant === "photo" && <span className="brand-frame-label" aria-hidden="true">XPERTEO / PERSPECTIVES</span>}
    {caption && variant === "photo" && <figcaption><span>{scenes[scene][0]}</span><span aria-hidden="true">↗</span></figcaption>}
  </figure>;
}

export function BrandStage({ scene = "drone", label = "SEO · VISIBILITÉ IA · ACQUISITION", title = <>Votre expertise mérite<br />le premier plan.</>,
  description = "Relier ce que vous savez faire aux personnes qui vous cherchent. Une présence claire, de la recherche au premier contact.",
  word, orbits = ["Trouvés.", "Compris."], href = "/diagnostic", action = "Mettre mon site au premier plan", id, theme = "violet", framing,
}: {
  scene?: BrandScene; label?: string; title?: React.ReactNode; description?: string; word?: string;
  orbits?: readonly [string, string]; href?: string; action?: string; id?: string;
  theme?: "violet" | "lime" | "mixed";
  framing?: "full" | "waist";
} = {}) {
  const titleId = id || (scene === "drone" ? "brand-stage-title" : `brand-stage-${scene}`);
  const stageWord = word || depthWords[scene];
  const wordSize = stageWord.length <= 6 ? "37cqw" : stageWord.length <= 7 ? "31cqw" : stageWord.length <= 8 ? "27cqw" : stageWord.length <= 9 ? "24cqw" : "21cqw";
  const frame = framing || (scene === "low-angle" || (scene === "drone" && !id) ? "full" : "waist");
  return <section className={`brand-stage brand-stage-${scene} brand-stage-${frame} brand-stage-theme-${theme}`} aria-labelledby={titleId} style={{ "--stage-word-size": wordSize } as React.CSSProperties}>
    <div className="brand-stage-heading"><span className="eyebrow">{label}</span>
      <h2 id={titleId}>{title}</h2>
    </div>
    <div className="brand-stage-scene"><span className="brand-stage-word" aria-hidden="true">{stageWord}</span>
      <BrandVisual scene={scene} depth={false} caption={false} />
      <span className="brand-orbit brand-orbit-one" aria-hidden="true">{orbits[0]}</span>
      <span className="brand-orbit brand-orbit-two" aria-hidden="true">{orbits[1]}</span>
    </div>
    <div className="brand-stage-foot"><p>{description}</p>
      <Link href={href} className="button lime">{action} <span aria-hidden="true">↗</span></Link>
    </div>
  </section>;
}

export function BrandBanner({ scene, label, title, description }: {
  scene: BrandScene;
  label: string;
  title: string;
  description: string;
}) {
  return <BrandStage scene={scene} label={label} title={title} description={description}
    theme={scene === "walking" ? "lime" : "violet"}
    orbits={scene === "walking" ? ["Un cap.", "Des étapes."] : ["Votre besoin.", "Le bon levier."]}
    href={scene === "walking" ? "#etapes" : "#expertises"} action={scene === "walking" ? "Explorer les étapes" : "Explorer les expertises"} />;
}
