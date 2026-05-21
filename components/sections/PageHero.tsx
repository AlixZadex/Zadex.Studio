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
    <section className="relative overflow-hidden border-b border-slate-950/[0.07] bg-gradient-to-b from-white to-transparent">
      <div className="pointer-events-none absolute inset-0 opacity-65 hero-grid" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_10%,rgba(110,231,255,0.12),transparent_42%),radial-gradient(circle_at_18%_30%,rgba(155,124,255,0.10),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-0 grain opacity-40" />
      <Container className="py-16 sm:py-24 lg:py-28">
        <div className="relative max-w-4xl">
          {eyebrow ? (
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-accent">{eyebrow}</p>
          ) : null}
          <h1 className="font-display text-display-xl text-balance text-slate-950">{title}</h1>
          {description ? (
            <div className="mt-6 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">{description}</div>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}


