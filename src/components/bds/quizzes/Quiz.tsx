/**
 * Quiz layout components (no logic).
 * QuizCard · QuestionCard · AnswerCard · ResultCard · ScoreCard
 */
import type { ReactNode } from "react";
import { CheckCircle2, XCircle, Trophy, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { BdsButton } from "../buttons/BdsButton";
import { CircularProgress } from "../progress/Progress";
import { UniversalCard, GlassCard } from "../cards/Cards";

export interface QuizCardProps {
  title: string;
  description?: string;
  questionsCount: number;
  duration?: string;
  onStart?: () => void;
  className?: string;
}
export function QuizCard({ title, description, questionsCount, duration, onStart, className }: QuizCardProps) {
  return (
    <UniversalCard className={cn("flex flex-col gap-4 p-5", className)}>
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-primary/20 text-brand-primary">
          <HelpCircle className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <div className="truncate font-display text-lg font-semibold text-app-text">{title}</div>
          <div className="text-xs text-app-text-muted">
            {questionsCount} perguntas{duration ? ` · ${duration}` : ""}
          </div>
        </div>
      </div>
      {description && <p className="text-sm text-app-text-muted">{description}</p>}
      <BdsButton onClick={onStart}>Começar quiz</BdsButton>
    </UniversalCard>
  );
}

export interface QuestionCardProps {
  index: number;
  total: number;
  prompt: string;
  children: ReactNode; // AnswerCards
  className?: string;
}
export function QuestionCard({ index, total, prompt, children, className }: QuestionCardProps) {
  return (
    <GlassCard className={cn("flex flex-col gap-5 p-6", className)}>
      <div className="flex items-center justify-between text-xs text-app-text-muted">
        <span className="font-display font-semibold uppercase tracking-widest">Pergunta {index}/{total}</span>
        <span>{Math.round((index / total) * 100)}%</span>
      </div>
      <h3 className="font-display text-xl font-semibold text-app-text">{prompt}</h3>
      <div className="grid gap-3">{children}</div>
    </GlassCard>
  );
}

export interface AnswerCardProps {
  label: string;
  index: number; // 0-based (renders as A, B, C)
  selected?: boolean;
  state?: "idle" | "correct" | "wrong";
  onSelect?: () => void;
  className?: string;
}
export function AnswerCard({ label, index, selected, state = "idle", onSelect, className }: AnswerCardProps) {
  const letter = String.fromCharCode(65 + index);
  return (
    <button
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-app-border bg-app-surface-elevated p-4 text-left transition-smooth bds-press hover:border-brand-primary/60",
        selected && "border-brand-primary/60 ring-1 ring-brand-primary/40",
        state === "correct" && "border-brand-mint/60 bg-brand-mint/10",
        state === "wrong" && "border-brand-coral/60 bg-brand-coral/10",
        className,
      )}
    >
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-app-surface-high font-display text-xs font-bold text-app-text">
        {letter}
      </span>
      <span className="flex-1 text-sm text-app-text">{label}</span>
      {state === "correct" && <CheckCircle2 className="h-5 w-5 text-brand-mint" />}
      {state === "wrong" && <XCircle className="h-5 w-5 text-brand-coral" />}
    </button>
  );
}

export interface ResultCardProps {
  score: number; // 0-100
  correct: number;
  total: number;
  onRetry?: () => void;
  onContinue?: () => void;
  className?: string;
}
export function ResultCard({ score, correct, total, onRetry, onContinue, className }: ResultCardProps) {
  return (
    <GlassCard className={cn("flex flex-col items-center gap-4 p-8 text-center", className)}>
      <span className="grid h-16 w-16 place-items-center rounded-full bg-brand-gold/20 text-brand-gold bds-glow-pulse">
        <Trophy className="h-7 w-7" />
      </span>
      <div>
        <div className="font-display text-2xl font-bold text-app-text">Muito bem!</div>
        <div className="mt-1 text-sm text-app-text-muted">
          Você acertou {correct} de {total} perguntas.
        </div>
      </div>
      <CircularProgress value={score} size={100} strokeWidth={8} />
      <div className="flex flex-wrap justify-center gap-2">
        {onRetry && <BdsButton variant="secondary" onClick={onRetry}>Tentar novamente</BdsButton>}
        {onContinue && <BdsButton onClick={onContinue}>Continuar jornada</BdsButton>}
      </div>
    </GlassCard>
  );
}

export interface ScoreCardProps {
  label: string;
  value: number;
  suffix?: string;
  className?: string;
}
export function ScoreCard({ label, value, suffix, className }: ScoreCardProps) {
  return (
    <div className={cn("rounded-2xl border border-app-border bg-app-surface-elevated p-4 text-center", className)}>
      <div className="font-display text-3xl font-bold text-app-text">
        {value}
        {suffix && <span className="ml-0.5 text-lg text-app-text-muted">{suffix}</span>}
      </div>
      <div className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-app-text-muted">{label}</div>
    </div>
  );
}
