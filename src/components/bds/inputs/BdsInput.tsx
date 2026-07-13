/**
 * BdsInput / BdsTextarea / BdsSearch — themed inputs using BDS tokens.
 */
import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type ReactNode } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const base =
  "w-full rounded-xl border border-app-border bg-app-surface-elevated px-4 py-3 text-sm text-app-text placeholder:text-app-text-muted transition-smooth focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/40 disabled:opacity-50";

export interface BdsInputProps extends InputHTMLAttributes<HTMLInputElement> {
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  invalid?: boolean;
}

export const BdsInput = forwardRef<HTMLInputElement, BdsInputProps>(function BdsInput(
  { className, leadingIcon, trailingIcon, invalid, ...rest },
  ref,
) {
  if (leadingIcon || trailingIcon) {
    return (
      <div className="relative">
        {leadingIcon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-app-text-muted">
            {leadingIcon}
          </span>
        )}
        <input
          ref={ref}
          className={cn(base, leadingIcon && "pl-10", trailingIcon && "pr-10", invalid && "border-brand-coral focus:ring-brand-coral/40", className)}
          aria-invalid={invalid || undefined}
          {...rest}
        />
        {trailingIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-app-text-muted">
            {trailingIcon}
          </span>
        )}
      </div>
    );
  }
  return <input ref={ref} className={cn(base, invalid && "border-brand-coral focus:ring-brand-coral/40", className)} aria-invalid={invalid || undefined} {...rest} />;
});

export interface BdsTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const BdsTextarea = forwardRef<HTMLTextAreaElement, BdsTextareaProps>(function BdsTextarea(
  { className, invalid, ...rest },
  ref,
) {
  return (
    <textarea
      ref={ref}
      className={cn(base, "min-h-[120px] resize-y", invalid && "border-brand-coral", className)}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  );
});

export function BdsSearch(props: Omit<BdsInputProps, "leadingIcon">) {
  return <BdsInput leadingIcon={<Search className="h-4 w-4" />} placeholder="Buscar histórias, personagens..." {...props} />;
}
