import { NextResponse } from "next/server";
import { ZodError } from "zod";
import {
  buildAdminNotificationHtml,
  buildAdminNotificationText,
  buildAutoReplyHtml,
  buildAutoReplyText,
} from "@/lib/contact-mail";
import { contactFormSchema } from "@/lib/contact-schema";
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
    const data = contactFormSchema.parse(body);

    const inbox = process.env.CONTACT_TO ?? process.env.SMTP_USER ?? DEFAULT_INBOX;
    const from =
      process.env.SMTP_FROM ?? `zadex <${process.env.SMTP_USER ?? DEFAULT_INBOX}>`;

    if (!inbox || !from) {
      return NextResponse.json(
        { message: "Server email is not configured. Set CONTACT_TO and SMTP_FROM." },
        { status: 500 }
      );
    }

    const transporter = createMailer();

    await transporter.sendMail({
      from,
      to: inbox,
      replyTo: data.email,
      subject: `New inquiry from ${data.name} — ${data.service}`,
      text: buildAdminNotificationText(data),
      html: buildAdminNotificationHtml(data),
    });

    await transporter.sendMail({
      from,
      to: data.email,
      subject: "We received your message — zadex",
      text: buildAutoReplyText(data),
      html: buildAutoReplyHtml(data),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof ZodError) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of err.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }
      return NextResponse.json({ message: "Validation failed.", fieldErrors }, { status: 422 });
    }

    if (err instanceof Error && err.message.includes("Email transport is not configured")) {
      return NextResponse.json(
        { message: "Email is not configured on the server. Set EMAIL_PASS in your environment." },
        { status: 500 }
      );
    }

    console.error("Contact mail error:", err);
    return NextResponse.json(
      { message: "We could not send your message. Please try again shortly." },
      { status: 500 }
    );
  }
}
