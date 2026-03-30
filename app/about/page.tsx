import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "About",
  description:
    "zadex is a digital studio focused on premium websites—modern, fast, and built with senior attention from discovery to launch.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A small studio with a high bar."
        description="zadex exists to help businesses present themselves with clarity and confidence online—without the bloat, templates, or noisy trends that age quickly."
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <Reveal>
              <h2 className="font-display text-display-lg text-white">What we believe</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                A great website is not decoration—it is infrastructure for trust. It should explain what you do, who it is for, and why it matters,
                in a way that feels effortless on every device.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                We bias toward restraint: typography that reads beautifully, motion that supports comprehension, and performance that respects your visitor’s time.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.02] p-8 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Mission</p>
                <p className="mt-4 text-xl leading-relaxed text-white">
                  Help ambitious teams look unmistakably premium online—through craft, clarity, and code that holds up.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-y border-white/[0.06] bg-surface py-16 sm:py-24">
        <Container>
          <Reveal>
            <h2 className="max-w-3xl font-display text-display-lg text-white">Our story</h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">
              zadex started as a reaction to “good enough” web work—sites that looked fine in a deck but felt fragile in production.
              We built the studio around a simple promise: senior execution, direct collaboration, and outcomes you can measure.
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">
              Today we partner with founders, marketing leaders, and operators who want a digital presence that matches the quality of their product—
              and who value a team that treats the details as non-negotiable.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-3">
            <Reveal>
              <h2 className="font-display text-2xl text-white">Why we do it</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                The first interaction many customers have with your business is your website. We want that moment to feel intentional—worthy of the work behind your brand.
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="font-display text-2xl text-white">Our approach</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                We align on goals early, design with real content, and build with maintainability in mind—so your site stays strong after launch, not only on day one.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <h2 className="font-display text-2xl text-white">How we collaborate</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Clear milestones, async-friendly updates, and candid recommendations. You will always know what is happening, what is next, and why it matters.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
