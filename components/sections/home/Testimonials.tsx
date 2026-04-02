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
    <section className="border-t border-white/[0.06] bg-gradient-to-b from-transparent to-white/[0.02] py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={t("testimonials.eyebrow")}
            title={t("testimonials.title")}
            description={t("testimonials.description")}
            align="center"
          />
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
          {quoteKeys.map((q, i) => (
            <Reveal key={q.name} delay={i * 0.08}>
              <figure className="h-full rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 sm:p-10">
                <blockquote className="text-base leading-relaxed text-white/90 sm:text-lg">“{t(q.quote)}”</blockquote>
                <figcaption className="mt-8 text-sm">
                  <p className="font-medium text-white">{t(q.name)}</p>
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
