"use client";

import { useActionState, useState } from "react";
import { login } from "../actions";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, {} as { error?: string });
  const [show, setShow] = useState(false);
  return (
    <main className="grid min-h-screen place-items-center px-5">
      <form action={action} className="card grid w-full max-w-sm gap-4 p-8">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="mt-2 text-2xl font-semibold">Sign in</h1>
        </div>
        <label className="field">
          <span>Password</span>
          <div className="relative">
            <input
              name="password"
              type={show ? "text" : "password"}
              required
              autoFocus
              autoComplete="current-password"
              className="!pr-11"
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              aria-label={show ? "Hide password" : "Show password"}
              title={show ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 grid w-11 place-items-center text-muted transition hover:text-accent"
            >
              {show ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </label>
        {state?.error && <p className="text-sm text-rose-400">{state.error}</p>}
        <button className="btn-primary justify-center" disabled={pending}>
          {pending ? "Checking…" : "Enter dashboard"}
        </button>
        <a href="/" className="text-center text-sm text-muted hover:text-ink">
          ← Back to site
        </a>
      </form>
    </main>
  );
}

function Eye() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOff() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10.7 5.1A9.8 9.8 0 0 1 12 5c6.5 0 10 7 10 7a17.6 17.6 0 0 1-2.2 3.2M6.6 6.6C3.9 8.4 2 12 2 12s3.5 7 10 7a9.7 9.7 0 0 0 5.4-1.6" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
      <path d="m2 2 20 20" />
    </svg>
  );
}
