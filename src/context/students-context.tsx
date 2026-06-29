/**
 * StudentsContext — in-memory student store.
 *
 * Architecture note: this is deliberately structured so Supabase can replace
 * the local state with minimal changes:
 *  - swap useState(initialStudents) for a useQuery/useSWR that fetches rows
 *  - swap addStudent's setState for an insert() call that then refetches
 *  - updateStudent / archiveStudent follow the same pattern
 *
 * The context shape and hook API stay identical either way.
 */

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { students as initialStudents } from "@/data/students";
import type { Student, StudentStatus, StudentPlan } from "@/data/students";

// ─── Form data type (source of truth, shared with form pages) ────────────────

export type StudentFormData = {
  nome: string;
  username: string;
  telefone: string;
  email: string;
  nascimento: string;
  sexo: string;
  objetivos: string[];
  plano: string;          // StudentPlan value
  status: string;         // StudentStatus value
  observacoesMedicas: string;
  parq: string;
  alergias: string;
  lesoes: string;
  medicamentos: string;
  observacoes: string;
};

// ─── Context shape ───────────────────────────────────────────────────────────

type StudentsContextValue = {
  students: Student[];
  addStudent: (data: StudentFormData) => void;
  // Reserved for future Supabase integration:
  // updateStudent: (id: string, data: Partial<StudentFormData>) => void;
  // archiveStudent: (id: string) => void;
  // deleteStudent: (id: string) => void;
};

const StudentsContext = createContext<StudentsContextValue | null>(null);

// ─── Helpers ─────────────────────────────────────────────────────────────────

const AVATAR_PALETTE = [
  { bg: "bg-rose-100",    text: "text-rose-600" },
  { bg: "bg-violet-100",  text: "text-violet-600" },
  { bg: "bg-emerald-100", text: "text-emerald-600" },
  { bg: "bg-amber-100",   text: "text-amber-600" },
  { bg: "bg-blue-100",    text: "text-blue-600" },
  { bg: "bg-pink-100",    text: "text-pink-600" },
  { bg: "bg-teal-100",    text: "text-teal-600" },
  { bg: "bg-indigo-100",  text: "text-indigo-600" },
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function todayBR(): string {
  return new Date().toLocaleDateString("pt-BR");
}

function formToStudent(data: StudentFormData, index: number): Student {
  const color = AVATAR_PALETTE[index % AVATAR_PALETTE.length];
  const goals = data.objetivos.length
    ? data.objetivos.join(", ")
    : "Sem objetivo definido";

  return {
    id:                   String(Date.now()),
    name:                 data.nome.trim(),
    username:             data.username.trim().startsWith("@")
                            ? data.username.trim()
                            : `@${data.username.trim()}`,
    phone:                data.telefone,
    birthDate:            data.nascimento,
    gender:               data.sexo,
    goals,
    plan:                 data.plano as StudentPlan,
    status:               data.status as StudentStatus,
    startDate:            todayBR(),
    lastAssessment:       todayBR(),
    medicalObservations:  data.observacoesMedicas || "Sem observações.",
    parq:                 data.parq || "Não respondido.",
    notes:                [
                            data.alergias  ? `Alergias: ${data.alergias}`      : "",
                            data.lesoes    ? `Lesões: ${data.lesoes}`           : "",
                            data.medicamentos ? `Medicamentos: ${data.medicamentos}` : "",
                            data.observacoes || "",
                          ].filter(Boolean).join(" · ") || "—",
    initials:             getInitials(data.nome),
    avatarBg:             color.bg,
    avatarText:           color.text,
  };
}

// ─── Provider ────────────────────────────────────────────────────────────────

export function StudentsProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>(initialStudents);

  const addStudent = (data: StudentFormData) => {
    const newStudent = formToStudent(data, students.length);
    setStudents((prev) => [newStudent, ...prev]);
  };

  return (
    <StudentsContext.Provider value={{ students, addStudent }}>
      {children}
    </StudentsContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useStudents(): StudentsContextValue {
  const ctx = useContext(StudentsContext);
  if (!ctx) throw new Error("useStudents must be used inside StudentsProvider");
  return ctx;
}
