import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { phoneTelHref, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact zadex to discuss your website, timeline, and goals—fast replies, clear next steps, and a premium collaboration experience.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you are building."
        description="Expect a thoughtful reply within one business day. If we are a fit, we will propose a focused plan—not a generic pitch deck."
      />

      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.15fr] lg:gap-16">
            <Reveal>
              <div className="space-y-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Email</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-2 block text-lg text-white underline-offset-4 hover:text-accent hover:underline"
                  >
                    {site.email}
                  </a>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Phone</p>
                  <a href={`tel:${phoneTelHref()}`} className="mt-2 block text-lg text-white hover:text-accent">
                    {site.phone}
                  </a>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Studio</p>
                  <p className="mt-2 text-lg text-muted">{site.address}</p>
                </div>
                <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 text-sm leading-relaxed text-muted">
                  If you already have a brief, timeline, or references—attach context in your message. The more concrete you are, the more useful our first response will be.
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-[2rem] border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-8 sm:p-10">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
