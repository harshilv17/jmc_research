import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import Container from "./ui/Container";
import Button from "./ui/Button";
import { activeCollections, collectionProducts } from "@/content/collections";

export default function CollectionsPreview() {
  // Lead with the cornerstone lines.
  const featured = activeCollections()
    .filter((c) =>
      ["sherwanis", "bandhgalas", "tuxedos"].includes(c.slug),
    )
    .slice(0, 3);

  return (
    <section
      id="collections"
      className="w-full scroll-mt-24 py-20 sm:py-28"
    >
      <Container>
        <div className="text-center">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">
              The Wardrobe
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-serif text-3xl font-light text-ivory sm:text-5xl">
              Explore the{" "}
              <span className="font-accent text-gold-soft">collections</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {featured.map((c, i) => {
            const cover = c.hero ?? collectionProducts(c)[0]?.media[0]?.src;
            return (
              <Reveal key={c.slug} delay={i * 90}>
                <Link
                  href={`/collections/${c.slug}`}
                  className="group relative block aspect-[3/4] overflow-hidden bg-char-soft"
                >
                  {cover && (
                    <Image
                      src={cover}
                      alt={c.title}
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="object-cover opacity-85 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-char via-char/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-center">
                    <h3 className="font-serif text-2xl font-light text-ivory">
                      {c.title}
                    </h3>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120} className="mt-12 text-center">
          <Button href="/collections">View all collections</Button>
        </Reveal>
      </Container>
    </section>
  );
}
