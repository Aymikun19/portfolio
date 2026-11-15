"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { updateMessages } from "@/lib/store";
import { acknowledgeVisitor, notifyOwner } from "@/lib/email";

export type ContactState = { status: "idle" | "ok" | "error"; message?: string };

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.email("Please enter a valid email").max(120),
  subject: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(10, "Message is a little short").max(4000),
});

// Very small in-memory rate limit (per server instance).
const recent = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > 5;
}

export async function sendMessage(_prev: ContactState, form: FormData): Promise<ContactState> {
  // Honeypot: real people never fill the hidden "website" field.
  if (form.get("website")) return { status: "ok", message: "Thanks! Your message is on its way." };

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return { status: "error", message: "Too many messages. Please try again later." };

  const parsed = schema.safeParse(Object.fromEntries(form));
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const m = parsed.data;

  await updateMessages((all) => [
    {
      id: crypto.randomUUID(),
      ...m,
      createdAt: new Date().toISOString(),
      read: false,
      replies: [],
    },
    ...all,
  ]);

  // Emails are best-effort: the message is already saved for the admin inbox.
  await Promise.allSettled([notifyOwner(m), acknowledgeVisitor(m)]);

  return { status: "ok", message: "Thanks! Your message is on its way. I'll reply soon." };
}
