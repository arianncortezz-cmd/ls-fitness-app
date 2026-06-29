import { ChevronLeft, LogOut } from "lucide-react";
import { useLocation } from "wouter";
import { LsLogo } from "@/components/common/LsLogo";
import { NavItem } from "./nav-item";
import { navItems } from "./nav-config";

type Props = {
  collapsed: boolean;
  onToggleCollapse: () => void;
};

export function Sidebar({ collapsed, onToggleCollapse }: Props) {
  const [location, navigate] = useLocation();

  const isActive = (href: string | null) => {
    if (!href) return false;
    if (href === "/personal-dashboard") return location === "/personal-dashboard";
    return location === href || location.startsWith(href + "/");
  };

  return (
    <aside
      className="hidden lg:flex flex-col bg-white border-r border-border flex-shrink-0 relative overflow-hidden transition-all duration-300 ease-out"
      style={{ width: collapsed ? 72 : 260 }}
    >
      {/* Logo */}
      <div className={`flex items-center py-5 border-b border-border flex-shrink-0 transition-all duration-300 ${collapsed ? "px-4 justify-center" : "px-5 gap-3"}`}>
        <LsLogo size={36} />
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-[0.9375rem] font-bold text-foreground tracking-[-0.02em] whitespace-nowrap">LS Fitness</p>
            <p className="text-[0.6875rem] text-muted-foreground whitespace-nowrap">Plataforma Personal</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className={`flex-1 overflow-y-auto py-4 flex flex-col gap-1 ${collapsed ? "px-2" : "px-3"}`}>
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={isActive(item.href)}
            collapsed={collapsed}
            disabled={!item.href}
            onClick={() => item.href && navigate(item.href)}
          />
        ))}
      </nav>

      {/* User + Logout */}
      <div className={`border-t border-border py-4 flex-shrink-0 ${collapsed ? "px-2" : "px-3"}`}>
        {!collapsed ? (
          <div className="flex items-center gap-3 px-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-primary">LS</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">Luciana Santana</p>
              <p className="text-xs text-muted-foreground truncate">Personal Trainer</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center mb-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">LS</span>
            </div>
          </div>
        )}
        <button
          className={`
            w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl
            text-sm text-muted-foreground hover:text-foreground hover:bg-muted
            transition-colors cursor-pointer min-h-0 select-none
            ${collapsed ? "justify-center px-2" : ""}
          `}
          title={collapsed ? "Sair" : undefined}
        >
          <LogOut className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={1.75} />
          {!collapsed && <span>Sair</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onToggleCollapse}
        className="
          absolute -right-3 top-[5.5rem]
          w-6 h-6 rounded-full
          bg-white border border-border shadow-sm
          flex items-center justify-center
          text-muted-foreground hover:text-foreground
          transition-all duration-200 hover:shadow-md
          cursor-pointer z-10 min-h-0
        "
        aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
      >
        <ChevronLeft
          className={`w-3.5 h-3.5 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </button>
    </aside>
  );
}
