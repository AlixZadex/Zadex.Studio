"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { useLocale } from "@/lib/i18n/LanguageContext";
import { useLocalizedPath } from "@/lib/i18n/useLocalizedPath";
import { projects } from "@/lib/projects";

export function FeaturedProjects() {
  const { t } = useLocale();
  const lp = useLocalizedPath();
  const featured = projects.slice(0, 3);

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <SectionHeading
              eyebrow={t("featured.eyebrow")}
              title={t("featured.title")}
              description={t("featured.description")}
            />
          </Reveal>
          <Reveal>
            <Button href={lp("/projects")} variant="secondary">
              {t("featured.allProjects")}
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {featured.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>

        <Reveal className="mt-10 text-sm text-muted">
          {t("featured.hint")}{" "}
          <Link href={lp("/contact")} className="text-white underline-offset-4 hover:text-accent hover:underline">
            {t("featured.hintLink")}
          </Link>
          .
        </Reveal>
      </Container>
    </section>
  );
}
