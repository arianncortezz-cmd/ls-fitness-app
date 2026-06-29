export function LsLogo({ size = 72 }: { size?: number }) {
  const radius = Math.round(size * 0.27);
  return (
    <div
      className="relative flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size }}
    >
      <div
        className="flex items-center justify-center w-full h-full bg-primary/8 border border-primary/15 shadow-sm"
        style={{ borderRadius: radius }}
      >
        <span
          className="font-black text-primary leading-none select-none"
          style={{ fontSize: size * 0.38, letterSpacing: "-0.04em" }}
        >
          LS
        </span>
      </div>
      <div
        className="absolute -inset-2 -z-10 blur-md bg-primary/5"
        style={{ borderRadius: radius + 8 }}
      />
    </div>
  );
}
