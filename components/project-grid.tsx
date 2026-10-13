"use client";

import Image from "next/image";
import Link from "./site-link";
import { projects } from "@/lib/projects";
import { motion } from "motion/react";

export function ProjectGrid() {
  return (
    <div className="project-grid">
      {projects.map((p, i) => (
        <motion.article
          className="project-card"
          key={p.slug}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            className="project-visual"
            href={"/case-studies/" + p.slug}
            aria-label={"Découvrir le projet " + p.name}
          >
            <div className="project-topline">
              <span>0{i + 1} / {p.name}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </div>
            <Image
              src={p.image}
              alt={"Capture de la page d’accueil de " + p.name}
              width={p.imageWidth || 1348}
              height={p.imageHeight || 928}
              sizes="(max-width: 800px) 100vw, 50vw"
            />
          </Link>
          <div className="project-copy">
            <span className="eyebrow">{p.category}</span>
            <h3>
              <Link href={"/case-studies/" + p.slug}>{p.name}</Link>
            </h3>
            <p>{p.intro}</p>
            <span className="project-scope">Copywriting · Design · Développement</span>
            <Link className="underlink" href={"/case-studies/" + p.slug}>
              Découvrir le projet →
            </Link>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
