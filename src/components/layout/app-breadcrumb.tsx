import { ChevronRight } from "lucide-react";
import { useLocation } from "wouter";
import { getBreadcrumbs } from "./nav-config";

type Props = { className?: string };

export function AppBreadcrumb({ className = "" }: Props) {
  const [location, navigate] = useLocation();
  const crumbs = getBreadcrumbs(location);

  if (crumbs.length <= 1) return null;

  return (
    <nav className={`flex items-center gap-1 ${className}`} aria-label="Breadcrumb">
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 flex-shrink-0" strokeWidth={1.5} />}
            {crumb.href && !isLast ? (
              <button
                onClick={() => navigate(crumb.href!)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors min-h-0 cursor-pointer"
              >
                {crumb.label}
              </button>
            ) : (
              <span className={`text-xs ${isLast ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                {crumb.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
