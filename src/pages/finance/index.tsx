import { useState } from "react";
import { useLocation } from "wouter";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  AlertCircle,
  Wallet,
} from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";
import { usePayments } from "@/context/payments-context";
import { useStudents } from "@/context/students-context";
import type { PagamentoStatus } from "@/types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getMesLabel(mes: string): string {
  const [ano, m] = mes.split("-");
  const date = new Date(Number(ano), Number(m) - 1, 1);
  return date.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
}

function addMes(mes: string, delta: number): string {
  const [ano, m] = mes.split("-").map(Number);
  const date = new Date(ano, m - 1 + delta, 1);
  return date.toISOString().slice(0, 7);
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: PagamentoStatus }) {
  const config: Record<
    PagamentoStatus,
    { label: string; style: string; icon: React.ElementType }
  > = {
    pago: {
      label: "Pago",
      style: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: CheckCircle,
    },
    pendente: {
      label: "Pendente",
      style: "bg-amber-50   text-amber-700   border-amber-200",
      icon: Clock,
    },
    atrasado: {
      label: "Atrasado",
      style: "bg-red-50     text-red-700     border-red-200",
      icon: AlertCircle,
    },
  };
  const { label, style, icon: Icon } = config[status];
  return (
    <span className={`ls-badge border flex items-center gap-1 ${style}`}>
      <Icon className="w-3 h-3" strokeWidth={1.75} />
      {label}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Finance() {
  const { getPagamentosByMes, updateStatus } = usePayments();
  const { students } = useStudents();

  const [mes, setMes] = useState(new Date().toISOString().slice(0, 7));
  const pagamentos = getPagamentosByMes(mes);

  const getStudent = (id: string) => students.find((s) => s.id === id);

  const totalMes = pagamentos.reduce((acc, p) => acc + p.valor, 0);
  const totalPago = pagamentos
    .filter((p) => p.status === "pago")
    .reduce((acc, p) => acc + p.valor, 0);
  const totalPendente = pagamentos
    .filter((p) => p.status !== "pago")
    .reduce((acc, p) => acc + p.valor, 0);

  return (
    <AppLayout>
      <div className="px-6 py-7 max-w-3xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="animate-ls-slide-up">
          <h1 className="text-[1.375rem] font-bold text-foreground tracking-[-0.02em]">
            Financeiro
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Acompanhe os pagamentos das suas alunas.
          </p>
        </div>

        {/* Navegação de mês */}
        <div
          className="bg-white rounded-2xl border border-border shadow-sm p-4 flex items-center justify-between gap-4 animate-ls-slide-up"
          style={{ animationDelay: "30ms" }}
        >
          <button
            onClick={() => setMes((m) => addMes(m, -1))}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer min-h-0"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={1.75} />
          </button>
          <p className="text-sm font-bold text-foreground capitalize">
            {getMesLabel(mes)}
          </p>
          <button
            onClick={() => setMes((m) => addMes(m, 1))}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer min-h-0"
          >
            <ChevronRight className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>

        {/* Resumo */}
        <div
          className="grid grid-cols-3 gap-3 animate-ls-slide-up"
          style={{ animationDelay: "60ms" }}
        >
          {[
            {
              label: "Total do mês",
              value: totalMes,
              style: "text-foreground",
            },
            { label: "Recebido", value: totalPago, style: "text-emerald-600" },
            {
              label: "A receber",
              value: totalPendente,
              style: "text-amber-600",
            },
          ].map(({ label, value, style }) => (
            <div
              key={label}
              className="bg-white rounded-2xl border border-border shadow-sm p-4 flex flex-col gap-1"
            >
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className={`text-lg font-bold ${style}`}>
                R$ {value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
          ))}
        </div>

        {/* Lista de pagamentos */}
        {pagamentos.length === 0 ? (
          <div className="bg-white rounded-2xl border border-border shadow-sm flex flex-col items-center gap-4 py-16 text-center animate-ls-slide-up">
            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
              <Wallet
                className="w-6 h-6 text-muted-foreground"
                strokeWidth={1.5}
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Nenhum pagamento neste mês.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Navegue para outro mês ou cadastre alunas.
              </p>
            </div>
          </div>
        ) : (
          <div
            className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden animate-ls-slide-up"
            style={{ animationDelay: "90ms" }}
          >
            <div className="px-5 py-4 border-b border-border">
              <h2 className="text-sm font-semibold text-foreground">
                Pagamentos
              </h2>
            </div>
            <div className="divide-y divide-border/60">
              {pagamentos.map((p, i) => {
                const student = getStudent(p.studentId);
                return (
                  <div
                    key={p.id}
                    className="px-5 py-4 flex items-center justify-between gap-4 animate-ls-slide-up"
                    style={{ animationDelay: `${i * 30}ms` }}
                  >
                    <div className="flex flex-col gap-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {student?.name ?? "Aluna não encontrada"}
                      </p>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={p.status} />
                        {p.dataPagamento && (
                          <span className="text-xs text-muted-foreground">
                            Pago em {p.dataPagamento}
                          </span>
                        )}
                        {p.observacoes && (
                          <span className="text-xs text-muted-foreground italic truncate max-w-[160px]">
                            {p.observacoes}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <p className="text-sm font-bold text-foreground">
                        R${" "}
                        {p.valor.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </p>

                      {/* Ações rápidas */}
                      {p.status !== "pago" && (
                        <button
                          onClick={() => updateStatus(p.id, "pago")}
                          className="h-8 px-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold hover:bg-emerald-100 transition-colors cursor-pointer min-h-0"
                        >
                          Marcar pago
                        </button>
                      )}
                      {p.status === "pago" && (
                        <button
                          onClick={() => updateStatus(p.id, "pendente")}
                          className="h-8 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-100 transition-colors cursor-pointer min-h-0"
                        >
                          Desfazer
                        </button>
                      )}
                      {p.status === "pendente" && (
                        <button
                          onClick={() => updateStatus(p.id, "atrasado")}
                          className="h-8 px-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold hover:bg-red-100 transition-colors cursor-pointer min-h-0"
                        >
                          Marcar atrasado
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
