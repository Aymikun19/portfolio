/** Turn a stored image value into a URL the browser can load. */
export function mediaUrl(value?: string | null): string {
  if (!value) return "";
  if (value.startsWith("/") || value.startsWith("http")) return value;
  return `/${value}`; // "media/…" keys are served by src/app/media/[file]/route.ts
}
