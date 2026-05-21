"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLocale } from "@/lib/i18n/LanguageContext";
import type { MessageKey } from "@/lib/i18n/messages";

const steps = [
  { step: "01", title: "process.step1.title", text: "process.step1.text" },
  { step: "02", title: "process.step2.title", text: "process.step2.text" },
  { step: "03", title: "process.step3.title", text: "process.step3.text" },
  { step: "04", title: "process.step4.title", text: "process.step4.text" },
] as const satisfies readonly { step: string; title: MessageKey; text: MessageKey }[];

export function HomeProcess() {
  const { t } = useLocale();

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-40 -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-300/10 to-transparent blur-3xl" />
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={t("process.hero.eyebrow")}
            title={t("process.hero.title")}
            description={t("process.hero.description")}
            align="center"
          />
        </Reveal>

        <div className="relative mt-14 grid gap-4 lg:grid-cols-4">
          <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-white/20 to-transparent lg:block" />
          {steps.map((step, i) => (
            <Reveal key={step.step} delay={i * 0.06}>
              <article className="relative h-full rounded-[1.5rem] border border-slate-950/[0.08] bg-white/70 p-6 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-cyan-200/25">
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-950/10 bg-background text-sm font-semibold text-accent shadow-[0_0_40px_rgba(110,231,255,0.12)]">
                  {step.step}
                </div>
                <h3 className="font-display text-xl text-slate-950">{t(step.title)}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">{t(step.text)}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}


