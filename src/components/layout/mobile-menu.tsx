import { X, LogOut } from "lucide-react";
import { useLocation } from "wouter";
import { LsLogo } from "@/components/common/LsLogo";
import { NavItem } from "./nav-item";
import { navItems } from "./nav-config";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: Props) {
  const [location, navigate] = useLocation();

  const isActive = (href: string | null) => {
    if (!href) return false;
    if (href === "/personal-dashboard") return location === "/personal-dashboard";
    return location === href || location.startsWith(href + "/");
  };

  const handleNav = (href: string) => {
    navigate(href);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 z-40 bg-black/40 backdrop-blur-sm
          transition-opacity duration-300 lg:hidden
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div
        className={`
          fixed top-0 left-0 h-full w-[280px] z-50 bg-white shadow-2xl
          flex flex-col transition-transform duration-300 ease-out lg:hidden
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <LsLogo size={34} />
            <div>
              <p className="text-[0.9375rem] font-bold text-foreground tracking-[-0.02em]">LS Fitness</p>
              <p className="text-[0.6875rem] text-muted-foreground">Plataforma Personal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors min-h-0 cursor-pointer"
          >
            <X className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              active={isActive(item.href)}
              collapsed={false}
              disabled={!item.href}
              onClick={() => item.href && handleNav(item.href)}
            />
          ))}
        </nav>

        {/* User + Logout */}
        <div className="border-t border-border py-4 px-3 flex-shrink-0">
          <div className="flex items-center gap-3 px-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-primary">LS</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">Luciana Santana</p>
              <p className="text-xs text-muted-foreground truncate">Personal Trainer</p>
            </div>
          </div>
          <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer min-h-0 select-none">
            <LogOut className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={1.75} />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </>
  );
}
