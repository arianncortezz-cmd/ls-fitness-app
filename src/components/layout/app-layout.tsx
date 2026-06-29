import { useState } from "react";
import type { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { AppHeader } from "./app-header";
import { MobileMenu } from "./mobile-menu";

type Props = { children: ReactNode };

export function AppLayout({ children }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-surface">
      {/* Desktop sidebar */}
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
      />

      {/* Mobile slide-over */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Main content column */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <AppHeader onOpenMobileMenu={() => setMobileOpen(true)} />

        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto animate-ls-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
