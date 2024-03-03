import clsx from "clsx";

type FormControlProps = { children: React.ReactNode; label?: string; className?: string };

export function FormControl({ children, label, className }: FormControlProps) {
  return (
    <label className={clsx("form-control w-full max-w-xs", className)}>
      {label && (
        <div className="label">
          <span className="label-text-alt">{label}</span>
        </div>
      )}
      {children}
    </label>
  );
}
