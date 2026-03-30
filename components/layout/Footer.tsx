import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { footerLinks, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-surface">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link href="/" className="font-display text-xl tracking-tight text-white">
              {site.name}
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">{site.description}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Company</p>
            <ul className="mt-4 space-y-2">
              {footerLinks.company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Work</p>
            <ul className="mt-4 space-y-2">
              {footerLinks.work.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Social</p>
            <ul className="mt-4 space-y-2">
              {footerLinks.social.map((l) => (
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
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="text-white/40">{site.address}</p>
        </div>
      </Container>
    </footer>
  );
}
