import { useState } from "react";
import { useLocation } from "wouter";
import { Camera } from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";
import { FormCard } from "@/components/forms/form-card";
import { FormField } from "@/components/forms/form-field";
import { FormCheckboxGroup } from "@/components/forms/form-checkbox-group";
import { useStudents, type StudentFormData } from "@/context/students-context";
import { toast } from "sonner";

// ─── Constants ───────────────────────────────────────────────────────────────

const INITIAL_FORM: StudentFormData = {
  nome: "",
  username: "",
  telefone: "",
  email: "",
  nascimento: "",
  sexo: "",
  objetivos: [],
  plano: "",
  status: "Ativa",
  observacoesMedicas: "",
  parq: "",
  alergias: "",
  lesoes: "",
  medicamentos: "",
  observacoes: "",
};

const OBJETIVO_OPTIONS = [
  { value: "Emagrecimento",    label: "Emagrecimento" },
  { value: "Hipertrofia",      label: "Hipertrofia" },
  { value: "Condicionamento",  label: "Condicionamento" },
  { value: "Saúde",            label: "Saúde" },
  { value: "Qualidade de Vida",label: "Qualidade de Vida" },
  { value: "Postura",          label: "Postura" },
  { value: "Outro",            label: "Outro" },
];

// ─── Validation ──────────────────────────────────────────────────────────────

function validate(form: StudentFormData) {
  return {
    nome:     !form.nome.trim()     ? "Nome completo é obrigatório."   : "",
    username: !form.username.trim() ? "Nome de usuário é obrigatório." : "",
    telefone: !form.telefone.trim() ? "Telefone é obrigatório."        : "",
    plano:    !form.plano           ? "Selecione um plano."            : "",
    status:   !form.status          ? "Selecione um status."           : "",
  };
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function NewStudent() {
  const [, navigate] = useLocation();
  const { addStudent } = useStudents();

  const [form, setForm] = useState<StudentFormData>(INITIAL_FORM);
  const [touched, setTouched] = useState<Partial<Record<keyof StudentFormData, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  const errors = validate(form);
  const hasErrors = Object.values(errors).some(Boolean);

  const showError = (field: keyof typeof errors) =>
    (submitted || !!touched[field]) && !!errors[field];

  const set = (field: keyof StudentFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const blur = (field: keyof StudentFormData) => () =>
    setTouched((t) => ({ ...t, [field]: true }));

  const handleSubmit = () => {
    setSubmitted(true);
    setTouched({ nome: true, username: true, telefone: true, plano: true, status: true });

    if (hasErrors) return;

    addStudent(form);
    toast.success("Aluna cadastrada com sucesso.", {
      description: `${form.nome.trim()} foi adicionada à sua lista.`,
    });
    navigate("/students");
  };

  return (
    <AppLayout>
      <div className="px-6 py-7 max-w-5xl mx-auto flex flex-col gap-6">

        {/* Page header */}
        <div className="animate-ls-slide-up">
          <h1 className="text-[1.375rem] font-bold text-foreground tracking-[-0.02em]">Nova Aluna</h1>
          <p className="text-sm text-muted-foreground mt-1">Preencha os dados para cadastrar uma nova aluna.</p>
        </div>

        {/* Two-column grid on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 animate-ls-slide-up" style={{ animationDelay: "40ms" }}>

          {/* ── Left column ── */}
          <div className="flex flex-col gap-5">

            {/* Card 1 — Informações Pessoais */}
            <FormCard title="Informações Pessoais">
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-foreground flex items-center gap-1">
                  Foto de Perfil <span className="text-muted-foreground font-normal text-xs">(opcional)</span>
                </span>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-muted border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-primary/40 hover:bg-primary/4 transition-colors flex-shrink-0">
                    <Camera className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">Clique para adicionar<br />uma foto (PNG ou JPG)</p>
                </div>
              </div>

              <div className="h-px bg-border" />

              <FormField label="Nome Completo" id="nome" required error={errors.nome} showError={showError("nome")}>
                <input
                  id="nome"
                  type="text"
                  placeholder="Nome completo da aluna"
                  value={form.nome}
                  onChange={set("nome")}
                  onBlur={blur("nome")}
                  className="ls-input"
                />
              </FormField>

              <FormField label="Nome de Usuário" id="username" required error={errors.username} showError={showError("username")}>
                <input
                  id="username"
                  type="text"
                  placeholder="@usuario"
                  value={form.username}
                  onChange={set("username")}
                  onBlur={blur("username")}
                  className="ls-input"
                />
              </FormField>

              <FormField label="Telefone" id="telefone" required error={errors.telefone} showError={showError("telefone")}>
                <input
                  id="telefone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={form.telefone}
                  onChange={set("telefone")}
                  onBlur={blur("telefone")}
                  className="ls-input"
                />
              </FormField>

              <FormField label="Email" id="email" optional>
                <input
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  value={form.email}
                  onChange={set("email")}
                  className="ls-input"
                />
              </FormField>

              <div className="grid grid-cols-2 gap-3">
                <FormField label="Nascimento" id="nascimento">
                  <input
                    id="nascimento"
                    type="date"
                    value={form.nascimento}
                    onChange={set("nascimento")}
                    className="ls-input"
                  />
                </FormField>
                <FormField label="Sexo" id="sexo">
                  <select id="sexo" value={form.sexo} onChange={set("sexo")} className="ls-input">
                    <option value="">Selecione</option>
                    <option>Feminino</option>
                    <option>Masculino</option>
                    <option>Não-binário</option>
                    <option>Prefiro não informar</option>
                  </select>
                </FormField>
              </div>
            </FormCard>

            {/* Card 2 — Objetivos */}
            <FormCard title="Objetivos" subtitle="Selecione todos os objetivos que se aplicam.">
              <FormCheckboxGroup
                options={OBJETIVO_OPTIONS}
                selected={form.objetivos}
                onChange={(val) => setForm((f) => ({ ...f, objetivos: val }))}
                columns={2}
              />
            </FormCard>
          </div>

          {/* ── Right column ── */}
          <div className="flex flex-col gap-5">

            {/* Card 3 — Plano */}
            <FormCard title="Plano">
              <FormField label="Plano" id="plano" required error={errors.plano} showError={showError("plano")}>
                <select
                  id="plano"
                  value={form.plano}
                  onChange={set("plano")}
                  onBlur={blur("plano")}
                  className="ls-input"
                >
                  <option value="">Selecione um plano</option>
                  <option>Mensal</option>
                  <option>Trimestral</option>
                  <option>Semestral</option>
                  <option>Anual</option>
                </select>
              </FormField>

              <FormField label="Status" id="status" required error={errors.status} showError={showError("status")}>
                <select
                  id="status"
                  value={form.status}
                  onChange={set("status")}
                  onBlur={blur("status")}
                  className="ls-input"
                >
                  <option value="">Selecione</option>
                  <option>Ativa</option>
                  <option>Arquivada</option>
                </select>
              </FormField>
            </FormCard>

            {/* Card 4 — Informações Médicas */}
            <FormCard title="Informações Médicas" subtitle="Preencha com cuidado. Estas informações orientam o treino.">
              <FormField label="Observações Médicas" id="obsmedicas">
                <textarea
                  id="obsmedicas"
                  placeholder="Condições de saúde, restrições médicas..."
                  value={form.observacoesMedicas}
                  onChange={set("observacoesMedicas")}
                  className="ls-input resize-none h-20"
                />
              </FormField>
              <FormField label="PAR-Q" id="parq">
                <textarea
                  id="parq"
                  placeholder="Respostas ao questionário de prontidão para exercício..."
                  value={form.parq}
                  onChange={set("parq")}
                  className="ls-input resize-none h-20"
                />
              </FormField>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Alergias" id="alergias">
                  <textarea
                    id="alergias"
                    placeholder="Alergias conhecidas..."
                    value={form.alergias}
                    onChange={set("alergias")}
                    className="ls-input resize-none h-16"
                  />
                </FormField>
                <FormField label="Lesões" id="lesoes">
                  <textarea
                    id="lesoes"
                    placeholder="Lesões antigas ou recentes..."
                    value={form.lesoes}
                    onChange={set("lesoes")}
                    className="ls-input resize-none h-16"
                  />
                </FormField>
              </div>
              <FormField label="Medicamentos" id="medicamentos">
                <textarea
                  id="medicamentos"
                  placeholder="Medicamentos em uso..."
                  value={form.medicamentos}
                  onChange={set("medicamentos")}
                  className="ls-input resize-none h-16"
                />
              </FormField>
            </FormCard>

            {/* Card 5 — Observações */}
            <FormCard title="Observações" subtitle="Notas gerais sobre a aluna.">
              <textarea
                placeholder="Preferências, comportamento, observações da primeira consulta..."
                value={form.observacoes}
                onChange={set("observacoes")}
                className="ls-input resize-none h-28"
              />
            </FormCard>
          </div>
        </div>

        {/* Validation summary — only shown after first submit attempt */}
        {submitted && hasErrors && (
          <div className="bg-red-50 border border-red-200 rounded-2xl px-5 py-4 animate-ls-slide-up">
            <p className="text-sm font-semibold text-red-700">Verifique os campos obrigatórios:</p>
            <ul className="mt-1.5 flex flex-col gap-1">
              {Object.entries(errors).filter(([, msg]) => msg).map(([field, msg]) => (
                <li key={field} className="text-xs text-red-600 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                  {msg}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Bottom actions */}
        <div className="flex flex-col sm:flex-row gap-3 pb-8 animate-ls-slide-up" style={{ animationDelay: "80ms" }}>
          <button
            onClick={handleSubmit}
            className="
              sm:flex-1 h-12 rounded-xl
              bg-primary text-white text-sm font-semibold
              shadow-brand transition-all duration-200
              hover:-translate-y-[1px] hover:shadow-[0_8px_24px_-4px_hsla(338,78%,50%,0.40)]
              active:translate-y-0 cursor-pointer select-none
            "
          >
            Cadastrar Aluna
          </button>
          <button
            onClick={() => navigate("/students")}
            className="h-12 px-8 rounded-xl border border-border text-foreground text-sm font-semibold hover:bg-muted transition-colors cursor-pointer select-none"
          >
            Cancelar
          </button>
        </div>

      </div>
    </AppLayout>
  );
}
