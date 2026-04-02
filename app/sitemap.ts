import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zadex.se";

const paths = ["", "/services", "/projects", "/about", "/contact", "/process"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const path of paths) {
      const urlPath = path === "" ? `/${locale}` : `/${locale}${path}`;
      entries.push({
        url: `${base}${urlPath}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: path === "" ? 1 : 0.7,
      });
    }
  }
  return entries;
}
