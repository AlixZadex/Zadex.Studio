export const locales = ["en", "sv"] as const;
export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = "sv";

export function isAppLocale(value: string): value is AppLocale {
  return value === "en" || value === "sv";
}

/** Prefix a path with locale, e.g. `("/", "sv")` → `/sv`, `("/contact", "en")` → `/en/contact`. */
export function withLocale(locale: AppLocale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `/${locale}`;
  return `/${locale}${normalized}`;
}
