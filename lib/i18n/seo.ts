import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/messages";
import { site } from "@/lib/site";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zadex.se";

type PageId =
  | "home"
  | "about"
  | "contact"
  | "projects"
  | "process"
  | "services";

const copy: Record<
  PageId,
  {
    en: { title: string; description: string };
    sv: { title: string; description: string };
  }
> = {
  home: {
    en: {
      title: "Home",
      description:
        "zadex crafts premium, fast, and refined websites for businesses that want clarity, performance, and standout digital presence.",
    },
    sv: {
      title: "Hem",
      description:
        "zadex bygger premium, snabba och genomarbetade webbplatser för företag som vill ha tydlighet, prestanda och en digital närvaro som sticker ut.",
    },
  },
  about: {
    en: {
      title: "About",
      description:
        "zadex is a digital studio focused on premium websites—modern, fast, and built with senior attention from discovery to launch.",
    },
    sv: {
      title: "Om oss",
      description:
        "zadex är en digital studio med fokus på premiumwebb—modernt, snabbt och byggt med senior uppmärksamhet från idé till lansering.",
    },
  },
  contact: {
    en: {
      title: "Contact",
      description:
        "Contact zadex to discuss your website, timeline, and goals—fast replies, clear next steps, and a premium collaboration experience.",
    },
    sv: {
      title: "Kontakt",
      description:
        "Kontakta zadex för att prata om er webbplats, tidslinje och mål—snabba svar, tydliga nästa steg och ett premiumsamarbete.",
    },
  },
  projects: {
    en: {
      title: "Projects",
      description:
        "Selected work across finance, retail, healthcare, logistics, and more—premium websites built for clarity, trust, and conversion.",
    },
    sv: {
      title: "Projekt",
      description:
        "Utvalt arbete inom finans, detaljhandel, hälsovård, logistik med mera—premiumwebbar byggda för tydlighet, förtroende och konvertering.",
    },
  },
  process: {
    en: {
      title: "Process",
      description:
        "How zadex works—from discovery and creative direction to build and launch—with clear milestones and senior ownership throughout.",
    },
    sv: {
      title: "Process",
      description:
        "Så jobbar zadex—från kartläggning och kreativ riktning till bygge och lansering—med tydliga milstolpar och senior ansvar hela vägen.",
    },
  },
  services: {
    en: {
      title: "Services",
      description:
        "Business websites, landing pages, redesigns, frontend development, and UI/UX design—built with clarity, speed, and long-term maintainability.",
    },
    sv: {
      title: "Tjänster",
      description:
        "Företagswebbar, landningssidor, ombyggnationer, frontendutveckling och UI/UX-design—byggt med tydlighet, tempo och långsiktig underhållbarhet.",
    },
  },
};

export function pageMetadata(locale: Locale, id: PageId): Metadata {
  const c = copy[id][locale];
  const path = id === "home" ? "" : `/${id}`;
  const canonical = `${baseUrl}/${locale}${path}`;

  return {
    title: c.title,
    description: c.description,
    alternates: {
      canonical,
      languages: {
        en: `${baseUrl}/en${path}`,
        sv: `${baseUrl}/sv${path}`,
        "x-default": `${baseUrl}/sv${path}`,
      },
    },
    openGraph: {
      title: `${c.title} · ${site.name}`,
      description: c.description,
      url: canonical,
      siteName: site.name,
      locale: locale === "sv" ? "sv_SE" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${c.title} · ${site.name}`,
      description: c.description,
    },
  };
}
