import type { MetadataRoute } from "next";
import { getPublicContent } from "@/lib/store";

const site =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { projects } = await getPublicContent();
  return [
    { url: site, changeFrequency: "weekly", priority: 1 },
    ...projects.map((p) => ({ url: `${site}/projects/${p.id}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
