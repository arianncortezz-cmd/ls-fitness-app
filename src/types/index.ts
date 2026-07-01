export type { Student, StudentStatus, StudentPlan } from "@/data/students";
export type { Exercise, Workout } from "@/data/workouts";

// ─── Biblioteca ───────────────────────────────────────────────────────────────

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

// ─── Progresso Físico ─────────────────────────────────────────────────────────

export type Medidas = {
  cintura:       string;
  quadril:       string;
  bracoDireito:  string;
  bracoEsquerdo: string;
  coxaDireita:   string;
  coxaEsquerda:  string;
};

export type Avaliacao = {
  id:          string;
  studentId:   string;
  data:        string;
  peso:        string;
  altura:      string;
  imc:         string;
  medidas:     Medidas;
  observacoes: string;
};

// ─── Agenda ───────────────────────────────────────────────────────────────────

export type EventoTipo = "treino" | "avaliacao" | "lembrete";

export type Evento = {
  id:             string;
  titulo:         string;
  tipo:           EventoTipo;
  studentId:      string;
  data:           string;
  horarioInicio:  string;
  horarioFim:     string;
  observacoes:    string;
};

// ─── Financeiro ───────────────────────────────────────────────────────────────

export type PagamentoStatus = "pago" | "pendente" | "atrasado";

export type Pagamento = {
  id:             string;
  studentId:      string;
  mes:            string;  // "YYYY-MM"
  valor:          number;
  status:         PagamentoStatus;
  dataPagamento:  string;
  observacoes:    string;
};