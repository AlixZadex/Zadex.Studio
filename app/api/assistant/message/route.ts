import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  locale: z.enum(["sv", "en"]),
  projectContext: z.record(z.string()).default({}),
  nextQuestion: z.string().trim().min(1).max(500).optional(),
  latestAnswer: z.string().trim().min(1).max(1000),
  mode: z.enum(["quote", "chat"]).default("quote"),
  messages: z
    .array(
      z.object({
        role: z.enum(["assistant", "user"]),
        content: z.string().trim().min(1).max(1200),
      }),
    )
    .max(20)
    .optional(),
});

const zadexKnowledge = `
zadex is a premium web studio based in Stockholm.
Brand name is always lowercase: zadex.
Main offer: premium websites, landing pages, website redesigns, frontend/UI/UX, content systems, automation and AI support, internal dashboards, web apps and SaaS prototypes.
Positioning: a web agency foundation with smarter digital help when needed. Most projects start with a website, then zadex can add booking flows, forms, automations, AI chat support, dashboards or simple business systems.
Tone: confident, clean, modern, Scandinavian, premium, not childish.
Contact email: info@zadex.se.
Pricing guidance shown in the assistant: Under 5 000 kr, 5 000 - 10 000 kr, 10 000 - 20 000 kr, 20 000+ kr, or unsure. Do not promise a fixed final price. Explain that final quote depends on scope, pages, features, content and timeline.
Process: map goals and needs, position the offer, design the experience, build the site/system, launch and refine.
Projects shown: Portfolio, Flow Agency, Sora Sushi, Atlas Performance.
If a visitor wants an offer, guide them to describe business type, website type, features, budget, timeline and contact details.
`;

function localChatReply(locale: "sv" | "en", question: string) {
  const q = question.toLowerCase();
  const isSv = locale === "sv";

  if (q.includes("pris") || q.includes("budget") || q.includes("kost") || q.includes("price") || q.includes("cost")) {
    return isSv
      ? "Budgeten beror på omfattning, antal sidor, funktioner och tidsplan. I assistenten kan du välja Under 5 000 kr, 5 000 - 10 000 kr, 10 000 - 20 000 kr, 20 000+ kr eller Vet inte ännu. För en seriös offert behöver vi veta mål, innehåll och funktioner."
      : "Budget depends on scope, number of pages, features, and timeline. The assistant can guide you through ranges from under 5,000 SEK to 20,000+ SEK. For a proper quote, we need goals, content, and required features.";
  }

  if (q.includes("tjänst") || q.includes("service") || q.includes("hjälp") || q.includes("gör") || q.includes("build")) {
    return isSv
      ? "zadex hjälper med premiumwebbplatser, landningssidor, redesign, AI-support, automation, kontaktflöden, dashboards, innehållssystem och enklare webbappar eller SaaS-prototyper."
      : "zadex helps with premium websites, landing pages, redesigns, AI support, automation, lead flows, dashboards, content systems, and lightweight web apps or SaaS prototypes.";
  }

  if (q.includes("process") || q.includes("hur jobbar") || q.includes("timeline") || q.includes("tid")) {
    return isSv
      ? "Processen är enkel: vi kartlägger behovet, positionerar erbjudandet, designar upplevelsen, bygger lösningen och lanserar. Tidsplanen beror på omfattning, men vi håller stegen tydliga från start."
      : "The process is simple: we map the need, position the offer, design the experience, build the solution, and launch. Timeline depends on scope, but the steps stay clear from the start.";
  }

  if (q.includes("kontakt") || q.includes("mail") || q.includes("email") || q.includes("telefon")) {
    return isSv
      ? "Du kan kontakta zadex via info@zadex.se eller använda kontaktformuläret på sidan. Om du vill kan jag också guida dig genom en kort projektbrief här."
      : "You can contact zadex at info@zadex.se or use the contact form. I can also guide you through a short project brief here.";
  }

  if (q.includes("projekt") || q.includes("case") || q.includes("portfolio")) {
    return isSv
      ? "På projektsidan visar zadex exempel som Portfolio, Flow Agency, Sora Sushi och Atlas Performance. De visar typiska webbprojekt för riktiga företag: portfolio, landningssida, restaurang och fitness."
      : "The projects page shows examples like Portfolio, Flow Agency, Sora Sushi, and Atlas Performance: typical website projects for real businesses.";
  }

  return isSv
    ? "zadex är en premium webbstudio i Stockholm som bygger webbplatser, landningssidor och smarta digitala lösningar. Fråga gärna om tjänster, budget, process, projekt eller hur du startar en offertbrief."
    : "zadex is a premium web studio in Stockholm building websites, landing pages, and smart digital solutions. You can ask about services, budget, process, projects, or how to start a quote brief.";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid assistant payload." }, { status: 422 });
  }

  const { locale, projectContext, nextQuestion, latestAnswer, mode, messages } = parsed.data;
  const fallback =
    locale === "sv"
      ? mode === "chat"
        ? localChatReply(locale, latestAnswer)
        : `Bra, jag har noterat det. ${nextQuestion ?? "Vad vill du berätta mer om projektet?"}`
      : mode === "chat"
        ? localChatReply(locale, latestAnswer)
        : `Great, I noted that. ${nextQuestion ?? "What else would you like to share about the project?"}`;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return NextResponse.json({ reply: fallback });

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
        input: [
          {
            role: "system",
            content:
              `You are zadex's premium website agency assistant. Use the requested language. Keep replies short, warm, specific, and professional.
Only answer questions related to zadex, websites, digital projects, automation, AI support, pricing guidance, process, contact, or project planning.
If the user asks unrelated questions, politely steer back to zadex and digital projects.
Never invent exact final prices, timelines, client names, private details, guarantees, or unavailable services.
For quote mode, ask exactly the provided next question at the end.
For chat mode, answer naturally and offer to help start a brief when useful.

Known information:
${zadexKnowledge}`,
          },
          {
            role: "user",
            content: JSON.stringify({
              language: locale === "sv" ? "Swedish" : "English",
              mode,
              projectContext,
              conversation: messages,
              latestAnswer,
              nextQuestion: nextQuestion ?? null,
            }),
          },
        ],
        max_output_tokens: mode === "chat" ? 220 : 140,
      }),
    });

    if (!response.ok) return NextResponse.json({ reply: fallback });

    const data = (await response.json()) as {
      output_text?: string;
      output?: Array<{ content?: Array<{ text?: string }> }>;
    };
    const reply =
      data.output_text ??
      data.output?.flatMap((item) => item.content ?? []).map((item) => item.text).filter(Boolean).join("\n") ??
      fallback;

    return NextResponse.json({ reply: reply.trim() || fallback });
  } catch {
    return NextResponse.json({ reply: fallback });
  }
}
