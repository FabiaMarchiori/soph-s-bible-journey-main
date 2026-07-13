/**
 * Dialog primitives: ConfirmDialog · InfoDialog · AchievementDialog.
 * Wrap the shadcn Dialog with BDS styling and consistent actions.
 */
import type { ReactNode } from "react";
import { Award, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { BdsButton } from "../buttons/BdsButton";
import { cn } from "@/lib/utils";

interface BaseDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  description?: ReactNode;
  className?: string;
}

export interface ConfirmDialogProps extends BaseDialogProps {
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  destructive?: boolean;
}

export function ConfirmDialog({
  open, onOpenChange, title, description, confirmLabel = "Confirmar", cancelLabel = "Cancelar", onConfirm, destructive, className,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("border-app-border bg-app-surface-elevated text-app-text", className)}>
        <DialogHeader>
          <DialogTitle className="font-display">{title}</DialogTitle>
          {description && <DialogDescription className="text-app-text-muted">{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter>
          <BdsButton variant="ghost" onClick={() => onOpenChange(false)}>{cancelLabel}</BdsButton>
          <BdsButton
            variant={destructive ? "danger" : "primary"}
            onClick={() => { onConfirm?.(); onOpenChange(false); }}
          >
            {confirmLabel}
          </BdsButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export interface InfoDialogProps extends BaseDialogProps {
  actionLabel?: string;
  children?: ReactNode;
}

export function InfoDialog({ open, onOpenChange, title, description, actionLabel = "Entendi", children, className }: InfoDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("border-app-border bg-app-surface-elevated text-app-text", className)}>
        <DialogHeader>
          <div className="mb-2 grid h-11 w-11 place-items-center rounded-2xl bg-brand-primary/20 text-brand-primary">
            <Info className="h-5 w-5" />
          </div>
          <DialogTitle className="font-display">{title}</DialogTitle>
          {description && <DialogDescription className="text-app-text-muted">{description}</DialogDescription>}
        </DialogHeader>
        {children}
        <DialogFooter>
          <BdsButton onClick={() => onOpenChange(false)}>{actionLabel}</BdsButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export interface AchievementDialogProps extends BaseDialogProps {
  achievement: string;
  reward?: string;
  onContinue?: () => void;
}

export function AchievementDialog({ open, onOpenChange, title, description, achievement, reward, onContinue, className }: AchievementDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("border-app-border bg-gradient-surface text-app-text", className)}>
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-brand-gold to-brand-primary text-white shadow-glow bds-glow-pulse">
            <Award className="h-9 w-9" />
          </div>
          <DialogHeader className="items-center text-center">
            <DialogTitle className="font-display text-2xl">{title}</DialogTitle>
            {description && <DialogDescription className="text-app-text-muted">{description}</DialogDescription>}
          </DialogHeader>
          <div className="rounded-2xl border border-app-border bg-app-surface-elevated px-4 py-2 font-display text-sm font-semibold text-brand-gold">
            {achievement}
          </div>
          {reward && <div className="text-xs text-app-text-muted">Recompensa: {reward}</div>}
          <BdsButton onClick={() => { onContinue?.(); onOpenChange(false); }}>Continuar</BdsButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
