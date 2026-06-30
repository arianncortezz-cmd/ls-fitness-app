import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { Plus, Trash2, Library } from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";
import { FormCard } from "@/components/forms/form-card";
import { FormField } from "@/components/forms/form-field";
import { useWorkouts } from "@/context/workouts-context";
import { useStudents } from "@/context/students-context";
import { useLibrary } from "@/context/library-context";
import { toast } from "sonner";
import type { Exercise } from "@/types";

function newExercise(): Exercise {
  return {
    id: String(Date.now() + Math.random()),
    nome: "",
    series: 3,
    repeticoes: "12",
    descanso: "60s",
    observacoes: "",
  };
}

type FormErrors = {
  nome: string;
  divisao: string;
  tipo: string;
  studentId: string;
};

function validate(form: {
  nome: string;
  divisao: string;
  tipo: string;
  studentId: string;
}): FormErrors {
  return {
    nome: !form.nome.trim() ? "Nome do treino é obrigatório." : "",
    divisao: !form.divisao.trim() ? "Divisão é obrigatória." : "",
    tipo: !form.tipo ? "Selecione o tipo de treino." : "",
    studentId: !form.studentId ? "Selecione uma aluna." : "",
  };
}

export default function NewWorkout() {
  const [, navigate] = useLocation();
  const params = useParams<{ id?: string }>();
  const preselectedStudentId = params.id ?? "";

  const { addWorkout } = useWorkouts();
  const { students } = useStudents();
  const { exercises: libraryExercises } = useLibrary();

  const preselectedStudent = students.find(
    (s) => s.id === preselectedStudentId,
  );

  const [form, setForm] = useState({
    nome: "",
    divisao: "",
    tipo: "",
    studentId: preselectedStudentId,
  });

  const [exercicios, setExercicios] = useState<Exercise[]>([newExercise()]);
  const [submitted, setSubmitted] = useState(false);

  // Controla, por exercício, se o seletor de Biblioteca está aberto
  const [openPickerFor, setOpenPickerFor] = useState<string | null>(null);

  const errors = validate(form);
  const hasErrors = Object.values(errors).some(Boolean);

  const set =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const setExercise = (
    index: number,
    field: keyof Exercise,
    value: string | number,
  ) => {
    setExercicios((prev) =>
      prev.map((ex, i) => (i === index ? { ...ex, [field]: value } : ex)),
    );
  };

  const addExercise = () => {
    setExercicios((prev) => [...prev, newExercise()]);
  };

  const removeExercise = (index: number) => {
    if (exercicios.length === 1) return;
    setExercicios((prev) => prev.filter((_, i) => i !== index));
  };

  // Preenche o exercício a partir de um item da Biblioteca
  const pickFromLibrary = (index: number, libraryId: string) => {
    const libEx = libraryExercises.find((e) => e.id === libraryId);
    if (!libEx) return;
    setExercicios((prev) =>
      prev.map((ex, i) => (i === index ? { ...ex, nome: libEx.nome } : ex)),
    );
    setOpenPickerFor(null);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (hasErrors) return;

    const exerciciosValidos = exercicios.filter((ex) => ex.nome.trim());
    if (exerciciosValidos.length === 0) {
      toast.error("Adicione pelo menos um exercício com nome.");
      return;
    }

    addWorkout({
      nome: form.nome.trim(),
      divisao: form.divisao.trim().toUpperCase(),
      tipo: form.tipo,
      studentId: form.studentId,
      exercicios: exerciciosValidos,
    });

    toast.success("Treino criado com sucesso.", {
      description: `${form.nome.trim()} foi adicionado.`,
    });

    if (preselectedStudentId) {
      navigate(`/students/${preselectedStudentId}/workouts`);
    } else {
      navigate("/workouts");
    }
  };

  const handleCancel = () => {
    if (preselectedStudentId) {
      navigate(`/students/${preselectedStudentId}/workouts`);
    } else {
      navigate("/workouts");
    }
  };

  return (
    <AppLayout>
      <div className="px-6 py-7 max-w-3xl mx-auto flex flex-col gap-6">
        <div className="animate-ls-slide-up">
          <h1 className="text-[1.375rem] font-bold text-foreground tracking-[-0.02em]">
            Novo Treino
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {preselectedStudent ? (
              <>
                Montando treino para <strong>{preselectedStudent.name}</strong>.
              </>
            ) : (
              "Monte o treino e vincule a uma aluna."
            )}
          </p>
        </div>

        <FormCard title="Informações do Treino">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <FormField
                label="Nome do Treino"
                id="nome"
                required
                error={errors.nome}
                showError={submitted && !!errors.nome}
              >
                <input
                  id="nome"
                  type="text"
                  placeholder="Ex: Treino A — Peito e Tríceps"
                  value={form.nome}
                  onChange={set("nome")}
                  className="ls-input"
                />
              </FormField>
            </div>
            <FormField
              label="Divisão"
              id="divisao"
              required
              error={errors.divisao}
              showError={submitted && !!errors.divisao}
            >
              <input
                id="divisao"
                type="text"
                placeholder="Ex: A, B, C"
                value={form.divisao}
                onChange={set("divisao")}
                className="ls-input"
              />
            </FormField>
            <FormField
              label="Tipo"
              id="tipo"
              required
              error={errors.tipo}
              showError={submitted && !!errors.tipo}
            >
              <select
                id="tipo"
                value={form.tipo}
                onChange={set("tipo")}
                className="ls-input"
              >
                <option value="">Selecione</option>
                <option>Hipertrofia</option>
                <option>Força</option>
                <option>Cardio</option>
                <option>Funcional</option>
                <option>Mobilidade</option>
                <option>Misto</option>
              </select>
            </FormField>

            <div className="sm:col-span-2">
              <FormField
                label="Aluna"
                id="studentId"
                required
                error={errors.studentId}
                showError={submitted && !!errors.studentId}
              >
                {preselectedStudent ? (
                  <div className="ls-input flex items-center bg-surface text-foreground font-medium cursor-not-allowed">
                    {preselectedStudent.name}
                  </div>
                ) : (
                  <select
                    id="studentId"
                    value={form.studentId}
                    onChange={set("studentId")}
                    className="ls-input"
                  >
                    <option value="">Selecione uma aluna</option>
                    {students
                      .filter((s) => s.status === "Ativa")
                      .map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                  </select>
                )}
              </FormField>
            </div>
          </div>
        </FormCard>

        <div
          className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden animate-ls-slide-up"
          style={{ animationDelay: "40ms" }}
        >
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Exercícios
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Adicione os exercícios do treino.
              </p>
            </div>
            <button
              onClick={addExercise}
              className="flex items-center gap-1.5 h-8 px-3 rounded-xl bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors cursor-pointer min-h-0"
            >
              <Plus className="w-3.5 h-3.5" strokeWidth={2} />
              Adicionar
            </button>
          </div>

          <div className="divide-y divide-border/60">
            {exercicios.map((ex, i) => (
              <div key={ex.id} className="p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary bg-primary/10 w-6 h-6 rounded-lg flex items-center justify-center">
                    {i + 1}
                  </span>
                  {exercicios.length > 1 && (
                    <button
                      onClick={() => removeExercise(i)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer min-h-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                    </button>
                  )}
                </div>

                {/* Nome + botão Biblioteca */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Nome do exercício (ex: Supino Reto)"
                      value={ex.nome}
                      onChange={(e) => setExercise(i, "nome", e.target.value)}
                      className="ls-input flex-1"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setOpenPickerFor(openPickerFor === ex.id ? null : ex.id)
                      }
                      title="Escolher da Biblioteca"
                      className="h-10 px-3 flex items-center gap-1.5 rounded-xl border border-border text-xs font-semibold text-foreground hover:bg-muted transition-colors cursor-pointer flex-shrink-0 min-h-0"
                    >
                      <Library className="w-3.5 h-3.5" strokeWidth={1.75} />
                      Biblioteca
                    </button>
                  </div>

                  {/* Seletor da Biblioteca (abre/fecha) */}
                  {openPickerFor === ex.id && (
                    <div className="rounded-xl border border-border bg-surface p-3 max-h-48 overflow-y-auto flex flex-col gap-1 animate-ls-slide-up">
                      {libraryExercises.length === 0 ? (
                        <p className="text-xs text-muted-foreground px-1 py-2">
                          Nenhum exercício cadastrado na Biblioteca ainda.
                        </p>
                      ) : (
                        libraryExercises.map((libEx) => (
                          <button
                            key={libEx.id}
                            type="button"
                            onClick={() => pickFromLibrary(i, libEx.id)}
                            className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-left hover:bg-white transition-colors cursor-pointer"
                          >
                            <span className="text-sm text-foreground font-medium">
                              {libEx.nome}
                            </span>
                            <span className="text-[10px] text-muted-foreground bg-white border border-border px-2 py-0.5 rounded-full flex-shrink-0">
                              {libEx.grupoMuscular}
                            </span>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-muted-foreground">
                      Séries
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={ex.series}
                      onChange={(e) =>
                        setExercise(i, "series", Number(e.target.value))
                      }
                      className="ls-input text-center"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-muted-foreground">
                      Repetições
                    </label>
                    <input
                      type="text"
                      placeholder="12 ou 8-12"
                      value={ex.repeticoes}
                      onChange={(e) =>
                        setExercise(i, "repeticoes", e.target.value)
                      }
                      className="ls-input text-center"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-muted-foreground">
                      Descanso
                    </label>
                    <input
                      type="text"
                      placeholder="60s"
                      value={ex.descanso}
                      onChange={(e) =>
                        setExercise(i, "descanso", e.target.value)
                      }
                      className="ls-input text-center"
                    />
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Observações (opcional)"
                  value={ex.observacoes}
                  onChange={(e) =>
                    setExercise(i, "observacoes", e.target.value)
                  }
                  className="ls-input"
                />
              </div>
            ))}
          </div>
        </div>

        {submitted && hasErrors && (
          <div className="bg-red-50 border border-red-200 rounded-2xl px-5 py-4 animate-ls-slide-up">
            <p className="text-sm font-semibold text-red-700">
              Verifique os campos obrigatórios:
            </p>
            <ul className="mt-1.5 flex flex-col gap-1">
              {Object.entries(errors)
                .filter(([, msg]) => msg)
                .map(([field, msg]) => (
                  <li
                    key={field}
                    className="text-xs text-red-600 flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    {msg}
                  </li>
                ))}
            </ul>
          </div>
        )}

        <div
          className="flex flex-col sm:flex-row gap-3 pb-8 animate-ls-slide-up"
          style={{ animationDelay: "80ms" }}
        >
          <button
            onClick={handleSubmit}
            className="sm:flex-1 h-12 rounded-xl bg-primary text-white text-sm font-semibold shadow-brand transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_8px_24px_-4px_hsla(338,78%,50%,0.40)] active:translate-y-0 cursor-pointer select-none"
          >
            Criar Treino
          </button>
          <button
            onClick={handleCancel}
            className="h-12 px-8 rounded-xl border border-border text-foreground text-sm font-semibold hover:bg-muted transition-colors cursor-pointer select-none"
          >
            Cancelar
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
