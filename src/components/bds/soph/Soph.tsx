/**
 * Soph — the AI companion UI (layout only; no AI wired here).
 * SophTip · SophWelcome · SophAchievement · SophQuestion · SophHint
 * SophSmallCard · SophFloatingButton
 */
import { useState, type ReactNode } from "react";
import { Sparkles, MessageCircle, X, Send, HelpCircle, Award, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { BdsButton } from "../buttons/BdsButton";
import { BdsInput } from "../inputs/BdsInput";
import { GlassCard } from "../cards/Cards";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const sophAvatar = (
  <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-lavender to-brand-primary text-white shadow-glow">
    <Sparkles className="h-4 w-4" />
  </span>
);

interface BaseSophProps {
  title?: string;
  message: ReactNode;
  className?: string;
  action?: ReactNode;
  onDismiss?: () => void;
}

function SophBubble({ title, message, className, action, onDismiss, icon }: BaseSophProps & { icon?: ReactNode }) {
  return (
    <GlassCard className={cn("flex gap-3 p-4", className)}>
      {icon ?? sophAvatar}
      <div className="min-w-0 flex-1">
        {title && <div className="font-display text-sm font-semibold text-app-text">{title}</div>}
        <div className="mt-1 text-sm text-app-text-muted">{message}</div>
        {action && <div className="mt-3">{action}</div>}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Fechar dica da Soph"
          className="grid h-7 w-7 place-items-center rounded-full text-app-text-muted hover:bg-white/10"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </GlassCard>
  );
}

export const SophTip = (p: BaseSophProps) => <SophBubble {...p} title={p.title ?? "Dica da Soph"} icon={<span className="grid h-9 w-9 place-items-center rounded-full bg-brand-gold/20 text-brand-gold"><Lightbulb className="h-4 w-4" /></span>} />;
export const SophWelcome = (p: BaseSophProps) => <SophBubble {...p} title={p.title ?? "Olá! Sou a Soph"} />;
export const SophAchievement = (p: BaseSophProps) => <SophBubble {...p} title={p.title ?? "Conquista desbloqueada!"} icon={<span className="grid h-9 w-9 place-items-center rounded-full bg-brand-gold/20 text-brand-gold bds-glow-pulse"><Award className="h-4 w-4" /></span>} />;
export const SophQuestion = (p: BaseSophProps) => <SophBubble {...p} title={p.title ?? "Pergunta da Soph"} icon={<span className="grid h-9 w-9 place-items-center rounded-full bg-brand-cyan/20 text-brand-cyan"><HelpCircle className="h-4 w-4" /></span>} />;
export const SophHint = (p: BaseSophProps) => <SophBubble {...p} title={p.title ?? "Pssiu..."} />;

export interface SophSmallCardProps {
  message: string;
  onClick?: () => void;
  className?: string;
}
export function SophSmallCard({ message, onClick, className }: SophSmallCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-left text-xs text-app-text-muted backdrop-blur transition-smooth hover:bg-white/10",
        className,
      )}
    >
      {sophAvatar}
      <span className="line-clamp-1">{message}</span>
    </button>
  );
}

export interface SophFloatingButtonProps {
  className?: string;
  panelTitle?: string;
  placeholder?: string;
}

/** Discreet floating button that opens a side panel. No AI is wired. */
export function SophFloatingButton({
  className,
  panelTitle = "Pergunte à Soph",
  placeholder = "Escreva sua pergunta...",
}: SophFloatingButtonProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir Soph"
        className={cn(
          "fixed bottom-24 right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-brand-lavender to-brand-primary text-white shadow-glow transition-smooth bds-press hover:scale-105 md:bottom-6",
          "bds-floating",
          className,
        )}
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-brand-coral text-[10px] font-bold">
          <Sparkles className="h-2.5 w-2.5" />
        </span>
      </button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full border-app-border bg-app-surface text-app-text sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 font-display text-app-text">
              {sophAvatar}
              {panelTitle}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-4 flex h-[calc(100%-6rem)] flex-col gap-3">
            <div className="flex-1 overflow-y-auto rounded-2xl border border-app-border bg-app-surface-elevated p-4">
              <SophWelcome message="Faça uma pergunta sobre a história que você está lendo. Estou aqui para ajudar!" />
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-2"
            >
              <BdsInput placeholder={placeholder} className="flex-1" />
              <BdsButton size="icon" aria-label="Enviar"><Send className="h-4 w-4" /></BdsButton>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
