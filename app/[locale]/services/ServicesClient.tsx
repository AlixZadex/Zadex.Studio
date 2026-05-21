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
  { title: "services.s1.title", description: "services.s1.description", value: "services.s1.value", token: "AI" },
  { title: "services.s2.title", description: "services.s2.description", value: "services.s2.value", token: "AUTO" },
  { title: "services.s3.title", description: "services.s3.description", value: "services.s3.value", token: "BOT" },
  { title: "services.s4.title", description: "services.s4.description", value: "services.s4.value", token: "LP" },
  { title: "services.s5.title", description: "services.s5.description", value: "services.s5.value", token: "OPS" },
  { title: "services.s6.title", description: "services.s6.description", value: "services.s6.value", token: "CMS" },
  { title: "services.s7.title", description: "services.s7.description", value: "services.s7.value", token: "SaaS" },
] as const satisfies readonly { title: MessageKey; description: MessageKey; value: MessageKey; token: string }[];

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
          <div className="grid gap-5 md:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.04}>
                <article className="group relative h-full overflow-hidden rounded-[2rem] border border-slate-950/[0.09] bg-white/70 p-7 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-cyan-200/25 sm:p-8">
                  <div className="edge-light absolute left-8 right-8 top-0 h-px opacity-0 transition group-hover:opacity-100" />
                  <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl transition group-hover:bg-violet-400/14" />
                  <div className="relative flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-950/10 bg-background/75 text-xs font-semibold text-accent shadow-[0_0_36px_rgba(110,231,255,0.12)]">
                      {s.token}
                    </div>
                    <div>
                      <h2 className="font-display text-2xl text-slate-950">{t(s.title)}</h2>
                      <p className="mt-4 text-base leading-relaxed text-muted">{t(s.description)}</p>
                      <p className="mt-6 border-l border-cyan-200/30 pl-5 text-sm leading-relaxed text-slate-950/82">{t(s.value)}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-950/[0.06] bg-gradient-to-b from-surface to-background py-16 sm:py-24">
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


