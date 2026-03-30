"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
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
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export function HomeHero() {
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
            Digital studio · Stockholm
          </motion.p>
          <motion.h1 variants={heroItem} className="mt-6 font-display text-display-xl text-balance text-white">
            Websites that feel inevitable.
          </motion.h1>
          <motion.p variants={heroItem} className="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            zadex designs and builds premium web experiences for businesses that care about clarity, speed, and craft.
            From first impression to conversion, every detail is intentional.
          </motion.p>
          <motion.div variants={heroItem} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href="/contact">Start a project</Button>
            <Button href="/projects" variant="secondary">
              View selected work
            </Button>
          </motion.div>
          <motion.p variants={heroItem} className="mt-12 text-sm text-white/40">
            Prefer email?{" "}
            <Link href={`mailto:${site.email}`} className="text-white/70 underline-offset-4 hover:text-accent hover:underline">
              {site.email}
            </Link>
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
