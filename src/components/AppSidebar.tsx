import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  Library,
  Compass,
  Heart,
  Puzzle,
  HelpCircle,
  Printer,
  BookMarked,
  ScrollText,
  Sparkles,
  Book,
  User,
  Settings,
  Shield,
  Sun,
  Flame,
  BookOpen,
  ChevronsLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Item {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  hidden?: boolean;
}

const groups: { title: string; items: Item[] }[] = [
  {
    title: "Principal",
    items: [
      { to: "/", label: "Início", icon: Home },
      { to: "/biblioteca", label: "Biblioteca", icon: Library },
      { to: "/jornada", label: "Minha jornada", icon: Compass },
      { to: "/favoritos", label: "Favoritos", icon: Heart },
      { to: "/atividades", label: "Atividades", icon: Puzzle },
      { to: "/quizzes", label: "Quizzes", icon: HelpCircle },
      { to: "/materiais", label: "Materiais para imprimir", icon: Printer },
    ],
  },
  {
    title: "Explorar",
    items: [
      { to: "/antigo-testamento", label: "Antigo Testamento", icon: ScrollText },
      { to: "/novo-testamento", label: "Novo Testamento", icon: BookMarked },
      { to: "/trilhas", label: "Trilhas", icon: Sparkles },
    ],
  },
  {
    title: "Conta",
    items: [
      { to: "/perfil", label: "Perfil", icon: User },
      { to: "/configuracoes", label: "Configurações", icon: Settings },
      { to: "/ajuda", label: "Ajuda", icon: HelpCircle },
    ],
  },
  {
    title: "Administração",
    items: [{ to: "/admin", label: "Admin", icon: Shield, hidden: true }],
  },
];

const trackChildren = [
  { to: "/trilhas?t=infantil", label: "Infantil", icon: Sun },
  { to: "/trilhas?t=teen", label: "Teen", icon: Sparkles },
  { to: "/trilhas?t=manga", label: "Mangá", icon: Flame },
  { to: "/trilhas?t=tradicional", label: "Tradicional", icon: BookOpen },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
}

export function AppSidebar({ collapsed, onToggle, onNavigate }: SidebarProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-app-border bg-app-surface transition-smooth",
        collapsed ? "w-[72px]" : "w-[260px]",
      )}
      aria-label="Navegação principal"
    >
      {/* Brand */}
      <div className="flex h-16 items-center gap-3 px-4">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-brand shadow-glow">
          <Book className="h-5 w-5 text-white" strokeWidth={2.4} />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <div className="font-display text-sm font-bold leading-tight">Jornada Bíblica</div>
            <div className="text-[11px] text-app-text-muted">com Soph</div>
          </div>
        )}
        <button
          onClick={onToggle}
          aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
          className={cn(
            "ml-auto grid h-8 w-8 shrink-0 place-items-center rounded-lg text-app-text-muted transition-smooth hover:bg-app-surface-elevated hover:text-app-text",
            collapsed && "mx-auto",
          )}
        >
          <ChevronsLeft className={cn("h-4 w-4 transition-smooth", collapsed && "rotate-180")} />
        </button>
      </div>

      {/* Nav */}
      <nav className="no-scrollbar flex-1 overflow-y-auto px-3 pb-6">
        {groups.map((group) => {
          const visibleItems = group.items.filter((i) => !i.hidden);
          if (visibleItems.length === 0) return null;
          return (
            <div key={group.title} className="mt-5 first:mt-2">
              {!collapsed && (
                <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-app-text-muted/80">
                  {group.title}
                </div>
              )}
              <ul className="flex flex-col gap-1">
                {visibleItems.map((item) => {
                  const active =
                    item.to === "/"
                      ? pathname === "/"
                      : pathname === item.to || pathname.startsWith(item.to + "/");
                  const Icon = item.icon;
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={onNavigate}
                        className={cn(
                          "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-app-text-muted transition-smooth hover:bg-app-surface-elevated hover:text-app-text",
                          active && "bg-app-surface-elevated text-app-text",
                          collapsed && "justify-center px-2",
                        )}
                      >
                        {active && (
                          <span
                            aria-hidden
                            className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-gradient-brand shadow-[0_0_12px_hsl(252_100%_67%/0.7)]"
                          />
                        )}
                        <Icon className={cn("h-[18px] w-[18px] shrink-0", active && "text-brand-primary")} />
                        {!collapsed && <span className="truncate">{item.label}</span>}
                      </Link>
                      {/* Trilhas children */}
                      {!collapsed && item.to === "/trilhas" && active && (
                        <ul className="mt-1 flex flex-col gap-0.5 pl-4">
                          {trackChildren.map((t) => {
                            const TIcon = t.icon;
                            return (
                              <li key={t.to}>
                                <Link
                                  to="/trilhas"
                                  search={{ t: t.to.split("=")[1] }}
                                  onClick={onNavigate}
                                  className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-app-text-muted transition-smooth hover:text-app-text"
                                >
                                  <TIcon className="h-3.5 w-3.5" />
                                  {t.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="mx-3 mb-3 rounded-2xl border border-app-border bg-app-surface-elevated p-3">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-brand-cyan">
            Dica da Soph
          </div>
          <p className="mt-1 text-xs leading-snug text-app-text-muted">
            Uma história por dia mantém sua sequência viva. Continue firme!
          </p>
        </div>
      )}
    </aside>
  );
}
