"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";
import { useLocale } from "@/lib/i18n/LanguageContext";
import { useLocalizedPath } from "@/lib/i18n/useLocalizedPath";
import { getProjectCopy, type Project, type ProjectMockup } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
  index?: number;
};

const browserDots = ["bg-red-300", "bg-amber-300", "bg-emerald-300"];

function BrowserFrame({
  children,
  label,
  accentClass,
}: {
  children: ReactNode;
  label: string;
  accentClass: string;
}) {
  return (
    <div className="relative h-full overflow-hidden rounded-[1.6rem] border border-slate-950/[0.08] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.14)]">
      <div className="flex items-center justify-between border-b border-slate-950/[0.07] bg-white/82 px-4 py-3">
        <div className="flex items-center gap-1.5">
          {browserDots.map((dot) => (
            <span key={dot} className={`h-2.5 w-2.5 rounded-full ${dot}`} />
          ))}
        </div>
        <div className="h-5 w-40 rounded-full border border-slate-950/[0.06] bg-slate-50" />
      </div>
      <div className="absolute right-4 top-14 rounded-full border border-white/70 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-950/55 shadow-[0_12px_28px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        {label}
      </div>
      <div className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b ${accentClass} opacity-80`} />
      <div className="relative h-[calc(100%-3rem)]">{children}</div>
    </div>
  );
}

function ProjectMockup({ type, label }: { type: ProjectMockup; label: string }) {
  if (type === "portfolio") {
    return (
      <BrowserFrame label={label} accentClass="from-sky-100 to-transparent">
        <div className="grid h-full grid-cols-[1.05fr_0.95fr] gap-5 p-5">
          <div className="flex flex-col justify-between rounded-3xl bg-gradient-to-br from-sky-50 to-white p-5">
            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-600">Alex Morgan</p>
              <p className="font-display text-2xl leading-none tracking-tight text-slate-950">Product designer for ambitious teams.</p>
              <p className="mt-5 text-[11px] leading-relaxed text-slate-500">Selected work, skills and a direct path to start a conversation.</p>
            </div>
            <div className="flex gap-2">
              {["UI", "React", "Motion"].map((item) => (
                <span key={item} className="rounded-full bg-white px-3 py-1 text-[10px] font-medium text-slate-600 shadow-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-28 rounded-3xl bg-gradient-to-br from-blue-500 to-sky-300 p-4 text-white shadow-[0_18px_36px_rgba(37,99,235,0.24)]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80">Featured case</p>
              <p className="mt-8 font-display text-xl leading-none">Studio identity</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="h-24 rounded-2xl border border-slate-950/[0.07] bg-white p-3">
                <p className="text-[10px] font-medium text-slate-500">About</p>
                <p className="mt-7 font-display text-lg text-slate-950">8 yrs</p>
              </div>
              <div className="h-24 rounded-2xl border border-slate-950/[0.07] bg-white p-3">
                <p className="text-[10px] font-medium text-slate-500">Projects</p>
                <p className="mt-7 font-display text-lg text-sky-600">24+</p>
              </div>
            </div>
          </div>
        </div>
      </BrowserFrame>
    );
  }

  if (type === "agency") {
    return (
      <BrowserFrame label={label} accentClass="from-violet-100 to-transparent">
        <div className="h-full p-5">
          <div className="rounded-[1.4rem] bg-gradient-to-br from-indigo-600 via-blue-600 to-violet-500 p-5 text-white shadow-[0_22px_55px_rgba(79,70,229,0.25)]">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold tracking-tight text-white">Flow Agency</p>
              <div className="flex gap-2">
                <span className="rounded-full bg-white/15 px-3 py-1 text-[10px]">Services</span>
                <span className="rounded-full bg-white/25 px-3 py-1 text-[10px]">Pricing</span>
              </div>
            </div>
            <p className="mt-10 max-w-xs font-display text-3xl leading-none tracking-tight">Launch better campaigns faster.</p>
            <p className="mt-4 text-xs leading-relaxed text-white/72">Strategy, design and launch systems for growing companies.</p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {["Strategy", "Design", "Growth"].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-950/[0.07] bg-white p-3 shadow-sm">
                <div className="mb-5 h-7 w-7 rounded-xl bg-violet-100" />
                <p className="text-[10px] font-medium text-slate-600">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-[1fr_0.7fr] gap-3">
            <div className="h-20 rounded-2xl bg-slate-50 p-3">
              <p className="text-[10px] font-medium text-slate-500">Client feedback</p>
              <p className="mt-5 text-xs font-medium text-slate-900">Clean, premium and easy to sell with.</p>
            </div>
            <div className="h-20 rounded-2xl bg-violet-50 p-3">
              <p className="text-[10px] font-medium text-violet-600">Starter</p>
              <p className="mt-5 font-display text-xl text-slate-950">$2.5k</p>
            </div>
          </div>
        </div>
      </BrowserFrame>
    );
  }

  if (type === "restaurant") {
    return (
      <BrowserFrame label={label} accentClass="from-rose-100 to-transparent">
        <div className="h-full p-5">
          <div className="grid h-full grid-cols-[0.95fr_1.05fr] gap-4">
            <div className="rounded-[1.4rem] bg-rose-50 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-rose-500">Sora Sushi</p>
              <p className="mt-8 font-display text-3xl leading-none text-slate-950">Fresh omakase in Stockholm.</p>
              <div className="mt-8 rounded-full bg-white px-4 py-3 text-center text-[10px] font-semibold text-rose-600 shadow-sm">
                RESERVE TABLE
              </div>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="h-28 rounded-3xl bg-gradient-to-br from-red-200 to-rose-100 p-3">
                  <div className="h-full rounded-2xl bg-white/60" />
                </div>
                <div className="h-28 rounded-3xl bg-gradient-to-br from-orange-100 to-red-100 p-3">
                  <div className="h-full rounded-2xl bg-white/60" />
                </div>
              </div>
              <div className="rounded-3xl border border-slate-950/[0.07] bg-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-medium text-slate-500">Popular menu</p>
                    <p className="mt-2 text-sm font-semibold text-slate-950">Salmon nigiri set</p>
                  </div>
                  <div className="h-9 w-9 rounded-full bg-rose-100" />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="h-2 rounded-full bg-rose-200" />
                  <div className="h-2 rounded-full bg-slate-200" />
                  <div className="h-2 rounded-full bg-slate-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </BrowserFrame>
    );
  }

  if (type === "fitness") {
    return (
      <BrowserFrame label={label} accentClass="from-orange-100 to-transparent">
        <div className="h-full p-5">
          <div className="grid h-full grid-cols-[1fr_0.85fr] gap-4">
            <div className="rounded-[1.4rem] bg-gradient-to-br from-slate-950 to-slate-800 p-5 text-white">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-300">Atlas Performance</p>
              <p className="mt-9 font-display text-3xl leading-none tracking-tight">Strength coaching with structure.</p>
              <div className="mt-9 grid grid-cols-3 gap-2">
                {[68, 48, 80].map((height) => (
                  <div key={height} className="flex h-20 items-end rounded-2xl bg-white/8 p-2">
                    <div className="w-full rounded-xl bg-orange-400" style={{ height }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div className="rounded-3xl border border-orange-200 bg-orange-50 p-4">
                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-orange-500">Membership</p>
                <p className="mt-7 font-display text-2xl text-slate-950">12 weeks</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="h-24 rounded-2xl bg-white p-3 shadow-sm">
                  <div className="h-8 w-8 rounded-full bg-orange-100" />
                  <p className="mt-6 text-[10px] font-medium text-slate-500">Trainer</p>
                </div>
                <div className="h-24 rounded-2xl bg-white p-3 shadow-sm">
                  <div className="h-8 w-8 rounded-full bg-slate-950" />
                  <p className="mt-6 text-[10px] font-medium text-slate-500">Booking</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BrowserFrame>
    );
  }

  return null;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const { locale, t } = useLocale();
  const lp = useLocalizedPath();
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const glow = useMotionTemplate`radial-gradient(520px circle at ${pointerX}% ${pointerY}%, rgba(0,132,255,0.18), transparent 46%)`;
  const { category, summary, mockupLabel, outcome, challenge, solution } = getProjectCopy(project, locale);

  const onPointerMove = (event: MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width) * 100);
    pointerY.set(((event.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <motion.article
      className="group relative h-full"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.62, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={onPointerMove}
    >
      <div
        className={`relative h-full overflow-hidden rounded-[2rem] border border-slate-950/[0.08] bg-gradient-to-br ${project.gradient} p-px shadow-[0_24px_90px_rgba(15,23,42,0.12)] transition duration-500 group-hover:-translate-y-1 group-hover:border-blue-500/25`}
      >
        <motion.div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: glow }} />
        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-tr ${project.accent} opacity-60 transition duration-500 group-hover:opacity-95`} />

        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(2rem-1px)] bg-white/80 backdrop-blur-xl">
          <div className="relative aspect-[16/10] overflow-hidden border-b border-slate-950/[0.08] bg-gradient-to-br from-white via-slate-50 to-white p-4 sm:p-5">
            {project.image ? (
              <motion.div
                className="relative h-full overflow-hidden rounded-[1.6rem] border border-slate-950/[0.08] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.14)]"
                animate={prefersReducedMotion ? undefined : { y: [0, -5, 0] }}
                transition={prefersReducedMotion ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
              >
                <Image
                  src={project.image}
                  alt={`${project.name} website preview`}
                  fill
                  quality={90}
                  priority={index < 2}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-top transition duration-700 group-hover:scale-[1.03]"
                />
              </motion.div>
            ) : (
              <motion.div
                className="h-full"
                animate={prefersReducedMotion ? undefined : { y: [0, -5, 0] }}
                transition={prefersReducedMotion ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
              >
                <ProjectMockup type={project.mockup} label={mockupLabel} />
              </motion.div>
            )}
          </div>

          <div className="flex flex-1 flex-col px-6 py-6 sm:px-7">
            <div className="mb-5 flex items-center justify-between gap-3">
              <span className="rounded-full border border-blue-500/15 bg-blue-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                {category}
              </span>
              <span className="text-xs uppercase tracking-widest text-slate-950/42">0{index + 1}</span>
            </div>

            <h2 className="font-display text-3xl tracking-tight text-slate-950">{project.name}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">{summary}</p>

            <div className="mt-6 grid gap-3">
              {challenge ? (
                <div className="rounded-2xl border border-slate-950/[0.08] bg-white/78 p-4 shadow-[0_12px_34px_rgba(15,23,42,0.04)]">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-950/38">{t("project.problem")}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-950/78">{challenge}</p>
                </div>
              ) : null}
              {solution ? (
                <div className="rounded-2xl border border-slate-950/[0.08] bg-white/78 p-4 shadow-[0_12px_34px_rgba(15,23,42,0.04)]">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-950/38">{t("project.solution")}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-950/78">{solution}</p>
                </div>
              ) : null}
            </div>

            {outcome ? (
              <div className="mt-4 rounded-2xl border border-blue-500/12 bg-blue-500/[0.06] px-4 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">{t("project.result")}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-950/90">{outcome}</p>
              </div>
            ) : null}

            {project.tech?.length ? (
              <div className="mt-5">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-950/35">{t("project.stack")}</p>
                <ul className="flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <li key={`${project.slug}-${item}`} className="rounded-full border border-slate-950/10 bg-white/80 px-2.5 py-1 text-[11px] text-slate-950/68">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-auto pt-6">
              <Link
                href={lp("/contact")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-950/10 bg-slate-950 px-5 py-3 text-sm font-medium text-white shadow-[0_18px_44px_rgba(15,23,42,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_22px_58px_rgba(37,99,235,0.24)] sm:w-auto"
              >
                {t("project.view")}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
