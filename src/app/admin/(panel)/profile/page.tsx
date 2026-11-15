import { getContent } from "@/lib/store";
import type { Experience } from "@/lib/types";
import { saveProfile } from "../../actions";

const timelineText = (items: Experience[]) =>
  items.map((e) => [`${e.role} | ${e.org} | ${e.period}`, ...e.points.map((p) => `- ${p}`)].join("\n")).join("\n\n");

// Admin pages read the session cookie on every request.
export const instant = false;

export default async function ProfileAdmin({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const { saved } = await searchParams;
  const { profile, skills, experience, leadership } = await getContent();
  const field = (name: keyof typeof profile, label: string, type = "text") => (
    <label className="field">
      <span>{label}</span>
      <input name={name} type={type} defaultValue={profile[name]} />
    </label>
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold">Profile, skills &amp; experience</h1>
      {saved && <p className="mt-2 text-sm text-accent">Saved. Your site is updated.</p>}

      <form action={saveProfile} className="mt-8 grid gap-6">
        <section className="card grid gap-4 p-6">
          <h2 className="font-medium">Basics</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {field("name", "Full name")}
            {field("title", "Title")}
            {field("location", "Location")}
            {field("availability", "Availability line")}
            {field("email", "Public email", "email")}
            {field("github", "GitHub URL", "url")}
            {field("linkedin", "LinkedIn URL", "url")}
            {field("resumeUrl", "CV / résumé link", "url")}
          </div>
          <label className="field">
            <span>Tagline</span>
            <textarea name="tagline" rows={2} defaultValue={profile.tagline} />
          </label>
          <label className="field">
            <span>About</span>
            <textarea name="about" rows={6} defaultValue={profile.about} />
          </label>
        </section>

        <section className="card grid gap-4 p-6">
          <h2 className="font-medium">Skills</h2>
          <p className="text-sm text-muted">
            One group per line: <code className="font-mono">Frontend: React, Next.js, Tailwind</code>
          </p>
          <label className="field">
            <textarea
              name="skills"
              rows={5}
              className="font-mono"
              defaultValue={skills.map((s) => `${s.group}: ${s.items.join(", ")}`).join("\n")}
            />
          </label>
        </section>

        <section className="card grid gap-4 p-6">
          <h2 className="font-medium">Experience &amp; leadership</h2>
          <p className="text-sm text-muted">
            One block per role, separated by a blank line. First line{" "}
            <code className="font-mono">Role | Organisation | Period</code>, then bullet lines starting with{" "}
            <code className="font-mono">-</code>.
          </p>
          <label className="field">
            <span>Work experience</span>
            <textarea name="experience" rows={8} className="font-mono" defaultValue={timelineText(experience)} />
          </label>
          <label className="field">
            <span>Leadership</span>
            <textarea name="leadership" rows={8} className="font-mono" defaultValue={timelineText(leadership)} />
          </label>
        </section>

        <button className="btn-primary justify-self-start">Save everything</button>
      </form>
    </div>
  );
}
