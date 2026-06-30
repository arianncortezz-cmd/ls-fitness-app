import { useState } from "react";
import { useLocation } from "wouter";
import {
  Plus,
  Search,
  BookOpen,
  Play,
  Dumbbell,
  Pencil,
  Trash2,
  ShieldCheck,
} from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";
import { useLibrary } from "@/context/library-context";

const GRUPOS = [
  "Todos",
  "Peito",
  "Costas",
  "Pernas",
  "Ombro",
  "Bíceps",
  "Tríceps",
  "Abdômen",
  "Cardio",
];

export default function LibraryList() {
  const [, navigate] = useLocation();
  const { exercises, deleteExercise } = useLibrary();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState("Todos");

  const filtered = exercises.filter((ex) => {
    const matchGroup =
      activeGroup === "Todos" || ex.grupoMuscular === activeGroup;
    const matchSearch =
      !searchQuery || ex.nome.toLowerCase().includes(searchQuery.toLowerCase());
    return matchGroup && matchSearch;
  });

  return (
    <AppLayout>
      <div className="px-6 py-7 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 animate-ls-slide-up">
          <div>
            <h1 className="text-[1.375rem] font-bold text-foreground tracking-[-0.02em]">
              Biblioteca de Exercícios
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Exercícios oficiais e os seus, prontos para usar nos treinos.
            </p>
          </div>
          <button
            onClick={() => navigate("/library/new")}
            className="flex items-center gap-1.5 h-9 px-4 flex-shrink-0 rounded-xl bg-primary text-white text-sm font-semibold shadow-brand transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_8px_20px_-4px_hsla(338,78%,50%,0.40)] active:translate-y-0 cursor-pointer select-none min-h-0"
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            Novo Exercício
          </button>
        </div>

        {/* Search + Filters */}
        <div
          className="flex flex-col gap-3 animate-ls-slide-up"
          style={{ animationDelay: "30ms" }}
        >
          <div className="relative">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
              strokeWidth={1.75}
            />
            <input
              type="text"
              placeholder="Pesquisar exercício..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ls-input pl-10 w-full max-w-md"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {GRUPOS.map((g) => (
              <button
                key={g}
                onClick={() => setActiveGroup(g)}
                className={`h-8 px-4 rounded-full text-xs font-semibold border transition-all duration-150 cursor-pointer min-h-0 select-none ${
                  activeGroup === g
                    ? "bg-primary text-white border-primary shadow-brand"
                    : "bg-white text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-border shadow-sm flex flex-col items-center gap-4 py-16 text-center animate-ls-slide-up">
            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
              <BookOpen
                className="w-6 h-6 text-muted-foreground"
                strokeWidth={1.5}
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Nenhum exercício encontrado.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Tente ajustar os filtros ou cadastre um novo exercício.
              </p>
            </div>
            <button
              onClick={() => navigate("/library/new")}
              className="h-9 px-5 rounded-xl bg-primary text-white text-sm font-semibold shadow-brand hover:-translate-y-[1px] transition-all duration-200 cursor-pointer select-none min-h-0"
            >
              Cadastrar primeiro exercício
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((ex, i) => (
              <div
                key={ex.id}
                className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col animate-ls-slide-up hover:shadow-md hover:border-primary/30 transition-all duration-200"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {/* Thumbnail / media placeholder */}
                <div className="aspect-video bg-surface flex items-center justify-center relative">
                  {ex.midiaUrl ? (
                    <Play className="w-8 h-8 text-primary" strokeWidth={1.5} />
                  ) : (
                    <Dumbbell
                      className="w-8 h-8 text-muted-foreground/40"
                      strokeWidth={1.5}
                    />
                  )}
                  {ex.tipo === "oficial" && (
                    <span className="absolute top-2.5 left-2.5 flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary">
                      <ShieldCheck className="w-3 h-3" strokeWidth={2} />
                      Oficial
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <p className="text-sm font-bold text-foreground leading-snug">
                    {ex.nome}
                  </p>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="ls-badge border bg-slate-100 text-slate-600 border-slate-200">
                      {ex.grupoMuscular}
                    </span>
                    {ex.equipamento && (
                      <span className="ls-badge border bg-slate-50 text-slate-500 border-slate-200">
                        {ex.equipamento}
                      </span>
                    )}
                  </div>

                  {/* Actions — only for personalizado */}
                  {ex.tipo === "personalizado" && (
                    <div className="flex items-center gap-2 mt-auto pt-2">
                      <button
                        onClick={() => navigate(`/library/${ex.id}/edit`)}
                        className="flex-1 h-8 flex items-center justify-center gap-1.5 rounded-lg border border-border text-xs font-semibold text-foreground hover:bg-muted transition-colors cursor-pointer min-h-0"
                      >
                        <Pencil className="w-3 h-3" strokeWidth={1.75} />
                        Editar
                      </button>
                      <button
                        onClick={() => deleteExercise(ex.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer min-h-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
