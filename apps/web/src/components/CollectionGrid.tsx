"use client";

import { useMemo, useState } from "react";
import type { CatalogProduct } from "@/lib/catalog";
import ProductCard from "./ProductCard";

type Sort = "featured" | "az" | "za";

const PAGE = 12;

const SORTS: { value: Sort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "az", label: "A – Z" },
  { value: "za", label: "Z – A" },
];

export default function CollectionGrid({
  products,
}: {
  products: CatalogProduct[];
}) {
  const [sort, setSort] = useState<Sort>("featured");
  const [visible, setVisible] = useState(PAGE);

  const sorted = useMemo(() => {
    if (sort === "featured") return products;
    const copy = [...products];
    copy.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "za") copy.reverse();
    return copy;
  }, [products, sort]);

  const shown = sorted.slice(0, visible);
  const remaining = sorted.length - shown.length;

  return (
    <div>
      <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-[11px] uppercase tracking-[0.25em] text-muted">
          {products.length} pieces · Made to order
        </p>
        <label className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted">
          Sort
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value as Sort);
              setVisible(PAGE);
            }}
            className="appearance-none border-b border-ivory/20 bg-transparent py-1 pr-6 text-ivory outline-none transition-colors focus:border-gold"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value} className="bg-char">
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-3">
        {shown.map((p) => (
          <ProductCard key={p.handle} product={p} />
        ))}
      </div>

      {remaining > 0 && (
        <div className="mt-16 text-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE)}
            className="rounded-full border border-gold/50 px-8 py-2.5 text-[11px] uppercase tracking-[0.22em] text-gold-soft transition-colors hover:bg-gold hover:text-char"
          >
            Load more ({remaining})
          </button>
        </div>
      )}
    </div>
  );
}
