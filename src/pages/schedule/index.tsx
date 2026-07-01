import { useState } from "react";
import { useLocation } from "wouter";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  TrendingUp,
  Bell,
  Trash2,
} from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";
import { useSchedule } from "@/context/schedule-context";
import { useStudents } from "@/context/students-context";
import type { EventoTipo } from "@/types";

function formatDateBR(date: Date): string {
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function toInputDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function TipoBadge({ tipo }: { tipo: EventoTipo }) {
  const config: Record<
    EventoTipo,
    { label: string; style: string; icon: React.ElementType }
  > = {
    treino: {
      label: "Treino",
      style: "bg-primary/10 text-primary border-primary/20",
      icon: Dumbbell,
    },
    avaliacao: {
      label: "Avaliação",
      style: "bg-violet-50 text-violet-700 border-violet-200",
      icon: TrendingUp,
    },
    lembrete: {
      label: "Lembrete",
      style: "bg-amber-50 text-amber-700 border-amber-200",
      icon: Bell,
    },
  };
  const { label, style, icon: Icon } = config[tipo];
  return (
    <span className={`ls-badge border flex items-center gap-1 ${style}`}>
      <Icon className="w-3 h-3" strokeWidth={1.75} />
      {label}
    </span>
  );
}

export default function Schedule() {
  const [, navigate] = useLocation();
  const { getEventosByDate, deleteEvento } = useSchedule();
  const { students } = useStudents();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const dateKey = toInputDate(selectedDate);
  const eventos = getEventosByDate(dateKey);

  const getStudentName = (studentId: string) =>
    studentId ? (students.find((s) => s.id === studentId)?.name ?? "") : "";

  return (
    <AppLayout>
      <div className="px-6 py-7 max-w-2xl mx-auto flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4 animate-ls-slide-up">
          <div>
            <h1 className="text-[1.375rem] font-bold text-foreground tracking-[-0.02em]">
              Agenda
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Gerencie seus compromissos e sessões.
            </p>
          </div>
          <button
            onClick={() => navigate("/schedule/new")}
            className="flex items-center gap-1.5 h-9 px-4 flex-shrink-0 rounded-xl bg-primary text-white text-sm font-semibold shadow-brand transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_8px_20px_-4px_hsla(338,78%,50%,0.40)] active:translate-y-0 cursor-pointer select-none min-h-0"
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            Novo Evento
          </button>
        </div>

        <div
          className="bg-white rounded-2xl border border-border shadow-sm p-4 flex items-center justify-between gap-4 animate-ls-slide-up"
          style={{ animationDelay: "30ms" }}
        >
          <button
            onClick={() => setSelectedDate((d) => addDays(d, -1))}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer min-h-0"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={1.75} />
          </button>
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm font-bold text-foreground capitalize">
              {formatDateBR(selectedDate)}
            </p>
            <button
              onClick={() => setSelectedDate(new Date())}
              className="text-xs text-primary font-medium hover:underline cursor-pointer"
            >
              Hoje
            </button>
          </div>
          <button
            onClick={() => setSelectedDate((d) => addDays(d, 1))}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer min-h-0"
          >
            <ChevronRight className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>

        {eventos.length === 0 ? (
          <div className="bg-white rounded-2xl border border-border shadow-sm flex flex-col items-center gap-4 py-16 text-center animate-ls-slide-up">
            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
              <Bell
                className="w-6 h-6 text-muted-foreground"
                strokeWidth={1.5}
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Nenhum evento neste dia.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Adicione um treino, avaliação ou lembrete.
              </p>
            </div>
            <button
              onClick={() => navigate("/schedule/new")}
              className="h-9 px-5 rounded-xl bg-primary text-white text-sm font-semibold shadow-brand hover:-translate-y-[1px] transition-all duration-200 cursor-pointer select-none min-h-0"
            >
              Adicionar evento
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {eventos.map((ev, i) => (
              <div
                key={ev.id}
                className="bg-white rounded-2xl border border-border shadow-sm p-4 flex items-start gap-4 animate-ls-slide-up"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="flex flex-col items-center gap-0.5 flex-shrink-0 w-14 pt-0.5">
                  <span className="text-sm font-bold text-foreground">
                    {ev.horarioInicio}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {ev.horarioFim}
                  </span>
                </div>
                <div className="w-px self-stretch bg-border flex-shrink-0" />
                <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                  <p className="text-sm font-semibold text-foreground leading-snug">
                    {ev.titulo}
                  </p>
                  {ev.studentId && (
                    <p className="text-xs text-muted-foreground">
                      {getStudentName(ev.studentId)}
                    </p>
                  )}
                  <TipoBadge tipo={ev.tipo} />
                  {ev.observacoes && (
                    <p className="text-xs text-muted-foreground italic mt-0.5">
                      {ev.observacoes}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => deleteEvento(ev.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer flex-shrink-0 min-h-0"
                >
                  <Trash2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
