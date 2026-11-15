"use client";

import { useActionState } from "react";
import { login } from "../actions";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, {} as { error?: string });
  return (
    <main className="grid min-h-screen place-items-center px-5">
      <form action={action} className="card grid w-full max-w-sm gap-4 p-8">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="mt-2 text-2xl font-semibold">Sign in</h1>
        </div>
        <label className="field">
          <span>Password</span>
          <input name="password" type="password" required autoFocus autoComplete="current-password" />
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
