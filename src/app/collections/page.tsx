import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import PageIntro from "@/components/ui/PageIntro";
import { activeCollections, collectionProducts } from "@/content/collections";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore the house of Jatin Malik — sherwanis, bandhgalas, tuxedos, kurtas and signature couture sets.",
};

export default function CollectionsPage() {
  const cols = activeCollections();

  return (
    <main>
      <PageIntro
        eyebrow="The House of Jatin Malik"
        title="Collections"
        description="Each line is cut, embroidered and finished by hand in the atelier."
      />

      <Container className="pb-28">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cols.map((c) => {
            const items = collectionProducts(c);
            const cover = c.hero ?? items[0]?.media[0]?.src;
            return (
              <Link
                key={c.slug}
                href={`/collections/${c.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden bg-char-soft"
              >
                {cover && (
                  <Image
                    src={cover}
                    alt={c.title}
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
                    className="object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-char via-char/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-center">
                  <h2 className="font-serif text-2xl font-light text-ivory">
                    {c.title}
                  </h2>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-gold/80">
                    {items.length} pieces
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </main>
  );
}
