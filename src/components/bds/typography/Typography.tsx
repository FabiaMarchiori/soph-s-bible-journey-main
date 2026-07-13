/**
 * BDS Typography — semantic display / body components.
 * All use design tokens (font families) declared in styles.css.
 */
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type El = HTMLAttributes<HTMLElement>;

export const Display = forwardRef<HTMLHeadingElement, El>(({ className, ...p }, ref) => (
  <h1 ref={ref} className={cn("font-display text-4xl font-bold tracking-tight text-app-text md:text-5xl", className)} {...p} />
));
Display.displayName = "Display";

export const H1 = forwardRef<HTMLHeadingElement, El>(({ className, ...p }, ref) => (
  <h1 ref={ref} className={cn("font-display text-3xl font-bold text-app-text md:text-4xl", className)} {...p} />
));
H1.displayName = "H1";

export const H2 = forwardRef<HTMLHeadingElement, El>(({ className, ...p }, ref) => (
  <h2 ref={ref} className={cn("font-display text-2xl font-semibold text-app-text md:text-3xl", className)} {...p} />
));
H2.displayName = "H2";

export const H3 = forwardRef<HTMLHeadingElement, El>(({ className, ...p }, ref) => (
  <h3 ref={ref} className={cn("font-display text-xl font-semibold text-app-text", className)} {...p} />
));
H3.displayName = "H3";

export const Body = forwardRef<HTMLParagraphElement, El>(({ className, ...p }, ref) => (
  <p ref={ref} className={cn("text-base leading-relaxed text-app-text", className)} {...p} />
));
Body.displayName = "Body";

export const Muted = forwardRef<HTMLParagraphElement, El>(({ className, ...p }, ref) => (
  <p ref={ref} className={cn("text-sm text-app-text-muted", className)} {...p} />
));
Muted.displayName = "Muted";

export const Kicker = forwardRef<HTMLSpanElement, El>(({ className, ...p }, ref) => (
  <span ref={ref} className={cn("text-[10px] font-semibold uppercase tracking-[0.22em] text-app-text-muted", className)} {...p} />
));
Kicker.displayName = "Kicker";

export const Playful = forwardRef<HTMLSpanElement, El>(({ className, ...p }, ref) => (
  <span ref={ref} className={cn("font-playful text-xl text-app-text", className)} {...p} />
));
Playful.displayName = "Playful";
