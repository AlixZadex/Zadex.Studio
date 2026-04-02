"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/lib/i18n/LanguageContext";
import { useLocalizedPath } from "@/lib/i18n/useLocalizedPath";

export function CtaBanner() {
  const { t } = useLocale();
  const lp = useLocalizedPath();

  return (
    <section className="pb-24 sm:pb-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-white/[0.06] via-background to-background px-8 py-14 sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
            <div className="relative max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{t("ctaBanner.eyebrow")}</p>
              <h2 className="mt-4 font-display text-display-lg text-white">{t("ctaBanner.title")}</h2>
              <p className="mt-4 text-lg text-muted">{t("ctaBanner.body")}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href={lp("/contact")}>{t("ctaBanner.btn1")}</Button>
                <Button href={lp("/process")} variant="secondary">
                  {t("ctaBanner.btn2")}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
