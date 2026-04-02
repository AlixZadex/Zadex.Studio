import type { Metadata } from "next";
import { ContactClient } from "./ContactClient";
import { isAppLocale } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/messages";
import { pageMetadata } from "@/lib/i18n/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isAppLocale(raw) ? raw : "sv";
  return pageMetadata(locale, "contact");
}

export default function ContactPage() {
  return <ContactClient />;
}
