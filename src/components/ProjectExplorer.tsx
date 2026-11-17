"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { GitHubIcon } from "@/components/BrandIcons";
import { mediaUrl } from "@/lib/media";
import { CATEGORY_LABEL, PROJECT_LOGOS } from "@/lib/projects";
import type { Project } from "@/lib/types";

type Filter = "all" | Project["category"];

export function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [cat, setCat] = useState<Filter>("all");
  const [tech, setTech] = useState<string | null>(null);
  const techs = useMemo(() => {
    const count = new Map<string, number>();
    for (const p of projects) if (cat === "all" || p.category === cat) for (const t of p.tech) count.set(t, (count.get(t) ?? 0) + 1);
    return [...count].filter(([, n]) => n > 1).sort((a, b) => b[1] - a[1]).map(([t]) => t);
  }, [projects, cat]);
  const shown = projects.filter((p) => (cat === "all" || p.category === cat) && (!tech || p.tech.includes(tech)));
  const tabs: [Filter, string, number][] = [
    ["all", "All", projects.length],
    ["fullstack", "Full-stack", projects.filter((p) => p.category === "fullstack").length],
    ["data", "Data & ML", projects.filter((p) => p.category === "data").length],
  ];

  return (
    <div className="mt-8 grid gap-6">
      <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter projects by type">
        {tabs.map(([k, label, n]) => (
          <button
            key={k}
            role="tab"
            aria-selected={cat === k}
            onClick={() => { setCat(k); setTech(null); }}
            className={`rounded-full border px-4 py-1.5 text-sm transition ${cat === k ? "border-accent bg-accent text-[#04130d]" : "border-line text-muted hover:border-accent hover:text-ink"}`}
          >
            {label} <span className="ml-1 font-mono text-xs opacity-70">{n}</span>
          </button>
        ))}
      </div>
      {techs.length > 0 && (
        <div className="flex flex-wrap gap-1.5" aria-label="Filter by technology">
          {techs.map((t) => (
            <button
              key={t}
              aria-pressed={tech === t}
              onClick={() => setTech(tech === t ? null : t)}
              className={`chip transition ${tech === t ? "!border-accent-2 !text-accent-2" : "hover:!border-muted hover:!text-ink"}`}
            >
              {t}
            </button>
          ))}
        </div>
      )}
      <p className="sr-only" aria-live="polite">{shown.length} projects shown</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {shown.map((p) => <ProjectCard key={p.id} p={p} />)}
      </div>
    </div>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="card group relative flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:border-accent/50">
      {p.image && (
        <div className="aspect-[16/10] overflow-hidden border-b border-line bg-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mediaUrl(p.image)} alt={`Screenshot of ${p.title}`} loading="lazy" width={1280} height={800}
            className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {PROJECT_LOGOS.has(p.id) && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={`/projects/${p.id}.svg`} alt="" width={36} height={36} className="h-9 w-9 shrink-0" />
            )}
            <div>
              <h4 className="text-lg font-semibold">
                <Link href={`/projects/${p.id}`} className="after:absolute after:inset-0 hover:text-accent">{p.title}</Link>
              </h4>
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted">{CATEGORY_LABEL[p.category]}</p>
            </div>
          </div>
          {p.featured && (
            <span className="rounded-full bg-accent-2/15 px-2 py-0.5 font-mono text-[10px] uppercase text-accent-2">Featured</span>
          )}
        </div>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tech.map((t) => <span key={t} className="chip">{t}</span>)}
        </div>
        <div className="relative z-10 mt-5 flex flex-wrap gap-4 text-sm">
          <Link href={`/projects/${p.id}`} className="link">Case study</Link>
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer" className="link inline-flex items-center gap-1">
              Live site <ArrowUpRight size={15} aria-hidden />
            </a>
          )}
          {p.repo && (
            <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-ink">
              <GitHubIcon className="size-4" /> Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
