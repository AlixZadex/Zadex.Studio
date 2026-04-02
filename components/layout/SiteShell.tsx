import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/layout/PageTransition";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import type { Locale } from "@/lib/i18n/messages";

export function SiteShell({ children, locale }: { children: ReactNode; locale: Locale }) {
  return (
    <LanguageProvider locale={locale}>
      <div className="relative min-h-screen overflow-x-hidden">
        <div className="pointer-events-none fixed inset-0 grain opacity-40" aria-hidden />
        <Navbar />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}