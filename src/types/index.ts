export type { Student, StudentStatus, StudentPlan } from "@/data/students";
export type { Exercise, Workout } from "@/data/workouts";
export type LibraryExerciseType = "oficial" | "personalizado";

export type LibraryExercise = {
  id: string;
  nome: string;
  grupoMuscular: string;
  equipamento: string;
  midiaUrl: string;
  tipo: LibraryExerciseType;
  criadoPor: string;
  criadoEm: string;
};
