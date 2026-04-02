"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLocale } from "@/lib/i18n/LanguageContext";
import type { MessageKey } from "@/lib/i18n/messages";

const reasonKeys = [
  { title: "why.r1.title", text: "why.r1.text" },
  { title: "why.r2.title", text: "why.r2.text" },
  { title: "why.r3.title", text: "why.r3.text" },
] as const satisfies readonly { title: MessageKey; text: MessageKey }[];

export function WhyZadex() {
  const { t } = useLocale();

  return (
    <section className="border-y border-white/[0.06] bg-surface py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <Reveal>
            <SectionHeading
              eyebrow={t("why.eyebrow")}
              title={t("why.title")}
              description={t("why.description")}
            />
          </Reveal>
          <div className="space-y-6">
            {reasonKeys.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.05}>
                <div className="rounded-3xl border border-white/[0.08] bg-background/60 p-7">
                  <h3 className="font-display text-lg text-white">{t(r.title)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{t(r.text)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
