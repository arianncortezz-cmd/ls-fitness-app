import { createContext, useContext, useState, type ReactNode } from "react";
import type { LibraryExercise } from "@/types";

// ─── Context shape ────────────────────────────────────────────────────────────

type LibraryContextValue = {
  exercises: LibraryExercise[];
  addExercise: (data: Omit<LibraryExercise, "id" | "criadoEm">) => void;
  updateExercise: (id: string, data: Partial<LibraryExercise>) => void;
  deleteExercise: (id: string) => void;
};

const LibraryContext = createContext<LibraryContextValue | null>(null);

// ─── Dados mockados (exercícios oficiais de exemplo) ─────────────────────────

const MOCK_LIBRARY: LibraryExercise[] = [
  {
    id: "lib1",
    nome: "Supino Reto",
    grupoMuscular: "Peito",
    equipamento: "Barra",
    midiaUrl: "",
    tipo: "oficial",
    criadoPor: "admin",
    criadoEm: "01/06/2025",
  },
  {
    id: "lib2",
    nome: "Agachamento Livre",
    grupoMuscular: "Pernas",
    equipamento: "Barra",
    midiaUrl: "",
    tipo: "oficial",
    criadoPor: "admin",
    criadoEm: "01/06/2025",
  },
  {
    id: "lib3",
    nome: "Puxada Frontal",
    grupoMuscular: "Costas",
    equipamento: "Polia",
    midiaUrl: "",
    tipo: "oficial",
    criadoPor: "admin",
    criadoEm: "01/06/2025",
  },
];

// ─── Provider ─────────────────────────────────────────────────────────────────

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [exercises, setExercises] = useState<LibraryExercise[]>(MOCK_LIBRARY);

  const addExercise = (data: Omit<LibraryExercise, "id" | "criadoEm">) => {
    const newExercise: LibraryExercise = {
      ...data,
      id: String(Date.now()),
      criadoEm: new Date().toLocaleDateString("pt-BR"),
    };
    setExercises((prev) => [newExercise, ...prev]);
  };

  const updateExercise = (id: string, data: Partial<LibraryExercise>) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, ...data } : ex)),
    );
  };

  const deleteExercise = (id: string) => {
    setExercises((prev) => prev.filter((ex) => ex.id !== id));
  };

  return (
    <LibraryContext.Provider
      value={{ exercises, addExercise, updateExercise, deleteExercise }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useLibrary(): LibraryContextValue {
  const ctx = useContext(LibraryContext);
  if (!ctx) throw new Error("useLibrary must be used inside LibraryProvider");
  return ctx;
}
