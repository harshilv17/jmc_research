import Image from "next/image";
import Reveal from "./Reveal";

export default function Essence() {
  return (
    <section
      id="essence"
      className="relative w-full scroll-mt-24 bg-teal-deep/30 py-20 sm:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 sm:px-8 md:grid-cols-2 md:gap-16">
        {/* image */}
        <Reveal className="order-2 md:order-1">
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-sm">
            <Image
              src="/media/atelier.webp"
              alt="Inside the Jatin Malik atelier — hands at work"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover grayscale"
            />
            <div className="absolute inset-0 bg-char/25" />
          </div>
        </Reveal>

        {/* copy */}
        <div className="order-1 md:order-2">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">
              The Essence
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-serif text-3xl font-light leading-tight text-ivory sm:text-5xl">
              Built on a <span className="text-gold-soft font-accent">philosophy</span>,
              not a pattern.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ivory/70 sm:text-base">
              Drawn from Shiva — stillness, depth, the five elements — felt rather
              than worn. Each sherwani, bandhgala and kurta is hand-painted,
              embroidered and shaped in our Delhi atelier, the way couture was
              always meant to be made.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <a
              href="#signature"
              className="mt-9 inline-block border-b border-gold/50 pb-1 text-[11px] uppercase tracking-[0.28em] text-gold-soft transition-colors hover:text-gold"
            >
              See the work
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
