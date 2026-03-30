import nodemailer from "nodemailer";

const DEFAULT_HOST = "send.one.com";
const DEFAULT_PORT = 465;
const DEFAULT_USER = "info@zadex.se";

export function createMailer() {
  const pass = process.env.EMAIL_PASS;
  if (!pass) {
    throw new Error("Email transport is not configured.");
  }

  const host = process.env.SMTP_HOST ?? DEFAULT_HOST;
  const port = Number(process.env.SMTP_PORT ?? String(DEFAULT_PORT));
  const user = process.env.SMTP_USER ?? DEFAULT_USER;
  const secure = process.env.SMTP_SECURE === "false" ? false : port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}
