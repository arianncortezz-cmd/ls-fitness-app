import { useState } from "react";
import { useLocation } from "wouter";
import { Plus, Search, Eye, Pencil, MoreHorizontal, Users } from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";
import { StudentAvatar } from "@/components/common/StudentAvatar";
import { useStudents } from "@/context/students-context";
import type { StudentStatus, StudentPlan } from "@/data/students";

function StatusBadge({ status }: { status: StudentStatus }) {
  const styles: Record<StudentStatus, string> = {
    Ativa:     "bg-emerald-50 text-emerald-700 border-emerald-200",
    Arquivada: "bg-slate-100  text-slate-500   border-slate-200",
  };
  return <span className={`ls-badge border ${styles[status]}`}>{status}</span>;
}

function PlanBadge({ plan }: { plan: StudentPlan }) {
  const styles: Record<StudentPlan, string> = {
    Mensal:     "bg-slate-100  text-slate-600   border-slate-200",
    Trimestral: "bg-amber-50   text-amber-700   border-amber-200",
    Semestral:  "bg-violet-50  text-violet-700  border-violet-200",
  };
  return <span className={`ls-badge border ${styles[plan as StudentPlan] ?? "bg-slate-100 text-slate-600 border-slate-200"}`}>{plan}</span>;
}

type FilterType = "Todas" | "Ativas" | "Arquivadas";
const FILTERS: FilterType[] = ["Todas", "Ativas", "Arquivadas"];

export default function StudentsList() {
  const [, navigate] = useLocation();
  const { students } = useStudents();
  const [activeFilter, setActiveFilter] = useState<FilterType>("Todas");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = students.filter((s) => {
    const matchFilter =
      activeFilter === "Todas" ||
      (activeFilter === "Ativas" && s.status === "Ativa") ||
      (activeFilter === "Arquivadas" && s.status === "Arquivada");
    const matchSearch =
      !searchQuery ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.goals.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <AppLayout>
      <div className="px-6 py-7 flex flex-col gap-6">

        {/* Page header */}
        <div className="flex items-start justify-between gap-4 animate-ls-slide-up">
          <div>
            <h1 className="text-[1.375rem] font-bold text-foreground tracking-[-0.02em]">Alunos</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Gerencie todas as suas alunas em um só lugar.</p>
          </div>
          <button
            onClick={() => navigate("/students/new")}
            className="
              flex items-center gap-1.5 h-9 px-4 flex-shrink-0
              rounded-xl bg-primary text-white text-sm font-semibold
              shadow-brand transition-all duration-200
              hover:-translate-y-[1px] hover:shadow-[0_8px_20px_-4px_hsla(338,78%,50%,0.40)]
              active:translate-y-0 cursor-pointer select-none min-h-0
            "
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            Nova Aluna
          </button>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col gap-3 animate-ls-slide-up" style={{ animationDelay: "30ms" }}>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" strokeWidth={1.75} />
            <input
              type="text"
              placeholder="Pesquisar aluna..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="ls-input pl-10 w-full max-w-md"
            />
          </div>
          <div className="flex items-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => { setActiveFilter(f); setCurrentPage(1); }}
                className={`
                  h-8 px-4 rounded-full text-xs font-semibold border transition-all duration-150 cursor-pointer min-h-0 select-none
                  ${activeFilter === f
                    ? "bg-primary text-white border-primary shadow-brand"
                    : "bg-white text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
                  }
                `}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block bg-white rounded-2xl border border-border shadow-sm overflow-hidden animate-ls-slide-up" style={{ animationDelay: "60ms" }}>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                <Users className="w-6 h-6 text-muted-foreground" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Nenhuma aluna encontrada.</p>
                <p className="text-xs text-muted-foreground mt-1">Tente ajustar os filtros ou cadastre uma nova aluna.</p>
              </div>
              <button
                onClick={() => navigate("/students/new")}
                className="h-9 px-5 rounded-xl bg-primary text-white text-sm font-semibold shadow-brand hover:-translate-y-[1px] transition-all duration-200 cursor-pointer select-none min-h-0"
              >
                Cadastrar primeira aluna
              </button>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="text-left text-xs font-semibold text-muted-foreground px-5 py-3.5 w-14">Foto</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3.5">Nome</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3.5">Objetivo</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3.5">Plano</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3.5">Status</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3.5">Última Avaliação</th>
                  <th className="text-xs font-semibold text-muted-foreground px-4 py-3.5 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((student, i) => (
                  <tr
                    key={student.id}
                    className="border-b border-border/60 last:border-0 hover:bg-surface/60 transition-colors animate-ls-slide-up"
                    style={{ animationDelay: `${90 + i * 30}ms` }}
                  >
                    <td className="px-5 py-3.5">
                      <StudentAvatar student={student} size="sm" />
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="text-sm font-semibold text-foreground">{student.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{student.username}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="text-sm text-foreground max-w-[180px] truncate">{student.goals}</p>
                    </td>
                    <td className="px-4 py-3.5"><PlanBadge plan={student.plan} /></td>
                    <td className="px-4 py-3.5"><StatusBadge status={student.status} /></td>
                    <td className="px-4 py-3.5">
                      <p className="text-sm text-muted-foreground">{student.lastAssessment}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => navigate(`/students/${student.id}`)}
                          title="Visualizar"
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/8 transition-colors min-h-0 cursor-pointer"
                        >
                          <Eye className="w-4 h-4" strokeWidth={1.75} />
                        </button>
                        <button
                          onClick={() => navigate(`/students/${student.id}/edit`)}
                          title="Editar"
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors min-h-0 cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" strokeWidth={1.75} />
                        </button>
                        <button
                          title="Mais ações"
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors min-h-0 cursor-pointer"
                        >
                          <MoreHorizontal className="w-4 h-4" strokeWidth={1.75} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Mobile cards */}
        <div className="flex flex-col gap-3 md:hidden">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-border shadow-sm flex flex-col items-center gap-4 py-12 text-center">
              <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                <Users className="w-6 h-6 text-muted-foreground" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Nenhuma aluna encontrada.</p>
                <p className="text-xs text-muted-foreground mt-1">Tente ajustar os filtros ou cadastre uma nova aluna.</p>
              </div>
              <button
                onClick={() => navigate("/students/new")}
                className="h-9 px-5 rounded-xl bg-primary text-white text-sm font-semibold shadow-brand cursor-pointer min-h-0"
              >
                Cadastrar primeira aluna
              </button>
            </div>
          ) : filtered.map((student, i) => (
            <div
              key={student.id}
              className="bg-white rounded-2xl border border-border shadow-sm p-4 animate-ls-slide-up"
              style={{ animationDelay: `${60 + i * 30}ms` }}
            >
              <div className="flex items-center gap-3">
                <StudentAvatar student={student} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{student.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{student.goals}</p>
                  <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                    <PlanBadge plan={student.plan} />
                    <StatusBadge status={student.status} />
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={() => navigate(`/students/${student.id}`)} className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/8 transition-colors min-h-0 cursor-pointer">
                    <Eye className="w-4 h-4" strokeWidth={1.75} />
                  </button>
                  <button onClick={() => navigate(`/students/${student.id}/edit`)} className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors min-h-0 cursor-pointer">
                    <Pencil className="w-3.5 h-3.5" strokeWidth={1.75} />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors min-h-0 cursor-pointer">
                    <MoreHorizontal className="w-4 h-4" strokeWidth={1.75} />
                  </button>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border/60 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Última avaliação</span>
                <span className="text-xs font-medium text-foreground">{student.lastAssessment}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination + count */}
        {filtered.length > 0 && (
          <div className="flex items-center justify-between animate-ls-slide-up" style={{ animationDelay: "350ms" }}>
            <p className="text-xs text-muted-foreground">
              Mostrando <span className="font-medium text-foreground">{filtered.length}</span> {filtered.length === 1 ? "aluna" : "alunas"}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-8 px-3 rounded-lg text-xs font-medium border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors min-h-0 cursor-pointer select-none disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              {[1, 2].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold border transition-all duration-150 cursor-pointer min-h-0 select-none ${
                    currentPage === page
                      ? "bg-primary text-white border-primary shadow-brand"
                      : "border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(2, p + 1))}
                disabled={currentPage === 2}
                className="h-8 px-3 rounded-lg text-xs font-medium border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors min-h-0 cursor-pointer select-none disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Próximo
              </button>
            </div>
          </div>
        )}

      </div>
    </AppLayout>
  );
}
