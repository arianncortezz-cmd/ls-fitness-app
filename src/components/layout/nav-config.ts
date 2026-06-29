import {
  LayoutDashboard,
  Users,
  Dumbbell,
  BookOpen,
  TrendingUp,
  CalendarDays,
  Wallet,
  MessageCircle,
  Settings,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  icon: LucideIcon;
  label: string;
  href: string | null;
};

export const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard",    href: "/personal-dashboard" },
  { icon: Users,           label: "Alunos",       href: "/students" },
  { icon: Dumbbell,        label: "Treinos",      href: null },
  { icon: BookOpen,        label: "Biblioteca",   href: null },
  { icon: TrendingUp,      label: "Evolução",     href: null },
  { icon: CalendarDays,    label: "Agenda",       href: null },
  { icon: Wallet,          label: "Financeiro",   href: null },
  { icon: MessageCircle,   label: "Mensagens",    href: null },
  { icon: Settings,        label: "Configurações",href: null },
];

export type BreadcrumbItem = { label: string; href?: string };

export function getBreadcrumbs(location: string): BreadcrumbItem[] {
  const dash: BreadcrumbItem = { label: "Dashboard", href: "/personal-dashboard" };
  const alunos: BreadcrumbItem = { label: "Alunos", href: "/students" };

  if (location === "/personal-dashboard") return [{ label: "Dashboard" }];
  if (location === "/students")           return [dash, { label: "Alunos" }];
  if (location === "/students/new")       return [dash, alunos, { label: "Nova Aluna" }];

  const editMatch = location.match(/^\/students\/([^/]+)\/edit$/);
  if (editMatch)
    return [dash, alunos, { label: "Perfil", href: `/students/${editMatch[1]}` }, { label: "Editar" }];

  const profileMatch = location.match(/^\/students\/[^/]+$/);
  if (profileMatch) return [dash, alunos, { label: "Perfil" }];

  return [{ label: "Dashboard" }];
}
