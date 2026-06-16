import { clsx } from "@/lib/clsx";

type Props = {
  as?: "h1" | "h2" | "h3";
  className?: string;
  children: React.ReactNode;
};

/** Display heading in the brand serif scale. Wrap accent words in <Accent>. */
export default function Heading({ as = "h2", className, children }: Props) {
  const Tag = as;
  return (
    <Tag
      className={clsx(
        "font-serif font-light leading-[1.1] text-ivory",
        as === "h1" ? "text-4xl sm:text-6xl" : "text-3xl sm:text-5xl",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Sinistre gold accent run, used inside headings. */
export function Accent({ children }: { children: React.ReactNode }) {
  return <span className="font-accent text-gold-soft">{children}</span>;
}
