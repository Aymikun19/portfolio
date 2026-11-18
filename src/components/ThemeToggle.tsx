"use client";

import { Moon, Sun } from "lucide-react";

/** Runs before paint (inlined in <head>) so the saved theme never flashes. */
export const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={() => {
        const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem("theme", next);
        } catch {}
      }}
      aria-label="Switch between light and dark theme"
      title="Switch theme"
      className="theme-toggle grid size-9 place-items-center rounded-full border border-line text-muted transition hover:border-accent hover:text-accent"
    >
      <Sun size={16} aria-hidden className="theme-sun" />
      <Moon size={16} aria-hidden className="theme-moon" />
    </button>
  );
}
