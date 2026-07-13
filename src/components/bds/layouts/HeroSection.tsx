/**
 * HeroSection — reusable hero with image, gradient overlay, breadcrumbs,
 * badge/tag, title, subtitle, description, action buttons and optional icon.
 */
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Kicker, Display, Muted } from "../typography/Typography";

export interface HeroSectionProps {
  image?: string;
  overlayClassName?: string;
  gradientClassName?: string;
  kicker?: string;
  title: string;
  subtitle?: string;
  description?: string;
  badge?: ReactNode;
  tag?: ReactNode;
  breadcrumbs?: ReactNode;
  actions?: ReactNode;
  icon?: ReactNode;
  align?: "left" | "center";
  height?: "sm" | "md" | "lg";
  className?: string;
}

const heights = { sm: "min-h-[320px]", md: "min-h-[440px]", lg: "min-h-[560px]" };

export function HeroSection({
  image,
  overlayClassName,
  gradientClassName,
  kicker,
  title,
  subtitle,
  description,
  badge,
  tag,
  breadcrumbs,
  actions,
  icon,
  align = "left",
  height = "md",
  className,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-3xl border border-app-border bg-app-surface",
        heights[height],
        className,
      )}
    >
      {image && (
        <img
          src={image}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div className={cn("absolute inset-0 bg-gradient-hero", gradientClassName)} />
      <div className={cn("absolute inset-0 bg-app-background/60", overlayClassName)} />
      <div
        className={cn(
          "relative flex h-full flex-col justify-end gap-4 p-6 md:p-10",
          align === "center" && "items-center text-center",
        )}
      >
        {breadcrumbs && <div className="w-full">{breadcrumbs}</div>}
        <div className={cn("flex flex-col gap-3", align === "center" && "items-center")}>
          <div className="flex flex-wrap items-center gap-2">
            {icon && <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 text-white backdrop-blur">{icon}</span>}
            {tag}
            {badge}
          </div>
          {kicker && <Kicker>{kicker}</Kicker>}
          <Display className="max-w-3xl text-balance">{title}</Display>
          {subtitle && <p className="max-w-2xl font-display text-lg text-app-text-muted">{subtitle}</p>}
          {description && <Muted className="max-w-2xl">{description}</Muted>}
          {actions && <div className="mt-2 flex flex-wrap items-center gap-3">{actions}</div>}
        </div>
      </div>
    </section>
  );
}
