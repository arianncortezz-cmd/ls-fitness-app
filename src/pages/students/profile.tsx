import { useState } from "react";
import { useParams, useLocation } from "wouter";
import {
  Pencil,
  Dumbbell,
  TrendingUp,
  Image,
  Utensils,
  History,
  Phone,
  CalendarDays,
  Target,
  CreditCard,
  AlertTriangle,
  ClipboardList,
  FileText,
  Archive,
} from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";
import { StudentAvatar } from "@/components/common/StudentAvatar";
import { useStudents } from "@/context/students-context";
import type { StudentStatus, StudentPlan } from "@/data/students";

function StatusBadge({ status }: { status: StudentStatus }) {
  const styles: Record<StudentStatus, string> = {
    Ativa: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Arquivada: "bg-slate-100  text-slate-500   border-slate-200",
  };
  return <span className={`ls-badge border ${styles[status]}`}>{status}</span>;
}

function PlanBadge({ plan }: { plan: StudentPlan }) {
  const styles: Record<StudentPlan, string> = {
    Mensal: "bg-slate-100  text-slate-600  border-slate-200",
    Trimestral: "bg-amber-50   text-amber-700  border-amber-200",
    Semestral: "bg-violet-50  text-violet-700 border-violet-200",
  };
  return <span className={`ls-badge border ${styles[plan]}`}>{plan}</span>;
}

export default function StudentProfile() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const [showArchiveConfirm, setShowArchiveConfirm] = useState(false);
  const { students, archiveStudent } = useStudents();

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

  const handleArchive = () => {
    archiveStudent(student.id);
    navigate("/students");
  };

  const moduleButtons = [
    {
      icon: Dumbbell,
      label: "Treinos",
      href: `/students/${student.id}/workouts`,
    },
    { icon: TrendingUp, label: "Evolução", href: null },
    { icon: Image, label: "Fotos", href: null },
    { icon: Utensils, label: "Dieta", href: null },
    { icon: History, label: "Histórico", href: null },
  ];

  return (
    <AppLayout>
      <div className="px-6 py-7 max-w-2xl mx-auto flex flex-col gap-5">
        {/* Profile card */}
        <div className="bg-white rounded-2xl border border-border shadow-sm p-6 flex flex-col items-center gap-4 text-center animate-ls-slide-up">
          <StudentAvatar student={student} size="lg" />
          <div>
            <h1 className="text-[1.25rem] font-bold text-foreground tracking-[-0.02em]">
              {student.name}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {student.username}
            </p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <StatusBadge status={student.status} />
              <PlanBadge plan={student.plan} />
            </div>
          </div>
          <button
            onClick={() => navigate(`/students/${student.id}/edit`)}
            className="flex items-center gap-2 h-10 px-5 rounded-xl bg-primary text-white text-sm font-semibold shadow-brand transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_8px_20px_-4px_hsla(338,78%,50%,0.40)] active:translate-y-0 cursor-pointer select-none min-h-0"
          >
            <Pencil className="w-3.5 h-3.5" strokeWidth={2} />
            Editar
          </button>
        </div>

        {/* Info */}
        <div
          className="bg-white rounded-2xl border border-border shadow-sm p-5 animate-ls-slide-up"
          style={{ animationDelay: "40ms" }}
        >
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Informações
          </h3>
          <div className="flex flex-col gap-3.5">
            {[
              { icon: Phone, label: "Telefone", value: student.phone },
              { icon: CalendarDays, label: "Início", value: student.startDate },
              {
                icon: CalendarDays,
                label: "Última avaliação",
                value: student.lastAssessment,
              },
              { icon: CreditCard, label: "Plano", value: student.plan },
              { icon: Target, label: "Objetivos", value: student.goals },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <Icon
                  className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0"
                  strokeWidth={1.75}
                />
                <div>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-medium text-foreground leading-relaxed">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Health */}
        <div
          className="bg-white rounded-2xl border border-border shadow-sm p-5 animate-ls-slide-up"
          style={{ animationDelay: "80ms" }}
        >
          <h3 className="text-sm font-semibold text-foreground mb-4">Saúde</h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <AlertTriangle
                className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0"
                strokeWidth={1.75}
              />
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Observações médicas
                </p>
                <p className="text-sm text-foreground leading-relaxed">
                  {student.medicalObservations}
                </p>
              </div>
            </div>
            <div className="h-px bg-border" />
            <div className="flex items-start gap-3">
              <ClipboardList
                className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0"
                strokeWidth={1.75}
              />
              <div>
                <p className="text-xs text-muted-foreground mb-1">PAR-Q</p>
                <p className="text-sm text-foreground leading-relaxed">
                  {student.parq}
                </p>
              </div>
            </div>
            {student.notes && (
              <>
                <div className="h-px bg-border" />
                <div className="flex items-start gap-3">
                  <FileText
                    className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0"
                    strokeWidth={1.75}
                  />
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Anotações
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      {student.notes}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Modules */}
        <div
          className="bg-white rounded-2xl border border-border shadow-sm p-5 animate-ls-slide-up"
          style={{ animationDelay: "120ms" }}
        >
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Módulos
          </h3>
          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-5">
            {moduleButtons.map(({ icon: Icon, label, href }) => (
              <button
                key={label}
                disabled={!href}
                onClick={() => href && navigate(href)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-colors min-h-0 ${
                  href
                    ? "border-border bg-white text-foreground hover:border-primary/40 hover:bg-primary/4 cursor-pointer"
                    : "border-border bg-surface text-muted-foreground opacity-50 cursor-not-allowed"
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={1.75} />
                <span className="text-xs font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Archive */}
        <div
          className="bg-white rounded-2xl border border-border shadow-sm p-5 animate-ls-slide-up"
          style={{ animationDelay: "160ms" }}
        >
          <h3 className="text-sm font-semibold text-foreground mb-1">
            Zona de atenção
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            Estas ações não podem ser desfeitas facilmente.
          </p>

          {!showArchiveConfirm ? (
            <button
              onClick={() => setShowArchiveConfirm(true)}
              className="flex items-center gap-2 h-10 px-4 rounded-xl border border-amber-200 bg-amber-50 text-amber-700 text-sm font-semibold transition-colors hover:bg-amber-100 cursor-pointer select-none min-h-0"
            >
              <Archive className="w-4 h-4" strokeWidth={1.75} />
              Arquivar Aluna
            </button>
          ) : (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex flex-col gap-3">
              <div className="flex items-start gap-2.5">
                <AlertTriangle
                  className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5"
                  strokeWidth={1.75}
                />
                <div>
                  <p className="text-sm font-semibold text-amber-800">
                    Confirmar arquivamento
                  </p>
                  <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
                    <strong>{student.name}</strong> será arquivada e não
                    aparecerá na lista ativa. Você poderá reativá-la depois.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleArchive}
                  className="h-8 px-4 rounded-lg bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition-colors cursor-pointer min-h-0"
                >
                  Sim, arquivar
                </button>
                <button
                  onClick={() => setShowArchiveConfirm(false)}
                  className="h-8 px-4 rounded-lg border border-amber-300 text-amber-700 text-xs font-semibold hover:bg-amber-100 transition-colors cursor-pointer min-h-0"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="pb-8" />
      </div>
    </AppLayout>
  );
}
