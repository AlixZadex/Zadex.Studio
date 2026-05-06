import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/layout/PageTransition";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import type { Locale } from "@/lib/i18n/messages";

export function SiteShell({ children, locale }: { children: ReactNode; locale: Locale }) {
  const skipLabel = locale === "sv" ? "Hoppa till innehall" : "Skip to content";

  return (
    <LanguageProvider locale={locale}>
      <div className="relative min-h-screen overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only z-[60] rounded-md bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          {skipLabel}
        </a>
        <div className="pointer-events-none fixed inset-0 hidden grain opacity-30 sm:block" aria-hidden />
        <Navbar />
        <main id="main-content">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}