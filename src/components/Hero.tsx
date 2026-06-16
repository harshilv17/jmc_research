import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex h-[100svh] min-h-[600px] w-full items-center justify-center overflow-hidden"
    >
      {/* video backdrop */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/media/hero-poster.webp"
        aria-hidden
      >
        <source src="/media/hero.webm" type="video/webm" />
        <source src="/media/hero.mp4" type="video/mp4" />
      </video>

      {/* tone overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-deep/40 via-teal-deep/30 to-char/80" />
      <div className="absolute inset-0 bg-char/20" />

      {/* mark + tagline */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <Image
          src="/logo.png"
          alt="Jatin Malik Couture"
          width={760}
          height={460}
          priority
          fetchPriority="high"
          sizes="(min-width: 768px) 340px, (min-width: 640px) 300px, 230px"
          className="w-[230px] drop-shadow-[0_4px_30px_rgba(0,0,0,0.45)] sm:w-[300px] md:w-[340px]"
        />
        <p className="mt-8 text-[10px] font-light uppercase tracking-[0.5em] text-ivory/80 sm:text-xs">
          Where the story begins
        </p>
      </div>

      {/* scroll cue */}
      <a
        href="#manifesto"
        aria-label="Scroll"
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
      >
        <span className="block h-9 w-[1px] animate-pulse bg-gold/70" />
      </a>
    </section>
  );
}
