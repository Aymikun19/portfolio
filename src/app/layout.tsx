import type { Metadata } from "next";
import "./globals.css";

const site =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: "Olopade Oreoluwa · Full-Stack Developer",
  description:
    "Portfolio of Olopade Oreoluwa Daniel, a full-stack developer (Next.js, Supabase) and data enthusiast.",
  openGraph: {
    title: "Olopade Oreoluwa · Full-Stack Developer",
    description: "Next.js · Supabase · Data & AI",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
