import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work across finance, retail, healthcare, logistics, and more—premium websites built for clarity, trust, and conversion.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Projects built for real businesses—and real outcomes."
        description="Each build balances brand presence with practical goals: clearer positioning, stronger credibility, and smoother customer journeys."
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-white/[0.06] bg-gradient-to-b from-transparent to-white/[0.02] py-16 sm:py-24">
        <Container>
          <div className="flex flex-col gap-8 rounded-[2rem] border border-white/[0.08] bg-white/[0.02] p-10 sm:flex-row sm:items-center sm:justify-between sm:p-12">
            <Reveal className="max-w-xl">
              <SectionHeading
                title="Want a portfolio piece like this for your brand?"
                description="Bring your objectives—we will shape the narrative, design, and build into one coherent launch."
              />
            </Reveal>
            <Reveal>
              <Button href="/contact">Start a conversation</Button>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
