"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { site } from "@/lib/site";
import { useLocale } from "@/lib/i18n/LanguageContext";
import { useLocalizedPath } from "@/lib/i18n/useLocalizedPath";
import type { MessageKey } from "@/lib/i18n/messages";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const navItems: { href: string; labelKey: MessageKey }[] = [
  { href: "/", labelKey: "nav.home" },
  { href: "/services", labelKey: "nav.services" },
  { href: "/projects", labelKey: "nav.projects" },
  { href: "/about", labelKey: "nav.about" },
  { href: "/contact", labelKey: "nav.contact" },
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-3.5 w-5">
      <motion.span
        className="absolute left-0 top-0 block h-0.5 w-full rounded-full bg-white"
        animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="absolute left-0 top-1.5 block h-0.5 w-full rounded-full bg-white"
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.span
        className="absolute left-0 top-3 block h-0.5 w-full rounded-full bg-white"
        animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
      />
    </span>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { t } = useLocale();
  const lp = useLocalizedPath();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (path: string) => {
    const full = lp(path);
    if (path === "/") return pathname === full || pathname === `${full}/`;
    return pathname === full || pathname.startsWith(`${full}/`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-6 sm:h-[4.25rem]">
        <Link href={lp("/")} className="group flex items-center gap-2">
          <span className="font-display text-lg tracking-tight text-white transition-colors group-hover:text-accent">
            {site.name}
          </span>
          <span className="hidden rounded-full border border-white/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-muted sm:inline">
            {t("nav.studio")}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navItems.map((link) => (
            <Link
              key={link.href}
              href={lp(link.href)}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`rounded-full px-3 py-2 text-sm transition-colors ${
                isActive(link.href)
                  ? "bg-white/[0.06] text-white"
                  : "text-muted hover:text-white"
              }`}
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle />
          <Button href={lp("/contact")} variant="primary" className="!px-5 !py-2.5 !text-xs !uppercase !tracking-[0.15em]">
            {t("nav.quote")}
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-white/10 p-2.5 text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? t("nav.menuClose") : t("nav.menuOpen")}</span>
          <MenuIcon open={open} />
        </button>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] as const }}
            className="overflow-hidden border-t border-white/[0.06] bg-background lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-5">
              <div className="flex justify-end px-3 pb-2">
                <LanguageToggle />
              </div>
              {navItems.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link
                    href={lp(link.href)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`block rounded-xl px-3 py-3 text-base ${
                      isActive(link.href) ? "bg-white/[0.06] text-white" : "text-muted"
                    }`}
                  >
                    {t(link.labelKey)}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-3">
                <Button href={lp("/contact")} variant="primary" className="w-full !py-3">
                  {t("nav.quote")}
                </Button>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
