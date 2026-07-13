/**
 * Timeline — vertical or horizontal, responsive.
 * Timeline · TimelineItem · TimelineNode · TimelineConnector
 */
import type { ReactNode } from "react";
import { CheckCircle2, Circle, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BdsStatus } from "../badges/Badges";

export interface TimelineItemData {
  id: string;
  title: string;
  period?: string;
  description?: string;
  status?: BdsStatus;
  icon?: ReactNode;
}

export interface TimelineProps {
  items: TimelineItemData[];
  orientation?: "vertical" | "horizontal";
  className?: string;
  onSelect?: (id: string) => void;
}

const statusIcon = (status?: BdsStatus) => {
  if (status === "completed") return <CheckCircle2 className="h-4 w-4" />;
  if (status === "locked") return <Lock className="h-4 w-4" />;
  return <Circle className="h-4 w-4" />;
};

const nodeCls = (status?: BdsStatus) =>
  cn(
    "grid h-10 w-10 shrink-0 place-items-center rounded-full border text-white",
    status === "completed" && "border-brand-mint/50 bg-brand-mint/20 text-brand-mint",
    status === "in-progress" && "border-brand-primary/50 bg-brand-primary/20 text-app-text glow-primary",
    status === "new" && "border-brand-cyan/50 bg-brand-cyan/20 text-brand-cyan",
    status === "locked" && "border-app-border bg-app-surface-high text-app-text-muted",
    (!status || status === "coming-soon") && "border-app-border bg-app-surface-elevated text-app-text-muted",
  );

export function TimelineNode({ status, icon, className }: { status?: BdsStatus; icon?: ReactNode; className?: string }) {
  return <div className={cn(nodeCls(status), className)}>{icon ?? statusIcon(status)}</div>;
}

export function TimelineConnector({ orientation = "vertical", className }: { orientation?: "vertical" | "horizontal"; className?: string }) {
  return orientation === "vertical" ? (
    <div className={cn("mx-auto w-px flex-1 bg-gradient-to-b from-app-border via-app-border to-transparent", className)} />
  ) : (
    <div className={cn("my-auto h-px flex-1 bg-gradient-to-r from-app-border via-app-border to-transparent", className)} />
  );
}

export function TimelineItem({
  item,
  orientation = "vertical",
  last,
  onSelect,
}: {
  item: TimelineItemData;
  orientation?: "vertical" | "horizontal";
  last?: boolean;
  onSelect?: (id: string) => void;
}) {
  const body = (
    <div className="rounded-2xl border border-app-border bg-app-surface-elevated p-4 shadow-card transition-smooth hover:shadow-hover">
      {item.period && <div className="text-[10px] font-semibold uppercase tracking-widest text-app-text-muted">{item.period}</div>}
      <div className="mt-1 font-display text-base font-semibold text-app-text">{item.title}</div>
      {item.description && <p className="mt-1 text-xs text-app-text-muted">{item.description}</p>}
    </div>
  );

  if (orientation === "horizontal") {
    return (
      <div className="flex min-w-[240px] flex-col items-center gap-2 text-center">
        <TimelineNode status={item.status} icon={item.icon} />
        <button className="w-full text-left" onClick={onSelect ? () => onSelect(item.id) : undefined}>
          {body}
        </button>
      </div>
    );
  }

  return (
    <li className="relative flex gap-4">
      <div className="flex flex-col items-center">
        <TimelineNode status={item.status} icon={item.icon} />
        {!last && <TimelineConnector />}
      </div>
      <button className="mb-6 flex-1 text-left" onClick={onSelect ? () => onSelect(item.id) : undefined}>
        {body}
      </button>
    </li>
  );
}

export function Timeline({ items, orientation = "vertical", className, onSelect }: TimelineProps) {
  if (orientation === "horizontal") {
    return (
      <div className={cn("flex items-start gap-2 overflow-x-auto pb-2 no-scrollbar", className)}>
        {items.map((item, i) => (
          <div key={item.id} className="flex items-center">
            <TimelineItem item={item} orientation="horizontal" onSelect={onSelect} />
            {i < items.length - 1 && <TimelineConnector orientation="horizontal" className="w-12" />}
          </div>
        ))}
      </div>
    );
  }
  return (
    <ol className={cn("space-y-0", className)}>
      {items.map((item, i) => (
        <TimelineItem key={item.id} item={item} last={i === items.length - 1} onSelect={onSelect} />
      ))}
    </ol>
  );
}
