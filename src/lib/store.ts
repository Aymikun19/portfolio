import "server-only";
import { BlobNotFoundError, get, put } from "@vercel/blob";
import { cacheLife, cacheTag } from "next/cache";
import { promises as fs } from "fs";
import path from "path";
import { defaultContent, SEED_VERSION } from "./defaults";
import type { Experience, Message, SiteContent } from "./types";

/**
 * Tiny JSON document store.
 * - On Vercel: private Vercel Blob objects (BLOB_READ_WRITE_TOKEN is added
 *   automatically when a Blob store is connected to the project).
 * - Locally without a token: JSON files in ./.data
 */
const useBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
const LOCAL_DIR = path.join(process.cwd(), ".data");

type Doc<T> = { data: T; etag?: string };

async function readDoc<T>(name: string, fallback: T): Promise<Doc<T>> {
  if (!useBlob) {
    try {
      const raw = await fs.readFile(path.join(LOCAL_DIR, name), "utf8");
      return { data: JSON.parse(raw) as T };
    } catch {
      return { data: fallback };
    }
  }
  let res;
  try {
    res = await get(name, { access: "private", useCache: false });
  } catch (err) {
    if (err instanceof BlobNotFoundError) return { data: fallback };
    throw err;
  }
  if (!res || !res.stream) return { data: fallback };
  const text = await new Response(res.stream).text();
  return { data: JSON.parse(text) as T, etag: res.blob.etag ?? undefined };
}

async function writeDoc<T>(name: string, data: T, etag?: string) {
  const body = JSON.stringify(data, null, 2);
  if (!useBlob) {
    await fs.mkdir(LOCAL_DIR, { recursive: true });
    await fs.writeFile(path.join(LOCAL_DIR, name), body);
    return;
  }
  await put(name, body, {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
    ...(etag ? { ifMatch: etag } : {}),
  });
}

/** Read-modify-write with optimistic concurrency (retries on ETag conflict). */
async function update<T>(name: string, fallback: T, fn: (current: T) => T): Promise<T> {
  for (let attempt = 0; attempt < 4; attempt++) {
    const { data, etag } = await readDoc(name, fallback);
    const next = fn(structuredClone(data));
    try {
      await writeDoc(name, next, etag);
      return next;
    } catch (err) {
      if (attempt === 3) throw err;
    }
  }
  throw new Error("unreachable");
}

const CONTENT = "content.json";
const MESSAGES = "messages.json";

/**
 * Bring content saved from /admin up to the latest seed: add new built-in projects and roles
 * without overwriting anything the owner edited.
 */
const OLD_SEED_PERIODS = new Set(["Until 2026", "Mar 2026"]);
function migrate(c: SiteContent): SiteContent {
  if ((c.seedVersion ?? 1) >= SEED_VERSION) return c;
  const hidden = new Set(c.hiddenProjects ?? []);
  const have = new Set(c.projects.map((p) => p.id));
  const newProjects = defaultContent.projects.filter((p) => !have.has(p.id) && !hidden.has(p.id));
  const mergeRoles = (stored: Experience[] = [], seed: Experience[]) => {
    const out = stored.map((e) => {
      const d = seed.find((x) => x.role === e.role);
      return d && OLD_SEED_PERIODS.has(e.period) ? { ...e, org: d.org, period: d.period, points: d.points } : e;
    });
    for (const d of seed) if (!out.some((e) => e.role === d.role)) out.push(d);
    return out;
  };
  return {
    ...c,
    seedVersion: SEED_VERSION,
    projects: [...newProjects, ...c.projects],
    experience: mergeRoles(c.experience, defaultContent.experience),
    leadership: mergeRoles(c.leadership, defaultContent.leadership),
  };
}

export async function getContent(): Promise<SiteContent> {
  const { data } = await readDoc<SiteContent>(CONTENT, defaultContent);
  const merged = migrate({ ...defaultContent, ...data, seedVersion: data.seedVersion ?? 1 });
  // Fill in live links added to the defaults after content was first saved from /admin.
  const defaultsById = new Map(defaultContent.projects.map((p) => [p.id, p]));
  merged.projects = merged.projects.map((p) => ({
    ...p,
    // An explicit "" means the image was removed in /admin; undefined means "use the default".
    live: p.live || defaultsById.get(p.id)?.live || "",
    image: p.image ?? defaultsById.get(p.id)?.image ?? "",
    highlights: p.highlights ?? defaultsById.get(p.id)?.highlights ?? [],
  }));
  merged.profile = { ...defaultContent.profile, ...merged.profile, photo: merged.profile.photo ?? defaultContent.profile.photo };
  return merged;
}

export function updateContent(fn: (c: SiteContent) => SiteContent) {
  return update<SiteContent>(CONTENT, defaultContent, (c) => fn(migrate({ ...defaultContent, ...c, seedVersion: c.seedVersion ?? 1 })));
}

export async function getMessages(): Promise<Message[]> {
  const { data } = await readDoc<Message[]>(MESSAGES, []);
  return data.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function updateMessages(fn: (m: Message[]) => Message[]) {
  return update<Message[]>(MESSAGES, [], fn);
}

/** Cached copy for the public site; admin actions call updateTag("content"). */
export async function getPublicContent(): Promise<SiteContent> {
  "use cache";
  cacheTag("content");
  cacheLife("days");
  try {
    return await getContent();
  } catch (err) {
    // Never take the public site down because storage hiccuped; show the seed content instead.
    console.error("getPublicContent failed, using defaults", err);
    return defaultContent;
  }
}

/* ---------- media (photos) ---------- */

export const IMAGE_TYPES: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };
export const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

/** Store an uploaded image and return its key ("media/<prefix>-<random>.<ext>"). */
export async function saveImage(file: File, prefix: string): Promise<string> {
  const ext = IMAGE_TYPES[file.type];
  if (!ext) throw new Error("Images must be JPG, PNG or WebP.");
  if (file.size > MAX_IMAGE_BYTES) throw new Error("Images must be under 4 MB.");
  const key = `media/${prefix.replace(/[^a-z0-9-]/gi, "")}-${crypto.randomUUID().slice(0, 8)}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  if (!useBlob) {
    await fs.mkdir(path.join(LOCAL_DIR, "media"), { recursive: true });
    await fs.writeFile(path.join(LOCAL_DIR, key), bytes);
  } else {
    await put(key, bytes, { access: "private", contentType: file.type, addRandomSuffix: false });
  }
  return key;
}

/** Read a stored image for the /media route. Returns null when missing. */
export async function readImage(key: string): Promise<{ body: ReadableStream | Buffer; contentType: string } | null> {
  if (!/^media\/[a-z0-9-]+\.(jpg|png|webp)$/i.test(key)) return null;
  const ext = key.split(".").pop()!.toLowerCase();
  const contentType = ext === "jpg" ? "image/jpeg" : `image/${ext}`;
  if (!useBlob) {
    try {
      return { body: await fs.readFile(path.join(LOCAL_DIR, key)), contentType };
    } catch {
      return null;
    }
  }
  try {
    const res = await get(key, { access: "private" });
    return res?.stream ? { body: res.stream, contentType } : null;
  } catch (err) {
    if (err instanceof BlobNotFoundError) return null;
    throw err;
  }
}
