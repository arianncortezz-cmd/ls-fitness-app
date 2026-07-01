import { createContext, useContext, useState, type ReactNode } from "react";
import type { Evento, EventoTipo } from "@/types";

// ─── Context shape ────────────────────────────────────────────────────────────

type ScheduleContextValue = {
  eventos: Evento[];
  addEvento: (data: Omit<Evento, "id">) => void;
  deleteEvento: (id: string) => void;
  getEventosByDate: (date: string) => Evento[];
};

const ScheduleContext = createContext<ScheduleContextValue | null>(null);

// ─── Dados mockados ───────────────────────────────────────────────────────────

const hoje = new Date().toISOString().split("T")[0];

const MOCK_EVENTOS: Evento[] = [
  {
    id: "ev1",
    titulo: "Treino — Ana Clara",
    tipo: "treino",
    studentId: "1",
    data: hoje,
    horarioInicio: "08:00",
    horarioFim: "09:00",
    observacoes: "",
  },
  {
    id: "ev2",
    titulo: "Avaliação — Ana Clara",
    tipo: "avaliacao",
    studentId: "1",
    data: hoje,
    horarioInicio: "10:00",
    horarioFim: "10:30",
    observacoes: "Trazer ficha de anamnese.",
  },
  {
    id: "ev3",
    titulo: "Renovar contratos",
    tipo: "lembrete",
    studentId: "",
    data: hoje,
    horarioInicio: "12:00",
    horarioFim: "12:30",
    observacoes: "Verificar alunas com plano vencendo.",
  },
];

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ScheduleProvider({ children }: { children: ReactNode }) {
  const [eventos, setEventos] = useState<Evento[]>(MOCK_EVENTOS);

  const addEvento = (data: Omit<Evento, "id">) => {
    const newEvento: Evento = {
      ...data,
      id: String(Date.now()),
    };
    setEventos((prev) => [...prev, newEvento]);
  };

  const deleteEvento = (id: string) => {
    setEventos((prev) => prev.filter((ev) => ev.id !== id));
  };

  const getEventosByDate = (date: string) =>
    eventos
      .filter((ev) => ev.data === date)
      .sort((a, b) => a.horarioInicio.localeCompare(b.horarioInicio));

  return (
    <ScheduleContext.Provider
      value={{ eventos, addEvento, deleteEvento, getEventosByDate }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useSchedule(): ScheduleContextValue {
  const ctx = useContext(ScheduleContext);
  if (!ctx) throw new Error("useSchedule must be used inside ScheduleProvider");
  return ctx;
}
