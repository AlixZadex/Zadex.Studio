import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";

const services = [
  {
    title: "Business websites",
    description: "A flagship site that frames your offer with confidence—structured storytelling, case paths, and conversion points that feel natural.",
    value: "Outcome: a credible first touchpoint that shortens sales cycles and supports recruiting, partnerships, and press.",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
        <path strokeWidth="1.5" d="M4 7h16M4 12h10M4 17h16" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Landing pages",
    description: "Launch moments deserve precision: sharp copy rhythm, social proof placement, and performance tuned for paid and organic traffic.",
    value: "Outcome: higher intent capture without gimmicks—clarity that converts and analytics that make iteration obvious.",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
        <path strokeWidth="1.5" d="M7 17V7h10v10H7Z" strokeLinejoin="round" />
        <path strokeWidth="1.5" d="M4 20h16" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Website redesign",
    description: "Modernize without losing equity—information architecture, brand alignment, and a component model that is easier to maintain.",
    value: "Outcome: a site that looks contemporary, loads fast, and reflects where your business is today—not five years ago.",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
        <path strokeWidth="1.5" d="M12 3v3M5.6 5.6l2.1 2.1M3 12h3M5.6 18.4l2.1-2.1M12 18v3M18.4 18.4l-2.1-2.1M21 12h-3M18.4 5.6l-2.1 2.1" strokeLinecap="round" />
        <path strokeWidth="1.5" d="M12 8a4 4 0 1 0 4 4" />
      </svg>
    ),
  },
  {
    title: "Frontend development",
    description: "Production-grade implementation with accessible markup, resilient layouts, and performance budgets you can feel.",
    value: "Outcome: maintainable code, fewer surprises in QA, and a site that stays fast as content grows.",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
        <path strokeWidth="1.5" d="M8 9l-3 3 3 3M16 15l3-3-3-3" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeWidth="1.5" d="M13.5 6l-3 12" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "UI/UX design",
    description: "Interfaces with hierarchy and restraint—systems thinking, tasteful motion, and patterns that scale across pages.",
    value: "Outcome: a cohesive experience that feels premium on day one and stays coherent as you ship new sections.",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
        <path strokeWidth="1.5" d="M4 5h16v14H4z" strokeLinejoin="round" />
        <path strokeWidth="1.5" d="M8 9h8M8 13h5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export const metadata: Metadata = {
  title: "Services",
  description:
    "Business websites, landing pages, redesigns, frontend development, and UI/UX design—built with clarity, speed, and long-term maintainability.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything you need to show up like the leader you are."
        description="From narrative to navigation, we build digital experiences that earn trust—then make it easy for people to take the next step."
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-8 lg:gap-10">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.04}>
                <article className="grid gap-8 rounded-[2rem] border border-white/[0.08] bg-white/[0.02] p-8 transition duration-300 hover:border-accent/20 sm:grid-cols-[auto_1fr] sm:p-10 lg:gap-12">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-accent/10 text-accent">
                    {s.icon}
                  </div>
                  <div>
                    <h2 className="font-display text-2xl text-white">{s.title}</h2>
                    <p className="mt-4 text-base leading-relaxed text-muted">{s.description}</p>
                    <p className="mt-6 border-l border-accent/40 pl-5 text-sm leading-relaxed text-white/80">{s.value}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-white/[0.06] bg-surface py-16 sm:py-24">
        <Container className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <Reveal className="max-w-xl">
            <SectionHeading
              title="Tell us what you are launching."
              description="We will recommend the smallest effective scope—then deliver it with craft and momentum."
            />
          </Reveal>
          <Reveal>
            <Button href="/contact">Get a quote</Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
