"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { isEphemeralUpload } from "@/lib/data/upload-urls";
import { cn } from "@/lib/utils";
import type { VehicleImage } from "@/lib/data/types";

interface VehicleGalleryProps {
  images: VehicleImage[];
  title: string;
}

const slideVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 48 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction * -48 }),
};

export function VehicleGallery({ images, title }: VehicleGalleryProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const count = images.length;
  const current = images[index] ?? images[0];

  const go = (dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + count) % count);
  };

  // Fresh image or freshly opened lightbox always starts un-zoomed
  useEffect(() => setZoomed(false), [index, lightboxOpen]);

  // Center the pannable area when zooming in
  useEffect(() => {
    const el = scrollRef.current;
    if (zoomed && el) {
      requestAnimationFrame(() => {
        el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
        el.scrollTop = (el.scrollHeight - el.clientHeight) / 2;
      });
    }
  }, [zoomed]);

  const arrows = count > 1 && (
    <>
      <button
        type="button"
        aria-label="Previous photo"
        onClick={(e) => {
          e.stopPropagation();
          go(-1);
        }}
        className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/65"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Next photo"
        onClick={(e) => {
          e.stopPropagation();
          go(1);
        }}
        className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/65"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </>
  );

  const counter = count > 1 && (
    <span className="absolute bottom-3 right-3 z-10 rounded-full bg-black/55 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
      {index + 1} / {count}
    </span>
  );

  return (
    <>
      <div className="group relative aspect-[16/9] w-full overflow-hidden bg-black/5">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: "easeOut" }}
            drag={count > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              else if (info.offset.x > 60) go(-1);
            }}
            onClick={() => setLightboxOpen(true)}
            className="absolute inset-0 cursor-zoom-in"
          >
            <Image
              src={current.url}
              alt={current.alt}
              fill
              unoptimized={isEphemeralUpload(current.url)}
              className="pointer-events-none object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {arrows}
        {counter}

        <button
          type="button"
          aria-label="View fullscreen"
          onClick={() => setLightboxOpen(true)}
          className="absolute bottom-3 left-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/65"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>

      {count > 1 && (
        <div className="flex gap-2 overflow-x-auto px-6 pt-4">
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              aria-label={`Photo ${i + 1}`}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={cn(
                "relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                index === i
                  ? "border-brand shadow-[0_2px_10px_-2px_rgba(0,131,70,0.5)]"
                  : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                unoptimized={isEphemeralUpload(img.url)}
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      )}

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent
          showCloseButton={false}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
          }}
          className="top-0 left-0 block h-dvh max-h-dvh w-screen max-w-none translate-x-0 translate-y-0 rounded-none border-none bg-black/95 p-0 ring-0 sm:max-w-none"
        >
          <DialogTitle className="sr-only">{title} photos</DialogTitle>

          {zoomed ? (
            <div
              ref={scrollRef}
              onClick={() => setZoomed(false)}
              className="h-full w-full cursor-zoom-out overflow-auto"
            >
              <div className="relative h-[250%] w-[250%]">
                {/* sizes matches the un-zoomed state so the browser reuses
                    the already-loaded candidate — no blank refetch on zoom */}
                <Image
                  src={current.url}
                  alt={current.alt}
                  fill
                  unoptimized={isEphemeralUpload(current.url)}
                  className="object-contain"
                  sizes="100vw"
                  quality={90}
                />
              </div>
            </div>
          ) : (
            <div
              onClick={() => setZoomed(true)}
              className="relative h-full w-full cursor-zoom-in"
            >
              <Image
                src={current.url}
                alt={current.alt}
                fill
                unoptimized={isEphemeralUpload(current.url)}
                className="object-contain"
                sizes="100vw"
                quality={90}
              />
            </div>
          )}

          {!zoomed && arrows}
          {!zoomed && counter}
          {!zoomed && (
            <span className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm">
              Tap image to zoom
            </span>
          )}

          <button
            type="button"
            aria-label="Close fullscreen"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/65"
          >
            <X className="h-5 w-5" />
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}
