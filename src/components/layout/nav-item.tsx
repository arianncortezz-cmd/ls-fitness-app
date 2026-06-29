import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  label: string;
  active: boolean;
  collapsed: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export function NavItem({ icon: Icon, label, active, collapsed, disabled = false, onClick }: Props) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      title={collapsed ? label : undefined}
      className={`
        w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
        transition-all duration-150 text-left min-h-0 select-none
        ${collapsed ? "justify-center px-2" : ""}
        ${active
          ? "bg-primary text-white shadow-brand"
          : disabled
            ? "text-muted-foreground/40 cursor-not-allowed"
            : "text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
        }
      `}
    >
      <Icon
        className={`flex-shrink-0 ${collapsed ? "w-5 h-5" : "w-[18px] h-[18px]"}`}
        strokeWidth={active ? 2 : 1.75}
      />
      {!collapsed && (
        <span className="truncate leading-none">{label}</span>
      )}
    </button>
  );
}
