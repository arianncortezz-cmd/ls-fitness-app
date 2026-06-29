import { useLocation } from "wouter";
import { LsLogo } from "@/components/common/LsLogo";

export default function Home() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-white flex flex-col animate-ls-fade-in">
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-xs flex flex-col items-center">

          {/* Logo */}
          <div className="animate-ls-slide-up mb-10">
            <LsLogo size={88} />
          </div>

          {/* Title + Subtitle */}
          <div
            className="flex flex-col items-center gap-4 text-center animate-ls-slide-up mb-12"
            style={{ animationDelay: "40ms" }}
          >
            <h1 className="text-[1.75rem] font-bold text-foreground leading-[1.2] tracking-[-0.02em]">
              Bem-vindo ao LS Fitness
            </h1>
            <p className="text-[1rem] text-muted-foreground leading-relaxed max-w-[260px]">
              A plataforma que conecta personal trainers e alunos.
            </p>
          </div>

          {/* Buttons */}
          <div
            className="w-full flex flex-col gap-3.5 animate-ls-slide-up"
            style={{ animationDelay: "80ms" }}
          >
            <button
              onClick={() => navigate("/login")}
              className="
                w-full flex items-center justify-center
                h-14 rounded-2xl
                bg-primary text-white text-[0.9375rem] font-semibold
                shadow-brand
                transition-all duration-200 ease-out
                hover:-translate-y-[2px] hover:shadow-[0_12px_28px_-6px_hsla(338,78%,50%,0.40)]
                active:translate-y-0 active:shadow-brand
                cursor-pointer select-none
              "
            >
              Sou Personal
            </button>

            <button
              onClick={() => navigate("/login")}
              className="
                w-full flex items-center justify-center
                h-14 rounded-2xl
                bg-white text-foreground text-[0.9375rem] font-semibold
                border border-primary/25
                transition-all duration-200 ease-out
                hover:bg-primary/5 hover:border-primary/40
                active:bg-primary/8
                cursor-pointer select-none
              "
            >
              Sou Aluno
            </button>
          </div>

        </div>
      </main>

      <footer className="py-8 text-center animate-ls-fade-in" style={{ animationDelay: "120ms" }}>
        <p className="text-[0.75rem] text-muted-foreground/60 tracking-wide">
          Versão 1.0
        </p>
      </footer>
    </div>
  );
}
