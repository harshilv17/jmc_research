import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/ProductCard";
import { CATEGORY_LABELS } from "@/lib/labels";
import {
  CATEGORY_META,
  getProduct,
  getRelated,
  categoryToSlug,
} from "@/lib/catalog";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ handle: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { handle } = await params;
  const p = await getProduct(handle);
  if (!p) return {};
  return {
    title: p.title,
    description: `${p.title} — ${CATEGORY_LABELS[p.category]}, made to order by Jatin Malik Couture.`,
    openGraph: { images: p.images[0] ? [p.images[0].src] : undefined },
  };
}

export default async function ProductPage({ params }: Params) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  const related = await getRelated(handle, product.category);
  const collectionSlug = categoryToSlug(product.category);
  const collectionTitle = CATEGORY_META[product.category].title;
  const priced = !product.priceOnRequest && product.basePrice != null;

  return (
    <main>
      <Container className="grid grid-cols-1 gap-12 pt-28 pb-24 sm:pt-36 lg:grid-cols-2 lg:gap-16">
        {/* gallery */}
        <div className="flex flex-col gap-4">
          {product.images.length === 0 && (
            <div className="aspect-[3/4] w-full bg-char-soft" />
          )}
          {product.images.map((m, i) => (
            <div
              key={m.src}
              className="relative aspect-[3/4] w-full overflow-hidden bg-char-soft"
            >
              <Image
                src={m.src}
                alt={m.alt}
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* details */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <nav className="text-[11px] uppercase tracking-[0.25em] text-muted">
            <Link href="/collections" className="hover:text-gold">
              Collections
            </Link>
            {" / "}
            <Link href={`/collections/${collectionSlug}`} className="hover:text-gold">
              {collectionTitle}
            </Link>
          </nav>

          <p className="mt-8 text-[11px] uppercase tracking-[0.3em] text-gold">
            {CATEGORY_LABELS[product.category]}
          </p>
          <h1 className="mt-3 font-serif text-3xl font-light leading-tight text-ivory sm:text-4xl">
            {product.title}
          </h1>

          <div className="rule mt-8 w-full" />

          <p className="mt-8 text-sm font-light leading-relaxed text-ivory/75">
            {product.description ??
              "A made-to-order piece from the atelier of Jatin Malik — cut to your measure and finished by hand. Reach out to begin a private consultation and discuss fabric, fit and timeline for your occasion."}
          </p>

          <dl className="mt-8 space-y-3 text-sm">
            <div className="flex justify-between border-b border-gold/10 pb-3">
              <dt className="text-muted">Availability</dt>
              <dd className="text-ivory/85">Made to order</dd>
            </div>
            <div className="flex justify-between border-b border-gold/10 pb-3">
              <dt className="text-muted">Pricing</dt>
              <dd className="text-ivory/85">
                {priced
                  ? `${(product.basePrice! / 100).toLocaleString()} ${product.currency}`
                  : "On request"}
              </dd>
            </div>
          </dl>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button
              href={`/?piece=${encodeURIComponent(product.title)}#inquire`}
              variant="solid"
            >
              Enquire about this piece
            </Button>
            <Button href="/appointments">Book a consultation</Button>
          </div>
        </div>
      </Container>

      {related.length > 0 && (
        <Container className="pb-28">
          <h2 className="mb-10 text-center font-serif text-2xl font-light text-ivory">
            You may also like
          </h2>
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.handle} product={p} />
            ))}
          </div>
        </Container>
      )}
    </main>
  );
}
