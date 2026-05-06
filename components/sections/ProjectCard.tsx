"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
  const { category, summary, outcome, challenge, solution } = getProjectCopy(project, locale);
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
    <article className="group relative transition-transform duration-300 hover:-translate-y-1">
      <div
        className={`relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br ${project.gradient} p-1 transition duration-500 group-hover:border-accent/25 group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]`}
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
              quality={72}
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
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
          {outcome ? (
            <div className="mt-5 rounded-2xl border border-accent/20 bg-accent/10 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.15em] text-accent/90">Outcome</p>
              <p className="mt-1 text-sm text-white/90">{outcome}</p>
            </div>
          ) : null}
          {challenge || solution ? (
            <div className="mt-4 grid gap-3 text-xs text-white/75 sm:grid-cols-2">
              {challenge ? (
                <div className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5">
                  <p className="uppercase tracking-[0.12em] text-white/45">Challenge</p>
                  <p className="mt-1 leading-relaxed">{challenge}</p>
                </div>
              ) : null}
              {solution ? (
                <div className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5">
                  <p className="uppercase tracking-[0.12em] text-white/45">Solution</p>
                  <p className="mt-1 leading-relaxed">{solution}</p>
                </div>
              ) : null}
            </div>
          ) : null}
          {project.tech?.length ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <li key={`${project.slug}-${item}`} className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-white/65">
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
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
    </article>
  );
}
