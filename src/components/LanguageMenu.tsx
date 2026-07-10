import { useEffect, useRef, useState } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Lang {
  code: string;
  label: string;
  flag: string;
}

const LANGS: Lang[] = [
  { code: "PT", label: "Português", flag: "🇧🇷" },
  { code: "EN", label: "English", flag: "🇺🇸" },
  { code: "ES", label: "Español", flag: "🇪🇸" },
  { code: "FR", label: "Français", flag: "🇫🇷" },
  { code: "DE", label: "Deutsch", flag: "🇩🇪" },
  { code: "IT", label: "Italiano", flag: "🇮🇹" },
  { code: "JA", label: "日本語", flag: "🇯🇵" },
  { code: "KO", label: "한국어", flag: "🇰🇷" },
  { code: "ZH", label: "中文", flag: "🇨🇳" },
  { code: "AR", label: "العربية", flag: "🇸🇦" },
  { code: "HE", label: "עברית", flag: "🇮🇱" },
];

const STORAGE_KEY = "jbs:language";

export function LanguageMenu({ variant = "header" }: { variant?: "header" | "sheet" }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Lang>(LANGS[0]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const found = LANGS.find((l) => l.code === saved);
      if (found) setCurrent(found);
    } catch { /* noop */ }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const select = (lang: Lang) => {
    setCurrent(lang);
    try { localStorage.setItem(STORAGE_KEY, lang.code); } catch { /* noop */ }
    setOpen(false);
    toast.success(`Idioma alterado para ${lang.label}.`);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Selecionar idioma"
        className={cn(
          "flex items-center gap-2 rounded-full border border-app-border bg-app-surface-elevated px-3 py-1.5 text-sm font-medium text-app-text transition-smooth hover:border-brand-primary/40 hover:bg-app-surface-high",
          variant === "sheet" && "w-full justify-between",
        )}
      >
        <Globe className="h-4 w-4 text-app-text-muted" />
        <span className="font-display text-xs font-semibold tracking-wide">{current.code}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 text-app-text-muted transition-smooth", open && "rotate-180")} />
      </button>

      {open && (
        <div
          role="listbox"
          className={cn(
            "absolute right-0 z-50 mt-2 w-56 origin-top-right overflow-hidden rounded-2xl border border-app-border bg-app-surface-elevated p-1.5 shadow-elevated",
            "animate-in fade-in-0 zoom-in-95",
          )}
        >
          <div className="max-h-72 overflow-y-auto">
            {LANGS.map((lang) => {
              const active = lang.code === current.code;
              return (
                <button
                  key={lang.code}
                  role="option"
                  aria-selected={active}
                  onClick={() => select(lang)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-app-text-muted transition-fast hover:bg-app-surface-high hover:text-app-text",
                    active && "text-app-text",
                  )}
                >
                  <span className="text-base leading-none">{lang.flag}</span>
                  <span className="flex-1">{lang.label}</span>
                  <span className="font-display text-[10px] font-semibold uppercase tracking-wider text-app-text-muted">
                    {lang.code}
                  </span>
                  {active && <Check className="h-3.5 w-3.5 text-brand-primary" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
