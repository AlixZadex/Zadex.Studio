"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useLocale } from "@/lib/i18n/LanguageContext";
import { useLocalizedPath } from "@/lib/i18n/useLocalizedPath";
import { site } from "@/lib/site";
const heroContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function HomeHero() {
  const { t } = useLocale();
  const lp = useLocalizedPath();

  return (
    <section className="relative overflow-hidden border-b border-white/[0.06]">
      <div className="pointer-events-none absolute -left-1/3 top-0 h-[520px] w-[520px] rounded-full bg-accent/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-1/4 bottom-0 h-[420px] w-[420px] rounded-full bg-white/[0.04] blur-[100px]" />

      <Container className="relative py-24 sm:py-32 lg:py-40">
        <motion.div
          className="max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={heroContainer}
        >
          <motion.p variants={heroItem} className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {t("home.hero.eyebrow")}
          </motion.p>
          <motion.h1 variants={heroItem} className="mt-6 font-display text-display-xl text-balance text-white">
            {t("home.hero.title")}
          </motion.h1>
          <motion.p variants={heroItem} className="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            {t("home.hero.body")}
          </motion.p>
          <motion.div variants={heroItem} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href={lp("/contact")}>{t("home.hero.cta1")}</Button>
            <Button href={lp("/projects")} variant="secondary">
              {t("home.hero.cta2")}
            </Button>
          </motion.div>
          <motion.p variants={heroItem} className="mt-12 text-sm text-white/40">
            {t("home.hero.emailHint")}{" "}
            <Link href={`mailto:${site.email}`} className="text-white/70 underline-offset-4 hover:text-accent hover:underline">
              {site.email}
            </Link>
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
