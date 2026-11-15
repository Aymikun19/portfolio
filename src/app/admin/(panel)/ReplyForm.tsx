"use client";

import { useActionState } from "react";
import { sendReply } from "../actions";

export function ReplyForm(props: { id: string; to: string; name: string; subject: string }) {
  const [state, action, pending] = useActionState(sendReply, {} as { status?: string; error?: string });
  return (
    <form action={action} className="mt-4 grid gap-2">
      <input type="hidden" name="id" value={props.id} />
      <input type="hidden" name="to" value={props.to} />
      <input type="hidden" name="name" value={props.name} />
      <input type="hidden" name="subject" value={props.subject} />
      <label className="field">
        <span>Reply via email</span>
        <textarea name="body" rows={3} placeholder={`Hi ${props.name.split(" ")[0]}, thanks for reaching out…`} />
      </label>
      <div className="flex items-center gap-3">
        <button className="btn-primary !py-1.5" disabled={pending}>
          {pending ? "Sending…" : "Send reply"}
        </button>
        {state.status && <span className="text-sm text-accent">{state.status}</span>}
        {state.error && <span className="text-sm text-rose-400">{state.error}</span>}
      </div>
    </form>
  );
}
