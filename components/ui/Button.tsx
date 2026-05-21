"use client";

import Link from "next/link";
import { useState, type MouseEvent, type ReactNode } from "react";

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
  primary: `${base} border border-blue-500/20 bg-[linear-gradient(135deg,#020617_0%,#0f5eff_48%,#7c3aed_100%)] text-white shadow-[0_18px_44px_rgba(37,99,235,0.24)] hover:shadow-[0_22px_58px_rgba(37,99,235,0.34)]`,
  secondary: `${base} border border-slate-950/12 bg-white/70 text-slate-950 shadow-[0_12px_34px_rgba(15,23,42,0.08)] backdrop-blur-xl hover:border-blue-500/30 hover:bg-white hover:shadow-[0_18px_44px_rgba(37,99,235,0.12)]`,
  ghost: `${base} bg-transparent text-slate-800 hover:bg-slate-950/[0.05] hover:text-slate-950`,
};

export function Button(props: ButtonProps & { variant?: keyof typeof variants }) {
  const { variant = "primary", className = "", children } = props;
  const styles = `${variants[variant]} ${className}`;
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.12;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
    setMagnet({ x, y });
  };
  const onLeave = () => setMagnet({ x: 0, y: 0 });
  const magneticStyle = {
    transform: `translate3d(${magnet.x}px, ${magnet.y}px, 0)`,
  };

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a
          href={props.href}
          className={styles}
          style={magneticStyle}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={styles} style={magneticStyle} onMouseMove={onMove} onMouseLeave={onLeave}>
        {children}
      </Link>
    );
  }

  const { type = "button", onClick, disabled } = props as ButtonAsButton;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles}
      style={magneticStyle}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </button>
  );
}


