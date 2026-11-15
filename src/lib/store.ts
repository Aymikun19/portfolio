import "server-only";
import { BlobNotFoundError, get, put } from "@vercel/blob";
import { cacheLife, cacheTag } from "next/cache";
import { promises as fs } from "fs";
import path from "path";
import { defaultContent } from "./defaults";
import type { Message, SiteContent } from "./types";

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

export async function getContent(): Promise<SiteContent> {
  const { data } = await readDoc<SiteContent>(CONTENT, defaultContent);
  return { ...defaultContent, ...data };
}

export function updateContent(fn: (c: SiteContent) => SiteContent) {
  return update<SiteContent>(CONTENT, defaultContent, fn);
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
