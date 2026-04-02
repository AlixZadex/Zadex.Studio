"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type ServiceOption = { value: string; label: string };

type ServiceSelectProps = {
  id: string;
  labelId: string;
  options: readonly ServiceOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
  hasError?: boolean;
};

export function ServiceSelect({
  id,
  labelId,
  options,
  value,
  onChange,
  placeholder,
  disabled,
  hasError,
}: ServiceSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    function handlePointer(e: PointerEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", handlePointer);
    return () => document.removeEventListener("pointerdown", handlePointer);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const selectedLabel = value ? options.find((o) => o.value === value)?.label : undefined;
  const display = selectedLabel || placeholder;
  const displayMuted = !value;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        id={id}
        disabled={disabled}
        aria-labelledby={labelId}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-invalid={hasError || undefined}
        onClick={() => {
          if (!disabled) setOpen((o) => !o);
        }}
        className={`flex w-full items-center justify-between gap-3 rounded-2xl border bg-[#0a0a0a] px-4 py-3 text-left text-sm outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/20 disabled:opacity-50 ${
          hasError ? "border-red-400/40" : "border-white/[0.08]"
        } ${open && !hasError ? "border-accent/40" : ""}`}
      >
        <span className={displayMuted ? "text-white/35" : "text-white"}>{display}</span>
        <svg
          className={`h-4 w-4 shrink-0 text-white/50 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          aria-hidden
        >
          <path strokeWidth="2" d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={listId}
            role="listbox"
            aria-labelledby={labelId}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 z-50 mt-2 max-h-64 overflow-auto rounded-2xl border border-white/[0.12] bg-[#111] py-1 shadow-[0_24px_48px_rgba(0,0,0,0.55)]"
          >
            {options.map((opt) => {
              const selected = value === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={`w-full px-4 py-2.5 text-left text-sm transition ${
                    selected
                      ? "bg-accent/15 text-accent"
                      : "text-white/90 hover:bg-white/[0.08] hover:text-white"
                  }`}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
