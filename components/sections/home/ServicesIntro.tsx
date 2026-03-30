import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const items = [
  {
    title: "Websites & platforms",
    body: "Brand-led sites with editorial structure, performance budgets, and CMS workflows your team can actually use.",
  },
  {
    title: "Landing & launch",
    body: "High-converting launch pages with sharp messaging, motion that supports the story, and analytics-ready foundations.",
  },
  {
    title: "Design systems",
    body: "Coherent UI foundations—typography, spacing, components—so your product scales without visual drift.",
  },
];

export function ServicesIntro() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Capabilities"
            title="Built for businesses that want a site they are proud to share."
            description="We combine product thinking with meticulous frontend craft—so your website feels as serious as your business."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="h-full rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 transition duration-300 hover:border-accent/25 hover:bg-white/[0.04]">
                <div className="mb-6 h-px w-12 bg-accent/60" />
                <h3 className="font-display text-xl text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <Button href="/services" variant="secondary">
            Explore services
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
