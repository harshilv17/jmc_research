"use client";

import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";

type Status = "idle" | "sending" | "done" | "error";

const field =
  "w-full border-b border-ivory/20 bg-transparent py-3 text-ivory placeholder:text-muted/70 outline-none transition-colors focus:border-gold";

export default function Inquiry() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? "Something went wrong.");
      }
      setStatus("done");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section
      id="inquire"
      className="w-full scroll-mt-24 bg-teal-deep/40 px-6 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold">
            Begin a Commission
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-5 font-serif text-3xl font-light text-ivory sm:text-5xl">
            Book a couture <span className="text-gold-soft font-accent">appointment</span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-ivory/65">
            Share a few details of your occasion; the atelier will reach out to
            begin the conversation.
          </p>
        </Reveal>
      </div>

      <Reveal delay={180} className="mx-auto mt-12 max-w-2xl">
        {status === "done" ? (
          <div className="rounded-sm border border-gold/30 bg-char/30 px-6 py-12 text-center">
            <p className="font-serif text-2xl text-gold-soft">Thank you.</p>
            <p className="mt-3 text-sm text-ivory/70">
              Your enquiry has reached the atelier. We will be in touch shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2">
            {/* honeypot */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden
            />

            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.22em] text-muted">
                Name
              </span>
              <input name="name" required className={field} placeholder="Your name" />
            </label>

            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.22em] text-muted">
                Email
              </span>
              <input
                type="email"
                name="email"
                required
                className={field}
                placeholder="you@email.com"
              />
            </label>

            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.22em] text-muted">
                Phone <span className="normal-case">(optional)</span>
              </span>
              <input name="phone" className={field} placeholder="+91" />
            </label>

            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.22em] text-muted">
                Occasion
              </span>
              <select name="occasion" defaultValue="" className={`${field} appearance-none`}>
                <option value="" disabled>
                  Select
                </option>
                <option className="bg-char">Wedding</option>
                <option className="bg-char">Sangeet</option>
                <option className="bg-char">Reception</option>
                <option className="bg-char">Engagement</option>
                <option className="bg-char">Other</option>
              </select>
            </label>

            <label className="block sm:col-span-2">
              <span className="text-[10px] uppercase tracking-[0.22em] text-muted">
                A few words <span className="normal-case">(optional)</span>
              </span>
              <textarea
                name="message"
                rows={3}
                className={`${field} resize-none`}
                placeholder="Tell us about your day…"
              />
            </label>

            <div className="sm:col-span-2 sm:flex sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-full bg-gold px-8 py-3 text-[11px] font-medium uppercase tracking-[0.24em] text-char transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
              >
                {status === "sending" ? "Sending…" : "Send enquiry"}
              </button>
              {status === "error" && (
                <p className="mt-4 text-sm text-oxblood sm:mt-0 sm:ml-6" role="alert">
                  {error}
                </p>
              )}
            </div>
          </form>
        )}
      </Reveal>
    </section>
  );
}
