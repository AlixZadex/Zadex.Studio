"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
  const prefersReducedMotion = useReducedMotion();
  const trustPoints = [t("home.hero.trust1"), t("home.hero.trust2"), t("home.hero.trust3")];
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const rightParallaxY = useTransform(scrollYProgress, [0, 1], [0, -44]);
  const rightParallaxScale = useTransform(scrollYProgress, [0, 1], [1, 0.965]);
  const rightParallaxOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const leftParallaxY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <section ref={heroRef} className="relative overflow-hidden border-b border-white/[0.06]">
      <div className="pointer-events-none absolute inset-0 opacity-60 hero-grid" />
      <div className="pointer-events-none absolute inset-0 vignette" />
      <div className="pointer-events-none absolute -left-1/3 top-0 hidden h-[520px] w-[520px] rounded-full bg-accent/10 blur-[100px] sm:block" />
      <div className="pointer-events-none absolute -right-1/4 bottom-0 hidden h-[420px] w-[420px] rounded-full bg-white/[0.04] blur-[80px] sm:block" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_30%,rgba(200,255,61,0.12),transparent_40%)]" />

      <Container className="relative flex min-h-[82svh] items-center py-16 sm:py-20 lg:py-24">
        <motion.div
          className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]"
          initial={prefersReducedMotion ? false : "hidden"}
          animate="visible"
          variants={heroContainer}
        >
          <motion.div className="max-w-4xl" style={prefersReducedMotion ? undefined : { y: leftParallaxY }}>
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
            <motion.ul variants={heroItem} className="mt-6 flex flex-wrap items-center gap-3 text-xs text-white/65 sm:text-sm">
              {trustPoints.map((point) => (
                <li key={point} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
                  {point}
                </li>
              ))}
            </motion.ul>
            <motion.p variants={heroItem} className="mt-12 text-sm text-white/40">
              {t("home.hero.emailHint")}{" "}
              <Link href={`mailto:${site.email}`} className="text-white/70 underline-offset-4 hover:text-accent hover:underline">
                {site.email}
              </Link>
            </motion.p>
          </motion.div>

          <motion.div
            variants={heroItem}
            className="relative hidden lg:flex lg:justify-center"
            style={prefersReducedMotion ? undefined : { y: rightParallaxY, scale: rightParallaxScale, opacity: rightParallaxOpacity }}
          >
            <div className="relative w-full max-w-[440px]">
              <motion.div
                className="pointer-events-none absolute inset-x-10 inset-y-12 rounded-full bg-accent/12 blur-[72px]"
                animate={prefersReducedMotion ? undefined : { opacity: [0.35, 0.55, 0.35], scale: [0.98, 1.04, 0.98] }}
                transition={prefersReducedMotion ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative flex aspect-[16/10] items-center justify-center">
                <Image
                  src="/images/zadex.logo.png"
                  alt="Zadex logo"
                  width={420}
                  height={210}
                  className="h-auto w-[96%] scale-[1.22] object-contain opacity-100"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
