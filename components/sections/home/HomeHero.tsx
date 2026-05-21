"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useLocale } from "@/lib/i18n/LanguageContext";
import { useLocalizedPath } from "@/lib/i18n/useLocalizedPath";
import { site } from "@/lib/site";

const heroContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 22, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
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
  const leftParallaxY = useTransform(scrollYProgress, [0, 1], [0, -24]);

  return (
    <section
      ref={heroRef}
      className="relative isolate overflow-hidden border-b border-slate-950/[0.07]"
    >
      <Image
        src="/images/hero-studio-background.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none absolute inset-0 -z-10 object-cover object-center"
      />
      <div className="pointer-events-none absolute inset-0 bg-white/38" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.64)_42%,rgba(255,255,255,0.24)_100%)]" />
      <div className="pointer-events-none absolute inset-0 vignette opacity-70" />
      <div className="pointer-events-none absolute inset-0 grain opacity-20" />

      <Container className="relative flex min-h-[88svh] items-center py-16 sm:py-20 lg:py-24">
        <motion.div
          className="w-full"
          initial={prefersReducedMotion ? false : "hidden"}
          animate="visible"
          variants={heroContainer}
        >
          <motion.div className="max-w-4xl" style={prefersReducedMotion ? undefined : { y: leftParallaxY }}>
            <motion.div variants={heroItem} className="inline-flex items-center gap-3 rounded-full border border-slate-950/10 bg-white/75 px-3 py-2 text-xs text-slate-950/70 shadow-[0_12px_34px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_18px_rgba(0,132,255,0.7)]" />
              <span className="font-semibold uppercase tracking-[0.22em] text-accent">{t("home.hero.eyebrow")}</span>
            </motion.div>
            <motion.h1 variants={heroItem} className="mt-7 max-w-5xl font-display text-display-xl text-balance text-slate-950">
              <span className="text-gradient">{t("home.hero.title")}</span>
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
            <motion.ul variants={heroItem} className="mt-7 flex flex-wrap items-center gap-3 text-xs text-slate-950/68 sm:text-sm">
              {trustPoints.map((point) => (
                <li key={point} className="rounded-full border border-slate-950/10 bg-white/70 px-3 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                  {point}
                </li>
              ))}
            </motion.ul>
            <motion.p variants={heroItem} className="mt-12 text-sm text-slate-950/45">
              {t("home.hero.emailHint")}{" "}
              <Link href={`mailto:${site.email}`} className="text-slate-950/75 underline-offset-4 hover:text-accent hover:underline">
                {site.email}
              </Link>
            </motion.p>
          </motion.div>

        </motion.div>
      </Container>
    </section>
  );
}


