import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { Workout } from "@/types";

// ─── Context shape ────────────────────────────────────────────────────────────

type WorkoutsContextValue = {
  workouts: Workout[];
  addWorkout: (data: Omit<Workout, "id" | "criadoEm">) => void;
  updateWorkout: (id: string, data: Partial<Workout>) => void;
  deleteWorkout: (id: string) => void;
  getWorkoutsByStudent: (studentId: string) => Workout[];
};

const WorkoutsContext = createContext<WorkoutsContextValue | null>(null);

// ─── Dados mockados para desenvolvimento ─────────────────────────────────────

const MOCK_WORKOUTS: Workout[] = [
  {
    id: "w1",
    nome: "Treino A — Peito e Tríceps",
    divisao: "A",
    tipo: "Hipertrofia",
    studentId: "1",
    criadoEm: "01/06/2025",
    exercicios: [
      { id: "e1", nome: "Supino Reto", series: 4, repeticoes: "10-12", descanso: "90s", observacoes: "Pegada na largura dos ombros" },
      { id: "e2", nome: "Crucifixo Inclinado", series: 3, repeticoes: "12-15", descanso: "60s", observacoes: "" },
      { id: "e3", nome: "Tríceps Corda", series: 3, repeticoes: "15", descanso: "60s", observacoes: "Cotovelos fixos" },
    ],
  },
  {
    id: "w2",
    nome: "Treino B — Costas e Bíceps",
    divisao: "B",
    tipo: "Hipertrofia",
    studentId: "1",
    criadoEm: "01/06/2025",
    exercicios: [
      { id: "e4", nome: "Puxada Frontal", series: 4, repeticoes: "10-12", descanso: "90s", observacoes: "" },
      { id: "e5", nome: "Remada Curvada", series: 3, repeticoes: "10-12", descanso: "90s", observacoes: "Costas retas" },
      { id: "e6", nome: "Rosca Direta", series: 3, repeticoes: "12", descanso: "60s", observacoes: "" },
    ],
  },
];

// ─── Provider ─────────────────────────────────────────────────────────────────

export function WorkoutsProvider({ children }: { children: ReactNode }) {
  const [workouts, setWorkouts] = useState<Workout[]>(MOCK_WORKOUTS);

  const addWorkout = (data: Omit<Workout, "id" | "criadoEm">) => {
    const newWorkout: Workout = {
      ...data,
      id: String(Date.now()),
      criadoEm: new Date().toLocaleDateString("pt-BR"),
    };
    setWorkouts((prev) => [newWorkout, ...prev]);
  };

  const updateWorkout = (id: string, data: Partial<Workout>) => {
    setWorkouts((prev) =>
      prev.map((w) => (w.id === id ? { ...w, ...data } : w))
    );
  };

  const deleteWorkout = (id: string) => {
    setWorkouts((prev) => prev.filter((w) => w.id !== id));
  };

  const getWorkoutsByStudent = (studentId: string) =>
    workouts.filter((w) => w.studentId === studentId);

  return (
    <WorkoutsContext.Provider
      value={{ workouts, addWorkout, updateWorkout, deleteWorkout, getWorkoutsByStudent }}
    >
      {children}
    </WorkoutsContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useWorkouts(): WorkoutsContextValue {
  const ctx = useContext(WorkoutsContext);
  if (!ctx) throw new Error("useWorkouts must be used inside WorkoutsProvider");
  return ctx;
}
