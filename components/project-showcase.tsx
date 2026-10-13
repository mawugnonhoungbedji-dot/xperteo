import Image from "next/image";
import Link from "@/components/site-link";
import { BrandVisual } from "@/components/brand-visual";
import { projects } from "@/lib/projects";

export function ProjectShowcase() {
  return <section className="brand-stage brand-stage-theme-mixed project-showcase" aria-labelledby="campaign-projects" style={{ "--stage-word-size": "27cqw" } as React.CSSProperties}>
    <div className="brand-stage-heading">
      <span className="eyebrow">NOS RÉALISATIONS</span>
      <h1 id="campaign-projects">Des idées différentes.<br />Une même exigence.</h1>
      <p>Couture, immobilier, formation, engagement associatif : nous relions le copywriting, le design et le développement pour construire des parcours adaptés à chaque activité.</p>
    </div>
    <div className="brand-stage-scene">
      <span className="brand-stage-word" aria-hidden="true">PROJETS.</span>
      <div className="project-backdrops" aria-hidden="true">
        {projects.slice(0, 3).map((project, index) => <div className={`project-backdrop-card project-backdrop-${index + 1}`} key={project.slug}>
          <div className="project-browser-bar"><span>● ● ●</span><span>{project.name}</span><span>↗</span></div>
          <Image src={project.image} alt="" width={project.imageWidth} height={project.imageHeight} sizes="(max-width: 800px) 42vw, 380px" quality={85} priority />
        </div>)}
      </div>
      <BrandVisual scene="computer" depth={false} caption={false} priority />
      <span className="brand-orbit brand-orbit-one" aria-hidden="true">De l’idée.</span>
      <span className="brand-orbit brand-orbit-two" aria-hidden="true">À l’écran.</span>
    </div>
    <div className="brand-stage-foot"><p>Des univers singuliers. Des expériences sur mesure.</p>
      <Link href="#projets" className="button lime">Explorer les réalisations <span aria-hidden="true">↓</span></Link>
    </div>
  </section>;
}
