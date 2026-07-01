import { useState } from "react";
import { useLocation } from "wouter";
import { AppLayout } from "@/components/layout/app-layout";
import { FormCard } from "@/components/forms/form-card";
import { FormField } from "@/components/forms/form-field";
import { useSchedule } from "@/context/schedule-context";
import { useStudents } from "@/context/students-context";
import { toast } from "sonner";
import type { EventoTipo } from "@/types";

type FormErrors = {
  titulo: string;
  data: string;
  horarioInicio: string;
  horarioFim: string;
};

function validate(form: {
  titulo: string;
  data: string;
  horarioInicio: string;
  horarioFim: string;
}): FormErrors {
  return {
    titulo: !form.titulo.trim() ? "Título é obrigatório." : "",
    data: !form.data ? "Data é obrigatória." : "",
    horarioInicio: !form.horarioInicio
      ? "Horário de início é obrigatório."
      : "",
    horarioFim: !form.horarioFim ? "Horário de fim é obrigatório." : "",
  };
}

export default function NewScheduleEvent() {
  const [, navigate] = useLocation();
  const { addEvento } = useSchedule();
  const { students } = useStudents();

  const [form, setForm] = useState({
    titulo: "",
    tipo: "treino" as EventoTipo,
    studentId: "",
    data: new Date().toISOString().split("T")[0],
    horarioInicio: "",
    horarioFim: "",
    observacoes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const errors = validate(form);
  const hasErrors = Object.values(errors).some(Boolean);

  const set =
    (field: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = () => {
    setSubmitted(true);
    if (hasErrors) return;

    addEvento({
      titulo: form.titulo.trim(),
      tipo: form.tipo,
      studentId: form.studentId,
      data: form.data,
      horarioInicio: form.horarioInicio,
      horarioFim: form.horarioFim,
      observacoes: form.observacoes.trim(),
    });

    toast.success("Evento adicionado à agenda.");
    navigate("/schedule");
  };

  return (
    <AppLayout>
      <div className="px-6 py-7 max-w-2xl mx-auto flex flex-col gap-6">
        <div className="animate-ls-slide-up">
          <h1 className="text-[1.375rem] font-bold text-foreground tracking-[-0.02em]">
            Novo Evento
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Adicione um compromisso à sua agenda.
          </p>
        </div>

        <FormCard title="Informações do Evento">
          <FormField
            label="Título"
            id="titulo"
            required
            error={errors.titulo}
            showError={submitted && !!errors.titulo}
          >
            <input
              id="titulo"
              type="text"
              placeholder="Ex: Treino — Ana Clara"
              value={form.titulo}
              onChange={set("titulo")}
              className="ls-input"
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Tipo" id="tipo">
              <select
                id="tipo"
                value={form.tipo}
                onChange={set("tipo")}
                className="ls-input"
              >
                <option value="treino">Treino</option>
                <option value="avaliacao">Avaliação</option>
                <option value="lembrete">Lembrete</option>
              </select>
            </FormField>
            <FormField label="Aluna" id="studentId">
              <select
                id="studentId"
                value={form.studentId}
                onChange={set("studentId")}
                className="ls-input"
              >
                <option value="">Nenhuma (opcional)</option>
                {students
                  .filter((s) => s.status === "Ativa")
                  .map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
              </select>
            </FormField>
          </div>
        </FormCard>

        <FormCard title="Data e Horário">
          <FormField
            label="Data"
            id="data"
            required
            error={errors.data}
            showError={submitted && !!errors.data}
          >
            <input
              id="data"
              type="date"
              value={form.data}
              onChange={set("data")}
              className="ls-input"
            />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Início"
              id="horarioInicio"
              required
              error={errors.horarioInicio}
              showError={submitted && !!errors.horarioInicio}
            >
              <input
                id="horarioInicio"
                type="time"
                value={form.horarioInicio}
                onChange={set("horarioInicio")}
                className="ls-input"
              />
            </FormField>
            <FormField
              label="Fim"
              id="horarioFim"
              required
              error={errors.horarioFim}
              showError={submitted && !!errors.horarioFim}
            >
              <input
                id="horarioFim"
                type="time"
                value={form.horarioFim}
                onChange={set("horarioFim")}
                className="ls-input"
              />
            </FormField>
          </div>
        </FormCard>

        <FormCard title="Observações" subtitle="Opcional.">
          <textarea
            placeholder="Notas sobre o evento..."
            value={form.observacoes}
            onChange={set("observacoes")}
            className="ls-input resize-none h-24"
          />
        </FormCard>

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

        <div className="flex flex-col sm:flex-row gap-3 pb-8 animate-ls-slide-up">
          <button
            onClick={handleSubmit}
            className="sm:flex-1 h-12 rounded-xl bg-primary text-white text-sm font-semibold shadow-brand transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_8px_24px_-4px_hsla(338,78%,50%,0.40)] active:translate-y-0 cursor-pointer select-none"
          >
            Adicionar à Agenda
          </button>
          <button
            onClick={() => navigate("/schedule")}
            className="h-12 px-8 rounded-xl border border-border text-foreground text-sm font-semibold hover:bg-muted transition-colors cursor-pointer select-none"
          >
            Cancelar
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
