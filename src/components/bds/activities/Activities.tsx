/**
 * Activity cards (layout only).
 * ActivityCard · PrintableCard · ColoringCard · MemoryVerseCard
 * ReflectionCard · ChallengeCard
 */
import type { ReactNode } from "react";
import { Printer, Palette, BookText, MessageSquareText, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { UniversalCard } from "../cards/Cards";
import { BdsButton } from "../buttons/BdsButton";

export interface ActivityCardProps {
  title: string;
  description?: string;
  image?: string;
  icon?: ReactNode;
  cta?: string;
  onAction?: () => void;
  className?: string;
  accent?: string; // css color for the icon halo
}

export function ActivityCard({ title, description, image, icon, cta = "Abrir", onAction, className, accent = "var(--brand-primary)" }: ActivityCardProps) {
  return (
    <UniversalCard interactive={!!onAction} onClick={onAction} className={cn("flex flex-col overflow-hidden", className)}>
      {image ? (
        <div className="relative aspect-video overflow-hidden">
          <img src={image} alt={title} loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-app-surface-elevated to-transparent" />
          {icon && (
            <span
              className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-2xl text-white shadow-glow"
              style={{ background: `linear-gradient(135deg, ${accent}, hsl(252 100% 67%))` }}
            >
              {icon}
            </span>
          )}
        </div>
      ) : (
        icon && (
          <div className="p-5">
            <span
              className="grid h-11 w-11 place-items-center rounded-2xl text-white shadow-glow"
              style={{ background: `linear-gradient(135deg, ${accent}, hsl(252 100% 67%))` }}
            >
              {icon}
            </span>
          </div>
        )
      )}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <div className="font-display text-base font-semibold text-app-text">{title}</div>
          {description && <p className="mt-1 text-sm text-app-text-muted">{description}</p>}
        </div>
        <div className="mt-auto">
          <BdsButton size="sm" variant="secondary">{cta}</BdsButton>
        </div>
      </div>
    </UniversalCard>
  );
}

export const PrintableCard = (p: Omit<ActivityCardProps, "icon" | "accent">) => (
  <ActivityCard {...p} icon={<Printer className="h-5 w-5" />} accent="var(--brand-cyan)" cta={p.cta ?? "Imprimir"} />
);
export const ColoringCard = (p: Omit<ActivityCardProps, "icon" | "accent">) => (
  <ActivityCard {...p} icon={<Palette className="h-5 w-5" />} accent="var(--brand-coral)" cta={p.cta ?? "Colorir"} />
);
export const MemoryVerseCard = (p: Omit<ActivityCardProps, "icon" | "accent">) => (
  <ActivityCard {...p} icon={<BookText className="h-5 w-5" />} accent="var(--brand-gold)" cta={p.cta ?? "Memorizar"} />
);
export const ReflectionCard = (p: Omit<ActivityCardProps, "icon" | "accent">) => (
  <ActivityCard {...p} icon={<MessageSquareText className="h-5 w-5" />} accent="var(--brand-lavender)" cta={p.cta ?? "Refletir"} />
);
export const ChallengeCard = (p: Omit<ActivityCardProps, "icon" | "accent">) => (
  <ActivityCard {...p} icon={<Flame className="h-5 w-5" />} accent="var(--brand-coral)" cta={p.cta ?? "Aceitar desafio"} />
);
