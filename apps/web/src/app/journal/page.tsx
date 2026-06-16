import type { Metadata } from "next";
import PageIntro from "@/components/ui/PageIntro";
import { Accent } from "@/components/ui/Heading";

export const metadata: Metadata = {
  title: "Journal",
  description: "Stories, lookbooks and campaigns from Jatin Malik Couture.",
};

export default function JournalPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Editorial"
        title={<>The <Accent>Journal</Accent></>}
        description="Lookbooks, campaigns and notes from the atelier — arriving soon."
      />
    </main>
  );
}
