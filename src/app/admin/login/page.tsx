"use client";

import { useActionState, useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { login } from "../actions";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, {} as { error?: string });
  const [show, setShow] = useState(false);
  return (
    <main className="grid min-h-screen place-items-center px-5">
      <form action={action} className="card grid w-full max-w-sm gap-4 p-8">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="" width={40} height={40} className="mb-4 h-10 w-10" />
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
              {show ? <EyeOff size={18} aria-hidden /> : <Eye size={18} aria-hidden />}
            </button>
          </div>
        </label>
        {state?.error && <p className="text-sm text-rose-400">{state.error}</p>}
        <button className="btn-primary justify-center" disabled={pending}>
          {pending ? "Checking…" : "Enter dashboard"}
        </button>
        <Link href="/" className="inline-flex items-center justify-center gap-1 text-sm text-muted hover:text-ink">
          <ArrowLeft size={14} aria-hidden /> Back to site
        </Link>
      </form>
    </main>
  );
}

