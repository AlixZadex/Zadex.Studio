import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent">
      <div className="pointer-events-none absolute inset-0 opacity-60 hero-grid" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_15%,rgba(200,255,61,0.09),transparent_45%)]" />
      <Container className="py-16 sm:py-24 lg:py-28">
        <div className="relative max-w-4xl">
          {eyebrow ? (
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
          ) : null}
          <h1 className="font-display text-display-xl text-balance text-white">{title}</h1>
          {description ? (
            <div className="mt-6 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">{description}</div>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
