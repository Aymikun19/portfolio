import { readImage } from "@/lib/store";

// Serves photos uploaded from /admin. Keys are random, so responses can be cached for a long time.
export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const img = await readImage(`media/${file}`);
  if (!img) return new Response("Not found", { status: 404 });
  return new Response(img.body as BodyInit, {
    headers: {
      "Content-Type": img.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
