import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function CtaBanner() {
  return (
    <section className="pb-24 sm:pb-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-white/[0.06] via-background to-background px-8 py-14 sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
            <div className="relative max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Next step</p>
              <h2 className="mt-4 font-display text-display-lg text-white">Ready when you are.</h2>
              <p className="mt-4 text-lg text-muted">
                Share your timeline, audience, and ambitions—we will respond with a clear plan and a realistic path to launch.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/contact">Book an intro call</Button>
                <Button href="/process" variant="secondary">
                  See how we work
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
