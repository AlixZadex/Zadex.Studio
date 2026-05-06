import Link from "next/link";
import type { ReactNode } from "react";

type ButtonBase = {
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = ButtonBase & {
  href?: undefined;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

type ButtonAsLink = ButtonBase & {
  href: string;
  external?: boolean;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary: `${base} bg-accent text-background hover:bg-white hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08)]`,
  secondary: `${base} border border-white/15 bg-white/[0.03] text-white hover:border-accent/40 hover:bg-white/[0.06]`,
  ghost: `${base} bg-transparent text-white/90 hover:bg-white/[0.06]`,
};

export function Button(props: ButtonProps & { variant?: keyof typeof variants }) {
  const { variant = "primary", className = "", children } = props;
  const styles = `${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a
          href={props.href}
          className={styles}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={styles}>
        {children}
      </Link>
    );
  }

  const { type = "button", onClick, disabled } = props as ButtonAsButton;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={styles}>
      {children}
    </button>
  );
}
