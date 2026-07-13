/**
 * Feedback helpers — thin, opinionated wrappers around Sonner toasts using BDS tokens.
 */
import { toast } from "sonner";
import { CheckCircle2, XCircle, Info, Sparkles } from "lucide-react";

export const feedback = {
  success: (message: string, description?: string) =>
    toast(message, { description, icon: <CheckCircle2 className="h-4 w-4 text-brand-mint" /> }),
  error: (message: string, description?: string) =>
    toast(message, { description, icon: <XCircle className="h-4 w-4 text-brand-coral" /> }),
  info: (message: string, description?: string) =>
    toast(message, { description, icon: <Info className="h-4 w-4 text-brand-cyan" /> }),
  achievement: (message: string, description?: string) =>
    toast(message, { description, icon: <Sparkles className="h-4 w-4 text-brand-gold" /> }),
};
