import { useParams, useLocation } from "wouter";
import { ArrowLeft, Plus, TrendingUp, Scale, Ruler } from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";
import { useStudents } from "@/context/students-context";
import { useAssessments } from "@/context/assessments-context";

function IMCLabel({ imc }: { imc: string }) {
  const value = parseFloat(imc);
  if (!value) return null;
  let label = "";
  let style = "";
  if (value < 18.5) {
    label = "Abaixo do peso";
    style = "bg-blue-50 text-blue-700 border-blue-200";
  } else if (value < 25) {
    label = "Peso normal";
    style = "bg-emerald-50 text-emerald-700 border-emerald-200";
  } else if (value < 30) {
    label = "Sobrepeso";
    style = "bg-amber-50 text-amber-700 border-amber-200";
  } else {
    label = "Obesidade";
    style = "bg-red-50 text-red-700 border-red-200";
  }
  return <span className={`ls-badge border ${style}`}>{label}</span>;
}

export default function StudentAssessments() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { students } = useStudents();
  const { getAssessmentsByStudent } = useAssessments();

  const student = students.find((s) => s.id === id);
  const assessments = id ? getAssessmentsByStudent(id) : [];

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
              <h1 className="text-[1.375rem] font-bold text-foreground tracking-[-0.02em]">
                Evolução de {student.name}
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {assessments.length}{" "}
                {assessments.length === 1
                  ? "avaliação registrada"
                  : "avaliações registradas"}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate(`/students/${student.id}/assessments/new`)}
            className="flex items-center gap-1.5 h-9 px-4 flex-shrink-0 rounded-xl bg-primary text-white text-sm font-semibold shadow-brand transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_8px_20px_-4px_hsla(338,78%,50%,0.40)] active:translate-y-0 cursor-pointer select-none min-h-0"
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            Nova Avaliação
          </button>
        </div>

        {/* Lista */}
        {assessments.length === 0 ? (
          <div className="bg-white rounded-2xl border border-border shadow-sm flex flex-col items-center gap-4 py-16 text-center animate-ls-slide-up">
            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
              <TrendingUp
                className="w-6 h-6 text-muted-foreground"
                strokeWidth={1.5}
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Nenhuma avaliação registrada.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Registre a primeira avaliação de {student.name}.
              </p>
            </div>
            <button
              onClick={() =>
                navigate(`/students/${student.id}/assessments/new`)
              }
              className="h-9 px-5 rounded-xl bg-primary text-white text-sm font-semibold shadow-brand hover:-translate-y-[1px] transition-all duration-200 cursor-pointer select-none min-h-0"
            >
              Registrar primeira avaliação
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {assessments.map((av, i) => (
              <div
                key={av.id}
                className="bg-white rounded-2xl border border-border shadow-sm p-5 flex flex-col gap-4 animate-ls-slide-up"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {/* Header do card */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">
                      {av.data}
                    </span>
                    {i === 0 && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        Mais recente
                      </span>
                    )}
                  </div>
                  <IMCLabel imc={av.imc} />
                </div>

                {/* Peso, Altura, IMC */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: Scale, label: "Peso", value: `${av.peso} kg` },
                    { icon: Ruler, label: "Altura", value: `${av.altura} cm` },
                    { icon: TrendingUp, label: "IMC", value: av.imc },
                  ].map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-1 bg-surface rounded-xl p-3"
                    >
                      <Icon
                        className="w-4 h-4 text-muted-foreground"
                        strokeWidth={1.75}
                      />
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="text-sm font-bold text-foreground">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Medidas */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">
                    Medidas corporais
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { label: "Cintura", value: av.medidas.cintura },
                      { label: "Quadril", value: av.medidas.quadril },
                      { label: "Braço D.", value: av.medidas.bracoDireito },
                      { label: "Braço E.", value: av.medidas.bracoEsquerdo },
                      { label: "Coxa D.", value: av.medidas.coxaDireita },
                      { label: "Coxa E.", value: av.medidas.coxaEsquerda },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="flex items-center justify-between bg-surface rounded-lg px-3 py-2"
                      >
                        <span className="text-xs text-muted-foreground">
                          {label}
                        </span>
                        <span className="text-xs font-semibold text-foreground">
                          {value ? `${value} cm` : "—"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Observações */}
                {av.observacoes && (
                  <p className="text-xs text-muted-foreground italic border-t border-border/60 pt-3">
                    {av.observacoes}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
