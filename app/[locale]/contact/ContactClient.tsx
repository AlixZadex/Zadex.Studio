"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { useLocale } from "@/lib/i18n/LanguageContext";
import { phoneTelHref, site } from "@/lib/site";

export function ContactClient() {
  const { t } = useLocale();

  return (
    <>
      <PageHero
        eyebrow={t("contact.hero.eyebrow")}
        title={t("contact.hero.title")}
        description={t("contact.hero.description")}
      />

      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.15fr] lg:gap-16">
            <Reveal>
              <div className="space-y-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{t("contact.label.email")}</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-2 block text-lg text-white underline-offset-4 hover:text-accent hover:underline"
                  >
                    {site.email}
                  </a>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{t("contact.label.phone")}</p>
                  <a href={`tel:${phoneTelHref()}`} className="mt-2 block text-lg text-white hover:text-accent">
                    {site.phone}
                  </a>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{t("contact.label.studio")}</p>
                  <p className="mt-2 text-lg text-muted">{site.address}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Org.nr</p>
                  <p className="mt-2 text-lg text-muted">{site.orgNumber}</p>
                </div>
                <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 text-sm leading-relaxed text-muted">
                  {t("contact.note")}
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
