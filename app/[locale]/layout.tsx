import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { isAppLocale } from "@/lib/i18n/config";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "sv" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isAppLocale(locale)) {
    notFound();
  }

  return <SiteShell locale={locale}>{children}</SiteShell>;
}
