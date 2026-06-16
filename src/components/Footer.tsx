import Image from "next/image";
import Link from "next/link";
import { primaryNav } from "@/lib/nav";

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
          <Link href="/" aria-label="Jatin Malik Couture — home">
            <Image
              src="/logo.png"
              alt="Jatin Malik Couture"
              width={760}
              height={460}
              sizes="180px"
              className="h-9 w-auto"
            />
          </Link>
          <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-muted">
            Handcrafted traditional-contemporary couture, from the atelier of
            Jatin Malik.
          </p>

          {/* primary nav */}
          <nav className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[11px] uppercase tracking-[0.22em] text-ivory/70 transition-colors hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>
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
            <Link
              href="/#inquire"
              className="text-ivory/70 transition-colors hover:text-gold"
            >
              Enquire
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
