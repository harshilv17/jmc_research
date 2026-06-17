import Link from "next/link";
import { api } from "@/lib/api";
import type { CollectionRow, InquiryRow, ProductRow } from "@/lib/types";

async function counts() {
  try {
    const [p, c, i] = await Promise.all([
      api.get<{ products: ProductRow[] }>("/products"),
      api.get<{ collections: CollectionRow[] }>("/collections"),
      api.get<{ inquiries: InquiryRow[] }>("/inquiries"),
    ]);
    return {
      products: p.products.length,
      collections: c.collections.length,
      inquiries: i.inquiries.length,
      error: null as string | null,
    };
  } catch (e) {
    return {
      products: 0,
      collections: 0,
      inquiries: 0,
      error: e instanceof Error ? e.message : "API unreachable",
    };
  }
}

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const c = await counts();
  const cards = [
    { href: "/products", label: "Products", n: c.products },
    { href: "/collections", label: "Collections", n: c.collections },
    { href: "/inquiries", label: "Inquiries", n: c.inquiries },
  ];

  return (
    <div>
      <h1 className="text-2xl font-light">Dashboard</h1>
      <p className="mt-1 text-sm text-neutral-400">
        In-house content & order management.
      </p>

      {c.error && (
        <p className="mt-4 rounded-md border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-300">
          API not reachable: {c.error}. Start it with{" "}
          <code className="text-red-200">pnpm --filter @jmc/api dev</code>.
        </p>
      )}

      <div className="mt-8 grid grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-lg border border-neutral-800 bg-neutral-900 p-6 hover:border-amber-600"
          >
            <p className="text-3xl font-light">{card.n}</p>
            <p className="mt-1 text-sm text-neutral-400">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
