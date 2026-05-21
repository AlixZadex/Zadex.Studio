"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLocale } from "@/lib/i18n/LanguageContext";
import type { MessageKey } from "@/lib/i18n/messages";

const quoteKeys = [
  { quote: "testimonials.q1.quote", name: "testimonials.q1.name", role: "testimonials.q1.role" },
  { quote: "testimonials.q2.quote", name: "testimonials.q2.name", role: "testimonials.q2.role" },
] as const satisfies readonly { quote: MessageKey; name: MessageKey; role: MessageKey }[];

export function Testimonials() {
  const { t } = useLocale();

  return (
    <section className="relative overflow-hidden border-t border-slate-950/[0.06] bg-gradient-to-b from-transparent to-white/[0.025] py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(155,124,255,0.12),transparent_42%)]" />
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={t("testimonials.eyebrow")}
            title={t("testimonials.title")}
            description={t("testimonials.description")}
            align="center"
          />
        </Reveal>

        <div className="relative mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
          {quoteKeys.map((q, i) => (
            <Reveal key={q.name} delay={i * 0.08}>
              <figure className="h-full rounded-[1.75rem] premium-card p-8 sm:p-10">
                <div className="mb-8 h-px w-full bg-gradient-to-r from-cyan-200/40 via-violet-300/20 to-transparent" />
                <blockquote className="text-base leading-relaxed text-slate-950/90 sm:text-lg">
                  <span aria-hidden>&ldquo;</span>
                  {t(q.quote)}
                  <span aria-hidden>&rdquo;</span>
                </blockquote>
                <figcaption className="mt-8 text-sm">
                  <p className="font-medium text-slate-950">{t(q.name)}</p>
                  <p className="mt-1 text-muted">{t(q.role)}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}


