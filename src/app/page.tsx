import { getPublicContent } from "@/lib/store";
import { ContactForm } from "@/components/ContactForm";
import type { Experience, Project } from "@/lib/types";

const nav = [
  ["About", "#about"],
  ["Projects", "#projects"],
  ["Experience", "#experience"],
  ["Contact", "#contact"],
];

export default async function Home() {
  const { profile, skills, experience, leadership, projects } = await getPublicContent();
  const initials = profile.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  const ordered = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured));
  const fullstack = ordered.filter((p) => p.category === "fullstack");
  const data = ordered.filter((p) => p.category === "data");

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-line/60 bg-bg/80 backdrop-blur">
        <nav className="container-x flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-2 font-mono text-sm">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent font-sans font-bold text-[#04130d]">
              {initials}
            </span>
            <span className="hidden sm:inline">{profile.name.split(" ").slice(0, 2).join(" ")}</span>
          </a>
          <div className="flex gap-5 text-sm text-muted">
            {nav.map(([label, href]) => (
              <a key={href} href={href} className="transition hover:text-ink">
                {label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="container-x relative py-24 sm:py-32">
          <div className="pointer-events-none absolute -top-10 right-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
          <p className="eyebrow">{profile.availability}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
            Hi, I&apos;m {profile.name.split(" ")[1] ?? profile.name}.{" "}
            <span className="text-muted">{profile.title}.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">{profile.tagline}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary">
              See my work →
            </a>
            <a href="#contact" className="btn-ghost">
              Get in touch
            </a>
            {profile.resumeUrl && (
              <a href={profile.resumeUrl} className="btn-ghost" target="_blank" rel="noreferrer">
                Download CV
              </a>
            )}
          </div>
          <div className="mt-10 flex gap-5 font-mono text-sm text-muted">
            {profile.github && (
              <a className="hover:text-accent" href={profile.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
            )}
            {profile.linkedin && (
              <a className="hover:text-accent" href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
            )}
            <a className="hover:text-accent" href={`mailto:${profile.email}`}>
              Email ↗
            </a>
          </div>
        </section>

        {/* About + skills */}
        <section id="about" className="container-x scroll-mt-20 py-16">
          <p className="eyebrow">About</p>
          <div className="mt-2 grid gap-10 md:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 className="h2">Builder first, student always.</h2>
              <p className="mt-5 leading-relaxed text-muted whitespace-pre-line">{profile.about}</p>
              <p className="mt-4 text-sm text-muted">📍 {profile.location}</p>
            </div>
            <div className="grid gap-4">
              {skills.map((s) => (
                <div key={s.group} className="card p-5">
                  <p className="font-mono text-xs uppercase tracking-widest text-accent-2">{s.group}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {s.items.map((i) => (
                      <span key={i} className="chip text-ink">
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="container-x scroll-mt-20 py-16">
          <p className="eyebrow">Projects</p>
          <h2 className="h2">Things I&apos;ve built</h2>
          <ProjectGrid title="Full-stack apps" projects={fullstack} />
          <ProjectGrid title="Data & machine learning" projects={data} />
        </section>

        {/* Experience */}
        <section id="experience" className="container-x scroll-mt-20 py-16">
          <p className="eyebrow">Experience</p>
          <h2 className="h2">Where I&apos;ve worked &amp; led</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <Timeline title="Work" items={experience} />
            <Timeline title="Leadership" items={leadership} />
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="container-x scroll-mt-20 py-16">
          <p className="eyebrow">Contact</p>
          <h2 className="h2">Let&apos;s build something.</h2>
          <p className="mt-4 max-w-xl text-muted">
            Have a role, a project or a question? Send a message and it lands straight in my inbox.
          </p>
          <div className="mt-8 max-w-2xl">
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-line py-8">
        <div className="container-x flex flex-wrap items-center justify-between gap-2 text-sm text-muted">
          <p>© {profile.name}</p>
          <p className="font-mono text-xs">Next.js · Vercel · Resend</p>
        </div>
      </footer>
    </>
  );
}

function ProjectGrid({ title, projects }: { title: string; projects: Project[] }) {
  if (!projects.length) return null;
  return (
    <div className="mt-10">
      <h3 className="font-mono text-sm uppercase tracking-widest text-muted">{title}</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <article
            key={p.id}
            className="card group relative flex flex-col p-6 transition hover:-translate-y-0.5 hover:border-accent/50"
          >
            <div className="flex items-start justify-between gap-3">
              <h4 className="text-lg font-semibold">
                {p.live ? (
                  <a href={p.live} target="_blank" rel="noreferrer" className="after:absolute after:inset-0 hover:text-accent">
                    {p.title}
                  </a>
                ) : (
                  p.title
                )}
              </h4>
              {p.featured && (
                <span className="rounded-full bg-accent-2/15 px-2 py-0.5 font-mono text-[10px] uppercase text-accent-2">
                  Featured
                </span>
              )}
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tech.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-5 flex gap-4 text-sm">
              {p.live ? (
                <span className="link">Visit live site ↗</span>
              ) : (
                p.repo && (
                  <a href={p.repo} target="_blank" rel="noreferrer" className="link">
                    View project ↗
                  </a>
                )
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Timeline({ title, items }: { title: string; items: Experience[] }) {
  return (
    <div>
      <h3 className="font-mono text-sm uppercase tracking-widest text-muted">{title}</h3>
      <ol className="mt-5 grid gap-6 border-l border-line pl-6">
        {items.map((e, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
            <p className="font-semibold">
              {e.role} <span className="text-muted">· {e.org}</span>
            </p>
            <p className="font-mono text-xs text-muted">{e.period}</p>
            <ul className="mt-2 grid gap-1 text-sm text-muted">
              {e.points.map((pt, j) => (
                <li key={j}>{pt}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
