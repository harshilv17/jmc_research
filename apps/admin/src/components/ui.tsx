import type { ReactNode } from "react";

export const inputCls =
  "w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-amber-500";

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs uppercase tracking-wider text-neutral-400">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-neutral-500">{hint}</span>}
    </label>
  );
}

export function Button({
  children,
  variant = "primary",
  type = "submit",
}: {
  children: ReactNode;
  variant?: "primary" | "ghost" | "danger";
  type?: "submit" | "button";
}) {
  const styles = {
    primary: "bg-amber-500 text-neutral-950 hover:bg-amber-400",
    ghost: "border border-neutral-700 text-neutral-200 hover:bg-neutral-800",
    danger: "border border-red-800 text-red-300 hover:bg-red-950",
  }[variant];
  return (
    <button
      type={type}
      className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${styles}`}
    >
      {children}
    </button>
  );
}
