/**
 * Skeleton loaders sharing the same shimmer utility.
 * SkeletonBook · SkeletonStory · SkeletonHero · SkeletonTimeline · SkeletonCard
 */
import { cn } from "@/lib/utils";

const box = "rounded-xl bg-app-surface-elevated bds-shimmer";

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3 rounded-2xl border border-app-border bg-app-surface-elevated p-4", className)}>
      <div className={cn(box, "aspect-video")} />
      <div className={cn(box, "h-4 w-3/4")} />
      <div className={cn(box, "h-3 w-1/2")} />
    </div>
  );
}

export function SkeletonBook({ className }: { className?: string }) {
  return (
    <div className={cn("w-56 space-y-3 rounded-2xl border border-app-border bg-app-surface-elevated p-3", className)}>
      <div className={cn(box, "aspect-[2/3]")} />
      <div className={cn(box, "h-4 w-4/5")} />
      <div className={cn(box, "h-3 w-2/3")} />
    </div>
  );
}

export function SkeletonStory({ className }: { className?: string }) {
  return (
    <div className={cn("w-56 space-y-3 rounded-2xl border border-app-border bg-app-surface-elevated p-3", className)}>
      <div className={cn(box, "aspect-[3/4]")} />
      <div className={cn(box, "h-4 w-3/4")} />
      <div className={cn(box, "h-3 w-1/2")} />
    </div>
  );
}

export function SkeletonHero({ className }: { className?: string }) {
  return (
    <div className={cn("relative min-h-[360px] overflow-hidden rounded-3xl border border-app-border bg-app-surface-elevated p-8", className)}>
      <div className="space-y-4">
        <div className={cn(box, "h-4 w-24")} />
        <div className={cn(box, "h-10 w-2/3")} />
        <div className={cn(box, "h-4 w-1/2")} />
        <div className="flex gap-3">
          <div className={cn(box, "h-11 w-32")} />
          <div className={cn(box, "h-11 w-32")} />
        </div>
      </div>
    </div>
  );
}

export function SkeletonTimeline({ items = 4, className }: { items?: number; className?: string }) {
  return (
    <ol className={cn("space-y-4", className)}>
      {Array.from({ length: items }).map((_, i) => (
        <li key={i} className="flex gap-4">
          <div className={cn(box, "h-10 w-10 rounded-full")} />
          <div className="flex-1 space-y-2">
            <div className={cn(box, "h-4 w-1/3")} />
            <div className={cn(box, "h-3 w-2/3")} />
          </div>
        </li>
      ))}
    </ol>
  );
}
