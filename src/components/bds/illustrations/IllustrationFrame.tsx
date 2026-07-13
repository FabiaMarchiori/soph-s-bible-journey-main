/**
 * IllustrationFrame — image container with caption, author,
 * zoom toggle and fullscreen dialog.
 */
import { useState } from "react";
import { ZoomIn, Maximize2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export interface IllustrationFrameProps {
  src: string;
  alt?: string;
  caption?: string;
  author?: string;
  className?: string;
  enableZoom?: boolean;
  enableFullscreen?: boolean;
  aspect?: string;
}

export function IllustrationFrame({
  src,
  alt = "",
  caption,
  author,
  className,
  enableZoom = true,
  enableFullscreen = true,
  aspect = "16/10",
}: IllustrationFrameProps) {
  const [zoom, setZoom] = useState(false);
  const [full, setFull] = useState(false);

  return (
    <figure className={cn("group relative overflow-hidden rounded-3xl border border-app-border bg-app-surface-elevated shadow-card", className)}>
      <div className="relative overflow-hidden" style={{ aspectRatio: aspect }}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={cn("h-full w-full object-cover transition-transform duration-500", zoom && "scale-150 cursor-zoom-out", !zoom && "cursor-zoom-in")}
          onClick={() => enableZoom && setZoom((z) => !z)}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-app-background/60 via-transparent to-transparent" />
        <div className="absolute right-3 top-3 flex gap-2">
          {enableZoom && (
            <button
              type="button"
              onClick={() => setZoom((z) => !z)}
              aria-label={zoom ? "Diminuir zoom" : "Aumentar zoom"}
              className="grid h-9 w-9 place-items-center rounded-xl bg-black/50 text-white backdrop-blur transition-smooth hover:bg-black/70"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
          )}
          {enableFullscreen && (
            <button
              type="button"
              onClick={() => setFull(true)}
              aria-label="Tela cheia"
              className="grid h-9 w-9 place-items-center rounded-xl bg-black/50 text-white backdrop-blur transition-smooth hover:bg-black/70"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      {(caption || author) && (
        <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-app-border p-3 text-xs text-app-text-muted">
          {caption && <span className="min-w-0 truncate">{caption}</span>}
          {author && <span className="italic">© {author}</span>}
        </figcaption>
      )}

      <Dialog open={full} onOpenChange={setFull}>
        <DialogContent className="max-w-6xl border-app-border bg-app-background p-0">
          <button
            onClick={() => setFull(false)}
            aria-label="Fechar"
            className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white backdrop-blur"
          >
            <X className="h-4 w-4" />
          </button>
          <img src={src} alt={alt} className="max-h-[90vh] w-full object-contain" />
        </DialogContent>
      </Dialog>
    </figure>
  );
}
