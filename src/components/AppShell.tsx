import { useEffect, useState, type ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { MobileBottomNav } from "./MobileBottomNav";
import { initSmoothScroll } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    initSmoothScroll();
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-app-background text-app-text">
      {/* Desktop sidebar */}
      <div className="hidden shrink-0 md:block">
        <div className="sticky top-0 h-screen">
          <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in-0"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <div className={cn("absolute inset-y-0 left-0 w-[280px] animate-in slide-in-from-left")}>
            <div className="relative h-full">
              <AppSidebar
                collapsed={false}
                onToggle={() => setMobileOpen(false)}
                onNavigate={() => setMobileOpen(false)}
              />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Fechar menu"
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-xl bg-app-surface-elevated text-app-text-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader onOpenMobileNav={() => setMobileOpen(true)} />
        <main className="min-w-0 flex-1 pb-24 md:pb-8">{children}</main>
      </div>

      <MobileBottomNav />
    </div>
  );
}
