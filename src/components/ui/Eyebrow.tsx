import { clsx } from "@/lib/clsx";

/** Small gold uppercase label used above headings across the site. */
export default function Eyebrow({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={clsx(
        "text-[11px] uppercase tracking-[0.4em] text-gold",
        className,
      )}
    >
      {children}
    </p>
  );
}
