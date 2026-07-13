/**
 * Cover components — BookCover, StoryCover, PartCover, SceneCover.
 * All support hover elevation and a "book open" animation on click.
 */
import { forwardRef, useState, type ReactNode, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { StatusChip, type BdsStatus } from "../badges/Badges";
import { ChevronRight } from "lucide-react";

interface BaseCoverProps {
  image: string;
  title: string;
  subtitle?: string;
  status?: BdsStatus;
  progress?: number;
  onOpen?: () => void;
  className?: string;
  badge?: ReactNode;
  breathe?: boolean;
}

function CoverBase({
  image,
  title,
  subtitle,
  status,
  progress,
  onOpen,
  className,
  badge,
  breathe,
  aspect = "3/4",
  size = "md",
  extra,
}: BaseCoverProps & { aspect?: string; size?: "sm" | "md" | "lg"; extra?: ReactNode }) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (!onOpen) return;
    setOpening(true);
    // The animation is short; caller decides navigation timing.
    onOpen();
    window.setTimeout(() => setOpening(false), 500);
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpen();
    }
  };

  const sizes = { sm: "w-40", md: "w-56", lg: "w-72" };

  return (
    <div
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : undefined}
      onClick={onOpen ? handleOpen : undefined}
      onKeyDown={onOpen ? onKey : undefined}
      aria-label={onOpen ? `Abrir ${title}` : undefined}
      className={cn(
        "group relative shrink-0 overflow-hidden rounded-2xl border border-app-border bg-app-surface-elevated shadow-card transition-smooth bds-press",
        "hover:-translate-y-1 hover:shadow-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
        sizes[size],
        opening && "bds-book-open",
        className,
      )}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: aspect }}>
        <img
          src={image}
          alt={title}
          loading="lazy"
          className={cn(
            "h-full w-full object-cover transition-smooth group-hover:scale-[1.05]",
            breathe && "bds-breathe",
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-app-background/95 via-app-background/30 to-transparent" />
        {status && (
          <div className="absolute left-3 top-3">
            <StatusChip status={status} />
          </div>
        )}
        {badge && <div className="absolute right-3 top-3">{badge}</div>}
        {extra}
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 font-display text-sm font-semibold text-app-text">{title}</h3>
        {subtitle && <p className="mt-1 line-clamp-1 text-xs text-app-text-muted">{subtitle}</p>}
        {typeof progress === "number" && (
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-app-surface-high" aria-label={`Progresso ${progress}%`}>
            <div className="h-full rounded-full bg-gradient-brand transition-all" style={{ width: `${Math.min(100, Math.max(0, progress))}%` }} />
          </div>
        )}
      </div>
    </div>
  );
}

export interface BookCoverProps extends BaseCoverProps {
  abbreviation?: string;
  chapters?: number;
  category?: string;
}

export const BookCover = forwardRef<HTMLDivElement, BookCoverProps>(function BookCover(props, _ref) {
  const { abbreviation, chapters, category, subtitle, ...rest } = props;
  const meta = [category, chapters ? `${chapters} cap.` : null].filter(Boolean).join(" · ");
  return (
    <CoverBase
      {...rest}
      subtitle={subtitle ?? meta}
      aspect="2/3"
      size="md"
      breathe
      extra={
        abbreviation ? (
          <span className="absolute bottom-3 right-3 rounded-lg bg-black/60 px-2 py-1 font-display text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur">
            {abbreviation}
          </span>
        ) : null
      }
    />
  );
});

export const StoryCover = forwardRef<HTMLDivElement, BaseCoverProps>(function StoryCover(props, _ref) {
  return <CoverBase {...props} aspect="3/4" size="md" />;
});

export const PartCover = forwardRef<HTMLDivElement, BaseCoverProps>(function PartCover(props, _ref) {
  return (
    <CoverBase
      {...props}
      aspect="16/10"
      size="lg"
      extra={
        <div className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-app-background shadow-elevated transition-smooth group-hover:translate-x-1">
          <ChevronRight className="h-4 w-4" />
        </div>
      }
    />
  );
});

export const SceneCover = forwardRef<HTMLDivElement, BaseCoverProps>(function SceneCover(props, _ref) {
  return <CoverBase {...props} aspect="16/9" size="lg" />;
});
