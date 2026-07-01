import { createContext, useContext, useState, type ReactNode } from "react";
import type { Pagamento, PagamentoStatus } from "@/types";

// ─── Context shape ────────────────────────────────────────────────────────────

type PaymentsContextValue = {
  pagamentos: Pagamento[];
  updateStatus: (
    id: string,
    status: PagamentoStatus,
    dataPagamento?: string,
  ) => void;
  getPagamentosByMes: (mes: string) => Pagamento[];
};

const PaymentsContext = createContext<PaymentsContextValue | null>(null);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function mesAtual(): string {
  return new Date().toISOString().slice(0, 7);
}

function todayBR(): string {
  return new Date().toLocaleDateString("pt-BR");
}

// ─── Dados mockados ───────────────────────────────────────────────────────────

const MOCK_PAGAMENTOS: Pagamento[] = [
  {
    id: "p1",
    studentId: "1",
    mes: mesAtual(),
    valor: 250,
    status: "pago",
    dataPagamento: todayBR(),
    observacoes: "",
  },
  {
    id: "p2",
    studentId: "2",
    mes: mesAtual(),
    valor: 250,
    status: "pendente",
    dataPagamento: "",
    observacoes: "",
  },
  {
    id: "p3",
    studentId: "3",
    mes: mesAtual(),
    valor: 300,
    status: "atrasado",
    dataPagamento: "",
    observacoes: "Prometeu pagar até sexta.",
  },
];

// ─── Provider ─────────────────────────────────────────────────────────────────

export function PaymentsProvider({ children }: { children: ReactNode }) {
  const [pagamentos, setPagamentos] = useState<Pagamento[]>(MOCK_PAGAMENTOS);

  const updateStatus = (
    id: string,
    status: PagamentoStatus,
    dataPagamento?: string,
  ) => {
    setPagamentos((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status,
              dataPagamento:
                status === "pago" ? (dataPagamento ?? todayBR()) : "",
            }
          : p,
      ),
    );
  };

  const getPagamentosByMes = (mes: string) =>
    pagamentos.filter((p) => p.mes === mes);

  return (
    <PaymentsContext.Provider
      value={{ pagamentos, updateStatus, getPagamentosByMes }}
    >
      {children}
    </PaymentsContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function usePayments(): PaymentsContextValue {
  const ctx = useContext(PaymentsContext);
  if (!ctx) throw new Error("usePayments must be used inside PaymentsProvider");
  return ctx;
}
