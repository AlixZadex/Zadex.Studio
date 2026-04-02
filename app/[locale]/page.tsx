import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/home/CtaBanner";
import { FeaturedProjects } from "@/components/sections/home/FeaturedProjects";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { ServicesIntro } from "@/components/sections/home/ServicesIntro";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { WhyZadex } from "@/components/sections/home/WhyZadex";
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
  return pageMetadata(locale, "home");
}

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ServicesIntro />
      <WhyZadex />
      <FeaturedProjects />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
