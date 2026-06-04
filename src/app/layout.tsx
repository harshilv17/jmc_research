import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Cinzel } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE = "https://jatinmalikcouture.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Jatin Malik Couture — Bespoke Indian Menswear & Couture",
    template: "%s · Jatin Malik Couture",
  },
  description:
    "Handcrafted traditional-contemporary couture for the modern groom. Sherwanis, bandhgalas and bespoke occasion wear from the atelier of Jatin Malik.",
  keywords: [
    "Jatin Malik",
    "Jatin Malik Couture",
    "bespoke sherwani",
    "bandhgala",
    "Indian menswear",
    "groom couture",
    "luxury menswear India",
  ],
  openGraph: {
    type: "website",
    title: "Jatin Malik Couture — Bespoke Indian Menswear & Couture",
    description:
      "Handcrafted traditional-contemporary couture for the modern groom.",
    siteName: "Jatin Malik Couture",
    images: ["/media/portrait.webp"],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full bg-char text-ivory"
      >
        {children}
      </body>
    </html>
  );
}
