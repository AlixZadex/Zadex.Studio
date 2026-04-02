export const site = {
  name: "zadex",
  tagline: "Digital experiences that convert.",
  description:
    "zadex is a digital studio crafting fast, refined websites for brands that refuse to blend in.",
  email: "info@zadex.se",
  phone: "+46 76 342 24 41",
  address: "Stockholm, Sweden",
} as const;

/** E.164-style value for `tel:` links (handles 07… and +46…). */
export function phoneTelHref(): string {
  const digits = site.phone.replace(/\D/g, "");
  if (digits.startsWith("0")) return `+46${digits.slice(1)}`;
  if (digits.startsWith("46")) return `+${digits}`;
  return `+${digits}`;
}
