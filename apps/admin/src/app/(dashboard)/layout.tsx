import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { logoutAction } from "@/lib/auth-actions";

const nav = [
  { href: "/", label: "Dashboard" },
  { href: "/products", label: "Products" },
  { href: "/collections", label: "Collections" },
  { href: "/inquiries", label: "Inquiries" },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-56 shrink-0 flex-col border-r border-neutral-800 bg-neutral-950 p-5">
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

        <div className="mt-auto pt-6">
          <p className="truncate text-xs text-neutral-500">{user.email}</p>
          <form action={logoutAction}>
            <button className="mt-2 text-xs text-neutral-400 hover:text-amber-400">
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
