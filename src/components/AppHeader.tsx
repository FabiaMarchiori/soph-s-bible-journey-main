import { Menu, Search, Bell } from "lucide-react";
import { LanguageMenu } from "./LanguageMenu";

interface AppHeaderProps {
  onOpenMobileNav: () => void;
}

export function AppHeader({ onOpenMobileNav }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-app-border/70 bg-app-background/80 px-4 backdrop-blur-xl md:px-6">
      <button
        onClick={onOpenMobileNav}
        aria-label="Abrir menu"
        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-app-text-muted transition-smooth hover:bg-app-surface-elevated hover:text-app-text md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search */}
      <div className="relative flex min-w-0 flex-1 items-center">
        <Search className="pointer-events-none absolute left-3 h-4 w-4 text-app-text-muted" />
        <input
          type="search"
          placeholder="Buscar história, livro, personagem..."
          className="h-10 w-full min-w-0 rounded-full border border-app-border bg-app-surface pl-9 pr-4 text-sm text-app-text placeholder:text-app-text-muted transition-smooth focus:border-brand-primary/50 focus:bg-app-surface-elevated focus:outline-none"
          aria-label="Buscar"
        />
      </div>

      <div className="flex items-center gap-2">
        <LanguageMenu />
        <button
          aria-label="Notificações"
          className="relative grid h-10 w-10 place-items-center rounded-full text-app-text-muted transition-smooth hover:bg-app-surface-elevated hover:text-app-text"
        >
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-coral shadow-[0_0_6px_hsl(7_100%_70%/0.9)]" />
        </button>
        <button
          aria-label="Perfil"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-brand font-display text-sm font-bold text-white shadow-glow transition-smooth hover:scale-105"
        >
          S
        </button>
      </div>
    </header>
  );
}
