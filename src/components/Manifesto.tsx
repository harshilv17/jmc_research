import Reveal from "./Reveal";

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative mx-auto max-w-3xl scroll-mt-24 px-6 py-28 text-center sm:py-36"
    >
      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold">
          The House of Jatin Malik
        </p>
      </Reveal>

      <Reveal delay={80}>
        <h2 className="mt-7 font-serif text-4xl font-light leading-[1.1] text-ivory sm:text-6xl">
          Not fashion.
          <br />
          <span className="text-gold-soft font-accent">Tradition.</span>
        </h2>
      </Reveal>

      <Reveal delay={160}>
        <p className="mx-auto mt-9 max-w-xl font-serif text-lg font-light leading-relaxed text-ivory/75 sm:text-xl">
          Where every hand tells a story, and every piece we create for your
          biggest day comes from people who put their heart into it.
        </p>
      </Reveal>

      <Reveal delay={220}>
        <div className="rule mx-auto mt-12 w-40" />
      </Reveal>
    </section>
  );
}
