type Option = { value: string; label: string };

type Props = {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  columns?: 2 | 3;
};

/**
 * FormCheckboxGroup — reusable multi-select checkbox grid.
 */
export function FormCheckboxGroup({ options, selected, onChange, columns = 2 }: Props) {
  const toggle = (value: string) => {
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    );
  };

  return (
    <div className={`grid gap-2.5 ${columns === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
      {options.map(({ value, label }) => {
        const checked = selected.includes(value);
        return (
          <label
            key={value}
            className={`
              flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-sm
              cursor-pointer transition-all duration-150 select-none
              ${checked
                ? "bg-primary/8 border-primary/30 text-primary font-medium"
                : "bg-surface border-border text-foreground hover:border-primary/20 hover:bg-primary/4"
              }
            `}
          >
            <div
              className={`
                w-4 h-4 rounded-[4px] border flex items-center justify-center flex-shrink-0 transition-all
                ${checked ? "bg-primary border-primary" : "border-border bg-white"}
              `}
            >
              {checked && (
                <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
                  <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className="truncate">{label}</span>
          </label>
        );
      })}
    </div>
  );
}
