/**
 * BdsButton — the single button primitive of the Bible Design System.
 * Variants: primary | secondary | ghost | glass | soph | danger
 * Sizes: sm | md | lg | icon
 */
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type BdsButtonVariant = "primary" | "secondary" | "ghost" | "glass" | "soph" | "danger";
export type BdsButtonSize = "sm" | "md" | "lg" | "icon";

export interface BdsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BdsButtonVariant;
  size?: BdsButtonSize;
  loading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  asChild?: boolean;
}

const variants: Record<BdsButtonVariant, string> = {
  primary:
    "bg-gradient-brand text-white shadow-glow hover:shadow-hover focus-visible:ring-2 focus-visible:ring-brand-primary",
  secondary:
    "bg-app-surface-elevated text-app-text border border-app-border hover:bg-app-surface-high",
  ghost: "text-app-text hover:bg-app-surface-elevated",
  glass:
    "bg-white/5 text-app-text backdrop-blur-md border border-white/10 hover:bg-white/10",
  soph:
    "bg-gradient-to-br from-brand-lavender to-brand-primary text-white shadow-glow hover:brightness-110",
  danger: "bg-brand-coral text-white hover:brightness-110",
};

const sizes: Record<BdsButtonSize, string> = {
  sm: "h-9 px-3 text-xs rounded-lg gap-1.5",
  md: "h-11 px-5 text-sm rounded-xl gap-2",
  lg: "h-14 px-7 text-base rounded-2xl gap-2.5",
  icon: "h-11 w-11 rounded-xl grid place-items-center",
};

export const BdsButton = forwardRef<HTMLButtonElement, BdsButtonProps>(function BdsButton(
  { className, variant = "primary", size = "md", loading, leadingIcon, trailingIcon, children, disabled, asChild, ...rest },
  ref,
) {
  const Comp: React.ElementType = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center font-display font-semibold transition-smooth bds-press outline-none disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : leadingIcon}
      {size !== "icon" && <span>{children}</span>}
      {size === "icon" && !loading && children}
      {trailingIcon}
    </Comp>
  );
});
