"use client";

import { CircleCheck, Send } from "lucide-react";

import { useActionState } from "react";
import { sendMessage, type ContactState } from "@/app/actions/contact";

const initial: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, action, pending] = useActionState(sendMessage, initial);

  if (state.status === "ok") {
    return (
      <div className="card p-8 text-center">
        <CircleCheck size={36} className="mx-auto text-accent" aria-hidden />
        <p className="mt-2 font-medium">{state.message}</p>
      </div>
    );
  }

  return (
    <form
      action={action}
      className="card grid gap-4 p-6 sm:p-8"
      onFocus={(e) => {
        const t = e.currentTarget.elements.namedItem("t") as HTMLInputElement | null;
        if (t && !t.value) t.value = String(Date.now());
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="field">
          <span>Name</span>
          <input name="name" required minLength={2} maxLength={80} autoComplete="name" />
        </label>
        <label className="field">
          <span>Email</span>
          <input name="email" type="email" required maxLength={120} autoComplete="email" />
        </label>
      </div>
      <label className="field">
        <span>Subject</span>
        <input name="subject" maxLength={120} placeholder="Internship, project, collaboration…" />
      </label>
      <label className="field">
        <span>Message</span>
        <textarea name="message" required minLength={10} maxLength={4000} rows={5} />
      </label>
      <input type="hidden" name="t" defaultValue="" />
      {/* honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {state.status === "error" && <p className="text-sm text-rose-400">{state.message}</p>}
      <button className="btn-primary justify-self-start" disabled={pending}>
        <Send size={15} aria-hidden /> {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
