import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "JMC Admin · OMS",
  description: "Jatin Malik Couture — in-house CMS / order management.",
};

const nav = [
  { href: "/", label: "Dashboard" },
  { href: "/products", label: "Products" },
  { href: "/collections", label: "Collections" },
  { href: "/inquiries", label: "Inquiries" },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <div className="flex min-h-screen">
          <aside className="w-56 shrink-0 border-r border-neutral-800 bg-neutral-950 p-5">
            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500">
              Jatin Malik
            </p>
            <p className="mb-8 text-sm text-neutral-400">Admin · OMS</p>
            <nav className="flex flex-col gap-1">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="rounded-md px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </aside>
          <main className="flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
