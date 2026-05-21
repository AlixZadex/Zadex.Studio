"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLocale } from "@/lib/i18n/LanguageContext";
import type { MessageKey } from "@/lib/i18n/messages";

const reasonKeys = [
  { title: "why.r1.title", text: "why.r1.text", stat: "01", label: "Position" },
  { title: "why.r2.title", text: "why.r2.text", stat: "02", label: "AI layer" },
  { title: "why.r3.title", text: "why.r3.text", stat: "03", label: "System" },
] as const satisfies readonly { title: MessageKey; text: MessageKey; stat: string; label: string }[];

export function WhyZadex() {
  const { t } = useLocale();

  return (
    <section className="relative overflow-hidden border-y border-slate-950/[0.06] bg-surface py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(110,231,255,0.10),transparent_36%),radial-gradient(circle_at_88%_62%,rgba(155,124,255,0.10),transparent_38%)]" />
      <Container>
        <div className="relative grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-start">
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
                <div className="group relative overflow-hidden rounded-[1.75rem] border border-slate-950/[0.09] bg-background/65 p-6 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-cyan-200/25">
                  <div className="edge-light absolute left-8 right-8 top-0 h-px opacity-0 transition group-hover:opacity-100" />
                  <div className="flex gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-950/10 bg-white/70 font-display text-sm text-accent">
                      {r.stat}
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-950/38">{r.label}</p>
                      <h3 className="mt-2 font-display text-xl text-slate-950">{t(r.title)}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{t(r.text)}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}


