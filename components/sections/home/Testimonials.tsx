import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const quotes = [
  {
    quote:
      "zadex rebuilt our web presence with rare taste and technical discipline. The site finally matches the quality of our product.",
    name: "Elin Forsberg",
    role: "CMO, Northline Capital",
  },
  {
    quote:
      "Clear process, fast iterations, and a frontend that feels expensive. Our conversion metrics moved within weeks of launch.",
    name: "Marcus Dahl",
    role: "Founder, Atelier Noir",
  },
];

export function Testimonials() {
  return (
    <section className="border-t border-white/[0.06] bg-gradient-to-b from-transparent to-white/[0.02] py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Clients"
            title="Trusted by teams who care about craft."
            description="We work with operators who want a website that earns attention—and keeps it."
            align="center"
          />
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
          {quotes.map((q, i) => (
            <Reveal key={q.name} delay={i * 0.08}>
              <figure className="h-full rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 sm:p-10">
                <blockquote className="text-base leading-relaxed text-white/90 sm:text-lg">“{q.quote}”</blockquote>
                <figcaption className="mt-8 text-sm">
                  <p className="font-medium text-white">{q.name}</p>
                  <p className="mt-1 text-muted">{q.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
