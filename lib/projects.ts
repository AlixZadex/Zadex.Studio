import type { Locale } from "@/lib/i18n/messages";

export type ProjectMockup = "portfolio" | "agency" | "restaurant" | "fitness";

export type Project = {
  slug: string;
  name: string;
  category: string;
  categorySv?: string;
  summary: string;
  summarySv?: string;
  gradient: string;
  accent: string;
  image?: string;
  mockup: ProjectMockup;
  mockupLabel: string;
  mockupLabelSv?: string;
  outcome?: string;
  outcomeSv?: string;
  challenge?: string;
  challengeSv?: string;
  solution?: string;
  solutionSv?: string;
  tech?: string[];
};

export function getProjectCopy(
  project: Project,
  locale: Locale,
): {
  category: string;
  summary: string;
  mockupLabel: string;
  outcome?: string;
  challenge?: string;
  solution?: string;
} {
  if (locale !== "sv") {
    return {
      category: project.category,
      summary: project.summary,
      mockupLabel: project.mockupLabel,
      outcome: project.outcome,
      challenge: project.challenge,
      solution: project.solution,
    };
  }

  return {
    category: project.categorySv ?? project.category,
    summary: project.summarySv ?? project.summary,
    mockupLabel: project.mockupLabelSv ?? project.mockupLabel,
    outcome: project.outcomeSv ?? project.outcome,
    challenge: project.challengeSv ?? project.challenge,
    solution: project.solutionSv ?? project.solution,
  };
}

export const projects: Project[] = [
  {
    slug: "portfolio",
    name: "Portfolio",
    category: "Personal portfolio",
    categorySv: "Personlig portfolio",
    image: "/images/project-portfolio.png",
    mockup: "portfolio",
    mockupLabel: "Creative developer portfolio",
    mockupLabelSv: "Kreativ portfolio för utvecklare",
    summary:
      "A polished personal portfolio with a confident hero, about section, skills, selected work, and a direct contact path.",
    summarySv:
      "En polerad personlig portfolio med stark hero, om-sektion, skills, utvalda projekt och tydlig väg till kontakt.",
    gradient: "from-sky-100 via-white to-blue-100",
    accent: "from-sky-300/28 via-blue-300/16 to-transparent",
    outcome: "A professional first impression that makes experience, personality, and project quality easy to scan.",
    outcomeSv: "Ett professionellt första intryck där erfarenhet, personlighet och projektkvalitet blir lätt att ta in.",
    challenge: "The client needed to stand out creatively without making the site feel busy or hard to navigate.",
    challengeSv: "Kunden behövde sticka ut kreativt utan att sidan kändes rörig eller svår att navigera.",
    solution: "Built a clean one-page portfolio with soft gradients, smooth scroll sections, and subtle motion.",
    solutionSv: "Byggde en ren one-page portfolio med mjuka gradienter, tydliga sektioner och subtil rörelse.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
  },
  {
    slug: "flow-agency",
    name: "Flow Agency",
    category: "Company landing page",
    categorySv: "Företagslandning",
    image: "/images/project-flow-agency.png",
    mockup: "agency",
    mockupLabel: "Startup agency landing page",
    mockupLabelSv: "Modern landningssida för företag",
    summary:
      "A modern company landing page with services, testimonials, pricing, FAQ, and strong conversion-focused CTA sections.",
    summarySv:
      "En modern företagslandning med tjänster, testimonials, priser, FAQ och tydliga sektioner för konvertering.",
    gradient: "from-indigo-100 via-white to-violet-100",
    accent: "from-indigo-300/24 via-violet-300/16 to-transparent",
    outcome: "Clearer positioning and a page structure ready for paid traffic, sales calls, and lead capture.",
    outcomeSv: "Tydligare positionering och en sidstruktur redo för trafik, säljsamtal och leadgenerering.",
    challenge: "The offer needed to feel premium and simple even with several services and pricing options.",
    challengeSv: "Erbjudandet behövde kännas premium och enkelt trots flera tjänster och prisnivåer.",
    solution: "Designed a minimal SaaS-style page with strong hierarchy, proof blocks, and frictionless CTAs.",
    solutionSv: "Designade en minimal SaaS-inspirerad sida med stark hierarki, proof-block och friktionsfria CTA:er.",
    tech: ["Next.js", "Landing page", "SEO", "Analytics"],
  },
  {
    slug: "sora-sushi",
    name: "Sora Sushi",
    category: "Restaurant website",
    categorySv: "Restaurangwebb",
    image: "/images/project-sora-sushi.png",
    mockup: "restaurant",
    mockupLabel: "Elegant restaurant experience",
    mockupLabelSv: "Elegant restaurangupplevelse",
    summary:
      "A clean restaurant website with food highlights, menu sections, reservation flow, reviews, and an editorial gallery.",
    summarySv:
      "En ren restaurangwebb med matpresentation, meny, bokningsflöde, kundomdömen och en elegant bildkänsla.",
    gradient: "from-rose-100 via-white to-red-100",
    accent: "from-rose-300/22 via-red-300/12 to-transparent",
    outcome: "A warmer brand experience that makes the food, location, and reservation path feel premium.",
    outcomeSv: "En varmare varumärkesupplevelse där maten, platsen och bokningen känns mer premium.",
    challenge: "The restaurant needed an elegant site that could sell atmosphere without becoming slow or image-heavy.",
    challengeSv: "Restaurangen behövde en elegant sida som säljer känsla utan att bli långsam eller bildtung.",
    solution: "Created a light editorial layout with menu cards, reservation focus, reviews, and restrained red accents.",
    solutionSv: "Skapade en ljus redaktionell layout med menykort, bokningsfokus, recensioner och återhållna röda accenter.",
    tech: ["Next.js", "Reservations", "CMS-ready", "Responsive"],
  },
  {
    slug: "atlas-performance",
    name: "Atlas Performance",
    category: "Fitness website",
    categorySv: "Fitnesswebb",
    image: "/images/project-atlas-performance.png",
    mockup: "fitness",
    mockupLabel: "Premium trainer landing page",
    mockupLabelSv: "Premiumsida för tränare",
    summary:
      "A luxury-clean fitness landing page with transformations, trainer profile, memberships, booking, and client proof.",
    summarySv:
      "En lyxigt ren fitness-sida med transformationer, tränarprofil, medlemskap, bokning och kundbevis.",
    gradient: "from-orange-100 via-white to-amber-100",
    accent: "from-orange-300/24 via-amber-300/12 to-transparent",
    outcome: "A stronger sales page that makes coaching plans feel structured, credible, and easy to book.",
    outcomeSv: "En starkare säljsida där träningsupplägg känns strukturerade, trovärdiga och enkla att boka.",
    challenge: "The brand needed energy and confidence without the typical loud gym aesthetic.",
    challengeSv: "Varumärket behövde energi och självförtroende utan den vanliga högljudda gymkänslan.",
    solution: "Built a bright performance-led layout with orange accents, comparison cards, pricing, and booking CTAs.",
    solutionSv: "Byggde en ljus prestationsdriven layout med orange accenter, jämförelsekort, priser och bokningsknappar.",
    tech: ["Next.js", "Booking flow", "Pricing", "Motion"],
  },
];
