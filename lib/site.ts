export const site = {
  name: "zadex",
  tagline: "Digital experiences that convert.",
  description:
    "zadex is a digital studio crafting fast, refined websites for brands that refuse to blend in.",
  email: "info@zadex.se",
  phone: "0763422441",
  address: "Stockholm, Sweden",
} as const;

/** E.164-style value for `tel:` links (Swedish mobile starting with 0 → +46). */
export function phoneTelHref(): string {
  const digits = site.phone.replace(/\D/g, "");
  if (digits.startsWith("0")) return `+46${digits.slice(1)}`;
  return digits.startsWith("+") ? digits : `+${digits}`;
}

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerLinks = {
  company: [
    { href: "/about", label: "About" },
    { href: "/process", label: "Process" },
    { href: "/contact", label: "Contact" },
  ],
  work: [
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
  ],
  social: [
    { href: "https://linkedin.com", label: "LinkedIn" },
    { href: "https://instagram.com", label: "Instagram" },
    { href: "https://x.com", label: "X" },
  ],
} as const;
