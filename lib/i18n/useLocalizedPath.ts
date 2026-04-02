"use client";

import { useParams } from "next/navigation";
import { type AppLocale, defaultLocale, isAppLocale, withLocale } from "@/lib/i18n/config";

export function useLocaleParam(): AppLocale {
  const params = useParams();
  const raw = params?.locale;
  if (typeof raw === "string" && isAppLocale(raw)) return raw;
  return defaultLocale;
}

export function useLocalizedPath() {
  const locale = useLocaleParam();
  return (path: string) => withLocale(locale, path);
}
