"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { useLocale } from "@/lib/i18n/LanguageContext";
import { useLocalizedPath } from "@/lib/i18n/useLocalizedPath";
import { site } from "@/lib/site";

const companyLinks = [
  { href: "/about", labelKey: "nav.about" as const },
  { href: "/process", labelKey: "footer.process" as const },
  { href: "/contact", labelKey: "nav.contact" as const },
];

const workLinks = [
  { href: "/services", labelKey: "nav.services" as const },
  { href: "/projects", labelKey: "nav.projects" as const },
];

const socialLinks = [
  { href: "https://www.instagram.com/zadex.studio/", label: "Instagram" },
] as const;

export function Footer() {
  const { t } = useLocale();
  const lp = useLocalizedPath();

  return (
    <footer className="border-t border-white/[0.06] bg-surface">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link href={lp("/")} className="font-display text-xl tracking-tight text-white">
              {site.name}
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">{t("site.description")}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{t("footer.company")}</p>
            <ul className="mt-4 space-y-2">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={lp(l.href)} className="text-sm text-muted transition-colors hover:text-white">
                    {t(l.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{t("footer.work")}</p>
            <ul className="mt-4 space-y-2">
              {workLinks.map((l) => (
                <li key={l.href}>
                  <Link href={lp(l.href)} className="text-sm text-muted transition-colors hover:text-white">
                    {t(l.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{t("footer.social")}</p>
            <ul className="mt-4 space-y-2">
              {socialLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-white/[0.06] pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {t("footer.rights")}
          </p>
          <div className="text-white/40 sm:text-right">
            <p>{site.address}</p>
            <p className="mt-1">Org.nr {site.orgNumber}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
