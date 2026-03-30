import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";

const steps = [
  {
    step: "01",
    title: "Discovery",
    text: "We clarify goals, audiences, constraints, and success metrics—so design decisions map to outcomes, not opinions.",
  },
  {
    step: "02",
    title: "Direction",
    text: "A tight creative direction: typography, layout logic, and interaction principles that set the tone for the full build.",
  },
  {
    step: "03",
    title: "Design",
    text: "High-fidelity layouts with real content structure—reviewed iteratively until the narrative and hierarchy feel inevitable.",
  },
  {
    step: "04",
    title: "Build",
    text: "Frontend implementation with accessibility, performance, and maintainability as defaults—not afterthoughts.",
  },
  {
    step: "05",
    title: "Launch",
    text: "QA, analytics hooks, handoff documentation, and support—so your team can ship updates with confidence.",
  },
];

export const metadata: Metadata = {
  title: "Process",
  description:
    "How zadex works—from discovery and creative direction to build and launch—with clear milestones and senior ownership throughout.",
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Process"
        title="A calm, structured path from idea to launch."
        description="No mystery phases—just a proven sequence that keeps momentum high and decisions clear."
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="space-y-6">
            {steps.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.05}>
                <div className="grid gap-6 rounded-[2rem] border border-white/[0.08] bg-white/[0.02] p-8 sm:grid-cols-[88px_1fr] sm:items-start sm:p-10">
                  <div className="font-display text-sm text-accent">{s.step}</div>
                  <div>
                    <h2 className="font-display text-2xl text-white">{s.title}</h2>
                    <p className="mt-4 text-base leading-relaxed text-muted">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-white/[0.06] bg-surface py-16 sm:py-24">
        <Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <Reveal className="max-w-xl">
            <h2 className="font-display text-display-lg text-white">Ready to begin?</h2>
            <p className="mt-4 text-lg text-muted">Share your timeline and goals—we will respond with next steps.</p>
          </Reveal>
          <Reveal>
            <Button href="/contact">Contact zadex</Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
