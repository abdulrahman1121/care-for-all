import { useState } from "react";
import type { OrgPhoto } from "../data/photos.ts";
import PhotoPlaceholder from "./PhotoPlaceholder.tsx";

/*
  A real photo with its credit. If the image can't load (bad URL, network error), we fall back
  to the placeholder instead of showing a broken-image icon. We remember WHICH src failed,
  not just "failed", so a different photo later still gets its own chance to load.
*/
export default function Photo({
  photo,
  fallbackLabel,
  loading = "lazy",
}: {
  photo: OrgPhoto;
  fallbackLabel: string;
  loading?: "lazy" | "eager";
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (failedSrc === photo.src) return <PhotoPlaceholder label={fallbackLabel} />;

  return (
    <figure>
      <img
        src={photo.src}
        alt={photo.alt}
        width={1200}
        height={800}
        loading={loading}
        onError={() => setFailedSrc(photo.src)}
        className="aspect-[4/3] w-full rounded-[28px] object-cover"
      />
      <figcaption className="mt-2 text-sm text-ink-soft">
        Photo:{" "}
        <a href={photo.creditUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
          {photo.credit}
        </a>{" "}
        on Unsplash
      </figcaption>
    </figure>
  );
}
