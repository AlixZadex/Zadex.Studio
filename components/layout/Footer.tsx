"use client";

import Image from "next/image";
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
    <footer className="relative overflow-hidden border-t border-slate-950/[0.07] bg-surface">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(110,231,255,0.10),transparent_36%),radial-gradient(circle_at_85%_0%,rgba(155,124,255,0.10),transparent_34%)]" />
      <Container className="relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
          <div className="max-w-md">
            <Link href={lp("/")} className="inline-flex items-center gap-2 font-display text-xl tracking-tight text-slate-950">
              <span className="relative h-10 w-36 overflow-hidden">
                <Image
                  src="/images/zadex.logo.png"
                  alt="zadex logo"
                  fill
                  sizes="112px"
                  className="object-contain"
                />
              </span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-muted">{t("site.description")}</p>
            <div className="mt-6 inline-flex rounded-full border border-blue-500/15 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-700">
              Stockholm · websites · digital help
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-950/50">{t("footer.company")}</p>
            <ul className="mt-4 space-y-2">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={lp(l.href)} className="text-sm text-muted transition-colors hover:text-slate-950">
                    {t(l.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-950/50">{t("footer.work")}</p>
            <ul className="mt-4 space-y-2">
              {workLinks.map((l) => (
                <li key={l.href}>
                  <Link href={lp(l.href)} className="text-sm text-muted transition-colors hover:text-slate-950">
                    {t(l.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-950/50">{t("footer.social")}</p>
            <ul className="mt-4 space-y-2">
              {socialLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-slate-950"
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
        <div className="mt-14 flex flex-col gap-3 border-t border-slate-950/[0.07] pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {t("footer.rights")}
          </p>
          <div className="text-slate-950/42 sm:text-right">
            <p>{site.address}</p>
            <p className="mt-1">Org.nr {site.orgNumber}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}


