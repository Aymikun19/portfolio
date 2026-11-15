import "server-only";
import { Resend } from "resend";

const FROM = process.env.FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

function client() {
  const key = process.env.RESEND_API_KEY;
  return key ? new Resend(key) : null;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const shell = (inner: string) => `
<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:560px;margin:auto;padding:24px;color:#111">
  ${inner}
  <p style="color:#888;font-size:12px;margin-top:32px">Sent from ${esc(process.env.NEXT_PUBLIC_SITE_URL || "my portfolio")}</p>
</div>`;

type SendResult = { ok: true } | { ok: false; error: string };

async function send(opts: { to: string; subject: string; html: string; replyTo?: string }): Promise<SendResult> {
  const resend = client();
  if (!resend) return { ok: false, error: "RESEND_API_KEY is not set" };
  const { error } = await resend.emails.send({ from: FROM, ...opts });
  return error ? { ok: false, error: error.message } : { ok: true };
}

/** Notify the site owner about a new contact-form message. */
export function notifyOwner(m: { name: string; email: string; subject: string; message: string }) {
  const to = process.env.CONTACT_TO_EMAIL;
  if (!to) return Promise.resolve<SendResult>({ ok: false, error: "CONTACT_TO_EMAIL is not set" });
  return send({
    to,
    replyTo: m.email,
    subject: `New message: ${m.subject || "(no subject)"} from ${m.name}`,
    html: shell(`
      <h2 style="margin:0 0 8px">New portfolio message</h2>
      <p><b>${esc(m.name)}</b> &lt;${esc(m.email)}&gt;</p>
      <p><b>Subject:</b> ${esc(m.subject || "(none)")}</p>
      <blockquote style="border-left:3px solid #6ee7b7;margin:16px 0;padding:8px 16px;white-space:pre-wrap">${esc(m.message)}</blockquote>
      <p>Reply straight from this email, or from your admin dashboard.</p>`),
  });
}

/**
 * Auto-acknowledge the visitor. Only works once FROM_EMAIL uses a domain you
 * have verified in Resend; the resend.dev test sender can only email you.
 */
export function acknowledgeVisitor(m: { name: string; email: string }) {
  if (process.env.AUTO_REPLY !== "true") return Promise.resolve<SendResult>({ ok: true });
  return send({
    to: m.email,
    subject: "Thanks for reaching out!",
    html: shell(`<p>Hi ${esc(m.name)},</p><p>Thanks for your message. I've received it and will get back to you soon.</p><p>Oreoluwa</p>`),
  });
}

export function replyToVisitor(opts: { to: string; name: string; subject: string; body: string }) {
  return send({
    to: opts.to,
    replyTo: process.env.CONTACT_TO_EMAIL,
    subject: opts.subject.startsWith("Re:") ? opts.subject : `Re: ${opts.subject || "your message"}`,
    html: shell(`<p>Hi ${esc(opts.name)},</p><div style="white-space:pre-wrap">${esc(opts.body)}</div><p>Oreoluwa</p>`),
  });
}
