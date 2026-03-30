import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const reasons = [
  {
    title: "Clarity over noise",
    text: "We design for decision-making: hierarchy, pacing, and messaging that helps visitors understand you in seconds.",
  },
  {
    title: "Performance as polish",
    text: "Fast load, smooth motion, accessible contrast—luxury is how a site feels under real-world conditions.",
  },
  {
    title: "Partnership, not handoff",
    text: "You get a build you can evolve: sensible structure, documented patterns, and support when you need it.",
  },
];

export function WhyZadex() {
  return (
    <section className="border-y border-white/[0.06] bg-surface py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <Reveal>
            <SectionHeading
              eyebrow="Why zadex"
              title="A studio mindset—with the rigor of a product team."
              description="We are small by design: senior attention on every engagement, direct communication, and work that holds up when your brand is in the spotlight."
            />
          </Reveal>
          <div className="space-y-6">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.05}>
                <div className="rounded-3xl border border-white/[0.08] bg-background/60 p-7">
                  <h3 className="font-display text-lg text-white">{r.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{r.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
