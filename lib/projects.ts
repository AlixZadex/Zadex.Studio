export type Project = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  gradient: string;
  accent: string;
  image?: string;
  gallery?: string[];
  url?: string;
  github?: string;
};

export const projects: Project[] = [
  {
    slug: "ali-nekzad-portfolio",
    name: "Ali Nekzad Portfolio",
    category: "Portfolio",
    summary:
      "A personal portfolio focused on clear storytelling, modern frontend polish, and strong presentation of projects and technical profile.",
    gradient: "from-slate-950 via-blue-950/40 to-black",
    accent: "from-cyan-400/20 to-transparent",
    image: "/images/Portfolio.png",
    url: "https://portfolio-ali-n.netlify.app/",
    github: "https://github.com/AlixZadex/Portfolio",
  },
  {
    slug: "brandbergsskolan",
    name: "Brandbergsskolan",
    category: "School Administration",
    summary:
      "A complete absence management system for school staff with role-based workflows, attachment handling, and a practical admin dashboard.",
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
  },
  {
    slug: "northline-capital",
    name: "Northline Capital",
    category: "Finance",
    summary:
      "A refined institutional site with clear fund storytelling, compliance-aware structure, and performance-led UX for institutional audiences.",
    gradient: "from-slate-900 via-zinc-900 to-black",
    accent: "from-emerald-400/20 to-transparent",
  },
  {
    slug: "atelier-noir",
    name: "Atelier Noir",
    category: "Retail",
    summary:
      "Editorial e-commerce experience with immersive product storytelling, fast browsing, and a checkout flow tuned for conversion.",
    gradient: "from-neutral-900 via-stone-950 to-black",
    accent: "from-amber-400/20 to-transparent",
  },
  {
    slug: "pulse-health",
    name: "Pulse Health",
    category: "Healthcare",
    summary:
      "Patient-first marketing site with accessible typography, trust-building content architecture, and localized scheduling journeys.",
    gradient: "from-slate-950 via-blue-950/40 to-black",
    accent: "from-sky-400/20 to-transparent",
  },
  {
    slug: "vertex-logistics",
    name: "Vertex Logistics",
    category: "Logistics",
    summary:
      "Operations-focused web presence with service clarity, interactive route highlights, and lead capture tuned for B2B procurement teams.",
    gradient: "from-zinc-900 via-neutral-950 to-black",
    accent: "from-orange-400/20 to-transparent",
  },
  {
    slug: "studio-lumen",
    name: "Studio Lumen",
    category: "Creative",
    summary:
      "Portfolio platform for a production house—cinematic motion, case-study modularity, and press-ready media presentation.",
    gradient: "from-purple-950/60 via-zinc-950 to-black",
    accent: "from-fuchsia-400/20 to-transparent",
  },
  {
    slug: "harbor-law",
    name: "Harbor Law",
    category: "Legal",
    summary:
      "Premium law firm website with disciplined information hierarchy, secure intake touchpoints, and polished partner profiles.",
    gradient: "from-slate-950 via-slate-900 to-black",
    accent: "from-indigo-400/20 to-transparent",
  },
];
