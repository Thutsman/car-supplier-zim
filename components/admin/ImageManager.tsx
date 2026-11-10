"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import imageCompression from "browser-image-compression";
import { ArrowDown, ArrowUp, ImagePlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MAX_VEHICLE_IMAGES } from "@/lib/validations/vehicle";

// Originals can be big phone photos; we shrink them below before upload, so allow more here.
const MAX_FILE_BYTES = 5 * 1024 * 1024; // server limit
const MAX_ORIGINAL_BYTES = 25 * 1024 * 1024;
// Photos are served as-is (no Vercel image optimizer), so shrink once, here.
const COMPRESS_OPTIONS = {
  maxWidthOrHeight: 1600,
  maxSizeMB: 0.4,
  fileType: "image/webp",
  useWebWorker: true,
} as const;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export type ManagedImage =
  | { kind: "existing"; id: string; url: string; alt: string }
  | { kind: "new"; key: string; file: File; previewUrl: string };

interface ImageManagerProps {
  images: ManagedImage[];
  onChange: (images: ManagedImage[]) => void;
}

let nextKey = 0;

export function ImageManager({ images, onChange }: ImageManagerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const addFiles = async (fileList: FileList | null) => {
    if (!fileList) return;
    setError(null);
    setBusy(true);
    const additions: ManagedImage[] = [];
    for (const file of Array.from(fileList)) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setError(`"${file.name}" is not a JPEG, PNG, or WebP image.`);
        continue;
      }
      if (file.size > MAX_ORIGINAL_BYTES) {
        setError(`"${file.name}" is over the 25MB limit.`);
        continue;
      }
      let out: File = file;
      try {
        const blob = await imageCompression(file, COMPRESS_OPTIONS);
        out = new File([blob], file.name.replace(/\.[^.]+$/, "") + ".webp", {
          type: "image/webp",
        });
      } catch {
        // Couldn't shrink it: keep the original if the server will still accept it.
        if (file.size > MAX_FILE_BYTES) {
          setError(`Couldn't process "${file.name}". Try a smaller photo.`);
          continue;
        }
      }
      additions.push({
        kind: "new",
        key: `new-${nextKey++}`,
        file: out,
        previewUrl: URL.createObjectURL(out),
      });
    }
    const merged = [...images, ...additions];
    if (merged.length > MAX_VEHICLE_IMAGES) {
      setError(`Maximum ${MAX_VEHICLE_IMAGES} photos per vehicle.`);
    }
    onChange(merged.slice(0, MAX_VEHICLE_IMAGES));
    setBusy(false);
  };

  const removeAt = (index: number) => {
    const target = images[index];
    if (target.kind === "new") URL.revokeObjectURL(target.previewUrl);
    onChange(images.filter((_, i) => i !== index));
  };

  const move = (index: number, delta: -1 | 1) => {
    const next = index + delta;
    if (next < 0 || next >= images.length) return;
    const reordered = [...images];
    [reordered[index], reordered[next]] = [reordered[next], reordered[index]];
    onChange(reordered);
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={ALLOWED_TYPES.join(",")}
        multiple
        hidden
        onChange={(e) => {
          addFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {images.length > 0 && (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((image, index) => (
            <li
              key={image.kind === "existing" ? image.id : image.key}
              className="group relative overflow-hidden rounded-xl border border-border bg-secondary"
            >
              <div className="relative aspect-[4/3]">
                {image.kind === "existing" ? (
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="200px"
                  />
                ) : (
                  // Object URLs are local previews — next/image adds nothing
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={image.previewUrl}
                    alt={image.file.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
              </div>
              {index === 0 && (
                <span className="absolute left-2 top-2 rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                  Cover
                </span>
              )}
              <div className="flex items-center justify-between gap-1 border-t border-border bg-card px-1.5 py-1">
                <div className="flex items-center">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Move photo earlier"
                    disabled={index === 0}
                    onClick={() => move(index, -1)}
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Move photo later"
                    disabled={index === images.length - 1}
                    onClick={() => move(index, 1)}
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Remove photo"
                  className="text-destructive hover:text-destructive"
                  onClick={() => removeAt(index)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Button
        type="button"
        variant="outline"
        className="mt-3 rounded-full border-brand/30 font-semibold hover:bg-brand/5 hover:text-brand"
        disabled={busy}
        onClick={() => inputRef.current?.click()}
      >
        <ImagePlus className="mr-2 h-4 w-4" />
        Add photos
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        JPEG, PNG, or WebP up to 25MB each (shrunk automatically). First photo is the cover. Max{" "}
        {MAX_VEHICLE_IMAGES}.
      </p>
      {error && (
        <p className="mt-2 text-sm font-medium text-destructive">{error}</p>
      )}
    </div>
  );
}
