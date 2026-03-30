import type { ContactFormInput } from "@/lib/contact-schema";

const BRAND = "zadex";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function buildAdminNotificationHtml(data: ContactFormInput) {
  const companyRow = data.company?.trim()
    ? `<tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:600;color:#333;width:140px">Company</td><td style="padding:10px 0;border-bottom:1px solid #eee;color:#111">${escapeHtml(data.company.trim())}</td></tr>`
    : "";

  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:24px;font-family:system-ui,-apple-system,sans-serif;font-size:15px;line-height:1.55;color:#111;background:#f6f6f6">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;padding:28px 32px;border:1px solid #e8e8e8">
    <tr><td>
      <p style="margin:0 0 16px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#666">${BRAND} · New inquiry</p>
      <h1 style="margin:0 0 20px;font-size:20px;font-weight:600;color:#111">Message from ${escapeHtml(data.name)}</h1>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
        <tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:600;color:#333;width:140px">Name</td><td style="padding:10px 0;border-bottom:1px solid #eee;color:#111">${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:600;color:#333">Email</td><td style="padding:10px 0;border-bottom:1px solid #eee"><a href="mailto:${escapeHtml(data.email)}" style="color:#0a0a0a">${escapeHtml(data.email)}</a></td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:600;color:#333">Phone</td><td style="padding:10px 0;border-bottom:1px solid #eee;color:#111">${escapeHtml(data.phone)}</td></tr>
        ${companyRow}
        <tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:600;color:#333">Service</td><td style="padding:10px 0;border-bottom:1px solid #eee;color:#111">${escapeHtml(data.service)}</td></tr>
      </table>
      <p style="margin:20px 0 8px;font-weight:600;color:#333">Message</p>
      <div style="white-space:pre-wrap;color:#111;background:#fafafa;border-radius:8px;padding:16px;border:1px solid #eee">${escapeHtml(data.message)}</div>
    </td></tr>
  </table>
</body>
</html>`;
}

export function buildAdminNotificationText(data: ContactFormInput) {
  const companyLine = data.company?.trim() ? `Company: ${data.company.trim()}\n` : "";
  return [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    companyLine,
    `Service: ${data.service}`,
    "",
    "Message:",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildAutoReplyHtml(data: ContactFormInput) {
  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:24px;font-family:system-ui,-apple-system,sans-serif;font-size:15px;line-height:1.55;color:#111;background:#f6f6f6">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;padding:28px 32px;border:1px solid #e8e8e8">
    <tr><td>
      <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#666">${BRAND}</p>
      <h1 style="margin:0 0 16px;font-size:20px;font-weight:600;color:#111">We received your message</h1>
      <p style="margin:0 0 16px;color:#333">Hi ${escapeHtml(data.name)},</p>
      <p style="margin:0 0 16px;color:#333">Thanks for reaching out. We have received your inquiry regarding <strong>${escapeHtml(data.service)}</strong> and will get back to you as soon as we can.</p>
      <p style="margin:0 0 16px;color:#333">If anything urgent comes up, you can always email us at <a href="mailto:info@zadex.se" style="color:#0a0a0a">info@zadex.se</a>.</p>
      <p style="margin:0;color:#666;font-size:14px">— ${BRAND}</p>
    </td></tr>
  </table>
</body>
</html>`;
}

export function buildAutoReplyText(data: ContactFormInput) {
  return `Hi ${data.name},

Thanks for reaching out. We have received your inquiry regarding "${data.service}" and will get back to you as soon as we can.

If anything urgent comes up, you can always email us at info@zadex.se.

— ${BRAND}`;
}
