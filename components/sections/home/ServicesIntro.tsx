"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/lib/i18n/LanguageContext";
import { useLocalizedPath } from "@/lib/i18n/useLocalizedPath";
import type { MessageKey } from "@/lib/i18n/messages";

const itemKeys = [
  { title: "servicesIntro.item1.title", body: "servicesIntro.item1.body", meta: "01", glow: "from-cyan-300/20" },
  { title: "servicesIntro.item2.title", body: "servicesIntro.item2.body", meta: "02", glow: "from-violet-400/20" },
  { title: "servicesIntro.item3.title", body: "servicesIntro.item3.body", meta: "03", glow: "from-blue-400/20" },
  { title: "servicesIntro.item4.title", body: "servicesIntro.item4.body", meta: "04", glow: "from-cyan-300/16" },
  { title: "servicesIntro.item5.title", body: "servicesIntro.item5.body", meta: "05", glow: "from-violet-400/16" },
  { title: "servicesIntro.item6.title", body: "servicesIntro.item6.body", meta: "06", glow: "from-blue-400/16" },
] as const satisfies readonly { title: MessageKey; body: MessageKey; meta: string; glow: string }[];

export function ServicesIntro() {
  const { t } = useLocale();
  const lp = useLocalizedPath();

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/25 to-transparent" />
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={t("servicesIntro.eyebrow")}
            title={t("servicesIntro.title")}
            description={t("servicesIntro.description")}
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {itemKeys.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="group relative h-full overflow-hidden rounded-[1.75rem] premium-card p-7 transition duration-500 hover:-translate-y-1 hover:border-cyan-200/25">
                <div className={`pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gradient-to-br ${item.glow} to-transparent blur-3xl transition duration-500 group-hover:opacity-100`} />
                <div className="relative flex items-start justify-between gap-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">{item.meta}</span>
                  <span className="h-8 w-8 rounded-full border border-slate-950/10 bg-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" />
                </div>
                <h3 className="relative mt-8 font-display text-xl text-slate-950">{t(item.title)}</h3>
                <p className="relative mt-4 text-sm leading-relaxed text-muted">{t(item.body)}</p>
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


