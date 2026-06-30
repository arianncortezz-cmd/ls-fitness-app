import { useParams, useLocation } from "wouter";
import { ArrowLeft, Plus, Dumbbell } from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";
import { useWorkouts } from "@/context/workouts-context";
import { useStudents } from "@/context/students-context";

export default function WorkoutsByStudent() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { getWorkoutsByStudent } = useWorkouts();
  const { students } = useStudents();

  const student = students.find((s) => s.id === id);
  const workouts = id ? getWorkoutsByStudent(id) : [];

  if (!student) {
    return (
      <AppLayout>
        <div className="px-6 py-7">
          <p className="text-muted-foreground">Aluna não encontrada.</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="px-6 py-7 max-w-3xl mx-auto flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-start justify-between gap-4 animate-ls-slide-up">
          <div className="flex items-start gap-3">
            <button
              onClick={() => navigate(`/students/${student.id}`)}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex-shrink-0 mt-0.5 cursor-pointer min-h-0"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
            </button>
            <div>
              <h1 className="text-[1.375rem] font-bold text-foreground tracking-[-0.02em]">Treinos de {student.name}</h1>
              <p className="text-sm text-muted-foreground mt-0.5">{workouts.length} {workouts.length === 1 ? "treino cadastrado" : "treinos cadastrados"}</p>
            </div>
          </div>
          <button
            onClick={() => navigate(`/students/${student.id}/workouts/new`)}
            className="flex items-center gap-1.5 h-9 px-4 flex-shrink-0 rounded-xl bg-primary text-white text-sm font-semibold shadow-brand transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_8px_20px_-4px_hsla(338,78%,50%,0.40)] active:translate-y-0 cursor-pointer select-none min-h-0"
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            Novo Treino
          </button>
        </div>

        {/* Lista */}
        {workouts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-border shadow-sm flex flex-col items-center gap-4 py-16 text-center animate-ls-slide-up">
            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Nenhum treino cadastrado ainda.</p>
              <p className="text-xs text-muted-foreground mt-1">Crie o primeiro treino para {student.name}.</p>
            </div>
            <button
              onClick={() => navigate(`/students/${student.id}/workouts/new`)}
              className="h-9 px-5 rounded-xl bg-primary text-white text-sm font-semibold shadow-brand hover:-translate-y-[1px] transition-all duration-200 cursor-pointer select-none min-h-0"
            >
              Criar primeiro treino
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {workouts.map((workout, i) => (
              <button
                key={workout.id}
                onClick={() => navigate(`/workouts/${workout.id}`)}
                className="bg-white rounded-2xl border border-border shadow-sm p-5 flex flex-col gap-3 text-left hover:border-primary/30 hover:shadow-md transition-all duration-200 animate-ls-slide-up cursor-pointer"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Dumbbell className="w-5 h-5 text-primary" strokeWidth={1.75} />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-surface border border-border text-muted-foreground">
                    Divisão {workout.divisao}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground leading-snug">{workout.nome}</p>
                  <p className="text-xs text-muted-foreground mt-1">{workout.tipo}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border/60">
                  <span className="text-xs text-muted-foreground">{workout.exercicios.length} exercícios</span>
                  <span className="text-xs text-muted-foreground">{workout.criadoEm}</span>
                </div>
              </button>
            ))}
          </div>
        )}

      </div>
    </AppLayout>
  );
}
