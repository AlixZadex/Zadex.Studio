"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/lib/i18n/LanguageContext";
import { useLocalizedPath } from "@/lib/i18n/useLocalizedPath";
import type { MessageKey } from "@/lib/i18n/messages";

const itemKeys = [
  { title: "servicesIntro.item1.title", body: "servicesIntro.item1.body" },
  { title: "servicesIntro.item2.title", body: "servicesIntro.item2.body" },
  { title: "servicesIntro.item3.title", body: "servicesIntro.item3.body" },
] as const satisfies readonly { title: MessageKey; body: MessageKey }[];

export function ServicesIntro() {
  const { t } = useLocale();
  const lp = useLocalizedPath();

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={t("servicesIntro.eyebrow")}
            title={t("servicesIntro.title")}
            description={t("servicesIntro.description")}
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {itemKeys.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="h-full rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 transition duration-300 hover:border-accent/25 hover:bg-white/[0.04]">
                <div className="mb-6 h-px w-12 bg-accent/60" />
                <h3 className="font-display text-xl text-white">{t(item.title)}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">{t(item.body)}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <Button href={lp("/services")} variant="secondary">
            {t("servicesIntro.explore")}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
