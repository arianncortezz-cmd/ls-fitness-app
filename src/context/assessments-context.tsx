import { createContext, useContext, useState, type ReactNode } from "react";
import type { Avaliacao, Medidas } from "@/types";

// ─── Context shape ────────────────────────────────────────────────────────────

type AssessmentsContextValue = {
  assessments: Avaliacao[];
  addAssessment: (data: Omit<Avaliacao, "id">) => void;
  getAssessmentsByStudent: (studentId: string) => Avaliacao[];
};

const AssessmentsContext = createContext<AssessmentsContextValue | null>(null);

// ─── Medidas em branco ────────────────────────────────────────────────────────

export const emptyMedidas: Medidas = {
  cintura: "",
  quadril: "",
  bracoDireito: "",
  bracoEsquerdo: "",
  coxaDireita: "",
  coxaEsquerda: "",
};

// ─── Dados mockados ───────────────────────────────────────────────────────────

const MOCK_ASSESSMENTS: Avaliacao[] = [
  {
    id: "a1",
    studentId: "1",
    data: "01/03/2025",
    peso: "68",
    altura: "165",
    imc: "24.98",
    medidas: {
      cintura: "72",
      quadril: "96",
      bracoDireito: "30",
      bracoEsquerdo: "29",
      coxaDireita: "54",
      coxaEsquerda: "53",
    },
    observacoes: "Primeira avaliação. Aluna bem disposta.",
  },
  {
    id: "a2",
    studentId: "1",
    data: "01/04/2025",
    peso: "66.5",
    altura: "165",
    imc: "24.44",
    medidas: {
      cintura: "70",
      quadril: "94",
      bracoDireito: "31",
      bracoEsquerdo: "30",
      coxaDireita: "53",
      coxaEsquerda: "52",
    },
    observacoes: "Boa evolução no primeiro mês.",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function calcIMC(peso: string, altura: string): string {
  const p = parseFloat(peso);
  const a = parseFloat(altura) / 100;
  if (!p || !a) return "";
  return (p / (a * a)).toFixed(2);
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AssessmentsProvider({ children }: { children: ReactNode }) {
  const [assessments, setAssessments] = useState<Avaliacao[]>(MOCK_ASSESSMENTS);

  const addAssessment = (data: Omit<Avaliacao, "id">) => {
    const imc = calcIMC(data.peso, data.altura);
    const newAssessment: Avaliacao = {
      ...data,
      imc,
      id: String(Date.now()),
    };
    setAssessments((prev) => [newAssessment, ...prev]);
  };

  const getAssessmentsByStudent = (studentId: string) =>
    assessments
      .filter((a) => a.studentId === studentId)
      .sort((a, b) => {
        // Ordena do mais recente para o mais antigo
        const [da, ma, ya] = a.data.split("/").map(Number);
        const [db, mb, yb] = b.data.split("/").map(Number);
        return (
          new Date(yb, mb - 1, db).getTime() -
          new Date(ya, ma - 1, da).getTime()
        );
      });

  return (
    <AssessmentsContext.Provider
      value={{ assessments, addAssessment, getAssessmentsByStudent }}
    >
      {children}
    </AssessmentsContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAssessments(): AssessmentsContextValue {
  const ctx = useContext(AssessmentsContext);
  if (!ctx)
    throw new Error("useAssessments must be used inside AssessmentsProvider");
  return ctx;
}
