import { useParams, useLocation } from "wouter";
import { ArrowLeft, Dumbbell, Pencil } from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";
import { useWorkouts } from "@/context/workouts-context";
import { useStudents } from "@/context/students-context";

export default function WorkoutView() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { workouts } = useWorkouts();
  const { students } = useStudents();

  const workout = workouts.find((w) => w.id === id);

  if (!workout) {
    return (
      <AppLayout>
        <div className="px-6 py-7">
          <p className="text-muted-foreground">Treino não encontrado.</p>
        </div>
      </AppLayout>
    );
  }

  const student = students.find((s) => s.id === workout.studentId);

  return (
    <AppLayout>
      <div className="px-6 py-7 max-w-2xl mx-auto flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-start justify-between gap-4 animate-ls-slide-up">
          <div className="flex items-start gap-3">
            <button
              onClick={() => navigate("/workouts")}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex-shrink-0 mt-0.5 cursor-pointer min-h-0"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
            </button>
            <div>
              <h1 className="text-[1.375rem] font-bold text-foreground tracking-[-0.02em]">{workout.nome}</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {student?.name ?? "Aluna não encontrada"} · Divisão {workout.divisao} · {workout.tipo}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate(`/workouts/${workout.id}/edit`)}
            className="flex items-center gap-2 h-9 px-4 flex-shrink-0 rounded-xl border border-border text-foreground text-sm font-semibold hover:bg-muted transition-colors cursor-pointer select-none min-h-0"
          >
            <Pencil className="w-3.5 h-3.5" strokeWidth={1.75} />
            Editar
          </button>
        </div>

        {/* Exercícios */}
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden animate-ls-slide-up" style={{ animationDelay: "40ms" }}>
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Exercícios</h2>
            <span className="text-xs text-muted-foreground">{workout.exercicios.length} exercícios</span>
          </div>

          {workout.exercicios.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <Dumbbell className="w-8 h-8 text-muted-foreground" strokeWidth={1.5} />
              <p className="text-sm text-muted-foreground">Nenhum exercício adicionado.</p>
            </div>
          ) : (
            <div className="divide-y divide-border/60">
              {workout.exercicios.map((ex, i) => (
                <div key={ex.id} className="px-5 py-4 flex items-start gap-4">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">{i + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{ex.nome}</p>
                    <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                      <span className="text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">{ex.series}</span> séries
                      </span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">{ex.repeticoes}</span> reps
                      </span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">
                        Descanso: <span className="font-medium text-foreground">{ex.descanso}</span>
                      </span>
                    </div>
                    {ex.observacoes && (
                      <p className="text-xs text-muted-foreground mt-1.5 italic">{ex.observacoes}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="bg-white rounded-2xl border border-border shadow-sm p-5 animate-ls-slide-up" style={{ animationDelay: "80ms" }}>
          <h2 className="text-sm font-semibold text-foreground mb-3">Informações</h2>
          <div className="flex flex-col gap-2.5">
            {[
              { label: "Aluna",     value: student?.name ?? "—" },
              { label: "Divisão",   value: `Treino ${workout.divisao}` },
              { label: "Tipo",      value: workout.tipo },
              { label: "Criado em", value: workout.criadoEm },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{label}</span>
                <span className="text-xs font-medium text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pb-8" />
      </div>
    </AppLayout>
  );
}
