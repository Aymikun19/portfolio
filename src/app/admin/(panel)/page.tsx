import { getMessages } from "@/lib/store";
import { deleteMessage, toggleRead } from "../actions";
import { ReplyForm } from "./ReplyForm";

// Admin pages read the session cookie on every request.
export const instant = false;

export default async function Inbox() {
  const messages = await getMessages();

  return (
    <div>
      <h1 className="text-2xl font-semibold">Inbox</h1>
      <p className="mt-1 text-sm text-muted">
        {messages.length} message{messages.length === 1 ? "" : "s"} from your contact form.
      </p>

      {messages.length === 0 && (
        <div className="card mt-8 p-10 text-center text-muted">No messages yet. Share your link!</div>
      )}

      <div className="mt-8 grid gap-4">
        {messages.map((m) => (
          <details key={m.id} className={`card group p-5 ${m.read ? "" : "border-accent/40"}`} open={!m.read}>
            <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-medium">
                  {!m.read && <span className="mr-2 inline-block h-2 w-2 rounded-full bg-accent" />}
                  {m.name} <span className="text-sm text-muted">&lt;{m.email}&gt;</span>
                </p>
                <p className="text-sm text-muted">{m.subject || "(no subject)"}</p>
              </div>
              <time className="font-mono text-xs text-muted">{new Date(m.createdAt).toLocaleString("en-NG")}</time>
            </summary>

            <p className="mt-4 whitespace-pre-wrap rounded-xl bg-bg p-4 text-sm leading-relaxed">{m.message}</p>

            {m.replies.length > 0 && (
              <div className="mt-4 grid gap-2">
                {m.replies.map((r, i) => (
                  <div key={i} className="rounded-xl border border-line p-3 text-sm">
                    <p className="font-mono text-xs text-muted">
                      You replied · {new Date(r.sentAt).toLocaleString("en-NG")} ·{" "}
                      {r.ok ? <span className="text-accent">delivered to Resend</span> : <span className="text-rose-400">not sent</span>}
                    </p>
                    <p className="mt-1 whitespace-pre-wrap">{r.body}</p>
                  </div>
                ))}
              </div>
            )}

            <ReplyForm id={m.id} to={m.email} name={m.name} subject={m.subject} />

            <div className="mt-4 flex gap-2">
              <form action={toggleRead.bind(null, m.id)}>
                <button className="btn-ghost !py-1.5 !px-3.5">Mark {m.read ? "unread" : "read"}</button>
              </form>
              <a href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`} className="btn-ghost !py-1.5 !px-3.5">
                Reply in mail app
              </a>
              <form action={deleteMessage.bind(null, m.id)}>
                <button className="btn-danger !py-1.5">Delete</button>
              </form>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
