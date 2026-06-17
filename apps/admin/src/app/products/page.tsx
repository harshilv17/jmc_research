import Link from "next/link";
import { api } from "@/lib/api";
import type { ProductRow } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const { products } = await api.get<{ products: ProductRow[] }>("/products");

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-light">Products</h1>
        <Link
          href="/products/new"
          className="rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-neutral-950 hover:bg-amber-400"
        >
          New product
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="mt-10 text-sm text-neutral-400">
          No products yet. Create the first one.
        </p>
      ) : (
        <table className="mt-8 w-full text-left text-sm">
          <thead className="border-b border-neutral-800 text-xs uppercase tracking-wider text-neutral-500">
            <tr>
              <th className="py-2">Title</th>
              <th className="py-2">Category</th>
              <th className="py-2">Status</th>
              <th className="py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                className="border-b border-neutral-900 hover:bg-neutral-900"
              >
                <td className="py-3">
                  <Link
                    href={`/products/${p.id}`}
                    className="text-neutral-100 hover:text-amber-400"
                  >
                    {p.title}
                  </Link>
                  <span className="ml-2 text-xs text-neutral-600">
                    /{p.handle}
                  </span>
                </td>
                <td className="py-3 text-neutral-400">{p.category}</td>
                <td className="py-3">
                  <span
                    className={
                      p.status === "active"
                        ? "text-green-400"
                        : p.status === "archived"
                          ? "text-neutral-500"
                          : "text-amber-400"
                    }
                  >
                    {p.status}
                  </span>
                </td>
                <td className="py-3 text-neutral-400">
                  {p.priceOnRequest || p.basePrice == null
                    ? "On request"
                    : `${(p.basePrice / 100).toLocaleString()} ${p.currency}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
