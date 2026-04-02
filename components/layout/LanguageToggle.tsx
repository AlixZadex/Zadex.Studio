"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/lib/i18n/LanguageContext";
import { withLocale } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/messages";

function swapLocaleInPath(pathname: string, locale: Locale): string {
  const without = pathname.replace(/^\/(en|sv)(?=\/|$)/, "") || "/";
  return withLocale(locale, without === "/" ? "/" : without);
}

export function LanguageToggle({ className = "" }: { className?: string }) {
  const pathname = usePathname() ?? "/";
  const { t } = useLocale();

  const enHref = swapLocaleInPath(pathname, "en");
  const svHref = swapLocaleInPath(pathname, "sv");

  return (
    <div
      className={`inline-flex items-center rounded-full border border-white/10 bg-black/20 p-0.5 ${className}`}
      role="group"
      aria-label={t("lang.switch")}
    >
      <Link
        href={enHref}
        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest transition ${
          pathname.startsWith("/en") ? "bg-white/[0.12] text-white" : "text-muted hover:text-white"
        }`}
        hrefLang="en"
      >
        EN
      </Link>
      <Link
        href={svHref}
        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest transition ${
          pathname.startsWith("/sv") ? "bg-white/[0.12] text-white" : "text-muted hover:text-white"
        }`}
        hrefLang="sv"
      >
        SV
      </Link>
    </div>
  );
}
