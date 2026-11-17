import { ImageResponse } from "next/og";

export const alt = "Olopade Oreoluwa, full-stack developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0b0d10", color: "#e8ecf1", padding: 80, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="16" fill="#6ee7b7" />
            <circle cx="24" cy="32" r="11" fill="none" stroke="#04130d" strokeWidth="5" />
            <circle cx="40" cy="32" r="11" fill="none" stroke="#04130d" strokeWidth="5" />
          </svg>
          <span style={{ fontSize: 30, color: "#8a94a3" }}>oreoluwa-olopade.vercel.app</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span style={{ fontSize: 84, fontWeight: 700, letterSpacing: -2 }}>Olopade Oreoluwa</span>
          <span style={{ fontSize: 42, color: "#6ee7b7" }}>Full-Stack Developer · Data &amp; AI</span>
        </div>
        <span style={{ fontSize: 28, color: "#8a94a3" }}>Next.js · Supabase · Python · SQL</span>
      </div>
    ),
    size,
  );
}
