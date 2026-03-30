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
    <section className="border-b border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent">
      <Container className="py-16 sm:py-24 lg:py-28">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
          ) : null}
          <h1 className="font-display text-display-xl text-balance text-white">{title}</h1>
          {description ? (
            <div className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">{description}</div>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
