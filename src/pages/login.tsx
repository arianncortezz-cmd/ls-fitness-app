import { useState } from "react";
import { useLocation } from "wouter";
import { Eye, EyeOff } from "lucide-react";
import { LsLogo } from "@/components/common/LsLogo";

export default function Login() {
  const [, navigate] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12 animate-ls-fade-in">
      <div className="w-full max-w-sm flex flex-col items-center gap-8">

        {/* Logo */}
        <div className="animate-ls-slide-up">
          <LsLogo size={72} />
        </div>

        {/* Header */}
        <div className="text-center animate-ls-slide-up" style={{ animationDelay: "40ms" }}>
          <h1 className="text-[1.625rem] font-bold text-foreground tracking-[-0.02em] leading-tight">
            Bem-vindo de volta
          </h1>
          <p className="mt-2 text-[0.9375rem] text-muted-foreground">
            Entre na sua conta para continuar
          </p>
        </div>

        {/* Form */}
        <div className="w-full flex flex-col gap-4 animate-ls-slide-up" style={{ animationDelay: "80ms" }}>

          {/* Usuário */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground" htmlFor="usuario">
              Usuário
            </label>
            <input
              id="usuario"
              type="text"
              placeholder="Seu usuário"
              className="ls-input"
              autoComplete="username"
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
                placeholder="Sua senha"
                className="ls-input pr-11"
                autoComplete="current-password"
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

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer select-none min-h-0">
              <div
                className={`w-4 h-4 rounded border transition-colors flex items-center justify-center cursor-pointer ${
                  remember
                    ? "bg-primary border-primary"
                    : "bg-white border-border hover:border-primary/50"
                }`}
                onClick={() => setRemember(!remember)}
              >
                {remember && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-muted-foreground">Lembrar de mim</span>
            </label>
            <button
              type="button"
              className="text-sm text-primary hover:text-primary/80 font-medium transition-colors min-h-0"
            >
              Esqueceu a senha?
            </button>
          </div>

          {/* Entrar */}
          <button
            onClick={() => navigate("/personal-dashboard")}
            className="
              w-full h-14 rounded-2xl mt-1
              bg-primary text-white text-[0.9375rem] font-semibold
              shadow-brand
              transition-all duration-200 ease-out
              hover:-translate-y-[2px] hover:shadow-[0_12px_28px_-6px_hsla(338,78%,50%,0.40)]
              active:translate-y-0
              cursor-pointer select-none
            "
          >
            Entrar
          </button>
        </div>

        {/* Register link */}
        <p
          className="text-sm text-muted-foreground animate-ls-fade-in"
          style={{ animationDelay: "120ms" }}
        >
          Primeiro acesso?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-primary font-semibold hover:text-primary/80 transition-colors min-h-0"
          >
            Criar Conta
          </button>
        </p>

      </div>
    </div>
  );
}
