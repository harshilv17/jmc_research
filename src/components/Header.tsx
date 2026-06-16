"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryNav } from "@/lib/nav";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll when the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Off the homepage there is no hero behind the bar, so keep it solid.
  const solid = scrolled || open || !isHome;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid
          ? "border-b border-gold/15 bg-char/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" aria-label="Jatin Malik Couture — home" className="block">
          <Image
            src="/logo.png"
            alt="Jatin Malik Couture"
            width={760}
            height={460}
            priority
            sizes="160px"
            className="h-7 w-auto sm:h-8"
          />
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-9 md:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[11px] uppercase tracking-[0.22em] text-ivory/75 transition-colors hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#inquire"
            className="rounded-full border border-gold/50 px-5 py-1.5 text-xs uppercase tracking-[0.22em] text-gold-soft transition-colors hover:bg-gold hover:text-char"
          >
            Enquire
          </Link>
        </nav>

        {/* mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className={`block h-px w-5 bg-ivory transition-transform ${
              open ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-ivory transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-ivory transition-transform ${
              open ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <nav className="flex flex-col gap-6 border-t border-gold/15 bg-char/95 px-6 py-8 backdrop-blur-md md:hidden">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-sm uppercase tracking-[0.25em] text-ivory/85"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#inquire"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex w-fit rounded-full border border-gold/50 px-6 py-2 text-xs uppercase tracking-[0.22em] text-gold-soft"
          >
            Enquire
          </Link>
        </nav>
      )}
    </header>
  );
}
