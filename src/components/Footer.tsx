import Image from "next/image";

const stores = [
  { city: "New Delhi", area: "Defence Colony" },
  { city: "New Delhi", area: "Chhatarpur" },
  { city: "Mumbai", area: "Kala Ghoda" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-gold/15 bg-char px-6 py-16 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/logo.png"
            alt="Jatin Malik Couture"
            width={760}
            height={460}
            className="h-9 w-auto"
          />
          <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-muted">
            Handcrafted traditional-contemporary couture, from the atelier of
            Jatin Malik.
          </p>
        </div>

        {/* stores */}
        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-8 text-center sm:grid-cols-3">
          {stores.map((s) => (
            <div key={s.area}>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
                {s.city}
              </p>
              <p className="mt-2 font-serif text-lg text-ivory">{s.area}</p>
            </div>
          ))}
        </div>

        <div className="rule mx-auto mt-14 w-full max-w-3xl" />

        <div className="mt-8 flex flex-col items-center justify-between gap-5 sm:flex-row">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted">
            © {new Date().getFullYear()} Jatin Malik Couture
          </p>
          <div className="flex items-center gap-7 text-[11px] uppercase tracking-[0.2em]">
            <a
              href="https://www.instagram.com/jatinmalikcouture/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ivory/70 transition-colors hover:text-gold"
            >
              Instagram
            </a>
            <a
              href="#inquire"
              className="text-ivory/70 transition-colors hover:text-gold"
            >
              Enquire
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
