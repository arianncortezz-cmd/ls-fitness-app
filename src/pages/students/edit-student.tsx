import { useParams, useLocation } from "wouter";
import { Camera } from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";
import { useStudents } from "@/context/students-context";

const Field = ({
  label,
  id,
  children,
}: {
  label: string;
  id?: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-sm font-medium text-foreground">{label}</label>
    {children}
  </div>
);

export default function EditStudent() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { students } = useStudents();

  const student = students.find((s) => s.id === id);
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
      <div className="px-6 py-7 max-w-2xl mx-auto flex flex-col gap-7">

        <div className="animate-ls-slide-up">
          <h1 className="text-[1.375rem] font-bold text-foreground tracking-[-0.02em]">Editar Aluna</h1>
          <p className="text-sm text-muted-foreground mt-1">Atualizando dados de <strong>{student.name}</strong>.</p>
        </div>

        <div className="bg-white rounded-2xl border border-border p-6 shadow-sm flex flex-col gap-6 animate-ls-slide-up" style={{ animationDelay: "40ms" }}>

          {/* Photo */}
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-foreground">Foto de perfil</span>
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-full ${student.avatarBg} ${student.avatarText} flex items-center justify-center font-bold text-lg relative cursor-pointer group`}>
                {student.initials}
                <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-4 h-4 text-white" strokeWidth={1.5} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">Clique para alterar<br />a foto de perfil</p>
            </div>
          </div>

          <div className="h-px bg-border" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Field label="Nome completo" id="name">
                <input id="name" type="text" defaultValue={student.name} className="ls-input" />
              </Field>
            </div>
            <Field label="Usuário" id="username">
              <input id="username" type="text" defaultValue={student.username} className="ls-input" />
            </Field>
            <Field label="Telefone" id="phone">
              <input id="phone" type="tel" defaultValue={student.phone} className="ls-input" />
            </Field>
            <Field label="Data de nascimento" id="birthdate">
              <input id="birthdate" type="date" className="ls-input" />
            </Field>
            <Field label="Gênero" id="gender">
              <select id="gender" defaultValue={student.gender} className="ls-input">
                <option>Feminino</option>
                <option>Masculino</option>
                <option>Não-binário</option>
                <option>Prefiro não informar</option>
              </select>
            </Field>
          </div>

          <div className="h-px bg-border" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Field label="Objetivos" id="goals">
                <textarea id="goals" defaultValue={student.goals} className="ls-input resize-none h-20" />
              </Field>
            </div>
            <Field label="Plano" id="plan">
              <select id="plan" defaultValue={student.plan} className="ls-input">
                <option>Mensal</option>
                <option>Trimestral</option>
                <option>Semestral</option>
              </select>
            </Field>
            <Field label="Data de início" id="startdate">
              <input id="startdate" type="date" className="ls-input" />
            </Field>
            <Field label="Status" id="status">
              <select id="status" defaultValue={student.status} className="ls-input">
                <option>Ativa</option>
                <option>Arquivada</option>
              </select>
            </Field>
          </div>

          <div className="h-px bg-border" />

          <div className="flex flex-col gap-4">
            <Field label="Observações médicas" id="medical">
              <textarea id="medical" defaultValue={student.medicalObservations} className="ls-input resize-none h-20" />
            </Field>
            <Field label="PAR-Q" id="parq">
              <textarea id="parq" defaultValue={student.parq} className="ls-input resize-none h-20" />
            </Field>
            <Field label="Anotações" id="notes">
              <textarea id="notes" defaultValue={student.notes} className="ls-input resize-none h-20" />
            </Field>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pb-8">
          <button
            onClick={() => navigate(`/students/${id}`)}
            className="flex-1 h-12 rounded-xl bg-primary text-white text-sm font-semibold shadow-brand transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_8px_24px_-4px_hsla(338,78%,50%,0.40)] active:translate-y-0 cursor-pointer select-none"
          >
            Salvar Alterações
          </button>
          <button
            onClick={() => navigate(`/students/${id}`)}
            className="h-12 px-6 rounded-xl border border-border text-foreground text-sm font-semibold hover:bg-muted transition-colors cursor-pointer select-none"
          >
            Cancelar
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
