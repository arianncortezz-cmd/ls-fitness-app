// ─── Exercício dentro de um treino ───────────────────────────────────────────

export type Exercise = {
  id: string;
  nome: string;
  series: number;
  repeticoes: string;  // ex: "12", "8-12", "até a falha"
  descanso: string;    // ex: "60s", "90s"
  observacoes: string;
};

// ─── Treino ───────────────────────────────────────────────────────────────────

export type Workout = {
  id: string;
  nome: string;
  divisao: string;     // ex: "A", "B", "C"
  tipo: string;        // ex: "Hipertrofia", "Força", "Cardio"
  studentId: string;
  criadoEm: string;
  exercicios: Exercise[];
};

// ─── Seed data ────────────────────────────────────────────────────────────────

export const workouts: Workout[] = [
  {
    id: "w1",
    nome: "Treino A — Peito e Tríceps",
    divisao: "A",
    tipo: "Hipertrofia",
    studentId: "2",
    criadoEm: "10/06/2025",
    exercicios: [
      { id: "e1", nome: "Supino reto com barra", series: 4, repeticoes: "8-10", descanso: "90s", observacoes: "Atenção à posição da escápula." },
      { id: "e2", nome: "Supino inclinado com halteres", series: 3, repeticoes: "10-12", descanso: "75s", observacoes: "" },
      { id: "e3", nome: "Crossover na polia", series: 3, repeticoes: "12-15", descanso: "60s", observacoes: "Manter o cotovelo levemente flexionado." },
      { id: "e4", nome: "Tríceps corda na polia", series: 4, repeticoes: "12", descanso: "60s", observacoes: "" },
      { id: "e5", nome: "Tríceps testa com barra W", series: 3, repeticoes: "10-12", descanso: "60s", observacoes: "Cuidado com o cotovelo." },
    ],
  },
  {
    id: "w2",
    nome: "Treino B — Costas e Bíceps",
    divisao: "B",
    tipo: "Hipertrofia",
    studentId: "2",
    criadoEm: "10/06/2025",
    exercicios: [
      { id: "e6", nome: "Puxada frontal no pulley", series: 4, repeticoes: "10-12", descanso: "75s", observacoes: "Evitar hiperextensão lombar." },
      { id: "e7", nome: "Remada curvada com barra", series: 4, repeticoes: "8-10", descanso: "90s", observacoes: "Manter coluna neutra." },
      { id: "e8", nome: "Remada unilateral com haltere", series: 3, repeticoes: "12", descanso: "60s", observacoes: "" },
      { id: "e9", nome: "Rosca direta com barra", series: 3, repeticoes: "10-12", descanso: "60s", observacoes: "" },
      { id: "e10", nome: "Rosca martelo", series: 3, repeticoes: "12", descanso: "60s", observacoes: "Alternado." },
    ],
  },
  {
    id: "w3",
    nome: "Treino A — Condicionamento",
    divisao: "A",
    tipo: "Cardio",
    studentId: "1",
    criadoEm: "15/06/2025",
    exercicios: [
      { id: "e11", nome: "Esteira (caminhada inclinada)", series: 1, repeticoes: "20 min", descanso: "—", observacoes: "Inclinação 8%, velocidade 5 km/h." },
      { id: "e12", nome: "Agachamento livre", series: 3, repeticoes: "15", descanso: "60s", observacoes: "Foco na técnica, sem carga extra por enquanto." },
      { id: "e13", nome: "Afundo alternado", series: 3, repeticoes: "12 cada", descanso: "60s", observacoes: "" },
      { id: "e14", nome: "Prancha isométrica", series: 3, repeticoes: "30s", descanso: "45s", observacoes: "" },
    ],
  },
];
