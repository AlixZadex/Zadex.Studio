"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FormEvent, useMemo, useState } from "react";
import { useLocale } from "@/lib/i18n/LanguageContext";

type Field =
  | "businessType"
  | "websiteType"
  | "features"
  | "budget"
  | "timeline"
  | "name"
  | "email"
  | "phone";

type Message = {
  role: "assistant" | "user";
  content: string;
};

type LeadState = Partial<Record<Field, string>> & {
  company?: string;
};

type AssistantMode = "chat" | "quote";

type Step = {
  field: Field;
  label: { sv: string; en: string };
  placeholder: { sv: string; en: string };
  quick?: string[];
};

const steps: Step[] = [
  {
    field: "businessType",
    label: { sv: "Vad driver du för typ av företag?", en: "What type of business do you run?" },
    placeholder: { sv: "Ex. restaurang, konsultbolag, gym, e-handel...", en: "E.g. restaurant, consultancy, gym, ecommerce..." },
    quick: ["Webbyrå", "Restaurang", "Fitness", "Konsultbolag"],
  },
  {
    field: "websiteType",
    label: { sv: "Vilken typ av webbplats behöver du?", en: "What type of website do you need?" },
    placeholder: { sv: "Ex. ny hemsida, landningssida, redesign...", en: "E.g. new website, landing page, redesign..." },
    quick: ["Ny hemsida", "Landningssida", "Redesign", "Webbapp"],
  },
  {
    field: "features",
    label: { sv: "Vilka funktioner vill du ha med?", en: "Which features should be included?" },
    placeholder: { sv: "Ex. bokning, formulär, CMS, blogg, flerspråkigt...", en: "E.g. booking, forms, CMS, blog, multilingual..." },
    quick: ["Bokning", "Kontaktformulär", "CMS", "Animationer"],
  },
  {
    field: "budget",
    label: { sv: "Vilken budgetnivå tänker du ungefär?", en: "What budget range are you considering?" },
    placeholder: { sv: "Ex. 5 000 - 10 000 kr, 20 000+ kr...", en: "E.g. 5,000 - 10,000 SEK, 20,000+ SEK..." },
    quick: ["Under 5 000 kr", "5 000 - 10 000 kr", "10 000 - 20 000 kr", "20 000+ kr", "Vet inte ännu"],
  },
  {
    field: "timeline",
    label: { sv: "När vill du lansera?", en: "When do you want to launch?" },
    placeholder: { sv: "Ex. inom 2 veckor, 1 månad, flexibel...", en: "E.g. within 2 weeks, 1 month, flexible..." },
    quick: ["2 veckor", "1 månad", "2-3 månader", "Flexibelt"],
  },
  {
    field: "name",
    label: { sv: "Vad heter du?", en: "What is your name?" },
    placeholder: { sv: "Ditt namn", en: "Your name" },
  },
  {
    field: "email",
    label: { sv: "Vilken e-post ska vi svara till?", en: "Which email should we reply to?" },
    placeholder: { sv: "namn@foretag.se", en: "name@company.com" },
  },
  {
    field: "phone",
    label: { sv: "Sist: vilket telefonnummer kan vi nå dig på?", en: "Finally: what phone number can we reach you on?" },
    placeholder: { sv: "+46 ...", en: "+46 ..." },
  },
];

const copy = {
  sv: {
    intro:
      "Hej, jag är zadex assistant. Fråga mig om zadex, tjänster, process och budget, eller starta en projektbrief för offert.",
    button: "AI offertassistent",
    title: "zadex assistant",
    subtitle: "Frågor och projektbrief",
    inputLabel: "Skriv ditt svar",
    chatPlaceholder: "Fråga om zadex, tjänster, pris, process...",
    chatMode: "Fråga",
    quoteMode: "Offert",
    send: "Skicka",
    sending: "Skickar...",
    doneTitle: "Briefen är skickad",
    doneBody: "Tack. Vi återkommer med nästa steg så snart vi kan.",
    error: "Något gick fel. Testa igen eller använd kontaktformuläret.",
    close: "Stäng assistant",
    open: "Öppna assistant",
    progress: "steg",
  },
  en: {
    intro:
      "Hi, I am the zadex assistant. Ask about zadex, services, process and budget, or start a project brief for a quote.",
    button: "AI quote assistant",
    title: "zadex assistant",
    subtitle: "Questions and project brief",
    inputLabel: "Write your answer",
    chatPlaceholder: "Ask about zadex, services, pricing, process...",
    chatMode: "Ask",
    quoteMode: "Quote",
    send: "Send",
    sending: "Sending...",
    doneTitle: "Brief sent",
    doneBody: "Thanks. We will get back to you with clear next steps as soon as we can.",
    error: "Something went wrong. Try again or use the contact form.",
    close: "Close assistant",
    open: "Open assistant",
    progress: "step",
  },
};

function isValidStepValue(field: Field, value: string) {
  const trimmed = value.trim();
  if (field === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
  if (field === "phone") return trimmed.length >= 6;
  return trimmed.length >= 2;
}

export function AIAssistant() {
  const { locale } = useLocale();
  const prefersReducedMotion = useReducedMotion();
  const c = copy[locale];
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<AssistantMode>("chat");
  const [stepIndex, setStepIndex] = useState(0);
  const [value, setValue] = useState("");
  const [lead, setLead] = useState<LeadState>({});
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: c.intro }]);
  const [status, setStatus] = useState<"idle" | "thinking" | "sending" | "success">("idle");
  const [error, setError] = useState<string | null>(null);

  const currentStep = steps[stepIndex];
  const progress = Math.round(((stepIndex + 1) / steps.length) * 100);
  const canSubmit = useMemo(() => {
    if (mode === "chat") return value.trim().length >= 2;
    return currentStep && isValidStepValue(currentStep.field, value);
  }, [currentStep, mode, value]);

  async function getAssistantReply(nextQuestion: string | undefined, latestAnswer: string, context: LeadState, nextMode: AssistantMode, nextMessages: Message[]) {
    const res = await fetch("/api/assistant/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        locale,
        projectContext: context,
        latestAnswer,
        nextQuestion,
        mode: nextMode,
        messages: nextMessages.slice(-12),
      }),
    });
    const data = (await res.json()) as { reply?: string };
    return (
      data.reply?.trim() ||
      nextQuestion ||
      (locale === "sv"
        ? "Jag kan hjälpa dig med frågor om zadex, våra tjänster och hur du startar ett projekt."
        : "I can help with questions about zadex, our services, and how to start a project.")
    );
  }

  async function submitLead(nextLead: LeadState, nextMessages: Message[]) {
    setStatus("sending");
    setError(null);
    const res = await fetch("/api/assistant/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...nextLead,
        transcript: nextMessages,
      }),
    });

    if (!res.ok) throw new Error("Could not submit assistant lead.");
    setStatus("success");
    setMessages((prev) => [...prev, { role: "assistant", content: `${c.doneTitle}. ${c.doneBody}` }]);
  }

  async function handleAnswer(answer: string) {
    if (status !== "idle") return;
    if (mode === "quote" && (!currentStep || !isValidStepValue(currentStep.field, answer))) return;
    if (mode === "chat" && answer.trim().length < 2) return;

    const cleanAnswer = answer.trim();
    const nextLead = mode === "quote" && currentStep ? { ...lead, [currentStep.field]: cleanAnswer } : lead;
    const userMessage: Message = { role: "user", content: cleanAnswer };
    const nextMessages = [...messages, userMessage];

    setLead(nextLead);
    setMessages(nextMessages);
    setValue("");
    setError(null);

    if (mode === "chat") {
      setStatus("thinking");
      try {
        const reply = await getAssistantReply(undefined, cleanAnswer, nextLead, "chat", nextMessages);
        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              locale === "sv"
                ? "Jag kan svara på frågor om zadex, våra tjänster, process, budget och hur du startar ett projekt."
                : "I can answer questions about zadex, our services, process, budget, and how to start a project.",
          },
        ]);
      } finally {
        setStatus("idle");
      }
      return;
    }

    const nextIndex = stepIndex + 1;
    if (nextIndex >= steps.length) {
      try {
        await submitLead(nextLead, nextMessages);
      } catch {
        setStatus("idle");
        setError(c.error);
      }
      return;
    }

    setStatus("thinking");
    const nextQuestion = steps[nextIndex].label[locale];
    try {
      const reply = await getAssistantReply(nextQuestion, cleanAnswer, nextLead, "quote", nextMessages);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: nextQuestion }]);
    } finally {
      setStepIndex(nextIndex);
      setStatus("idle");
    }
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    await handleAnswer(value);
  }

  function resetAssistant() {
    setStepIndex(0);
    setValue("");
    setLead({});
    setMessages([{ role: "assistant", content: c.intro }]);
    setMode("chat");
    setStatus("idle");
    setError(null);
  }

  function switchMode(nextMode: AssistantMode) {
    if (status !== "idle" || mode === nextMode) return;
    setMode(nextMode);
    setValue("");
    setError(null);
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content:
          nextMode === "quote"
            ? steps[stepIndex].label[locale]
            : locale === "sv"
              ? "Absolut. Fråga mig fritt om zadex, tjänster, budget, process eller projekt."
              : "Absolutely. Ask me anything about zadex, services, budget, process, or projects.",
      },
    ]);
  }

  return (
    <div className="fixed bottom-4 right-4 z-[70] sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 w-[calc(100vw-2rem)] overflow-hidden rounded-[1.75rem] border border-slate-950/[0.09] bg-white/92 shadow-[0_26px_90px_rgba(15,23,42,0.18)] backdrop-blur-2xl sm:w-[420px]"
          >
            <div className="relative overflow-hidden border-b border-slate-950/[0.08] bg-gradient-to-br from-white via-sky-50 to-violet-50 px-5 py-4">
              <div className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-blue-400/15 blur-3xl" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-700">{c.subtitle}</p>
                  <h2 className="mt-1 font-display text-xl tracking-tight text-slate-950">{c.title}</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-slate-950/10 bg-white/70 text-slate-600 transition hover:bg-white hover:text-slate-950"
                  aria-label={c.close}
                >
                  <span className="relative h-3.5 w-3.5" aria-hidden="true">
                    <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-current" />
                    <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-current" />
                  </span>
                </button>
              </div>
              <div className="relative mt-4 grid grid-cols-2 gap-2 rounded-full border border-slate-950/10 bg-white/65 p-1">
                {(["chat", "quote"] as AssistantMode[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => switchMode(item)}
                    className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                      mode === item ? "bg-slate-950 text-white shadow-[0_10px_24px_rgba(15,23,42,0.16)]" : "text-slate-600 hover:bg-white"
                    }`}
                  >
                    {item === "chat" ? c.chatMode : c.quoteMode}
                  </button>
                ))}
              </div>
              {mode === "quote" ? (
                <>
                  <div className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-slate-950/10">
                    <motion.div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500" animate={{ width: `${progress}%` }} />
                  </div>
                  <p className="relative mt-2 text-[11px] uppercase tracking-[0.16em] text-slate-500">
                    {c.progress} {stepIndex + 1}/{steps.length}
                  </p>
                </>
              ) : null}
            </div>

            <div className="max-h-[45vh] space-y-3 overflow-y-auto px-5 py-5 sm:max-h-[420px]">
              {messages.map((message, index) => (
                <motion.div
                  key={`${message.role}-${index}-${message.content.slice(0, 12)}`}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "bg-slate-950 text-white"
                        : "border border-slate-950/[0.08] bg-slate-50 text-slate-700"
                    }`}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}
              {status === "thinking" ? (
                <div className="inline-flex rounded-2xl border border-slate-950/[0.08] bg-slate-50 px-4 py-3 text-sm text-slate-500">
                  <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-blue-500" />
                  Thinking...
                </div>
              ) : null}
            </div>

            {status === "success" ? (
              <div className="border-t border-slate-950/[0.08] p-5">
                <button
                  type="button"
                  onClick={resetAssistant}
                  className="w-full rounded-full border border-slate-950/10 bg-white px-5 py-3 text-sm font-medium text-slate-950 shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition hover:bg-slate-50"
                >
                  {locale === "sv" ? "Starta ny brief" : "Start new brief"}
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="border-t border-slate-950/[0.08] p-5">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-950/45">
                  {mode === "chat" ? c.inputLabel : currentStep?.label[locale] ?? c.inputLabel}
                </label>
                {mode === "quote" && currentStep?.quick?.length ? (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {currentStep.quick.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleAnswer(item)}
                        disabled={status !== "idle"}
                        className="rounded-full border border-blue-500/15 bg-blue-500/[0.06] px-3 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-500/10 disabled:opacity-50"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                ) : null}
                <div className="flex gap-2">
                  <input
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    placeholder={mode === "chat" ? c.chatPlaceholder : currentStep?.placeholder[locale]}
                    className="min-w-0 flex-1 rounded-full border border-slate-950/12 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/15"
                    disabled={status !== "idle"}
                    type={mode === "quote" && currentStep?.field === "email" ? "email" : mode === "quote" && currentStep?.field === "phone" ? "tel" : "text"}
                  />
                  <button
                    type="submit"
                    disabled={!canSubmit || status !== "idle"}
                    className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white shadow-[0_14px_34px_rgba(15,23,42,0.18)] transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {status === "sending" ? c.sending : c.send}
                  </button>
                </div>
                {error ? <p className="mt-3 text-xs text-red-600">{error}</p> : null}
              </form>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="group flex items-center gap-3 rounded-full border border-slate-950/10 bg-white/90 px-4 py-3 text-sm font-semibold text-slate-950 shadow-[0_20px_60px_rgba(15,23,42,0.16)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-blue-500/25"
        whileTap={{ scale: 0.98 }}
        aria-label={open ? c.close : c.open}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-white shadow-[0_10px_24px_rgba(37,99,235,0.28)]">
          AI
        </span>
        <span className="hidden sm:block">{c.button}</span>
      </motion.button>
    </div>
  );
}
