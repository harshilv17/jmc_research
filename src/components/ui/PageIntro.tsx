import Container from "./Container";
import Eyebrow from "./Eyebrow";
import Heading from "./Heading";

/** Standard top-of-page intro for interior pages (clears the fixed header). */
export default function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <Container className="pt-32 pb-12 text-center sm:pt-40">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading as="h1" className="mt-5">
        {title}
      </Heading>
      {description && (
        <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-ivory/70">
          {description}
        </p>
      )}
    </Container>
  );
}
