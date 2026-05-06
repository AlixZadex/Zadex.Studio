"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { useLocale } from "@/lib/i18n/LanguageContext";
import { useLocalizedPath } from "@/lib/i18n/useLocalizedPath";
import type { MessageKey } from "@/lib/i18n/messages";

const stepKeys = [
  { step: "01", title: "process.step1.title", text: "process.step1.text" },
  { step: "02", title: "process.step2.title", text: "process.step2.text" },
  { step: "03", title: "process.step3.title", text: "process.step3.text" },
  { step: "04", title: "process.step4.title", text: "process.step4.text" },
  { step: "05", title: "process.step5.title", text: "process.step5.text" },
] as const satisfies readonly { step: string; title: MessageKey; text: MessageKey }[];

export function ProcessClient() {
  const { t } = useLocale();
  const lp = useLocalizedPath();

  return (
    <>
      <PageHero
        eyebrow={t("process.hero.eyebrow")}
        title={t("process.hero.title")}
        description={t("process.hero.description")}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="space-y-6">
            {stepKeys.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.05}>
                <div className="group relative grid gap-6 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.02] p-8 transition duration-300 hover:border-accent/25 sm:grid-cols-[88px_1fr] sm:items-start sm:p-10">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_50%,rgba(200,255,61,0.10),transparent_42%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="font-display text-sm text-accent">{s.step}</div>
                  <div>
                    <h2 className="font-display text-2xl text-white">{t(s.title)}</h2>
                    <p className="mt-4 text-base leading-relaxed text-muted">{t(s.text)}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-white/[0.06] bg-gradient-to-b from-surface to-background py-16 sm:py-24">
        <Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <Reveal className="max-w-xl">
            <h2 className="font-display text-display-lg text-white">{t("process.bottom.title")}</h2>
            <p className="mt-4 text-lg text-muted">{t("process.bottom.body")}</p>
          </Reveal>
          <Reveal>
            <Button href={lp("/contact")}>{t("process.bottom.button")}</Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
