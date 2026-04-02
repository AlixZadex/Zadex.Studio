"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { useLocale } from "@/lib/i18n/LanguageContext";
import { useLocalizedPath } from "@/lib/i18n/useLocalizedPath";
import type { MessageKey } from "@/lib/i18n/messages";

const services = [
  {
    keys: {
      title: "services.s1.title",
      description: "services.s1.description",
      value: "services.s1.value",
    } as const satisfies { title: MessageKey; description: MessageKey; value: MessageKey },
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
        <path strokeWidth="1.5" d="M4 7h16M4 12h10M4 17h16" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    keys: {
      title: "services.s2.title",
      description: "services.s2.description",
      value: "services.s2.value",
    } as const,
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
        <path strokeWidth="1.5" d="M7 17V7h10v10H7Z" strokeLinejoin="round" />
        <path strokeWidth="1.5" d="M4 20h16" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    keys: {
      title: "services.s3.title",
      description: "services.s3.description",
      value: "services.s3.value",
    } as const,
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
        <path strokeWidth="1.5" d="M12 3v3M5.6 5.6l2.1 2.1M3 12h3M5.6 18.4l2.1-2.1M12 18v3M18.4 18.4l-2.1-2.1M21 12h-3M18.4 5.6l-2.1 2.1" strokeLinecap="round" />
        <path strokeWidth="1.5" d="M12 8a4 4 0 1 0 4 4" />
      </svg>
    ),
  },
  {
    keys: {
      title: "services.s4.title",
      description: "services.s4.description",
      value: "services.s4.value",
    } as const,
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
        <path strokeWidth="1.5" d="M8 9l-3 3 3 3M16 15l3-3-3-3" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeWidth="1.5" d="M13.5 6l-3 12" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    keys: {
      title: "services.s5.title",
      description: "services.s5.description",
      value: "services.s5.value",
    } as const,
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
        <path strokeWidth="1.5" d="M4 5h16v14H4z" strokeLinejoin="round" />
        <path strokeWidth="1.5" d="M8 9h8M8 13h5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function ServicesClient() {
  const { t } = useLocale();
  const lp = useLocalizedPath();

  return (
    <>
      <PageHero
        eyebrow={t("services.hero.eyebrow")}
        title={t("services.hero.title")}
        description={t("services.hero.description")}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-8 lg:gap-10">
            {services.map((s, i) => (
              <Reveal key={s.keys.title} delay={i * 0.04}>
                <article className="grid gap-8 rounded-[2rem] border border-white/[0.08] bg-white/[0.02] p-8 transition duration-300 hover:border-accent/20 sm:grid-cols-[auto_1fr] sm:p-10 lg:gap-12">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-accent/10 text-accent">
                    {s.icon}
                  </div>
                  <div>
                    <h2 className="font-display text-2xl text-white">{t(s.keys.title)}</h2>
                    <p className="mt-4 text-base leading-relaxed text-muted">{t(s.keys.description)}</p>
                    <p className="mt-6 border-l border-accent/40 pl-5 text-sm leading-relaxed text-white/80">{t(s.keys.value)}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-white/[0.06] bg-surface py-16 sm:py-24">
        <Container className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <Reveal className="max-w-xl">
            <SectionHeading title={t("services.bottom.title")} description={t("services.bottom.description")} />
          </Reveal>
          <Reveal>
            <Button href={lp("/contact")}>{t("services.bottom.button")}</Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
