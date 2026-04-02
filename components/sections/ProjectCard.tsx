"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n/LanguageContext";
import { useLocalizedPath } from "@/lib/i18n/useLocalizedPath";
import { getProjectCopy, type Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
  index?: number;
};

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const { locale, t } = useLocale();
  const lp = useLocalizedPath();
  const { category, summary } = getProjectCopy(project, locale);
  const href = project.url ?? lp("/contact");
  const isExternal = Boolean(project.url);
  const githubHref = project.github;
  const images = project.gallery?.length ? project.gallery : project.image ? [project.image] : [];
  const hasGallery = images.length > 1;
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const goToPreviousImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div
        className={`relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br ${project.gradient} p-1 transition duration-500 group-hover:border-accent/25`}
      >
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-tr ${project.accent} opacity-0 transition duration-500 group-hover:opacity-100`}
        />
        <div className="relative aspect-[16/10] overflow-hidden rounded-[1.35rem] bg-black/40">
          {images.length ? (
            <Image
              src={images[activeImageIndex]}
              alt={`${project.name} preview ${activeImageIndex + 1}`}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover object-top transition duration-700 group-hover:scale-[1.02]"
            />
          ) : null}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_45%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
          <div className="absolute inset-0 flex items-end p-6 sm:p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{category}</p>
              <h3 className="mt-2 font-display text-2xl tracking-tight text-white sm:text-3xl">{project.name}</h3>
            </div>
          </div>
          <div className="absolute right-6 top-6 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-white/70 backdrop-blur">
            {isExternal ? t("project.liveSite") : t("project.caseStudy")}
          </div>

          {hasGallery ? (
            <>
              <button
                type="button"
                onClick={goToPreviousImage}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/45 px-3 py-2 text-sm text-white transition hover:bg-black/70"
                aria-label={t("project.prevImage")}
              >
                ←
              </button>
              <button
                type="button"
                onClick={goToNextImage}
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/45 px-3 py-2 text-sm text-white transition hover:bg-black/70"
                aria-label={t("project.nextImage")}
              >
                →
              </button>
              <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
                {images.map((_, imageIndex) => (
                  <button
                    key={`${project.slug}-dot-${imageIndex}`}
                    type="button"
                    onClick={() => setActiveImageIndex(imageIndex)}
                    className={`h-2.5 w-2.5 rounded-full transition ${
                      imageIndex === activeImageIndex ? "bg-white" : "bg-white/45 hover:bg-white/70"
                    }`}
                    aria-label={`${t("project.showImage")} ${imageIndex + 1}`}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>
        <div className="relative px-6 py-6 sm:px-8 sm:py-7">
          <p className="text-sm leading-relaxed text-muted">{summary}</p>
          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <Link
                href={href}
                className="inline-flex items-center gap-2 text-sm font-medium text-accent transition hover:gap-3"
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
              >
                {isExternal ? t("project.view") : t("project.discuss")}
                <span aria-hidden>→</span>
              </Link>
              {githubHref ? (
                <Link
                  href={githubHref}
                  className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("project.github")}
                  <span aria-hidden>↗</span>
                </Link>
              ) : null}
            </div>
            {hasGallery ? (
              <p className="text-xs uppercase tracking-widest text-white/50">
                {activeImageIndex + 1}/{images.length}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
