import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Essence from "@/components/Essence";
import Signature from "@/components/Signature";
import Craft from "@/components/Craft";
import Inquiry from "@/components/Inquiry";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Manifesto />
        <Essence />
        <Signature />
        <Craft />
        <Inquiry />
      </main>
      <Footer />
    </>
  );
}
