import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JMC Admin · OMS",
  description: "Jatin Malik Couture — in-house CMS / order management.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
