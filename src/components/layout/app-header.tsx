import { Menu, Bell } from "lucide-react";
import { useLocation } from "wouter";
import { LsLogo } from "@/components/common/LsLogo";
import { AppBreadcrumb } from "./app-breadcrumb";
import { getBreadcrumbs } from "./nav-config";

type Props = {
  onOpenMobileMenu: () => void;
};

export function AppHeader({ onOpenMobileMenu }: Props) {
  const [location] = useLocation();
  const crumbs = getBreadcrumbs(location);
  const pageTitle = crumbs[crumbs.length - 1]?.label ?? "Dashboard";

  return (
    <header className="bg-white border-b border-border px-5 py-0 h-14 flex items-center flex-shrink-0 sticky top-0 z-30">

      {/* Mobile layout */}
      <div className="flex items-center justify-between w-full lg:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors min-h-0 cursor-pointer"
            aria-label="Abrir menu"
          >
            <Menu className="w-5 h-5" strokeWidth={1.75} />
          </button>
          <LsLogo size={30} />
        </div>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors min-h-0 cursor-pointer" aria-label="Notificações">
            <Bell className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </button>
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xs font-bold text-primary">LS</span>
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:flex items-center justify-between w-full relative">
        {/* Left — Breadcrumb */}
        <div className="flex-1">
          <AppBreadcrumb />
        </div>

        {/* Center — Page title */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <p className="text-sm font-semibold text-foreground tracking-[-0.01em] whitespace-nowrap">{pageTitle}</p>
        </div>

        {/* Right — Actions */}
        <div className="flex-1 flex items-center justify-end gap-2">
          <button className="w-9 h-9 flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors min-h-0 cursor-pointer" aria-label="Notificações">
            <Bell className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </button>
          <div className="flex items-center gap-2.5 pl-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-primary">LS</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground leading-tight">Luciana Santana</p>
              <p className="text-[0.6875rem] text-muted-foreground leading-tight">Personal Trainer</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
