"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { useLocale } from "@/lib/i18n/LanguageContext";
import { useLocalizedPath } from "@/lib/i18n/useLocalizedPath";
import { projects } from "@/lib/projects";

export function ProjectsClient() {
  const { t } = useLocale();
  const lp = useLocalizedPath();

  return (
    <>
      <PageHero
        eyebrow={t("projects.hero.eyebrow")}
        title={t("projects.hero.title")}
        description={t("projects.hero.description")}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-950/[0.06] bg-gradient-to-b from-transparent to-white/[0.03] py-16 sm:py-24">
        <Container>
          <div className="relative flex flex-col gap-8 overflow-hidden rounded-[2rem] border border-slate-950/[0.08] bg-white/70 p-10 sm:flex-row sm:items-center sm:justify-between sm:p-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_50%,rgba(200,255,61,0.12),transparent_45%)]" />
            <Reveal className="max-w-xl">
              <SectionHeading title={t("projects.cta.title")} description={t("projects.cta.description")} />
            </Reveal>
            <Reveal>
              <Button href={lp("/contact")}>{t("projects.cta.button")}</Button>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}


