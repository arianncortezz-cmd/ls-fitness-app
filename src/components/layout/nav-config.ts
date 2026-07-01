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
  { icon: LayoutDashboard, label: "Dashboard", href: "/personal-dashboard" },
  { icon: Users, label: "Alunos", href: "/students" },
  { icon: Dumbbell, label: "Treinos", href: "/workouts" },
  { icon: BookOpen, label: "Biblioteca", href: "/library" },
  { icon: TrendingUp, label: "Evolução", href: null },
  { icon: CalendarDays, label: "Agenda", href: "/schedule" },
  { icon: Wallet, label: "Financeiro", href: null },
  { icon: MessageCircle, label: "Mensagens", href: null },
  { icon: Settings, label: "Configurações", href: null },
];

export type BreadcrumbItem = { label: string; href?: string };

export function getBreadcrumbs(location: string): BreadcrumbItem[] {
  const dash: BreadcrumbItem = {
    label: "Dashboard",
    href: "/personal-dashboard",
  };
  const alunos: BreadcrumbItem = { label: "Alunos", href: "/students" };
  const treinos: BreadcrumbItem = { label: "Treinos", href: "/workouts" };
  const biblioteca: BreadcrumbItem = { label: "Biblioteca", href: "/library" };
  const agenda: BreadcrumbItem = { label: "Agenda", href: "/schedule" };

  if (location === "/personal-dashboard") return [{ label: "Dashboard" }];
  if (location === "/students") return [dash, { label: "Alunos" }];
  if (location === "/students/new")
    return [dash, alunos, { label: "Nova Aluna" }];
  if (location === "/workouts") return [dash, { label: "Treinos" }];
  if (location === "/workouts/new")
    return [dash, treinos, { label: "Novo Treino" }];
  if (location === "/library") return [dash, { label: "Biblioteca" }];
  if (location === "/library/new")
    return [dash, biblioteca, { label: "Novo Exercício" }];
  if (location === "/schedule") return [dash, { label: "Agenda" }];
  if (location === "/schedule/new")
    return [dash, agenda, { label: "Novo Evento" }];

  const editMatch = location.match(/^\/students\/([^/]+)\/edit$/);
  if (editMatch)
    return [
      dash,
      alunos,
      { label: "Perfil", href: `/students/${editMatch[1]}` },
      { label: "Editar" },
    ];

  const profileMatch = location.match(/^\/students\/([^/]+)$/);
  if (profileMatch) return [dash, alunos, { label: "Perfil" }];

  const workoutsMatch = location.match(/^\/students\/([^/]+)\/workouts$/);
  if (workoutsMatch)
    return [
      dash,
      alunos,
      { label: "Perfil", href: `/students/${workoutsMatch[1]}` },
      { label: "Treinos" },
    ];

  const newWorkoutMatch = location.match(
    /^\/students\/([^/]+)\/workouts\/new$/,
  );
  if (newWorkoutMatch)
    return [
      dash,
      alunos,
      { label: "Perfil", href: `/students/${newWorkoutMatch[1]}` },
      { label: "Novo Treino" },
    ];

  const assessmentsMatch = location.match(/^\/students\/([^/]+)\/assessments$/);
  if (assessmentsMatch)
    return [
      dash,
      alunos,
      { label: "Perfil", href: `/students/${assessmentsMatch[1]}` },
      { label: "Evolução" },
    ];

  const newAssessmentMatch = location.match(
    /^\/students\/([^/]+)\/assessments\/new$/,
  );
  if (newAssessmentMatch)
    return [
      dash,
      alunos,
      { label: "Perfil", href: `/students/${newAssessmentMatch[1]}` },
      { label: "Nova Avaliação" },
    ];

  const workoutMatch = location.match(/^\/workouts\/([^/]+)$/);
  if (workoutMatch) return [dash, treinos, { label: "Treino" }];

  return [{ label: "Dashboard" }];
}
