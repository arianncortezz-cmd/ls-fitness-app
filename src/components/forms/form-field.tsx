import type { ReactNode } from "react";

type Props = {
  label: string;
  error?: string;
  showError?: boolean;
  required?: boolean;
  optional?: boolean;
  children: ReactNode;
  id?: string;
};

/**
 * FormField — reusable label + input + error message wrapper.
 * Pass showError={true} to reveal the error (after submission or blur).
 */
export function FormField({ label, error, showError, required, optional, children, id }: Props) {
  const hasError = showError && !!error;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground flex items-center gap-1">
        {label}
        {required && <span className="text-primary text-xs leading-none">*</span>}
        {optional && <span className="text-muted-foreground font-normal text-xs">(opcional)</span>}
      </label>
      <div className={hasError ? "[&>*]:border-red-400 [&>*]:ring-1 [&>*]:ring-red-300" : ""}>
        {children}
      </div>
      {hasError && (
        <p className="text-xs text-red-500 leading-tight">{error}</p>
      )}
    </div>
  );
}
