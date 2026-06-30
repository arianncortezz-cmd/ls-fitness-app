import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { AppLayout } from "@/components/layout/app-layout";
import { FormCard } from "@/components/forms/form-card";
import { FormField } from "@/components/forms/form-field";
import { useStudents } from "@/context/students-context";
import { useAssessments, emptyMedidas } from "@/context/assessments-context";
import { toast } from "sonner";
import type { Medidas } from "@/types";

function calcIMC(peso: string, altura: string): string {
  const p = parseFloat(peso);
  const a = parseFloat(altura) / 100;
  if (!p || !a) return "";
  return (p / (a * a)).toFixed(2);
}

export default function NewAssessment() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { students } = useStudents();
  const { addAssessment } = useAssessments();

  const student = students.find((s) => s.id === id);

  const [form, setForm] = useState({
    data: new Date().toISOString().split("T")[0],
    peso: "",
    altura: "",
    observacoes: "",
  });

  const [medidas, setMedidas] = useState<Medidas>(emptyMedidas);
  const [submitted, setSubmitted] = useState(false);

  const imc = calcIMC(form.peso, form.altura);

  const hasErrors = !form.peso.trim() || !form.altura.trim();

  const setField =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const setMedida =
    (field: keyof Medidas) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setMedidas((m) => ({ ...m, [field]: e.target.value }));

  const handleSubmit = () => {
    setSubmitted(true);
    if (hasErrors) return;

    addAssessment({
      studentId: id!,
      data: form.data.split("-").reverse().join("/"),
      peso: form.peso,
      altura: form.altura,
      imc,
      medidas,
      observacoes: form.observacoes,
    });

    toast.success("Avaliação registrada com sucesso.");
    navigate(`/students/${id}/assessments`);
  };

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
      <div className="px-6 py-7 max-w-2xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="animate-ls-slide-up">
          <h1 className="text-[1.375rem] font-bold text-foreground tracking-[-0.02em]">
            Nova Avaliação
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Registrando avaliação de <strong>{student.name}</strong>.
          </p>
        </div>

        {/* Card 1 — Dados principais */}
        <FormCard title="Dados da Avaliação">
          <FormField label="Data da Avaliação" id="data">
            <input
              id="data"
              type="date"
              value={form.data}
              onChange={setField("data")}
              className="ls-input"
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Peso (kg)"
              id="peso"
              required
              error="Peso é obrigatório."
              showError={submitted && !form.peso.trim()}
            >
              <input
                id="peso"
                type="number"
                step="0.1"
                placeholder="Ex: 65.5"
                value={form.peso}
                onChange={setField("peso")}
                className="ls-input"
              />
            </FormField>
            <FormField
              label="Altura (cm)"
              id="altura"
              required
              error="Altura é obrigatória."
              showError={submitted && !form.altura.trim()}
            >
              <input
                id="altura"
                type="number"
                placeholder="Ex: 165"
                value={form.altura}
                onChange={setField("altura")}
                className="ls-input"
              />
            </FormField>
          </div>

          {/* IMC calculado automaticamente */}
          {imc && (
            <div className="flex items-center justify-between bg-surface rounded-xl px-4 py-3">
              <span className="text-sm text-muted-foreground">
                IMC calculado
              </span>
              <span className="text-sm font-bold text-foreground">{imc}</span>
            </div>
          )}
        </FormCard>

        {/* Card 2 — Medidas corporais */}
        <FormCard
          title="Medidas Corporais"
          subtitle="Todas as medidas em centímetros. Opcional."
        >
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Cintura", field: "cintura" as keyof Medidas },
              { label: "Quadril", field: "quadril" as keyof Medidas },
              {
                label: "Braço Direito",
                field: "bracoDireito" as keyof Medidas,
              },
              {
                label: "Braço Esquerdo",
                field: "bracoEsquerdo" as keyof Medidas,
              },
              { label: "Coxa Direita", field: "coxaDireita" as keyof Medidas },
              {
                label: "Coxa Esquerda",
                field: "coxaEsquerda" as keyof Medidas,
              },
            ].map(({ label, field }) => (
              <FormField key={field} label={label} id={field}>
                <input
                  id={field}
                  type="number"
                  step="0.1"
                  placeholder="cm"
                  value={medidas[field]}
                  onChange={setMedida(field)}
                  className="ls-input"
                />
              </FormField>
            ))}
          </div>
        </FormCard>

        {/* Card 3 — Observações */}
        <FormCard title="Observações" subtitle="Anotações sobre a avaliação.">
          <textarea
            placeholder="Observações gerais, feedback da aluna, pontos de atenção..."
            value={form.observacoes}
            onChange={setField("observacoes")}
            className="ls-input resize-none h-24"
          />
        </FormCard>

        {/* Ações */}
        <div className="flex flex-col sm:flex-row gap-3 pb-8 animate-ls-slide-up">
          <button
            onClick={handleSubmit}
            className="sm:flex-1 h-12 rounded-xl bg-primary text-white text-sm font-semibold shadow-brand transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_8px_24px_-4px_hsla(338,78%,50%,0.40)] active:translate-y-0 cursor-pointer select-none"
          >
            Registrar Avaliação
          </button>
          <button
            onClick={() => navigate(`/students/${id}/assessments`)}
            className="h-12 px-8 rounded-xl border border-border text-foreground text-sm font-semibold hover:bg-muted transition-colors cursor-pointer select-none"
          >
            Cancelar
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
