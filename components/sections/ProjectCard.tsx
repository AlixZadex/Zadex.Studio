"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
  index?: number;
};

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <Link href="/contact" className="block">
        <div
          className={`relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br ${project.gradient} p-1 transition duration-500 group-hover:border-accent/25`}
        >
          <div
            className={`pointer-events-none absolute inset-0 bg-gradient-to-tr ${project.accent} opacity-0 transition duration-500 group-hover:opacity-100`}
          />
          <div className="relative aspect-[16/10] overflow-hidden rounded-[1.35rem] bg-black/40">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_45%)]" />
            <div className="absolute inset-0 flex items-end p-6 sm:p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{project.category}</p>
                <h3 className="mt-2 font-display text-2xl tracking-tight text-white sm:text-3xl">{project.name}</h3>
              </div>
            </div>
            <div className="absolute right-6 top-6 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-white/70 backdrop-blur">
              Case study
            </div>
          </div>
          <div className="relative px-6 py-6 sm:px-8 sm:py-7">
            <p className="text-sm leading-relaxed text-muted">{project.summary}</p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent transition group-hover:gap-3">
              Discuss a similar build
              <span aria-hidden>→</span>
            </p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
