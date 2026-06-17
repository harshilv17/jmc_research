import Image from "next/image";
import Link from "next/link";
import type { CatalogProduct } from "@/lib/catalog";
import { CATEGORY_LABELS } from "@/lib/labels";

const CARD_SIZES = "(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw";

export default function ProductCard({ product }: { product: CatalogProduct }) {
  const [primary, secondary] = product.images;

  return (
    <Link href={`/products/${product.handle}`} className="group block">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-char-soft">
        {primary && (
          <Image
            src={primary.src}
            alt={primary.alt}
            fill
            sizes={CARD_SIZES}
            className="object-cover transition-opacity duration-700 group-hover:opacity-0"
          />
        )}
        {secondary && (
          <Image
            src={secondary.src}
            alt={secondary.alt}
            fill
            sizes={CARD_SIZES}
            className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}
        {/* subtle gold frame on hover */}
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-transparent transition-colors duration-500 group-hover:ring-gold/30" />
      </div>

      <div className="mt-4 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold/80">
          {CATEGORY_LABELS[product.category]}
        </p>
        <h3 className="mt-1.5 font-serif text-lg font-light text-ivory">
          {product.title}
        </h3>
        <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-muted">
          {product.priceOnRequest || product.basePrice == null
            ? "Made to order"
            : `${(product.basePrice / 100).toLocaleString()} ${product.currency}`}
        </p>
      </div>
    </Link>
  );
}
