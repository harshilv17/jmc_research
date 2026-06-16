import Link from "next/link";
import { clsx } from "@/lib/clsx";

type Variant = "solid" | "outline";

const base =
  "inline-flex items-center justify-center rounded-full px-6 py-2.5 text-[11px] font-normal uppercase tracking-[0.22em] transition-colors sm:text-xs";

const variants: Record<Variant, string> = {
  solid: "bg-gold text-char hover:bg-gold-soft",
  outline:
    "border border-gold/50 text-gold-soft hover:bg-gold hover:text-char",
};

export default function Button({
  href,
  variant = "outline",
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={clsx(base, variants[variant], className)}>
      {children}
    </Link>
  );
}
