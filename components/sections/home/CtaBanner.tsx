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
    <section className="pb-24 pt-6 sm:pb-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.25rem] border border-blue-500/15 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(219,244,255,0.94)_36%,rgba(237,233,254,0.92)_68%,rgba(255,255,255,0.96))] px-7 py-14 shadow-[0_34px_120px_rgba(15,23,42,0.14)] backdrop-blur-xl sm:px-12 sm:py-16">
            <div className="edge-light absolute left-10 right-10 top-0 h-px" />
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-300/18 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-1/2 h-52 w-1/2 -translate-x-1/2 bg-violet-400/10 blur-3xl" />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">{t("ctaBanner.eyebrow")}</p>
                <h2 className="mt-4 font-display text-display-lg text-balance text-slate-950">{t("ctaBanner.title")}</h2>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{t("ctaBanner.body")}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
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


