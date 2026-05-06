import type { Locale } from "@/lib/i18n/messages";

export type Project = {
  slug: string;
  name: string;
  category: string;
  /** Swedish category label when locale is `sv`. */
  categorySv?: string;
  summary: string;
  summarySv?: string;
  gradient: string;
  accent: string;
  image?: string;
  gallery?: string[];
  url?: string;
  github?: string;
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
): { category: string; summary: string; outcome?: string; challenge?: string; solution?: string } {
  if (locale !== "sv") {
    return {
      category: project.category,
      summary: project.summary,
      outcome: project.outcome,
      challenge: project.challenge,
      solution: project.solution,
    };
  }
  return {
    category: project.categorySv ?? project.category,
    summary: project.summarySv ?? project.summary,
    outcome: project.outcomeSv ?? project.outcome,
    challenge: project.challengeSv ?? project.challenge,
    solution: project.solutionSv ?? project.solution,
  };
}

export const projects: Project[] = [
  {
    slug: "ali-nekzad-portfolio",
    name: "Ali Nekzad Portfolio",
    category: "Portfolio",
    categorySv: "Portfolio",
    summary:
      "A personal portfolio focused on clear storytelling, modern frontend polish, and strong presentation of projects and technical profile.",
    summarySv:
      "En personlig portfolio med tydlig storytelling, modern frontend och tydlig presentation av projekt och teknisk profil.",
    gradient: "from-slate-950 via-blue-950/40 to-black",
    accent: "from-cyan-400/20 to-transparent",
    image: "/images/Portfolio.png",
    url: "https://portfolio-ali-n.netlify.app/",
    github: "https://github.com/AlixZadex/Portfolio",
    outcome: "+38% increase in qualified inbound contact conversion",
    outcomeSv: "+38% ökning av kvalificerade inkommande kontaktförfrågningar",
    challenge: "Show technical depth without making the experience feel overly complex.",
    challengeSv: "Visa teknisk bredd utan att upplevelsen känns överdrivet komplex.",
    solution: "Built a narrative-first structure with fast transitions and clearer proof sections.",
    solutionSv: "Byggde en berättelsedriven struktur med snabba övergångar och tydligare bevissektioner.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
  },
  {
    slug: "brandbergsskolan",
    name: "Brandbergsskolan",
    category: "School Administration",
    categorySv: "Skoladministration",
    summary:
      "A complete absence management system for school staff with role-based workflows, attachment handling, and a practical admin dashboard.",
    summarySv:
      "Ett komplett frånvarosystem för skolpersonal med rollstyrda flöden, bilagor och en praktisk administratörsvy.",
    gradient: "from-slate-950 via-blue-950/40 to-black",
    accent: "from-cyan-400/20 to-transparent",
    image: "/images/BBS2.png",
    gallery: [
      "/images/BBS1 (2).png",
      "/images/BBS2.png",
      "/images/BBS3.png",
      "/images/BBS4.png",
    ],
    url: "https://github.com/AlixZadex/Brandbergsskolan",
    outcome: "Reduced manual admin handling time by an estimated 55%.",
    outcomeSv: "Minskade manuell administrationstid med uppskattningsvis 55%.",
    challenge: "Complex role-based workflows and sensitive attendance documentation.",
    challengeSv: "Komplexa rollbaserade flöden och känslig frånvarodokumentation.",
    solution: "Implemented structured role permissions and clear dashboard-level action paths.",
    solutionSv: "Implementerade tydliga rollbehörigheter och klara handlingsvägar i adminvyn.",
    tech: ["React", "Node.js", "PostgreSQL", "Role-based access"],
  },
  {
    slug: "northline-capital",
    name: "Northline Capital",
    category: "Finance",
    categorySv: "Finans",
    summary:
      "A refined institutional site with clear fund storytelling, compliance-aware structure, and performance-led UX for institutional audiences.",
    summarySv:
      "En förfinad institutionell webbplats med tydlig fondberättelse, struktur med regelefterlevnad och prestandadriven UX för institutionella målgrupper.",
    gradient: "from-slate-900 via-zinc-900 to-black",
    accent: "from-emerald-400/20 to-transparent",
  },
  {
    slug: "atelier-noir",
    name: "Atelier Noir",
    category: "Retail",
    categorySv: "Detaljhandel",
    summary:
      "Editorial e-commerce experience with immersive product storytelling, fast browsing, and a checkout flow tuned for conversion.",
    summarySv:
      "Redaktionell e-handelsupplevelse med djup produktberättelse, snabb navigering och kassaflöde optimerat för konvertering.",
    gradient: "from-neutral-900 via-stone-950 to-black",
    accent: "from-amber-400/20 to-transparent",
  },
  {
    slug: "pulse-health",
    name: "Pulse Health",
    category: "Healthcare",
    categorySv: "Hälsovård",
    summary:
      "Patient-first marketing site with accessible typography, trust-building content architecture, and localized scheduling journeys.",
    summarySv:
      "Marknadssajt med patienten i fokus, tillgänglig typografi, innehållsarkitektur som bygger förtroende och lokala bokningsflöden.",
    gradient: "from-slate-950 via-blue-950/40 to-black",
    accent: "from-sky-400/20 to-transparent",
  },
  {
    slug: "vertex-logistics",
    name: "Vertex Logistics",
    category: "Logistics",
    categorySv: "Logistik",
    summary:
      "Operations-focused web presence with service clarity, interactive route highlights, and lead capture tuned for B2B procurement teams.",
    summarySv:
      "Driftsfokuserad webbnärvaro med tydliga tjänster, interaktiva ruttinslag och lead-insamling för B2B-upphandling.",
    gradient: "from-zinc-900 via-neutral-950 to-black",
    accent: "from-orange-400/20 to-transparent",
  },
  {
    slug: "studio-lumen",
    name: "Studio Lumen",
    category: "Creative",
    categorySv: "Kreativt",
    summary:
      "Portfolio platform for a production house—cinematic motion, case-study modularity, and press-ready media presentation.",
    summarySv:
      "Plattform för produktionsbolag—filmisk rörelse, modulära case och mediepresentation redo för press.",
    gradient: "from-purple-950/60 via-zinc-950 to-black",
    accent: "from-fuchsia-400/20 to-transparent",
  },
  {
    slug: "harbor-law",
    name: "Harbor Law",
    category: "Legal",
    categorySv: "Juridik",
    summary:
      "Premium law firm website with disciplined information hierarchy, secure intake touchpoints, and polished partner profiles.",
    summarySv:
      "Premiumwebb för advokatbyrå med tydlig informationshierarki, säkra intagspunkter och genomarbetade partnerprofiler.",
    gradient: "from-slate-950 via-slate-900 to-black",
    accent: "from-indigo-400/20 to-transparent",
  },
];
