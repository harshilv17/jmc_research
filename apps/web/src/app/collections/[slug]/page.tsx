import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import PageIntro from "@/components/ui/PageIntro";
import CollectionGrid from "@/components/CollectionGrid";
import { getCollection } from "@/lib/catalog";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const c = await getCollection(slug);
  if (!c) return {};
  return { title: c.title, description: c.description };
}

export default async function CollectionPage({ params }: Params) {
  const { slug } = await params;
  const collection = await getCollection(slug);
  if (!collection) notFound();

  return (
    <main>
      <PageIntro
        eyebrow="Collection"
        title={collection.title}
        description={collection.description}
      />

      <Container className="pb-28">
        {collection.products.length === 0 ? (
          <p className="text-center text-sm text-muted">
            Pieces for this line are coming soon.
          </p>
        ) : (
          <CollectionGrid products={collection.products} />
        )}

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
