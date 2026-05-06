"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { useLocale } from "@/lib/i18n/LanguageContext";

export function AboutClient() {
  const { t } = useLocale();

  return (
    <>
      <PageHero
        eyebrow={t("about.hero.eyebrow")}
        title={t("about.hero.title")}
        description={t("about.hero.description")}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <Reveal>
              <h2 className="font-display text-display-lg text-white">{t("about.believe.title")}</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">{t("about.believe.p1")}</p>
              <p className="mt-6 text-lg leading-relaxed text-muted">{t("about.believe.p2")}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.02] p-8 sm:p-10">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(200,255,61,0.12),transparent_50%)]" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{t("about.mission.label")}</p>
                <p className="mt-4 text-xl leading-relaxed text-white">{t("about.mission.body")}</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-y border-white/[0.06] bg-gradient-to-b from-surface to-background py-16 sm:py-24">
        <Container>
          <Reveal>
            <h2 className="max-w-3xl font-display text-display-lg text-white">{t("about.story.title")}</h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">{t("about.story.p1")}</p>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">{t("about.story.p2")}</p>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-3">
            <Reveal>
              <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7">
                <h2 className="font-display text-2xl text-white">{t("about.col1.title")}</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted">{t("about.col1.body")}</p>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7">
                <h2 className="font-display text-2xl text-white">{t("about.col2.title")}</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted">{t("about.col2.body")}</p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7">
                <h2 className="font-display text-2xl text-white">{t("about.col3.title")}</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted">{t("about.col3.body")}</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
