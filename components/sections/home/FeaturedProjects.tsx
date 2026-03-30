import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { projects } from "@/lib/projects";

export function FeaturedProjects() {
  const featured = projects.slice(0, 3);

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <SectionHeading
              eyebrow="Selected work"
              title="Recent launches with measurable impact."
              description="Each engagement is tailored—here is a snapshot of the kind of work we ship for ambitious teams."
            />
          </Reveal>
          <Reveal>
            <Button href="/projects" variant="secondary">
              All projects
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {featured.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>

        <Reveal className="mt-10 text-sm text-muted">
          Looking for something specific?{" "}
          <Link href="/contact" className="text-white underline-offset-4 hover:text-accent hover:underline">
            Tell us about your goals
          </Link>
          .
        </Reveal>
      </Container>
    </section>
  );
}
