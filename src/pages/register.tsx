import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { LsLogo } from "@/components/common/LsLogo";

export default function Register() {
  const [, navigate] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-10 animate-ls-fade-in">
      <div className="w-full max-w-sm mx-auto flex flex-col gap-8">

        {/* Back */}
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors self-start min-h-0 mt-2"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
          Voltar ao login
        </button>

        {/* Logo + Header */}
        <div className="flex flex-col items-center gap-5 text-center animate-ls-slide-up">
          <LsLogo size={64} />
          <div>
            <h1 className="text-[1.625rem] font-bold text-foreground tracking-[-0.02em] leading-tight">
              Criar Conta
            </h1>
            <p className="mt-2 text-[0.9375rem] text-muted-foreground">
              Preencha seus dados para começar
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="w-full flex flex-col gap-4 animate-ls-slide-up" style={{ animationDelay: "60ms" }}>

          {/* Nome */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground" htmlFor="nome">
              Nome
            </label>
            <input
              id="nome"
              type="text"
              placeholder="Seu nome completo"
              className="ls-input"
              autoComplete="name"
            />
          </div>

          {/* Usuário */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground" htmlFor="usuario">
              Usuário
            </label>
            <input
              id="usuario"
              type="text"
              placeholder="Escolha um usuário"
              className="ls-input"
              autoComplete="username"
            />
          </div>

          {/* Telefone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground" htmlFor="telefone">
              Telefone
            </label>
            <input
              id="telefone"
              type="tel"
              placeholder="(00) 00000-0000"
              className="ls-input"
              autoComplete="tel"
            />
          </div>

          {/* Senha */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground" htmlFor="senha">
              Senha
            </label>
            <div className="relative">
              <input
                id="senha"
                type={showPassword ? "text" : "password"}
                placeholder="Crie uma senha"
                className="ls-input pr-11"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors min-h-0"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword
                  ? <EyeOff className="w-4 h-4" strokeWidth={1.75} />
                  : <Eye className="w-4 h-4" strokeWidth={1.75} />
                }
              </button>
            </div>
          </div>

          {/* Confirmar Senha */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground" htmlFor="confirmar-senha">
              Confirmar senha
            </label>
            <div className="relative">
              <input
                id="confirmar-senha"
                type={showConfirm ? "text" : "password"}
                placeholder="Repita a senha"
                className="ls-input pr-11"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors min-h-0"
                aria-label={showConfirm ? "Ocultar senha" : "Mostrar senha"}
              >
                {showConfirm
                  ? <EyeOff className="w-4 h-4" strokeWidth={1.75} />
                  : <Eye className="w-4 h-4" strokeWidth={1.75} />
                }
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={() => navigate("/login")}
            className="
              w-full h-14 rounded-2xl mt-2
              bg-primary text-white text-[0.9375rem] font-semibold
              shadow-brand
              transition-all duration-200 ease-out
              hover:-translate-y-[2px] hover:shadow-[0_12px_28px_-6px_hsla(338,78%,50%,0.40)]
              active:translate-y-0
              cursor-pointer select-none
            "
          >
            Criar Conta
          </button>
        </div>

        {/* Login link */}
        <p
          className="text-sm text-muted-foreground text-center animate-ls-fade-in pb-4"
          style={{ animationDelay: "100ms" }}
        >
          Já tem uma conta?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-primary font-semibold hover:text-primary/80 transition-colors min-h-0"
          >
            Entrar
          </button>
        </p>

      </div>
    </div>
  );
}
