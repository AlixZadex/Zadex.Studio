"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, type ReactNode } from "react";
import { type Locale, type MessageKey, messages } from "@/lib/i18n/messages";

type LanguageContextValue = {
  locale: Locale;
  t: (key: MessageKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = locale === "sv" ? "sv" : "en";
  }, [locale]);

  const t = useCallback(
    (key: MessageKey) => {
      return messages[locale][key] ?? messages.en[key] ?? key;
    },
    [locale],
  );

  const value = useMemo(() => ({ locale, t }), [locale, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLocale(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LanguageProvider");
  }
  return ctx;
}
