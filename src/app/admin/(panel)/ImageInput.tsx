"use client";

import { useState } from "react";
import { ImageOff, ImagePlus } from "lucide-react";

/** File picker with a live preview. Leaving it empty keeps the current image. */
export function ImageInput({
  name,
  label,
  current,
  shape = "wide",
}: {
  name: string;
  label: string;
  current?: string;
  shape?: "wide" | "round";
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [remove, setRemove] = useState(false);
  const src = remove ? null : (preview ?? current ?? null);
  const box = shape === "round" ? "h-28 w-28 rounded-full" : "aspect-video w-full max-w-sm rounded-xl";

  return (
    <div className="field">
      <span>{label}</span>
      <div className="flex flex-wrap items-center gap-4">
        <div className={`${box} grid shrink-0 place-items-center overflow-hidden border border-line bg-bg text-muted`}>
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImageOff size={22} aria-hidden />
          )}
        </div>
        <div className="grid gap-2 text-sm">
          <label className="btn-ghost w-fit cursor-pointer !py-1.5">
            <ImagePlus size={15} aria-hidden /> Choose image
            <input
              type="file"
              name={name}
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              onChange={(e) => {
                const f = e.target.files?.[0];
                setPreview(f ? URL.createObjectURL(f) : null);
                if (f) setRemove(false);
              }}
            />
          </label>
          <p className="text-xs text-muted">JPG, PNG or WebP, up to 4 MB.</p>
          {current && (
            <label className="flex items-center gap-2 text-xs text-muted">
              <input type="checkbox" name={`${name}_remove`} checked={remove} onChange={(e) => setRemove(e.target.checked)} />
              Remove image
            </label>
          )}
        </div>
      </div>
    </div>
  );
}
