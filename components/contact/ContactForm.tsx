"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ServiceSelect } from "@/components/contact/ServiceSelect";

type FieldErrors = Partial<Record<string, string>>;

const serviceOptions = [
  "Business website",
  "Landing page",
  "Website redesign",
  "Frontend development",
  "UI/UX design",
  "Something else",
];

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFieldErrors({});
    setFormError(null);

    if (!service.trim()) {
      setFieldErrors({ service: "Please select a service." });
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          company: company || undefined,
          service,
          message,
        }),
      });

      const data = (await res.json()) as {
        message?: string;
        fieldErrors?: FieldErrors;
      };

      if (!res.ok) {
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        setFormError(data.message ?? "Something went wrong.");
        setStatus("idle");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setService("");
      setMessage("");
    } catch {
      setFormError("Network error. Check your connection and try again.");
      setStatus("idle");
    }
  }

  const inputClass =
    "w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/20";

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="py-4 text-center"
      >
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
            <path strokeWidth="2" d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="font-display text-2xl text-white">Message received</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
          Thank you — your note is on its way. We typically reply within one business day with clear next steps.
        </p>
        <div className="mt-8">
          <Button type="button" variant="secondary" onClick={() => setStatus("idle")}>
            Send another message
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <AnimatePresence>
        {formError ? (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100"
            role="alert"
          >
            {formError}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/50">
            Name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            required
            disabled={status === "loading"}
          />
          {fieldErrors.name ? (
            <p className="mt-1.5 text-xs text-red-300">{fieldErrors.name}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/50">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            required
            disabled={status === "loading"}
          />
          {fieldErrors.email ? (
            <p className="mt-1.5 text-xs text-red-300">{fieldErrors.email}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/50">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
            required
            disabled={status === "loading"}
          />
          {fieldErrors.phone ? (
            <p className="mt-1.5 text-xs text-red-300">{fieldErrors.phone}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="company" className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/50">
            Company
          </label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={inputClass}
            disabled={status === "loading"}
          />
          {fieldErrors.company ? (
            <p className="mt-1.5 text-xs text-red-300">{fieldErrors.company}</p>
          ) : null}
        </div>
      </div>

      <div>
        <label id="service-label" htmlFor="service" className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/50">
          Service needed
        </label>
        <ServiceSelect
          id="service"
          labelId="service-label"
          options={serviceOptions}
          value={service}
          onChange={setService}
          placeholder="Select a service"
          disabled={status === "loading"}
          hasError={Boolean(fieldErrors.service)}
        />
        {fieldErrors.service ? (
          <p className="mt-1.5 text-xs text-red-300">{fieldErrors.service}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/50">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} resize-none`}
          placeholder="Tell us about goals, timeline, and anything we should know."
          required
          disabled={status === "loading"}
        />
        {fieldErrors.message ? (
          <p className="mt-1.5 text-xs text-red-300">{fieldErrors.message}</p>
        ) : null}
      </div>

      <div className="pt-2">
        <Button type="submit" variant="primary" disabled={status === "loading"} className="w-full sm:w-auto">
          {status === "loading" ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}
