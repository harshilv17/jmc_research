import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageIntro from "@/components/ui/PageIntro";
import Button from "@/components/ui/Button";
import { Accent } from "@/components/ui/Heading";

export const metadata: Metadata = {
  title: "The Atelier",
  description:
    "Inside the atelier of Jatin Malik — the hands, the craft and the made-to-order journey.",
};

export default function AtelierPage() {
  return (
    <main>
      <PageIntro
        eyebrow="The House of Jatin Malik"
        title={<>The <Accent>Atelier</Accent></>}
        description="The full story of the house — craft, process and people — is being woven. For now, every piece begins with a conversation."
      />
      <Container className="pb-32 text-center">
        <Button href="/#inquire" variant="solid">
          Begin a consultation
        </Button>
      </Container>
    </main>
  );
}
