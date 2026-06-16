import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageIntro from "@/components/ui/PageIntro";
import Button from "@/components/ui/Button";
import { Accent } from "@/components/ui/Heading";

export const metadata: Metadata = {
  title: "Appointments",
  description:
    "Book a private consultation at the atelier of Jatin Malik Couture.",
};

export default function AppointmentsPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Private Consultation"
        title={<>Book an <Accent>Appointment</Accent></>}
        description="Online booking is on its way. Until then, send an enquiry and the atelier will arrange a private consultation in Delhi or Mumbai."
      />
      <Container className="pb-32 text-center">
        <Button href="/#inquire" variant="solid">
          Send an enquiry
        </Button>
      </Container>
    </main>
  );
}
