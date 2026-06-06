import Image from "next/image";
import Reveal from "./Reveal";

const looks = [
  { src: "/media/neelkaal.webp", name: "Neel Kaal", note: "Blue-black bandhgala" },
  { src: "/media/poster.webp", name: "The Poster", note: "Midnight tailoring" },
  { src: "/media/tux.webp", name: "Brick by Brick", note: "Ivory tuxedo" },
  { src: "/media/teal-kurta.webp", name: "Teal Kurta", note: "Signature teal" },
];

export default function Signature() {
  return (
    <section
      id="signature"
      className="w-full scroll-mt-24 px-6 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center sm:mb-16">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">
              Signature Looks
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-serif text-3xl font-light text-ivory sm:text-5xl">
              An art of <span className="text-gold-soft italic">presence</span>.
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {looks.map((look, i) => (
            <Reveal key={look.name} delay={i * 90}>
              <figure className="group relative aspect-2/3 w-full overflow-hidden rounded-sm bg-char-soft">
                <Image
                  src={look.src}
                  alt={`${look.name} — ${look.note}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-char/85 via-char/10 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="font-serif text-lg text-ivory sm:text-xl">
                    {look.name}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-gold-soft">
                    {look.note}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
