"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { createSession, destroySession, passwordMatches, requireAdmin } from "@/lib/auth";
import { saveImage, updateContent, updateMessages } from "@/lib/store";
import { replyToVisitor } from "@/lib/email";
import type { Experience, Project, SkillGroup } from "@/lib/types";

/* ---------- auth ---------- */

export async function login(_prev: { error?: string }, form: FormData) {
  const password = String(form.get("password") || "");
  if (!passwordMatches(password)) {
    await new Promise((r) => setTimeout(r, 800)); // slow down guessing
    return { error: "Wrong password." };
  }
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

/* ---------- messages ---------- */

export async function toggleRead(id: string) {
  await requireAdmin();
  await updateMessages((all) => all.map((m) => (m.id === id ? { ...m, read: !m.read } : m)));
  revalidatePath("/admin");
}

export async function deleteMessage(id: string) {
  await requireAdmin();
  await updateMessages((all) => all.filter((m) => m.id !== id));
  revalidatePath("/admin");
}

export async function sendReply(_prev: { status?: string; error?: string }, form: FormData) {
  await requireAdmin();
  const id = String(form.get("id"));
  const to = String(form.get("to"));
  const name = String(form.get("name"));
  const subject = String(form.get("subject") || "");
  const body = String(form.get("body") || "").trim();
  if (body.length < 2) return { error: "Write a reply first." };

  const res = await replyToVisitor({ to, name, subject, body });
  await updateMessages((all) =>
    all.map((m) =>
      m.id === id
        ? {
            ...m,
            read: true,
            replies: [
              ...m.replies,
              { body, sentAt: new Date().toISOString(), ok: res.ok, error: res.ok ? undefined : res.error },
            ],
          }
        : m,
    ),
  );
  revalidatePath("/admin");
  return res.ok
    ? { status: "Reply sent." }
    : {
        error: `Saved, but email failed: ${res.error}. (The resend.dev test sender can only email you; verify a domain in Resend to reply to visitors.)`,
      };
}

/* ---------- projects ---------- */

const list = (v: FormDataEntryValue | null) =>
  String(v || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

/** Returns the new image key, "" to remove, or undefined to keep the current one. */
async function imageFromForm(form: FormData, field: string, prefix: string): Promise<string | undefined> {
  if (form.get(`${field}_remove`) === "on") return "";
  const file = form.get(field);
  if (file instanceof File && file.size > 0) return saveImage(file, prefix);
  return undefined;
}

export async function saveProject(form: FormData) {
  await requireAdmin();
  const id = String(form.get("id") || "") || crypto.randomUUID().slice(0, 8);
  const image = await imageFromForm(form, "image", `project-${id}`);
  const project: Project = {
    id,
    title: String(form.get("title") || "Untitled"),
    description: String(form.get("description") || ""),
    tech: list(form.get("tech")),
    category: form.get("category") === "data" ? "data" : "fullstack",
    repo: String(form.get("repo") || ""),
    live: String(form.get("live") || ""),
    featured: form.get("featured") === "on",
    highlights: String(form.get("highlights") || "").split("\n").map((l) => l.trim()).filter(Boolean),
  };
  await updateContent((c) => {
    const current = c.projects.find((p) => p.id === id);
    const next = { ...project, image: image ?? current?.image };
    return {
      ...c,
      projects: current ? c.projects.map((p) => (p.id === id ? next : p)) : [...c.projects, next],
    };
  });
  updateTag("content");
  revalidatePath("/admin/projects");
}

export async function deleteProject(id: string) {
  await requireAdmin();
  await updateContent((c) => ({
    ...c,
    projects: c.projects.filter((p) => p.id !== id),
    hiddenProjects: [...new Set([...(c.hiddenProjects ?? []), id])],
  }));
  updateTag("content");
  revalidatePath("/admin/projects");
}

/* ---------- profile ---------- */

/** "Frontend: React, Next.js" per line */
function parseSkills(text: string): SkillGroup[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const i = l.indexOf(":");
      const group = i === -1 ? l : l.slice(0, i);
      const rest = i === -1 ? "" : l.slice(i + 1);
      return { group: group.trim(), items: list(rest) };
    });
}

/** Blocks separated by a blank line. First line "Role | Org | Period", then "- point" lines. */
function parseTimeline(text: string): Experience[] {
  return text
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean)
    .map((block) => {
      const [head, ...rest] = block.split("\n");
      const [role = "", org = "", period = ""] = head.split("|").map((s) => s.trim());
      return { role, org, period, points: rest.map((r) => r.replace(/^[-•*]\s*/, "").trim()).filter(Boolean) };
    });
}

export async function saveProfile(form: FormData) {
  await requireAdmin();
  const s = (k: string) => String(form.get(k) || "").trim();
  const photo = await imageFromForm(form, "photo", "profile");
  await updateContent((c) => ({
    ...c,
    profile: {
      name: s("name"),
      alias: s("alias"),
      title: s("title"),
      tagline: s("tagline"),
      about: s("about"),
      location: s("location"),
      email: s("email"),
      github: s("github"),
      linkedin: s("linkedin"),
      resumeUrl: s("resumeUrl"),
      availability: s("availability"),
      photo: photo ?? c.profile.photo,
    },
    skills: parseSkills(s("skills")),
    experience: parseTimeline(s("experience")),
    leadership: parseTimeline(s("leadership")),
  }));
  updateTag("content");
  redirect("/admin/profile?saved=1");
}
