import DefaultHeadContent from "@/components/head";
import BlogLayout from "@/components/layout/home";
import { extractParagraphs } from "@/modules/utils";
import {
  AboutBackground,
  AboutContent,
  Paragraph,
} from "@/styles/about.styles";

export default function AboutRoute() {
  const paragraphs = extractParagraphs(content);

  return (
    <BlogLayout>
      <DefaultHeadContent />

      <AboutBackground />

      <AboutContent>
        {paragraphs.map((para, i) => (
          <Paragraph key={i}>{para}</Paragraph>
        ))}
      </AboutContent>
    </BlogLayout>
  );
}

const content = `
We are a content publishing enterprise that aims to understand twenty-first psychology by consuming and analyzing contemporary pop-culture trends, figures, media, and technological innovations.

With the rise of the digital economy, extreme media personalities, and a slow but consistent integration of technological innovations such as artificial intelligence and virtual reality in our lives, the Internet is no longer just a platform for humans to exchange information. It is an entire thriving world with its own complex systems of rules and ethics.

We intend to see through these upcoming changes and trends to understand where their true origins lie, what they mean to us, and how much of an impact they will have on the present and future of humanity.
`;
