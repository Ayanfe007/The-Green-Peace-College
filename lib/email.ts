import { siteConfig } from "./siteConfig";
import type { ContactData, InquiryData } from "./validation";

/**
 * Email delivery for form submissions.
 * ------------------------------------------------------------------
 * Provider: Resend (https://resend.com), called through its plain REST
 * API with `fetch` — so no extra npm package is required.
 *
 * Configure in .env.local (see .env.example):
 *   RESEND_API_KEY  — your Resend API key
 *   EMAIL_FROM      — a verified sender, e.g. "The Green Peace School <no-reply@school.ng>"
 *   EMAIL_TO        — the school inbox that receives submissions
 *
 * TODO FALLBACK: while RESEND_API_KEY is empty, submissions are logged
 * to the server console instead of being emailed (development mode).
 * Swap in Nodemailer here if you prefer SMTP — only this file changes.
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_FROM =
  process.env.EMAIL_FROM ?? "The Green Peace School <onboarding@resend.dev>";
const EMAIL_TO = process.env.EMAIL_TO ?? siteConfig.admissionsEmail;

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/* --------------------- tiny HTML helpers (email clients) --------------------- */

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);
}

/** Simple, inline-styled email wrapper (email clients strip CSS files). */
function layout(title: string, bodyHtml: string): string {
  const year = new Date().getFullYear();
  return `<div style="background:#FAF6EE;padding:24px;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:600px;margin:0 auto;background:#FFFFFF;border:1px solid #DEE6DC;border-radius:12px;overflow:hidden">
    <div style="background:#1E4D2B;padding:20px 28px">
      <p style="margin:0;color:#D4AF37;font-size:12px;letter-spacing:2px;text-transform:uppercase">${escapeHtml(siteConfig.shortName)}</p>
      <h1 style="margin:6px 0 0;color:#FAF6EE;font-size:20px;line-height:1.3">${escapeHtml(title)}</h1>
    </div>
    <div style="padding:28px;color:#1B2A20;font-size:15px;line-height:1.6">${bodyHtml}</div>
    <div style="padding:16px 28px;background:#F1F6F2;color:#5B6B60;font-size:12px;line-height:1.5">
      © ${year} ${escapeHtml(siteConfig.name)} · ${escapeHtml(siteConfig.address.street)}, ${escapeHtml(siteConfig.address.city)}, ${escapeHtml(siteConfig.address.region)}<br>
      ${escapeHtml(siteConfig.phones[0].number)} · ${escapeHtml(siteConfig.email)}
    </div>
  </div>
</div>`;
}

/** Two-column detail table; rows with empty values are skipped. */
function detailRows(rows: Array<[string, string | undefined | null]>): string {
  const trs = rows
    .filter(([, value]) => value && value.trim() !== "")
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px 8px 0;white-space:nowrap;color:#5B6B60;vertical-align:top">${label}</td><td style="padding:8px 0;color:#1B2A20;font-weight:bold">${escapeHtml(value)}</td></tr>`
    )
    .join("");
  return `<table style="border-collapse:collapse;width:100%;background:#FAF6EE" role="presentation"><tbody>${trs}</tbody></table>`;
}

function automatedNote(): string {
  return `<p style="margin:24px 0 0;color:#5B6B60;font-size:13px">This is an automated message — please don't reply to this email. To reach us, call ${siteConfig.phones[0].number} or visit ${siteConfig.url}.</p>`;
}

/* --------------------------------- messages --------------------------------- */

function inquiryBody(data: InquiryData): string {
  return `
  <p>A parent/guardian has just submitted an admission inquiry through the website.</p>
  ${detailRows([
    ["Parent / guardian", data.parentName],
    ["Relationship", data.relationship],
    ["Phone", data.phone],
    ["Email", data.email],
    ["Home address", data.address],
    ["Child's name", data.childName],
    ["Date of birth", data.childDob],
    ["Gender", data.gender],
    ["Applying for", data.grade],
    ["Previous school", data.previousSchool],
    ["Preferred contact", data.contactMethod],
    ["Message", data.message],
  ])}
  ${automatedNote()}`;
}

function autoReplyBody(data: InquiryData): string {
  return `
  <p>Dear ${escapeHtml(data.parentName)},</p>
  <p>Thank you for your interest in ${escapeHtml(siteConfig.name)}. We have received your inquiry for <strong>${escapeHtml(data.childName)}</strong> (applying for <strong>${escapeHtml(data.grade)}</strong>).</p>
  <p>Here is what happens next:</p>
  <ol style="padding-left:20px;margin:8px 0">
    <li>Our admissions team will contact you within <strong>one to two school days</strong> using your preferred method (${escapeHtml(data.contactMethod)}).</li>
    <li>We will arrange a short visit or assessment — relaxed and friendly, especially for our nursery and primary pupils.</li>
    <li>Once a place is confirmed, we will send you the enrolment steps (forms, fees, uniforms and books).</li>
  </ol>
  <p>Questions in the meantime? Call ${escapeHtml(siteConfig.phones[0].number)} or simply reply to this email.</p>
  <p>Warm regards,<br />The Admissions Team<br /><strong>${escapeHtml(siteConfig.name)}</strong></p>`;
}

function contactBody(data: ContactData): string {
  return `
  <p>A visitor sent the following message through the contact form on the website:</p>
  ${detailRows([
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Message", data.message],
  ])}
  ${automatedNote()}`;
}

/* ---------------------------------- sending ---------------------------------- */

export interface DeliverResult {
  sent: boolean;
  reason?: string;
}

async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: EMAIL_FROM, to: [to], subject, html }),
  });
  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
}

/** Logs what would have been sent when no API key is configured. */
function dryRun(subject: string, to: string[]): void {
  console.warn(
    "⚠️  [email] RESEND_API_KEY is not set — skipping real email delivery (development mode)."
  );
  console.warn(
    "   TODO: add RESEND_API_KEY, EMAIL_FROM and EMAIL_TO to .env.local (see .env.example)."
  );
  for (const recipient of to) {
    console.info(`   [email dry-run] → ${recipient}  |  subject: "${subject}"`);
  }
}

/** Sends the inquiry to the school inbox + an auto-reply to the parent. */
export async function deliverInquiry(data: InquiryData): Promise<DeliverResult> {
  if (!RESEND_API_KEY) {
    dryRun(`[Inquiry] ${data.childName} — ${data.grade}`, [EMAIL_TO, data.email]);
    return { sent: false, reason: "no-api-key" };
  }

  const results = await Promise.allSettled([
    sendEmail(
      EMAIL_TO,
      `[Inquiry] ${data.childName} — ${data.grade} (from ${data.parentName})`,
      layout("New admission inquiry", inquiryBody(data))
    ),
    sendEmail(
      data.email,
      "We received your admission inquiry — The Green Peace School",
      layout("Thank you for enquiring", autoReplyBody(data))
    ),
  ]);

  // A failed send should never lose the submission — it is already logged
  // by the API route. Log the error and keep going.
  results.forEach((r) => {
    if (r.status === "rejected") console.error("[email] Resend error:", r.reason);
  });
  const failed = results.filter((r) => r.status === "rejected").length;
  return { sent: failed === 0, reason: failed > 0 ? "partial-failure" : undefined };
}

/** Sends a contact-page message to the school inbox. */
export async function deliverContact(data: ContactData): Promise<DeliverResult> {
  if (!RESEND_API_KEY) {
    dryRun(`[Contact] Message from ${data.name}`, [EMAIL_TO]);
    return { sent: false, reason: "no-api-key" };
  }

  const results = await Promise.allSettled([
    sendEmail(
      EMAIL_TO,
      `[Contact] Message from ${data.name}`,
      layout("New contact message", contactBody(data))
    ),
  ]);

  results.forEach((r) => {
    if (r.status === "rejected") console.error("[email] Resend error:", r.reason);
  });
  const failed = results.filter((r) => r.status === "rejected").length;
  return { sent: failed === 0, reason: failed > 0 ? "partial-failure" : undefined };
}
