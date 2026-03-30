import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/home/CtaBanner";
import { FeaturedProjects } from "@/components/sections/home/FeaturedProjects";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { ServicesIntro } from "@/components/sections/home/ServicesIntro";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { WhyZadex } from "@/components/sections/home/WhyZadex";

export const metadata: Metadata = {
  title: "Home",
  description:
    "zadex crafts premium, fast, and refined websites for businesses that want clarity, performance, and standout digital presence.",
};

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
