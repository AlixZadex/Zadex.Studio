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
      className={`inline-flex items-center rounded-full border border-slate-950/10 bg-white/75 p-0.5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] ${className}`}
      role="group"
      aria-label={t("lang.switch")}
    >
      <Link
        href={enHref}
        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest transition ${
          pathname.startsWith("/en") ? "bg-slate-950/[0.08] text-slate-950" : "text-muted hover:text-slate-950"
        }`}
        hrefLang="en"
      >
        EN
      </Link>
      <Link
        href={svHref}
        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest transition ${
          pathname.startsWith("/sv") ? "bg-slate-950/[0.08] text-slate-950" : "text-muted hover:text-slate-950"
        }`}
        hrefLang="sv"
      >
        SV
      </Link>
    </div>
  );
}


