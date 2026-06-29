import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { LsLogo } from "@/components/common/LsLogo";
import type { ReactNode } from "react";

type Props = {
  backTo: string;
  backLabel?: string;
  children: ReactNode;
  maxWidth?: string;
};

export function InnerShell({ backTo, backLabel = "Voltar", children, maxWidth = "max-w-3xl" }: Props) {
  const [, navigate] = useLocation();
  return (
    <div className="min-h-screen bg-surface flex flex-col animate-ls-fade-in">
      <header className="bg-white border-b border-border px-5 py-3.5 sticky top-0 z-10">
        <div className={`${maxWidth} mx-auto flex items-center gap-3`}>
          <button
            onClick={() => navigate(backTo)}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors min-h-0 mr-1"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
            <span className="hidden sm:inline">{backLabel}</span>
          </button>
          <div className="flex-1" />
          <LsLogo size={34} />
        </div>
      </header>
      <main className={`flex-1 px-5 py-7 ${maxWidth} mx-auto w-full`}>
        {children}
      </main>
    </div>
  );
}
