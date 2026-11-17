import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GitHubIcon } from "@/components/BrandIcons";
import { defaultContent } from "@/lib/defaults";
import { mediaUrl } from "@/lib/media";
import { CATEGORY_LABEL, PROJECT_LOGOS } from "@/lib/projects";
import { getPublicContent } from "@/lib/store";

export async function generateStaticParams() {
  return defaultContent.projects.map((p) => ({ id: p.id }));
}

async function load(id: string) {
  const { projects, profile } = await getPublicContent();
  const ordered = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured));
  const i = ordered.findIndex((p) => p.id === id);
  return { profile, project: ordered[i], prev: ordered[i - 1], next: ordered[i + 1] };
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { project, profile } = await load((await params).id);
  if (!project) return {};
  const image = project.image ? mediaUrl(project.image) : undefined;
  return {
    title: `${project.title} · ${profile.name}`,
    description: project.description,
    openGraph: { title: project.title, description: project.description, images: image ? [image] : undefined },
  };
}

export default async function CaseStudy({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { project: p, prev, next } = await load(id);
  if (!p) notFound();
  return (
    <main className="container-x py-12 sm:py-16">
      <Link href="/#projects" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent">
        <ArrowLeft size={15} aria-hidden /> All projects
      </Link>
      <header className="mt-8 grid gap-6">
        <div className="flex items-center gap-4">
          {PROJECT_LOGOS.has(p.id) && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={`/projects/${p.id}.svg`} alt="" width={56} height={56} className="size-14" />
          )}
          <div>
            <p className="eyebrow">{CATEGORY_LABEL[p.category]}</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">{p.title}</h1>
          </div>
        </div>
        <p className="max-w-3xl text-lg leading-relaxed text-muted text-pretty">{p.description}</p>
        <div className="flex flex-wrap gap-3">
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer" className="btn-primary">Visit live site <ArrowUpRight size={16} aria-hidden /></a>
          )}
          {p.repo && (
            <a href={p.repo} target="_blank" rel="noreferrer" className="btn-ghost"><GitHubIcon className="size-4" /> Source code</a>
          )}
        </div>
      </header>

      {p.image && (
        <div className="card mt-10 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mediaUrl(p.image)} alt={`Screenshot of ${p.title}`} width={1600} height={1000} className="w-full object-cover object-top" />
        </div>
      )}

      <div className="mt-12 grid gap-10 md:grid-cols-[1fr_260px]">
        <section aria-labelledby="highlights">
          <h2 id="highlights" className="text-xl font-semibold">Highlights</h2>
          {p.highlights && p.highlights.length > 0 ? (
            <ul className="mt-5 grid gap-4">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-3 leading-relaxed">
                  <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent"><Check size={12} aria-hidden /></span>
                  {h}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-muted">More details coming soon.</p>
          )}
        </section>
        <aside className="grid h-fit gap-6">
          <div>
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted">Built with</h2>
            <div className="mt-3 flex flex-wrap gap-1.5">{p.tech.map((t) => <span key={t} className="chip">{t}</span>)}</div>
          </div>
          {p.live && (
            <div>
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted">Live at</h2>
              <a href={p.live} className="link mt-2 block break-all text-sm">{p.live.replace(/^https?:\/\//, "")}</a>
            </div>
          )}
        </aside>
      </div>

      <nav aria-label="More projects" className="mt-16 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
        {prev ? (
          <Link href={`/projects/${prev.id}`} className="card p-5 transition hover:border-accent/50">
            <span className="inline-flex items-center gap-1 font-mono text-xs uppercase text-muted"><ArrowLeft size={13} aria-hidden /> Previous</span>
            <p className="mt-1 font-semibold">{prev.title}</p>
          </Link>
        ) : <span />}
        {next && (
          <Link href={`/projects/${next.id}`} className="card p-5 text-right transition hover:border-accent/50">
            <span className="inline-flex items-center gap-1 font-mono text-xs uppercase text-muted">Next <ArrowRight size={13} aria-hidden /></span>
            <p className="mt-1 font-semibold">{next.title}</p>
          </Link>
        )}
      </nav>
    </main>
  );
}
