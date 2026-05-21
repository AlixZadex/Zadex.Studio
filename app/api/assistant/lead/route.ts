import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { buildAssistantLeadHtml, buildAssistantLeadText } from "@/lib/assistant-mail";
import { assistantLeadSchema } from "@/lib/assistant-schema";
import { createMailer } from "@/lib/email";

const DEFAULT_INBOX = "info@zadex.se";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body." }, { status: 400 });
  }

  try {
    const data = assistantLeadSchema.parse(body);
    const inbox = process.env.CONTACT_TO ?? process.env.SMTP_USER ?? DEFAULT_INBOX;
    const from = process.env.SMTP_FROM ?? `zadex <${process.env.SMTP_USER ?? DEFAULT_INBOX}>`;
    const transporter = createMailer();

    await transporter.sendMail({
      from,
      to: inbox,
      replyTo: data.email,
      subject: `AI assistant quote request — ${data.name}`,
      text: buildAssistantLeadText(data),
      html: buildAssistantLeadHtml(data),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json({ message: "Assistant lead validation failed." }, { status: 422 });
    }

    if (err instanceof Error && err.message.includes("Email transport is not configured")) {
      return NextResponse.json(
        { message: "Email is not configured on the server. Set EMAIL_PASS in your environment." },
        { status: 500 },
      );
    }

    console.error("Assistant lead error:", err);
    return NextResponse.json({ message: "We could not send the assistant inquiry." }, { status: 500 });
  }
}

