import {
  Users,
  Dumbbell,
  CalendarDays,
  Wallet,
  MessageCircle,
  Settings,
} from "lucide-react";
import { useLocation } from "wouter";
import { AppLayout } from "@/components/layout/app-layout";

const cards = [
  {
    icon: Users,
    title: "Alunos",
    description: "Gerencie sua cartela de alunos",
    color: "text-blue-500",
    bg: "bg-blue-50",
    href: "/students",
  },
  {
    icon: Dumbbell,
    title: "Treinos",
    description: "Crie e organize planos de treino",
    color: "text-violet-500",
    bg: "bg-violet-50",
    href: null,
  },
  {
    icon: CalendarDays,
    title: "Agenda",
    description: "Visualize seus horários e sessões",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    href: null,
  },
  {
    icon: Wallet,
    title: "Financeiro",
    description: "Acompanhe pagamentos e receitas",
    color: "text-amber-500",
    bg: "bg-amber-50",
    href: null,
  },
  {
    icon: MessageCircle,
    title: "Mensagens",
    description: "Converse com seus alunos",
    color: "text-primary",
    bg: "bg-primary/8",
    href: null,
  },
  {
    icon: Settings,
    title: "Configurações",
    description: "Personalize o seu perfil",
    color: "text-slate-500",
    bg: "bg-slate-100",
    href: null,
  },
] as const;

export default function PersonalDashboard() {
  const [, navigate] = useLocation();

  return (
    <AppLayout>
      <div className="px-6 py-7 max-w-3xl mx-auto flex flex-col gap-6">
        <div className="animate-ls-slide-up">
          <h1 className="text-[1.375rem] font-bold text-foreground tracking-[-0.02em]">
            Olá, Luciana! 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            O que você deseja fazer hoje?
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3">
          {cards.map(({ icon: Icon, title, description, color, bg, href }, i) => (
            <div
              key={title}
              onClick={() => href && navigate(href)}
              className={`
                bg-white rounded-2xl border border-border p-5
                flex flex-col gap-4 shadow-sm
                transition-all duration-200 ease-out
                hover:-translate-y-[2px] hover:shadow-md hover:border-border/60
                active:translate-y-0 active:shadow-sm
                animate-ls-slide-up
                ${href ? "cursor-pointer" : "cursor-default opacity-60"}
              `}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${color}`} strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-[0.9375rem] font-semibold text-foreground leading-tight">{title}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
