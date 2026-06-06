"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-char/85 backdrop-blur-md border-b border-gold/15"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" aria-label="Jatin Malik Couture — home" className="block">
          <Image
            src="/logo.png"
            alt="Jatin Malik Couture"
            width={760}
            height={460}
            priority
            className="h-7 w-auto sm:h-8"
          />
        </a>
        <a
          href="#inquire"
          className="rounded-full border border-gold/50 px-4 py-1.5 text-[11px] font-normal uppercase tracking-[0.22em] text-gold-soft transition-colors hover:bg-gold hover:text-char sm:px-5 sm:text-xs"
        >
          Enquire
        </a>
      </div>
    </header>
  );
}
