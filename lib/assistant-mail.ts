import type { AssistantLeadInput } from "@/lib/assistant-schema";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const rows = [
  ["Business type", "businessType"],
  ["Website type", "websiteType"],
  ["Features", "features"],
  ["Budget", "budget"],
  ["Timeline", "timeline"],
  ["Name", "name"],
  ["Email", "email"],
  ["Phone", "phone"],
  ["Company", "company"],
] as const;

export function buildAssistantLeadHtml(data: AssistantLeadInput) {
  const tableRows = rows
    .filter(([, key]) => data[key]?.trim())
    .map(
      ([label, key]) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e8edf5;font-weight:700;color:#243044;width:150px">${label}</td>
          <td style="padding:10px 0;border-bottom:1px solid #e8edf5;color:#07111f">${escapeHtml(data[key] ?? "")}</td>
        </tr>`,
    )
    .join("");

  const transcript = data.transcript
    .map(
      (message) => `
        <p style="margin:0 0 10px;color:${message.role === "assistant" ? "#475569" : "#07111f"}">
          <strong>${message.role === "assistant" ? "zadex assistant" : "Visitor"}:</strong>
          ${escapeHtml(message.content)}
        </p>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:24px;font-family:system-ui,-apple-system,sans-serif;font-size:15px;line-height:1.55;color:#07111f;background:#f5f7fb">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#fff;border-radius:18px;padding:30px 34px;border:1px solid #e5ebf3;box-shadow:0 20px 60px rgba(15,23,42,0.08)">
    <tr><td>
      <p style="margin:0 0 12px;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#0077ff;font-weight:700">zadex · AI quote assistant</p>
      <h1 style="margin:0 0 22px;font-size:24px;font-weight:750;color:#07111f">New guided project inquiry</h1>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">${tableRows}</table>
      <h2 style="margin:26px 0 12px;font-size:16px;color:#07111f">Conversation</h2>
      <div style="background:#f8fafc;border:1px solid #e8edf5;border-radius:14px;padding:16px">${transcript}</div>
    </td></tr>
  </table>
</body>
</html>`;
}

export function buildAssistantLeadText(data: AssistantLeadInput) {
  const summary = rows
    .filter(([, key]) => data[key]?.trim())
    .map(([label, key]) => `${label}: ${data[key]}`)
    .join("\n");

  const transcript = data.transcript
    .map((message) => `${message.role === "assistant" ? "zadex assistant" : "Visitor"}: ${message.content}`)
    .join("\n");

  return `New guided project inquiry from zadex assistant\n\n${summary}\n\nConversation:\n${transcript}`;
}

