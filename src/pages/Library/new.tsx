import { useState } from "react";
import { useLocation } from "wouter";
import { Camera } from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";
import { FormCard } from "@/components/forms/form-card";
import { FormField } from "@/components/forms/form-field";
import { useLibrary } from "@/context/library-context";
import { toast } from "sonner";

const GRUPOS_MUSCULARES = [
  "Peito", "Costas", "Pernas", "Ombro", "Bíceps", "Tríceps", "Abdômen", "Cardio", "Corpo Inteiro",
];

const EQUIPAMENTOS = [
  "Peso do corpo", "Barra", "Halteres", "Polia", "Máquina", "Elástico", "Kettlebell", "Outro",
];

type FormErrors = {
  nome: string;
  grupoMuscular: string;
  equipamento: string;
};

function validate(form: { nome: string; grupoMuscular: string; equipamento: string }): FormErrors {
  return {
    nome:          !form.nome.trim()      ? "Nome do exercício é obrigatório."  : "",
    grupoMuscular: !form.grupoMuscular    ? "Selecione o grupo muscular."        : "",
    equipamento:   !form.equipamento      ? "Selecione o equipamento."           : "",
  };
}

export default function NewLibraryExercise() {
  const [, navigate] = useLocation();
  const { addExercise } = useLibrary();

  const [form, setForm] = useState({
    nome: "",
    grupoMuscular: "",
    equipamento: "",
    midiaUrl: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const errors = validate(form);
  const hasErrors = Object.values(errors).some(Boolean);

  const set = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = () => {
    setSubmitted(true);
    if (hasErrors) return;

    addExercise({
      nome:          form.nome.trim(),
      grupoMuscular: form.grupoMuscular,
      equipamento:   form.equipamento,
      midiaUrl:      form.midiaUrl.trim(),
      tipo:          "personalizado",
      criadoPor:     "luciana", // será o ID do usuário logado quando tivermos Supabase
    });

    toast.success("Exercício cadastrado com sucesso.", {
      description: `${form.nome.trim()} foi adicionado à sua Biblioteca.`,
    });

    navigate("/library");
  };

  return (
    <AppLayout>
      <div className="px-6 py-7 max-w-2xl mx-auto flex flex-col gap-6">

        <div className="animate-ls-slide-up">
          <h1 className="text-[1.375rem] font-bold text-foreground tracking-[-0.02em]">Novo Exercício</h1>
          <p className="text-sm text-muted-foreground mt-1">Cadastre um exercício personalizado na sua Biblioteca.</p>
        </div>

        <FormCard title="Informações do Exercício">
          <FormField label="Nome do Exercício" id="nome" required
            error={errors.nome} showError={submitted && !!errors.nome}>
            <input
              id="nome"
              type="text"
              placeholder="Ex: Elevação Lateral com Halteres"
              value={form.nome}
              onChange={set("nome")}
              className="ls-input"
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Grupo Muscular" id="grupoMuscular" required
              error={errors.grupoMuscular} showError={submitted && !!errors.grupoMuscular}>
              <select id="grupoMuscular" value={form.grupoMuscular} onChange={set("grupoMuscular")} className="ls-input">
                <option value="">Selecione</option>
                {GRUPOS_MUSCULARES.map((g) => <option key={g}>{g}</option>)}
              </select>
            </FormField>
            <FormField label="Equipamento" id="equipamento" required
              error={errors.equipamento} showError={submitted && !!errors.equipamento}>
              <select id="equipamento" value={form.equipamento} onChange={set("equipamento")} className="ls-input">
                <option value="">Selecione</option>
                {EQUIPAMENTOS.map((e) => <option key={e}>{e}</option>)}
              </select>
            </FormField>
          </div>
        </FormCard>

        <FormCard title="Mídia Demonstrativa" subtitle="Opcional. Pode ser um link de vídeo (YouTube, etc.) ou imagem.">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-muted border-2 border-dashed border-border flex items-center justify-center flex-shrink-0">
                <Camera className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Upload direto da galeria estará disponível em breve.<br />
                Por enquanto, cole um link abaixo.
              </p>
            </div>
          </div>
          <FormField label="Link do vídeo ou imagem" id="midiaUrl" optional>
            <input
              id="midiaUrl"
              type="text"
              placeholder="https://..."
              value={form.midiaUrl}
              onChange={set("midiaUrl")}
              className="ls-input"
            />
          </FormField>
        </FormCard>

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

        <div className="flex flex-col sm:flex-row gap-3 pb-8 animate-ls-slide-up" style={{ animationDelay: "80ms" }}>
          <button
            onClick={handleSubmit}
            className="sm:flex-1 h-12 rounded-xl bg-primary text-white text-sm font-semibold shadow-brand transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_8px_24px_-4px_hsla(338,78%,50%,0.40)] active:translate-y-0 cursor-pointer select-none"
          >
            Cadastrar Exercício
          </button>
          <button
            onClick={() => navigate("/library")}
            className="h-12 px-8 rounded-xl border border-border text-foreground text-sm font-semibold hover:bg-muted transition-colors cursor-pointer select-none"
          >
            Cancelar
          </button>
        </div>

      </div>
    </AppLayout>
  );
}
