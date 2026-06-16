import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Sinistre — Collletttivo, OFL (src/app/fonts/Sinistre-LICENSE.txt)
const sinistre = localFont({
  variable: "--font-sinistre",
  display: "swap",
  src: [
    { path: "./fonts/Sinistre-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Sinistre-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Sinistre-Dark.woff2", weight: "900", style: "normal" },
  ],
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
      className={`${bricolage.variable} ${sinistre.variable} h-full antialiased`}
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
