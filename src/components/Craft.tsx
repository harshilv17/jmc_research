import Image from "next/image";
import Reveal from "./Reveal";

export default function Craft() {
  return (
    <section
      id="craft"
      className="w-full scroll-mt-24 bg-teal-deep/30 py-20 sm:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 sm:px-8 md:grid-cols-12 md:gap-12">
        {/* tall image */}
        <Reveal className="md:col-span-5">
          <div className="relative aspect-2/3 w-full overflow-hidden rounded-sm">
            <Image
              src="/media/nehru.webp"
              alt="Embellished nehru jacket on draped silk"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* copy + detail */}
        <div className="md:col-span-7">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">
              The Craft
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-serif text-3xl font-light leading-tight text-ivory sm:text-5xl">
              Made to your <span className="text-gold-soft font-accent">measure</span>.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ivory/70 sm:text-base">
              Every commission begins as a conversation and ends as an heirloom —
              hand-painted motifs, gold zardozi, a silhouette drawn for you alone.
              Here, bespoke is not an upgrade. It is the whole idea.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-8 grid grid-cols-3 gap-4 sm:max-w-md">
              {[
                ["5,000+", "Grooms dressed"],
                ["3", "Ateliers — Delhi & Mumbai"],
                ["2019", "Milan Fashion Week"],
              ].map(([big, small]) => (
                <div key={small}>
                  <p className="font-serif text-2xl text-gold-soft sm:text-3xl">
                    {big}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted">
                    {small}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-9 flex items-center gap-5">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-sm sm:h-24 sm:w-24">
                <Image
                  src="/media/kalgi.webp"
                  alt="Gold kalgi detail"
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <p className="max-w-xs text-[13px] leading-relaxed text-ivory/55">
                Down to the kalgi — nothing here is bought off a shelf.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
