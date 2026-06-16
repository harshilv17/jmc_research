import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import PageIntro from "@/components/ui/PageIntro";
import ProductCard from "@/components/ProductCard";
import {
  activeCollections,
  collectionProducts,
  getCollection,
} from "@/content/collections";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return activeCollections().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) return {};
  return { title: c.title, description: c.description };
}

export default async function CollectionPage({ params }: Params) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const items = collectionProducts(collection);
  if (items.length === 0) notFound();

  return (
    <main>
      <PageIntro
        eyebrow="Collection"
        title={collection.title}
        description={collection.description}
      />

      <Container className="pb-28">
        <p className="mb-10 text-center text-[11px] uppercase tracking-[0.25em] text-muted">
          {items.length} pieces · Made to order
        </p>

        <div className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-3">
          {items.map((p) => (
            <ProductCard key={p.handle} product={p} />
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link
            href="/collections"
            className="text-[11px] uppercase tracking-[0.25em] text-gold-soft transition-colors hover:text-gold"
          >
            ← All collections
          </Link>
        </div>
      </Container>
    </main>
  );
}
