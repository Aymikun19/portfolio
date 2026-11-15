import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getMessages } from "@/lib/store";
import { logout } from "../actions";

export const metadata = { title: "Admin · Portfolio", robots: { index: false } };

// Admin pages read the session cookie on every request.
export const instant = false;

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  const unread = (await getMessages()).filter((m) => !m.read).length;

  return (
    <div className="min-h-screen">
      <header className="border-b border-line">
        <div className="container-x flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 text-sm">
            <span className="font-mono text-accent">admin</span>
            <Link href="/admin" className="text-muted hover:text-ink">
              Inbox{unread > 0 && <span className="ml-1.5 rounded-full bg-accent px-1.5 text-xs text-[#04130d]">{unread}</span>}
            </Link>
            <Link href="/admin/projects" className="text-muted hover:text-ink">
              Projects
            </Link>
            <Link href="/admin/profile" className="text-muted hover:text-ink">
              Profile
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" className="text-sm text-muted hover:text-ink">
              View site ↗
            </a>
            <form action={logout}>
              <button className="btn-ghost !py-1.5 !px-3.5">Log out</button>
            </form>
          </div>
        </div>
      </header>
      <main className="container-x py-10">{children}</main>
    </div>
  );
}
