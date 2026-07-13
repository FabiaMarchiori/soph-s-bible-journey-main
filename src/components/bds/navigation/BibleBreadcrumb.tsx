/**
 * BibleBreadcrumb — hierarchical breadcrumb: Biblioteca > Livro > Parte > Cena.
 */
import { Fragment, type ReactNode } from "react";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BibleBreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  onClick?: () => void;
}

export interface BibleBreadcrumbProps {
  items: BibleBreadcrumbItem[];
  className?: string;
  homeHref?: string;
}

export function BibleBreadcrumb({ items, className, homeHref = "/" }: BibleBreadcrumbProps) {
  return (
    <nav aria-label="Trilha de navegação" className={cn("flex flex-wrap items-center gap-1 text-xs text-app-text-muted", className)}>
      <a href={homeHref} className="grid h-7 w-7 place-items-center rounded-lg bg-white/5 text-app-text-muted transition-smooth hover:text-app-text" aria-label="Início">
        <Home className="h-3.5 w-3.5" />
      </a>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const content = (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-md px-2 py-1 transition-smooth",
              isLast ? "font-semibold text-app-text" : "hover:text-app-text",
            )}
            aria-current={isLast ? "page" : undefined}
          >
            {item.icon}
            {item.label}
          </span>
        );
        return (
          <Fragment key={`${item.label}-${i}`}>
            <ChevronRight className="h-3 w-3 opacity-60" aria-hidden />
            {item.href && !isLast ? (
              <a href={item.href} onClick={item.onClick}>
                {content}
              </a>
            ) : item.onClick && !isLast ? (
              <button type="button" onClick={item.onClick}>{content}</button>
            ) : (
              content
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
